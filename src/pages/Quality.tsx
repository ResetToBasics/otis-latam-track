import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Filter,
  Plus,
  ArrowUpDown,
  CheckCircle,
  AlertCircle,
  BarChart2,
  FileText,
  AlertTriangle,
  ArrowUpRight,
  Camera,
  Clock,
  ListChecks,
  ChevronRight
} from 'lucide-react';

// Mock para não conformidades
const nonConformities = [
  {
    id: "NC-BR-001",
    projectId: "BR-2023-001",
    title: "Dimensões incorretas do poço",
    description: "Dimensões do poço não correspondem às especificações do projeto",
    category: "Instalação",
    severity: "alta",
    createdBy: "Carlos Silva",
    createdDate: "15/04/2023",
    status: "em-andamento",
    dueDate: "30/04/2023",
    assignedTo: "Equipe Técnica A",
    location: "São Paulo, Brasil"
  },
  {
    id: "NC-MX-015",
    projectId: "MX-2023-042",
    title: "Falha na instalação elétrica",
    description: "Conexões elétricas não seguem o padrão de segurança",
    category: "Elétrica",
    severity: "crítica",
    createdBy: "Miguel Rodriguez",
    createdDate: "10/04/2023",
    status: "resolvido",
    dueDate: "20/04/2023",
    resolvedDate: "18/04/2023",
    assignedTo: "Equipe Técnica B",
    location: "Cidade do México, México"
  },
  {
    id: "NC-CL-007",
    projectId: "CL-2023-007",
    title: "Vibração excessiva",
    description: "Elevador apresenta vibração acima do limite permitido",
    category: "Mecânica",
    severity: "média",
    createdBy: "Andrés Martinez",
    createdDate: "05/04/2023",
    status: "validação",
    dueDate: "15/04/2023",
    assignedTo: "Equipe Técnica C",
    location: "Santiago, Chile"
  },
  {
    id: "NC-BR-022",
    projectId: "BR-2023-005",
    title: "Acabamento da cabine danificado",
    description: "Painel interno da cabine apresenta arranhões profundos",
    category: "Acabamento",
    severity: "baixa",
    createdBy: "Amanda Oliveira",
    createdDate: "12/04/2023",
    status: "pendente",
    dueDate: "22/04/2023",
    assignedTo: "Equipe Técnica A",
    location: "Rio de Janeiro, Brasil"
  }
];

// Mock para checklists de qualidade
const qualityChecklists = [
  {
    id: "QC-INST-001",
    name: "Checklist de Instalação",
    description: "Verificação padrão para novas instalações",
    items: [
      { id: 1, task: "Verificar alinhamento das guias", required: true },
      { id: 2, task: "Testar sistema de segurança", required: true },
      { id: 3, task: "Verificar nivelamento da cabine", required: true },
      { id: 4, task: "Testar alarme de emergência", required: true },
      { id: 5, task: "Verificar funcionamento das portas", required: true },
      { id: 6, task: "Testar sistema de comunicação", required: true }
    ]
  },
  {
    id: "QC-MAINT-002",
    name: "Checklist de Manutenção",
    description: "Verificação para manutenções preventivas",
    items: [
      { id: 1, task: "Inspeção de cabos e polias", required: true },
      { id: 2, task: "Verificar sistema de frenagem", required: true },
      { id: 3, task: "Testar sistema elétrico", required: true },
      { id: 4, task: "Verificar lubrificação", required: true },
      { id: 5, task: "Inspeção de desgaste de componentes", required: true }
    ]
  }
];

