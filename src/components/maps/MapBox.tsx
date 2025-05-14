import React, { useState } from 'react';
import ReactMapGL, { NavigationControl, Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Dados de exemplo (mantenha se já tiver)
const projectMarkers = [
  { id: 1, latitude: -23.5505, longitude: -46.6333, name: "São Paulo", projects: 5, status: "Em andamento" },
  { id: 2, latitude: -22.9068, longitude: -43.1729, name: "Rio de Janeiro", projects: 3, status: "No prazo" },
  // outros marcadores...
];

// Função para determinar a cor do marcador com base no status
const getMarkerColor = (status) => {
  switch (status) {
    case 'No prazo': return '#4CAF50';
    case 'Em risco': return '#FF9800';
    case 'Atrasado': return '#F44336';
    default: return '#2196F3';
  }
};

const MapBox = () => {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: 500,
    latitude: -15.7801,
    longitude: -47.9292,
    zoom: 3
  });

  const [selectedProject, setSelectedProject] = useState(null);

  // Use seu token real do Mapbox
  const MAPBOX_TOKEN = 'seu_token_do_mapbox_aqui';

  return (
    <div className="map-container">
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/light-v10"
        onViewportChange={nextViewport => setViewport(nextViewport)}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        {/* Controle de navegação */}
        <div style={{ position: 'absolute', right: 10, top: 10 }}>
          <NavigationControl />
        </div>

        {/* Marcadores */}
        {projectMarkers.map(project => (
          <Marker
            key={project.id}
            latitude={project.latitude}
            longitude={project.longitude}
            offsetLeft={-12}
            offsetTop={-24}
          >
            <div
              onClick={() => setSelectedProject(project)}
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                backgroundColor: getMarkerColor(project.status),
                border: '2px solid white',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '12px'
              }}
            >
              {project.projects}
            </div>
          </Marker>
        ))}

        {/* Popup */}
        {selectedProject && (
          <Popup
            latitude={selectedProject.latitude}
            longitude={selectedProject.longitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setSelectedProject(null)}
            anchor="bottom"
          >
            <div style={{ padding: '8px' }}>
              <h3 style={{ margin: '0 0 8px 0' }}>{selectedProject.name}</h3>
              <p style={{ margin: '4px 0' }}>
                <strong>Projetos:</strong> {selectedProject.projects}
              </p>
              <p style={{ margin: '4px 0' }}>
                <strong>Status:</strong>{' '}
                <span style={{ color: getMarkerColor(selectedProject.status) }}>
                  {selectedProject.status}
                </span>
              </p>
              <button
                onClick={() => {
                  console.log(`Ver detalhes de ${selectedProject.name}`);
                }}
                style={{
                  marginTop: '8px',
                  backgroundColor: '#1976D2',
                  color: 'white',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Ver Detalhes
              </button>
            </div>
          </Popup>
        )}
      </ReactMapGL>

      {/* Legenda do mapa */}
      <div className="map-legend" style={{
        backgroundColor: 'white',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '4px',
        boxShadow: '0 1px 5px rgba(0,0,0,0.2)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        {/* Conteúdo da legenda... */}
      </div>
    </div>
  );
};

export default MapBox;