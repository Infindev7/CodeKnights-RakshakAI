import React from "react";
import { MapContainer, TileLayer, Circle } from "react-leaflet";
import CrimeMarker from "./CrimeMarker";
import "leaflet/dist/leaflet.css";
import "../styles/map.css";

// Mumbai Coordinates
const CENTER = [19.076, 72.8777];

export default function MapView({ crimes, showHeatmap, showHotspots }) {
  return (
    <div className="map-wrapper">
      <MapContainer
        center={CENTER}
        zoom={12}
        scrollWheelZoom={true}
        className="leaflet-container"
      >
        {/* Professional, clean map tiles (CartoDB Voyager) */}
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {/* Render Markers */}
        {crimes.map((crime) => (
          <CrimeMarker key={crime.id} crime={crime} />
        ))}

        {/* Conditional Hotspots (Simulated with Circles) */}
        {showHotspots &&
          crimes.map((crime) => (
            <Circle
              key={`hotspot-${crime.id}`}
              center={[crime.lat, crime.lng]}
              pathOptions={{
                fillColor: "red",
                color: "red",
                opacity: 0.1,
                fillOpacity: 0.2,
              }}
              radius={500}
            />
          ))}

        {/* Heatmap Placeholder note: Real heatmap requires leaflet.heat plugin */}
        {showHeatmap && (
          <div className="map-overlay-msg">Heatmap Layer Active</div>
        )}
      </MapContainer>
    </div>
  );
}
