"use client";
import { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { USERS, User } from "./data";

export function AuthModal({ onClose, onLogin }: { onClose: () => void; onLogin: (user: User) => void }) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (mode === "login") {
      const user = USERS.find(u => u.username === username && u.password === password);
      if (user) { onLogin(user); onClose(); }
      else setError("Invalid username or password.");
    } else {
      if (!name || !username || !password) { setError("All fields are required."); return; }
      if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
      const newUser: User = { username, password, name };
      USERS.push(newUser);
      onLogin(newUser);
      onClose();
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "0.85rem 1rem", borderRadius: "0.75rem",
    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
    color: "white", fontSize: "1rem", fontFamily: "inherit", outline: "none",
    transition: "border-color 0.2s"
  };
  const labelStyle: React.CSSProperties = { display: "block", color: "#adb5bd", fontSize: "0.85rem", fontWeight: 500, marginBottom: "0.4rem" };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "linear-gradient(145deg,#0f0f1a,#1a0a2e)", border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "1.5rem", width: "100%", maxWidth: "420px", padding: "2.5rem",
        boxShadow: "0 25px 60px rgba(157,78,221,0.35)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <div>
            <div className="text-gradient" style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "0.2rem" }}>CampusHub</div>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 700, color: "white" }}>{mode === "login" ? "Welcome back" : "Create Account"}</h2>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "50%", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", cursor: "pointer" }}>
            <X size={18} />
          </button>
        </div>

        {/* Toggle */}
        <div style={{ display: "flex", background: "rgba(255,255,255,0.05)", borderRadius: "9999px", padding: "4px", marginBottom: "1.5rem" }}>
          {(["login", "signup"] as const).map(m => (
            <button key={m} onClick={() => { setMode(m); setError(""); }} style={{ flex: 1, padding: "0.5rem", borderRadius: "9999px", fontWeight: 600, fontSize: "0.9rem", cursor: "pointer", border: "none", transition: "all 0.3s", background: mode === m ? "linear-gradient(135deg,var(--primary),#7b2cbf)" : "transparent", color: mode === m ? "white" : "#adb5bd", fontFamily: "inherit" }}>
              {m === "login" ? "Log In" : "Sign Up"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {mode === "signup" && (
            <div>
              <label style={labelStyle}>Full Name</label>
              <input style={inputStyle} placeholder="Your full name" value={name} onChange={e => setName(e.target.value)} />
            </div>
          )}
          <div>
            <label style={labelStyle}>Username</label>
            <input style={inputStyle} placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} autoComplete="username" />
          </div>
          <div>
            <label style={labelStyle}>Password</label>
            <div style={{ position: "relative" }}>
              <input style={{ ...inputStyle, paddingRight: "3rem" }} type={showPass ? "text" : "password"} placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#adb5bd", cursor: "pointer", display: "flex" }}>
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          {error && <div style={{ background: "rgba(255,0,110,0.1)", border: "1px solid rgba(255,0,110,0.3)", borderRadius: "0.5rem", padding: "0.6rem 1rem", color: "#ff6b9d", fontSize: "0.875rem" }}>{error}</div>}
          <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "0.5rem" }}>
            {mode === "login" ? "Log In" : "Create Account"}
          </button>
        </form>

        {mode === "login" && (
          <p style={{ textAlign: "center", color: "#adb5bd", fontSize: "0.8rem", marginTop: "1rem" }}>
            Demo: username <strong style={{ color: "white" }}>manoj</strong> / password <strong style={{ color: "white" }}>pass123</strong>
          </p>
        )}
      </div>
    </div>
  );
}
