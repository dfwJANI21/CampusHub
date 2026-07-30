"use client";
import { X, Users, Calendar, Clock, CheckCircle2 } from "lucide-react";
import { Club } from "./data";

export function ClubModal({ club, onClose, onToggle }: { club: Club; onClose: () => void; onToggle: (id: number) => void }) {
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem"
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "linear-gradient(145deg,#0f0f1a,#1a0a2e)",
        border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1.5rem",
        width: "100%", maxWidth: "600px", maxHeight: "90vh", overflowY: "auto",
        boxShadow: "0 25px 60px rgba(255,0,110,0.2)"
      }}>
        {/* Header */}
        <div style={{ position: "relative", padding: "2.5rem 2rem 1.5rem", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <button onClick={onClose} style={{ position: "absolute", top: "1rem", right: "1rem", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "50%", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", cursor: "pointer" }}>
            <X size={18} />
          </button>
          <div style={{ width: "110px", height: "110px", borderRadius: "50%", padding: "4px", background: "linear-gradient(135deg,var(--primary),var(--accent))", margin: "0 auto 1.5rem" }}>
            <img src={club.image} alt={club.name} style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", border: "4px solid #0f0f1a" }} />
          </div>
          <span className="badge badge-primary" style={{ marginBottom: "0.75rem" }}>{club.category}</span>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "white", marginBottom: "0.5rem" }}>{club.name}</h2>
          <p style={{ color: "#adb5bd", fontSize: "0.9rem" }}>Founded {club.founded} · Led by <strong style={{ color: "white" }}>{club.president}</strong></p>
        </div>

        {/* Body */}
        <div style={{ padding: "1.5rem 2rem 2rem" }}>
          <p style={{ color: "#adb5bd", lineHeight: 1.7, marginBottom: "1.5rem" }}>{club.description}</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "0.75rem", padding: "1rem", border: "1px solid rgba(255,255,255,0.07)", textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--primary)" }}>{club.members}</div>
              <div style={{ color: "#adb5bd", fontSize: "0.85rem" }}>Members</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "0.75rem", padding: "1rem", border: "1px solid rgba(255,255,255,0.07)", textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--accent)" }}>{club.events.length}</div>
              <div style={{ color: "#adb5bd", fontSize: "0.85rem" }}>Events Hosted</div>
            </div>
          </div>

          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "0.75rem", padding: "1rem", border: "1px solid rgba(255,255,255,0.07)", marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--secondary)", fontWeight: 600, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.4rem" }}>
              <Calendar size={14} /> Meeting Schedule
            </div>
            <div style={{ color: "white", fontWeight: 500 }}>{club.meetingSchedule}</div>
          </div>

          {club.events.length > 0 && (
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ color: "#adb5bd", fontSize: "0.85rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>Upcoming Events</div>
              {club.events.map((ev, i) => (
                <div key={i} style={{ background: "rgba(157,78,221,0.08)", borderRadius: "0.5rem", padding: "0.6rem 1rem", border: "1px solid rgba(157,78,221,0.2)", color: "#e0aaff", fontSize: "0.9rem", fontWeight: 500 }}>
                  🎯 {ev}
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => onToggle(club.id)}
            className={club.requested ? "btn" : "btn btn-accent"}
            style={club.requested
              ? { width: "100%", background: "rgba(0,255,110,0.1)", color: "#00ff6e", border: "1px solid rgba(0,255,110,0.3)" }
              : { width: "100%" }}
          >
            {club.requested ? <><CheckCircle2 size={18} /> Request Sent — Withdraw</> : "Send Join Request"}
          </button>
        </div>
      </div>
    </div>
  );
}
