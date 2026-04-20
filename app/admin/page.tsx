"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/admin-auth";

interface Inquiry {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  project_type: string;
  title: string;
  message: string;
  image_urls: string[];
  status: "unread" | "read" | "responded";
}

type Tab = "inquiries" | "settings";

const STATUS_COLORS: Record<string, { bg: string; color: string; label: string }> = {
  unread: { bg: "rgba(192,57,43,0.2)", color: "#e74c3c", label: "Unread" },
  read: { bg: "rgba(240,165,0,0.15)", color: "#f0a500", label: "Read" },
  responded: { bg: "rgba(39,174,96,0.2)", color: "#27ae60", label: "Responded" },
};

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_COLORS[status] || STATUS_COLORS.unread;
  return (
    <span style={{ background: s.bg, color: s.color, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 100, textTransform: "uppercase", letterSpacing: "0.07em" }}>
      {s.label}
    </span>
  );
}

export default function AdminPage() {
  const { token } = useAuth();
  const [tab, setTab] = useState<Tab>("inquiries");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  // Settings
  const [recipientEmails, setRecipientEmails] = useState("");
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [settingsLoading, setSettingsLoading] = useState(false);

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/inquiries", { headers: { "x-admin-token": token } });
    if (res.ok) setInquiries(await res.json());
    setLoading(false);
  }, [token]);

  const fetchSettings = useCallback(async () => {
    const res = await fetch("/api/admin/settings", { headers: { "x-admin-token": token } });
    if (res.ok) {
      const data: { key: string; value: string }[] = await res.json();
      const rec = data.find((s) => s.key === "recipient_emails");
      if (rec) setRecipientEmails(rec.value);
    }
  }, [token]);

  useEffect(() => {
    fetchInquiries();
    fetchSettings();
  }, [fetchInquiries, fetchSettings]);

  const deleteInquiry = async (id: string) => {
    if (!confirm("Delete this inquiry? This cannot be undone.")) return;
    await fetch("/api/admin/inquiries", {
      method: "DELETE",
      headers: { "x-admin-token": token, "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setInquiries((prev) => prev.filter((i) => i.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/inquiries/${id}`, {
      method: "PATCH",
      headers: { "x-admin-token": token, "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setInquiries((prev) => prev.map((i) => i.id === id ? { ...i, status: status as Inquiry["status"] } : i));
    if (selected?.id === id) setSelected((prev) => prev ? { ...prev, status: status as Inquiry["status"] } : null);
  };

  const saveSettings = async () => {
    setSettingsLoading(true);
    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "x-admin-token": token, "Content-Type": "application/json" },
      body: JSON.stringify({ key: "recipient_emails", value: recipientEmails }),
    });
    setSettingsLoading(false);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const unreadCount = inquiries.filter((i) => i.status === "unread").length;
  const thisMonth = inquiries.filter((i) => {
    const d = new Date(i.created_at);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  const formatDate = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });

  const signOut = () => { sessionStorage.removeItem("admin_token"); window.location.reload(); };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", paddingTop: 80 }}>
      {/* Header */}
      <div style={{ background: "#111", borderBottom: "1px solid #2a2a2a", padding: "16px 0" }}>
        <div className="section-wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontWeight: 800, fontSize: 20, color: "#f0f0f0" }}>Admin Dashboard</h1>
            <p style={{ color: "#888", fontSize: 13 }}>Dragon Recreation Services</p>
          </div>
          <button onClick={signOut} className="btn-outline" style={{ fontSize: 13, padding: "8px 16px" }}>Sign Out</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ background: "#0d0d0d", borderBottom: "1px solid #1a1a1a" }}>
        <div className="section-wrap" style={{ display: "flex", gap: 32, padding: "20px 0", flexWrap: "wrap" }}>
          {[
            { label: "Total Inquiries", value: inquiries.length, color: "#f0f0f0" },
            { label: "Unread", value: unreadCount, color: "#e74c3c" },
            { label: "This Month", value: thisMonth, color: "#f0a500" },
            { label: "Responded", value: inquiries.filter(i => i.status === "responded").length, color: "#27ae60" },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: 28, fontWeight: 900, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "#555", marginTop: 2, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="section-wrap" style={{ paddingTop: 32 }}>
        <div style={{ display: "flex", gap: 4, marginBottom: 28, borderBottom: "1px solid #1a1a1a", paddingBottom: 0 }}>
          {(["inquiries", "settings"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: "10px 20px", background: "none", border: "none", cursor: "pointer",
                fontSize: 14, fontWeight: 600,
                color: tab === t ? "#f0a500" : "#888",
                borderBottom: tab === t ? "2px solid #f0a500" : "2px solid transparent",
                textTransform: "capitalize",
                transition: "all 0.2s",
              }}
            >
              {t === "inquiries" ? `Inquiries${unreadCount > 0 ? ` (${unreadCount})` : ""}` : "Settings"}
            </button>
          ))}
        </div>

        {tab === "inquiries" && (
          <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 1fr" : "1fr", gap: 24 }}>
            {/* Table */}
            <div>
              {loading ? (
                <div style={{ color: "#555", padding: "40px 0", textAlign: "center" }}>Loading inquiries...</div>
              ) : inquiries.length === 0 ? (
                <div style={{ color: "#555", padding: "60px 0", textAlign: "center" }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>📬</div>
                  <p>No inquiries yet. They&apos;ll appear here when clients submit the contact form.</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {inquiries.map((inq) => (
                    <button
                      key={inq.id}
                      onClick={() => { setSelected(inq); if (inq.status === "unread") updateStatus(inq.id, "read"); }}
                      style={{
                        display: "block", width: "100%", background: selected?.id === inq.id ? "#1a1a1a" : "#111",
                        border: `1px solid ${selected?.id === inq.id ? "#f0a500" : inq.status === "unread" ? "#c0392b33" : "#2a2a2a"}`,
                        borderRadius: 10, padding: "14px 16px", cursor: "pointer", textAlign: "left",
                        transition: "all 0.15s",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                            {inq.status === "unread" && (
                              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#e74c3c", flexShrink: 0 }} />
                            )}
                            <span style={{ fontWeight: 700, color: "#f0f0f0", fontSize: 14, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {inq.title}
                            </span>
                          </div>
                          <div style={{ color: "#888", fontSize: 12 }}>
                            {inq.name} · {inq.email}
                            {inq.project_type && ` · ${inq.project_type}`}
                          </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
                          <StatusBadge status={inq.status} />
                          <span style={{ color: "#555", fontSize: 11 }}>{formatDate(inq.created_at)}</span>
                        </div>
                      </div>
                      {inq.image_urls?.length > 0 && (
                        <div style={{ marginTop: 6, color: "#666", fontSize: 11 }}>
                          📎 {inq.image_urls.length} photo{inq.image_urls.length > 1 ? "s" : ""}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Detail Panel */}
            <AnimatePresence>
              {selected && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.25 }}
                  style={{ background: "#111", border: "1px solid #2a2a2a", borderRadius: 12, padding: 24, height: "fit-content", position: "sticky", top: 90 }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                    <div>
                      <h2 style={{ fontWeight: 800, fontSize: 17, color: "#f0f0f0", marginBottom: 4 }}>{selected.title}</h2>
                      <StatusBadge status={selected.status} />
                    </div>
                    <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 20, padding: 4 }}>×</button>
                  </div>

                  <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 16 }}>
                    {[
                      ["Name", selected.name],
                      ["Email", selected.email],
                      ["Phone", selected.phone || "—"],
                      ["Project Type", selected.project_type],
                      ["Date", formatDate(selected.created_at)],
                    ].map(([k, v]) => (
                      <tr key={k}>
                        <td style={{ padding: "5px 0", color: "#666", fontSize: 12, width: 100 }}>{k}</td>
                        <td style={{ padding: "5px 0", color: "#ccc", fontSize: 13 }}>
                          {k === "Email" ? <a href={`mailto:${v}`} style={{ color: "#f0a500", textDecoration: "none" }}>{v}</a> : v}
                        </td>
                      </tr>
                    ))}
                  </table>

                  <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: 16, marginBottom: 16 }}>
                    <p style={{ color: "#666", fontSize: 12, marginBottom: 8 }}>Message</p>
                    <p style={{ color: "#ccc", fontSize: 13, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{selected.message}</p>
                  </div>

                  {selected.image_urls?.length > 0 && (
                    <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: 16, marginBottom: 20 }}>
                      <p style={{ color: "#666", fontSize: 12, marginBottom: 10 }}>Attached Photos ({selected.image_urls.length})</p>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {selected.image_urls.map((url, i) => (
                          <button
                            key={i}
                            onClick={() => setLightboxImg(url)}
                            style={{ background: "none", border: "1px solid #2a2a2a", borderRadius: 8, overflow: "hidden", cursor: "zoom-in", padding: 0 }}
                          >
                            <div style={{ position: "relative", width: 90, height: 68 }}>
                              <Image src={url} alt={`Photo ${i + 1}`} fill style={{ objectFit: "cover" }} />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Status controls */}
                  <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: 16 }}>
                    <p style={{ color: "#666", fontSize: 12, marginBottom: 10 }}>Update Status</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {(["unread", "read", "responded"] as const).map((s) => (
                        <button
                          key={s}
                          onClick={() => updateStatus(selected.id, s)}
                          style={{
                            padding: "6px 14px", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer",
                            border: selected.status === s ? `1px solid ${STATUS_COLORS[s].color}` : "1px solid #2a2a2a",
                            background: selected.status === s ? STATUS_COLORS[s].bg : "transparent",
                            color: selected.status === s ? STATUS_COLORS[s].color : "#888",
                            transition: "all 0.15s",
                          }}
                        >
                          {STATUS_COLORS[s].label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginTop: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <a href={`mailto:${selected.email}?subject=Re: ${selected.title}`} className="btn-primary" style={{ fontSize: 13, padding: "9px 18px" }}>
                      Reply via Email
                    </a>
                    <button
                      onClick={() => deleteInquiry(selected.id)}
                      style={{
                        padding: "9px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                        cursor: "pointer", border: "1px solid #c0392b44",
                        background: "rgba(192,57,43,0.12)", color: "#e74c3c",
                        transition: "all 0.15s",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = "rgba(192,57,43,0.25)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "rgba(192,57,43,0.12)")}
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {tab === "settings" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ maxWidth: 560 }}
          >
            <div className="card" style={{ padding: 28 }}>
              <h2 style={{ fontWeight: 700, fontSize: 17, color: "#f0f0f0", marginBottom: 6 }}>Notification Email Recipients</h2>
              <p style={{ color: "#888", fontSize: 13, marginBottom: 20, lineHeight: 1.5 }}>
                These email addresses will receive a notification whenever a new quote request is submitted. Separate multiple addresses with commas.
              </p>
              <textarea
                value={recipientEmails}
                onChange={(e) => setRecipientEmails(e.target.value)}
                rows={4}
                placeholder="owner@example.com, ops@example.com"
                style={{
                  width: "100%", padding: "12px 16px",
                  background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 8,
                  color: "#f0f0f0", fontSize: 14, outline: "none", resize: "vertical",
                  fontFamily: "monospace",
                }}
                onFocus={e => (e.target.style.borderColor = "#f0a500")}
                onBlur={e => (e.target.style.borderColor = "#2a2a2a")}
              />
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16 }}>
                <button
                  onClick={saveSettings}
                  disabled={settingsLoading}
                  className="btn-primary"
                  style={{ fontSize: 14 }}
                >
                  {settingsLoading ? "Saving..." : "Save Settings"}
                </button>
                {settingsSaved && (
                  <span style={{ color: "#27ae60", fontSize: 14, fontWeight: 600 }}>
                    ✓ Saved
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Image Lightbox */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImg(null)}
            style={{
              position: "fixed", inset: 0, zIndex: 1000,
              background: "rgba(0,0,0,0.95)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "zoom-out", padding: 20,
            }}
          >
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              style={{ position: "relative", maxWidth: "90vw", maxHeight: "85vh", width: "auto", height: "auto" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={lightboxImg} alt="Inquiry attachment" style={{ maxWidth: "90vw", maxHeight: "85vh", borderRadius: 10, objectFit: "contain" }} />
              <button
                onClick={() => setLightboxImg(null)}
                style={{
                  position: "absolute", top: -14, right: -14, width: 28, height: 28,
                  background: "#c0392b", border: "none", borderRadius: "50%",
                  color: "white", fontSize: 16, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >×</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ height: 80 }} />
    </div>
  );
}
