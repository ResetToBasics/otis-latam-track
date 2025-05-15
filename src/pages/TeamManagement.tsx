import React, { useState, useEffect } from 'react';
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
import { Input } from "@/components/ui/input";
import { Plus } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Users,
  UserPlus,
  Trash,
  Edit,
  Search,
  Filter,
  MapPin,
  Building,
  ArrowUpDown,
  CheckCircle,
  Clock,
  BarChart2,
  ChevronRight,
  Calendar,
  Star,
  AlertCircle,
  MoreHorizontal,
  Activity,
  PieChart,
  TrendingUp,
  CalendarDays,
  CheckCircle2,
  Eye
} from 'lucide-react';

// Mock data para equipes
const initialTeams = [
  {
    id: "TEAM-A",
    name: "Equipe A",
    country: "Brasil",
    region: "São Paulo",
    specialization: "Instalação",
    members: 5,
    status: "active",
    leadName: "Carlos Oliveira",
    leadContact: "+55 11 98765-4321",
    assignedProjects: 3,
    completedProjects: 12,
    currentProject: "Torre Corporativa São Paulo",
    skillLevel: "Sênior",
    availability: "occupied", // occupied, partial, available
    performance: {
      projectsOnTime: 92,
      qualityScore: 4.8,
      clientSatisfaction: 4.7,
      productivityIndex: 97,
      safetyConcerns: 0,
      lastMonthInstallations: 4
    }
  },
  {
    id: "TEAM-B",
    name: "Equipe B",
    country: "México",
    region: "Cidade do México",
    specialization: "Instalação",
    members: 4,
    status: "active",
    leadName: "Miguel Rodriguez",
    leadContact: "+52 55 1234-5678",
    assignedProjects: 2,
    completedProjects: 8,
    currentProject: "Plaza Central Ciudad de México",
    skillLevel: "Pleno",
    availability: "partial", // occupied, partial, available
    performance: {
      projectsOnTime: 88,
      qualityScore: 4.5,
      clientSatisfaction: 4.2,
      productivityIndex: 90,
      safetyConcerns: 1,
      lastMonthInstallations: 2
    }
  },
  {
    id: "TEAM-C",
    name: "Equipe C",
    country: "Chile",
    region: "Santiago",
    specialization: "Manutenção",
    members: 3,
    status: "active",
    leadName: "Andrés Valdivia",
    leadContact: "+56 2 9876-5432",
    assignedProjects: 0,
    completedProjects: 15,
    currentProject: null,
    skillLevel: "Sênior",
    availability: "available", // occupied, partial, available
    performance: {
      projectsOnTime: 95,
      qualityScore: 4.9,
      clientSatisfaction: 4.8,
      productivityIndex: 98,
      safetyConcerns: 0,
      lastMonthInstallations: 0
    }
  },
  {
    id: "TEAM-D",
    name: "Equipe D",
    country: "Brasil",
    region: "Rio de Janeiro",
    specialization: "Instalação",
    members: 5,
    status: "active",
    leadName: "Marcelo Santos",
    leadContact: "+55 21 98765-4321",
    assignedProjects: 2,
    completedProjects: 10,
    currentProject: "Edifício Comercial Rio Centro",
    skillLevel: "Pleno",
    availability: "occupied", // occupied, partial, available
    performance: {
      projectsOnTime: 85,
      qualityScore: 4.2,
      clientSatisfaction: 4.0,
      productivityIndex: 87,
      safetyConcerns: 2,
      lastMonthInstallations: 3
    }
  },
  {
    id: "TEAM-E",
    name: "Equipe E",
    country: "Colômbia",
    region: "Bogotá",
    specialization: "Inspeção",
    members: 2,
    status: "inactive",
    leadName: "Sofia Martinez",
    leadContact: "+57 1 2345-6789",
    assignedProjects: 0,
    completedProjects: 7,
    currentProject: null,
    skillLevel: "Júnior",
    availability: "available", // occupied, partial, available
    performance: {
      projectsOnTime: 80,
      qualityScore: 3.9,
      clientSatisfaction: 3.8,
      productivityIndex: 83,
      safetyConcerns: 1,
      lastMonthInstallations: 0
    }
  }
];

