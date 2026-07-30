"use client";
import { useState } from "react";
import { X, Image as ImageIcon, DollarSign } from "lucide-react";
import { Event, Club } from "./data";

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "0.75rem 1rem", borderRadius: "0.75rem",
  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
  color: "white", fontSize: "0.95rem", fontFamily: "inherit", outline: "none",
};
const labelStyle: React.CSSProperties = { display: "block", color: "#adb5bd", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.35rem", textTransform: "uppercase", letterSpacing: "0.04em" };
const rowStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" };

type Props = {
  mode: "event" | "club";
  onClose: () => void;
  onAdd: (item: Event | Club) => void;
  currentEvents: number;
  currentClubs: number;
};

export function CreateModal({ mode, onClose, onAdd, currentEvents, currentClubs }: Props) {
  const [isPaid, setIsPaid] = useState(false);
  const [form, setForm] = useState<Record<string, string>>({});
  const [error, setError] = useState("");

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (mode === "event") {
      if (!form.title || !form.club || !form.host || !form.topic || !form.date || !form.time || !form.duration || !form.location || !form.room) {
        setError("Please fill all required fields."); return;
      }
      const newEvent: Event = {
        id: currentEvents + 10,
        title: form.title,
        club: form.club,
        date: form.date,
        time: form.time,
        duration: form.duration,
        location: form.location,
        room: form.room,
        host: form.host,
        topic: form.topic,
        description: form.description || "No description provided.",
        image: form.imageUrl || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
        tag: form.tag || "Academic",
        isPaid,
        price: isPaid ? Number(form.price) || 0 : undefined,
        rsvpd: false,
        attendeesCount: 0,
      };
      onAdd(newEvent);
    } else {
      if (!form.name || !form.category || !form.president || !form.description || !form.meetingSchedule) {
        setError("Please fill all required fields."); return;
      }
      const newClub: Club = {
        id: currentClubs + 10,
        name: form.name,
        category: form.category,
        members: 1,
        president: form.president,
        founded: new Date().getFullYear().toString(),
        description: form.description,
        meetingSchedule: form.meetingSchedule,
        image: form.imageUrl || "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
        requested: false,
        events: [],
      };
      onAdd(newClub);
    }
    onClose();
  };

  const tags = ["Technology", "Arts", "Academic", "Creative", "Business", "Engineering"];

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "linear-gradient(145deg,#0d0d1a 0%, #140826 100%)",
        border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1.5rem",
        width: "100%", maxWidth: "640px", maxHeight: "90vh", overflowY: "auto",
        boxShadow: "0 30px 80px rgba(157,78,221,0.4), 0 0 0 1px rgba(157,78,221,0.1)",
      }}>
        {/* Header */}
        <div style={{ padding: "1.75rem 2rem 1.25rem", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div className="text-gradient" style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.3rem" }}>
              {mode === "event" ? "📅 New Event" : "🎯 New Club"}
            </div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "white" }}>
              {mode === "event" ? "Post an Event" : "Create a Club"}
            </h2>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "50%", width: "38px", height: "38px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", cursor: "pointer" }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: "1.5rem 2rem 2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          {mode === "event" ? (
            <>
              <div>
                <label style={labelStyle}>Event Title *</label>
                <input style={inputStyle} placeholder="e.g. Neon Nights Hackathon" onChange={e => set("title", e.target.value)} />
              </div>
              <div style={rowStyle}>
                <div>
                  <label style={labelStyle}>Hosting Club *</label>
                  <input style={inputStyle} placeholder="Club name" onChange={e => set("club", e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Host / Speaker *</label>
                  <input style={inputStyle} placeholder="Prof. / Mr. / Ms." onChange={e => set("host", e.target.value)} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Topic *</label>
                <input style={inputStyle} placeholder="Main topic or theme" onChange={e => set("topic", e.target.value)} />
              </div>
              <div style={rowStyle}>
                <div>
                  <label style={labelStyle}>Date *</label>
                  <input style={inputStyle} type="date" onChange={e => set("date", new Date(e.target.value).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }))} />
                </div>
                <div>
                  <label style={labelStyle}>Time *</label>
                  <input style={inputStyle} type="time" onChange={e => { const [h, m] = e.target.value.split(":"); const d = new Date(); d.setHours(+h, +m); set("time", d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })); }} />
                </div>
              </div>
              <div style={rowStyle}>
                <div>
                  <label style={labelStyle}>Duration *</label>
                  <input style={inputStyle} placeholder="e.g. 2 Hours" onChange={e => set("duration", e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Category</label>
                  <select style={{ ...inputStyle, cursor: "pointer" }} onChange={e => set("tag", e.target.value)}>
                    {tags.map(t => <option key={t} value={t} style={{ background: "#0d0d1a" }}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div style={rowStyle}>
                <div>
                  <label style={labelStyle}>Venue *</label>
                  <input style={inputStyle} placeholder="Building / Block" onChange={e => set("location", e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Room / Hall *</label>
                  <input style={inputStyle} placeholder="e.g. Block C, Room 201" onChange={e => set("room", e.target.value)} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Description</label>
                <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} placeholder="Tell people what to expect..." onChange={e => set("description", e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Cover Image URL</label>
                <input style={inputStyle} placeholder="https://... (optional)" onChange={e => set("imageUrl", e.target.value)} />
              </div>
              {/* Paid toggle */}
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "1rem", padding: "1rem", border: "1px solid rgba(255,255,255,0.07)" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}>
                  <div
                    onClick={() => setIsPaid(p => !p)}
                    style={{ width: "44px", height: "24px", borderRadius: "9999px", background: isPaid ? "var(--primary)" : "rgba(255,255,255,0.1)", transition: "background 0.3s", position: "relative", cursor: "pointer", flexShrink: 0 }}
                  >
                    <div style={{ position: "absolute", top: "3px", left: isPaid ? "23px" : "3px", width: "18px", height: "18px", borderRadius: "50%", background: "white", transition: "left 0.3s" }} />
                  </div>
                  <div>
                    <div style={{ color: "white", fontWeight: 600 }}>Paid Event</div>
                    <div style={{ color: "#adb5bd", fontSize: "0.8rem" }}>Attendees will pay to RSVP</div>
                  </div>
                </label>
                {isPaid && (
                  <div style={{ marginTop: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ color: "#ffd60a", fontWeight: 700 }}>₹</span>
                    <input style={{ ...inputStyle, flex: 1 }} type="number" placeholder="Entry fee in INR" min={1} onChange={e => set("price", e.target.value)} />
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div>
                <label style={labelStyle}>Club Name *</label>
                <input style={inputStyle} placeholder="e.g. Robotics Alpha" onChange={e => set("name", e.target.value)} />
              </div>
              <div style={rowStyle}>
                <div>
                  <label style={labelStyle}>Category *</label>
                  <select style={{ ...inputStyle, cursor: "pointer" }} onChange={e => set("category", e.target.value)}>
                    {tags.map(t => <option key={t} value={t} style={{ background: "#0d0d1a" }}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>President / Lead *</label>
                  <input style={inputStyle} placeholder="Your name" onChange={e => set("president", e.target.value)} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Meeting Schedule *</label>
                <input style={inputStyle} placeholder="e.g. Every Saturday, 3 PM – Lab 201" onChange={e => set("meetingSchedule", e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Description *</label>
                <textarea style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }} placeholder="What does your club do? Who should join?" onChange={e => set("description", e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Club Cover Image URL</label>
                <input style={inputStyle} placeholder="https://... (optional)" onChange={e => set("imageUrl", e.target.value)} />
              </div>
            </>
          )}

          {error && <div style={{ background: "rgba(255,0,110,0.1)", border: "1px solid rgba(255,0,110,0.3)", borderRadius: "0.5rem", padding: "0.6rem 1rem", color: "#ff6b9d", fontSize: "0.875rem" }}>{error}</div>}

          <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
            <button type="button" onClick={onClose} className="btn btn-secondary" style={{ flex: 1 }}>Cancel</button>
            <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
              {mode === "event" ? "🚀 Post Event" : "🎯 Create Club"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
