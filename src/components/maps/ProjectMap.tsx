// ProjectMap.tsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import 'leaflet/dist/leaflet.css';

// Correção para os ícones do Leaflet
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Instalações mockadas com coordenadas
const mockInstallations = [
  {
    id: "INST-BR-001",
    name: "Torre Corporativa São Paulo",
    location: "São Paulo, Brasil",
    status: "em-andamento",
    progress: 65,
    equipmentType: "Elevador de Alta Velocidade",
    coordinates: [-23.5505, -46.6333] // Leaflet usa [lat, lng]
  },
  {
    id: "INST-MX-042",
    name: "Plaza Central Ciudad de México",
    location: "Cidade do México, México",
    status: "em-andamento",
    progress: 45,
    equipmentType: "Elevador Panorâmico",
    coordinates: [19.4326, -99.1332]
  },
  {
    id: "INST-CL-007",
    name: "Centro Costanera Santiago",
    location: "Santiago, Chile",
    status: "concluido",
    progress: 100,
    equipmentType: "Escada Rolante",
    coordinates: [-33.4489, -70.6693]
  }
];

// Centro do mapa - América Latina
const defaultCenter = [-15, -60];
const defaultZoom = 3;

const ProjectMap = ({ height = "500px", showFilters = false }) => {
  const [activeFilter, setActiveFilter] = useState("todos");
  const [map, setMap] = useState(null);

  // Corrigir o problema do ícone do Leaflet
  useEffect(() => {
    // Este código corrige o problema dos ícones do Leaflet
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconUrl,
      iconShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  }, []);

  // Filtrar instalações com base no filtro ativo
  const filteredInstallations = activeFilter === "todos"
    ? mockInstallations
    : mockInstallations.filter(installation => installation.status === activeFilter);

  // Função para criar divIcon personalizado
  const createCustomMarker = (status) => {
    const color = status === 'em-andamento'
      ? '#3b82f6'  // azul
      : status === 'concluido'
        ? '#22c55e'  // verde
        : '#eab308'; // amarelo

    return L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="
        background-color: ${color};
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 1px 3px rgba(0,0,0,0.4);
      "></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
      popupAnchor: [0, -10]
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className={showFilters ? "pb-2" : "pb-0"}>
        {showFilters && (
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <CardTitle>Mapa de Projetos</CardTitle>
            <div className="flex space-x-2">
              <Badge
                variant={activeFilter === "todos" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setActiveFilter("todos")}
              >
                Todos
              </Badge>
              <Badge
                variant={activeFilter === "em-andamento" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setActiveFilter("em-andamento")}
              >
                Em Andamento
              </Badge>
              <Badge
                variant={activeFilter === "concluido" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setActiveFilter("concluido")}
              >
                Concluídos
              </Badge>
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <div style={{ height }}>
          <MapContainer
            center={defaultCenter}
            zoom={defaultZoom}
            style={{ height: '100%', width: '100%', borderRadius: '0 0 8px 8px' }}
            whenCreated={setMap}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {filteredInstallations.map(installation => (
              <Marker
                key={installation.id}
                position={installation.coordinates}
                icon={createCustomMarker(installation.status)}
              >
                <Popup>
                  <div className="p-1">
                    <h3 className="font-medium text-sm">{installation.name}</h3>
                    <p className="text-xs text-muted-foreground">{installation.location}</p>
                    <div className="flex items-center mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        installation.status === 'em-andamento' ? 'bg-blue-100 text-blue-800' :
                        installation.status === 'concluido' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {installation.status === 'em-andamento' ? 'Em Andamento' :
                        installation.status === 'concluido' ? 'Concluído' : 'Agendado'}
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="text-xs mb-1">Progresso: {installation.progress}%</div>
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div
                          className={`h-full rounded-full ${
                            installation.status === 'concluido' ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${installation.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectMap;