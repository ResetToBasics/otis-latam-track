import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BarChart2,
  ThumbsUp,
  Search,
  Filter,
  Building,
  Plus,
  CheckCircle,
  Calendar,
  ChevronRight,
  ArrowUpDown,
  MessageSquare,
  Star,
  ListFilter,
  Download,
  Send,
  PieChart,
  TrendingUp,
  ChevronLeft,
  ChevronDown,
  Clock,
  FileText,
  Settings
} from "lucide-react";

// Mock data para as pesquisas de satisfação
const surveysList = [
  {
    id: "SRV-001",
    title: "Pesquisa de Satisfação Pós-Instalação",
    description: "Avaliação após conclusão da instalação do elevador",
    status: "active",
    startDate: "01/03/2023",
    endDate: "31/12/2023",
    respondents: 342,
    targetCustomers: "Projetos Concluídos",
    averageScore: 4.2,
    questions: 10
  },
  {
    id: "SRV-002",
    title: "NPS Trimestral OTIS LATAM",
    description: "Pesquisa de Net Promoter Score trimestral",
    status: "active",
    startDate: "01/04/2023",
    endDate: "30/06/2023",
    respondents: 187,
    targetCustomers: "Todos os Clientes",
    averageScore: 3.8,
    questions: 5
  },
  {
    id: "SRV-003",
    title: "Avaliação de Qualidade de Atendimento",
    description: "Pesquisa sobre qualidade de atendimento das equipes",
    status: "draft",
    startDate: "N/A",
    endDate: "N/A",
    respondents: 0,
    targetCustomers: "Clientes com Projetos Ativos",
    averageScore: 0,
    questions: 8
  },
  {
    id: "SRV-004",
    title: "Pesquisa de Experiência de Manutenção",
    description: "Avaliação do serviço pós-venda e manutenção",
    status: "ended",
    startDate: "01/01/2023",
    endDate: "31/03/2023",
    respondents: 256,
    targetCustomers: "Contratos de Manutenção",
    averageScore: 4.5,
    questions: 12
  }
];

// Mock data para feedbacks recebidos
const feedbacksList = [
  {
    id: "FB-BR-001",
    clientName: "Grupo Empresarial Brasileiro",
    clientId: "CL-001",
    projectId: "BR-2023-001",
    date: "15/04/2023",
    surveyId: "SRV-001",
    overallScore: 4.5,
    sentiment: "positive",
    responseTime: 2, // em dias
    status: "resolvido",
    categories: ["Instalação", "Atendimento"],
    comments: "A instalação foi concluída antes do prazo previsto e a equipe foi extremamente profissional. Estamos muito satisfeitos com o resultado final.",
    assignedTo: "Carolina Silva",
    responseComments: "Agradecemos pelo feedback positivo. Estamos sempre buscando superar as expectativas dos nossos clientes."
  },
  {
    id: "FB-MX-015",
    clientName: "Inversiones Mexicanas S.A.",
    clientId: "CL-002",
    projectId: "MX-2023-042",
    date: "12/04/2023",
    surveyId: "SRV-001",
    overallScore: 3.2,
    sentiment: "neutral",
    responseTime: 1,
    status: "resolvido",
    categories: ["Comunicação", "Prazo"],
    comments: "A instalação foi bem executada, mas houve falhas de comunicação durante o processo que causaram alguns atrasos.",
    assignedTo: "Miguel Hernandez",
    responseComments: "Agradecemos seu feedback. Estamos revisando nossos processos de comunicação para evitar que essa situação ocorra novamente."
  },
  {
    id: "FB-CL-007",
    clientName: "Desarrollos Chilenos Ltda.",
    clientId: "CL-004",
    projectId: "CL-2023-007",
    date: "10/04/2023",
    surveyId: "SRV-002",
    overallScore: 2.5,
    sentiment: "negative",
    responseTime: null,
    status: "pendente",
    categories: ["Qualidade", "Produto"],
    comments: "Enfrentamos problemas recorrentes com o sistema de portas automáticas. Já solicitamos manutenção três vezes no último mês.",
    assignedTo: null,
    responseComments: null
  },
  {
    id: "FB-BR-045",
    clientName: "Construtora Silva & Filhos",
    clientId: "CL-009",
    projectId: "BR-2022-112",
    date: "08/04/2023",
    surveyId: "SRV-004",
    overallScore: 4.8,
    sentiment: "positive",
    responseTime: 1,
    status: "resolvido",
    categories: ["Manutenção", "Atendimento"],
    comments: "A equipe de manutenção é sempre pontual e resoluta. O sistema de agendamento funciona perfeitamente.",
    assignedTo: "Roberto Mendes",
    responseComments: "Ficamos felizes em saber que nosso serviço atende às suas expectativas. Conte sempre conosco."
  },
  {
    id: "FB-CO-023",
    clientName: "Constructora Colombiana",
    clientId: "CL-005",
    projectId: "CO-2023-023",
    date: "05/04/2023",
    surveyId: "SRV-002",
    overallScore: 3.0,
    sentiment: "neutral",
    responseTime: 3,
    status: "em_andamento",
    categories: ["Produto", "Preço"],
    comments: "O produto atende às expectativas, mas consideramos o custo de manutenção muito elevado comparado a outros fornecedores.",
    assignedTo: "Carolina Silva",
    responseComments: "Estamos analisando sua observação sobre os custos e entraremos em contato para discutir opções que melhor atendam suas necessidades."
  }
];

// Componente para exibir as estrelas de avaliação
const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating
              ? "text-yellow-500 fill-yellow-500"
              : star - 0.5 <= rating
              ? "text-yellow-500 fill-yellow-500"
              : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-2 text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  );
};

