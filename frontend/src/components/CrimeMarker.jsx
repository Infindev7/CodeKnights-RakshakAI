import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix for default Leaflet icons in React
import iconMarker from "leaflet/dist/images/marker-icon.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconRetinaUrl: iconRetina,
  iconUrl: iconMarker,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function CrimeMarker({ crime }) {
  // Simple logic to determine color/style could go here

  return (
    <Marker position={[crime.lat, crime.lng]}>
      <Popup className="crime-popup">
        <div style={{ minWidth: "150px" }}>
          <h4 style={{ margin: "0 0 5px 0", color: "#0f172a" }}>
            {crime.type}
          </h4>
          <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>
            {new Date(crime.date).toLocaleString()}
          </p>
          <p
            style={{
              margin: "5px 0 0 0",
              fontWeight: "bold",
              fontSize: "11px",
            }}
          >
            {crime.location || "Unknown Location"}
          </p>
        </div>
      </Popup>
    </Marker>
  );
}
