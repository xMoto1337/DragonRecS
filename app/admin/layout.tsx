"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AdminAuthContext } from "@/lib/admin-auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState("");
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_token");
    if (saved) setToken(saved);
    setLoading(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/verify", {
      headers: { "x-admin-token": input },
    });
    if (res.ok) {
      sessionStorage.setItem("admin_token", input);
      setToken(input);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (loading) return null;

  if (!token) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0a0a" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ width: "100%", maxWidth: 400, padding: "0 20px" }}
        >
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 12, margin: "0 auto 16px",
              background: "linear-gradient(135deg, #c0392b, #f0a500)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 900, fontSize: 26, color: "white",
            }}>D</div>
            <h1 style={{ fontWeight: 800, fontSize: 22, color: "#f0f0f0" }}>Admin Panel</h1>
            <p style={{ color: "#888", fontSize: 14, marginTop: 4 }}>Dragon Recreation Services</p>
          </div>
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ display: "block", color: "#aaa", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Password</label>
              <input
                type="password"
                value={input}
                onChange={(e) => { setInput(e.target.value); setError(false); }}
                placeholder="Enter admin password"
                style={{
                  width: "100%", padding: "12px 16px",
                  background: "#1a1a1a",
                  border: `1px solid ${error ? "#c0392b" : "#2a2a2a"}`,
                  borderRadius: 8, color: "#f0f0f0", fontSize: 15, outline: "none",
                }}
                autoFocus
              />
              {error && <p style={{ color: "#e74c3c", fontSize: 13, marginTop: 6 }}>Incorrect password.</p>}
            </div>
            <button type="submit" className="btn-primary" style={{ justifyContent: "center", padding: "13px" }}>
              Sign In →
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <AdminAuthContext.Provider value={{ token }}>
      {children}
    </AdminAuthContext.Provider>
  );
}