// Mock para inspeções realizadas
const qualityInspections = [
  {
    id: "INSP-BR-042",
    projectId: "BR-2023-001",
    checklistId: "QC-INST-001",
    inspector: "Roberto Mendes",
    date: "12/04/2023",
    status: "aprovado",
    comments: "Instalação dentro dos padrões de qualidade",
    location: "São Paulo, Brasil",
    results: [
      { itemId: 1, passed: true, comments: "" },
      { itemId: 2, passed: true, comments: "" },
      { itemId: 3, passed: true, comments: "" },
      { itemId: 4, passed: true, comments: "" },
      { itemId: 5, passed: true, comments: "" },
      { itemId: 6, passed: true, comments: "" }
    ]
  },
  {
    id: "INSP-MX-015",
    projectId: "MX-2023-042",
    checklistId: "QC-INST-001",
    inspector: "Miguel Hernandez",
    date: "10/04/2023",
    status: "reprovado",
    comments: "Problemas identificados no sistema de portas",
    location: "Cidade do México, México",
    results: [
      { itemId: 1, passed: true, comments: "" },
      { itemId: 2, passed: true, comments: "" },
      { itemId: 3, passed: true, comments: "" },
      { itemId: 4, passed: true, comments: "" },
      { itemId: 5, passed: false, comments: "Portas não fecham corretamente" },
      { itemId: 6, passed: true, comments: "" }
    ]
  },
  {
    id: "INSP-CL-007",
    projectId: "CL-2023-007",
    checklistId: "QC-MAINT-002",
    inspector: "Andrés Valdivia",
    date: "08/04/2023",
    status: "pendente",
    comments: "Inspeção parcial, necessário retorno",
    location: "Santiago, Chile",
    results: [
      { itemId: 1, passed: true, comments: "" },
      { itemId: 2, passed: null, comments: "Aguardando peça para teste" },
      { itemId: 3, passed: true, comments: "" },
      { itemId: 4, passed: true, comments: "" },
      { itemId: 5, passed: null, comments: "Verificação pendente" }
    ]
  }
];

// Mock para métricas de qualidade
const qualityMetrics = {
  firstTimeQuality: 85,
  defectDensity: 1.2,
  inspectionPassRate: 92,
  resolutionTime: 2.3,
  reliabilityIndex: 95,
  nonConformityByCategory: [
    { category: "Instalação", count: 12 },
    { category: "Elétrica", count: 8 },
    { category: "Mecânica", count: 7 },
    { category: "Acabamento", count: 5 },
    { category: "Documentação", count: 3 }
  ],
  nonConformityByCountry: [
    { country: "Brasil", count: 15 },
    { country: "México", count: 10 },
    { country: "Chile", count: 6 },
    { country: "Colômbia", count: 4 },
    { country: "Argentina", count: 3 }
  ],
  monthlyTrend: [
    { month: "Jan", count: 10, resolved: 8 },
    { month: "Fev", count: 12, resolved: 10 },
    { month: "Mar", count: 8, resolved: 9 },
    { month: "Abr", count: 15, resolved: 12 }
  ]
};

