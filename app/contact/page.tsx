"use client";

import { useState, useCallback, Suspense } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const PROJECT_TYPES = [
  "Fabric Shade Structure",
  "Pavilion",
  "Sports Court Coating",
  "Shade Replacement",
  "Basketball Hoops",
  "Full Court Installation",
  "Custom / Other",
];

interface FilePreview {
  file: File;
  preview: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

function ContactForm() {
  const searchParams = useSearchParams();
  const productParam = searchParams.get("product") ?? "";
  const [files, setFiles] = useState<FilePreview[]>([]);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const onDrop = useCallback((accepted: File[]) => {
    const newFiles = accepted.slice(0, 5 - files.length).map((f) => ({
      file: f,
      preview: URL.createObjectURL(f),
    }));
    setFiles((prev) => [...prev, ...newFiles].slice(0, 5));
  }, [files.length]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp", ".heic"] },
    maxSize: 15 * 1024 * 1024,
    maxFiles: 5,
    disabled: files.length >= 5,
  });

  const removeFile = (index: number) => {
    setFiles((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData();
    data.append("name", (form.elements.namedItem("name") as HTMLInputElement).value);
    data.append("email", (form.elements.namedItem("email") as HTMLInputElement).value);
    data.append("phone", (form.elements.namedItem("phone") as HTMLInputElement).value);
    data.append("projectType", (form.elements.namedItem("projectType") as HTMLSelectElement).value);
    data.append("title", (form.elements.namedItem("title") as HTMLInputElement).value);
    data.append("message", (form.elements.namedItem("message") as HTMLTextAreaElement).value);
    files.forEach((f) => data.append("images", f.file));

    try {
      const res = await fetch("/api/contact", { method: "POST", body: data });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Something went wrong");
      }
      setStatus("success");
      form.reset();
      setFiles([]);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Submission failed. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0a0a", padding: "100px 20px" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", maxWidth: 500 }}
        >
          <div style={{ fontSize: 72, marginBottom: 24 }}>✓</div>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: "#f0f0f0", marginBottom: 12 }}>Message Sent!</h2>
          <p style={{ color: "#888", fontSize: 17, lineHeight: 1.6, marginBottom: 32 }}>
            Thank you for reaching out. We&apos;ve received your inquiry and will get back to you with a quote soon.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setStatus("idle")} className="btn-outline">
              Send Another
            </button>
            <Link href="/" className="btn-primary">Back to Home</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 16px",
    background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 8,
    color: "#f0f0f0", fontSize: 15, outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <>
      {/* Header */}
      <section style={{
        paddingTop: 140, paddingBottom: 64,
        background: "linear-gradient(135deg, #0a0a0a, #140808)",
        borderBottom: "1px solid #2a2a2a",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          width: 600, height: 300,
          background: "radial-gradient(ellipse, rgba(192,57,43,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div className="section-wrap" style={{ position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="divider" />
            <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, color: "#f0f0f0", marginBottom: 16 }}>
              Get a Free Quote
            </h1>
            <p style={{ color: "#888", fontSize: 18, maxWidth: 560 }}>
              Tell us about your project, attach some photos if you have them, and we&apos;ll get back to you with a detailed quote.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section style={{ padding: "80px 0", background: "#0a0a0a" }}>
        <div className="section-wrap">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 64, alignItems: "start" }}>

            {/* Form */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                {/* Name + Email */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label style={{ display: "block", color: "#aaa", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                      Full Name <span style={{ color: "#c0392b" }}>*</span>
                    </label>
                    <input
                      name="name" type="text" required
                      placeholder="John Smith"
                      style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = "#f0a500")}
                      onBlur={e => (e.target.style.borderColor = "#2a2a2a")}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", color: "#aaa", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                      Email Address <span style={{ color: "#c0392b" }}>*</span>
                    </label>
                    <input
                      name="email" type="email" required
                      placeholder="john@example.com"
                      style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = "#f0a500")}
                      onBlur={e => (e.target.style.borderColor = "#2a2a2a")}
                    />
                  </div>
                </div>

                {/* Phone + Project Type */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label style={{ display: "block", color: "#aaa", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                      Phone Number
                    </label>
                    <input
                      name="phone" type="tel"
                      placeholder="(555) 000-0000"
                      style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = "#f0a500")}
                      onBlur={e => (e.target.style.borderColor = "#2a2a2a")}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", color: "#aaa", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                      Project Type <span style={{ color: "#c0392b" }}>*</span>
                    </label>
                    <select
                      name="projectType" required
                      style={{ ...inputStyle, cursor: "pointer" }}
                      onFocus={e => (e.target.style.borderColor = "#f0a500")}
                      onBlur={e => (e.target.style.borderColor = "#2a2a2a")}
                    >
                      <option value="" style={{ background: "#1a1a1a" }}>Select a type...</option>
                      {PROJECT_TYPES.map((t) => (
                        <option key={t} value={t} style={{ background: "#1a1a1a" }}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label style={{ display: "block", color: "#aaa", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                    Subject / Project Title <span style={{ color: "#c0392b" }}>*</span>
                  </label>
                  <input
                    name="title" type="text" required
                    placeholder="e.g. Shade structure for community park"
                    defaultValue={productParam ? `Inquiry: ${productParam}` : ""}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = "#f0a500")}
                    onBlur={e => (e.target.style.borderColor = "#2a2a2a")}
                  />
                </div>

                {/* Message */}
                <div>
                  <label style={{ display: "block", color: "#aaa", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                    Project Details <span style={{ color: "#c0392b" }}>*</span>
                  </label>
                  <textarea
                    name="message" required rows={5}
                    placeholder="Describe your project — dimensions, location, timeline, any specific requirements..."
                    style={{ ...inputStyle, resize: "vertical", minHeight: 120 }}
                    onFocus={e => (e.target.style.borderColor = "#f0a500")}
                    onBlur={e => (e.target.style.borderColor = "#2a2a2a")}
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label style={{ display: "block", color: "#aaa", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                    Attach Photos <span style={{ color: "#888", fontWeight: 400 }}>(optional, up to 5)</span>
                  </label>
                  <div
                    {...getRootProps()}
                    style={{
                      border: `2px dashed ${isDragActive ? "#f0a500" : files.length >= 5 ? "#333" : "#2a2a2a"}`,
                      borderRadius: 10,
                      padding: "28px 20px",
                      textAlign: "center",
                      cursor: files.length >= 5 ? "not-allowed" : "pointer",
                      background: isDragActive ? "rgba(240,165,0,0.05)" : "#111",
                      transition: "all 0.2s",
                      opacity: files.length >= 5 ? 0.5 : 1,
                    }}
                  >
                    <input {...getInputProps()} />
                    <div style={{ fontSize: 32, marginBottom: 8 }}>📎</div>
                    <p style={{ color: "#888", fontSize: 14 }}>
                      {isDragActive ? "Drop images here..." : files.length >= 5 ? "Maximum 5 images reached" : "Drag & drop images here, or click to browse"}
                    </p>
                    <p style={{ color: "#555", fontSize: 12, marginTop: 4 }}>JPG, PNG, WEBP, HEIC — max 15MB each</p>
                  </div>

                  {/* Previews */}
                  {files.length > 0 && (
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
                      {files.map((f, i) => (
                        <div key={i} style={{ position: "relative", width: 80, height: 80, borderRadius: 8, overflow: "hidden", border: "1px solid #2a2a2a" }}>
                          <Image src={f.preview} alt={`Upload ${i + 1}`} fill style={{ objectFit: "cover" }} />
                          <button
                            type="button"
                            onClick={() => removeFile(i)}
                            style={{
                              position: "absolute", top: 2, right: 2,
                              width: 20, height: 20, borderRadius: "50%",
                              background: "rgba(0,0,0,0.8)", border: "none",
                              color: "white", fontSize: 12, cursor: "pointer",
                              display: "flex", alignItems: "center", justifyContent: "center",
                            }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Error */}
                {status === "error" && (
                  <div style={{ background: "rgba(192,57,43,0.15)", border: "1px solid rgba(192,57,43,0.4)", borderRadius: 8, padding: "12px 16px", color: "#e74c3c", fontSize: 14 }}>
                    {errorMsg}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn-primary"
                  style={{ fontSize: 16, padding: "14px 28px", width: "100%", justifyContent: "center", opacity: status === "submitting" ? 0.7 : 1 }}
                >
                  {status === "submitting" ? "Sending..." : "Send My Quote Request →"}
                </button>
              </form>
            </motion.div>

            {/* Sidebar info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              style={{ display: "flex", flexDirection: "column", gap: 24 }}
            >
              <div className="card" style={{ padding: 28 }}>
                <h3 style={{ fontWeight: 700, color: "#f0f0f0", fontSize: 18, marginBottom: 16 }}>What Happens Next?</h3>
                {[
                  { step: "1", text: "We review your inquiry and photos" },
                  { step: "2", text: "We may reach out for a quick call or site visit" },
                  { step: "3", text: "You receive a detailed quote via email" },
                  { step: "4", text: "We schedule and get to work!" },
                ].map((s) => (
                  <div key={s.step} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 14 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(192,57,43,0.2)", border: "1px solid rgba(192,57,43,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#c0392b", flexShrink: 0 }}>
                      {s.step}
                    </div>
                    <p style={{ color: "#aaa", fontSize: 14, paddingTop: 4 }}>{s.text}</p>
                  </div>
                ))}
              </div>

              <div className="card" style={{ padding: 28 }}>
                <h3 style={{ fontWeight: 700, color: "#f0f0f0", fontSize: 18, marginBottom: 16 }}>Contact Info</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <a href="tel:+1234567890" style={{ color: "#aaa", fontSize: 14, textDecoration: "none", display: "flex", gap: 10 }}>
                    <span style={{ color: "#f0a500" }}>&#9742;</span>
                    (000) 000-0000
                  </a>
                  <a href="mailto:info@dragonrecreation.com" style={{ color: "#aaa", fontSize: 14, textDecoration: "none", display: "flex", gap: 10 }}>
                    <span style={{ color: "#f0a500" }}>&#9993;</span>
                    info@dragonrecreation.com
                  </a>
                  <div style={{ color: "#aaa", fontSize: 14, display: "flex", gap: 10 }}>
                    <span style={{ color: "#f0a500" }}>&#128205;</span>
                    Florida &amp; Surrounding Areas
                  </div>
                </div>
              </div>

              <div className="card" style={{ padding: 28, background: "rgba(240,165,0,0.05)", borderColor: "rgba(240,165,0,0.2)" }}>
                <div style={{ color: "#f0a500", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Free Estimates</div>
                <p style={{ color: "#aaa", fontSize: 14, lineHeight: 1.6 }}>
                  All quotes are completely free with no obligation. We&apos;ll respond within 1–2 business days.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function ContactPage() {
  return (
    <Suspense>
      <ContactForm />
    </Suspense>
  );
}
