"use client";
import { X, Calendar, MapPin, Clock, User, BookOpen, DollarSign, CheckCircle2, Users } from "lucide-react";
import { Event } from "./data";

export function EventModal({ event, onClose, onRSVP }: { event: Event; onClose: () => void; onRSVP: (id: number) => void }) {
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem"
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "linear-gradient(145deg,#0f0f1a,#1a0a2e)",
        border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1.5rem",
        width: "100%", maxWidth: "680px", maxHeight: "90vh", overflowY: "auto",
        boxShadow: "0 25px 60px rgba(157,78,221,0.3)"
      }}>
        {/* Image */}
        <div style={{ position: "relative", height: "240px" }}>
          <img src={event.image} alt={event.title} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "1.5rem 1.5rem 0 0" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(15,15,26,1) 0%,transparent 60%)", borderRadius: "1.5rem 1.5rem 0 0" }} />
          <button onClick={onClose} style={{ position: "absolute", top: "1rem", right: "1rem", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "50%", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", cursor: "pointer" }}>
            <X size={18} />
          </button>
          <div style={{ position: "absolute", bottom: "1rem", left: "1.5rem", right: "1.5rem" }}>
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
              <span className="badge badge-secondary">{event.tag}</span>
              {event.isPaid && (
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", padding: "0.35rem 0.75rem", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: 700, background: "rgba(255,180,0,0.15)", color: "#ffd60a", border: "1px solid rgba(255,180,0,0.4)" }}>
                  <DollarSign size={12} /> PAID • ₹{event.price}
                </span>
              )}
            </div>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "white", lineHeight: 1.2 }}>{event.title}</h2>
          </div>
        </div>

        {/* Details */}
        <div style={{ padding: "1.5rem 2rem 2rem" }}>
          <p style={{ color: "#adb5bd", marginBottom: "1.5rem", lineHeight: 1.7 }}>{event.description}</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
            {[
              { icon: <User size={16} />, label: "Hosted by", value: event.host },
              { icon: <BookOpen size={16} />, label: "Topic", value: event.topic },
              { icon: <Calendar size={16} />, label: "Date", value: event.date },
              { icon: <Clock size={16} />, label: "Time", value: `${event.time} (${event.duration})` },
              { icon: <MapPin size={16} />, label: "Venue", value: event.location },
              { icon: <MapPin size={16} />, label: "Room", value: event.room },
            ].map((item, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: "0.75rem", padding: "0.75rem 1rem", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--primary)", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>
                  {item.icon} {item.label}
                </div>
                <div style={{ color: "white", fontWeight: 500, fontSize: "0.95rem" }}>{item.value}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
            <div style={{ color: "#adb5bd", fontSize: "0.9rem" }}>
              <Users size={16} style={{ display: "inline", marginRight: "0.4rem", color: "var(--primary)" }} />
              <strong style={{ color: "white" }}>{event.attendeesCount}</strong> people attending
            </div>
            <button
              onClick={() => onRSVP(event.id)}
              className={event.rsvpd ? "btn" : event.isPaid ? "btn btn-accent" : "btn btn-primary"}
              style={event.rsvpd ? { background: "rgba(157,78,221,0.15)", color: "#e0aaff", border: "1px solid rgba(157,78,221,0.3)" } : {}}
            >
              {event.rsvpd ? "✓ RSVP'd" : event.isPaid ? `Pay ₹${event.price} & RSVP` : "RSVP Now — It's Free"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
