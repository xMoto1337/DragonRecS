"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { galleryItems, GALLERY_CATEGORIES, type GalleryCategory } from "@/lib/gallery-data";

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("All");
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const filtered = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter((item) => item.categories.includes(activeCategory));

  const lightboxSlides = filtered.map((item) => ({ src: item.src, alt: item.alt }));

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
              Project Gallery
            </h1>
            <p style={{ color: "#888", fontSize: 18, maxWidth: 560 }}>
              Browse our completed projects — shade structures, pavillions, sports courts, and more.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section style={{ padding: "64px 0 96px", background: "#0a0a0a", minHeight: "60vh" }}>
        <div className="section-wrap">
          {/* Category Filters */}
          <FadeUp>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 48 }}>
              {GALLERY_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: "8px 20px",
                    borderRadius: 100,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    border: activeCategory === cat ? "1px solid #f0a500" : "1px solid #2a2a2a",
                    background: activeCategory === cat ? "rgba(240,165,0,0.15)" : "transparent",
                    color: activeCategory === cat ? "#f0a500" : "#888",
                  }}
                >
                  {cat}
                  <span style={{ marginLeft: 6, fontSize: 12, opacity: 0.7 }}>
                    ({cat === "All" ? galleryItems.length : galleryItems.filter(i => i.categories.includes(cat as GalleryCategory)).length})
                  </span>
                </button>
              ))}
            </div>
          </FadeUp>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: 20,
              }}
            >
              {filtered.map((item, i) => (
                <motion.div
                  key={item.src}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <button
                    onClick={() => setLightboxIndex(i)}
                    style={{
                      display: "block", width: "100%", background: "none",
                      border: "1px solid #2a2a2a", borderRadius: 12,
                      overflow: "hidden", cursor: "zoom-in", padding: 0,
                      textAlign: "left", transition: "border-color 0.2s, transform 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#f0a500";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#2a2a2a";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <div style={{ position: "relative", aspectRatio: "4/3" }}>
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)",
                      }} />
                      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px" }}>
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 6 }}>
                          {item.categories.map((cat) => (
                            <span key={cat} style={{
                              fontSize: 10, fontWeight: 700, textTransform: "uppercase",
                              letterSpacing: "0.07em", color: "#f0a500",
                              background: "rgba(240,165,0,0.15)", border: "1px solid rgba(240,165,0,0.3)",
                              borderRadius: 100, padding: "2px 8px",
                            }}>
                              {cat}
                            </span>
                          ))}
                        </div>
                        <div style={{ fontWeight: 700, color: "#f0f0f0", fontSize: 14 }}>{item.title}</div>
                        <div style={{ color: "#aaa", fontSize: 12, marginTop: 2 }}>{item.description}</div>
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "80px 0", color: "#555" }}>
              No projects in this category yet. Check back soon!
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "64px 0", background: "#080808", borderTop: "1px solid #1a1a1a" }}>
        <div className="section-wrap" style={{ textAlign: "center" }}>
          <FadeUp>
            <h2 style={{ fontSize: "clamp(22px, 3vw, 34px)", fontWeight: 800, color: "#f0f0f0", marginBottom: 12 }}>
              Like What You See?
            </h2>
            <p style={{ color: "#888", fontSize: 16, marginBottom: 28 }}>
              Send us your project details and we&apos;ll put together a free quote.
            </p>
            <Link href="/contact" className="btn-primary" style={{ fontSize: 15 }}>
              Request a Free Quote →
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={lightboxSlides}
        styles={{
          container: { backgroundColor: "rgba(0,0,0,0.95)" },
        }}
      />
    </>
  );
}
