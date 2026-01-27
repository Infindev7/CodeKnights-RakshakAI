import React from "react";
import { Filter, Clock, Map, Flame, RotateCcw } from "lucide-react";
import "../styles/components.css";

export default function Sidebar({
  filters,
  toggles,
  onFilterChange,
  onToggleChange,
  onReset,
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h3>
          <Filter size={16} /> Filter Data
        </h3>

        <div className="control-group">
          <label>Crime Type</label>
          <select
            value={filters.crimeType}
            onChange={(e) => onFilterChange("crimeType", e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Theft">Theft</option>
            <option value="Assault">Assault</option>
            <option value="Accident">Accident</option>
          </select>
        </div>

        <div className="control-group">
          <label>
            <Clock size={14} /> Time Range
          </label>
          <select
            value={filters.timeRange}
            onChange={(e) => onFilterChange("timeRange", e.target.value)}
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>
      </div>

      <div className="sidebar-separator" />

      <div className="sidebar-section">
        <h3>
          <Map size={16} /> Layers
        </h3>

        <div className="toggle-row">
          <label>
            <Flame size={14} /> Heatmap
          </label>
          <input
            type="checkbox"
            checked={toggles.showHeatmap}
            onChange={() => onToggleChange("showHeatmap")}
          />
        </div>

        <div className="toggle-row">
          <label>Show Hotspots</label>
          <input
            type="checkbox"
            checked={toggles.showHotspots}
            onChange={() => onToggleChange("showHotspots")}
          />
        </div>
      </div>

      <div className="sidebar-footer">
        <button className="btn-reset" onClick={onReset}>
          <RotateCcw size={14} /> Reset Filters
        </button>
      </div>
    </aside>
  );
}
