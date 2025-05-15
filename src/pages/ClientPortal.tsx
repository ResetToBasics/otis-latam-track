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
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Clock,
  Calendar,
  FileText,
  MessageCircle,
  Search,
  CheckCircle,
  AlertCircle,
  BarChart4,
  ChevronRight,
  Image,
  MessageSquare,
  Download,
  ThumbsUp,
  ExternalLink,
  FileBarChart,
  Film,
  Mail,  // Adicione esta importação
  Phone,  // Adicione esta importação também, se estiver usando
  ArrowRight
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import {
  Label
} from "@/components/ui/label";

import {
  Textarea
} from "@/components/ui/textarea";


// Mock data para instalações do cliente
const clientInstallations = [
  {
    id: "BR-2023-001",
    name: "Torre Corporativa São Paulo",
    location: "São Paulo, Brasil",
    status: "em-andamento",
    progress: 75,
    startDate: "10/01/2023",
    endDate: "15/09/2023",
    nextMilestone: "Instalação de cabos",
    nextMilestoneDate: "25/07/2023",
    contactPerson: "Roberto Mendes",
    contactEmail: "roberto.mendes@otis.com",
    contactPhone: "+55 11 3456-7890"
  },
  {
    id: "BR-2022-045",
    name: "Centro Financeiro São Paulo",
    location: "São Paulo, Brasil",
    status: "em-andamento",
    progress: 90,
    startDate: "15/08/2022",
    endDate: "30/05/2023",
    nextMilestone: "Comissionamento final",
    nextMilestoneDate: "15/05/2023",
    contactPerson: "Carolina Silva",
    contactEmail: "carolina.silva@otis.com",
    contactPhone: "+55 11 2345-6789"
  },
  {
    id: "BR-2022-032",
    name: "Shopping Vila Mariana",
    location: "São Paulo, Brasil",
    status: "concluido",
    progress: 100,
    startDate: "10/05/2022",
    endDate: "22/11/2022",
    nextMilestone: "Projeto concluído",
    nextMilestoneDate: "22/11/2022",
    contactPerson: "Diego Alves",
    contactEmail: "diego.alves@otis.com",
    contactPhone: "+55 11 3456-7890"
  }
];

// Mock data para linha do tempo
const timelineEvents = [
  {
    id: "TL-001",
    date: "10/01/2023",
    title: "Início do projeto",
    description: "Kickoff e alinhamento inicial",
    type: "milestone"
  },
  {
    id: "TL-002",
    date: "15/02/2023",
    title: "Preparação do local",
    description: "Verificação do poço e condições estruturais",
    type: "activity"
  },
  {
    id: "TL-003",
    date: "20/03/2023",
    title: "Instalação da estrutura base",
    description: "Montagem dos trilhos e estrutura metálica principal",
    type: "activity"
  },
  {
    id: "TL-004",
    date: "15/04/2023",
    title: "Marcos 1 - Estrutura completa",
    description: "Finalização da estrutura metálica e trilhos",
    type: "milestone"
  },
  {
    id: "TL-005",
    date: "10/05/2023",
    title: "Instalação de sistemas mecânicos",
    description: "Motores, cabos e contrapesos",
    type: "activity"
  },
  {
    id: "TL-006",
    date: "20/06/2023",
    title: "Instalação elétrica",
    description: "Cabeamento, painéis e controles",
    type: "activity"
  },
  {
    id: "TL-007",
    date: "15/07/2023",
    title: "Marco 2 - Sistemas instalados",
    description: "Sistemas mecânicos e elétricos operacionais",
    type: "milestone"
  },
  {
    id: "TL-008",
    date: "25/07/2023",
    title: "Instalação de cabos",
    description: "Instalação e tensionamento de cabos de tração",
    type: "activity",
    status: "próximo"
  },
  {
    id: "TL-009",
    date: "10/08/2023",
    title: "Instalação da cabine",
    description: "Montagem e acabamento da cabine",
    type: "activity",
    status: "pendente"
  },
  {
    id: "TL-010",
    date: "15/09/2023",
    title: "Entrega final",
    description: "Comissionamento e entrega ao cliente",
    type: "milestone",
    status: "pendente"
  }
];