// Componente principal do Sistema de Gestão de Feedback
const FeedbackManagement = () => {
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [feedbackDetailTab, setFeedbackDetailTab] = useState("overview");

  // Função para selecionar um feedback específico
  const handleSelectFeedback = (feedback) => {
    setSelectedFeedback(feedback);
    setFeedbackDetailTab("overview");
  };

  // Função para selecionar uma pesquisa específica
  const handleSelectSurvey = (survey) => {
    setSelectedSurvey(survey);
  };

  // Função para voltar à lista de feedbacks
  const handleBackToFeedbacks = () => {
    setSelectedFeedback(null);
  };

  // Função para voltar à lista de pesquisas
  const handleBackToSurveys = () => {
    setSelectedSurvey(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Gestão de Feedback</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie pesquisas de satisfação e feedbacks de clientes da OTIS LATAM
        </p>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full mb-6">
          <TabsTrigger value="dashboard">
            <BarChart2 className="h-4 w-4 mr-2" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="feedback">
            <ThumbsUp className="h-4 w-4 mr-2" />
            Feedbacks
          </TabsTrigger>
          <TabsTrigger value="surveys">
            <FileText className="h-4 w-4 mr-2" />
            Pesquisas
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-2" />
            Configurações
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="mt-0 space-y-6">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-muted-foreground">NPS Médio</p>
                    <div className="flex items-center mt-1">
                      <h3 className="text-2xl font-bold">42</h3>
                      <Badge className="ml-2 bg-green-100 text-green-800 border-green-200">
                        +8
                      </Badge>
                    </div>
                  </div>
                  <div className="p-2 rounded-full bg-blue-50">
                    <TrendingUp className="h-4 w-4 text-blue-700" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">+18% que trimestre anterior</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-muted-foreground">Avaliação Média</p>
                    <div className="flex items-center mt-1">
                      <h3 className="text-2xl font-bold">4.2</h3>
                      <Badge className="ml-2 bg-green-100 text-green-800 border-green-200">
                        +0.3
                      </Badge>
                    </div>
                  </div>
                  <div className="p-2 rounded-full bg-yellow-50">
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  </div>
                </div>
                <div className="flex mt-2">
                  <StarRating rating={4.2} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-muted-foreground">Taxa de Resposta</p>
                    <div className="flex items-center mt-1">
                      <h3 className="text-2xl font-bold">68%</h3>
                      <Badge className="ml-2 bg-red-100 text-red-800 border-red-200">
                        -4%
                      </Badge>
                    </div>
                  </div>
                  <div className="p-2 rounded-full bg-indigo-50">
                    <MessageSquare className="h-4 w-4 text-indigo-700" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">785 respostas em 1154 envios</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-muted-foreground">Tempo de Resposta</p>
                    <div className="flex items-center mt-1">
                      <h3 className="text-2xl font-bold">1.8</h3>
                      <Badge className="ml-2 bg-green-100 text-green-800 border-green-200">
                        -0.5
                      </Badge>
                    </div>
                  </div>
                  <div className="p-2 rounded-full bg-pink-50">
                    <Clock className="h-4 w-4 text-pink-700" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Dias em média para resolver issues</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Sentimento</CardTitle>
                <CardDescription>
                  Análise por sentimento dos feedbacks recebidos
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex justify-center items-center">
                <div className="flex flex-col items-center space-y-4">
                  <PieChart className="h-48 w-48 text-muted-foreground/40" />
                  <div className="flex space-x-6">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm">Positivo (58%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                      <span className="text-sm">Neutro (32%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      <span className="text-sm">Negativo (10%)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tendência de NPS</CardTitle>
                <CardDescription>
                  Evolução trimestral do Net Promoter Score
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex justify-center items-center">
                <div className="text-center">
                  <TrendingUp className="h-48 w-48 text-muted-foreground/40 mx-auto" />
                  <div className="text-sm text-muted-foreground mt-4">
                    Tendência positiva nos últimos três trimestres, com crescimento de 15% no NPS médio
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Feedbacks Recentes</CardTitle>
              <CardDescription>
                Últimos feedbacks registrados no sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feedbacksList.slice(0, 3).map((feedback) => (
                  <div
                    key={feedback.id}
                    className="p-4 border rounded-md hover:bg-accent/50 cursor-pointer transition-colors"
                    onClick={() => {
                      setSelectedTab("feedback");
                      handleSelectFeedback(feedback);
                    }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <h3 className="font-medium">{feedback.clientName}</h3>
                        <p className="text-sm text-muted-foreground">
                          Projeto: {feedback.projectId} | {feedback.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <StarRating rating={feedback.overallScore} />
                        <Badge
                          variant="outline"
                          className={
                            feedback.sentiment === "positive"
                              ? "bg-green-100 text-green-800 border-green-200"
                              : feedback.sentiment === "negative"
                              ? "bg-red-100 text-red-800 border-red-200"
                              : "bg-yellow-100 text-yellow-800 border-yellow-200"
                          }
                        >
                          {feedback.sentiment === "positive"
                            ? "Positivo"
                            : feedback.sentiment === "negative"
                            ? "Negativo"
                            : "Neutro"}
                        </Badge>
                      </div>
                    </div>
                    <p className="mt-2 text-sm line-clamp-2">{feedback.comments}</p>
                    <div className="mt-3 pt-2 border-t flex justify-between items-center">
                      <div className="flex items-center">
                        <Badge variant="outline" className="mr-2">
                          {feedback.categories[0]}
                        </Badge>
                        {feedback.categories.length > 1 && (
                          <Badge variant="outline">
                            + {feedback.categories.length - 1}
                          </Badge>
                        )}
                      </div>
                      <Button variant="ghost" size="sm">
                        Ver Detalhes
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setSelectedTab("feedback")}
              >
                Ver Todos os Feedbacks
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Feedbacks Tab */}
        <TabsContent value="feedback" className="mt-0 space-y-4">
          {!selectedFeedback ? (
            <>
              <div className="flex flex-wrap gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input
                    type="search"
                    placeholder="Buscar feedbacks..."
                    className="pl-8 w-full bg-white dark:bg-sidebar"
                  />
                </div>

                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Sentimento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="positive">Positivo</SelectItem>
                      <SelectItem value="neutral">Neutro</SelectItem>
                      <SelectItem value="negative">Negativo</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select defaultValue="all">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="pending">Pendente</SelectItem>
                      <SelectItem value="in_progress">Em Andamento</SelectItem>
                      <SelectItem value="resolved">Resolvido</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button>
                    <Filter className="h-4 w-4 mr-2" />
                    Mais Filtros
                  </Button>
                </div>

                <Button className="bg-otis-500 hover:bg-otis-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Registrar Feedback
                </Button>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Feedbacks de Clientes</CardTitle>
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
                              Cliente <ArrowUpDown className="h-3 w-3 ml-1" />
                            </Button>
                          </th>
                          <th className="hidden md:table-cell">
                            <Button variant="ghost" size="sm" className="p-0 font-medium text-sm -ml-3">
                              Data <ArrowUpDown className="h-3 w-3 ml-1" />
                            </Button>
                          </th>
                          <th className="hidden md:table-cell">Projeto</th>
                          <th>Avaliação</th>
                          <th>Sentimento</th>
                          <th className="hidden md:table-cell">Status</th>
                          <th className="text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {feedbacksList.map((feedback) => (
                          <tr key={feedback.id} className="hover:bg-muted/50">
                            <td className="font-medium text-sm">{feedback.id}</td>
                            <td>
                              <div className="font-medium">{feedback.clientName}</div>
                              <div className="text-xs text-muted-foreground md:hidden">
                                {feedback.date} | {feedback.projectId}
                              </div>
                            </td>
                            <td className="hidden md:table-cell">{feedback.date}</td>
                            <td className="hidden md:table-cell">{feedback.projectId}</td>
                            <td>
                              <StarRating rating={feedback.overallScore} />
                            </td>
                            <td>
                              <Badge
                                variant="outline"
                                className={
                                  feedback.sentiment === "positive"
                                    ? "bg-green-100 text-green-800 border-green-200"
                                    : feedback.sentiment === "negative"
                                    ? "bg-red-100 text-red-800 border-red-200"
                                    : "bg-yellow-100 text-yellow-800 border-yellow-200"
                                }
                              >
                                {feedback.sentiment === "positive"
                                  ? "Positivo"
                                  : feedback.sentiment === "negative"
                                  ? "Negativo"
                                  : "Neutro"}
                              </Badge>
                            </td>
                            <td className="hidden md:table-cell">
                              <Badge
                                variant="outline"
                                className={
                                  feedback.status === "resolvido"
                                    ? "bg-green-100 text-green-800 border-green-200"
                                    : feedback.status === "em_andamento"
                                    ? "bg-blue-100 text-blue-800 border-blue-200"
                                    : "bg-yellow-100 text-yellow-800 border-yellow-200"
                                }
                              >
                                {feedback.status === "resolvido"
                                  ? "Resolvido"
                                  : feedback.status === "em_andamento"
                                  ? "Em Andamento"
                                  : "Pendente"}
                              </Badge>
                            </td>
                            <td className="text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleSelectFeedback(feedback)}
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
                  onClick={handleBackToFeedbacks}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Voltar para lista
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div>
                      <CardTitle className="text-xl">{selectedFeedback.clientName}</CardTitle>
                      <CardDescription className="mt-1">
                        ID: {selectedFeedback.id} | {selectedFeedback.date}
                      </CardDescription>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="outline"
                        className={
                          selectedFeedback.sentiment === "positive"
                            ? "bg-green-100 text-green-800 border-green-200"
                            : selectedFeedback.sentiment === "negative"
                            ? "bg-red-100 text-red-800 border-red-200"
                            : "bg-yellow-100 text-yellow-800 border-yellow-200"
                        }
                      >
                        {selectedFeedback.sentiment === "positive"
                          ? "Feedback Positivo"
                          : selectedFeedback.sentiment === "negative"
                          ? "Feedback Negativo"
                          : "Feedback Neutro"}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={
                          selectedFeedback.status === "resolvido"
                            ? "bg-green-100 text-green-800 border-green-200"
                            : selectedFeedback.status === "em_andamento"
                            ? "bg-blue-100 text-blue-800 border-blue-200"
                            : "bg-yellow-100 text-yellow-800 border-yellow-200"
                        }
                      >
                        {selectedFeedback.status === "resolvido"
                          ? "Resolvido"
                          : selectedFeedback.status === "em_andamento"
                          ? "Em Andamento"
                          : "Pendente"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs value={feedbackDetailTab} onValueChange={setFeedbackDetailTab}>
                    <TabsList className="w-full mb-4">
                      <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                      <TabsTrigger value="response">Resposta</TabsTrigger>
                      <TabsTrigger value="history">Histórico</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm font-medium text-muted-foreground">
                                Detalhes do Feedback
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div>
                                <h3 className="text-sm font-medium mb-2">Avaliação</h3>
                                <div className="flex items-center space-x-2">
                                  <StarRating rating={selectedFeedback.overallScore} />
                                  <span className="text-sm text-muted-foreground">
                                    ({selectedFeedback.overallScore} de 5)
                                  </span>
                                </div>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium mb-2">Comentários</h3>
                                <div className="p-3 border rounded-md bg-muted/50">
                                  <p className="text-sm">{selectedFeedback.comments}</p>
                                </div>
                              </div>
                             <div>
                               <h3 className="text-sm font-medium mb-2">Categorias</h3>
                               <div className="flex flex-wrap gap-2">
                                 {selectedFeedback.categories.map((category) => (
                                   <Badge key={category} variant="outline">
                                     {category}
                                   </Badge>
                                 ))}
                               </div>
                             </div>
                             {selectedFeedback.responseComments && (
                               <div>
                                 <h3 className="text-sm font-medium mb-2">Resposta</h3>
                                 <div className="p-3 border rounded-md bg-blue-50 border-blue-200">
                                   <p className="text-sm">{selectedFeedback.responseComments}</p>
                                   <p className="text-xs text-muted-foreground mt-2">
                                     Respondido por: {selectedFeedback.assignedTo} |
                                     Tempo de resposta: {selectedFeedback.responseTime} {selectedFeedback.responseTime === 1 ? "dia" : "dias"}
                                   </p>
                                 </div>
                               </div>
                             )}
                           </CardContent>
                         </Card>
                       </div>

                       <div>
                         <Card>
                           <CardHeader className="pb-2">
                             <CardTitle className="text-sm font-medium text-muted-foreground">
                               Informações da Pesquisa
                             </CardTitle>
                           </CardHeader>
                           <CardContent className="space-y-4">
                             <div className="space-y-2">
                               <div className="flex justify-between">
                                 <span className="text-sm">ID da Pesquisa</span>
                                 <span className="font-medium text-sm">{selectedFeedback.surveyId}</span>
                               </div>
                               <div className="flex justify-between">
                                 <span className="text-sm">Projeto</span>
                                 <span className="font-medium text-sm">{selectedFeedback.projectId}</span>
                               </div>
                               <div className="flex justify-between">
                                 <span className="text-sm">Cliente</span>
                                 <span className="font-medium text-sm">{selectedFeedback.clientId}</span>
                               </div>
                               <div className="flex justify-between">
                                 <span className="text-sm">Data</span>
                                 <span className="font-medium text-sm">{selectedFeedback.date}</span>
                               </div>
                             </div>
                             {selectedFeedback.assignedTo ? (
                               <div>
                                 <h3 className="text-sm font-medium mb-2">Responsável</h3>
                                 <div className="flex items-center gap-2">
                                   <Avatar className="h-8 w-8">
                                     <AvatarFallback>
                                       {selectedFeedback.assignedTo.split(" ").map(n => n[0]).join("")}
                                     </AvatarFallback>
                                   </Avatar>
                                   <span className="text-sm">{selectedFeedback.assignedTo}</span>
                                 </div>
                               </div>
                             ) : (
                               <div className="pt-2">
                                 <Button className="w-full">
                                   Atribuir Responsável
                                 </Button>
                               </div>
                             )}
                           </CardContent>
                         </Card>

                         <Card className="mt-4">
                           <CardHeader className="pb-2">
                             <CardTitle className="text-sm font-medium text-muted-foreground">
                               Status e Prioridade
                             </CardTitle>
                           </CardHeader>
                           <CardContent className="space-y-4">
                             <div className="space-y-2">
                               <Label>Status</Label>
                               <Select defaultValue={selectedFeedback.status}>
                                 <SelectTrigger>
                                   <SelectValue placeholder="Selecione o status" />
                                 </SelectTrigger>
                                 <SelectContent>
                                   <SelectItem value="pendente">Pendente</SelectItem>
                                   <SelectItem value="em_andamento">Em Andamento</SelectItem>
                                   <SelectItem value="resolvido">Resolvido</SelectItem>
                                 </SelectContent>
                               </Select>
                             </div>
                             <div className="space-y-2">
                               <Label>Prioridade</Label>
                               <Select defaultValue="medium">
                                 <SelectTrigger>
                                   <SelectValue placeholder="Selecione a prioridade" />
                                 </SelectTrigger>
                                 <SelectContent>
                                   <SelectItem value="high">Alta</SelectItem>
                                   <SelectItem value="medium">Média</SelectItem>
                                   <SelectItem value="low">Baixa</SelectItem>
                                 </SelectContent>
                               </Select>
                             </div>
                             {selectedFeedback.status !== "resolvido" && (
                               <Button className="w-full mt-2 bg-otis-500 hover:bg-otis-600">
                                 Atualizar Status
                               </Button>
                             )}
                           </CardContent>
                         </Card>
                       </div>
                     </div>
                   </TabsContent>

                   <TabsContent value="response" className="space-y-4">
                     <Card>
                       <CardHeader>
                         <CardTitle>Responder ao Feedback</CardTitle>
                         <CardDescription>
                           Crie uma resposta personalizada para o cliente
                         </CardDescription>
                       </CardHeader>
                       <CardContent className="space-y-4">
                         <div className="p-4 border rounded-md bg-muted/50">
                           <h3 className="font-medium mb-2">Feedback Original</h3>
                           <p className="text-sm">{selectedFeedback.comments}</p>
                         </div>

                         <div className="space-y-2">
                           <Label htmlFor="response-text">Sua Resposta</Label>
                           <Textarea
                             id="response-text"
                             placeholder="Digite sua resposta ao feedback..."
                             rows={6}
                             defaultValue={selectedFeedback.responseComments || ""}
                           />
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="space-y-2">
                             <Label>Responsável</Label>
                             <Select defaultValue={selectedFeedback.assignedTo || ""}>
                               <SelectTrigger>
                                 <SelectValue placeholder="Selecione um responsável" />
                               </SelectTrigger>
                               <SelectContent>
                                 <SelectItem value="Carolina Silva">Carolina Silva</SelectItem>
                                 <SelectItem value="Roberto Mendes">Roberto Mendes</SelectItem>
                                 <SelectItem value="Miguel Hernandez">Miguel Hernandez</SelectItem>
                               </SelectContent>
                             </Select>
                           </div>
                           <div className="space-y-2">
                             <Label>Modo de Envio</Label>
                             <Select defaultValue="email">
                               <SelectTrigger>
                                 <SelectValue placeholder="Selecione o modo de envio" />
                               </SelectTrigger>
                               <SelectContent>
                                 <SelectItem value="email">E-mail</SelectItem>
                                 <SelectItem value="portal">Portal do Cliente</SelectItem>
                                 <SelectItem value="both">Ambos</SelectItem>
                               </SelectContent>
                             </Select>
                           </div>
                         </div>

                         <div className="flex items-center space-x-2">
                           <Switch id="mark-resolved" />
                           <Label htmlFor="mark-resolved">
                             Marcar como resolvido após enviar resposta
                           </Label>
                         </div>
                       </CardContent>
                       <CardFooter className="flex justify-end space-x-2">
                         <Button variant="outline">Salvar Rascunho</Button>
                         <Button className="bg-otis-500 hover:bg-otis-600">
                           <Send className="h-4 w-4 mr-2" />
                           Enviar Resposta
                         </Button>
                       </CardFooter>
                     </Card>

                     <Card>
                       <CardHeader>
                         <CardTitle>Modelos de Resposta</CardTitle>
                         <CardDescription>
                           Utilize modelos pré-definidos para respostas rápidas
                         </CardDescription>
                       </CardHeader>
                       <CardContent>
                         <div className="space-y-2">
                           <div className="p-3 border rounded-md hover:bg-accent/50 cursor-pointer">
                             <h3 className="font-medium">Agradecimento por Feedback Positivo</h3>
                             <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                               Agradecemos pelo feedback positivo. Estamos sempre buscando superar as expectativas dos nossos clientes e ficamos felizes em saber que conseguimos alcançar esse objetivo.
                             </p>
                           </div>
                           <div className="p-3 border rounded-md hover:bg-accent/50 cursor-pointer">
                             <h3 className="font-medium">Resolução de Problema</h3>
                             <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                               Agradecemos por compartilhar sua experiência. Lamentamos pelos inconvenientes e já estamos trabalhando para resolver a situação. Nossa equipe entrará em contato em breve.
                             </p>
                           </div>
                           <div className="p-3 border rounded-md hover:bg-accent/50 cursor-pointer">
                             <h3 className="font-medium">Melhoria Contínua</h3>
                             <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                               Obrigado pelo seu feedback valioso. Suas sugestões são importantes para nosso processo de melhoria contínua e serão levadas em consideração em nossos próximos projetos.
                             </p>
                           </div>
                         </div>
                       </CardContent>
                     </Card>
                   </TabsContent>

                   <TabsContent value="history" className="space-y-4">
                     <Card>
                       <CardHeader>
                         <CardTitle>Histórico de Interações</CardTitle>
                         <CardDescription>
                           Registro de todas as ações relacionadas a este feedback
                         </CardDescription>
                       </CardHeader>
                       <CardContent>
                         <div className="relative space-y-8 before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-muted before:ml-0.5">
                           <div className="flex gap-3">
                             <div className="rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 bg-blue-100 text-blue-800">
                               <MessageSquare className="h-4 w-4" />
                             </div>
                             <div className="pb-8">
                               <p className="font-medium">Feedback recebido</p>
                               <p className="text-sm text-muted-foreground">{selectedFeedback.date}</p>
                               <p className="text-sm mt-1">Avaliação: {selectedFeedback.overallScore}/5</p>
                             </div>
                           </div>

                           {selectedFeedback.assignedTo && (
                             <div className="flex gap-3">
                               <div className="rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 bg-purple-100 text-purple-800">
                                 <User className="h-4 w-4" />
                               </div>
                               <div className="pb-8">
                                 <p className="font-medium">Atribuído a {selectedFeedback.assignedTo}</p>
                                 <p className="text-sm text-muted-foreground">{selectedFeedback.date}</p>
                               </div>
                             </div>
                           )}

                           {selectedFeedback.status === "em_andamento" && (
                             <div className="flex gap-3">
                               <div className="rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 bg-yellow-100 text-yellow-800">
                                 <Clock className="h-4 w-4" />
                               </div>
                               <div className="pb-8">
                                 <p className="font-medium">Em andamento</p>
                                 <p className="text-sm text-muted-foreground">{selectedFeedback.date}</p>
                                 <p className="text-sm mt-1">Status atualizado para Em Andamento</p>
                               </div>
                             </div>
                           )}

                           {selectedFeedback.responseComments && (
                             <div className="flex gap-3">
                               <div className="rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 bg-green-100 text-green-800">
                                 <Send className="h-4 w-4" />
                               </div>
                               <div className="pb-0">
                                 <p className="font-medium">Resposta enviada</p>
                                 <p className="text-sm text-muted-foreground">
                                   {new Date(new Date(selectedFeedback.date).getTime() + selectedFeedback.responseTime * 86400000).toLocaleDateString('pt-BR').replace(/\//g, '/')}
                                 </p>
                                 <p className="text-sm mt-1">Respondido por: {selectedFeedback.assignedTo}</p>
                               </div>
                             </div>
                           )}
                         </div>
                       </CardContent>
                     </Card>

                     <Card>
                       <CardHeader>
                         <CardTitle>Histórico do Cliente</CardTitle>
                         <CardDescription>
                           Feedbacks anteriores deste cliente
                         </CardDescription>
                       </CardHeader>
                       <CardContent>
                         <div className="space-y-4">
                           <div className="p-3 border rounded-md">
                             <div className="flex items-center justify-between">
                               <div>
                                 <h3 className="font-medium">Projeto: BR-2022-112</h3>
                                 <p className="text-sm text-muted-foreground">10/01/2023</p>
                               </div>
                               <StarRating rating={4.7} />
                             </div>
                             <p className="text-sm mt-2">
                               "Excelente atendimento em todas as fases do projeto. A instalação foi concluída dentro do prazo estipulado."
                             </p>
                           </div>
                           <div className="p-3 border rounded-md">
                             <div className="flex items-center justify-between">
                               <div>
                                 <h3 className="font-medium">Projeto: BR-2021-078</h3>
                                 <p className="text-sm text-muted-foreground">15/08/2022</p>
                               </div>
                               <StarRating rating={3.5} />
                             </div>
                             <p className="text-sm mt-2">
                               "Equipamento de boa qualidade, mas houve alguns atrasos na entrega de componentes."
                             </p>
                           </div>
                         </div>
                       </CardContent>
                     </Card>
                   </TabsContent>
                 </Tabs>
               </CardContent>
             </Card>
           </>
         )}
       </TabsContent>

       {/* Surveys Tab */}
       <TabsContent value="surveys" className="mt-0 space-y-4">
         {!selectedSurvey ? (
           <>
             <div className="flex flex-wrap gap-4 items-center">
               <div className="relative flex-1">
                 <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                 <Input
                   type="search"
                   placeholder="Buscar pesquisas..."
                   className="pl-8 w-full bg-white dark:bg-sidebar"
                 />
               </div>

               <div className="flex gap-2">
                 <Select defaultValue="all">
                   <SelectTrigger className="w-[150px]">
                     <SelectValue placeholder="Status" />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="all">Todos</SelectItem>
                     <SelectItem value="active">Ativos</SelectItem>
                     <SelectItem value="draft">Rascunhos</SelectItem>
                     <SelectItem value="ended">Finalizados</SelectItem>
                   </SelectContent>
                 </Select>

                 <Button>
                   <Filter className="h-4 w-4 mr-2" />
                   Filtros
                 </Button>
               </div>

               <Button className="bg-otis-500 hover:bg-otis-600">
                 <Plus className="h-4 w-4 mr-2" />
                 Nova Pesquisa
               </Button>
             </div>

             <Card>
               <CardHeader className="pb-2">
                 <CardTitle className="text-lg">Pesquisas de Satisfação</CardTitle>
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
                         <th className="hidden md:table-cell">Status</th>
                         <th className="hidden md:table-cell">Período</th>
                         <th>Respondentes</th>
                         <th className="hidden md:table-cell">Avaliação</th>
                         <th className="text-right">Ações</th>
                       </tr>
                     </thead>
                     <tbody>
                       {surveysList.map((survey) => (
                         <tr key={survey.id} className="hover:bg-muted/50">
                           <td className="font-medium text-sm">{survey.id}</td>
                           <td>
                             <div className="font-medium">{survey.title}</div>
                             <div className="text-xs text-muted-foreground md:hidden">
                               {survey.status === "active"
                                 ? "Ativo"
                                 : survey.status === "draft"
                                 ? "Rascunho"
                                 : "Finalizado"}
                             </div>
                           </td>
                           <td className="hidden md:table-cell">
                             <Badge
                               variant="outline"
                               className={
                                 survey.status === "active"
                                   ? "bg-green-100 text-green-800 border-green-200"
                                   : survey.status === "draft"
                                   ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                   : "bg-blue-100 text-blue-800 border-blue-200"
                               }
                             >
                               {survey.status === "active"
                                 ? "Ativo"
                                 : survey.status === "draft"
                                 ? "Rascunho"
                                 : "Finalizado"}
                             </Badge>
                           </td>
                           <td className="hidden md:table-cell">
                             {survey.status !== "draft"
                               ? `${survey.startDate} - ${survey.endDate}`
                               : "N/A"}
                           </td>
                           <td>
                             <div className="font-medium">{survey.respondents}</div>
                             <div className="text-xs text-muted-foreground">
                               {survey.questions} perguntas
                             </div>
                           </td>
                           <td className="hidden md:table-cell">
                             {survey.status !== "draft" ? (
                               <div className="flex items-center">
                                 <div className="bg-muted rounded-full h-2 w-20 mr-2">
                                   <div
                                     className="bg-green-500 h-full rounded-full"
                                     style={{ width: `${(survey.averageScore / 5) * 100}%` }}
                                   />
                                 </div>
                                 <span>{survey.averageScore.toFixed(1)}</span>
                               </div>
                             ) : (
                               <span className="text-muted-foreground">-</span>
                             )}
                           </td>
                           <td className="text-right">
                             <Button
                               variant="ghost"
                               size="sm"
                               onClick={() => handleSelectSurvey(survey)}
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
                 onClick={handleBackToSurveys}
               >
                 <ChevronLeft className="h-4 w-4 mr-1" />
                 Voltar para lista
               </Button>
             </div>

             <Card>
               <CardHeader>
                 <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                   <div>
                     <CardTitle className="text-xl">{selectedSurvey.title}</CardTitle>
                     <CardDescription className="mt-1">
                       ID: {selectedSurvey.id} | {selectedSurvey.description}
                     </CardDescription>
                   </div>
                   <Badge
                     variant="outline"
                     className={
                       selectedSurvey.status === "active"
                         ? "bg-green-100 text-green-800 border-green-200"
                         : selectedSurvey.status === "draft"
                         ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                         : "bg-blue-100 text-blue-800 border-blue-200"
                     }
                   >
                     {selectedSurvey.status === "active"
                       ? "Ativo"
                       : selectedSurvey.status === "draft"
                       ? "Rascunho"
                       : "Finalizado"}
                   </Badge>
                 </div>
               </CardHeader>
               <CardContent className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <Card>
                     <CardHeader className="pb-2">
                       <CardTitle className="text-sm font-medium text-muted-foreground">
                         Informações Gerais
                       </CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-2">
                       <div className="flex justify-between">
                         <span className="text-sm">Início</span>
                         <span className="font-medium">
                           {selectedSurvey.status !== "draft"
                             ? selectedSurvey.startDate
                             : "N/A"}
                         </span>
                       </div>
                       <div className="flex justify-between">
                         <span className="text-sm">Término</span>
                         <span className="font-medium">
                           {selectedSurvey.status !== "draft"
                             ? selectedSurvey.endDate
                             : "N/A"}
                         </span>
                       </div>
                       <div className="flex justify-between">
                         <span className="text-sm">Perguntas</span>
                         <span className="font-medium">{selectedSurvey.questions}</span>
                       </div>
                       <div className="flex justify-between">
                         <span className="text-sm">Público-alvo</span>
                         <span className="font-medium">{selectedSurvey.targetCustomers}</span>
                       </div>
                     </CardContent>
                   </Card>

                   <Card>
                     <CardHeader className="pb-2">
                       <CardTitle className="text-sm font-medium text-muted-foreground">
                         Participação
                       </CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-2">
                       <div className="flex justify-between">
                         <span className="text-sm">Total de Respondentes</span>
                         <span className="font-medium">{selectedSurvey.respondents}</span>
                       </div>
                       {selectedSurvey.status !== "draft" && (
                         <>
                           <div className="flex justify-between">
                             <span className="text-sm">Avaliação Média</span>
                             <div className="flex items-center">
                               <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                               <span className="font-medium">{selectedSurvey.averageScore.toFixed(1)}</span>
                             </div>
                           </div>
                           <div className="mt-2">
                             <p className="text-sm mb-1">Taxa de Resposta</p>
                             <div className="w-full bg-muted rounded-full h-2">
                               <div
                                 className="bg-blue-500 h-full rounded-full"
                                 style={{ width: `${(selectedSurvey.respondents / 500) * 100}%` }}
                               />
                             </div>
                             <div className="flex justify-between text-xs mt-1">
                               <span>{selectedSurvey.respondents} respostas</span>
                               <span>Meta: 500</span>
                             </div>
                           </div>
                         </>
                       )}
                     </CardContent>
                   </Card>

                   <Card>
                     <CardHeader className="pb-2">
                       <CardTitle className="text-sm font-medium text-muted-foreground">
                         Ações
                       </CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-3">
                       {selectedSurvey.status === "active" && (
                         <Button className="w-full">
                           <Send className="h-4 w-4 mr-2" />
                           Enviar Lembrete
                         </Button>
                       )}
                       {selectedSurvey.status === "draft" && (
                         <Button className="w-full bg-otis-500 hover:bg-otis-600">
                           <CheckCircle className="h-4 w-4 mr-2" />
                           Ativar Pesquisa
                         </Button>
                       )}
                       <Button variant="outline" className="w-full">
                         <Download className="h-4 w-4 mr-2" />
                         Exportar Resultados
                       </Button>
                       <Button variant="outline" className="w-full">
                         <ListFilter className="h-4 w-4 mr-2" />
                         Editar Pesquisa
                       </Button>
                     </CardContent>
                   </Card>
                 </div>

                 {selectedSurvey.status !== "draft" && (
                   <Card>
                     <CardHeader>
                       <CardTitle>Resultados da Pesquisa</CardTitle>
                       <CardDescription>
                         Análise das respostas recebidas
                       </CardDescription>
                     </CardHeader>
                     <CardContent>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="flex flex-col space-y-4">
                           <h3 className="text-sm font-medium">Distribuição das Avaliações</h3>
                           <div className="h-60 flex justify-center items-center">
                             <div className="text-center">
                               <BarChart2 className="h-32 w-32 text-muted-foreground/40 mx-auto" />
                               <div className="text-sm text-muted-foreground mt-4">
                                 Distribuição por pontuação (1-5)
                               </div>
                             </div>
                           </div>
                         </div>

                         <div className="flex flex-col space-y-4">
                           <h3 className="text-sm font-medium">Avaliação por Categoria</h3>
                           <div className="h-60 flex justify-center items-center">
                             <div className="text-center">
                               <BarChart2 className="h-32 w-32 text-muted-foreground/40 mx-auto rotate-90" />
                               <div className="text-sm text-muted-foreground mt-4">
                                 Avaliação média por categoria de pergunta
                               </div>
                             </div>
                           </div>
                         </div>
                       </div>

                       <Separator className="my-6" />

                       <div className="space-y-4">
                         <h3 className="text-sm font-medium">Principais Comentários</h3>
                         <div className="space-y-3">
                           <div className="p-3 border rounded-md">
                             <div className="flex items-center justify-between">
                               <StarRating rating={5} />
                               <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                                 Positivo
                               </Badge>
                             </div>
                             <p className="text-sm mt-2">
                               "Excelente atendimento em todas as fases do projeto. A instalação foi concluída dentro do prazo estipulado."
                             </p>
                           </div>
                           <div className="p-3 border rounded-md">
                             <div className="flex items-center justify-between">
                               <StarRating rating={3} />
                               <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                                 Neutro
                               </Badge>
                             </div>
                             <p className="text-sm mt-2">
                               "Equipamento de boa qualidade, mas houve alguns atrasos na entrega de componentes que poderiam ser evitados com melhor comunicação."
                             </p>
                           </div>
                           <div className="p-3 border rounded-md">
                             <div className="flex items-center justify-between">
                               <StarRating rating={2} />
                               <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                                 Negativo
                               </Badge>
                             </div>
                             <p className="text-sm mt-2">
                               "Enfrentamos problemas recorrentes com o sistema de portas automáticas. Já solicitamos manutenção três vezes no último mês."
                             </p>
                           </div>
                         </div>
                       </div>
                     </CardContent>
                   </Card>
                 )}

                 {selectedSurvey.status === "draft" && (
                   <Card>
                     <CardHeader>
                       <CardTitle>Estrutura da Pesquisa</CardTitle>
                       <CardDescription>
                         Configurações e perguntas da pesquisa
                       </CardDescription>
                     </CardHeader>
                     <CardContent className="space-y-6">
                       <div className="space-y-4">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="space-y-2">
                             <Label htmlFor="survey-title">Título da Pesquisa</Label>
                             <Input
                               id="survey-title"
                               defaultValue={selectedSurvey.title}
                             />
                           </div>
                           <div className="space-y-2">
                             <Label htmlFor="survey-target">Público-alvo</Label>
                             <Select defaultValue={selectedSurvey.targetCustomers}>
                               <SelectTrigger id="survey-target">
                                 <SelectValue placeholder="Selecione o público-alvo" />
                               </SelectTrigger>
                               <SelectContent>
                                 <SelectItem value="Todos os Clientes">Todos os Clientes</SelectItem>
                                 <SelectItem value="Projetos Concluídos">Projetos Concluídos</SelectItem>
                                 <SelectItem value="Clientes com Projetos Ativos">Clientes com Projetos Ativos</SelectItem>
                                 <SelectItem value="Contratos de Manutenção">Contratos de Manutenção</SelectItem>
                               </SelectContent>
                             </Select>
                           </div>
                         </div>
                         <div className="space-y-2">
                           <Label htmlFor="survey-description">Descrição</Label>
                           <Textarea
                             id="survey-description"
                             defaultValue={selectedSurvey.description}
                             rows={3}
                           />
                         </div>
                       </div>

                       <Separator />

                       <div className="space-y-4">
                         <div className="flex justify-between items-center">
                           <h3 className="text-sm font-medium">Perguntas da Pesquisa</h3>
                           <Button size="sm">Adicionar Pergunta</Button>
                         </div>
                         <div className="space-y-3">
                           <div className="p-4 border rounded-md">
                             <div className="flex justify-between items-start">
                               <div>
                                 <h4 className="font-medium">Avaliação geral da instalação</h4>
                                 <p className="text-sm text-muted-foreground mt-1">
                                   Tipo: Classificação por estrelas (1-5)
                                 </p>
                               </div>
                               <Button variant="ghost" size="sm">Editar</Button>
                             </div>
                           </div>
                           <div className="p-4 border rounded-md">
                             <div className="flex justify-between items-start">
                               <div>
                                 <h4 className="font-medium">Quão satisfeito você está com a qualidade do produto?</h4>
                                 <p className="text-sm text-muted-foreground mt-1">
                                   Tipo: Classificação por estrelas (1-5)
                                 </p>
                               </div>
                               <Button variant="ghost" size="sm">Editar</Button>
                             </div>
                           </div>
                           <div className="p-4 border rounded-md">
                             <div className="flex justify-between items-start">
                               <div>
                                 <h4 className="font-medium">Quão satisfeito você está com o prazo de entrega?</h4>
                                 <p className="text-sm text-muted-foreground mt-1">
                                   Tipo: Classificação por estrelas (1-5)
                                 </p>
                               </div>
                               <Button variant="ghost" size="sm">Editar</Button>
                             </div>
                           </div>
                           <div className="p-4 border rounded-md">
                             <div className="flex justify-between items-start">
                               <div>
                                 <h4 className="font-medium">Quão satisfeito você está com o atendimento da equipe?</h4>
                                 <p className="text-sm text-muted-foreground mt-1">
                                   Tipo: Classificação por estrelas (1-5)
                                 </p>
                               </div>
                               <Button variant="ghost" size="sm">Editar</Button>
                             </div>
                           </div>
                           <div className="p-4 border rounded-md">
                             <div className="flex justify-between items-start">
                               <div>
                                 <h4 className="font-medium">Você recomendaria a OTIS para outras empresas?</h4>
                                 <p className="text-sm text-muted-foreground mt-1">
                                   Tipo: NPS (0-10)
                                 </p>
                               </div>
                               <Button variant="ghost" size="sm">Editar</Button>
                             </div>
                           </div>
                           <div className="p-4 border rounded-md">
                             <div className="flex justify-between items-start">
                               <div>
                                 <h4 className="font-medium">Comentários ou sugestões adicionais:</h4>
                                 <p className="text-sm text-muted-foreground mt-1">
                                   Tipo: Texto longo
                                 </p>
                               </div>
                               <Button variant="ghost" size="sm">Editar</Button>
                             </div>
                           </div>
                         </div>
                       </div>
                     </CardContent>
                     <CardFooter className="flex justify-end space-x-2">
                       <Button variant="outline">Cancelar</Button>
                       <Button className="bg-otis-500 hover:bg-otis-600">Salvar Alterações</Button>
                     </CardFooter>
                   </Card>
                 )}
               </CardContent>
             </Card>
           </>
         )}
       </TabsContent>

       {/* Settings Tab */}
       <TabsContent value="settings" className="mt-0 space-y-6">
         <Card>
           <CardHeader>
             <CardTitle>Configurações de Feedback</CardTitle>
             <CardDescription>
               Personalize como os feedbacks são coletados e processados
             </CardDescription>
           </CardHeader>
           <CardContent className="space-y-6">
             <div className="space-y-4">
               <h3 className="font-medium">Gatilhos de Envio</h3>
               <div className="space-y-2">
                 <div className="flex items-center justify-between">
                   <div className="flex flex-col space-y-1">
                     <Label htmlFor="trigger-completion">Após Conclusão de Projeto</Label>
                     <p className="text-sm text-muted-foreground">
                       Enviar pesquisa automaticamente quando um projeto for marcado como concluído
                     </p>
                   </div>
                   <Switch id="trigger-completion" defaultChecked={true} />
                 </div>
                 <div className="p-3 pl-6 border rounded-md flex items-center justify-between">
                   <div>
                     <p className="font-medium">Dias para envio após conclusão</p>
                   </div>
                   <div className="w-20">
                     <Input type="number" defaultValue="7" min="1" max="30" />
                   </div>
                 </div>
               </div>

               <div className="space-y-2">
                 <div className="flex items-center justify-between">
                   <div className="flex flex-col space-y-1">
                     <Label htmlFor="trigger-quarterly">Pesquisas Trimestrais</Label>
                     <p className="text-sm text-muted-foreground">
                       Enviar pesquisas trimestrais de satisfação para clientes com contratos ativos
                     </p>
                   </div>
                   <Switch id="trigger-quarterly" defaultChecked={true} />
                 </div>
               </div>

               <div className="space-y-2">
                 <div className="flex items-center justify-between">
                   <div className="flex flex-col space-y-1">
                     <Label htmlFor="trigger-service">Após Serviço de Manutenção</Label>
                     <p className="text-sm text-muted-foreground">
                       Enviar pesquisa curta após cada visita de manutenção
                     </p>
                   </div>
                   <Switch id="trigger-service" defaultChecked={false} />
                 </div>
               </div>
             </div>

             <Separator />

             <div className="space-y-4">
               <h3 className="font-medium">Alertas e Notificações</h3>
               <div className="space-y-2">
                 <div className="flex items-center justify-between">
                   <div className="flex flex-col space-y-1">
                     <Label htmlFor="notif-negative">Alertas de Feedback Negativo</Label>
                     <p className="text-sm text-muted-foreground">
                       Notificar gerentes quando receber avaliações abaixo de 3 estrelas
                     </p>
                   </div>
                   <Switch id="notif-negative" defaultChecked={true} />
                 </div>
               </div>

               <div className="space-y-2">
                 <div className="flex items-center justify-between">
                   <div className="flex flex-col space-y-1">
                     <Label htmlFor="notif-responses">Notificações de Novas Respostas</Label>
                     <p className="text-sm text-muted-foreground">
                       Receber notificações para cada nova resposta de pesquisa
                     </p>
                   </div>
                   <Switch id="notif-responses" defaultChecked={false} />
                 </div>
               </div>

               <div className="space-y-2">
                 <div className="flex items-center justify-between">
                   <div className="flex flex-col space-y-1">
                     <Label htmlFor="notif-summary">Resumo Semanal</Label>
                     <p className="text-sm text-muted-foreground">
                       Receber resumo semanal com métricas de feedback e pesquisas
                     </p>
                   </div>
                   <Switch id="notif-summary" defaultChecked={true} />
                 </div>
               </div>
             </div>

             <Separator />

             <div className="space-y-4">
               <h3 className="font-medium">Destinatários de Alertas</h3>
               <div className="space-y-2">
                 <div className="flex items-center space-x-2">
                   <Checkbox id="recipient-operations" />
                   <Label htmlFor="recipient-operations">Gerentes de Operações</Label>
                 </div>
                 <div className="flex items-center space-x-2">
                   <Checkbox id="recipient-quality" defaultChecked />
                   <Label htmlFor="recipient-quality">Departamento de Qualidade</Label>
                 </div>
                 <div className="flex items-center space-x-2">
                   <Checkbox id="recipient-sales" />
                   <Label htmlFor="recipient-sales">Equipe de Vendas</Label>
                 </div>
                 <div className="flex items-center space-x-2">
                   <Checkbox id="recipient-directors" defaultChecked />
                   <Label htmlFor="recipient-directors">Diretoria</Label>
                 </div>
               </div>
             </div>
           </CardContent>
           <CardFooter className="flex justify-end space-x-2">
             <Button variant="outline">Cancelar</Button>
             <Button className="bg-otis-500 hover:bg-otis-600">Salvar Configurações</Button>
           </CardFooter>
         </Card>

         <Card>
           <CardHeader>
             <CardTitle>Modelos e Automação</CardTitle>
             <CardDescription>
               Configure modelos de pesquisas e respostas automatizadas
             </CardDescription>
           </CardHeader>
           <CardContent className="space-y-6">
             <div className="space-y-4">
               <h3 className="font-medium">Modelos de Pesquisa</h3>
               <div className="space-y-2">
                 <div className="p-4 border rounded-md hover:bg-accent/50">
                   <div className="flex justify-between items-start">
                     <div>
                       <h4 className="font-medium">Pesquisa de Satisfação Pós-Instalação</h4>
                       <p className="text-sm text-muted-foreground mt-1">
                         Modelo padrão para avaliação após conclusão de projeto
                       </p>
                     </div>
                     <Button variant="outline" size="sm">Editar</Button>
                   </div>
                 </div>
                 <div className="p-4 border rounded-md hover:bg-accent/50">
                   <div className="flex justify-between items-start">
                     <div>
                       <h4 className="font-medium">NPS Trimestral</h4>
                       <p className="text-sm text-muted-foreground mt-1">
                         Pesquisa trimestral para medir o Net Promoter Score
                       </p>
                     </div>
                     <Button variant="outline" size="sm">Editar</Button>
                   </div>
                 </div>
                 <div className="p-4 border rounded-md hover:bg-accent/50">
                   <div className="flex justify-between items-start">
                     <div>
                       <h4 className="font-medium">Pesquisa de Manutenção</h4>
                       <p className="text-sm text-muted-foreground mt-1">
                         Avaliação rápida após serviços de manutenção
                       </p>
                     </div>
                     <Button variant="outline" size="sm">Editar</Button>
                   </div>
                 </div>
               </div>
               <Button>
                 <Plus className="h-4 w-4 mr-2" />
                 Novo Modelo
               </Button>
             </div>

             <Separator />

             <div className="space-y-4">
               <h3 className="font-medium">Respostas Automáticas</h3>
               <div className="space-y-2">
                 <div className="p-4 border rounded-md hover:bg-accent/50">
                   <div className="flex justify-between items-start">
                     <div>
                       <h4 className="font-medium">Agradecimento por Feedback Positivo</h4>
                       <p className="text-sm text-muted-foreground mt-1">
                         Resposta automática para avaliações de 4 ou 5 estrelas
                       </p>
                     </div>
                     <Button variant="outline" size="sm">Editar</Button>
                   </div>
                 </div>
                 <div className="p-4 border rounded-md hover:bg-accent/50">
                   <div className="flex justify-between items-start">
                     <div>
                       <h4 className="font-medium">Resposta para Feedback Negativo</h4>
                       <p className="text-sm text-muted-foreground mt-1">
                         Resposta inicial para avaliações abaixo de 3 estrelas
                       </p>
                     </div>
                     <Button variant="outline" size="sm">Editar</Button>
                   </div>
                 </div>
               </div>
               <div className="flex items-center justify-between">
                 <div className="flex flex-col space-y-1">
                   <Label htmlFor="auto-response">Habilitar Respostas Automáticas</Label>
                   <p className="text-sm text-muted-foreground">
                     Enviar respostas automáticas imediatamente ao receber feedback
                   </p>
                 </div>
                 <Switch id="auto-response" defaultChecked={true} />
               </div>
             </div>

             <Separator />

             <div className="space-y-4">
               <h3 className="font-medium">Integração com Outros Sistemas</h3>
               <div className="space-y-2">
                 <div className="flex items-center justify-between">
                   <div className="flex flex-col space-y-1">
                     <Label htmlFor="crm-integration">Integração com CRM</Label>
                     <p className="text-sm text-muted-foreground">
                       Sincronizar feedbacks com o sistema de CRM
                     </p>
                   </div>
                   <Switch id="crm-integration" defaultChecked={true} />
                 </div>
                 <div className="flex items-center justify-between">
                   <div className="flex flex-col space-y-1">
                     <Label htmlFor="ticket-integration">Criar Tickets Automáticos</Label>
                     <p className="text-sm text-muted-foreground">
                       Gerar tickets no sistema de suporte para feedbacks negativos
                     </p>
                   </div>
                   <Switch id="ticket-integration" defaultChecked={true} />
                 </div>
               </div>
             </div>
           </CardContent>
           <CardFooter className="flex justify-end space-x-2">
             <Button variant="outline">Cancelar</Button>
             <Button className="bg-otis-500 hover:bg-otis-600">Salvar Configurações</Button>
           </CardFooter>
         </Card>
       </TabsContent>
     </Tabs>
   </div>
 );
};

export default FeedbackManagement;