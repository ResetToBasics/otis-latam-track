// src/pages/projects/ProjectDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Building, User, FileText, MessageSquare, AlertTriangle, CheckCircle } from 'lucide-react';
import api from '../../services/api';
import ProjectProgress from '../../components/projects/ProjectProgress';
import PhaseChecklist from '../../components/projects/PhaseChecklist';
import PhaseTransition from '../../components/projects/PhaseTransition';
import ProjectTimeline from '../../components/projects/ProjectTimeline';
import ProjectDocuments from '../../components/projects/ProjectDocuments';
import ProjectIssues from '../../components/projects/ProjectIssues';
import ClientFeedback from '../../components/feedback/ClientFeedback';

const ProjectDetails = () => {
  const { projectId, phase } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(phase || 'overview');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/projects/${projectId}`);
        setProject(response.data);

        // Se não tiver phase nos parâmetros, configurar para a fase atual do projeto
        if (!phase) {
          setActiveTab(response.data.currentPhase);
        }
      } catch (error) {
        setError('Erro ao carregar dados do projeto. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId, phase]);

  useEffect(() => {
    if (phase) {
      setActiveTab(phase);
    }
  }, [phase]);

  const handlePhaseChange = (newPhase) => {
    setProject({
      ...project,
      currentPhase: newPhase
    });

    setActiveTab(newPhase);
  };

  if (loading) {
    return <div className="p-8 text-center">Carregando detalhes do projeto...</div>;
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error}</p>
          <Link to="/projects" className="text-blue-600 hover:text-blue-800 mt-2 inline-block">
            Voltar para lista de projetos
          </Link>
        </div>
      </div>
    );
  }

  const phases = [
    { id: 'overview', label: 'Visão Geral', icon: <Building className="h-4 w-4" /> },
    { id: 'sale', label: 'Venda', icon: <FileText className="h-4 w-4" /> },
    { id: 'pre-installation', label: 'Pré-Instalação', icon: <Calendar className="h-4 w-4" /> },
    { id: 'installation', label: 'Instalação', icon: <FileText className="h-4 w-4" /> },
    { id: 'commissioning', label: 'Comissionamento', icon: <CheckCircle className="h-4 w-4" /> },
    { id: 'after-sales', label: 'Pós-Venda', icon: <MessageSquare className="h-4 w-4" /> },
    { id: 'issues', label: 'Problemas', icon: <AlertTriangle className="h-4 w-4" /> }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/projects" className="text-blue-600 hover:text-blue-800 flex items-center">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Voltar para Projetos
        </Link>

        <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">{project.name}</h1>
            <p className="text-gray-600 mt-1">ID: {project.id}</p>
          </div>

          <div className="mt-4 md:mt-0">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
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

        <div className="mt-4 flex flex-col md:flex-row md:items-center text-sm text-gray-500">
          <div className="flex items-center mr-6">
            <Building className="h-4 w-4 mr-1" />
            Cliente: {project.client}
          </div>
          <div className="flex items-center mr-6">
            <MapPin className="h-4 w-4 mr-1" />
            {project.location}
          </div>
          <div className="flex items-center mr-6">
            <Calendar className="h-4 w-4 mr-1" />
            {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            Gestor: {project.manager}
          </div>
        </div>
      </div>

      {/* Tabs de navegação */}
      <div className="flex overflow-x-auto mb-6 border-b">
        {phases.map(p => (
          <button
            key={p.id}
            className={`px-4 py-2 flex items-center whitespace-nowrap border-b-2 ${
              activeTab === p.id
                ? 'border-blue-500 text-blue-600 font-medium'
                : 'border-transparent hover:text-blue-600'
            }`}
            onClick={() => setActiveTab(p.id)}
          >
            {p.icon}
            <span className="ml-2">{p.label}</span>
          </button>
        ))}
      </div>

      {/* Conteúdo baseado na tab selecionada */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <>
            <ProjectProgress project={project} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ProjectTimeline project={project} />
              <ProjectDocuments project={project} />
            </div>

            {project.currentPhase !== 'after-sales' && (
              <PhaseTransition project={project} onPhaseChange={handlePhaseChange} />
            )}
          </>
        )}

        {(activeTab === 'sale' ||
          activeTab === 'pre-installation' ||
          activeTab === 'installation' ||
          activeTab === 'commissioning' ||
          activeTab === 'after-sales') && (
          <>
            <PhaseChecklist projectId={project.id} phase={activeTab} />

            {/* Conteúdo específico para cada fase */}
            {activeTab === 'sale' && (
              <div className="border rounded-lg p-4 mt-6">
                <h3 className="font-medium text-lg mb-4">Detalhes da Venda</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-md p-3">
                    <h4 className="text-sm text-gray-500 mb-1">Contrato</h4>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{project.contractNumber || 'N/A'}</span>
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        Ver Contrato
                      </button>
                    </div>
                  </div>

                  <div className="border rounded-md p-3">
                    <h4 className="text-sm text-gray-500 mb-1">Valor Total</h4>
                    <div className="font-medium">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(project.contractValue || 0)}
                    </div>
                  </div>

                  <div className="border rounded-md p-3">
                    <h4 className="text-sm text-gray-500 mb-1">Vendedor</h4>
                    <div className="font-medium">{project.salesPerson || 'N/A'}</div>
                  </div>

                  <div className="border rounded-md p-3">
                    <h4 className="text-sm text-gray-500 mb-1">Data da Venda</h4>
                    <div className="font-medium">
                      {project.saleDate ? new Date(project.saleDate).toLocaleDateString() : 'N/A'}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm text-gray-500 mb-2">Produto Vendido</h4>
                  <div className="border rounded-md p-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <span className="text-sm text-gray-500">Modelo</span>
                        <div className="font-medium">{project.productModel || 'N/A'}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Capacidade</span>
                        <div className="font-medium">{project.productCapacity || 'N/A'}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Velocidade</span>
                        <div className="font-medium">{project.productSpeed || 'N/A'}</div>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t">
                      <span className="text-sm text-gray-500">Especificações</span>
                      <p className="mt-1">
                        {project.productSpecifications || 'Nenhuma especificação adicional.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'pre-installation' && (
              <div className="border rounded-lg p-4 mt-6">
                <h3 className="font-medium text-lg mb-4">Planejamento de Pré-Instalação</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-md p-3">
                    <h4 className="text-sm text-gray-500 mb-1">Data de Visita Técnica</h4>
                    <div className="font-medium">
                      {project.technicalVisitDate ? new Date(project.technicalVisitDate).toLocaleDateString() : 'Pendente'}
                    </div>
                  </div>

                  <div className="border rounded-md p-3">
                    <h4 className="text-sm text-gray-500 mb-1">Responsável Técnico</h4>
                    <div className="font-medium">{project.technicalLead || 'A definir'}</div>
                  </div>

                  <div className="border rounded-md p-3">
                    <h4 className="text-sm text-gray-500 mb-1">Status de Materiais</h4>
                    <div className="flex items-center">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        project.materialsStatus === 'confirmed' ? 'bg-green-100 text-green-800' :
                        project.materialsStatus === 'partial' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {project.materialsStatus === 'confirmed' ? 'Confirmado' :
                         project.materialsStatus === 'partial' ? 'Parcial' : 'Pendente'}
                      </span>
                    </div>
                  </div>

                  <div className="border rounded-md p-3">
                    <h4 className="text-sm text-gray-500 mb-1">Data de Início Prevista</h4>
                    <div className="font-medium">
                      {project.plannedInstallationStart ? new Date(project.plannedInstallationStart).toLocaleDateString() : 'A definir'}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm text-gray-500 mb-2">Verificação de Local</h4>
                  <div className="border rounded-md p-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-500">Status do Local</span>
                        <div className="font-medium">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            project.siteStatus === 'ready' ? 'bg-green-100 text-green-800' :
                            project.siteStatus === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {project.siteStatus === 'ready' ? 'Pronto' :
                             project.siteStatus === 'in-progress' ? 'Em Preparação' : 'Não Iniciado'}
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Responsável Cliente</span>
                        <div className="font-medium">{project.clientSiteContact || 'Não definido'}</div>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t">
                      <span className="text-sm text-gray-500">Observações do Local</span>
                      <p className="mt-1">
                        {project.siteNotes || 'Nenhuma observação registrada.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'installation' && (
              <div className="border rounded-lg p-4 mt-6">
                <h3 className="font-medium text-lg mb-4">Progresso da Instalação</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-md p-3">
                    <h4 className="text-sm text-gray-500 mb-1">Data de Início Real</h4>
                    <div className="font-medium">
                      {project.actualInstallationStart ? new Date(project.actualInstallationStart).toLocaleDateString() : 'Não iniciado'}
                    </div>
                  </div>

                  <div className="border rounded-md p-3">
                    <h4 className="text-sm text-gray-500 mb-1">Previsão de Conclusão</h4>
                    <div className="font-medium">
                      {project.forecastedCompletion ? new Date(project.forecastedCompletion).toLocaleDateString() : 'Não disponível'}
                    </div>
                  </div>

                  <div className="border rounded-md p-3">
                    <h4 className="text-sm text-gray-500 mb-1">Equipe Responsável</h4>
                    <div className="font-medium">{project.installationTeam || 'Não atribuído'}</div>
                  </div>

                  <div className="border rounded-md p-3">
                    <h4 className="text-sm text-gray-500 mb-1">Supervisor</h4>
                    <div className="font-medium">{project.supervisor || 'Não atribuído'}</div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm text-gray-500 mb-2">Etapas de Instalação</h4>

                  <div className="space-y-3">
                    {project.installationSteps?.map((step, index) => (
                      <div key={index} className="border rounded-md p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{step.name}</div>
                            <div className="text-sm text-gray-500 mt-1">
                              {step.startDate ? new Date(step.startDate).toLocaleDateString() : 'N/A'} -
                              {step.endDate ? new Date(step.endDate).toLocaleDateString() : 'N/A'}
                            </div>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            step.status === 'completed' ? 'bg-green-100 text-green-800' :
                            step.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                            step.status === 'pending' ? 'bg-gray-100 text-gray-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {step.status === 'completed' ? 'Concluído' :
                             step.status === 'in-progress' ? 'Em Andamento' :
                             step.status === 'pending' ? 'Pendente' : 'Atrasado'}
                          </span>
                        </div>

                        {step.progress !== undefined && (
                          <div className="mt-2">
                            <div className="flex justify-between text-xs mb-1">
                              <span>{step.progress}% Concluído</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  step.status === 'completed' ? 'bg-green-500' :
                                  step.status === 'in-progress' ? 'bg-blue-500' :
                                  step.status === 'delayed' ? 'bg-red-500' :
                                  'bg-gray-500'
                                }`}
                                style={{ width: `${step.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                    )) || (
                      <div className="text-center py-4 text-gray-500">
                        Nenhuma etapa de instalação registrada.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'commissioning' && (
              <div className="border rounded-lg p-4 mt-6">
                <h3 className="font-medium text-lg mb-4">Comissionamento e Testes</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-md p-3">
                    <h4 className="text-sm text-gray-500 mb-1">Status de Testes</h4>
                    <div className="flex items-center">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        project.testingStatus === 'passed' ? 'bg-green-100 text-green-800' :
                        project.testingStatus === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        project.testingStatus === 'failed' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {project.testingStatus === 'passed' ? 'Aprovado' :
                         project.testingStatus === 'in-progress' ? 'Em Andamento' :
                         project.testingStatus === 'failed' ? 'Falhou' : 'Pendente'}
                      </span>
                    </div>
                  </div>

                  <div className="border rounded-md p-3">
                    <h4 className="text-sm text-gray-500 mb-1">Data de Testes</h4>
                    <div className="font-medium">
                      {project.testingDate ? new Date(project.testingDate).toLocaleDateString() : 'Não agendado'}
                    </div>
                  </div>

                  <div className="border rounded-md p-3">
                    <h4 className="text-sm text-gray-500 mb-1">Inspetor Responsável</h4>
                    <div className="font-medium">{project.inspector || 'Não atribuído'}</div>
                  </div>

                  <div className="border rounded-md p-3">
                    <h4 className="text-sm text-gray-500 mb-1">Status de Certificação</h4>
                    <div className="flex items-center">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        project.certificationStatus === 'certified' ? 'bg-green-100 text-green-800' :
                        project.certificationStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {project.certificationStatus === 'certified' ? 'Certificado' :
                         project.certificationStatus === 'pending' ? 'Em Processo' : 'Não Iniciado'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm text-gray-500 mb-2">Resultados dos Testes</h4>

                  <div className="space-y-3">
                    {project.testResults?.map((test, index) => (
                      <div key={index} className="border rounded-md p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{test.name}</div>
                            <div className="text-sm text-gray-500 mt-1">
                              Realizado em: {test.date ? new Date(test.date).toLocaleDateString() : 'N/A'}
                            </div>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            test.result === 'pass' ? 'bg-green-100 text-green-800' :
                            test.result === 'fail' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {test.result === 'pass' ? 'Aprovado' :
                             test.result === 'fail' ? 'Reprovado' : 'Pendente'}
                          </span>
                        </div>

                        {test.notes && (
                          <div className="mt-2 text-sm">
                            <span className="text-gray-500">Observações:</span>
                            <p className="mt-1">{test.notes}</p>
                          </div>
                        )}
                      </div>
                    )) || (
                      <div className="text-center py-4 text-gray-500">
                        Nenhum resultado de teste registrado.
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm text-gray-500 mb-2">Treinamento do Cliente</h4>
                  <div className="border rounded-md p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">Sessão de Treinamento</div>
                        <div className="text-sm text-gray-500 mt-1">
                          Data: {project.trainingDate ? new Date(project.trainingDate).toLocaleDateString() : 'Não agendado'}
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        project.trainingStatus === 'completed' ? 'bg-green-100 text-green-800' :
                        project.trainingStatus === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {project.trainingStatus === 'completed' ? 'Concluído' :
                         project.trainingStatus === 'scheduled' ? 'Agendado' : 'Pendente'}
                      </span>
                    </div>

                    {project.trainingNotes && (
                      <div className="mt-2 text-sm">
                        <span className="text-gray-500">Observações:</span>
                        <p className="mt-1">{project.trainingNotes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'after-sales' && (
              <div className="border rounded-lg p-4 mt-6">
                <h3 className="font-medium text-lg mb-4">Acompanhamento Pós-Venda</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-md p-3">
                    <h4 className="text-sm text-gray-500 mb-1">Data de Entrega</h4>
                    <div className="font-medium">
                      {project.deliveryDate ? new Date(project.deliveryDate).toLocaleDateString() : 'Não concluído'}
                    </div>
                  </div>

                  <div className="border rounded-md p-3">
                    <h4 className="text-sm text-gray-500 mb-1">Garantia Válida Até</h4>
                    <div className="font-medium">
                      {project.warrantyEndDate ? new Date(project.warrantyEndDate).toLocaleDateString() : 'N/A'}
                    </div>
                  </div>

                  <div className="border rounded-md p-3">
                    <h4 className="text-sm text-gray-500 mb-1">Contrato de Manutenção</h4>
                    <div className="flex items-center">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        project.maintenanceContract === 'active' ? 'bg-green-100 text-green-800' :
                        project.maintenanceContract === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        project.maintenanceContract === 'declined' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {project.maintenanceContract === 'active' ? 'Ativo' :
                         project.maintenanceContract === 'pending' ? 'Em Negociação' :
                         project.maintenanceContract === 'declined' ? 'Recusado' : 'Não Oferecido'}
                      </span>
                    </div>
                  </div>

                  <div className="border rounded-md p-3">
                    <h4 className="text-sm text-gray-500 mb-1">Responsável Pós-Venda</h4>
                    <div className="font-medium">{project.afterSalesContact || 'Não atribuído'}</div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm text-gray-500 mb-2">Visitas de Acompanhamento</h4>

                  <div className="space-y-3">
                    {project.followUpVisits?.map((visit, index) => (
                      <div key={index} className="border rounded-md p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{visit.type}</div>
                            <div className="text-sm text-gray-500 mt-1">
                              Data: {visit.date ? new Date(visit.date).toLocaleDateString() : 'N/A'}
                            </div>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            visit.status === 'completed' ? 'bg-green-100 text-green-800' :
                            visit.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {visit.status === 'completed' ? 'Concluída' :
                             visit.status === 'scheduled' ? 'Agendada' : 'Pendente'}
                          </span>
                        </div>

                        {visit.findings && (
                          <div className="mt-2 text-sm">
                            <span className="text-gray-500">Observações:</span>
                            <p className="mt-1">{visit.findings}</p>
                          </div>
                        )}

                        {visit.recommendations && (
                          <div className="mt-2 text-sm">
                            <span className="text-gray-500">Recomendações:</span>
                            <p className="mt-1">{visit.recommendations}</p>
                          </div>
                        )}
                      </div>
                    )) || (
                      <div className="text-center py-4 text-gray-500">
                        Nenhuma visita de acompanhamento registrada.
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm text-gray-500 mb-2">Avaliações de Satisfação</h4>

                  <div className="space-y-3">
                    {project.satisfactionSurveys?.map((survey, index) => (
                      <div key={index} className="border rounded-md p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{survey.type}</div>
                            <div className="text-sm text-gray-500 mt-1">
                              Data: {survey.date ? new Date(survey.date).toLocaleDateString() : 'N/A'}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  className={`h-4 w-4 ${
                                    star <= survey.score ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                  }`}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                              ))}
                            </div>
                            <span className="ml-2 text-sm font-medium">{survey.score}/5</span>
                          </div>
                        </div>

                        {survey.comments && (
                          <div className="mt-2 text-sm">
                            <span className="text-gray-500">Comentários:</span>
                            <p className="mt-1">{survey.comments}</p>
                          </div>
                        )}
                      </div>
                    )) || (
                      <div className="text-center py-4 text-gray-500">
                        Nenhuma avaliação de satisfação registrada.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === 'issues' && (
          <ProjectIssues projectId={project.id} />
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;