// Mock para documentos do projeto
const projectDocuments = [
  {
    id: "DOC-001",
    name: "Contrato de Instalação",
    type: "PDF",
    size: "2.4 MB",
    uploadDate: "05/01/2023",
    category: "Contratual"
  },
  {
    id: "DOC-002",
    name: "Especificações Técnicas",
    type: "PDF",
    size: "5.7 MB",
    uploadDate: "07/01/2023",
    category: "Técnico"
  },
  {
    id: "DOC-003",
    name: "Cronograma Detalhado",
    type: "XLSX",
    size: "1.2 MB",
    uploadDate: "10/01/2023",
    category: "Planejamento"
  },
  {
    id: "DOC-004",
    name: "Relatório de Progresso - Março",
    type: "PDF",
    size: "3.1 MB",
    uploadDate: "05/04/2023",
    category: "Relatório"
  },
  {
    id: "DOC-005",
    name: "Relatório de Progresso - Abril",
    type: "PDF",
    size: "2.8 MB",
    uploadDate: "05/05/2023",
    category: "Relatório"
  },
  {
    id: "DOC-006",
    name: "Relatório de Progresso - Maio",
    type: "PDF",
    size: "3.5 MB",
    uploadDate: "05/06/2023",
    category: "Relatório"
  },
  {
    id: "DOC-007",
    name: "Certificado de Qualidade - Estrutura",
    type: "PDF",
    size: "1.8 MB",
    uploadDate: "20/04/2023",
    category: "Certificação"
  }
];

// Mock para fotos do progresso
const progressPhotos = [
  {
    id: "PHOTO-001",
    title: "Verificação inicial do poço",
    date: "15/01/2023",
    thumbnail: "/photos/thumbnail-1.jpg"
  },
  {
    id: "PHOTO-002",
    title: "Preparação da base",
    date: "05/02/2023",
    thumbnail: "/photos/thumbnail-2.jpg"
  },
  {
    id: "PHOTO-003",
    title: "Instalação de trilhos",
    date: "25/02/2023",
    thumbnail: "/photos/thumbnail-3.jpg"
  },
  {
    id: "PHOTO-004",
    title: "Estrutura metálica principal",
    date: "15/03/2023",
    thumbnail: "/photos/thumbnail-4.jpg"
  },
  {
    id: "PHOTO-005",
    title: "Sistema de contrapeso",
    date: "05/04/2023",
    thumbnail: "/photos/thumbnail-5.jpg"
  },
  {
    id: "PHOTO-006",
    title: "Instalação do motor",
    date: "25/04/2023",
    thumbnail: "/photos/thumbnail-6.jpg"
  },
  {
    id: "PHOTO-007",
    title: "Cabeamento elétrico",
    date: "10/05/2023",
    thumbnail: "/photos/thumbnail-7.jpg"
  },
  {
    id: "PHOTO-008",
    title: "Painel de controle",
    date: "30/05/2023",
    thumbnail: "/photos/thumbnail-8.jpg"
  },
  {
    id: "PHOTO-009",
    title: "Sistemas de segurança",
    date: "20/06/2023",
    thumbnail: "/photos/thumbnail-9.jpg"
  }
];

// Mock para mensagens
const messageHistory = [
  {
    id: "MSG-001",
    sender: "Grupo Empresarial Brasileiro",
    senderType: "cliente",
    date: "15/06/2023",
    time: "10:30",
    message: "Bom dia, gostaríamos de saber se é possível adiantar a instalação da cabine para a primeira semana de agosto.",
    read: true
  },
  {
    id: "MSG-002",
    sender: "Carolina Silva",
    senderType: "otis",
    date: "15/06/2023",
    time: "14:45",
    message: "Olá! Verificamos o cronograma e podemos adiantar para a primeira semana de agosto, mas precisaríamos que a parte elétrica esteja totalmente concluída até 25/07. Isso seria possível do lado de vocês?",
    read: true
  },
  {
    id: "MSG-003",
    sender: "Grupo Empresarial Brasileiro",
    senderType: "cliente",
    date: "16/06/2023",
    time: "09:15",
    message: "Sim, conseguiremos garantir que a parte elétrica esteja finalizada até 25/07. Agradecemos a flexibilidade!",
    read: true
  },
  {
    id: "MSG-004",
    sender: "Carolina Silva",
    senderType: "otis",
    date: "16/06/2023",
    time: "11:30",
    message: "Perfeito! Estamos ajustando o cronograma e enviaremos a versão atualizada até o final do dia. Ficaremos de olho na conclusão elétrica para não haver atrasos.",
    read: true
  },
  {
    id: "MSG-005",
    sender: "Carolina Silva",
    senderType: "otis",
    date: "16/06/2023",
    time: "17:20",
    message: "Conforme prometido, segue em anexo o cronograma atualizado com a instalação da cabine adiantada para primeira semana de agosto. Favor confirmar o recebimento.",
    attachment: "Cronograma_Atualizado_BR-2023-001.pdf",
    read: false
  }
];

