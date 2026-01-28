import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { formatDate, formatTime } from "../utils/formatters";

// Helper to get custom icon or default
const getIcon = (type) => {
  // Assuming images exist in public/map-icons/
  // Fallback to simple divIcon if image fails logic would go here
  return L.icon({
    iconUrl: `/map-icons/${type.toLowerCase()}.png`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
    // Fallback if image missing (uses Leaflet default)
    className: "custom-marker-icon",
  });
};

export default function CrimeMarker({ crime }) {
  // Safety check: if image loads fail, this might need a default generic icon
  const icon = getIcon(crime.type);

  return (
    <Marker position={[crime.lat, crime.lng]} icon={icon}>
      <Popup className="crime-popup">
        <div style={{ minWidth: "150px" }}>
          <h4 style={{ margin: "0 0 5px 0", color: "#0f172a" }}>
            {crime.type}
          </h4>
          <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>
            {formatDate(crime.date)} at {formatTime(crime.date)}
          </p>
          <div
            style={{ marginTop: "5px", fontSize: "11px", fontWeight: "bold" }}
          >
            {crime.location}
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
