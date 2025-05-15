// src/components/projects/PhaseChecklist.jsx
import React, { useState, useEffect } from 'react';
import { Check, AlertCircle, Clock, Upload, Camera } from 'lucide-react';
import api from '../../services/api';

const PhaseChecklist = ({ projectId, phase }) => {
  const [checklist, setChecklist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploadingIndex, setUploadingIndex] = useState(-1);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const loadChecklist = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/projects/${projectId}/checklist/${phase}`);
        setChecklist(response.data);
      } catch (error) {
        setError('Erro ao carregar checklist. Tente recarregar a página.');
      } finally {
        setLoading(false);
      }
    };

    loadChecklist();
  }, [projectId, phase]);

  const handleToggleItem = async (index) => {
    try {
      const newChecklist = [...checklist];
      const item = newChecklist[index];
      const newStatus = item.status === 'completed' ? 'pending' : 'completed';

      // Otimistic update
      newChecklist[index] = { ...item, status: newStatus };
      setChecklist(newChecklist);

      // API update
      await api.post(`/projects/${projectId}/checklist-item`, {
        itemId: item.id,
        status: newStatus
      });
    } catch (error) {
      setError('Erro ao atualizar item. Tente novamente.');
      // Revert on error
      const response = await api.get(`/projects/${projectId}/checklist/${phase}`);
      setChecklist(response.data);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadEvidence = async (index) => {
    if (!selectedFile) return;

    try {
      setUploadingIndex(index);

      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('itemId', checklist[index].id);
      formData.append('projectId', projectId);

      await api.post(`/projects/${projectId}/evidence-upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Refresh checklist
      const response = await api.get(`/projects/${projectId}/checklist/${phase}`);
      setChecklist(response.data);

      setSelectedFile(null);
    } catch (error) {
      setError('Erro ao enviar evidência. Tente novamente.');
    } finally {
      setUploadingIndex(-1);
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Carregando checklist...</div>;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
        <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  const percentComplete = Math.round(
    (checklist.filter(item => item.status === 'completed').length / checklist.length) * 100
  );

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-lg">Checklist de {phase === 'sale' ? 'Venda' :
          phase === 'pre-installation' ? 'Pré-Instalação' :
          phase === 'installation' ? 'Instalação' :
          phase === 'commissioning' ? 'Comissionamento' : 'Pós-Venda'}</h3>

        <div className="flex items-center">
          <div className="bg-gray-200 w-32 h-2 rounded-full mr-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${percentComplete}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium">{percentComplete}%</span>
        </div>
      </div>

      <div className="space-y-3">
        {checklist.map((item, index) => (
          <div
            key={item.id}
            className={`border rounded-lg p-3 ${
              item.status === 'completed' ? 'bg-green-50 border-green-200' : ''
            }`}
          >
            <div className="flex justify-between">
              <div className="flex items-start flex-1">
                <button
                  className={`h-6 w-6 rounded-full mr-3 flex items-center justify-center flex-shrink-0 ${
                    item.status === 'completed'
                      ? 'bg-green-500 text-white'
                      : 'border-2 border-gray-300'
                  }`}
                  onClick={() => handleToggleItem(index)}
                >
                  {item.status === 'completed' && <Check className="h-4 w-4" />}
                </button>
                <div>
                  <div className={`font-medium ${
                    item.status === 'completed' ? 'line-through text-gray-500' : ''
                  }`}>{item.title}</div>
                  {item.description && (
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  )}

                  {item.dueDate && (
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      Prazo: {new Date(item.dueDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>

              {item.requiresEvidence && (
                <div className="ml-4">
                  {item.evidenceUrl ? (
                    <a
                      href={item.evidenceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                    >
                      <Camera className="h-4 w-4 mr-1" />
                      Ver evidência
                    </a>
                  ) : (
                    <div>
                      <input
                        type="file"
                        id={`file-${index}`}
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <label
                        htmlFor={`file-${index}`}
                        className="cursor-pointer text-blue-600 hover:text-blue-800 text-sm flex items-center"
                      >
                        <Upload className="h-4 w-4 mr-1" />
                        Anexar evidência
                      </label>

                      {selectedFile && uploadingIndex === -1 && (
                        <button
                          className="text-sm text-green-600 hover:text-green-800 mt-2"
                          onClick={() => handleUploadEvidence(index)}
                        >
                          Enviar
                        </button>
                      )}

                      {uploadingIndex === index && (
                        <span className="text-sm text-gray-500 mt-2">Enviando...</span>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhaseChecklist;