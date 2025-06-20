import type { Space } from "../models/space";
import { Wifi, Monitor, Accessibility, Projector, Plug } from "lucide-react";

interface SpaceCardProps {
  space: Space;
}

export default function SpaceCard({ space }: SpaceCardProps) {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "1rem",
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        border: "1px solid #e5e7eb",
        maxWidth: "360px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <img
        src="https://www.eqtlab.com.br/quem_somos/timeline/2024/auditorio_eqt_lab.jpeg"
        alt="Ambiente"
        style={{ width: "100%", height: "180px", objectFit: "cover" }}
      />

      <div style={{ padding: "1rem" }}>
        <h2
          style={{
            fontSize: "1.1rem",
            fontWeight: "600",
            margin: "0.25rem 0",
            color: "#111827",
          }}
        >
          {space.name}
        </h2>

        {/* Local + Badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", marginBottom: "0.25rem" }}>
          <span style={{ fontWeight: "600", fontSize: "0.9rem" }}>Local:</span>
          <span
            style={{
              backgroundColor: "#2563eb",
              color: "#fff",
              padding: "2px 8px",
              borderRadius: "6px",
              fontSize: "0.8rem",
              fontWeight: 500,
            }}
          >
            {space.location}
          </span>
        </div>

        {/* Capacidade */}
        <div style={{ fontSize: "0.9rem", color: "#4b5563", marginBottom: "1rem" }}>
          <strong>Capacidade:</strong> {space.capacity} pessoas
        </div>

        <p
          style={{
            fontSize: "0.85rem",
            fontWeight: 600,
            marginBottom: "0.5rem",
            color: "#111827",
          }}
        >
          Recursos Disponíveis
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0.5rem",
            fontSize: "0.8rem",
            color: "#374151",
          }}
        >
          {renderResource(<Wifi size={16} />, "Wi-Fi")}
          {renderResource(<Monitor size={16} />, "Computadores")}
          {renderResource(<Accessibility size={16} />, "Acessível")}
          {renderResource(<Projector size={16} />, "Projetor")}
          {renderResource(<Plug size={16} />, "Tomadas")}
        </div>
      </div>
    </div>
  );
}

function renderResource(icon: React.ReactNode, label: string) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
      {icon}
      <span>{label}</span>
    </div>
  );
}
