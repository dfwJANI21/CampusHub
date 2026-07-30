import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CampusHub — Discover Your Campus Universe",
  description: "RSVP to events, join elite clubs, and post your own — all in one beautifully designed campus space.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body style={{ overflowX: "hidden", minHeight: "100vh" }}>
        {children}
      </body>
    </html>
  );
}
