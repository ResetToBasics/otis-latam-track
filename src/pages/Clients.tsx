import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Plus,
  Filter,
  ArrowUpDown,
  Building,
  BarChart4,
  Phone,
  Mail,
  MapPin,
  User,
  MessageSquare,
  Clock,
  ThumbsUp
} from "lucide-react";

// Mock data para clientes
const clientsList = [
  {
    id: "CL-001",
    name: "Grupo Empresarial Brasileiro",
    type: "Corporativo",
    country: "Brasil",
    city: "São Paulo",
    contactName: "Carlos Mendes",
    contactEmail: "carlos@geb.com.br",
    contactPhone: "+55 11 3456-7890",
    activeProjects: 3,
    completedProjects: 5,
    satisfactionScore: 4.7,
    lastContactDate: "10/04/2023",
  },
  {
    id: "CL-002",
    name: "Inversiones Mexicanas S.A.",
    type: "Incorporadora",
    country: "México",
    city: "Cidade do México",
    contactName: "Miguel Hernandez",
    contactEmail: "miguel@invmex.mx",
    contactPhone: "+52 55 2345-6789",
    activeProjects: 2,
    completedProjects: 1,
    satisfactionScore: 4.2,
    lastContactDate: "22/03/2023",
  },
  {
    id: "CL-003",
    name: "Consorcio Argentino",
    type: "Construtora",
    country: "Argentina",
    city: "Buenos Aires",
    contactName: "Laura Bianchi",
    contactEmail: "laura@consarg.com.ar",
    contactPhone: "+54 11 4567-8901",
    activeProjects: 1,
    completedProjects: 2,
    satisfactionScore: 3.8,
    lastContactDate: "15/04/2023",
  },
  {
    id: "CL-004",
    name: "Desarrollos Chilenos Ltda.",
    type: "Incorporadora",
    country: "Chile",
    city: "Santiago",
    contactName: "Andres Valdivia",
    contactEmail: "andres@deschile.cl",
    contactPhone: "+56 2 3456-7890",
    activeProjects: 0,
    completedProjects: 3,
    satisfactionScore: 4.9,
    lastContactDate: "05/03/2023",
  },
  {
    id: "CL-005",
    name: "Constructora Colombiana",
    type: "Construtora",
    country: "Colômbia",
    city: "Bogotá",
    contactName: "Sofia Restrepo",
    contactEmail: "sofia@constcol.co",
    contactPhone: "+57 1 2345-6789",
    activeProjects: 2,
    completedProjects: 1,
    satisfactionScore: 4.5,
    lastContactDate: "18/02/2023",
  },
  {
    id: "CL-006",
    name: "Inversiones Peruanas",
    type: "Corporativo",
    country: "Peru",
    city: "Lima",
    contactName: "Javier Rodriguez",
    contactEmail: "javier@invper.pe",
    contactPhone: "+51 1 3456-7890",
    activeProjects: 1,
    completedProjects: 0,
    satisfactionScore: 4.0,
    lastContactDate: "07/04/2023",
  },
];

// Histórico de interações com cliente específico (mock)
const interactionHistory = [
  {
    id: "INT-001",
    date: "10/04/2023",
    type: "Reunião",
    description: "Apresentação de novos modelos de elevadores de alta velocidade",
    contact: "Carlos Mendes",
    project: "BR-2023-001",
    followUp: "Enviar proposta técnica até 17/04",
  },
  {
    id: "INT-002",
    date: "25/03/2023",
    type: "E-mail",
    description: "Esclarecimento sobre prazo de entrega do projeto Torre Corporativa",
    contact: "Maria Silva",
    project: "BR-2023-001",
    followUp: "Agendar visita técnica",
  },
  {
    id: "INT-003",
    date: "15/03/2023",
    type: "Visita Técnica",
    description: "Inspeção do local de instalação e medições finais",
    contact: "Carlos Mendes",
    project: "BR-2023-001",
    followUp: "Atualizar projeto com novas medidas",
  },
  {
    id: "INT-004",
    date: "02/03/2023",
    type: "Telefonema",
    description: "Discussão sobre customizações no acabamento da cabine",
    contact: "Carlos Mendes",
    project: "BR-2023-001",
    followUp: "Enviar catálogo de opções",
  },
  {
    id: "INT-005",
    date: "15/02/2023",
    type: "Reunião",
    description: "Assinatura de contrato do projeto Torre Corporativa",
    contact: "Roberto Alves",
    project: "BR-2023-001",
    followUp: "Iniciar processo de fabricação",
  },
];

