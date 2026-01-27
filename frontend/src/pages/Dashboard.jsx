import React, { useState, useMemo } from "react";
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import MapView from "../components/MapView";
import InsightsPanel from "../components/InsightsPanel";
import "../styles/layout.css";

// Mock data to ensure the UI works immediately without API
const MOCK_CRIMES = [
  {
    id: 1,
    type: "Theft",
    lat: 19.076,
    lng: 72.8777,
    date: "2023-10-25T14:30:00",
    location: "Bandra West",
  },
  {
    id: 2,
    type: "Assault",
    lat: 19.08,
    lng: 72.88,
    date: "2023-10-24T09:15:00",
    location: "Andheri East",
  },
  {
    id: 3,
    type: "Accident",
    lat: 19.07,
    lng: 72.86,
    date: "2023-10-26T18:45:00",
    location: "Dadar",
  },
  {
    id: 4,
    type: "Theft",
    lat: 19.085,
    lng: 72.89,
    date: "2023-10-25T20:00:00",
    location: "Kurla",
  },
];

export default function Dashboard() {
  // 1. Shared State
  const [filters, setFilters] = useState({
    crimeType: "All",
    timeRange: "24h",
  });

  const [toggles, setToggles] = useState({
    showHeatmap: false,
    showHotspots: true,
  });

  // 2. Handlers
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleToggleChange = (key) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // 3. Data Filtering Logic (Centralized here)
  const filteredCrimes = useMemo(() => {
    return MOCK_CRIMES.filter((crime) => {
      const matchType =
        filters.crimeType === "All" || crime.type === filters.crimeType;
      // Note: Time range logic is a placeholder for this mock
      return matchType;
    });
  }, [filters]);

  return (
    <div className="dashboard-layout">
      <TopBar />

      <div className="main-content">
        <Sidebar
          filters={filters}
          toggles={toggles}
          onFilterChange={handleFilterChange}
          onToggleChange={handleToggleChange}
          onReset={() => {
            setFilters({ crimeType: "All", timeRange: "24h" });
            setToggles({ showHeatmap: false, showHotspots: true });
          }}
        />

        <MapView
          crimes={filteredCrimes}
          showHeatmap={toggles.showHeatmap}
          showHotspots={toggles.showHotspots}
        />

        <InsightsPanel data={filteredCrimes} />
      </div>
    </div>
  );
}
