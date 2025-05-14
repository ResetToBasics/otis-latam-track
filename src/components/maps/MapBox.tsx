
import React, { useEffect, useState } from 'react';
import Map, { Marker, Popup, NavigationControl, FullscreenControl, ScaleControl, GeolocateControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Layers, MapIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MapProject } from './ProjectMap';

interface MapBoxProps {
  projects: MapProject[];
  height?: string;
  onSelectProject?: (project: MapProject) => void;
  mapStyle?: 'map' | 'satellite';
  onToggleMapStyle?: () => void;
}

// Token temporário do Mapbox - em produção deve ser substituído pelo real
// Em um ambiente real, isso deve vir das variáveis de ambiente ou Supabase
const MAPBOX_TOKEN = 'USE_YOUR_MAPBOX_TOKEN';

const MapBox: React.FC<MapBoxProps> = ({ 
  projects, 
  height = '500px', 
  onSelectProject, 
  mapStyle = 'map',
  onToggleMapStyle 
}) => {
  const [viewState, setViewState] = useState({
    longitude: -70,
    latitude: -15,
    zoom: 2.5
  });
  const [popupInfo, setPopupInfo] = useState<MapProject | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

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

  // Renderização alternativa quando não há token válido
  if (!MAPBOX_TOKEN || MAPBOX_TOKEN === 'USE_YOUR_MAPBOX_TOKEN') {
    return (
      <div className="bg-muted/30 relative rounded-md" style={{ height, width: '100%' }}>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <MapIcon className="h-16 w-16 text-muted-foreground/50 mb-4" />
          <h3 className="text-xl font-medium mb-2">Visualização de Mapa</h3>
          <p className="text-sm text-muted-foreground text-center max-w-md mb-4">
            Para visualizar o mapa interativo, configure um token válido do Mapbox.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-full max-w-3xl mt-4">
            {projects.map(project => (
              <div 
                key={project.id}
                className="border rounded-md bg-card p-3 cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => onSelectProject ? onSelectProject(project) : setPopupInfo(project)}
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
  }

  return (
    <div style={{ height }} className="relative rounded-md overflow-hidden">
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle={mapStyle === 'map' ? 'mapbox://styles/mapbox/light-v11' : 'mapbox://styles/mapbox/satellite-streets-v12'}
        mapboxAccessToken={MAPBOX_TOKEN}
        onLoad={() => setIsMapLoaded(true)}
        className="rounded-md"
      >
        <GeolocateControl position="top-right" />
        <FullscreenControl position="top-right" />
        <NavigationControl position="top-right" />
        <ScaleControl />
        
        {projects.map(project => (
          <Marker
            key={project.id}
            longitude={project.coordinates[0]}
            latitude={project.coordinates[1]}
            anchor="bottom"
            onClick={e => {
              // Evitar que o evento se propague para o mapa
              e.originalEvent.stopPropagation();
              setPopupInfo(project);
              if (onSelectProject) {
                onSelectProject(project);
              }
            }}
          >
            <div className="animate-pulse">
              <MapPin 
                size={28} 
                className="cursor-pointer -mt-6"
                style={{ color: getMarkerColor(project.status) }} 
              />
            </div>
          </Marker>
        ))}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={popupInfo.coordinates[0]}
            latitude={popupInfo.coordinates[1]}
            onClose={() => setPopupInfo(null)}
            className="mapbox-popup"
            closeButton={false}
            closeOnClick={false}
            maxWidth="300px"
          >
            <Card className="border-0 shadow-none">
              <CardContent className="p-2">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-sm">{popupInfo.name}</h4>
                    <Badge 
                      variant="outline"
                      className={cn(
                        popupInfo.status === 'on-track' && "bg-green-100 text-green-800 border-green-200",
                        popupInfo.status === 'at-risk' && "bg-yellow-100 text-yellow-800 border-yellow-200",
                        popupInfo.status === 'delayed' && "bg-red-100 text-red-800 border-red-200",
                        popupInfo.status === 'completed' && "bg-blue-100 text-blue-800 border-blue-200"
                      )}
                    >
                      {popupInfo.status === 'on-track' ? 'No Prazo' :
                        popupInfo.status === 'at-risk' ? 'Em Risco' :
                        popupInfo.status === 'delayed' ? 'Atrasado' :
                        'Concluído'}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{popupInfo.location}</p>
                  <p className="text-xs">Cliente: {popupInfo.client}</p>
                  <div className="mt-1">
                    <p className="text-xs font-medium mb-1">Progresso: {popupInfo.progress}%</p>
                    <div className="w-full bg-muted rounded-full h-1">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          popupInfo.status === 'on-track' && "bg-green-500",
                          popupInfo.status === 'at-risk' && "bg-yellow-500",
                          popupInfo.status === 'delayed' && "bg-red-500",
                          popupInfo.status === 'completed' && "bg-blue-500"
                        )}
                        style={{ width: `${popupInfo.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2 w-full"
                    onClick={() => {
                      if (onSelectProject) {
                        onSelectProject(popupInfo);
                        setPopupInfo(null);
                      }
                    }}
                  >
                    Ver detalhes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Popup>
        )}
      </Map>

      {!isMapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <MapIcon className="h-10 w-10 text-muted-foreground animate-pulse" />
            <p className="text-sm text-muted-foreground mt-2">Carregando mapa...</p>
          </div>
        </div>
      )}
      
      {onToggleMapStyle && (
        <div className="absolute top-2 left-2 z-10">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onToggleMapStyle}
            className="bg-background/80 backdrop-blur-sm"
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
      )}
    </div>
  );
};

export default MapBox;