const ClientPortal = () => {
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [selectedProject, setSelectedProject] = useState(clientInstallations[0]);
  const [projectDetailTab, setProjectDetailTab] = useState("overview");
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    // Lógica para enviar mensagem seria implementada aqui
    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="bg-blue-600 text-white font-bold text-xl px-2 py-1 rounded">
                OTIS
              </div>
              <span className="ml-2 text-gray-800 font-semibold">Latam Tracker</span>
            </div>
            <span className="ml-4 text-xl font-bold">Portal do Cliente</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex">
              <Badge className="bg-green-100 text-green-800 border-green-200">
                Grupo Empresarial Brasileiro
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>GE</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <Button variant="ghost" size="sm">
                  Minha Conta
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-6 px-4">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-full mb-6">
            <TabsTrigger value="dashboard">
              <BarChart4 className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="projects">
              <FileText className="h-4 w-4 mr-2" />
              Meus Projetos
            </TabsTrigger>
            <TabsTrigger value="messages">
              <MessageCircle className="h-4 w-4 mr-2" />
              Mensagens
            </TabsTrigger>
            <TabsTrigger value="feedback">
              <ThumbsUp className="h-4 w-4 mr-2" />
              Feedback
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="mt-0 space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-2/3 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Visão Geral de Projetos</CardTitle>
                    <CardDescription>
                      Status e progresso das suas instalações OTIS
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {clientInstallations.map((project) => (
                        <div key={project.id} className="border rounded-md p-3">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <div>
                              <h3 className="font-medium">{project.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                ID: {project.id} | {project.location}
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className={
                                project.status === "em-andamento"
                                  ? "bg-blue-100 text-blue-800 border-blue-200"
                                  : project.status === "concluido"
                                  ? "bg-green-100 text-green-800 border-green-200"
                                  : "bg-yellow-100 text-yellow-800 border-yellow-200"
                              }
                            >
                              {project.status === "em-andamento"
                                ? "Em Andamento"
                                : project.status === "concluido"
                                ? "Concluído"
                                : "Planejado"}
                            </Badge>
                          </div>
                          <div className="mt-2">
                            <div className="flex justify-between items-center text-sm mb-1">
                              <span>Progresso: {project.progress}%</span>
                              <span className="text-muted-foreground">
                                {project.startDate} - {project.endDate}
                              </span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className={`h-full rounded-full ${
                                  project.status === "concluido"
                                    ? "bg-green-500"
                                    : "bg-blue-500"
                                }`}
                                style={{ width: `${project.progress}%` }}
                              />
                            </div>
                          </div>
                          <div className="mt-3 pt-2 border-t flex justify-between items-center">
                            <div className="flex items-center text-sm">
                              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>
                                Próximo marco: {project.nextMilestone}{" "}
                                ({project.nextMilestoneDate})
                              </span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedProject(project);
                                setProjectDetailTab("overview");
                                setSelectedTab("projects");
                              }}
                            >
                              Detalhes
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Atividade Recente</CardTitle>
                    <CardDescription>
                      Atualizações dos últimos 30 dias
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-l-2 border-blue-400 pl-4 py-1">
                        <p className="text-sm text-muted-foreground">
                          20/06/2023
                        </p>
                        <p className="font-medium">
                          Instalação elétrica concluída
                        </p>
                        <p className="text-sm">
                          Projeto: Torre Corporativa São Paulo
                        </p>
                      </div>
                      <div className="border-l-2 border-green-400 pl-4 py-1">
                        <p className="text-sm text-muted-foreground">
                          16/06/2023
                        </p>
                        <p className="font-medium">
                          Cronograma atualizado enviado
                        </p>
                        <p className="text-sm">
                          Projeto: Torre Corporativa São Paulo
                        </p>
                      </div>
                      <div className="border-l-2 border-purple-400 pl-4 py-1">
                        <p className="text-sm text-muted-foreground">
                          10/06/2023
                        </p>
                        <p className="font-medium">
                          Novos documentos adicionados
                        </p>
                        <p className="text-sm">
                          Projeto: Centro Financeiro São Paulo
                        </p>
                      </div>
                      <div className="border-l-2 border-yellow-400 pl-4 py-1">
                        <p className="text-sm text-muted-foreground">
                          05/06/2023
                        </p>
                        <p className="font-medium">
                          Relatório mensal de maio disponível
                        </p>
                        <p className="text-sm">
                          Projetos: Todos os projetos ativos
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="md:w-1/3 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notificações</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-2 rounded-lg bg-yellow-50">
                        <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Ação necessária</p>
                          <p className="text-sm">
                            Aprovação pendente para ajuste no cronograma do
                            projeto Centro Financeiro
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Há 2 dias
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-2 rounded-lg">
                        <MessageSquare className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Nova mensagem</p>
                          <p className="text-sm">
                            Carolina Silva enviou uma mensagem com o cronograma
                            atualizado
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            16/06/2023
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-2 rounded-lg">
                        <FileText className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Novo documento</p>
                          <p className="text-sm">
                            Relatório de Progresso de Maio foi adicionado
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            05/06/2023
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contatos da OTIS</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-2 border rounded-md">
                        <Avatar>
                          <AvatarFallback>CS</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Carolina Silva</p>
                          <p className="text-sm text-muted-foreground">
                            Gerente de Projetos
                          </p>
                          <div className="flex gap-2 mt-1">
                            <Button variant="outline" size="sm">
                              E-mail
                            </Button>
                            <Button variant="outline" size="sm">
                              Telefone
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-2 border rounded-md">
                        <Avatar>
                          <AvatarFallback>RM</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Roberto Mendes</p>
                          <p className="text-sm text-muted-foreground">
                            Supervisor Técnico
                          </p>
                          <div className="flex gap-2 mt-1">
                            <Button variant="outline" size="sm">
                              E-mail
                            </Button>
                            <Button variant="outline" size="sm">
                              Telefone
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Suporte Técnico</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm">
                      Precisa de ajuda ou tem alguma dúvida sobre seu projeto?
                    </p>
                    <Button className="w-full bg-otis-500 hover:bg-otis-600">
                      Solicitar Suporte
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      Horário de atendimento: Segunda a Sexta, 8h às 18h
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="mt-0">
            <div className="space-y-6">
              {!selectedProject ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Meus Projetos</CardTitle>
                        <CardDescription>
                          Instalações e serviços contratados com a OTIS
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <div className="relative w-64">
                          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Buscar projetos..."
                            className="pl-8"
                          />
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {clientInstallations.map((project) => (
                        <div
                          key={project.id}
                          className="border p-4 rounded-md hover:bg-accent/50 cursor-pointer transition-colors"
                          onClick={() => setSelectedProject(project)}
                        >
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <div>
                              <h3 className="font-medium">{project.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                ID: {project.id} | {project.location}
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className={
                                project.status === "em-andamento"
                                  ? "bg-blue-100 text-blue-800 border-blue-200"
                                  : project.status === "concluido"
                                  ? "bg-green-100 text-green-800 border-green-200"
                                  : "bg-yellow-100 text-yellow-800 border-yellow-200"
                              }
                            >
                              {project.status === "em-andamento"
                                ? "Em Andamento"
                                : project.status === "concluido"
                                ? "Concluído"
                                : "Planejado"}
                            </Badge>
                          </div>
                          <div className="mt-2">
                            <div className="flex justify-between items-center text-sm mb-1">
                              <span>Progresso: {project.progress}%</span>
                              <span className="text-muted-foreground">
                                {project.startDate} - {project.endDate}
                              </span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className={`h-full rounded-full ${
                                  project.status === "concluido"
                                    ? "bg-green-500"
                                    : "bg-blue-500"
                                }`}
                                style={{ width: `${project.progress}%` }}
                              />
                            </div>
                          </div>
                          <div className="mt-3 pt-2 border-t flex items-center justify-between">
                            <div className="flex items-center text-sm">
                              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>
                                Próximo marco: {project.nextMilestone}
                              </span>
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
                </Card>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedProject(null)}
                      className="mr-2"
                    >
                      <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
                      Voltar para projetos
                    </Button>
                  </div>

                  <Card>
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                        <div>
                          <CardTitle className="text-xl">
                            {selectedProject.name}
                          </CardTitle>
                          <CardDescription className="mt-1">
                            ID: {selectedProject.id} | {selectedProject.location}
                          </CardDescription>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            selectedProject.status === "em-andamento"
                              ? "bg-blue-100 text-blue-800 border-blue-200"
                              : selectedProject.status === "concluido"
                              ? "bg-green-100 text-green-800 border-green-200"
                              : "bg-yellow-100 text-yellow-800 border-yellow-200"
                          }
                        >
                          {selectedProject.status === "em-andamento"
                            ? "Em Andamento"
                            : selectedProject.status === "concluido"
                            ? "Concluído"
                            : "Planejado"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Tabs
                        value={projectDetailTab}
                        onValueChange={setProjectDetailTab}
                        className="w-full"
                      >
                        <TabsList className="w-full mb-4">
                          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                          <TabsTrigger value="timeline">Linha do Tempo</TabsTrigger>
                          <TabsTrigger value="documents">Documentos</TabsTrigger>
                          <TabsTrigger value="photos">Fotos</TabsTrigger>
                          <TabsTrigger value="contact">Contato</TabsTrigger>
                        </TabsList>

                        {/* Project Overview Tab */}
                        <TabsContent value="overview" className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                  Informações do Projeto
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <div className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm">Status do Projeto</span>
                                    <Badge
                                      variant="outline"
                                      className={
                                        selectedProject.status === "em-andamento"
                                          ? "bg-blue-100 text-blue-800 border-blue-200"
                                          : selectedProject.status === "concluido"
                                          ? "bg-green-100 text-green-800 border-green-200"
                                          : "bg-yellow-100 text-yellow-800 border-yellow-200"
                                      }
                                    >
                                      {selectedProject.status === "em-andamento"
                                        ? "Em Andamento"
                                        : selectedProject.status === "concluido"
                                        ? "Concluído"
                                        : "Planejado"}
                                    </Badge>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm">Data de Início</span>
                                    <span className="font-medium">{selectedProject.startDate}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm">Data Prevista de Conclusão</span>
                                    <span className="font-medium">{selectedProject.endDate}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm">Próximo Marco</span>
                                    <span className="font-medium">{selectedProject.nextMilestoneDate}</span>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm mb-1">Progresso Geral</p>
                                  <div className="flex items-center">
                                    <div className="w-full bg-muted rounded-full h-2 mr-2">
                                      <div
                                        className={`h-full rounded-full ${
                                          selectedProject.status === "concluido"
                                            ? "bg-green-500"
                                            : "bg-blue-500"
                                        }`}
                                        style={{ width: `${selectedProject.progress}%` }}
                                      />
                                    </div>
                                    <span className="font-medium">{selectedProject.progress}%</span>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>

                            <Card>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                  Contato da OTIS
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <div className="flex items-center gap-4">
                                  <Avatar>
                                    <AvatarFallback>
                                      {selectedProject.contactPerson.split(" ").map(n => n[0]).join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">{selectedProject.contactPerson}</p>
                                    <p className="text-sm text-muted-foreground">Gerente de Projeto</p>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{selectedProject.contactEmail}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{selectedProject.contactPhone}</span>
                                  </div>
                                </div>
                                <div className="pt-2">
                                  <Button className="w-full">
                                    <MessageSquare className="h-4 w-4 mr-2" />
                                    Enviar Mensagem
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          </div>

                          <Card>
                            <CardHeader>
                              <CardTitle className="text-sm font-medium text-muted-foreground">
                                Próximas Etapas
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                <div className="p-3 border rounded-md bg-yellow-50 border-yellow-200">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <div className="font-medium">{selectedProject.nextMilestone}</div>
                                      <div className="text-sm text-muted-foreground mt-1">
                                        Prazo: {selectedProject.nextMilestoneDate}
                                      </div>
                                    </div>
                                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                                      Próxima Etapa
                                    </Badge>
                                  </div>
                                </div>

                                <div className="p-3 border rounded-md">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <div className="font-medium">Instalação da cabine</div>
                                      <div className="text-sm text-muted-foreground mt-1">
                                        Prazo: 10/08/2023
                                      </div>
                                    </div>
                                    <Badge variant="outline">Planejado</Badge>
                                  </div>
                                </div>

                                <div className="p-3 border rounded-md">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <div className="font-medium">Testes finais e ajustes</div>
                                      <div className="text-sm text-muted-foreground mt-1">
                                        Prazo: 01/09/2023
                                      </div>
                                    </div>
                                    <Badge variant="outline">Planejado</Badge>
                                  </div>
                                </div>

                                <div className="p-3 border rounded-md">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <div className="font-medium">Comissionamento final</div>
                                      <div className="text-sm text-muted-foreground mt-1">
                                        Prazo: 15/09/2023
                                      </div>
                                    </div>
                                    <Badge variant="outline">Planejado</Badge>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle className="text-sm font-medium text-muted-foreground">
                                Resumo da Atividade Recente
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                <div className="border-l-2 border-blue-400 pl-4 py-1">
                                  <p className="text-sm text-muted-foreground">
                                    20/06/2023
                                  </p>
                                  <p className="font-medium">
                                    Instalação elétrica concluída
                                  </p>
                                  <p className="text-sm">
                                    Os sistemas elétricos foram instalados e testados com sucesso.
                                  </p>
                                </div>
                                <div className="border-l-2 border-green-400 pl-4 py-1">
                                  <p className="text-sm text-muted-foreground">
                                    16/06/2023
                                  </p>
                                  <p className="font-medium">
                                    Cronograma atualizado enviado
                                  </p>
                                  <p className="text-sm">
                                    Ajuste no cronograma para acomodar a instalação da cabine na primeira semana de agosto.
                                  </p>
                                </div>
                                <div className="border-l-2 border-purple-400 pl-4 py-1">
                                  <p className="text-sm text-muted-foreground">
                                    15/06/2023
                                  </p>
                                  <p className="font-medium">
                                    Solicitação de adiantamento
                                  </p>
                                  <p className="text-sm">
                                    Cliente solicitou adiantamento da instalação da cabine.
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter>
                              <Button
                                variant="outline"
                                onClick={() => setProjectDetailTab("timeline")}
                                className="w-full"
                              >
                                Ver Linha do Tempo Completa
                              </Button>
                            </CardFooter>
                          </Card>
                        </TabsContent>

                        {/* Timeline Tab */}
                        <TabsContent value="timeline" className="space-y-4">
                          <Card>
                            <CardHeader>
                              <CardTitle>Linha do Tempo do Projeto</CardTitle>
                              <CardDescription>
                                Acompanhe as etapas e marcos do seu projeto
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="relative space-y-8 before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-muted before:ml-0.5">
                                {timelineEvents.map((event, index) => (
                                  <div key={event.id} className="flex gap-3">
                                    <div className={`rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 ${
                                      event.type === "milestone"
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-gray-100 text-gray-800"
                                    } ${
                                      event.status === "pendente" && "opacity-40"
                                    }`}>
                                      {event.type === "milestone" ? (
                                        <CheckCircle className="h-4 w-4" />
                                      ) : (
                                        <Clock className="h-4 w-4" />
                                      )}
                                    </div>
                                    <div className={`pb-8 ${
                                      index === timelineEvents.length - 1 ? "pb-0" : ""
                                    }`}>
                                      <div className="flex items-center gap-2">
                                        <p className="font-medium">{event.title}</p>
                                        {event.status === "próximo" && (
                                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                                            Próximo
                                          </Badge>
                                        )}
                                        {event.status === "pendente" && (
                                          <Badge variant="outline">Pendente</Badge>
                                        )}
                                      </div>
                                      <p className="text-sm text-muted-foreground">
                                        {event.date}
                                      </p>
                                      <p className="text-sm mt-1">
                                        {event.description}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </TabsContent>

                        {/* Documents Tab */}
                        <TabsContent value="documents" className="space-y-4">
                          <Card>
                            <CardHeader>
                              <div className="flex items-center justify-between">
                                <div>
                                  <CardTitle>Documentos do Projeto</CardTitle>
                                  <CardDescription>
                                    Acesse toda a documentação relacionada ao seu projeto
                                  </CardDescription>
                                </div>
                                <div className="flex gap-2">
                                  <Input placeholder="Buscar documentos..." className="w-64" />
                                  <Select defaultValue="all">
                                    <SelectTrigger className="w-[180px]">
                                      <SelectValue placeholder="Filtrar por categoria" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="all">Todas as Categorias</SelectItem>
                                      <SelectItem value="contract">Contratual</SelectItem>
                                      <SelectItem value="technical">Técnico</SelectItem>
                                      <SelectItem value="report">Relatórios</SelectItem>
                                      <SelectItem value="certificate">Certificados</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="overflow-auto">
                                <table className="w-full text-sm">
                                  <thead>
                                    <tr className="border-b bg-muted/50">
                                      <th className="h-10 px-4 text-left font-medium">Nome do Documento</th>
                                      <th className="h-10 px-4 text-left font-medium">Categoria</th>
                                      <th className="h-10 px-4 text-left font-medium">Data</th>
                                      <th className="h-10 px-4 text-left font-medium">Tamanho</th>
                                      <th className="h-10 px-4 text-right font-medium">Ações</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {projectDocuments.map((doc) => (
                                      <tr key={doc.id} className="border-b">
                                        <td className="p-4">
                                          <div className="flex items-center gap-2">
                                            <FileText className="h-4 w-4 text-muted-foreground" />
                                            <span>{doc.name}</span>
                                          </div>
                                        </td>
                                        <td className="p-4">{doc.category}</td>
                                        <td className="p-4">{doc.uploadDate}</td>
                                        <td className="p-4">{doc.size}</td>
                                        <td className="p-4 text-right">
                                          <div className="flex justify-end">
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                              <Download className="h-4 w-4" />
                                            </Button>
                                          </div>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </CardContent>
                          </Card>
                        </TabsContent>

                        {/* Photos Tab */}
                        <TabsContent value="photos" className="space-y-4">
                          <Card>
                            <CardHeader>
                              <CardTitle>Progresso Visual</CardTitle>
                              <CardDescription>
                                Fotos da instalação em diferentes etapas
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {progressPhotos.map((photo) => (
                                  <div key={photo.id} className="border rounded-md overflow-hidden">
                                    <div className="h-40 bg-muted/50 flex items-center justify-center relative">
                                      <Image className="h-10 w-10 text-muted-foreground" />
                                      <div className="absolute inset-0 p-2 bg-black/50 text-white opacity-0 hover:opacity-100 transition-opacity flex items-end">
                                        <Button variant="outline" size="sm" className="text-white border-white hover:bg-white/20 hover:text-white w-full">
                                          <Film className="h-4 w-4 mr-2" />
                                          Ampliar Imagem
                                        </Button>
                                      </div>
                                    </div>
                                    <div className="p-3">
                                      <p className="font-medium">{photo.title}</p>
                                      <p className="text-sm text-muted-foreground">{photo.date}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </TabsContent>

                        {/* Contact Tab */}
                        <TabsContent value="contact" className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card className="md:col-span-2">
                              <CardHeader>
                                <CardTitle>Mensagens</CardTitle>
                                <CardDescription>
                                  Histórico de comunicação com a equipe da OTIS
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="border rounded-md p-4 h-80 overflow-y-auto space-y-4">
                                  {messageHistory.map((msg) => (
                                    <div
                                      key={msg.id}
                                      className={`flex flex-col ${
                                        msg.senderType === "cliente" ? "items-end" : "items-start"
                                      }`}
                                    >
                                      <div
                                        className={`max-w-[80%] rounded-lg p-3 ${
                                          msg.senderType === "cliente"
                                            ? "bg-blue-100 text-blue-800"
                                            : "bg-gray-100"
                                        }`}
                                      >
                                        <p className="text-sm">{msg.message}</p>
                                        {msg.attachment && (
                                          <div className="mt-2 flex items-center gap-2 text-sm">
                                            <FileBarChart className="h-4 w-4" />
                                            <span className="text-blue-600 underline">
                                              {msg.attachment}
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                      <div className="text-xs text-muted-foreground mt-1">
                                        {msg.date} {msg.time} - {msg.sender}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                              <CardFooter>
                                <div className="flex w-full gap-2">
                                  <Input
                                    placeholder="Digite sua mensagem..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                  />
                                  <Button
                                    className="bg-otis-500 hover:bg-otis-600"
                                    onClick={handleSendMessage}
                                  >
                                    Enviar
                                  </Button>
                                </div>
                              </CardFooter>
                            </Card>

                            <div className="space-y-6">
                              <Card>
                                <CardHeader>
                                  <CardTitle>Contatos da OTIS</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                  <div className="flex items-center gap-3 p-2 border rounded-md">
                                    <Avatar>
                                      <AvatarFallback>
                                        {selectedProject.contactPerson.split(" ").map(n => n[0]).join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <p className="font-medium">{selectedProject.contactPerson}</p>
                                      <p className="text-sm text-muted-foreground">
                                        Gerente de Projeto
                                      </p>
                                      <div className="flex gap-2 mt-1">
                                        <Button variant="outline" size="sm">
                                          E-mail
                                        </Button>
                                        <Button variant="outline" size="sm">
                                          Telefone
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>

                              <Card>
                                <CardHeader>
                                  <CardTitle>Suporte Técnico</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                  <p className="text-sm">
                                    Precisa de ajuda ou tem alguma dúvida sobre seu projeto?
                                  </p>
                                  <Button className="w-full bg-otis-500 hover:bg-otis-600">
                                    Solicitar Suporte
                                  </Button>
                                  <p className="text-xs text-center text-muted-foreground">
                                    Horário de atendimento: Segunda a Sexta, 8h às 18h
                                  </p>
                                </CardContent>
                              </Card>

                              <Card>
                                <CardHeader>
                                  <CardTitle>Central de Emergência</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                  <p className="text-sm">
                                    Para emergências e situações críticas, entre em contato pelo
                                    número:
                                  </p>
                                  <div className="text-center py-2">
                                    <p className="text-xl font-bold">0800 123 4567</p>
                                    <p className="text-xs text-muted-foreground">
                                      Disponível 24 horas por dia, 7 dias por semana
                                    </p>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Centro de Mensagens</CardTitle>
                <CardDescription>
                  Comunicação com a equipe da OTIS
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="border rounded-md overflow-hidden">
                    <div className="bg-muted/50 p-3 border-b">
                      <h3 className="font-medium">Conversas</h3>
                    </div>
                    <div className="divide-y max-h-[500px] overflow-y-auto">
                      <div className="p-3 bg-blue-50 border-l-4 border-blue-500">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">Torre Corporativa São Paulo</p>
                            <p className="text-sm text-muted-foreground">
                              Carolina Silva
                            </p>
                          </div>
                          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                            Nova
                          </Badge>
                        </div>
                        <p className="text-sm mt-1 line-clamp-1">
                          Conforme prometido, segue em anexo o cronograma...
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          16/06/2023 17:20
                        </p>
                      </div>
                      <div className="p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">Centro Financeiro São Paulo</p>
                            <p className="text-sm text-muted-foreground">
                              Roberto Mendes
                            </p>
                          </div>
                        </div>
                        <p className="text-sm mt-1 line-clamp-1">
                          Bom dia! O cronograma foi atualizado conforme...
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          15/06/2023 09:30
                        </p>
                      </div>
                      <div className="p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">Suporte Técnico</p>
                            <p className="text-sm text-muted-foreground">
                              Equipe OTIS
                            </p>
                          </div>
                        </div>
                        <p className="text-sm mt-1 line-clamp-1">
                          Agradecemos seu contato. Sua solicitação foi...
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          10/06/2023 14:15
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2 border rounded-md overflow-hidden">
                    <div className="bg-muted/50 p-3 border-b flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Torre Corporativa São Paulo</h3>
                        <p className="text-sm text-muted-foreground">
                          Carolina Silva - Gerente de Projeto
                        </p>
                      </div>
                      <div>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Ver Projeto
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 space-y-4 h-[400px] overflow-y-auto">
                      {messageHistory.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex flex-col ${
                            msg.senderType === "cliente" ? "items-end" : "items-start"
                          }`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              msg.senderType === "cliente"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100"
                            }`}
                          >
                            <p className="text-sm">{msg.message}</p>
                            {msg.attachment && (
                              <div className="mt-2 flex items-center gap-2 text-sm">
                                <FileBarChart className="h-4 w-4" />
                                <span className="text-blue-600 underline">
                                  {msg.attachment}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {msg.date} {msg.time} - {msg.sender}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Digite sua mensagem..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <Button
                          className="bg-otis-500 hover:bg-otis-600"
                          onClick={handleSendMessage}
                        >
                          Enviar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Feedback e Avaliação</CardTitle>
                <CardDescription>
                  Compartilhe sua experiência com a OTIS
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Fornecer Feedback</CardTitle>
                      <CardDescription>
                        Avalie nossos serviços e ajude-nos a melhorar
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="project-select">Projeto</Label>
                        <Select defaultValue="BR-2023-001">
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um projeto" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="BR-2023-001">Torre Corporativa São Paulo</SelectItem>
                            <SelectItem value="BR-2022-045">Centro Financeiro São Paulo</SelectItem>
                            <SelectItem value="BR-2022-032">Shopping Vila Mariana</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Satisfação Geral</Label>
                        <div className="flex gap-3 py-2">
                          {[1, 2, 3, 4, 5].map((score) => (
                            <Button
                              key={score}
                              variant="outline"
                              className={`h-12 w-12 rounded-full hover:bg-blue-50 hover:text-blue-800 hover:border-blue-200 ${
                                score === 5 ? "bg-blue-50 text-blue-800 border-blue-200" : ""
                              }`}
                            >
                              {score}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category">Categoria</Label>
                        <Select defaultValue="geral">
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="geral">Avaliação Geral</SelectItem>
                            <SelectItem value="equipe">Equipe Técnica</SelectItem>
                            <SelectItem value="qualidade">Qualidade da Instalação</SelectItem>
                            <SelectItem value="comunicacao">Comunicação</SelectItem>
                            <SelectItem value="prazo">Prazo de Entrega</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="feedback-text">Seu Feedback</Label>
                        <Textarea
                          id="feedback-text"
                          placeholder="Compartilhe sua experiência, sugestões ou comentários..."
                          rows={4}
                        />
                      </div>

                      <div className="pt-2">
                        <Button className="w-full bg-otis-500 hover:bg-otis-600">
                          Enviar Feedback
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Histórico de Avaliações</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="border rounded-md p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">Shopping Vila Mariana</h3>
                                <p className="text-sm text-muted-foreground">30/11/2022</p>
                              </div>
                              <div className="flex items-center">
                                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                                  5/5
                                </Badge>
                              </div>
                            </div>
                            <div className="mt-2">
                              <p className="text-sm">
                                "Instalação realizada com perfeição e no prazo acordado. A equipe técnica foi muito profissional e prestativa."
                              </p>
                            </div>
                            <div className="mt-3 text-sm">
                              <Badge variant="outline">Equipe Técnica</Badge>
                              <Badge variant="outline" className="ml-2">Prazo de Entrega</Badge>
                            </div>
                          </div>

                          <div className="border rounded-md p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">Centro Financeiro São Paulo</h3>
                                <p className="text-sm text-muted-foreground">20/03/2023</p>
                              </div>
                              <div className="flex items-center">
                                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                                  4/5
                                </Badge>
                              </div>
                            </div>
                            <div className="mt-2">
                              <p className="text-sm">
                                "Boa qualidade na instalação e acabamento do produto. Comunicação poderia ser mais ágil."
                              </p>
                            </div>
                            <div className="mt-3 text-sm">
                              <Badge variant="outline">Qualidade da Instalação</Badge>
                              <Badge variant="outline" className="ml-2">Comunicação</Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Sugestões de Melhoria</CardTitle>
                        <CardDescription>
                          Ajude-nos a aprimorar nossos serviços
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="improvement-category">Categoria</Label>
                          <Select defaultValue="produto">
                            <SelectTrigger id="improvement-category">
                              <SelectValue placeholder="Selecione uma categoria" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="produto">Produto</SelectItem>
                              <SelectItem value="servico">Serviço de Instalação</SelectItem>
                              <SelectItem value="atendimento">Atendimento ao Cliente</SelectItem>
                              <SelectItem value="portal">Portal do Cliente</SelectItem>
                              <SelectItem value="outro">Outro</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="suggestion-text">Sua Sugestão</Label>
                          <Textarea
                            id="suggestion-text"
                            placeholder="Descreva sua sugestão para melhorarmos..."
                            rows={4}
                          />
                        </div>

                        <div className="pt-2">
                          <Button className="w-full">
                            Enviar Sugestão
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t mt-8">
        <div className="container mx-auto py-6 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <img src="/otis-logo.svg" alt="OTIS" className="h-6 mb-2" />
              <p className="text-sm text-muted-foreground">
                © 2023 OTIS Elevator Company. Todos os direitos reservados.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="link">Termos de Uso</Button>
              <Button variant="link">Política de Privacidade</Button>
              <Button variant="link">Suporte</Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ClientPortal;