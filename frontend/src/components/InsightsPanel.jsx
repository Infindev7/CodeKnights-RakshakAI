import React from "react";
import { BarChart2, Zap, AlertTriangle } from "lucide-react";
import "../styles/components.css";

export default function InsightsPanel({ data }) {
  // Simple aggregations
  const total = data.length;

  // Calculate most common type
  const typeCounts = data.reduce((acc, curr) => {
    acc[curr.type] = (acc[curr.type] || 0) + 1;
    return acc;
  }, {});

  const mostCommon =
    Object.keys(typeCounts).length > 0
      ? Object.keys(typeCounts).reduce((a, b) =>
          typeCounts[a] > typeCounts[b] ? a : b,
        )
      : "N/A";

  return (
    <aside className="insights-panel">
      <div className="panel-header">
        <h3>
          <BarChart2 size={18} /> Situation Report
        </h3>
      </div>

      <div className="stat-card">
        <span className="stat-label">Total Incidents</span>
        <span className="stat-value">{total}</span>
        <span className="stat-sub">In selected range</span>
      </div>

      <div className="stat-card">
        <span className="stat-label">Top Category</span>
        <span className="stat-value warning">{mostCommon}</span>
        <span className="stat-sub">
          <AlertTriangle size={12} style={{ display: "inline" }} /> Requires
          attention
        </span>
      </div>

      <div className="stat-card">
        <span className="stat-label">Peak Time</span>
        <span className="stat-value">20:00 - 22:00</span>
      </div>

      <div className="panel-footer">
        <button className="btn-predict">
          <Zap size={16} /> Analyze & Predict
        </button>
      </div>
    </aside>
  );
}
