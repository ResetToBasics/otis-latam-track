
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Loader2, Layers, Map as MapIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Tipos para os projetos exibidos no mapa
export interface MapProject {
  id: string;
  name: string;
  client: string;
  location: string;
  country: string;
  status: 'on-track' | 'at-risk' | 'delayed' | 'completed';
  progress: number;
  coordinates: [number, number]; // [longitude, latitude]
}

// Projetos de exemplo com coordenadas para demonstração
const sampleProjects: MapProject[] = [
  {
    id: "BR-2023-001",
    name: "Torre Corporativa São Paulo",
    client: "Grupo Empresarial Brasileiro",
    location: "São Paulo, Brasil",
    country: "Brasil",
    status: "on-track",
    progress: 75,
    coordinates: [-46.6333, -23.5505]
  },
  {
    id: "MX-2023-042",
    name: "Plaza Central Ciudad de México",
    client: "Inversiones Mexicanas S.A.",
    location: "Cidade do México, México",
    country: "México",
    status: "at-risk",
    progress: 45,
    coordinates: [-99.1332, 19.4326]
  },
  {
    id: "AR-2023-018",
    name: "Torre Libertador Buenos Aires",
    client: "Consorcio Argentino",
    location: "Buenos Aires, Argentina",
    country: "Argentina",
    status: "delayed",
    progress: 30,
    coordinates: [-58.3816, -34.6037]
  },
  {
    id: "CL-2023-007",
    name: "Centro Costanera Santiago",
    client: "Desarrollos Chilenos Ltda.",
    location: "Santiago, Chile",
    country: "Chile",
    status: "completed",
    progress: 100,
    coordinates: [-70.6693, -33.4489]
  },
  {
    id: "CO-2023-023",
    name: "Edificio Central Bogotá",
    client: "Constructora Colombiana",
    location: "Bogotá, Colômbia",
    country: "Colômbia",
    status: "on-track",
    progress: 60,
    coordinates: [-74.0721, 4.7110]
  },
  {
    id: "PE-2023-012",
    name: "Torre Miraflores Lima",
    client: "Inversiones Peruanas",
    location: "Lima, Peru",
    country: "Peru",
    status: "on-track",
    progress: 50,
    coordinates: [-77.0428, -12.0464]
  },
  {
    id: "BR-2023-002",
    name: "Centro Comercial Rio",
    client: "Rio Investimentos",
    location: "Rio de Janeiro, Brasil",
    country: "Brasil",
    status: "on-track",
    progress: 65,
    coordinates: [-43.1729, -22.9068]
  },
  {
    id: "MX-2023-043",
    name: "Torre Ejecutiva Monterrey",
    client: "Grupo Monterrey",
    location: "Monterrey, México",
    country: "México",
    status: "delayed",
    progress: 35,
    coordinates: [-100.3161, 25.6866]
  }
];