// Mock de membros para cada equipe
const teamMembers = {
  "TEAM-A": [
    { id: "MEM-A1", name: "Carlos Oliveira", role: "Líder de Equipe", skills: ["Instalação", "Coordenação"], experience: "10 anos", certifications: ["ISO 9001", "Segurança"] },
    { id: "MEM-A2", name: "Paulo Silva", role: "Técnico Sênior", skills: ["Mecânica", "Elétrica"], experience: "8 anos", certifications: ["Técnico Especializado"] },
    { id: "MEM-A3", name: "Roberto Alves", role: "Técnico", skills: ["Instalação", "Teste"], experience: "5 anos", certifications: ["Trabalho em Altura"] },
    { id: "MEM-A4", name: "Amanda Costa", role: "Técnica", skills: ["Eletrônica", "Controles"], experience: "3 anos", certifications: ["Sistemas Digitais"] },
    { id: "MEM-A5", name: "Fernando Gomes", role: "Assistente", skills: ["Suporte", "Logística"], experience: "2 anos", certifications: ["Primeiros Socorros"] }
  ],
  "TEAM-B": [
    { id: "MEM-B1", name: "Miguel Rodriguez", role: "Líder de Equipe", skills: ["Instalação", "Coordenação"], experience: "7 anos", certifications: ["ISO 9001"] },
    { id: "MEM-B2", name: "Elena Gomez", role: "Técnica Sênior", skills: ["Mecânica", "Elétrica"], experience: "6 anos", certifications: ["Técnico Especializado"] },
    { id: "MEM-B3", name: "Juan Perez", role: "Técnico", skills: ["Instalação", "Hidráulica"], experience: "4 anos", certifications: ["Trabalho em Altura"] },
    { id: "MEM-B4", name: "Carlos Sanchez", role: "Assistente", skills: ["Suporte", "Logística"], experience: "2 anos", certifications: ["Primeiros Socorros"] }
  ],
  "TEAM-C": [
    { id: "MEM-C1", name: "Andrés Valdivia", role: "Líder de Equipe", skills: ["Manutenção", "Coordenação"], experience: "9 anos", certifications: ["ISO 9001", "Manutenção Preditiva"] },
    { id: "MEM-C2", name: "Camila Rojas", role: "Técnica Sênior", skills: ["Diagnóstico", "Elétrica"], experience: "7 anos", certifications: ["Técnico Especializado"] },
    { id: "MEM-C3", name: "Jorge Fuentes", role: "Técnico", skills: ["Manutenção", "Mecânica"], experience: "5 anos", certifications: ["Trabalho em Altura"] }
  ],
  "TEAM-D": [
    { id: "MEM-D1", name: "Marcelo Santos", role: "Líder de Equipe", skills: ["Instalação", "Coordenação"], experience: "8 anos", certifications: ["ISO 9001"] },
    { id: "MEM-D2", name: "Juliana Lima", role: "Técnica Sênior", skills: ["Mecânica", "Hidráulica"], experience: "6 anos", certifications: ["Técnico Especializado"] },
    { id: "MEM-D3", name: "Ricardo Souza", role: "Técnico", skills: ["Instalação", "Elétrica"], experience: "4 anos", certifications: ["Trabalho em Altura"] },
    { id: "MEM-D4", name: "Fernanda Ribeiro", role: "Técnica", skills: ["Eletrônica", "Controles"], experience: "3 anos", certifications: ["Sistemas Digitais"] },
    { id: "MEM-D5", name: "Bruno Almeida", role: "Assistente", skills: ["Suporte", "Logística"], experience: "1 ano", certifications: ["Primeiros Socorros"] }
  ],
  "TEAM-E": [
    { id: "MEM-E1", name: "Sofia Martinez", role: "Líder de Equipe", skills: ["Inspeção", "Coordenação"], experience: "5 anos", certifications: ["ISO 9001"] },
    { id: "MEM-E2", name: "Diego Torres", role: "Técnico", skills: ["Inspeção", "Documentação"], experience: "3 anos", certifications: ["Técnico de Qualidade"] }
  ]
};

// Mock de histórico de atividades para equipes
const teamActivities = {
  "TEAM-A": [
    { id: "ACT-A1", date: "10/04/2023", type: "installation", project: "Torre Corporativa São Paulo", description: "Instalação de guias", status: "completed", duration: 8, efficiency: 95 },
    { id: "ACT-A2", date: "11/04/2023", type: "installation", project: "Torre Corporativa São Paulo", description: "Montagem de estrutura de suporte", status: "completed", duration: 10, efficiency: 90 },
    { id: "ACT-A3", date: "12/04/2023", type: "maintenance", project: "Centro Empresarial Paulista", description: "Manutenção preventiva em elevadores", status: "completed", duration: 4, efficiency: 100 },
    { id: "ACT-A4", date: "13/04/2023", type: "installation", project: "Torre Corporativa São Paulo", description: "Instalação de cabine", status: "in-progress", duration: 0, efficiency: 0 }
  ],
  "TEAM-B": [
    { id: "ACT-B1", date: "08/04/2023", type: "installation", project: "Plaza Central Ciudad de México", description: "Preparação do poço", status: "completed", duration: 6, efficiency: 85 },
    { id: "ACT-B2", date: "09/04/2023", type: "installation", project: "Plaza Central Ciudad de México", description: "Instalação de guias", status: "completed", duration: 9, efficiency: 88 },
    { id: "ACT-B3", date: "10/04/2023", type: "inspection", project: "Centro Comercial Reforma", description: "Inspeção de segurança", status: "completed", duration: 3, efficiency: 95 }
  ]
};

// Mock de projetos disponíveis para alocação
const availableProjects = [
  { id: "BR-2023-001", name: "Torre Corporativa São Paulo", location: "São Paulo, Brasil", status: "em-andamento" },
  { id: "MX-2023-042", name: "Plaza Central Ciudad de México", location: "Cidade do México, México", status: "em-andamento" },
  { id: "CL-2023-007", name: "Centro Costanera Santiago", location: "Santiago, Chile", status: "concluido" },
  { id: "AR-2023-018", name: "Torre Libertador Buenos Aires", location: "Buenos Aires, Argentina", status: "em-andamento" },
  { id: "CO-2023-023", name: "Edificio Central Bogotá", location: "Bogotá, Colômbia", status: "em-andamento" },
  { id: "BR-2023-035", name: "Shopping Vila Mariana", location: "São Paulo, Brasil", status: "planejado" },
  { id: "BR-2023-036", name: "Edifício Comercial Rio Centro", location: "Rio de Janeiro, Brasil", status: "em-andamento" },
  { id: "PE-2023-012", name: "Torre Miraflores Lima", location: "Lima, Peru", status: "planejado" }
];

// Componente principal de Gestão de Equipes
const TeamManagement = () => {
  const [teams, setTeams] = useState(initialTeams);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedTab, setSelectedTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCountry, setFilterCountry] = useState("all");
  const [filterSpecialization, setFilterSpecialization] = useState("all");
  const [filterAvailability, setFilterAvailability] = useState("all");
  const [isAddTeamModalOpen, setIsAddTeamModalOpen] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [isAssignProjectModalOpen, setIsAssignProjectModalOpen] = useState(false);
  const [newTeam, setNewTeam] = useState({
    name: "",
    country: "",
    region: "",
    specialization: "",
    members: 0,
    leadName: "",
    leadContact: ""
  });
  const [selectedMember, setSelectedMember] = useState(null);
  const [isMemberDetailModalOpen, setIsMemberDetailModalOpen] = useState(false);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [newActivity, setNewActivity] = useState({
    date: new Date().toISOString().split('T')[0],
    type: "installation",
    project: "",
    description: "",
    duration: 8
  });

  useEffect(() => {
    // Ao montar o componente, poderíamos carregar dados de equipes da API
    // Aqui estamos usando dados mock
  }, []);

  // Filtragem de equipes
  const getFilteredTeams = () => {
    return teams.filter(team => {
      // Filtro por busca
      if (searchQuery && !team.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !team.country.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !team.region.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !team.leadName.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Filtro por país
      if (filterCountry !== "all" && team.country !== filterCountry) {
        return false;
      }

      // Filtro por especialização
      if (filterSpecialization !== "all" && team.specialization !== filterSpecialization) {
        return false;
      }

      // Filtro por disponibilidade
      if (filterAvailability !== "all" && team.availability !== filterAvailability) {
        return false;
      }

      return true;
    });
  };

  // Selecionar uma equipe específica
  const handleSelectTeam = (team) => {
    setSelectedTeam(team);
    setSelectedTab("overview");
  };

  // Voltar para a lista de equipes
  const handleBackToList = () => {
    setSelectedTeam(null);
  };

  // Abrir modal para adicionar nova equipe
  const handleAddTeam = () => {
    setIsAddTeamModalOpen(true);
  };

  // Salvar nova equipe
  const handleSaveNewTeam = () => {
    // Validação básica
    if (!newTeam.name || !newTeam.country || !newTeam.specialization) {
      alert("Por favor, preencha os campos obrigatórios");
      return;
    }

    const newTeamObj = {
      id: `TEAM-${Math.floor(Math.random() * 1000)}`,
      name: newTeam.name,
      country: newTeam.country,
      region: newTeam.region,
      specialization: newTeam.specialization,
      members: parseInt(newTeam.members) || 0,
      status: "active",
      leadName: newTeam.leadName,
      leadContact: newTeam.leadContact,
      assignedProjects: 0,
      completedProjects: 0,
      currentProject: null,
      skillLevel: "Júnior",
      availability: "available",
      performance: {
        projectsOnTime: 0,
        qualityScore: 0,
        clientSatisfaction: 0,
        productivityIndex: 0,
        safetyConcerns: 0,
        lastMonthInstallations: 0
      }
    };

    // Adiciona a nova equipe e inicializa uma lista vazia de membros
    setTeams([...teams, newTeamObj]);
    teamMembers[newTeamObj.id] = [];

    // Fecha o modal e limpa o formulário
    setIsAddTeamModalOpen(false);
    setNewTeam({
      name: "",
      country: "",
      region: "",
      specialization: "",
      members: 0,
      leadName: "",
      leadContact: ""
    });
  };

  // Abrir modal para adicionar novo membro à equipe
  const handleAddMember = () => {
    setIsAddMemberModalOpen(true);
  };

  // Abrir modal de detalhes do membro
  const handleMemberClick = (member) => {
    setSelectedMember(member);
    setIsMemberDetailModalOpen(true);
  };

  // Fechar modal de detalhes do membro
  const handleCloseMemberModal = () => {
    setIsMemberDetailModalOpen(false);
    setSelectedMember(null);
  };

  // Abrir modal para registrar atividade
  const handleAddActivity = () => {
    setIsActivityModalOpen(true);
  };

  // Salvar nova atividade
  const handleSaveActivity = () => {
    // Validação básica
    if (!newActivity.project || !newActivity.description) {
      alert("Por favor, preencha os campos obrigatórios");
      return;
    }

    const activityObj = {
      id: `ACT-${Math.floor(Math.random() * 1000)}`,
      date: newActivity.date,
      type: newActivity.type,
      project: newActivity.project,
      description: newActivity.description,
      status: "completed",
      duration: parseInt(newActivity.duration) || 8,
      efficiency: Math.floor(Math.random() * 20) + 80 // 80-100%
    };

    // Se a equipe já tem atividades, adiciona à lista; senão, cria uma nova lista
    if (teamActivities[selectedTeam.id]) {
      teamActivities[selectedTeam.id] = [activityObj, ...teamActivities[selectedTeam.id]];
    } else {
      teamActivities[selectedTeam.id] = [activityObj];
    }

    // Fecha o modal e limpa o formulário
    setIsActivityModalOpen(false);
    setNewActivity({
      date: new Date().toISOString().split('T')[0],
      type: "installation",
      project: "",
      description: "",
      duration: 8
    });
  };

  // Abrir modal para atribuir projeto
  const handleAssignProject = () => {
    setIsAssignProjectModalOpen(true);
  };

  // Atribuir projeto à equipe
  const handleConfirmAssignProject = (projectId) => {
    // Encontrar o projeto selecionado
    const project = availableProjects.find(p => p.id === projectId);

    if (project) {
      // Atualizar a equipe com o novo projeto
      const updatedTeams = teams.map(team => {
        if (team.id === selectedTeam.id) {
          return {
            ...team,
            assignedProjects: team.assignedProjects + 1,
            currentProject: project.name,
            availability: "occupied"
          };
        }
        return team;
      });

      setTeams(updatedTeams);
      setSelectedTeam({
        ...selectedTeam,
        assignedProjects: selectedTeam.assignedProjects + 1,
        currentProject: project.name,
        availability: "occupied"
      });

      setIsAssignProjectModalOpen(false);
    }
  };

  // Renderizar estatísticas da equipe
  const renderTeamStats = () => {
    if (!selectedTeam) return null;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="p-2 bg-blue-100 rounded-full mb-2">
                <CheckCircle className="h-6 w-6 text-blue-800" />
              </div>
              <div className="text-2xl font-bold">
                {selectedTeam.performance.projectsOnTime}%
              </div>
              <div className="text-sm text-muted-foreground">
                Projetos no Prazo
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="p-2 bg-green-100 rounded-full mb-2">
                <Star className="h-6 w-6 text-green-800" />
              </div>
              <div className="text-2xl font-bold">
                {selectedTeam.performance.qualityScore}/5
              </div>
              <div className="text-sm text-muted-foreground">
                Índice de Qualidade
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="p-2 bg-amber-100 rounded-full mb-2">
                <Activity className="h-6 w-6 text-amber-800" />
              </div>
              <div className="text-2xl font-bold">
                {selectedTeam.performance.productivityIndex}%
              </div>
              <div className="text-sm text-muted-foreground">
                Índice de Produtividade
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="p-2 bg-purple-100 rounded-full mb-2">
                <TrendingUp className="h-6 w-6 text-purple-800" />
              </div>
              <div className="text-2xl font-bold">
                {selectedTeam.performance.lastMonthInstallations}
              </div>
              <div className="text-sm text-muted-foreground">
                Instalações no Último Mês
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Renderizar membros da equipe
  const renderTeamMembers = () => {
    if (!selectedTeam) return null;

    const members = teamMembers[selectedTeam.id] || [];

    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle>Membros da Equipe</CardTitle>
            <CardDescription>
              {members.length} membros cadastrados
            </CardDescription>
          </div>
          <Button variant="outline" onClick={handleAddMember}>
            <UserPlus className="h-4 w-4 mr-2" />
            Adicionar Membro
          </Button>
        </CardHeader>
        <CardContent>
          {members.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum membro cadastrado para esta equipe.
            </div>
          ) : (
            <div className="space-y-3">
              {members.map(member => (
                <div
                  key={member.id}
                  className="flex items-center justify-between border rounded-md p-3 hover:bg-accent/50 cursor-pointer"
                  onClick={() => handleMemberClick(member)}
                >
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarFallback>
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-muted-foreground">{member.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Badge variant="outline" className="mr-2">
                      {member.experience}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  // Renderizar atividades da equipe
  const renderTeamActivities = () => {
    if (!selectedTeam) return null;

    const activities = teamActivities[selectedTeam.id] || [];

    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle>Atividades Recentes</CardTitle>
            <CardDescription>
              Registro de atividades e produtividade
            </CardDescription>
          </div>
          <Button onClick={handleAddActivity}>
            <Plus className="h-4 w-4 mr-2" />
            Registrar Atividade
          </Button>
        </CardHeader>
        <CardContent>
          {activities.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Nenhuma atividade registrada para esta equipe.
            </div>
          ) : (
            <div className="space-y-3">
              {activities.map(activity => (
                <div
                  key={activity.id}
                  className="border rounded-md p-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{activity.description}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {activity.date} • {activity.project}
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        activity.type === "installation" ? "bg-blue-100 text-blue-800 border-blue-200" :
                        activity.type === "inspection" ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                        "bg-green-100 text-green-800 border-green-200"
                      }
                    >
                      {activity.type === "installation" ? "Instalação" :
                       activity.type === "inspection" ? "Inspeção" : "Manutenção"}
                    </Badge>
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{activity.duration} horas</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Activity className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>Eficiência: {activity.efficiency}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  // Renderizar projetos da equipe
  const renderTeamProjects = () => {
    if (!selectedTeam) return null;

    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle>Projetos</CardTitle>
            <CardDescription>
              Projetos atribuídos e histórico
            </CardDescription>
          </div>
          <Button onClick={handleAssignProject} disabled={selectedTeam.availability === "occupied"}>
            <Plus className="h-4 w-4 mr-2" />
            Atribuir Projeto
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {selectedTeam.currentProject && (
              <div>
                <h3 className="text-sm font-medium mb-2">Projeto Atual</h3>
                <div className="border rounded-md p-3 bg-blue-50 border-blue-200">
                  <div className="font-medium">{selectedTeam.currentProject}</div>
                  <div className="flex items-center justify-between mt-2">
                  <div className="text-sm flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>Em andamento</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Ver Detalhes
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div>
              <h3 className="text-sm font-medium mb-2">Histórico de Projetos</h3>
              {selectedTeam.completedProjects > 0 ? (
                <div className="space-y-2">
                  <div className="border rounded-md p-3">
                    <div className="font-medium">Shopping Vila Mariana</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Concluído em 22/11/2022
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        No Prazo
                      </Badge>
                      <Button variant="ghost" size="sm">
                        Detalhes
                      </Button>
                    </div>
                  </div>

                  {selectedTeam.completedProjects > 1 && (
                    <div className="border rounded-md p-3">
                      <div className="font-medium">Centro Empresarial Paulista</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Concluído em 15/09/2022
                      </div>
                      <div className="mt-2 flex justify-between items-center">
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                          Atraso de 5 dias
                        </Badge>
                        <Button variant="ghost" size="sm">
                          Detalhes
                        </Button>
                      </div>
                    </div>
                  )}

                  {selectedTeam.completedProjects > 2 && (
                    <Button variant="outline" className="w-full mt-2">
                      Ver Todos os Projetos ({selectedTeam.completedProjects})
                    </Button>
                  )}
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground border rounded-md">
                  Nenhum projeto concluído.
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Renderizar tendências de desempenho
  const renderPerformanceTrends = () => {
    if (!selectedTeam) return null;

    // Em um cenário real, usaríamos gráficos como Recharts aqui
    return (
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Tendências de Desempenho</CardTitle>
          <CardDescription>
            Análise de produtividade e eficiência ao longo do tempo
          </CardDescription>
        </CardHeader>
        <CardContent className="h-64 flex justify-center items-center">
          <div className="text-center">
            <BarChart2 className="h-32 w-32 text-muted-foreground/40 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Visualização de gráficos de desempenho seria renderizada aqui,
              mostrando tendências de produtividade, eficiência e qualidade ao longo do tempo.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Renderizar disponibilidade da equipe
  const renderTeamAvailability = () => {
    if (!selectedTeam) return null;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Disponibilidade e Agendamento</CardTitle>
          <CardDescription>
            Status atual e próximos compromissos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium mb-2">Status Atual</div>
              <div className="flex items-center">
                <Badge
                  variant="outline"
                  className={
                    selectedTeam.availability === "available" ? "bg-green-100 text-green-800 border-green-200" :
                    selectedTeam.availability === "partial" ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                    "bg-blue-100 text-blue-800 border-blue-200"
                  }
                >
                  {selectedTeam.availability === "available" ? "Disponível" :
                   selectedTeam.availability === "partial" ? "Parcialmente Disponível" : "Ocupada"}
                </Badge>
                {selectedTeam.currentProject && (
                  <span className="text-sm text-muted-foreground ml-2">
                    Trabalhando em: {selectedTeam.currentProject}
                  </span>
                )}
              </div>
            </div>

            <div>
              <div className="text-sm font-medium mb-2">Disponibilidade Semanal</div>
              <div className="grid grid-cols-7 gap-1">
                {["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"].map((day, index) => {
                  // Verificar se a equipe está disponível neste dia da semana
                  const isAvailable = selectedTeam.availability === "available" ||
                                      (selectedTeam.availability === "partial" && index !== 0 && index !== 6);

                  return (
                    <div
                      key={day}
                      className={`text-center p-1 text-xs rounded ${
                        isAvailable ? "bg-green-100 text-green-800" : "bg-gray-100"
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="text-sm font-medium mb-2">Próximos Agendamentos</div>
              {selectedTeam.availability !== "available" ? (
                <div className="space-y-2">
                  <div className="border rounded-md p-3">
                    <div className="font-medium">Instalação de Guias</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      15/04/2023 - Torre Corporativa São Paulo
                    </div>
                  </div>
                  <div className="border rounded-md p-3">
                    <div className="font-medium">Montagem de Cabine</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      20/04/2023 - Torre Corporativa São Paulo
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground border rounded-md">
                  Nenhum agendamento próximo.
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Renderizar detalhes completos da equipe selecionada
  const renderTeamDetails = () => {
    if (!selectedTeam) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackToList}
          >
            <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
            Voltar para lista
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-xl">{selectedTeam.name}</CardTitle>
                <CardDescription className="mt-1">
                  {selectedTeam.region}, {selectedTeam.country} • Especialização: {selectedTeam.specialization}
                </CardDescription>
              </div>
              <Badge
                variant="outline"
                className={
                  selectedTeam.availability === "available" ? "bg-green-100 text-green-800 border-green-200" :
                  selectedTeam.availability === "partial" ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                  "bg-blue-100 text-blue-800 border-blue-200"
                }
              >
                {selectedTeam.availability === "available" ? "Disponível" :
                 selectedTeam.availability === "partial" ? "Parcialmente Disponível" : "Ocupada"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsList className="w-full grid grid-cols-4">
                <TabsTrigger value="overview">
                  <BarChart2 className="h-4 w-4 mr-2" />
                  Visão Geral
                </TabsTrigger>
                <TabsTrigger value="members">
                  <Users className="h-4 w-4 mr-2" />
                  Membros
                </TabsTrigger>
                <TabsTrigger value="activities">
                  <Activity className="h-4 w-4 mr-2" />
                  Atividades
                </TabsTrigger>
                <TabsTrigger value="projects">
                  <Building className="h-4 w-4 mr-2" />
                  Projetos
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Informações da Equipe
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Líder</span>
                          <span className="font-medium">{selectedTeam.leadName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Contato</span>
                          <span className="font-medium">{selectedTeam.leadContact}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Membros</span>
                          <span className="font-medium">{selectedTeam.members}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Nível de Habilidade</span>
                          <span className="font-medium">{selectedTeam.skillLevel}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Projetos Atuais</span>
                          <span className="font-medium">{selectedTeam.assignedProjects}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Projetos Concluídos</span>
                          <span className="font-medium">{selectedTeam.completedProjects}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {renderTeamAvailability()}
                </div>

                {renderTeamStats()}

                {renderPerformanceTrends()}
              </TabsContent>

              <TabsContent value="members" className="space-y-4 mt-4">
                {renderTeamMembers()}
              </TabsContent>

              <TabsContent value="activities" className="space-y-4 mt-4">
                {renderTeamActivities()}
              </TabsContent>

              <TabsContent value="projects" className="space-y-4 mt-4">
                {renderTeamProjects()}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Renderizar comparação de desempenho entre equipes
  const renderTeamComparison = () => {
    // Aqui poderíamos renderizar gráficos comparativos
    return (
      <Card>
        <CardHeader>
          <CardTitle>Comparação de Equipes</CardTitle>
          <CardDescription>
            Análise comparativa de desempenho entre equipes
          </CardDescription>
        </CardHeader>
        <CardContent className="h-96 flex justify-center items-center">
          <div className="text-center">
            <BarChart2 className="h-32 w-32 text-muted-foreground/40 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Visualização de gráficos comparativos seria renderizada aqui,
              mostrando métricas de produtividade e qualidade entre diferentes equipes.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Renderizar tabela de equipes
  const renderTeamTable = () => {
    const filteredTeams = getFilteredTeams();

    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Lista de Equipes</CardTitle>
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
                  <th className="hidden md:table-cell">País/Região</th>
                  <th className="hidden md:table-cell">Especialização</th>
                  <th className="hidden md:table-cell">Membros</th>
                  <th>Status</th>
                  <th className="hidden md:table-cell">Produtividade</th>
                  <th className="text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeams.map((team) => (
                  <tr key={team.id} className="hover:bg-muted/50">
                    <td className="font-medium text-sm">{team.id}</td>
                    <td>
                      <div className="font-medium">{team.name}</div>
                      <div className="text-xs text-muted-foreground md:hidden">
                        {team.country} • {team.specialization}
                      </div>
                    </td>
                    <td className="hidden md:table-cell">{team.region}, {team.country}</td>
                    <td className="hidden md:table-cell">{team.specialization}</td>
                    <td className="hidden md:table-cell">{team.members}</td>
                    <td>
                      <Badge
                        variant="outline"
                        className={
                          team.availability === "available" ? "bg-green-100 text-green-800 border-green-200" :
                          team.availability === "partial" ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                          "bg-blue-100 text-blue-800 border-blue-200"
                        }
                      >
                        {team.availability === "available" ? "Disponível" :
                         team.availability === "partial" ? "Parcial" : "Ocupada"}
                      </Badge>
                    </td>
                    <td className="hidden md:table-cell">
                      <div className="flex items-center">
                        <div className="w-full bg-muted rounded-full h-2 mr-2">
                          <div
                            className="bg-green-500 h-full rounded-full"
                            style={{ width: `${team.performance.productivityIndex}%` }}
                          />
                        </div>
                        <span>{team.performance.productivityIndex}%</span>
                      </div>
                    </td>
                    <td className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSelectTeam(team)}
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
    );
  };

  // Renderizar visão geral de produtividade
  const renderProductivityOverview = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex flex-col">
                <p className="text-sm font-medium text-muted-foreground">Equipes Ativas</p>
                <div className="flex items-center mt-1">
                  <h3 className="text-2xl font-bold">{teams.filter(t => t.status === "active").length}</h3>
                  <Badge className="ml-2 bg-green-100 text-green-800 border-green-200">
                    +1
                  </Badge>
                </div>
              </div>
              <div className="p-2 rounded-full bg-blue-50">
                <Users className="h-4 w-4 text-blue-700" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Total de {teams.length} equipes cadastradas</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex flex-col">
                <p className="text-sm font-medium text-muted-foreground">Média de Produtividade</p>
                <div className="flex items-center mt-1">
                  <h3 className="text-2xl font-bold">
                    {Math.round(teams.reduce((sum, team) => sum + team.performance.productivityIndex, 0) / teams.length)}%
                  </h3>
                  <Badge className="ml-2 bg-green-100 text-green-800 border-green-200">
                    +3%
                  </Badge>
                </div>
              </div>
              <div className="p-2 rounded-full bg-green-50">
                <Activity className="h-4 w-4 text-green-700" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Comparado ao mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex flex-col">
                <p className="text-sm font-medium text-muted-foreground">Projetos Ativos</p>
                <div className="flex items-center mt-1">
                  <h3 className="text-2xl font-bold">
                    {teams.reduce((sum, team) => sum + team.assignedProjects, 0)}
                  </h3>
                </div>
              </div>
              <div className="p-2 rounded-full bg-purple-50">
                <Building className="h-4 w-4 text-purple-700" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {teams.filter(t => t.availability === "available").length} equipes disponíveis
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex flex-col">
                <p className="text-sm font-medium text-muted-foreground">Média de Qualidade</p>
                <div className="flex items-center mt-1">
                  <h3 className="text-2xl font-bold">
                    {(teams.reduce((sum, team) => sum + team.performance.qualityScore, 0) / teams.length).toFixed(1)}
                  </h3>
                  <Badge className="ml-2 bg-green-100 text-green-800 border-green-200">
                    +0.2
                  </Badge>
                </div>
              </div>
              <div className="p-2 rounded-full bg-amber-50">
                <Star className="h-4 w-4 text-amber-700" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Em uma escala de 0 a 5</p>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Componente principal
  return (
    <div className="space-y-6 animate-fade-in">
      {!selectedTeam ? (
        <>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                type="search"
                placeholder="Buscar equipes..."
                className="pl-8 w-full bg-white dark:bg-sidebar"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Select value={filterCountry} onValueChange={setFilterCountry}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="País" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Países</SelectItem>
                  <SelectItem value="Brasil">Brasil</SelectItem>
                  <SelectItem value="México">México</SelectItem>
                  <SelectItem value="Chile">Chile</SelectItem>
                  <SelectItem value="Colômbia">Colômbia</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterSpecialization} onValueChange={setFilterSpecialization}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Especialização" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Especializações</SelectItem>
                  <SelectItem value="Instalação">Instalação</SelectItem>
                  <SelectItem value="Manutenção">Manutenção</SelectItem>
                  <SelectItem value="Inspeção">Inspeção</SelectItem>
                </SelectContent>
              </Select>

              <Button>
                <Filter className="h-4 w-4 mr-2" />
                Mais Filtros
              </Button>
            </div>

            <Button className="bg-otis-500 hover:bg-otis-600" onClick={handleAddTeam}>
              <Plus className="h-4 w-4 mr-2" />
              Nova Equipe
            </Button>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="overview">
                <BarChart2 className="h-4 w-4 mr-2" />
                Visão Geral
              </TabsTrigger>
              <TabsTrigger value="teams">
                <Users className="h-4 w-4 mr-2" />
                Lista de Equipes
              </TabsTrigger>
              <TabsTrigger value="comparison">
                <Activity className="h-4 w-4 mr-2" />
                Comparação
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4 space-y-6">
              {renderProductivityOverview()}
              {renderTeamComparison()}
            </TabsContent>

            <TabsContent value="teams" className="mt-4">
              {renderTeamTable()}
            </TabsContent>

            <TabsContent value="comparison" className="mt-4">
              {renderTeamComparison()}
            </TabsContent>
          </Tabs>
        </>
      ) : (
        renderTeamDetails()
      )}

      {/* Modal para adicionar nova equipe */}
      <Dialog open={isAddTeamModalOpen} onOpenChange={setIsAddTeamModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Nova Equipe</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="team-name">Nome da Equipe</Label>
              <Input
                id="team-name"
                value={newTeam.name}
                onChange={(e) => setNewTeam({...newTeam, name: e.target.value})}
                placeholder="Ex: Equipe A"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="country">País</Label>
                <Select
                  value={newTeam.country}
                  onValueChange={(value) => setNewTeam({...newTeam, country: value})}
                >
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Selecione o país" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Brasil">Brasil</SelectItem>
                    <SelectItem value="México">México</SelectItem>
                    <SelectItem value="Chile">Chile</SelectItem>
                    <SelectItem value="Colômbia">Colômbia</SelectItem>
                    <SelectItem value="Argentina">Argentina</SelectItem>
                    <SelectItem value="Peru">Peru</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="region">Região/Cidade</Label>
                <Input
                  id="region"
                  value={newTeam.region}
                  onChange={(e) => setNewTeam({...newTeam, region: e.target.value})}
                  placeholder="Ex: São Paulo"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="specialization">Especialização</Label>
                <Select
                  value={newTeam.specialization}
                  onValueChange={(value) => setNewTeam({...newTeam, specialization: value})}
                >
                  <SelectTrigger id="specialization">
                    <SelectValue placeholder="Selecione a especialização" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Instalação">Instalação</SelectItem>
                    <SelectItem value="Manutenção">Manutenção</SelectItem>
                    <SelectItem value="Inspeção">Inspeção</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="members">Número de Membros</Label>
                <Input
                  id="members"
                  type="number"
                  min="1"
                  value={newTeam.members}
                  onChange={(e) => setNewTeam({...newTeam, members: e.target.value})}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="lead-name">Nome do Líder</Label>
              <Input
                id="lead-name"
                value={newTeam.leadName}
                onChange={(e) => setNewTeam({...newTeam, leadName: e.target.value})}
                placeholder="Ex: Carlos Oliveira"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="lead-contact">Contato do Líder</Label>
              <Input
                id="lead-contact"
                value={newTeam.leadContact}
                onChange={(e) => setNewTeam({...newTeam, leadContact: e.target.value})}
                placeholder="Ex: +55 11 98765-4321"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTeamModalOpen(false)}>Cancelar</Button>
            <Button className="bg-otis-500 hover:bg-otis-600" onClick={handleSaveNewTeam}>Criar Equipe</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para adicionar membro à equipe */}
      <Dialog open={isAddMemberModalOpen} onOpenChange={setIsAddMemberModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Adicionar Membro à Equipe</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="member-name">Nome Completo</Label>
              <Input
                id="member-name"
                placeholder="Ex: João Silva"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="role">Função</Label>
                <Select>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Selecione a função" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="leader">Líder de Equipe</SelectItem>
                    <SelectItem value="senior">Técnico Sênior</SelectItem>
                    <SelectItem value="tech">Técnico</SelectItem>
                    <SelectItem value="assistant">Assistente</SelectItem>
                  </SelectContent>
                </Select>
              </div>

                              <div className="grid gap-2">
                  <Label htmlFor="experience">Experiência</Label>
                  <Select>
                    <SelectTrigger id="experience">
                      <SelectValue placeholder="Anos de experiência" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Menos de 1 ano</SelectItem>
                      <SelectItem value="1-3">1-3 anos</SelectItem>
                      <SelectItem value="3-5">3-5 anos</SelectItem>
                      <SelectItem value="5-10">5-10 anos</SelectItem>
                      <SelectItem value="10+">Mais de 10 anos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Habilidades</Label>
                <div className="border rounded-md p-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="skill-installation" />
                    <Label htmlFor="skill-installation">Instalação</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="skill-mechanics" />
                    <Label htmlFor="skill-mechanics">Mecânica</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="skill-electric" />
                    <Label htmlFor="skill-electric">Elétrica</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="skill-electronics" />
                    <Label htmlFor="skill-electronics">Eletrônica</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="skill-coordination" />
                    <Label htmlFor="skill-coordination">Coordenação</Label>
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Certificações</Label>
                <div className="border rounded-md p-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cert-iso" />
                    <Label htmlFor="cert-iso">ISO 9001</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cert-safety" />
                    <Label htmlFor="cert-safety">Segurança</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cert-height" />
                    <Label htmlFor="cert-height">Trabalho em Altura</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cert-tech" />
                    <Label htmlFor="cert-tech">Técnico Especializado</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cert-firstaid" />
                    <Label htmlFor="cert-firstaid">Primeiros Socorros</Label>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddMemberModalOpen(false)}>Cancelar</Button>
              <Button className="bg-otis-500 hover:bg-otis-600">Adicionar Membro</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Modal para detalhes do membro */}
        <Dialog open={isMemberDetailModalOpen} onOpenChange={setIsMemberDetailModalOpen}>
          {selectedMember && (
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{selectedMember.name}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-lg">
                      {selectedMember.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{selectedMember.role}</h3>
                    <p className="text-sm text-muted-foreground">{selectedTeam?.name}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Experiência</h4>
                    <div className="border rounded-md p-3">
                      {selectedMember.experience}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Certificações</h4>
                    <div className="border rounded-md p-3">
                      <div className="flex flex-wrap gap-1">
                        {selectedMember.certifications.map((cert, index) => (
                          <Badge key={index} variant="outline">{cert}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Habilidades</h4>
                  <div className="border rounded-md p-3">
                    <div className="flex flex-wrap gap-1">
                      {selectedMember.skills.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-blue-100 text-blue-800 border-blue-200"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Histórico</h4>
                  <div className="border rounded-md p-3 space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="text-sm">Projetos Concluídos</div>
                      <Badge>5</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm">Produtividade Média</div>
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        92%
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm">Última Avaliação</div>
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        Excelente
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={handleCloseMemberModal}>Fechar</Button>
                <Button>Editar</Button>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>

        {/* Modal para registrar atividade */}
        <Dialog open={isActivityModalOpen} onOpenChange={setIsActivityModalOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Registrar Atividade</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="activity-date">Data</Label>
                <Input
                  id="activity-date"
                  type="date"
                  value={newActivity.date}
                  onChange={(e) => setNewActivity({...newActivity, date: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="activity-type">Tipo de Atividade</Label>
                  <Select
                    value={newActivity.type}
                    onValueChange={(value) => setNewActivity({...newActivity, type: value})}
                  >
                    <SelectTrigger id="activity-type">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="installation">Instalação</SelectItem>
                      <SelectItem value="inspection">Inspeção</SelectItem>
                      <SelectItem value="maintenance">Manutenção</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="activity-duration">Duração (horas)</Label>
                  <Input
                    id="activity-duration"
                    type="number"
                    min="1"
                    max="24"
                    value={newActivity.duration}
                    onChange={(e) => setNewActivity({...newActivity, duration: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="activity-project">Projeto</Label>
                <Select
                  value={newActivity.project}
                  onValueChange={(value) => setNewActivity({...newActivity, project: value})}
                >
                  <SelectTrigger id="activity-project">
                    <SelectValue placeholder="Selecione o projeto" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableProjects.map(project => (
                      <SelectItem key={project.id} value={project.name}>{project.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="activity-description">Descrição da Atividade</Label>
                <Input
                  id="activity-description"
                  value={newActivity.description}
                  onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
                  placeholder="Ex: Instalação de guias"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsActivityModalOpen(false)}>Cancelar</Button>
              <Button className="bg-otis-500 hover:bg-otis-600" onClick={handleSaveActivity}>Registrar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Modal para atribuir projeto */}
        <Dialog open={isAssignProjectModalOpen} onOpenChange={setIsAssignProjectModalOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Atribuir Projeto à Equipe</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <p className="text-sm text-muted-foreground">
                Selecione um projeto para atribuir à equipe <span className="font-medium">{selectedTeam?.name}</span>.
              </p>

              <div className="space-y-2 max-h-80 overflow-y-auto">
                {availableProjects
                  .filter(p => p.status !== "concluido")
                  .map(project => (
                    <div
                      key={project.id}
                      className="border rounded-md p-3 hover:bg-muted/50 cursor-pointer"
                      onClick={() => handleConfirmAssignProject(project.id)}
                    >
                      <div className="font-medium">{project.name}</div>
                      <div className="flex justify-between items-center mt-2">
                        <div className="text-sm text-muted-foreground">
                          {project.location}
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            project.status === "em-andamento" ? "bg-blue-100 text-blue-800 border-blue-200" :
                            "bg-yellow-100 text-yellow-800 border-yellow-200"
                          }
                        >
                          {project.status === "em-andamento" ? "Em Andamento" : "Planejado"}
                        </Badge>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAssignProjectModalOpen(false)}>Cancelar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  };

    export default TeamManagement;
