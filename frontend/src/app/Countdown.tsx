"use client";
import { useEffect, useState } from "react";

type TimeLeft = { days: number; hours: number; mins: number; secs: number };

function getTimeLeft(targetDate: string): TimeLeft {
  const target = new Date(targetDate + " 2026").getTime();
  const diff = Math.max(0, target - Date.now());
  return {
    days:  Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    mins:  Math.floor((diff / (1000 * 60)) % 60),
    secs:  Math.floor((diff / 1000) % 60),
  };
}

export function Countdown({ date }: { date: string }) {
  const [isMounted, setIsMounted] = useState(false);
  const [t, setT] = useState<TimeLeft>({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    setIsMounted(true);
    setT(getTimeLeft(date));
    const id = setInterval(() => setT(getTimeLeft(date)), 1000);
    return () => clearInterval(id);
  }, [date]);

  if (!isMounted) return null;

  const box = (val: number, label: string) => (
    <div key={label} style={{ textAlign: "center", minWidth: "36px" }}>
      <div style={{
        background: "rgba(157,78,221,0.15)", border: "1px solid rgba(157,78,221,0.3)",
        borderRadius: "6px", padding: "3px 6px", fontSize: "0.82rem", fontWeight: 800,
        color: "#e0aaff", lineHeight: 1.2, fontFamily: "monospace",
      }}>
        {String(val).padStart(2, "0")}
      </div>
      <div style={{ fontSize: "0.55rem", color: "#6c757d", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: "2px" }}>{label}</div>
    </div>
  );

  return (
    <div style={{ display: "flex", gap: "4px", alignItems: "flex-start" }}>
      {box(t.days, "d")}
      <span style={{ color: "#6c757d", fontSize: "0.75rem", paddingTop: "4px" }}>:</span>
      {box(t.hours, "h")}
      <span style={{ color: "#6c757d", fontSize: "0.75rem", paddingTop: "4px" }}>:</span>
      {box(t.mins, "m")}
      <span style={{ color: "#6c757d", fontSize: "0.75rem", paddingTop: "4px" }}>:</span>
      {box(t.secs, "s")}
    </div>
  );
}
