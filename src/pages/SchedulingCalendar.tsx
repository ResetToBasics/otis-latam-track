// Componente de Calendário de Agendamento
import React, { useState, useEffect } from 'react';
import { format, startOfWeek, addDays, startOfMonth, endOfMonth, isSameMonth, isSameDay, addMonths, subMonths, parseISO } from 'date-fns';
import { ptBR, es } from 'date-fns/locale';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import {
  Calendar as CalendarIcon,
  Clock,
  ChevronLeft,
  ChevronRight,
  Users,
  MapPin,
  FileText,
  Building,
  Tool,
  User,
  Filter,
  Search,
  Plus,
  X,
  Trash,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// Mock de dados para agendamentos
const initialSchedules = [
  {
    id: "SCH-001",
    title: "Instalação de Guias",
    projectId: "BR-2023-001",
    projectName: "Torre Corporativa São Paulo",
    teamId: "TEAM-A",
    teamName: "Equipe A",
    startDate: "2023-06-15T08:00:00",
    endDate: "2023-06-15T17:00:00",
    status: "scheduled",
    location: "São Paulo, Brasil",
    type: "installation",
    notes: "Levar ferramentas específicas para instalação em prédio alto."
  },
  {
    id: "SCH-002",
    title: "Verificação de Poço",
    projectId: "MX-2023-042",
    projectName: "Plaza Central Ciudad de México",
    teamId: "TEAM-B",
    teamName: "Equipe B",
    startDate: "2023-06-16T09:00:00",
    endDate: "2023-06-16T12:00:00",
    status: "scheduled",
    location: "Cidade do México, México",
    type: "inspection",
    notes: "Cliente solicitou confirmação por telefone antes da visita."
  },
  {
    id: "SCH-003",
    title: "Manutenção Preventiva",
    projectId: "CL-2023-007",
    projectName: "Centro Costanera Santiago",
    teamId: "TEAM-C",
    teamName: "Equipe C",
    startDate: "2023-06-17T14:00:00",
    endDate: "2023-06-17T18:00:00",
    status: "scheduled",
    location: "Santiago, Chile",
    type: "maintenance",
    notes: "Primeira visita pós-instalação, verificar todos os sistemas."
  },
  {
    id: "SCH-004",
    title: "Instalação de Cabine",
    projectId: "BR-2023-001",
    projectName: "Torre Corporativa São Paulo",
    teamId: "TEAM-A",
    teamName: "Equipe A",
    startDate: "2023-06-20T08:00:00",
    endDate: "2023-06-21T17:00:00",
    status: "scheduled",
    location: "São Paulo, Brasil",
    type: "installation",
    notes: "Instalação em dois dias consecutivos. Confirmar material."
  }
];

// Mock de equipes disponíveis
const availableTeams = [
  { id: "TEAM-A", name: "Equipe A", country: "Brasil", specialization: "Instalação", members: 5 },
  { id: "TEAM-B", name: "Equipe B", country: "México", specialization: "Instalação", members: 4 },
  { id: "TEAM-C", name: "Equipe C", country: "Chile", specialization: "Manutenção", members: 3 },
  { id: "TEAM-D", name: "Equipe D", country: "Brasil", specialization: "Instalação", members: 5 },
  { id: "TEAM-E", name: "Equipe E", country: "Colômbia", specialization: "Inspeção", members: 2 }
];

// Mock de projetos disponíveis
const availableProjects = [
  { id: "BR-2023-001", name: "Torre Corporativa São Paulo", location: "São Paulo, Brasil", status: "em-andamento" },
  { id: "MX-2023-042", name: "Plaza Central Ciudad de México", location: "Cidade do México, México", status: "em-andamento" },
  { id: "CL-2023-007", name: "Centro Costanera Santiago", location: "Santiago, Chile", status: "concluido" },
  { id: "AR-2023-018", name: "Torre Libertador Buenos Aires", location: "Buenos Aires, Argentina", status: "em-andamento" },
  { id: "CO-2023-023", name: "Edificio Central Bogotá", location: "Bogotá, Colômbia", status: "em-andamento" }
];

const SchedulingCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [schedules, setSchedules] = useState(initialSchedules);
  const [currentView, setCurrentView] = useState("month"); // "month", "week", "day", "list"
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [newSchedule, setNewSchedule] = useState({
    title: "",
    projectId: "",
    teamId: "",
    startDate: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
    endDate: format(new Date(new Date().setHours(new Date().getHours() + 2)), "yyyy-MM-dd'T'HH:mm"),
    type: "installation",
    notes: ""
  });
  const [filterType, setFilterType] = useState("all");
  const [filterTeam, setFilterTeam] = useState("all");
  const [filterProject, setFilterProject] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("calendar"); // "calendar", "team-view", "upcoming"

  // Função para avançar e retroceder no calendário
  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  // Handler para clique em uma data
  const onDateClick = (day) => {
    setSelectedDate(day);

    // Se estiver na visão mensal, mudar para visão diária ao clicar
    if (currentView === "month") {
      setCurrentView("day");
    }
  };

  // Handler para clique em um agendamento
  const onScheduleClick = (schedule) => {
    setSelectedSchedule(schedule);
    setIsDetailModalOpen(true);
  };

  // Funções para gerenciar o modal de adição
  const openAddModal = () => {
    // Pré-configura a data inicial do novo agendamento para a data selecionada
    setNewSchedule({
      ...newSchedule,
      startDate: format(selectedDate, "yyyy-MM-dd'T'10:00"),
      endDate: format(selectedDate, "yyyy-MM-dd'T'12:00")
    });
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  // Funções para gerenciar o modal de detalhes
  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedSchedule(null);
  };

  // Adicionar novo agendamento
  const handleAddSchedule = () => {
    // Validação básica
    if (!newSchedule.title || !newSchedule.projectId || !newSchedule.teamId) {
      alert("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    // Encontrar o projeto e a equipe para incluir seus nomes
    const project = availableProjects.find(p => p.id === newSchedule.projectId);
    const team = availableTeams.find(t => t.id === newSchedule.teamId);

    const newScheduleItem = {
      id: `SCH-${Math.floor(Math.random() * 1000)}`,
      title: newSchedule.title,
      projectId: newSchedule.projectId,
      projectName: project.name,
      teamId: newSchedule.teamId,
      teamName: team.name,
      startDate: newSchedule.startDate,
      endDate: newSchedule.endDate,
      status: "scheduled",
      location: project.location,
      type: newSchedule.type,
      notes: newSchedule.notes
    };

    setSchedules([...schedules, newScheduleItem]);
    closeAddModal();

    // Resetar o form
    setNewSchedule({
      title: "",
      projectId: "",
      teamId: "",
      startDate: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      endDate: format(new Date(new Date().setHours(new Date().getHours() + 2)), "yyyy-MM-dd'T'HH:mm"),
      type: "installation",
      notes: ""
    });
  };

  // Excluir agendamento
  const handleDeleteSchedule = (id) => {
    if (confirm("Tem certeza que deseja excluir este agendamento?")) {
      setSchedules(schedules.filter(schedule => schedule.id !== id));
      closeDetailModal();
    }
  };

  // Filtrar agendamentos
  const getFilteredSchedules = () => {
    return schedules.filter(schedule => {
      // Filtro por tipo
      if (filterType !== "all" && schedule.type !== filterType) return false;

      // Filtro por equipe
      if (filterTeam !== "all" && schedule.teamId !== filterTeam) return false;

      // Filtro por projeto
      if (filterProject !== "all" && schedule.projectId !== filterProject) return false;

      // Filtro por busca
      if (searchQuery && !schedule.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !schedule.projectName.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !schedule.teamName.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      return true;
    });
  };

  // Retornar schedules para uma data específica
  const getSchedulesForDate = (date) => {
    const filteredSchedules = getFilteredSchedules();
    return filteredSchedules.filter(schedule => {
      const scheduleStartDate = parseISO(schedule.startDate);
      return isSameDay(scheduleStartDate, date);
    });
  };

  // Renderizar visualização mensal
  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);

    const days = [];
    let day = startDate;

    // Cabeçalho dos dias da semana
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      weekDays.push(
        <div key={`header-${i}`} className="text-center py-2 font-medium text-sm">
          {format(addDays(startDate, i), "EEEEEE", { locale: ptBR })}
        </div>
      );
    }

    // Células do calendário
    while (day <= monthEnd) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const schedulesForDay = getSchedulesForDate(cloneDay);
        const isToday = isSameDay(day, new Date());
        const isSelected = isSameDay(day, selectedDate);
        const isCurrentMonth = isSameMonth(day, monthStart);

        days.push(
          <div
            key={day.toString()}
            className={`min-h-24 border p-1 ${
              isToday ? "bg-blue-50" : ""
            } ${
              isSelected ? "border-blue-500 border-2" : ""
            } ${
              !isCurrentMonth ? "bg-gray-100 text-gray-400" : ""
            } hover:bg-gray-50 cursor-pointer`}
            onClick={() => onDateClick(cloneDay)}
          >
            <div className="text-right">
              <span className={`text-sm ${isToday ? "font-bold" : ""}`}>
                {format(day, "d")}
              </span>
            </div>
            <div className="overflow-y-auto max-h-20">
              {schedulesForDay.map((schedule, index) => (
                <div
                  key={index}
                  className={`text-xs truncate mb-1 p-1 rounded ${
                    schedule.type === "installation" ? "bg-blue-100 text-blue-800" :
                    schedule.type === "inspection" ? "bg-yellow-100 text-yellow-800" :
                    "bg-green-100 text-green-800"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onScheduleClick(schedule);
                  }}
                >
                  {format(parseISO(schedule.startDate), "HH:mm")} - {schedule.title}
                </div>
              ))}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
    }

    return (
      <div>
        <div className="grid grid-cols-7 border-b">
          {weekDays}
        </div>
        <div className="grid grid-cols-7">
          {days}
        </div>
      </div>
    );
  };

  // Renderizar visualização da semana
  const renderWeekView = () => {
    const weekStart = startOfWeek(selectedDate);
    const days = [];

    // Cabeçalho
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = addDays(weekStart, i);
      weekDays.push(
        <div key={`header-${i}`} className="text-center py-2 font-medium">
          <div>{format(day, "EEEE", { locale: ptBR })}</div>
          <div className={`text-sm ${isSameDay(day, new Date()) ? "bg-blue-100 rounded-full px-2" : ""}`}>
            {format(day, "d MMM")}
          </div>
        </div>
      );
    }

    // Timeline (8:00 - 18:00)
    const timeSlots = [];
    for (let hour = 8; hour <= 18; hour++) {
      timeSlots.push(
        <div key={`time-${hour}`} className="pr-4 py-4 text-right text-sm text-gray-500">
          {`${hour}:00`}
        </div>
      );
    }

    // Construir a grade de horas e dias
    const dayColumns = [];
    for (let i = 0; i < 7; i++) {
      const day = addDays(weekStart, i);
      const schedulesForDay = getSchedulesForDate(day);

      const hourCells = [];
      for (let hour = 8; hour <= 18; hour++) {
        // Filtrar agendamentos que ocorrem nesta hora
        const hourSchedules = schedulesForDay.filter(schedule => {
          const startHour = parseISO(schedule.startDate).getHours();
          const endHour = parseISO(schedule.endDate).getHours();
          return (startHour <= hour && endHour > hour) || startHour === hour;
        });

        hourCells.push(
          <div key={`day-${i}-hour-${hour}`} className="border-t py-2 px-1 h-20">
            {hourSchedules.map((schedule, index) => (
              <div
                key={index}
                className={`text-xs p-1 rounded mb-1 ${
                  schedule.type === "installation" ? "bg-blue-100 text-blue-800" :
                  schedule.type === "inspection" ? "bg-yellow-100 text-yellow-800" :
                  "bg-green-100 text-green-800"
                }`}
                onClick={() => onScheduleClick(schedule)}
              >
                <div className="font-medium">{schedule.title}</div>
                <div>{format(parseISO(schedule.startDate), "HH:mm")} - {format(parseISO(schedule.endDate), "HH:mm")}</div>
                <div className="truncate">{schedule.projectName}</div>
              </div>
            ))}
          </div>
        );
      }

      dayColumns.push(
        <div key={`day-column-${i}`} className="flex-1">
          {hourCells}
        </div>
      );
    }

    return (
      <div>
        <div className="grid grid-cols-7 border-b">
          {weekDays}
        </div>
        <div className="flex">
          <div className="w-16 shrink-0">
            {timeSlots}
          </div>
          <div className="flex flex-1">
            {dayColumns}
          </div>
        </div>
      </div>
    );
  };

  // Renderizar visualização do dia
  const renderDayView = () => {
    const schedulesForDay = getSchedulesForDate(selectedDate);
    const hours = [];

    // Criar slots de horas das 8:00 às 18:00
    for (let hour = 8; hour <= 18; hour++) {
      const hourSchedules = schedulesForDay.filter(schedule => {
        const startHour = parseISO(schedule.startDate).getHours();
        const endHour = parseISO(schedule.endDate).getHours();
        return (startHour <= hour && endHour > hour) || startHour === hour;
      });

      hours.push(
        <div key={`hour-${hour}`} className="flex border-t py-2">
          <div className="w-20 text-right pr-4 py-2 text-sm text-gray-500">
            {`${hour}:00`}
          </div>
          <div className="flex-1 min-h-20">
            {hourSchedules.map((schedule, index) => (
              <div
                key={index}
                className={`p-2 rounded mb-2 ${
                  schedule.type === "installation" ? "bg-blue-100 text-blue-800" :
                  schedule.type === "inspection" ? "bg-yellow-100 text-yellow-800" :
                  "bg-green-100 text-green-800"
                }`}
                onClick={() => onScheduleClick(schedule)}
              >
                <div className="font-medium">{schedule.title}</div>
                <div className="text-sm">{format(parseISO(schedule.startDate), "HH:mm")} - {format(parseISO(schedule.endDate), "HH:mm")}</div>
                <div className="flex items-center mt-1 text-sm">
                  <Users className="h-4 w-4 mr-1" />
                  {schedule.teamName}
                </div>
                <div className="flex items-center mt-1 text-sm">
                  <Building className="h-4 w-4 mr-1" />
                  {schedule.projectName}
                </div>
                {schedule.notes && (
                  <div className="mt-1 text-sm">{schedule.notes}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="text-center py-4 font-medium">
          <div>{format(selectedDate, "EEEE", { locale: ptBR })}</div>
          <div className="text-2xl">{format(selectedDate, "d 'de' MMMM 'de' yyyy", { locale: ptBR })}</div>
        </div>
        <div>
          {hours}
        </div>
      </div>
    );
  };

  // Renderizar visualização em lista
  const renderListView = () => {
    const filteredSchedules = getFilteredSchedules();
    const sortedSchedules = filteredSchedules.sort((a, b) =>
      new Date(a.startDate) - new Date(b.startDate)
    );

    return (
      <div className="space-y-2">
        {sortedSchedules.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            Nenhum agendamento encontrado para os filtros selecionados.
          </div>
        ) : (
          sortedSchedules.map(schedule => (
            <div
              key={schedule.id}
              className="border rounded-md p-3 hover:bg-gray-50 cursor-pointer"
              onClick={() => onScheduleClick(schedule)}
            >
              <div className="flex justify-between">
                <div className="font-medium">{schedule.title}</div>
                <Badge
                  variant="outline"
                  className={
                    schedule.type === "installation" ? "bg-blue-100 text-blue-800 border-blue-200" :
                    schedule.type === "inspection" ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                    "bg-green-100 text-green-800 border-green-200"
                  }
                >
                  {schedule.type === "installation" ? "Instalação" :
                   schedule.type === "inspection" ? "Inspeção" : "Manutenção"}
                </Badge>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {format(parseISO(schedule.startDate), "dd/MM/yyyy")}
                  <span className="mx-1">•</span>
                  <Clock className="h-4 w-4 mr-1" />
                  {format(parseISO(schedule.startDate), "HH:mm")} - {format(parseISO(schedule.endDate), "HH:mm")}
                </div>
                <div className="flex items-center mt-1">
                  <Building className="h-4 w-4 mr-1" />
                  {schedule.projectName}
                </div>
                <div className="flex items-center mt-1">
                  <Users className="h-4 w-4 mr-1" />
                  {schedule.teamName}
                </div>
                <div className="flex items-center mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {schedule.location}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    );
  };

  // Renderizar visualização de equipes
  const renderTeamView = () => {
    return (
      <div className="space-y-4">
        {availableTeams.map(team => {
          // Filtrar agendamentos para esta equipe
          const teamSchedules = schedules.filter(
            schedule => schedule.teamId === team.id
          ).sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

          // Calcular próximo agendamento
          const nextSchedule = teamSchedules.find(
            schedule => new Date(schedule.startDate) >= new Date()
          );

          return (
            <Card key={team.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div>
                    <CardTitle>{team.name}</CardTitle>
                    <CardDescription>
                      {team.country} • {team.specialization} • {team.members} membros
                    </CardDescription>
                  </div>
                  <Badge variant="outline">
                    {teamSchedules.length} agendamentos
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {nextSchedule && (
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">Próximo Agendamento</div>
                      <div
                        className={`border p-2 rounded-md ${
                          nextSchedule.type === "installation" ? "border-blue-200" :
                          nextSchedule.type === "inspection" ? "border-yellow-200" :
                          "border-green-200"
                        }`}
                      >
                        <div className="font-medium">{nextSchedule.title}</div>
                        <div className="text-sm flex items-center mt-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          {format(parseISO(nextSchedule.startDate), "dd/MM/yyyy")}
                          <span className="mx-1">•</span>
                          <Clock className="h-4 w-4 mr-1" />
                          {format(parseISO(nextSchedule.startDate), "HH:mm")}
                        </div>
                        <div className="text-sm flex items-center mt-1">
                          <Building className="h-4 w-4 mr-1" />
                          {nextSchedule.projectName}
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">Disponibilidade Semanal</div>
                    <div className="grid grid-cols-7 gap-1">
                      {["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"].map((day, index) => {
                        // Verificar se a equipe tem agendamentos neste dia da semana
                        const hasSchedule = teamSchedules.some(schedule =>
                          parseISO(schedule.startDate).getDay() === index
                        );

                        return (
                          <div
                            key={day}
                            className={`text-center p-1 text-xs rounded ${
                              hasSchedule ? "bg-blue-100 text-blue-800" : "bg-gray-100"
                            }`}
                          >
                            {day}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="ml-auto" onClick={() => {
                  setFilterTeam(team.id);
                  setActiveTab("calendar");
                  setCurrentView("list");
                }}>
                  Ver Agendamentos
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    );
  };

  // Renderizar calendário principal
  const renderCalendarContent = () => {
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-bold">
              {format(currentDate, "MMMM yyyy", { locale: ptBR })}
            </h2>
            <Button variant="outline" size="sm" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button
              variant={currentView === "month" ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentView("month")}
            >
              Mês
            </Button>
            <Button
              variant={currentView === "week" ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentView("week")}
            >
              Semana
            </Button>
            <Button
              variant={currentView === "day" ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentView("day")}
            >
              Dia
            </Button>
            <Button
              variant={currentView === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentView("list")}
            >
              Lista
            </Button>
          </div>
        </div>

        <div className="mb-4">
          {currentView === "month" && renderMonthView()}
          {currentView === "week" && renderWeekView()}
          {currentView === "day" && renderDayView()}
          {currentView === "list" && renderListView()}
        </div>
      </div>
    );
  };

  // Componente principal
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Agendamento de Instalações</CardTitle>
            <CardDescription>
              Planeje e agende instalações, inspeções e manutenções
            </CardDescription>
          </div>
          <Button className="bg-otis-500 hover:bg-otis-600" onClick={openAddModal}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Agendamento
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              type="search"
              placeholder="Buscar agendamentos..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tipo de Agendamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Tipos</SelectItem>
              <SelectItem value="installation">Instalação</SelectItem>
              <SelectItem value="inspection">Inspeção</SelectItem>
              <SelectItem value="maintenance">Manutenção</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterTeam} onValueChange={setFilterTeam}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Equipe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as Equipes</SelectItem>
              {availableTeams.map(team => (
                <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Mais Filtros
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="calendar">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Calendário
            </TabsTrigger>
            <TabsTrigger value="team-view">
              <Users className="h-4 w-4 mr-2" />
              Visão por Equipe
            </TabsTrigger>
            <TabsTrigger value="upcoming">
              <Clock className="h-4 w-4 mr-2" />
              Próximos Agendamentos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendar">
            {renderCalendarContent()}
          </TabsContent>

          <TabsContent value="team-view">
            {renderTeamView()}
          </TabsContent>

          <TabsContent value="upcoming">
            <div className="space-y-4">
              <div className="border rounded-md p-4 bg-amber-50">
                <h3 className="text-lg font-medium mb-2">Hoje</h3>
                {getSchedulesForDate(new Date()).length > 0 ? (
                  <div className="space-y-2">
                    {getSchedulesForDate(new Date()).map(schedule => (
                      <div
                        key={schedule.id}
                        className="border rounded-md p-3 bg-white hover:bg-gray-50 cursor-pointer"
                        onClick={() => onScheduleClick(schedule)}
                      >
                        <div className="flex justify-between">
                          <div className="font-medium">{schedule.title}</div>
                          <Badge
                            variant="outline"
                            className={
                              schedule.type === "installation" ? "bg-blue-100 text-blue-800 border-blue-200" :
                              schedule.type === "inspection" ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                              "bg-green-100 text-green-800 border-green-200"
                            }
                          >
                            {schedule.type === "installation" ? "Instalação" :
                             schedule.type === "inspection" ? "Inspeção" : "Manutenção"}
                          </Badge>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {format(parseISO(schedule.startDate), "HH:mm")} - {format(parseISO(schedule.endDate), "HH:mm")}
                          </div>
                          <div className="flex items-center mt-1">
                            <Building className="h-4 w-4 mr-1" />
                            {schedule.projectName}
                          </div>
                          <div className="flex items-center mt-1">
                            <Users className="h-4 w-4 mr-1" />
                            {schedule.teamName}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    Nenhum agendamento para hoje.
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Próximos 7 Dias</h3>
                <div className="space-y-2">
                  {getFilteredSchedules()
                    .filter(schedule => {
                      const scheduleDate = parseISO(schedule.startDate);
                      const today = new Date();
                      const nextWeek = new Date();
                      nextWeek.setDate(today.getDate() + 7);

                      return scheduleDate > today && scheduleDate <= nextWeek;
                    })
                    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
                    .map(schedule => (
                      <div
                        key={schedule.id}
                        className="border rounded-md p-3 hover:bg-gray-50 cursor-pointer"
                        onClick={() => onScheduleClick(schedule)}
                      >
                        <div className="flex justify-between">
                          <div className="font-medium">{schedule.title}</div>
                          <Badge
                            variant="outline"
                            className={
                              schedule.type === "installation" ? "bg-blue-100 text-blue-800 border-blue-200" :
                              schedule.type === "inspection" ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                              "bg-green-100 text-green-800 border-green-200"
                            }
                          >
                            {schedule.type === "installation" ? "Instalação" :
                             schedule.type === "inspection" ? "Inspeção" : "Manutenção"}
                          </Badge>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {format(parseISO(schedule.startDate), "EEEE, dd/MM", { locale: ptBR })}
                          </div>
                          <div className="flex items-center mt-1">
                            <Clock className="h-4 w-4 mr-1" />
                            {format(parseISO(schedule.startDate), "HH:mm")} - {format(parseISO(schedule.endDate), "HH:mm")}
                          </div>
                          <div className="flex items-center mt-1">
                            <Building className="h-4 w-4 mr-1" />
                            {schedule.projectName}
                          </div>
                          <div className="flex items-center mt-1">
                            <Users className="h-4 w-4 mr-1" />
                            {schedule.teamName}
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* Modal para adicionar novo agendamento */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Novo Agendamento</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título do Agendamento</Label>
              <Input
                id="title"
                value={newSchedule.title}
                onChange={(e) => setNewSchedule({...newSchedule, title: e.target.value})}
                placeholder="Ex: Instalação de Guias"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="type">Tipo</Label>
                <Select
                  value={newSchedule.type}
                  onValueChange={(value) => setNewSchedule({...newSchedule, type: value})}
                >
                  <SelectTrigger id="type">
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
                <Label htmlFor="project">Projeto</Label>
                <Select
                  value={newSchedule.projectId}
                  onValueChange={(value) => setNewSchedule({...newSchedule, projectId: value})}
                >
                  <SelectTrigger id="project">
                    <SelectValue placeholder="Selecione o projeto" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableProjects.filter(p => p.status !== "concluido").map(project => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="team">Equipe Responsável</Label>
              <Select
                value={newSchedule.teamId}
                onValueChange={(value) => setNewSchedule({...newSchedule, teamId: value})}
              >
                <SelectTrigger id="team">
                  <SelectValue placeholder="Selecione a equipe" />
                </SelectTrigger>
                <SelectContent>
                  {availableTeams.map(team => (
                    <SelectItem key={team.id} value={team.id}>
                      {team.name} ({team.country})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="start-date">Data e Hora de Início</Label>
                <Input
                  id="start-date"
                  type="datetime-local"
                  value={newSchedule.startDate}
                  onChange={(e) => setNewSchedule({...newSchedule, startDate: e.target.value})}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="end-date">Data e Hora de Término</Label>
                <Input
                  id="end-date"
                  type="datetime-local"
                  value={newSchedule.endDate}
                  onChange={(e) => setNewSchedule({...newSchedule, endDate: e.target.value})}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">Observações</Label>
              <Textarea
                id="notes"
                value={newSchedule.notes}
                onChange={(e) => setNewSchedule({...newSchedule, notes: e.target.value})}
                placeholder="Instruções adicionais, requisitos especiais, etc."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeAddModal}>Cancelar</Button>
            <Button className="bg-otis-500 hover:bg-otis-600" onClick={handleAddSchedule}>Criar Agendamento</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para detalhes do agendamento */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        {selectedSchedule && (
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{selectedSchedule.title}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex justify-between">
                <Badge
                  variant="outline"
                  className={
                    selectedSchedule.type === "installation" ? "bg-blue-100 text-blue-800 border-blue-200" :
                    selectedSchedule.type === "inspection" ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                    "bg-green-100 text-green-800 border-green-200"
                  }
                >
                  {selectedSchedule.type === "installation" ? "Instalação" :
                   selectedSchedule.type === "inspection" ? "Inspeção" : "Manutenção"}
                </Badge>
                <Badge
                  variant="outline"
                >
                  {selectedSchedule.status === "scheduled" ? "Agendado" :
                   selectedSchedule.status === "in-progress" ? "Em Andamento" :
                   selectedSchedule.status === "completed" ? "Concluído" : "Cancelado"}
                </Badge>
              </div>

              <div className="border rounded-md p-3 space-y-2">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="font-medium">Data:</span>
                  <span className="ml-2">
                    {format(parseISO(selectedSchedule.startDate), "dd/MM/yyyy", { locale: ptBR })}
                  </span>
                </div>

                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="font-medium">Horário:</span>
                  <span className="ml-2">
                    {format(parseISO(selectedSchedule.startDate), "HH:mm")} - {format(parseISO(selectedSchedule.endDate), "HH:mm")}
                  </span>
                </div>

                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="font-medium">Projeto:</span>
                  <span className="ml-2">{selectedSchedule.projectName}</span>
                </div>

                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="font-medium">Local:</span>
                  <span className="ml-2">{selectedSchedule.location}</span>
                </div>

                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="font-medium">Equipe:</span>
                  <span className="ml-2">{selectedSchedule.teamName}</span>
                </div>
              </div>

              {selectedSchedule.notes && (
                <div>
                  <Label className="text-sm text-muted-foreground">Observações</Label>
                  <div className="border rounded-md p-3">
                    {selectedSchedule.notes}
                  </div>
                </div>
              )}
            </div>
            <DialogFooter className="flex justify-between">
              <Button variant="destructive" onClick={() => handleDeleteSchedule(selectedSchedule.id)}>
                <Trash className="h-4 w-4 mr-2" />
                Excluir
              </Button>
              <div className="space-x-2">
                <Button variant="outline" onClick={closeDetailModal}>Fechar</Button>
                <Button className="bg-otis-500 hover:bg-otis-600">Editar</Button>
              </div>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </Card>
  );
};

// Para substituir o placeholder no Operations.tsx:
const ScheduleTab = () => {
  return (
    <Card>
      <CardContent className="p-0">
        <SchedulingCalendar />
      </CardContent>
    </Card>
  );
};

export default SchedulingCalendar;