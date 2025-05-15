// src/components/projects/ProjectIssues.jsx
import React, { useState, useEffect } from 'react';
import { AlertTriangle, Check, X, AlertCircle, Info, Search, Filter, Camera, Plus } from 'lucide-react';
import api from '../../services/api';

const ProjectIssues = ({ projectId }) => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [showAddIssue, setShowAddIssue] = useState(false);
  const [newIssue, setNewIssue] = useState({
    title: '',
    description: '',
    severity: 'medium',
    phase: 'installation',
    assignedTo: ''
  });

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/projects/${projectId}/issues`);
        setIssues(response.data);
      } catch (err) {
        setError('Erro ao carregar problemas. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, [projectId]);

  const handleSubmitIssue = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(`/projects/${projectId}/issues`, newIssue);
      setIssues([response.data, ...issues]);
      setShowAddIssue(false);
      setNewIssue({
        title: '',
        description: '',
        severity: 'medium',
        phase: 'installation',
        assignedTo: ''
      });
    } catch (err) {
      setError('Erro ao criar problema. Tente novamente.');
    }
  };

  const handleResolveIssue = async (issueId) => {
    try {
      await api.post(`/projects/${projectId}/issues/${issueId}/resolve`);

      setIssues(issues.map(issue =>
        issue.id === issueId
          ? { ...issue, status: 'resolved', resolvedDate: new Date().toISOString() }
          : issue
      ));
    } catch (err) {
      setError('Erro ao resolver problema. Tente novamente.');
    }
  };

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'critical':
        return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">Crítico</span>;
      case 'high':
        return <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">Alto</span>;
      case 'medium':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">Médio</span>;
      case 'low':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">Baixo</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">Indefinido</span>;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'open':
        return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">Aberto</span>;
      case 'in-progress':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">Em andamento</span>;
      case 'resolved':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Resolvido</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">Indefinido</span>;
    }
  };

  const filteredIssues = issues.filter(issue => {
    // Filtro por status
    if (filterStatus !== 'all' && issue.status !== filterStatus) return false;

    // Filtro por severidade
    if (filterSeverity !== 'all' && issue.severity !== filterSeverity) return false;

    // Filtro por busca
    if (searchQuery && !issue.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    return true;
  });

  if (loading) {
    return <div className="text-center p-8">Carregando problemas...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-lg flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
          Problemas e Não Conformidades
        </h3>

        <button
          className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm flex items-center"
          onClick={() => setShowAddIssue(!showAddIssue)}
        >
          {showAddIssue ? (
            <>
              <X className="h-4 w-4 mr-1" />
              Cancelar
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-1" />
              Novo Problema
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {showAddIssue && (
        <div className="border rounded-md p-4 bg-gray-50">
          <h4 className="font-medium mb-4">Registrar Novo Problema</h4>

          <form onSubmit={handleSubmitIssue} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Título</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md"
                value={newIssue.title}
                onChange={(e) => setNewIssue({...newIssue, title: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Descrição</label>
              <textarea
                className="w-full px-3 py-2 border rounded-md"
                rows="3"
                value={newIssue.description}
                onChange={(e) => setNewIssue({...newIssue, description: e.target.value})}
                required
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Severidade</label>
                <select
                  className="w-full px-3 py-2 border rounded-md"
                  value={newIssue.severity}
                  onChange={(e) => setNewIssue({...newIssue, severity: e.target.value})}
                >
                  <option value="low">Baixa</option>
                  <option value="medium">Média</option>
                  <option value="high">Alta</option>
                  <option value="critical">Crítica</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Fase</label>
                <select
                  className="w-full px-3 py-2 border rounded-md"
                  value={newIssue.phase}
                  onChange={(e) => setNewIssue({...newIssue, phase: e.target.value})}
                >
                  <option value="sale">Venda</option>
                  <option value="pre-installation">Pré-Instalação</option>
                  <option value="installation">Instalação</option>
                  <option value="commissioning">Comissionamento</option>
                  <option value="after-sales">Pós-Venda</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Responsável</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md"
                value={newIssue.assignedTo}
                onChange={(e) => setNewIssue({...newIssue, assignedTo: e.target.value})}
                placeholder="Nome do responsável (opcional)"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="px-4 py-2 border rounded-md mr-2"
                onClick={() => setShowAddIssue(false)}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            className="w-full pl-8 pr-4 py-2 border rounded-md text-sm"
            placeholder="Buscar problemas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select
          className="border p-2 rounded-md text-sm"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">Todos os Status</option>
          <option value="open">Abertos</option>
          <option value="in-progress">Em Andamento</option>
          <option value="resolved">Resolvidos</option>
        </select>

        <select
          className="border p-2 rounded-md text-sm"
          value={filterSeverity}
          onChange={(e) => setFilterSeverity(e.target.value)}
        >
          <option value="all">Todas as Severidades</option>
          <option value="critical">Crítico</option>
          <option value="high">Alto</option>
          <option value="medium">Médio</option>
          <option value="low">Baixo</option>
        </select>
      </div>

      {filteredIssues.length === 0 ? (
        <div className="text-center py-8 text-gray-500 border rounded-md">
          {issues.length === 0 ?
            'Nenhum problema registrado para este projeto.' :
            'Nenhum problema encontrado com os filtros selecionados.'}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredIssues.map(issue => (
            <div
              key={issue.id}
              className={`border rounded-md p-4 ${
                issue.status === 'resolved' ? 'bg-green-50 border-green-200' : ''
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start">
                    <AlertTriangle className={`h-5 w-5 mr-2 flex-shrink-0 ${
                      issue.severity === 'critical' ? 'text-red-500' :
                      issue.severity === 'high' ? 'text-orange-500' :
                      issue.severity === 'medium' ? 'text-yellow-500' :
                      'text-blue-500'
                    }`} />

                    <div>
                      <h4 className="font-medium">{issue.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{issue.description}</p>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Reportado por: </span>
                      <span>{issue.reportedBy}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Data: </span>
                      <span>{new Date(issue.reportDate).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Fase: </span>
                      <span>{issue.phase === 'sale' ? 'Venda' :
                             issue.phase === 'pre-installation' ? 'Pré-Instalação' :
                             issue.phase === 'installation' ? 'Instalação' :
                             issue.phase === 'commissioning' ? 'Comissionamento' : 'Pós-Venda'}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Responsável: </span>
                      <span>{issue.assignedTo || 'Não atribuído'}</span>
                    </div>
                  </div>

                  {issue.comments && issue.comments.length > 0 && (
                    <div className="mt-3 pt-3 border-t">
                      <h5 className="text-sm font-medium mb-2">Comentários:</h5>
                      <div className="space-y-2">
                        {issue.comments.map((comment, idx) => (
                          <div key={idx} className="text-sm bg-gray-50 p-2 rounded-md">
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                              <span>{comment.author}</span>
                              <span>{new Date(comment.date).toLocaleString()}</span>
                            </div>
                            <p>{comment.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end space-y-2">
                  <div className="flex space-x-2">
                    {getSeverityBadge(issue.severity)}
                    {getStatusBadge(issue.status)}
                  </div>

                  {issue.status !== 'resolved' && (
                    <button
                      className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded-md flex items-center"
                      onClick={() => handleResolveIssue(issue.id)}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Resolver
                    </button>
                  )}

                  {issue.resolvedDate && (
                    <div className="text-xs text-gray-500">
                      Resolvido em: {new Date(issue.resolvedDate).toLocaleDateString()}
                    </div>
                  )}

                  {issue.evidenceUrl && (
                    <a
                      href={issue.evidenceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                    >
                      <Camera className="h-4 w-4 mr-1" />
                      Ver evidência
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectIssues;