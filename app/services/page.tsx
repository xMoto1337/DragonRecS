"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
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

const services = [
  {
    id: "shade-structures",
    title: "Fabric Shade Structures",
    tagline: "Authorized installer of USA Shade & Fabric Structures products",
    description:
      "We are an authorized installer for USA Shade & Fabric Structures — one of the largest shade manufacturers in North America with over 300,000 structures installed since 1991. We don't manufacture the structures ourselves; we specialize in professional installation so you get a world-class product, properly engineered and correctly installed. Available systems include single-post, multi-post, cantilever, butterfly wings, hip style, pyramid, sail, and large tensioned architectural shade for any site.",
    features: [
      "Single-post, multi-post, hip, and cantilever styles",
      "Butterfly Wings, Mariner Peak, Arbor, and specialty designs",
      "HDPE mesh (up to 96% UV block) or waterproof PVC-coated fabric",
      "High-wind engineered — built for Florida conditions",
      "Wide selection of fabric colors",
      "Schools, parks, pools, courts, commercial & municipal",
    ],
    image: "/gallery/IMG_3224.jpg",
    imageAlt: "Single-post shade structures at school playground",
  },
  {
    id: "pavillions",
    title: "Pavillions",
    tagline: "Supply and installation — we handle it all",
    description:
      "We source and install quality pavilion structures to your specifications. Whether you need a small hexagon shelter for a park seating area or a large rectangular pavilion for community events, we manage the full project — from selecting the right structure to pouring the concrete pad and completing the install. We work with reputable suppliers to ensure lasting quality.",
    features: [
      "Hexagonal, rectangular, and custom shapes",
      "Metal roofing, shingle, and polycarbonate options",
      "Aluminum, steel, or wood construction",
      "Concrete pad preparation available",
      "ADA-compliant designs available",
      "Parks, schools, HOAs, and commercial properties",
    ],
    image: "/gallery/IMG_3223.jpg",
    imageAlt: "Hexagon pavilion supplied and installed",
  },
  {
    id: "sports-courts",
    title: "Sports Court Coatings",
    tagline: "Complete court buildouts — surface to shade",
    description:
      "From resurfacing an existing court to building a full outdoor facility from the ground up, we do it all. We handle surface prep, crack repair, full acrylic coating, custom color layouts, line striping, basketball hoop installation, and overhead shade structure installation. We've completed courts at charter schools, parks, and community centers across Florida.",
    features: [
      "Full-court acrylic resurfacing",
      "Crack repair and surface preparation",
      "Custom color combinations and layouts",
      "Basketball, pickleball, tennis, and multi-sport striping",
      "Basketball hoop and backboard installation",
      "Overhead shade structure installation over courts",
    ],
    image: "/gallery/IMG_3221.jpg",
    imageAlt: "Sports court coating and shade structure at charter school",
  },
  {
    id: "shade-replacement",
    title: "Shade Replacement",
    tagline: "New fabric, existing frame — like new again",
    description:
      "UV exposure, wind, and time will eventually wear out shade fabric — but that doesn't mean replacing the whole structure. We supply and install replacement fabric panels for virtually any existing shade system, including USA Shade products and other brands. We'll inspect the frame, source the right fabric, and have your shade looking and performing like new.",
    features: [
      "Compatible with USA Shade and most other brands",
      "HDPE mesh and PVC-coated waterproof fabric options",
      "Wide selection of replacement colors",
      "Frame inspection included",
      "Fast turnaround — fabric removal and reinstall",
      "Commercial, municipal, and residential",
    ],
    image: "/gallery/IMG_3217.jpg",
    imageAlt: "Large shade structure over sports courts",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Page Header */}
      <section style={{
        paddingTop: 140, paddingBottom: 64,
        background: "transparent",
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
              Our Services
            </h1>
            <p style={{ color: "#888", fontSize: 18, maxWidth: 560 }}>
              From fabric shade to full sports court installations — we handle your outdoor recreation project start to finish.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Sections */}
      {services.map((service, i) => (
        <section
          key={service.id}
          id={service.id}
          style={{
            padding: "96px 0",
            background: i % 2 === 0 ? "transparent" : "rgba(0,0,0,0.3)",
            borderBottom: "1px solid #1a1a1a",
          }}
        >
          <div className="section-wrap">
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 64,
              alignItems: "center",
              flexDirection: i % 2 === 0 ? "row" : "row-reverse",
            }}>
              {/* Text */}
              <FadeUp delay={0.1}>
                <div style={{ order: i % 2 === 0 ? 1 : 2 }}>
                  <div className="divider" />
                  <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, color: "#f0f0f0", marginBottom: 8 }}>
                    {service.title}
                  </h2>
                  <p style={{ color: "#f0a500", fontWeight: 600, fontSize: 15, marginBottom: 20 }}>
                    {service.tagline}
                  </p>
                  <p style={{ color: "#888", fontSize: 16, lineHeight: 1.7, marginBottom: 28 }}>
                    {service.description}
                  </p>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
                    {service.features.map((f) => (
                      <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, color: "#ccc", fontSize: 14 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#c0392b", flexShrink: 0 }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="btn-primary" style={{ fontSize: 14 }}>
                    Get a Quote for This →
                  </Link>
                </div>
              </FadeUp>

              {/* Image */}
              <FadeUp delay={0.25}>
                <div style={{ order: i % 2 === 0 ? 2 : 1, position: "relative", aspectRatio: "4/3", borderRadius: 16, overflow: "hidden", border: "1px solid #2a2a2a" }}>
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </FadeUp>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section style={{ padding: "80px 0", background: "#080808" }}>
        <div className="section-wrap" style={{ textAlign: "center" }}>
          <FadeUp>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 900, color: "#f0f0f0", marginBottom: 16 }}>
              Don&apos;t See Exactly What You Need?
            </h2>
            <p style={{ color: "#888", fontSize: 17, marginBottom: 32, maxWidth: 500, margin: "0 auto 32px" }}>
              We take on custom projects. Reach out with your idea and we&apos;ll work with you to make it happen.
            </p>
            <Link href="/contact" className="btn-gold" style={{ fontSize: 16, padding: "14px 32px" }}>
              Talk to Us About Your Project →
            </Link>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