// Componente principal do mapa
const ProjectMap: React.FC<{
  height?: string;
  className?: string;
  showFilters?: boolean;
}> = ({ height = "500px", className, showFilters = true }) => {
  const [selectedProject, setSelectedProject] = useState<MapProject | null>(null);
  const [filteredProjects, setFilteredProjects] = useState<MapProject[]>(sampleProjects);
  const [mapStyle, setMapStyle] = useState<'map' | 'satellite'>('map');

  // Função para obter a cor do marcador baseado no status do projeto
  const getMarkerColor = (status: string): string => {
    switch (status) {
      case 'on-track':
        return '#22C55E'; // verde
      case 'at-risk':
        return '#F59E0B'; // amarelo
      case 'delayed':
        return '#EF4444'; // vermelho
      case 'completed':
        return '#3B82F6'; // azul
      default:
        return '#64748B'; // cinza
    }
  };

  // Tratar o filtro de projetos
  const handleFilterProjects = (filters: {
    country?: string;
    status?: string;
    period?: string;
  }) => {
    let filtered = [...sampleProjects];
    
    if (filters.country && filters.country !== 'all') {
      filtered = filtered.filter(project => 
        project.country === filters.country);
    }
    
    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(project => 
        project.status === filters.status);
    }
    
    setFilteredProjects(filtered);
  };

  // Alternar entre mapa normal e satélite
  const toggleMapStyle = () => {
    const newStyle = mapStyle === 'map' ? 'satellite' : 'map';
    setMapStyle(newStyle);
  };

  // Renderizar a visualização do mapa alternativa devido a problemas com o token
  const renderMapPlaceholder = () => {
    return (
      <div className="bg-muted/30 relative" style={{ height, width: '100%' }}>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <MapIcon className="h-16 w-16 text-muted-foreground/50 mb-4" />
          <h3 className="text-xl font-medium mb-2">Visualização de Mapa</h3>
          <p className="text-sm text-muted-foreground text-center max-w-md mb-4">
            Esta é uma visualização simulada do mapa. Em um ambiente de produção, 
            isso seria substituído por um mapa interativo com os marcadores de projetos.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-full max-w-3xl mt-4">
            {filteredProjects.map(project => (
              <div 
                key={project.id}
                className="border rounded-md bg-card p-3 cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => setSelectedProject(project)}
              >
                <div className="flex items-center mb-2">
                  <span 
                    className="h-3 w-3 rounded-full mr-2" 
                    style={{ backgroundColor: getMarkerColor(project.status) }}
                  ></span>
                  <span className="text-sm font-medium truncate">{project.name}</span>
                </div>
                <p className="text-xs text-muted-foreground">{project.location}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-semibold">Mapa de Projetos</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleMapStyle}
          >
            {mapStyle === 'map' ? (
              <>
                <Layers className="mr-2 h-4 w-4" />
                <span>Satélite</span>
              </>
            ) : (
              <>
                <MapIcon className="mr-2 h-4 w-4" />
                <span>Mapa</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="p-4 bg-muted/30">
          <p className="text-sm font-medium">Filtros</p>
          <p className="text-xs text-muted-foreground">
            Os filtros serão implementados em uma fase posterior.
          </p>
        </div>
      )}

      {/* Renderizar placeholder em vez do mapa real */}
      {renderMapPlaceholder()}

      {selectedProject && (
        <div className="p-4 border-t bg-muted/30">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">{selectedProject.name}</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSelectedProject(null)}
            >
              Fechar
            </Button>
          </div>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">ID:</span> {selectedProject.id}</p>
            <p><span className="font-medium">Cliente:</span> {selectedProject.client}</p>
            <p><span className="font-medium">Localização:</span> {selectedProject.location}</p>
            <p>
              <span className="font-medium">Status:</span> 
              <span 
                className={`ml-1 inline-block px-2 py-1 rounded-full text-xs ${
                  selectedProject.status === 'on-track' ? 'bg-green-100 text-green-800' :
                  selectedProject.status === 'at-risk' ? 'bg-yellow-100 text-yellow-800' :
                  selectedProject.status === 'delayed' ? 'bg-red-100 text-red-800' :
                  'bg-blue-100 text-blue-800'
                }`}
              >
                {selectedProject.status === 'on-track' ? 'No Prazo' :
                  selectedProject.status === 'at-risk' ? 'Em Risco' :
                  selectedProject.status === 'delayed' ? 'Atrasado' :
                  'Concluído'}
              </span>
            </p>
            <div>
              <p className="font-medium mb-1">Progresso:</p>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-full rounded-full ${
                    selectedProject.status === 'on-track' ? 'bg-green-500' :
                    selectedProject.status === 'at-risk' ? 'bg-yellow-500' :
                    selectedProject.status === 'delayed' ? 'bg-red-500' :
                    'bg-blue-500'
                  }`}
                  style={{ width: `${selectedProject.progress}%` }}
                />
              </div>
              <div className="text-xs text-right mt-1">
                {selectedProject.progress}%
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ProjectMap;