// Histórico de feedback do cliente (mock)
const feedbackHistory = [
  {
    id: "FB-001",
    date: "10/04/2023",
    project: "BR-2022-008",
    score: 5,
    comment: "Extremamente satisfeitos com a qualidade da instalação e prazo de entrega.",
    category: "Instalação",
    responder: "Equipe A",
  },
  {
    id: "FB-002",
    date: "05/03/2023",
    project: "BR-2022-012",
    score: 4,
    comment: "Bom atendimento, mas houve alguns atrasos na entrega dos componentes.",
    category: "Logística",
    responder: "Departamento de Suprimentos",
  },
  {
    id: "FB-003",
    date: "15/02/2023",
    project: "BR-2022-005",
    score: 5,
    comment: "Excelente suporte técnico pós-instalação.",
    category: "Pós-Venda",
    responder: "Equipe de Manutenção",
  },
  {
    id: "FB-004",
    date: "22/01/2023",
    project: "BR-2021-042",
    score: 3,
    comment: "Problemas de comunicação durante o processo de instalação.",
    category: "Comunicação",
    responder: "Gerente de Projetos",
  },
];

const Clients = () => {
  const [selectedTab, setSelectedTab] = useState("list");
  const [selectedClient, setSelectedClient] = useState(clientsList[0]);
  const [clientDetailTab, setClientDetailTab] = useState("overview");

  // Função para selecionar um cliente específico
  const handleSelectClient = (client) => {
    setSelectedClient(client);
    setSelectedTab("details");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Clientes</h1>
        <p className="text-muted-foreground mt-1">
          Gerenciamento de clientes e comunicações da OTIS LATAM
        </p>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full mb-6">
          <TabsTrigger value="list">
            <Building className="h-4 w-4 mr-2" />
            Lista de Clientes
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart4 className="h-4 w-4 mr-2" />
            Análise de Satisfação
          </TabsTrigger>
          <TabsTrigger value="details" disabled={!selectedClient}>
            <User className="h-4 w-4 mr-2" />
            Detalhes do Cliente
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="mt-0 space-y-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                type="search"
                placeholder="Buscar clientes..."
                className="pl-8 w-full bg-white dark:bg-sidebar"
              />
            </div>

            <Button>
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>

            <Button className="bg-otis-500 hover:bg-otis-600">
              <Plus className="h-4 w-4 mr-2" />
              Novo Cliente
            </Button>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Lista de Clientes</CardTitle>
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
                          Nome <ArrowUpDown className="h-3 w-3 ml-1" />
                        </Button>
                      </th>
                      <th className="hidden md:table-cell">Tipo</th>
                      <th className="hidden md:table-cell">País/Cidade</th>
                      <th className="hidden lg:table-cell">Contato</th>
                      <th>
                        <Button variant="ghost" size="sm" className="p-0 font-medium text-sm -ml-3">
                          Projetos <ArrowUpDown className="h-3 w-3 ml-1" />
                        </Button>
                      </th>
                      <th className="hidden md:table-cell">Satisfação</th>
                      <th className="text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientsList.map((client) => (
                      <tr key={client.id} className="hover:bg-muted/50">
                        <td className="font-medium text-sm">{client.id}</td>
                        <td>
                          <div className="font-medium">{client.name}</div>
                          <div className="text-xs text-muted-foreground md:hidden">
                            {client.type}
                          </div>
                        </td>
                        <td className="hidden md:table-cell">{client.type}</td>
                        <td className="hidden md:table-cell">
                          {client.city}, {client.country}
                        </td>
                        <td className="hidden lg:table-cell">{client.contactName}</td>
                        <td>
                          <div className="flex items-center">
                            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 mr-2">
                              {client.activeProjects} Ativos
                            </Badge>
                            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                              {client.completedProjects} Concluídos
                            </Badge>
                          </div>
                        </td>
                        <td className="hidden md:table-cell">
                          <div className="flex items-center">
                            <div className="bg-muted rounded-full h-2 w-20 mr-2">
                              <div
                                className="bg-green-500 h-full rounded-full"
                                style={{ width: `${(client.satisfactionScore / 5) * 100}%` }}
                              />
                            </div>
                            <span>{client.satisfactionScore}</span>
                          </div>
                        </td>
                        <td className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSelectClient(client)}
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
        </TabsContent>

        <TabsContent value="analytics" className="mt-0">
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Satisfação por Segmento</CardTitle>
                <CardDescription>
                  Índice de satisfação (NPS) por tipo de cliente
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex justify-center items-center">
                <div className="text-center text-muted-foreground">
                  [Gráfico de Barras de Satisfação por Segmento]
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Evolução da Satisfação</CardTitle>
                <CardDescription>
                  Tendência histórica por trimestre
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex justify-center items-center">
                <div className="text-center text-muted-foreground">
                  [Gráfico de Linha de Evolução Trimestral]
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Análise de Feedback</CardTitle>
                <CardDescription>
                  Principais pontos de feedback por categoria
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex justify-center items-center">
                <div className="text-center text-muted-foreground">
                  [Gráfico de Análise de Categorias de Feedback]
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="details" className="mt-0">
          {selectedClient && (
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div>
                      <CardTitle className="text-xl">{selectedClient.name}</CardTitle>
                      <CardDescription className="mt-1">
                        ID: {selectedClient.id} | Tipo: {selectedClient.type}
                      </CardDescription>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4 mr-2" />
                        Enviar E-mail
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Ligar
                      </Button>
                      <Button className="bg-otis-500 hover:bg-otis-600" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Novo Projeto
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs value={clientDetailTab} onValueChange={setClientDetailTab}>
                    <TabsList className="w-full mb-4">
                      <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                      <TabsTrigger value="interactions">Interações</TabsTrigger>
                      <TabsTrigger value="feedback">Feedback</TabsTrigger>
                      <TabsTrigger value="projects">Projetos</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                              Informações de Contato
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <div className="flex items-start">
                              <User className="h-4 w-4 mt-0.5 mr-2 text-muted-foreground" />
                              <div>
                                <p className="font-medium">{selectedClient.contactName}</p>
                                <p className="text-sm text-muted-foreground">Contato Principal</p>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <Mail className="h-4 w-4 mt-0.5 mr-2 text-muted-foreground" />
                              <div>
                                <p>{selectedClient.contactEmail}</p>
                                <p className="text-sm text-muted-foreground">E-mail</p>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <Phone className="h-4 w-4 mt-0.5 mr-2 text-muted-foreground" />
                              <div>
                                <p>{selectedClient.contactPhone}</p>
                                <p className="text-sm text-muted-foreground">Telefone</p>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <MapPin className="h-4 w-4 mt-0.5 mr-2 text-muted-foreground" />
                              <div>
                                <p>{selectedClient.city}, {selectedClient.country}</p>
                                <p className="text-sm text-muted-foreground">Localização</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                              Resumo de Projetos
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div>
                              <div className="flex justify-between items-center">
                                <p className="text-sm">Projetos Ativos</p>
                                <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                                  {selectedClient.activeProjects}
                                </Badge>
                              </div>
                              <div className="flex justify-between items-center mt-2">
                                <p className="text-sm">Projetos Concluídos</p>
                                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                                  {selectedClient.completedProjects}
                                </Badge>
                              </div>
                              <div className="flex justify-between items-center mt-2">
                                <p className="text-sm">Total de Projetos</p>
                                <Badge variant="outline">
                                  {selectedClient.activeProjects + selectedClient.completedProjects}
                                </Badge>
                              </div>
                            </div>
                            <div className="pt-2">
                              <p className="text-sm mb-1">Última Interação</p>
                              <div className="text-sm flex items-center">
                                <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                                <span>{selectedClient.lastContactDate}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                              Satisfação do Cliente
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="flex justify-between items-center">
                              <p className="text-sm">Índice Geral</p>
                              <div className="flex items-center">
                                <ThumbsUp className="h-4 w-4 mr-1 text-green-500" />
                                <span className="font-medium">{selectedClient.satisfactionScore}/5</span>
                              </div>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className="bg-green-500 h-full rounded-full"
                                style={{ width: `${(selectedClient.satisfactionScore / 5) * 100}%` }}
                              />
                            </div>
                            <div className="pt-2">
                              <p className="text-sm mb-1">Última Avaliação</p>
                              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                                5/5 - Muito Satisfeito
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">
                            Próximas Ações
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="p-3 border rounded-md bg-yellow-50 border-yellow-200">
                              <div className="font-medium">Agendar reunião de acompanhamento</div>
                              <div className="text-sm text-muted-foreground mt-1">Prazo: 22/04/2023</div>
                            </div>
                            <div className="p-3 border rounded-md">
                              <div className="font-medium">Enviar proposta para novo projeto</div>
                              <div className="text-sm text-muted-foreground mt-1">Prazo: 30/04/2023</div>
                            </div>
                            <div className="p-3 border rounded-md">
                              <div className="font-medium">Realizar pesquisa de satisfação</div>
                              <div className="text-sm text-muted-foreground mt-1">Prazo: 15/05/2023</div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">Adicionar Nova Ação</Button>
                        </CardFooter>
                      </Card>
                    </TabsContent>

                    <TabsContent value="interactions">
                      <Card>
                        <CardHeader className="pb-2 flex flex-row items-center justify-between">
                          <div>
                            <CardTitle>Histórico de Interações</CardTitle>
                            <CardDescription>Registro de comunicações com o cliente</CardDescription>
                          </div>
                          <Button size="sm">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Nova Interação
                          </Button>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {interactionHistory.map((interaction) => (
                              <div key={interaction.id} className="border rounded-md p-4">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                  <div>
                                    <div className="font-medium">{interaction.type}</div>
                                    <div className="text-sm text-muted-foreground">
                                      {interaction.date} | Contato: {interaction.contact}
                                    </div>
                                  </div>
                                  <Badge variant="outline" className="md:self-start">
                                    Projeto: {interaction.project}
                                  </Badge>
                                </div>
                                <div className="mt-2">
                                  <p>{interaction.description}</p>
                                </div>
                                <div className="mt-3 pt-3 border-t">
                                  <div className="flex items-start">
                                    <Clock className="h-4 w-4 mt-0.5 mr-2 text-muted-foreground" />
                                    <div>
                                      <p className="text-sm font-medium">Follow-up</p>
                                      <p className="text-sm text-muted-foreground">{interaction.followUp}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="feedback">
                      <Card>
                        <CardHeader className="pb-2 flex flex-row items-center justify-between">
                          <div>
                            <CardTitle>Feedback do Cliente</CardTitle>
                            <CardDescription>Avaliações e comentários recebidos</CardDescription>
                          </div>
                          <Button size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            Registrar Feedback
                          </Button>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {feedbackHistory.map((feedback) => (
                              <div key={feedback.id} className="border rounded-md p-4">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                  <div>
                                    <div className="font-medium">Projeto: {feedback.project}</div>
                                    <div className="text-sm text-muted-foreground">
                                      {feedback.date} | Categoria: {feedback.category}
                                    </div>
                                  </div>
                                  <div className="flex items-center">
                                    <Badge
                                      variant="outline"
                                      className={
                                        feedback.score >= 4 ? "bg-green-100 text-green-800 border-green-200" :
                                        feedback.score >= 3 ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                                        "bg-red-100 text-red-800 border-red-200"
                                      }
                                    >
                                      {feedback.score}/5
                                    </Badge>
                                  </div>
                                </div>
                                <div className="mt-2">
                                  <p>"{feedback.comment}"</p>
                                </div>
                                <div className="mt-3 pt-3 border-t">
                                  <div className="flex items-start">
                                    <User className="h-4 w-4 mt-0.5 mr-2 text-muted-foreground" />
                                    <div>
                                      <p className="text-sm font-medium">Responsável</p>
                                      <p className="text-sm text-muted-foreground">{feedback.responder}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="projects">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle>Projetos do Cliente</CardTitle>
                          <CardDescription>Histórico de projetos ativos e concluídos</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="border rounded-md p-4">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                <div>
                                  <div className="font-medium">Torre Corporativa São Paulo</div>
                                  <div className="text-sm text-muted-foreground">
                                    ID: BR-2023-001 | Início: 10/01/2023
                                  </div>
                                </div>
                                <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 md:self-start">
                                  Em Andamento
                                </Badge>
                              </div>
                              <div className="mt-3">
                                <div className="text-sm mb-1">Progresso: 75%</div>
                                <div className="w-full bg-muted rounded-full h-2">
                                  <div
                                    className="bg-blue-500 h-full rounded-full"
                                    style={{ width: '75%' }}
                                  />
                                </div>
                              </div>
                              <div className="mt-3 pt-3 border-t flex justify-between items-center">
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span className="text-sm text-muted-foreground">Previsão de Conclusão: 15/09/2023</span>
                                </div>
                                <Button variant="ghost" size="sm">Ver Detalhes</Button>
                              </div>
                            </div>

                            <div className="border rounded-md p-4">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                <div>
                                  <div className="font-medium">Centro Financeiro São Paulo</div>
                                  <div className="text-sm text-muted-foreground">
                                    ID: BR-2022-045 | Início: 15/08/2022
                                  </div>
                                </div>
                                <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 md:self-start">
                                  Em Andamento
                                </Badge>
                              </div>
                              <div className="mt-3">
                                <div className="text-sm mb-1">Progresso: 90%</div>
                                <div className="w-full bg-muted rounded-full h-2">
                                  <div
                                    className="bg-blue-500 h-full rounded-full"
                                    style={{ width: '90%' }}
                                  />
                                </div>
                              </div>
                              <div className="mt-3 pt-3 border-t flex justify-between items-center">
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span className="text-sm text-muted-foreground">Previsão de Conclusão: 30/05/2023</span>
                                </div>
                                <Button variant="ghost" size="sm">Ver Detalhes</Button>
                              </div>
                            </div>

                            <div className="border rounded-md p-4">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                <div>
                                  <div className="font-medium">Shopping Vila Mariana</div>
                                  <div className="text-sm text-muted-foreground">
                                    ID: BR-2022-032 | Início: 10/05/2022
                                  </div>
                                </div>
                                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 md:self-start">
                                  Concluído
                                </Badge>
                              </div>
                              <div className="mt-3">
                                <div className="text-sm mb-1">Progresso: 100%</div>
                                <div className="w-full bg-muted rounded-full h-2">
                                  <div
                                    className="bg-green-500 h-full rounded-full"
                                    style={{ width: '100%' }}
                                  />
                                </div>
                              </div>
                              <div className="mt-3 pt-3 border-t flex justify-between items-center">
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span className="text-sm text-muted-foreground">Concluído em: 22/11/2022</span>
                                </div>
                                <Button variant="ghost" size="sm">Ver Detalhes</Button>
                              </div>
                            </div>

                            <div className="flex justify-center mt-6">
                              <Button variant="outline">Carregar Mais Projetos</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Clients;