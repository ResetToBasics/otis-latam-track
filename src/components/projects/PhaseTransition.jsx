// src/components/projects/PhaseTransition.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import api from '../../services/api';

const PhaseTransition = ({ project, onPhaseChange }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const phases = [
    { id: 'sale', label: 'Venda' },
    { id: 'pre-installation', label: 'Pré-Instalação' },
    { id: 'installation', label: 'Instalação' },
    { id: 'commissioning', label: 'Comissionamento' },
    { id: 'after-sales', label: 'Pós-Venda' }
  ];

  const currentPhaseIndex = phases.findIndex(p => p.id === project.currentPhase);
  const nextPhase = phases[currentPhaseIndex + 1];

  const checkPhaseRequirements = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get(`/projects/${project.id}/phase-check/${project.currentPhase}`);

      if (response.data.canAdvance) {
        return true;
      } else {
        setError(response.data.reason || 'Existem requisitos pendentes para avançar à próxima fase.');
        return false;
      }
    } catch (error) {
      setError('Erro ao verificar requisitos. Tente novamente.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const advancePhase = async () => {
    const canAdvance = await checkPhaseRequirements();

    if (!canAdvance) return;

    try {
      setLoading(true);

      await api.post(`/projects/${project.id}/advance-phase`, {
        currentPhase: project.currentPhase,
        nextPhase: nextPhase.id
      });

      onPhaseChange(nextPhase.id);

      // Redirecionar para a página da nova fase
      navigate(`/projects/${project.id}/${nextPhase.id}`);
    } catch (error) {
      setError('Erro ao avançar fase. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (!nextPhase) {
    return (
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg mt-4">
        <div className="flex items-center">
          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
          <p className="text-green-700">Este projeto está na fase final (Pós-Venda).</p>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-4 mt-4">
      <h3 className="font-medium text-lg mb-3">Transição de Fase</h3>

      <div className="flex items-center mb-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          <span className="font-medium">{phases[currentPhaseIndex].label}</span>
        </div>
        <ArrowRight className="mx-3 text-gray-400" />
        <div className="p-2 bg-green-100 rounded-lg">
          <span className="font-medium">{nextPhase.label}</span>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-4 flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors w-full md:w-auto"
        onClick={advancePhase}
        disabled={loading}
      >
        {loading ? 'Processando...' : `Avançar para fase de ${nextPhase.label}`}
      </button>

      <p className="text-sm text-gray-500 mt-2">
        Ao avançar para a próxima fase, todos os stakeholders serão notificados e novos checklists serão disponibilizados.
      </p>
    </div>
  );
};

export default PhaseTransition;