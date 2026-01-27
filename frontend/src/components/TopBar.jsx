import React from "react";
import { Shield, User, MapPin } from "lucide-react";
import "../styles/components.css";

export default function TopBar() {
  return (
    <header className="top-bar">
      <div className="brand">
        <Shield className="brand-icon" size={24} />
        <h1>SafeCity</h1>
      </div>

      <div className="city-selector">
        <MapPin size={16} />
        <span>Mumbai, MH</span>
      </div>

      <div className="user-profile">
        <span className="user-role">Officer ID: 4921</span>
        <div className="avatar">
          <User size={20} />
        </div>
      </div>
    </header>
  );
}
