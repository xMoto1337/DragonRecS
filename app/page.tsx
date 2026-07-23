"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const services = [
  {
    icon: "☂",
    title: "Fabric Shade Structures",
    desc: "Premium fabric shade structures — single-post, multi-post, cantilever, sail, and custom tensioned systems for any outdoor space.",
  },
  {
    icon: "⬡",
    title: "Pavillions",
    desc: "Supply and installation of hexagonal, rectangular, and custom pavilions. We source quality structures and handle the complete installation from footings to finish.",
  },
  {
    icon: "🏀",
    title: "Sports Court Coatings",
    desc: "Full-service court resurfacing — acrylic coatings, crack repair, line striping, basketball hoop installation, and complete court buildouts.",
  },
  {
    icon: "🔄",
    title: "Shade Replacement",
    desc: "Replacement fabric supply and installation for any existing shade structure — restore your system to like-new condition without replacing the whole frame.",
  },
];

const stats = [
  { value: "100+", label: "Projects Completed" },
  { value: "15+", label: "Years Experience" },
  { value: "100%", label: "Client Satisfaction" },
];

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        background: "transparent",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(240,165,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(240,165,0,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        <div className="section-wrap" style={{ paddingTop: 120, paddingBottom: 80, position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ maxWidth: 760 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(240,165,0,0.1)", border: "1px solid rgba(240,165,0,0.3)",
                borderRadius: 100, padding: "6px 16px", fontSize: 13, color: "#f0a500",
                fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase",
                marginBottom: 24,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#f0a500", display: "inline-block" }} />
              Florida&apos;s Most Trusted Installers
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 900, lineHeight: 1.08, marginBottom: 24, color: "#f0f0f0" }}
            >
              Built to Last.{" "}
              <span style={{ color: "#c0392b" }}>Designed</span>{" "}
              to Impress.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              style={{ fontSize: 20, color: "#888", lineHeight: 1.6, maxWidth: 580, marginBottom: 40 }}
            >
              Dragon Recreation Services is your trusted local installer for premium fabric shade structures — plus pavillions, sports court coatings, and more. We handle the full install so you get a world-class product, professionally done.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              style={{ display: "flex", gap: 16, flexWrap: "wrap" }}
            >
              <Link href="/contact" className="btn-primary" style={{ fontSize: 16, padding: "14px 28px" }}>
                Get a Free Quote →
              </Link>
              <Link href="/gallery" className="btn-outline" style={{ fontSize: 16, padding: "14px 28px" }}>
                View Our Work
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            style={{ display: "flex", gap: 40, marginTop: 80, flexWrap: "wrap" }}
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: 36, fontWeight: 900, color: "#f0a500" }}>{s.value}</div>
                <div style={{ fontSize: 14, color: "#888", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section style={{ padding: "100px 0", background: "transparent" }}>
        <div className="section-wrap">
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div className="divider" style={{ margin: "0 auto 16px" }} />
              <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, color: "#f0f0f0", marginBottom: 12 }}>
                What We Do
              </h2>
              <p style={{ color: "#888", fontSize: 17, maxWidth: 520, margin: "0 auto" }}>
                Complete outdoor structure and recreation solutions — from design to installation.
              </p>
            </div>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            {services.map((s, i) => (
              <FadeUp key={s.title} delay={i * 0.1}>
                <div className="card" style={{ padding: 32, height: "100%" }}>
                  <div style={{ fontSize: 40, marginBottom: 16 }}>{s.icon}</div>
                  <h3 style={{ fontWeight: 700, fontSize: 18, color: "#f0f0f0", marginBottom: 10 }}>{s.title}</h3>
                  <p style={{ color: "#888", fontSize: 14, lineHeight: 1.6 }}>{s.desc}</p>
                  <div style={{ marginTop: 20 }}>
                    <Link href="/services" style={{ color: "#f0a500", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
                      Learn more →
                    </Link>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{
        padding: "80px 0",
        background: "rgba(10,4,4,0.6)",
        borderTop: "1px solid #2a2a2a",
        borderBottom: "1px solid #2a2a2a",
      }}>
        <div className="section-wrap" style={{ textAlign: "center" }}>
          <FadeUp>
            <div style={{
              display: "inline-block", background: "rgba(192,57,43,0.15)",
              border: "1px solid rgba(192,57,43,0.3)", borderRadius: 100,
              padding: "6px 16px", fontSize: 12, color: "#c0392b", fontWeight: 700,
              letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20,
            }}>
              Free Estimates
            </div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, color: "#f0f0f0", marginBottom: 16 }}>
              Ready to Start Your Project?
            </h2>
            <p style={{ color: "#888", fontSize: 17, maxWidth: 500, margin: "0 auto 32px" }}>
              Send us your project details and photos — we&apos;ll get back to you with a free quote.
            </p>
            <Link href="/contact" className="btn-primary" style={{ fontSize: 16, padding: "16px 36px" }}>
              Request a Free Quote →
            </Link>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