const Quality = () => {
  const [selectedTab, setSelectedTab] = useState("non-conformities");
  const [selectedNonConformity, setSelectedNonConformity] = useState(null);
  const [selectedInspection, setSelectedInspection] = useState(null);

  // Lidar com seleção de não conformidade
  const handleSelectNonConformity = (nonConformity) => {
    setSelectedNonConformity(nonConformity);
  };

  // Lidar com seleção de inspeção
  const handleSelectInspection = (inspection) => {
    setSelectedInspection(inspection);
  };

  // Renderizar detalhes de não conformidade
  const renderNonConformityDetails = () => {
    if (!selectedNonConformity) return null;

    return (
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <CardTitle className="text-xl">{selectedNonConformity.title}</CardTitle>
              <CardDescription className="mt-1">
                ID: {selectedNonConformity.id} | Projeto: {selectedNonConformity.projectId}
              </CardDescription>
            </div>
            <Badge variant="outline" className={
              selectedNonConformity.status === 'resolvido'
                ? "bg-green-100 text-green-800 border-green-200"
                : selectedNonConformity.status === 'em-andamento'
                  ? "bg-blue-100 text-blue-800 border-blue-200"
                  : selectedNonConformity.status === 'validação'
                    ? "bg-purple-100 text-purple-800 border-purple-200"
                    : "bg-yellow-100 text-yellow-800 border-yellow-200"
            }>
              {selectedNonConformity.status === 'resolvido' ? 'Resolvido' :
               selectedNonConformity.status === 'em-andamento' ? 'Em Andamento' :
               selectedNonConformity.status === 'validação' ? 'Em Validação' : 'Pendente'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Detalhes</h3>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Descrição:</span> {selectedNonConformity.description}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Categoria:</span> {selectedNonConformity.category}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Severidade:</span> {selectedNonConformity.severity.charAt(0).toUpperCase() + selectedNonConformity.severity.slice(1)}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Local:</span> {selectedNonConformity.location}
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Responsabilidades</h3>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Reportado por:</span> {selectedNonConformity.createdBy}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Data de criação:</span> {selectedNonConformity.createdDate}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Atribuído para:</span> {selectedNonConformity.assignedTo}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Prazo:</span> {selectedNonConformity.dueDate}
                </p>
                {selectedNonConformity.resolvedDate && (
                  <p className="text-sm">
                    <span className="font-medium">Resolvido em:</span> {selectedNonConformity.resolvedDate}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Análise de Causa Raiz</h3>
            <div className="p-3 border rounded-md">
              <p className="text-sm">
                A análise de causa raiz está em andamento. Será documentada e atualizada assim que
                a investigação for concluída pela equipe técnica.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Ações Corretivas</h3>
            <div className="space-y-2">
              <div className="p-3 border rounded-md bg-blue-50 border-blue-200">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Revisão da instalação conforme especificações</div>
                  <Badge variant="outline">Em Andamento</Badge>
                </div>
                <div className="text-sm text-muted-foreground mt-1">Responsável: Equipe Técnica A</div>
              </div>
              <div className="p-3 border rounded-md">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Atualização dos procedimentos de verificação</div>
                  <Badge variant="outline">Pendente</Badge>
                </div>
                <div className="text-sm text-muted-foreground mt-1">Responsável: Depto. de Qualidade</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Evidências</h3>
            <div className="p-3 border rounded-md flex items-center justify-center">
              <div className="text-center p-6 border-2 border-dashed border-muted rounded-lg w-full">
                <Camera className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-2">Adicione fotos ou documentos como evidência</p>
                <Button size="sm">Upload de Arquivo</Button>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline">Fechar</Button>
          {selectedNonConformity.status !== 'resolvido' && (
            <Button className="bg-otis-500 hover:bg-otis-600">Atualizar Status</Button>
          )}
        </CardFooter>
      </Card>
    );
  };

  // Renderizar detalhes de inspeção
  const renderInspectionDetails = () => {
    if (!selectedInspection) return null;

    const checklist = qualityChecklists.find(c => c.id === selectedInspection.checklistId);

    return (
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <CardTitle className="text-xl">Inspeção {selectedInspection.id}</CardTitle>
              <CardDescription className="mt-1">
                Projeto: {selectedInspection.projectId} | {selectedInspection.location}
              </CardDescription>
            </div>
            <Badge variant="outline" className={
              selectedInspection.status === 'aprovado'
                ? "bg-green-100 text-green-800 border-green-200"
                : selectedInspection.status === 'reprovado'
                  ? "bg-red-100 text-red-800 border-red-200"
                  : "bg-yellow-100 text-yellow-800 border-yellow-200"
            }>
              {selectedInspection.status.charAt(0).toUpperCase() + selectedInspection.status.slice(1)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Informações da Inspeção</h3>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Checklist:</span> {checklist?.name}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Inspetor:</span> {selectedInspection.inspector}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Data:</span> {selectedInspection.date}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Comentários:</span> {selectedInspection.comments}
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Resumo dos Resultados</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-green-500 h-2.5 rounded-full"
                      style={{ width: `${(selectedInspection.results.filter(r => r.passed === true).length / selectedInspection.results.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">
                    {Math.round((selectedInspection.results.filter(r => r.passed === true).length / selectedInspection.results.length) * 100)}%
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-xs">Aprovados: {selectedInspection.results.filter(r => r.passed === true).length}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-xs">Reprovados: {selectedInspection.results.filter(r => r.passed === false).length}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <span className="text-xs">Pendentes: {selectedInspection.results.filter(r => r.passed === null).length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Resultados Detalhados</h3>
            {selectedInspection.results.map((result, index) => {
              const item = checklist?.items.find(i => i.itemId === result.itemId) ||
                           { id: result.itemId, task: `Item ${result.itemId}`, required: true };

              return (
                <div
                  key={index}
                  className={`p-3 border rounded-md flex items-start justify-between ${
                    result.passed === true
                      ? 'bg-green-50 border-green-200'
                      : result.passed === false
                        ? 'bg-red-50 border-red-200'
                        : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {result.passed === true ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    ) : result.passed === false ? (
                      <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    ) : (
                      <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                    )}
                    <div>
                      <div className="font-medium">{item.task}</div>
                      {result.comments && (
                        <div className="text-sm text-muted-foreground mt-1">{result.comments}</div>
                      )}
                    </div>
                  </div>
                  <Badge variant="outline" className={
                    result.passed === true
                      ? "bg-green-100 text-green-800 border-green-200"
                      : result.passed === false
                        ? "bg-red-100 text-red-800 border-red-200"
                        : "bg-yellow-100 text-yellow-800 border-yellow-200"
                  }>
                    {result.passed === true ? 'Aprovado' :
                     result.passed === false ? 'Reprovado' : 'Pendente'}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline">Fechar</Button>
          {selectedInspection.status === 'pendente' && (
            <Button className="bg-otis-500 hover:bg-otis-600">Concluir Inspeção</Button>
          )}
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Gestão da Qualidade</h1>
        <p className="text-muted-foreground mt-1">
          Controle de qualidade e tratamento de não conformidades da OTIS LATAM
        </p>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid grid-cols-1 sm:grid-cols-4 w-full mb-6">
          <TabsTrigger value="non-conformities">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Não Conformidades
          </TabsTrigger>
          <TabsTrigger value="inspections">
            <ListChecks className="h-4 w-4 mr-2" />
            Inspeções
          </TabsTrigger>
          <TabsTrigger value="checklists">
            <FileText className="h-4 w-4 mr-2" />
            Checklists
          </TabsTrigger>
          <TabsTrigger value="metrics">
            <BarChart2 className="h-4 w-4 mr-2" />
            Métricas
          </TabsTrigger>
        </TabsList>

        {/* Aba de Não Conformidades */}
        <TabsContent value="non-conformities" className="mt-0 space-y-4">
          {!selectedNonConformity ? (
            <>
              <div className="flex flex-wrap gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input
                    type="search"
                    placeholder="Buscar não conformidades..."
                    className="pl-8 w-full bg-white dark:bg-sidebar"
                  />
                </div>

                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os Status</SelectItem>
                      <SelectItem value="pending">Pendentes</SelectItem>
                      <SelectItem value="in-progress">Em Andamento</SelectItem>
                      <SelectItem value="validation">Em Validação</SelectItem>
                      <SelectItem value="resolved">Resolvidos</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button>
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros
                  </Button>
                </div>

                <Button className="bg-otis-500 hover:bg-otis-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Não Conformidade
                </Button>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Lista de Não Conformidades</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-auto">
                    <table className="w-full data-table">
                      <thead>
                        <tr>
                          <th className="whitespace-nowrap">
                            <Button variant="ghost" size="sm" className="p-0 font-medium text-sm -ml-3">
                              ID <ArrowUpDown className="h-3 w-3 ml-1" />
                            </Button>
                          </th>
                          <th>
                            <Button variant="ghost" size="sm" className="p-0 font-medium text-sm text-left -ml-3">
                              Título <ArrowUpDown className="h-3 w-3 ml-1" />
                            </Button>
                          </th>
                          <th className="hidden md:table-cell">Categoria</th>
                          <th className="hidden md:table-cell">Severidade</th>
                          <th className="hidden md:table-cell">
                            <Button variant="ghost" size="sm" className="p-0 font-medium text-sm -ml-3">
                              Data <ArrowUpDown className="h-3 w-3 ml-1" />
                            </Button>
                          </th>
                          <th>Status</th>
                          <th className="text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {nonConformities.map((nc) => (
                          <tr key={nc.id} className="hover:bg-muted/50">
                            <td className="font-medium text-sm">{nc.id}</td>
                            <td>
                              <div className="font-medium">{nc.title}</div>
                              <div className="text-xs text-muted-foreground md:hidden">
                                {nc.category} | {nc.severity.charAt(0).toUpperCase() + nc.severity.slice(1)}
                              </div>
                            </td>
                            <td className="hidden md:table-cell">{nc.category}</td>
                            <td className="hidden md:table-cell">
                              <Badge variant="outline" className={
                                nc.severity === 'crítica'
                                  ? "bg-red-100 text-red-800 border-red-200"
                                  : nc.severity === 'alta'
                                    ? "bg-orange-100 text-orange-800 border-orange-200"
                                    : nc.severity === 'média'
                                      ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                      : "bg-blue-100 text-blue-800 border-blue-200"
                              }>
                                {nc.severity.charAt(0).toUpperCase() + nc.severity.slice(1)}
                              </Badge>
                            </td>
                            <td className="hidden md:table-cell">{nc.createdDate}</td>
                            <td>
                              <Badge variant="outline" className={
                                nc.status === 'resolvido'
                                  ? "bg-green-100 text-green-800 border-green-200"
                                  : nc.status === 'em-andamento'
                                    ? "bg-blue-100 text-blue-800 border-blue-200"
                                    : nc.status === 'validação'
                                      ? "bg-purple-100 text-purple-800 border-purple-200"
                                      : "bg-yellow-100 text-yellow-800 border-yellow-200"
                              }>
                                {nc.status === 'resolvido' ? 'Resolvido' :
                                 nc.status === 'em-andamento' ? 'Em Andamento' :
                                 nc.status === 'validação' ? 'Em Validação' : 'Pendente'}
                              </Badge>
                            </td>
                            <td className="text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleSelectNonConformity(nc)}
                              >
                                Detalhes
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-2 mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedNonConformity(null)}
                >
                  <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
                  Voltar para a lista
                </Button>
              </div>

              {renderNonConformityDetails()}
            </>
          )}
        </TabsContent>

        {/* Aba de Inspeções */}
        <TabsContent value="inspections" className="mt-0 space-y-4">
          {!selectedInspection ? (
            <>
              <div className="flex flex-wrap gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input
                    type="search"
                    placeholder="Buscar inspeções..."
                    className="pl-8 w-full bg-white dark:bg-sidebar"
                  />
                </div>

                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os Status</SelectItem>
                      <SelectItem value="approved">Aprovados</SelectItem>
                      <SelectItem value="rejected">Reprovados</SelectItem>
                      <SelectItem value="pending">Pendentes</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button>
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros
                  </Button>
                </div>

                <Button className="bg-otis-500 hover:bg-otis-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Inspeção
                </Button>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Inspeções de Qualidade</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-auto">
                    <table className="w-full data-table">
                      <thead>
                        <tr>
                          <th className="whitespace-nowrap">
                            <Button variant="ghost" size="sm" className="p-0 font-medium text-sm -ml-3">
                              ID <ArrowUpDown className="h-3 w-3 ml-1" />
                            </Button>
                          </th>
                          <th>Projeto</th>
                          <th className="hidden md:table-cell">Local</th>
                          <th className="hidden md:table-cell">Inspetor</th>
                          <th className="hidden md:table-cell">
                            <Button variant="ghost" size="sm" className="p-0 font-medium text-sm -ml-3">
                              Data <ArrowUpDown className="h-3 w-3 ml-1" />
                            </Button>
                          </th>
                          <th>Status</th>
                          <th className="text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {qualityInspections.map((inspection) => (
                          <tr key={inspection.id} className="hover:bg-muted/50">
                            <td className="font-medium text-sm">{inspection.id}</td>
                            <td>
                              <div className="font-medium">{inspection.projectId}</div>
                              <div className="text-xs text-muted-foreground md:hidden">
                                {inspection.location}
                              </div>
                            </td>
                            <td className="hidden md:table-cell">{inspection.location}</td>
                            <td className="hidden md:table-cell">{inspection.inspector}</td>
                            <td className="hidden md:table-cell">{inspection.date}</td>
                            <td>
                              <Badge variant="outline" className={
                                inspection.status === 'aprovado'
                                  ? "bg-green-100 text-green-800 border-green-200"
                                  : inspection.status === 'reprovado'
                                    ? "bg-red-100 text-red-800 border-red-200"
                                    : "bg-yellow-100 text-yellow-800 border-yellow-200"
                              }>
                                {inspection.status.charAt(0).toUpperCase() + inspection.status.slice(1)}
                              </Badge>
                            </td>
                            <td className="text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleSelectInspection(inspection)}
                              >
                                Detalhes
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-2 mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedInspection(null)}
                >
                  <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
                  Voltar para a lista
                </Button>
              </div>

              {renderInspectionDetails()}
            </>
          )}
        </TabsContent>

        {/* Aba de Checklists */}
        <TabsContent value="checklists" className="mt-0 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Modelos de Checklists</h2>
            <Button className="bg-otis-500 hover:bg-otis-600">
              <Plus className="h-4 w-4 mr-2" />
              Novo Checklist
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {qualityChecklists.map(checklist => (
              <Card key={checklist.id}>
                <CardHeader>
                  <CardTitle>{checklist.name}</CardTitle>
                  <CardDescription>{checklist.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {checklist.items.slice(0, 3).map(item => (
                      <div key={item.id} className="p-2 border rounded-md flex items-center">
                        <div className="h-4 w-4 border rounded-sm mr-2 flex-shrink-0"></div>
                        <span className="text-sm">{item.task}</span>
                      </div>
                    ))}
                    {checklist.items.length > 3 && (
                      <div className="text-sm text-muted-foreground mt-2">
                        + {checklist.items.length - 3} itens adicionais
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Editar Checklist</Button>
                </CardFooter>
              </Card>
            ))}

            <Card className="border-dashed border-2">
              <CardContent className="flex flex-col items-center justify-center h-full p-6">
                <Plus className="h-8 w-8 text-muted-foreground mb-2" />
                <h3 className="font-medium mb-1">Criar Novo Checklist</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Adicione um novo modelo de checklist para inspeções de qualidade
                </p>
                <Button>Adicionar Checklist</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Aba de Métricas */}
        <TabsContent value="metrics" className="mt-0">
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            {/* Métricas principais */}
            <Card>
              <CardHeader>
                <CardTitle>Métricas de Qualidade</CardTitle>
                <CardDescription>
                  Indicadores-chave de desempenho de qualidade
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm">First-Time Quality Rate</span>
                      <span className="font-medium">{qualityMetrics.firstTimeQuality}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${qualityMetrics.firstTimeQuality}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm">Inspection Pass Rate</span>
                      <span className="font-medium">{qualityMetrics.inspectionPassRate}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${qualityMetrics.inspectionPassRate}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm">Reliability Index</span>
                      <span className="font-medium">{qualityMetrics.reliabilityIndex}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${qualityMetrics.reliabilityIndex}%` }}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="border rounded-md p-4">
                      <div className="text-sm text-muted-foreground">Defect Density</div>
                      <div className="text-2xl font-bold mt-2">{qualityMetrics.defectDensity}</div>
                      <div className="text-xs text-muted-foreground">por instalação</div>
                    </div>

                    <div className="border rounded-md p-4">
                      <div className="text-sm text-muted-foreground">Resolution Time</div>
                      <div className="text-2xl font-bold mt-2">{qualityMetrics.resolutionTime}</div>
                      <div className="text-xs text-muted-foreground">dias em média</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Gráfico de não conformidades por categoria */}
            <Card>
              <CardHeader>
                <CardTitle>Não Conformidades por Categoria</CardTitle>
                <CardDescription>
                  Distribuição de ocorrências por tipo
                </CardDescription>
              </CardHeader>
              <CardContent className="h-64 flex justify-center items-center">
                <div className="text-center text-muted-foreground">
                  [Gráfico de Barras por Categoria]
                </div>
              </CardContent>
            </Card>

            {/* Gráfico de tendências */}
            <Card>
              <CardHeader>
                <CardTitle>Tendências Mensais</CardTitle>
                <CardDescription>
                  Evolução de não conformidades x resoluções
                </CardDescription>
              </CardHeader>
              <CardContent className="h-64 flex justify-center items-center">
                <div className="text-center text-muted-foreground">
                  [Gráfico de Linha de Tendências]
                </div>
              </CardContent>
            </Card>

            {/* Gráfico por país */}
            <Card>
              <CardHeader>
                <CardTitle>Análise por País</CardTitle>
                <CardDescription>
                  Comparativo de não conformidades entre países
                </CardDescription>
              </CardHeader>
              <CardContent className="h-64 flex justify-center items-center">
                <div className="text-center text-muted-foreground">
                  [Gráfico de Barras por País]
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Quality;