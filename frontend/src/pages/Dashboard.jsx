import React from "react";
import TopBar from "../components/TopBar";

import MapView from "../components/MapView";
import InsightsPanel from "../components/InsightsPanel";
import useMapFilters from "../hooks/useMapFilters";
import useCrimeData from "../hooks/useCrimeData";

export default function Dashboard() {
  const { filters, toggles, updateFilter, updateToggle, resetFilters } =
    useMapFilters();
  const { crimes, loading } = useCrimeData(filters);

  return (
    <div className="dashboard-layout">
      <TopBar />
      <div className="main-content">
        <Sidebar
          filters={filters}
          toggles={toggles}
          onFilterChange={updateFilter}
          onToggleChange={updateToggle}
          onReset={resetFilters}
        />

        <div style={{ flex: 1, position: "relative" }}>
          {loading && <div className="loading-overlay">Loading Data...</div>}
          <MapView
            crimes={crimes}
            showHeatmap={toggles.showHeatmap}
            showHotspots={toggles.showHotspots}
          />
        </div>

        <InsightsPanel data={crimes} />
      </div>
    </div>
  );
}
