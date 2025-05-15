// src/components/projects/ProjectTimeline.jsx
import React from 'react';
import { Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const ProjectTimeline = ({ project }) => {
  // Ordenar eventos por data
  const sortedEvents = [...(project.timeline || [])].sort((a, b) =>
    new Date(a.date) - new Date(b.date)
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'current':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'delayed':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Calendar className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-medium text-lg mb-3 flex items-center">
        <Calendar className="h-5 w-5 mr-2" />
        Linha do Tempo do Projeto
      </h3>

      {sortedEvents.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Nenhum evento na linha do tempo.
        </div>
      ) : (
        <div className="relative pl-6 space-y-6 before:absolute before:inset-0 before:ml-4 before:w-0.5 before:bg-gray-200">
          {sortedEvents.map((event, index) => (
            <div key={index} className="relative">
              <div className="absolute left-0 -translate-x-full top-0 flex items-center justify-center w-8 h-8 rounded-full">
                {getStatusIcon(event.status)}
              </div>

              <div className={`p-3 rounded-md border ${
                event.status === 'completed' ? 'bg-green-50 border-green-200' :
                event.status === 'current' ? 'bg-blue-50 border-blue-200' :
                event.status === 'delayed' ? 'bg-red-50 border-red-200' :
                'bg-white'
              }`}>
                <time className="text-xs text-gray-500">
                  {new Date(event.date).toLocaleDateString()}
                </time>

                <h4 className="text-base font-medium mt-1">{event.title}</h4>

                {event.description && (
                  <p className="text-sm mt-1">{event.description}</p>
                )}

                {event.responsible && (
                  <div className="mt-2 text-xs text-gray-500">
                    Responsável: {event.responsible}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectTimeline;