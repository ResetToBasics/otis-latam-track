// src/components/projects/ProjectDocuments.jsx
import React, { useState } from 'react';
import { FileText, Download, UploadCloud, Search, Filter } from 'lucide-react';
import api from '../../services/api';

const ProjectDocuments = ({ project }) => {
  const [documents, setDocuments] = useState(project.documents || []);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('projectId', project.id);
      formData.append('documentType', filter !== 'all' ? filter : 'general');

      const response = await api.post(`/projects/${project.id}/document-upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Adicionar o novo documento à lista
      setDocuments([response.data, ...documents]);

      setSelectedFile(null);
    } catch (error) {
      console.error('Erro ao fazer upload do documento', error);
    } finally {
      setIsUploading(false);
    }
  };

  const getDocumentTypeIcon = (type) => {
    switch (type) {
      case 'contract':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'technical':
        return <FileText className="h-5 w-5 text-green-500" />;
      case 'report':
        return <FileText className="h-5 w-5 text-amber-500" />;
      case 'certificate':
        return <FileText className="h-5 w-5 text-purple-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const filteredDocuments = documents.filter(doc => {
    // Filtro por tipo
    if (filter !== 'all' && doc.type !== filter) return false;

    // Filtro por busca
    if (searchQuery && !doc.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    return true;
  });

  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-medium text-lg mb-3 flex items-center">
        <FileText className="h-5 w-5 mr-2" />
        Documentos do Projeto
      </h3>

      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            className="w-full pl-8 pr-4 py-2 border rounded-md text-sm"
            placeholder="Buscar documentos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select
          className="border p-2 rounded-md text-sm"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">Todos os Tipos</option>
          <option value="contract">Contratual</option>
          <option value="technical">Técnico</option>
          <option value="report">Relatórios</option>
          <option value="certificate">Certificados</option>
        </select>
      </div>

      <div className="border-t pt-4 mb-4">
        <div className="flex items-center mb-3">
          <input
            type="file"
            id="upload-document"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="upload-document"
            className="cursor-pointer text-blue-600 hover:text-blue-800 flex items-center text-sm mr-4"
          >
            <UploadCloud className="h-4 w-4 mr-1" />
            Selecionar arquivo
          </label>

          {selectedFile && (
            <div className="flex items-center">
              <span className="text-sm text-gray-600 truncate max-w-xs">
                {selectedFile.name}
              </span>
              <button
                className="ml-3 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
                onClick={handleUpload}
                disabled={isUploading}
              >
                {isUploading ? 'Enviando...' : 'Enviar'}
              </button>
            </div>
          )}
        </div>
      </div>

      {filteredDocuments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Nenhum documento encontrado.
        </div>
      ) : (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredDocuments.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50">
              <div className="flex items-center">
                {getDocumentTypeIcon(doc.type)}
                <div className="ml-3">
                  <p className="font-medium text-sm">{doc.name}</p>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <span>{doc.type.charAt(0).toUpperCase() + doc.type.slice(1)}</span>
                    <span className="mx-1">•</span>
                    <span>{doc.size}</span>
                    <span className="mx-1">•</span>
                    <span>{new Date(doc.uploadDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <a
                href={doc.url}
                download
                className="text-blue-600 hover:text-blue-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="h-5 w-5" />
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectDocuments;