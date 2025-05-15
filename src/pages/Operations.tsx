
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, CheckSquare, ClipboardList, Clock, MapPin, Upload, User, Calendar as CalendarIcon } from 'lucide-react';
import ProjectMap from "@/components/maps/ProjectMap";
import SchedulingCalendar from './SchedulingCalendar';
import TeamManagement from './TeamManagement'; // ou ajuste o caminho conforme sua estrutura de pastas


// Mock data para instalações
const installations = [
  {
    id: "INST-BR-001",
    projectId: "BR-2023-001",
    name: "Torre Corporativa São Paulo",
    location: "São Paulo, Brasil",
    startDate: "2023-05-15",
    endDate: "2023-09-20",
    status: "em-andamento",
    progress: 65,
    team: "Equipe A",
    equipmentType: "Elevador de Alta Velocidade",
    nextMilestone: "Instalação de cabos",
    nextMilestoneDate: "2023-07-25",
    checklistPreInstallComplete: 85,
    checklistInstallComplete: 60,
    checklistCommissioningComplete: 10,
  },
  {
    id: "INST-MX-042",
    projectId: "MX-2023-042",
    name: "Plaza Central Ciudad de México",
    location: "Cidade do México, México",
    startDate: "2023-04-10",
    endDate: "2023-10-15",
    status: "em-andamento",
    progress: 45,
    team: "Equipe B",
    equipmentType: "Elevador Panorâmico",
    nextMilestone: "Montagem da cabine",
    nextMilestoneDate: "2023-07-18",
    checklistPreInstallComplete: 100,
    checklistInstallComplete: 45,
    checklistCommissioningComplete: 0,
  },
  {
    id: "INST-CL-007",
    projectId: "CL-2023-007",
    name: "Centro Costanera Santiago",
    location: "Santiago, Chile",
    startDate: "2022-12-05",
    endDate: "2023-04-20",
    status: "concluido",
    progress: 100,
    team: "Equipe C",
    equipmentType: "Escada Rolante",
    nextMilestone: "Entrega finalizada",
    nextMilestoneDate: "2023-04-20",
    checklistPreInstallComplete: 100,
    checklistInstallComplete: 100,
    checklistCommissioningComplete: 100,
  }
];

// Mock de checklists
const preInstallChecklist = [
  { id: 1, task: "Verificação do local de instalação", complete: true },
  { id: 2, task: "Confirmação das dimensões do poço", complete: true },
  { id: 3, task: "Verificação da energia elétrica", complete: true },
  { id: 4, task: "Preparação da área de armazenamento", complete: false },
  { id: 5, task: "Levantamento de requisitos de segurança", complete: true },
  { id: 6, task: "Confirmação da entrega de materiais", complete: false },
];

const installChecklist = [
  { id: 1, task: "Montagem da estrutura base", complete: true },
  { id: 2, task: "Instalação de guias", complete: true },
  { id: 3, task: "Instalação de cabos e polias", complete: false },
  { id: 4, task: "Montagem da cabine", complete: false },
  { id: 5, task: "Instalação de portas", complete: false },
  { id: 6, task: "Conexões elétricas básicas", complete: false },
];

const commissioningChecklist = [
  { id: 1, task: "Testes de carga", complete: false },
  { id: 2, task: "Testes de velocidade", complete: false },
  { id: 3, task: "Verificação de segurança", complete: false },
  { id: 4, task: "Calibração dos sensores", complete: false },
  { id: 5, task: "Treinamento da equipe do cliente", complete: false },
  { id: 6, task: "Entrega da documentação", complete: false },
];

// Componente principal de Operações de Campo
const Operations = () => {
  const [selectedTab, setSelectedTab] = useState("map");
  const [selectedInstallation, setSelectedInstallation] = useState(installations[0]);
  const [selectedChecklist, setSelectedChecklist] = useState("pre-install");
  
  // Função para selecionar uma instalação específica
  const handleSelectInstallation = (installation: typeof installations[0]) => {
    setSelectedInstallation(installation);
    setSelectedTab("details");
  };
  
  // Renderizar checklist apropriado
  const renderChecklist = () => {
    let checklist;
    let completePercentage;
    
    switch (selectedChecklist) {
      case "pre-install":
        checklist = preInstallChecklist;
        completePercentage = selectedInstallation.checklistPreInstallComplete;
        break;
      case "install":
        checklist = installChecklist;
        completePercentage = selectedInstallation.checklistInstallComplete;
        break;
      case "commissioning":
        checklist = commissioningChecklist;
        completePercentage = selectedInstallation.checklistCommissioningComplete;
        break;
      default:
        checklist = preInstallChecklist;
        completePercentage = selectedInstallation.checklistPreInstallComplete;
    }
    
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">
            {selectedChecklist === "pre-install" && "Checklist de Pré-Instalação"}
            {selectedChecklist === "install" && "Checklist de Instalação"}
            {selectedChecklist === "commissioning" && "Checklist de Comissionamento"}
          </h3>
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
            {completePercentage}% Concluído
          </Badge>
        </div>
        
        <div className="space-y-2">
          {checklist.map(item => (
            <div 
              key={item.id} 
              className={`flex items-center p-3 border rounded-md ${
                item.complete ? 'bg-green-50 border-green-200' : 'bg-card'
              }`}
            >
              <CheckSquare className={`h-5 w-5 mr-3 ${
                item.complete ? 'text-green-600' : 'text-muted-foreground'
              }`} />
              <span className={item.complete ? 'line-through text-muted-foreground' : ''}>
                {item.task}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Operações de Campo</h1>
        <p className="text-muted-foreground mt-1">
          Gerenciamento de instalações e equipes de campo da OTIS LATAM
        </p>
      </div>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full mb-6">
          <TabsTrigger value="map">
            <MapPin className="h-4 w-4 mr-2" />
            Mapa de Instalações
          </TabsTrigger>
          <TabsTrigger value="schedule">
            <Calendar className="h-4 w-4 mr-2" />
            Agendamento
          </TabsTrigger>
          <TabsTrigger value="teams">
            <User className="h-4 w-4 mr-2" />
            Equipes
          </TabsTrigger>
          <TabsTrigger value="details" disabled={!selectedInstallation}>
            <ClipboardList className="h-4 w-4 mr-2" />
            Detalhes da Instalação
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="map" className="mt-0 space-y-4">
          <ProjectMap height="500px" showFilters={true} />
          
          <Card>
            <CardHeader>
              <CardTitle>Instalações em Andamento</CardTitle>
              <CardDescription>
                Selecione uma instalação para ver detalhes e gerenciar checklists
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {installations.map(installation => (
                  <div
                    key={installation.id}
                    className="p-4 border rounded-md hover:bg-accent/50 cursor-pointer transition-colors"
                    onClick={() => handleSelectInstallation(installation)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{installation.name}</h3>
                        <p className="text-sm text-muted-foreground">{installation.location}</p>
                        <div className="flex items-center mt-1">
                          <Badge
                            variant="outline"
                            className={`${
                              installation.status === 'em-andamento' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                              installation.status === 'concluido' ? 'bg-green-100 text-green-800 border-green-200' :
                              'bg-yellow-100 text-yellow-800 border-yellow-200'
                            }`}
                          >
                            {installation.status === 'em-andamento' ? 'Em Andamento' : 
                             installation.status === 'concluido' ? 'Concluído' : 'Agendado'}
                          </Badge>
                          <span className="text-xs text-muted-foreground ml-3">
                            {installation.equipmentType}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Progresso: {installation.progress}%</p>
                        <div className="w-32 bg-muted rounded-full h-2 mt-1">
                          <div
                            className="bg-blue-500 h-full rounded-full"
                            style={{ width: `${installation.progress}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-end mt-2">
                          <Clock className="h-3 w-3 text-muted-foreground mr-1" />
                          <span className="text-xs text-muted-foreground">
                            Próxima etapa: {installation.nextMilestoneDate}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="schedule" className="mt-0">
          <SchedulingCalendar />
        </TabsContent>
        
        <TabsContent value="teams" className="mt-0">
          <TeamManagement />
        </TabsContent>
        
        <TabsContent value="details" className="mt-0">
          {selectedInstallation && (
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>{selectedInstallation.name}</CardTitle>
                  <CardDescription>
                    ID: {selectedInstallation.id} | Projeto: {selectedInstallation.projectId}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Detalhes da Instalação</h3>
                      <div className="space-y-2">
                        <p className="text-sm"><span className="font-medium">Local:</span> {selectedInstallation.location}</p>
                        <p className="text-sm"><span className="font-medium">Equipamento:</span> {selectedInstallation.equipmentType}</p>
                        <p className="text-sm"><span className="font-medium">Equipe Responsável:</span> {selectedInstallation.team}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Cronograma</h3>
                      <div className="space-y-2">
                        <p className="text-sm"><span className="font-medium">Início:</span> {selectedInstallation.startDate}</p>
                        <p className="text-sm"><span className="font-medium">Previsão de Término:</span> {selectedInstallation.endDate}</p>
                        <p className="text-sm"><span className="font-medium">Próximo Marco:</span> {selectedInstallation.nextMilestone} ({selectedInstallation.nextMilestoneDate})</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Progresso Geral</h3>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div
                        className="bg-blue-500 h-full rounded-full"
                        style={{ width: `${selectedInstallation.progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span>0%</span>
                      <span className="font-medium">{selectedInstallation.progress}%</span>
                      <span>100%</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">Evidências e Documentação</h3>
                    <div className="border-2 border-dashed border-muted rounded-md p-6 flex flex-col items-center justify-center">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">Arraste arquivos para upload ou clique para selecionar</p>
                      <Button size="sm">Upload de Arquivo</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Checklists</CardTitle>
                  <CardDescription>
                    Acompanhe o progresso dos checklists de instalação
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <Button 
                        variant={selectedChecklist === "pre-install" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedChecklist("pre-install")}
                      >
                        Pré-Instalação
                      </Button>
                      <Button 
                        variant={selectedChecklist === "install" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedChecklist("install")}
                      >
                        Instalação
                      </Button>
                      <Button 
                        variant={selectedChecklist === "commissioning" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedChecklist("commissioning")}
                      >
                        Comissionamento
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    {renderChecklist()}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Atualizar Checklist</Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Operations;
