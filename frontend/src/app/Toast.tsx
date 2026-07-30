"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";

export type Toast = { id: number; message: string; type: "success" | "info" | "error" };

let toastId = 0;
const listeners: Set<(t: Toast) => void> = new Set();

export function showToast(message: string, type: Toast["type"] = "success") {
  const t: Toast = { id: ++toastId, message, type };
  listeners.forEach(fn => fn(t));
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const add = (t: Toast) => {
      setToasts(prev => [...prev, t]);
      setTimeout(() => setToasts(prev => prev.filter(x => x.id !== t.id)), 3500);
    };
    listeners.add(add);
    return () => { listeners.delete(add); };
  }, []);

  const colorMap = {
    success: { bg: "rgba(0,255,110,0.1)",  border: "rgba(0,255,110,0.35)",  color: "#00ff6e",  icon: <CheckCircle2 size={18} /> },
    info:    { bg: "rgba(0,180,216,0.12)", border: "rgba(0,180,216,0.35)", color: "#90e0ef",  icon: "💡" },
    error:   { bg: "rgba(255,0,110,0.12)", border: "rgba(255,0,110,0.35)", color: "#ff6b9d",  icon: "⚠️" },
  };

  return (
    <div style={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 9999, display: "flex", flexDirection: "column", gap: "0.75rem", pointerEvents: "none" }}>
      <AnimatePresence>
        {toasts.map(t => {
          const c = colorMap[t.type];
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 80, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, scale: 0.9 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{
                pointerEvents: "all", display: "flex", alignItems: "center", gap: "0.75rem",
                padding: "0.85rem 1.25rem", borderRadius: "1rem", minWidth: "280px", maxWidth: "360px",
                background: c.bg, border: `1px solid ${c.border}`, color: c.color,
                backdropFilter: "blur(20px)", boxShadow: `0 8px 32px ${c.border}`,
                fontWeight: 600, fontSize: "0.9rem",
              }}
            >
              <span style={{ flexShrink: 0 }}>{c.icon}</span>
              <span style={{ flex: 1, color: "white" }}>{t.message}</span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
