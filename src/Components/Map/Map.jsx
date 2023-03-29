import './Map.css';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
const Map = ({ prop1, prop2, prop3 }) => {
  return (
    <div className="map">
      {prop1 !== null && prop2 !== null ? (
        <MapContainer
          center={[prop1, prop2]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ width: '100%', height: 'calc(50vh - 4rem)' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[prop1, prop2]}>
            <Popup>
              <a
                href={`https://www.google.es/maps/place/${prop3}`}
                target="_blank"
                rel="noreferrer"
              >
                Acceso google Map
              </a>
            </Popup>
          </Marker>
        </MapContainer>
      ) : (
        <>
          <h2>Coordenadas no encontradas !!</h2>
          <h2>
            Pincha aquí para ir a{' '}
            <a className="google" href={`https://www.google.es/maps/place/${prop3}`}>
              Google Maps
            </a>
          </h2>
        </>
      )}
    </div>
  );
};

export default Map;
