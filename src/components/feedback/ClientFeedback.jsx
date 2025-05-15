// src/components/feedback/ClientFeedback.jsx
import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, MessageSquare, Send } from 'lucide-react';
import api from '../../services/api';

const ClientFeedback = ({ projectId }) => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newResponse, setNewResponse] = useState('');
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);
  const [responding, setResponding] = useState(false);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/projects/${projectId}/feedback`);
        setFeedback(response.data);
      } catch (err) {
        setError('Erro ao carregar feedbacks. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [projectId]);

  const handleSubmitResponse = async (feedbackId) => {
    if (!newResponse.trim()) return;

    try {
      setResponding(true);

      const response = await api.post(`/projects/${projectId}/feedback/${feedbackId}/response`, {
        responseText: newResponse
      });

      // Atualizar o feedback na lista
      setFeedback(feedback.map(fb =>
        fb.id === feedbackId
          ? { ...fb, response: response.data, responseDate: new Date().toISOString() }
          : fb
      ));

      setNewResponse('');
      setSelectedFeedbackId(null);
    } catch (err) {
      setError('Erro ao enviar resposta. Tente novamente.');
    } finally {
      setResponding(false);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return <div className="text-center p-8">Carregando feedbacks...</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg flex items-center">
        <ThumbsUp className="h-5 w-5 mr-2 text-green-500" />
        Feedback do Cliente
      </h3>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {feedback.length === 0 ? (
        <div className="text-center py-8 text-gray-500 border rounded-md">
          Nenhum feedback registrado para este projeto.
        </div>
      ) : (
        <div className="space-y-4">
          {feedback.map(fb => (
            <div key={fb.id} className="border rounded-md p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    {renderStars(fb.rating)}
                    <span className="ml-2 text-sm font-medium">{fb.rating}/5</span>
                  </div>

                  <h4 className="font-medium mt-2">{fb.title || 'Avaliação do Cliente'}</h4>
                  <p className="text-sm mt-1">{fb.comment}</p>

                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <span>{fb.client}</span>
                    <span className="mx-1">•</span>
                    <span>{new Date(fb.date).toLocaleDateString()}</span>

                    {fb.phase && (
                      <>
                        <span className="mx-1">•</span>
                        <span>Fase: {fb.phase === 'sale' ? 'Venda' :
                               fb.phase === 'pre-installation' ? 'Pré-Instalação' :
                               fb.phase === 'installation' ? 'Instalação' :
                               fb.phase === 'commissioning' ? 'Comissionamento' : 'Pós-Venda'}</span>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  {fb.category && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {fb.category}
                    </span>
                  )}
                </div>
              </div>

              {fb.response ? (
                <div className="mt-4 pt-4 border-t">
                  <h5 className="text-sm font-medium flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1 text-blue-500" />
                    Resposta
                  </h5>
                  <p className="text-sm mt-2">{fb.response}</p>

                  {fb.responseDate && (
                    <div className="text-xs text-gray-500 mt-1">
                      Respondido em: {new Date(fb.responseDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-4 pt-4 border-t">
                  {selectedFeedbackId === fb.id ? (
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">Responder ao Feedback</h5>
                      <textarea
                        className="w-full px-3 py-2 border rounded-md text-sm"
                        rows="3"
                        value={newResponse}
                        onChange={(e) => setNewResponse(e.target.value)}
                        placeholder="Digite sua resposta ao feedback..."
                      ></textarea>
                      <div className="flex justify-end space-x-2">
                        <button
                          className="px-3 py-1 border rounded-md text-sm"
                          onClick={() => {
                            setSelectedFeedbackId(null);
                            setNewResponse('');
                          }}
                        >
                          Cancelar
                        </button>
                        <button
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md flex items-center"
                          onClick={() => handleSubmitResponse(fb.id)}
                          disabled={responding}
                        >
                          {responding ? (
                            'Enviando...'
                          ) : (
                            <>
                              <Send className="h-3 w-3 mr-1" />
                              Enviar
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                      onClick={() => setSelectedFeedbackId(fb.id)}
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Responder a este feedback
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientFeedback;