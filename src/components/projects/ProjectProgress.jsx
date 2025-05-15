// src/components/projects/ProjectProgress.jsx
import React from 'react';
import { CheckCircle, Clock, AlertCircle, BarChart } from 'lucide-react';

const ProjectProgress = ({ project }) => {
  const phases = [
    { id: 'sale', label: 'Venda', color: 'bg-blue-500' },
    { id: 'pre-installation', label: 'Pré-Instalação', color: 'bg-amber-500' },
    { id: 'installation', label: 'Instalação', color: 'bg-green-500' },
    { id: 'commissioning', label: 'Comissionamento', color: 'bg-purple-500' },
    { id: 'after-sales', label: 'Pós-Venda', color: 'bg-red-500' }
  ];

  const currentPhaseIndex = phases.findIndex(p => p.id === project.currentPhase);

  const getPhaseStatus = (index) => {
    if (index < currentPhaseIndex) return 'completed';
    if (index === currentPhaseIndex) return 'current';
    return 'pending';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'current':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'delayed':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-medium text-lg">Progresso do Projeto</h3>
        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-2">Status Geral:</span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              project.status === 'on-track' ? 'bg-green-100 text-green-800' :
              project.status === 'at-risk' ? 'bg-yellow-100 text-yellow-800' :
              project.status === 'delayed' ? 'bg-red-100 text-red-800' :
              'bg-blue-100 text-blue-800'
            }`}
          >
            {project.status === 'on-track' ? 'No Prazo' :
             project.status === 'at-risk' ? 'Em Risco' :
             project.status === 'delayed' ? 'Atrasado' : 'Concluído'}
          </span>
        </div>
      </div>

      {/* Barra de progresso */}
      <div className="relative mb-8">
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-blue-500 rounded-full"
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
        <div className="mt-2 flex justify-between text-sm text-gray-500">
          <span>0%</span>
          <span>{project.progress}% Completo</span>
          <span>100%</span>
        </div>
      </div>

      {/* Fases do projeto */}
      <div className="space-y-4">
        <h4 className="font-medium text-sm text-gray-500">Fases do Projeto</h4>

        <div className="flex flex-col space-y-2">
          {phases.map((phase, index) => {
            const status = getPhaseStatus(index);
            const phaseProgress = index < currentPhaseIndex ? 100 :
                                index === currentPhaseIndex ? project.phaseProgress || 0 : 0;

            return (
              <div key={phase.id} className="flex items-center">
                <div className={`w-8 h-8 rounded-full ${phase.color} flex items-center justify-center mr-3`}>
                  {getStatusIcon(status) || (
                    <span className="text-white font-medium">{index + 1}</span>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className={`font-medium ${status === 'completed' ? 'text-gray-500' : ''}`}>
                      {phase.label}
                    </span>
                    <span className="text-sm">
                      {phaseProgress}%
                    </span>
                  </div>

                  <div className="h-2 bg-gray-200 rounded-full w-full">
                    <div
                      className={`h-2 rounded-full ${phase.color}`}
                      style={{ width: `${phaseProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* KPIs do Projeto */}
      <div className="mt-8 pt-6 border-t">
        <h4 className="font-medium text-sm text-gray-500 mb-4 flex items-center">
          <BarChart className="h-4 w-4 mr-2" />
          Métricas Principais
        </h4>

        <div className="grid grid-cols-2 gap-4">
          <div className="border rounded-lg p-3">
            <div className="text-sm text-gray-500">Prazo</div>
            <div className="flex items-center justify-between mt-1">
              <span className="font-medium">{
                project.scheduleVariance > 0 ? `${project.scheduleVariance}% atrasado` :
                project.scheduleVariance < 0 ? `${Math.abs(project.scheduleVariance)}% adiantado` :
                'No prazo'
              }</span>
              <span className={`text-sm ${
                project.scheduleVariance > 5 ? 'text-red-500' :
                project.scheduleVariance < 0 ? 'text-green-500' :
                'text-gray-500'
              }`}>SPI: {(1 - project.scheduleVariance / 100).toFixed(2)}</span>
            </div>
          </div>

          <div className="border rounded-lg p-3">
            <div className="text-sm text-gray-500">Custo</div>
            <div className="flex items-center justify-between mt-1">
              <span className="font-medium">{
                project.costVariance > 0 ? `${project.costVariance}% acima` :
                project.costVariance < 0 ? `${Math.abs(project.costVariance)}% abaixo` :
                'No orçamento'
              }</span>
              <span className={`text-sm ${
                project.costVariance > 5 ? 'text-red-500' :
                project.costVariance < 0 ? 'text-green-500' :
                'text-gray-500'
              }`}>CPI: {(1 - project.costVariance / 100).toFixed(2)}</span>
            </div>
          </div>

          <div className="border rounded-lg p-3">
            <div className="text-sm text-gray-500">Qualidade</div>
            <div className="flex items-center justify-between mt-1">
              <span className="font-medium">{project.qualityIndex}%</span>
              <span className={`text-sm ${
                project.qualityIndex > 90 ? 'text-green-500' :
                project.qualityIndex > 80 ? 'text-yellow-500' :
                'text-red-500'
              }`}>{
                project.qualityIndex > 90 ? 'Excelente' :
                project.qualityIndex > 80 ? 'Bom' :
                'Necessita atenção'
              }</span>
            </div>
          </div>

          <div className="border rounded-lg p-3">
            <div className="text-sm text-gray-500">Segurança</div>
            <div className="flex items-center justify-between mt-1">
              <span className="font-medium">{project.safetyIncidents} incidentes</span>
              <span className={`text-sm ${
                project.safetyIncidents === 0 ? 'text-green-500' :
                project.safetyIncidents <= 2 ? 'text-yellow-500' :
                'text-red-500'
              }`}>{
                project.safetyIncidents === 0 ? 'Perfeito' :
                project.safetyIncidents <= 2 ? 'Aceitável' :
                'Crítico'
              }</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectProgress;