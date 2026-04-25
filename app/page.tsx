"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";

const services = [
  {
    icon: "☂",
    title: "Fabric Shade Structures",
    desc: "Authorized installer of USA Shade & Fabric Structures products — single-post, multi-post, cantilever, sail, and custom tensioned systems for any outdoor space.",
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

type ShadeProduct = {
  name: string;
  category: string;
  desc: string;
  img: string;
  longDesc: string;
  coverage: string;
  posts: string;
  bestFor: string[];
  features: string[];
};

const usaShadeProducts: ShadeProduct[] = [
  // ── Specialty ──────────────────────────────────────────────────────────────
  {
    name: "Butterfly Wings-Up",
    category: "Specialty",
    desc: "Signature upswept dual-panel design for a dramatic modern look",
    img: "https://www.usa-shade.com/wp-content/uploads/2023/11/Butterfly-Wing-Up-1.png",
    longDesc: "The Butterfly Wings-Up features two fabric panels angled upward from the center post, creating a distinctive silhouette. The upswept design allows airflow underneath while providing shade, making it a popular choice for parks, plazas, and school campuses.",
    coverage: "250–450 sq ft",
    posts: "1 center post",
    bestFor: ["Parks & plazas", "School campuses", "Aquatic centers", "Commercial entries"],
    features: ["Upswept dual-panel butterfly shape", "Excellent air circulation underneath", "High visual impact design", "Powder-coated steel frame", "Available in multiple fabric colors"],
  },
  {
    name: "Butterfly Wings-Flat",
    category: "Specialty",
    desc: "Low-profile dual-panel butterfly — wide coverage, clean aesthetic",
    img: "https://www.usa-shade.com/wp-content/uploads/2023/11/Butterfly-Flat-1-scaled.jpeg",
    longDesc: "The Wings-Flat version of the Butterfly keeps both panels horizontal, maximizing overhead coverage and a clean, low-profile look. Ideal where you want broad shade coverage without the dramatic upswept silhouette.",
    coverage: "250–450 sq ft",
    posts: "1 center post",
    bestFor: ["Playgrounds", "Recreational areas", "Seating plazas", "Courts"],
    features: ["Flat dual-panel layout", "Maximized overhead coverage", "Lower visual profile than Wings-Up", "Single post foundation", "95%+ UV block fabric"],
  },
  {
    name: "Butterfly Wings-Down",
    category: "Specialty",
    desc: "Downswept butterfly panels — elegant canopy with rain-shedding shape",
    img: "https://www.usa-shade.com/wp-content/uploads/2023/11/item-81-teton-trails-park-butterfly.jpg",
    longDesc: "The Butterfly Wings-Down angles both panels downward from the center peak, naturally channeling rain to the outer edges while creating a sheltered, intimate feel beneath. A refined take on the butterfly design for park pavilions and gathering spaces.",
    coverage: "250–450 sq ft",
    posts: "1 center post",
    bestFor: ["Park pavilions", "Gathering areas", "Outdoor events", "Splash pad zones"],
    features: ["Downswept panels shed rain to edges", "Sheltered feel underneath", "Single center post", "HDPE UV-blocking fabric", "Multiple color options"],
  },
  {
    name: "Flower Petals-Up",
    category: "Specialty",
    desc: "Multi-petal upswept design — a true landmark shade structure",
    img: "https://www.usa-shade.com/wp-content/uploads/2023/11/item-84-happy-hollow-park-and-zoo-flower.jpg",
    longDesc: "The Flower Petals-Up is one of USA Shade's most iconic specialty structures. Multiple fabric panels radiate outward and upward from a single post like flower petals in bloom, creating a stunning visual centerpiece while delivering serious shade coverage.",
    coverage: "300–600 sq ft",
    posts: "1 center post",
    bestFor: ["Zoos & parks", "Themed venues", "Aquatic centers", "Statement installations"],
    features: ["Multi-petal radiating design", "Single post — minimal site disruption", "Iconic visual landmark", "Available in vibrant fabric colors", "Custom petal count options"],
  },
  {
    name: "Two Post Linksfield",
    category: "Specialty",
    desc: "Two-column specialty hip — ideal for walkways, courts, and large areas",
    img: "https://www.usa-shade.com/wp-content/uploads/2023/11/Two-Post-Linksfield-1.png",
    longDesc: "The Linksfield is a two-post hip shade delivering substantial rectangular coverage. Two widely spaced posts allow for long clear spans — great for covering walkways, bleacher areas, courts, and any space requiring a large unobstructed shade footprint.",
    coverage: "300–600 sq ft",
    posts: "2 posts",
    bestFor: ["Walkways & corridors", "Bleacher areas", "Sports courts", "Outdoor classrooms"],
    features: ["Wide-span two-post frame", "Hip-style canopy for water runoff", "Heavy-duty galvanized steel", "Multiple size configurations", "Can be linked in series for longer coverage"],
  },
  {
    name: "Two Post Standton",
    category: "Specialty",
    desc: "Sturdy two-post design delivering 300+ sq ft of covered shade",
    img: "https://www.usa-shade.com/wp-content/uploads/2023/11/Two-Post-Standton-1.png",
    longDesc: "The Standton is a classic two-post shade structure with a more compact footprint than the Linksfield. It's well-suited for recreational areas, picnic zones, and any site where a solid mid-size shade is needed without a large post spread.",
    coverage: "300–500 sq ft",
    posts: "2 posts",
    bestFor: ["Picnic areas", "Rec centers", "Splash pads", "Outdoor seating"],
    features: ["Compact two-post geometry", "Hip-style water-shedding canopy", "Powder-coated galvanized frame", "Durable HDPE shade fabric", "Available in various sizes"],
  },
  // ── Cantilever ─────────────────────────────────────────────────────────────
  {
    name: "Lifeguard",
    category: "Cantilever",
    desc: "Single-post cantilever umbrella for pools, playgrounds, and spot shading",
    img: "https://www.usa-shade.com/wp-content/uploads/2023/11/Lifeguard-1.png",
    longDesc: "The Lifeguard is a cantilever-style single-post shade ideal for lifeguard stands, pool decks, and playgrounds. The offset post keeps the entire shaded area clear of obstructions, making it perfect anywhere foot traffic needs to flow freely beneath.",
    coverage: "Up to ~150 sq ft",
    posts: "1 post",
    bestFor: ["Pool decks", "Lifeguard stands", "Playgrounds", "Seating areas"],
    features: ["Offset cantilever design — no center post", "Powder-coated galvanized steel frame", "High-density HDPE shade fabric (95% UV block)", "Easy anchor installation", "Multiple fabric color options"],
  },
  {
    name: "Coolbrella",
    category: "Cantilever",
    desc: "Classic single-post shade — versatile, cost-effective, and easy to install",
    img: "https://www.usa-shade.com/wp-content/uploads/2023/11/Coolbrella-1.png",
    longDesc: "The Coolbrella is USA Shade's most popular entry-level shade. A single center post supports a square or rectangular canopy — simple, clean, and effective. Great for smaller budgets without sacrificing quality or UV protection.",
    coverage: "100–200 sq ft",
    posts: "1 post",
    bestFor: ["Picnic tables", "Small seating areas", "Bus stops", "Residential patios"],
    features: ["Center-post design", "Square or rectangular canopy options", "Powder-coated steel frame", "95%+ UV block fabric", "Compact footprint for tight spaces"],
  },
  {
    name: "Cantilever Disc",
    category: "Cantilever",
    desc: "Circular cantilever canopy — bold round shape, no center post",
    img: "https://www.usa-shade.com/wp-content/uploads/2023/11/Cantilever-Disc-1.png",
    longDesc: "The Cantilever Disc delivers a striking circular shaded area on a single offset post. The round canopy extends over the space with no obstruction underneath — ideal for seating clusters, outdoor dining circles, or anywhere a distinct visual presence is desired.",
    coverage: "150–300 sq ft",
    posts: "1 offset post",
    bestFor: ["Outdoor dining", "Seating clusters", "Aquatic centers", "Plazas"],
    features: ["Circular disc-shaped canopy", "Single offset post — clear space beneath", "Strong architectural statement", "HDPE UV-blocking fabric", "Powder-coated steel frame"],
  },
  {
    name: "Hip T-Cantilever",
    category: "Cantilever",
    desc: "Two-post T-shaped cantilever — large clear zone, no posts in shade area",
    img: "https://www.usa-shade.com/wp-content/uploads/2023/11/Hip-T-Cantilever-1.png",
    longDesc: "The Hip T-Cantilever uses two posts set back behind the shaded zone, cantilevering a full hip canopy outward to leave the entire covered area post-free. Perfect for vehicle lanes, accessible seating, or spectator zones where obstructions cannot be tolerated.",
    coverage: "400–800 sq ft",
    posts: "2 offset posts",
    bestFor: ["Drive-thrus & vehicle areas", "Spectator seating", "ADA-accessible spaces", "Concession areas"],
    features: ["Fully cantilevered hip canopy", "Two-post offset frame", "Heavy-duty structural steel", "Maximum accessibility underneath", "Custom span sizes available"],
  },
  {
    name: "Eclipse",
    category: "Cantilever",
    desc: "Dramatic arch-cantilever — curved frame for bold commercial installations",
    img: "https://www.usa-shade.com/wp-content/uploads/2023/11/ontariosoccersportscomplex_eclipsejoinedcustompanoramajoined_hdpe_2_cc.jpg",
    longDesc: "The Eclipse features a curved arch frame that cantilevers the canopy dramatically over a space, evoking the silhouette of a solar eclipse. A bold choice for sports complexes, aquatic facilities, and high-visibility commercial applications where architectural presence matters.",
    coverage: "500–1,200 sq ft",
    posts: "Arch frame",
    bestFor: ["Sports complexes", "Aquatic facilities", "High-visibility venues", "Commercial entries"],
    features: ["Curved arch cantilever frame", "Dramatic solar-eclipse silhouette", "Engineered for large spans", "HDPE UV-blocking fabric", "Multiple joined configurations"],
  },
  // ── Sail ───────────────────────────────────────────────────────────────────
  {
    name: "3-Point Sail",
    category: "Sail",
    desc: "Tensioned triangular sail — architectural and eye-catching",
    img: "https://www.usa-shade.com/wp-content/uploads/2023/11/3-Point-Sail-1.png",
    longDesc: "The 3-Point Sail is a tensioned fabric structure anchored at three points, creating a clean triangular canopy with natural drainage and a contemporary architectural look. Multiple sails are often combined in overlapping patterns to cover larger areas with striking visual effect.",
    coverage: "100–300 sq ft per sail",
    posts: "3 anchor points",
    bestFor: ["Architectural applications", "Entryways & plazas", "Café / outdoor dining", "Residential patios"],
    features: ["Tensioned triangular fabric", "Natural drainage at corners", "No center posts", "Combines well with other sails", "Wide range of fabric colors"],
  },
  {
    name: "4-Point Hypar Sail",
    category: "Sail",
    desc: "Twisted hyperbolic sail — bold saddle shape, maximum visual impact",
    img: "https://www.usa-shade.com/wp-content/uploads/2023/11/4-Point-Hypar-Sail_V2_DesertSand_P.png",
    longDesc: "The 4-Point Hypar (hyperbolic paraboloid) Sail features a twisted geometric shape created by anchoring four corners at different heights. The result is a dramatic saddle-shaped canopy that is as much art installation as shade structure — without sacrificing UV protection.",
    coverage: "200–500 sq ft",
    posts: "4 anchor points",
    bestFor: ["Design-forward projects", "Plazas & public art spaces", "Resort pools", "School entrances"],
    features: ["Hyperbolic paraboloid geometry", "Each corner at different elevation", "Dramatic sculptural appearance", "Excellent drainage via saddle shape", "High-density HDPE fabric"],
  },
  {
    name: "5-Point Sail",
    category: "Sail",
    desc: "Five-anchor tensioned sail for expanded asymmetric coverage",
    img: "https://www.usa-shade.com/wp-content/uploads/2023/11/74718_tinmath-community-park_tinmath_co_2020_-1-scaled.jpg",
    longDesc: "The 5-Point Sail adds a fifth anchor point to create a larger, asymmetrically shaped tensioned canopy. This allows the sail to cover more area while maintaining the clean, lightweight look of a tensioned fabric structure — ideal for larger plazas and architectural applications.",
    coverage: "300–600 sq ft",
    posts: "5 anchor points",
    bestFor: ["Larger plazas", "Community parks", "Commercial outdoor areas", "Resort facilities"],
    features: ["Five-point tensioned geometry", "Larger coverage than 3 or 4-point", "Asymmetric shape options", "No center obstruction", "Stainless or powder-coated hardware"],
  },
  // ── Hip Structure ──────────────────────────────────────────────────────────
  {
    name: "Super Span Hip",
    category: "Hip Structure",
    desc: "Large-span multi-post hip — maximum rectangular coverage for big sites",
    img: "https://www.usa-shade.com/wp-content/uploads/2023/11/super-span-hip-7b.jpg",
    longDesc: "The Super Span Hip is USA Shade's heavy-duty multi-post rectangular structure, engineered for covering the largest outdoor areas — full basketball and tennis court covers, aquatic centers, large playgrounds, and commercial gathering spaces. Multiple post configurations scale to any footprint.",
    coverage: "1,000–3,000+ sq ft",
    posts: "Multi-post (4–8+)",
    bestFor: ["Full court covers", "Aquatic centers", "Large playgrounds", "Commercial campuses"],
    features: ["Multi-post engineered frame", "Massive coverage footprint", "Engineered for high wind zones (FL)", "Custom bay configurations", "Commercial / institutional grade"],
  },
  {
    name: "Custom Tensioned Structure",
    category: "Hip Structure",
    desc: "Fully engineered bespoke shade — any shape, any size, any application",
    img: "https://www.usa-shade.com/wp-content/uploads/2023/11/super-span-hip-7b.jpg",
    longDesc: "USA Shade's engineering team designs fully custom tensioned membrane structures for projects that go beyond standard catalog shapes. From complex multi-bay configurations to unique architectural forms, custom tensioned structures are engineered from the ground up to fit your exact site and vision.",
    coverage: "Any size",
    posts: "Custom",
    bestFor: ["Unique architectural projects", "Large commercial campuses", "Public infrastructure", "Any site that needs something beyond catalog"],
    features: ["Fully engineered to project specs", "Any shape or footprint", "Computer-modeled for wind/snow/load", "Premium tensioned membrane materials", "Turnkey design + install by Dragon Recreation"],
  },
];

const categoryColors: Record<string, string> = {
  "Specialty": "#f0a500",
  "Cantilever": "#c0392b",
  "Sail": "#2980b9",
  "Hip Structure": "#27ae60",
};

const categories = ["All", "Specialty", "Cantilever", "Sail", "Hip Structure"];

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

function ProductModal({ product, onClose }: { product: ShadeProduct; onClose: () => void }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const badgeColor = categoryColors[product.category] ?? "#888";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.82)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
        backdropFilter: "blur(6px)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#111",
          border: "1px solid #2a2a2a",
          borderRadius: 16,
          maxWidth: 780,
          width: "100%",
          maxHeight: "90vh",
          overflow: "auto",
          position: "relative",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 16, right: 16, zIndex: 10,
            background: "rgba(255,255,255,0.08)", border: "1px solid #333",
            borderRadius: 8, color: "#aaa", cursor: "pointer",
            width: 36, height: 36, display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 18, lineHeight: 1,
          }}
        >
          ×
        </button>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 0 }}>
          {/* Image side */}
          <div style={{
            position: "relative", background: "#1a1a1a",
            borderRadius: isMobile ? "16px 16px 0 0" : "16px 0 0 16px",
            minHeight: isMobile ? 220 : 320,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Image
              src={product.img}
              alt={product.name}
              fill
              style={{ objectFit: "contain", padding: 24 }}
              sizes="390px"
            />
          </div>

          {/* Info side */}
          <div style={{ padding: isMobile ? "20px 18px 24px" : "32px 28px 28px", overflow: "auto" }}>
            {/* Category badge */}
            <div style={{
              display: "inline-block",
              background: `${badgeColor}22`,
              border: `1px solid ${badgeColor}55`,
              borderRadius: 100, padding: "3px 12px",
              fontSize: 11, fontWeight: 700,
              color: badgeColor,
              letterSpacing: "0.08em", textTransform: "uppercase",
              marginBottom: 12,
            }}>
              {product.category}
            </div>

            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#f0f0f0", marginBottom: 8, lineHeight: 1.2, paddingRight: 40 }}>
              {product.name}
            </h2>

            <p style={{ color: "#999", fontSize: 14, lineHeight: 1.65, marginBottom: 20 }}>
              {product.longDesc}
            </p>

            {/* Specs row */}
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20,
            }}>
              <div style={{ background: "#1a1a1a", borderRadius: 8, padding: "10px 14px" }}>
                <div style={{ fontSize: 10, color: "#666", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 3 }}>Coverage</div>
                <div style={{ fontSize: 13, color: "#f0f0f0", fontWeight: 600 }}>{product.coverage}</div>
              </div>
              <div style={{ background: "#1a1a1a", borderRadius: 8, padding: "10px 14px" }}>
                <div style={{ fontSize: 10, color: "#666", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 3 }}>Posts / Anchors</div>
                <div style={{ fontSize: 13, color: "#f0f0f0", fontWeight: 600 }}>{product.posts}</div>
              </div>
            </div>

            {/* Best for */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: "#666", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>Best For</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {product.bestFor.map((b) => (
                  <span key={b} style={{
                    background: "rgba(240,165,0,0.1)", border: "1px solid rgba(240,165,0,0.2)",
                    borderRadius: 100, padding: "3px 10px", fontSize: 11, color: "#f0a500", fontWeight: 600,
                  }}>{b}</span>
                ))}
              </div>
            </div>

            {/* Features */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, color: "#666", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>Features</div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {product.features.map((f) => (
                  <li key={f} style={{
                    display: "flex", alignItems: "flex-start", gap: 8,
                    fontSize: 12, color: "#aaa", lineHeight: 1.5, marginBottom: 5,
                  }}>
                    <span style={{ color: "#c0392b", marginTop: 2, flexShrink: 0 }}>▸</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href={`/contact?product=${encodeURIComponent(product.name)}`}
              className="btn-primary"
              style={{ fontSize: 13, padding: "11px 20px", display: "inline-flex" }}
            >
              Get a Quote for This Structure →
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<ShadeProduct | null>(null);

  const filtered = activeCategory === "All"
    ? usaShadeProducts
    : usaShadeProducts.filter((p) => p.category === activeCategory);

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
              style={{ fontSize: "clamp(15px, 2.5vw, 20px)", color: "#888", lineHeight: 1.6, maxWidth: 580, marginBottom: 40 }}
            >
              Dragon Recreation Services is your authorized local installer for USA Shade &amp; Fabric Structures products — plus pavillions, sports court coatings, and more. We handle the full install so you get a world-class product, professionally done.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
            >
              <Link href="/contact" className="btn-primary" style={{ fontSize: 15, padding: "13px 24px" }}>
                Get a Free Quote →
              </Link>
              <Link href="/gallery" className="btn-outline" style={{ fontSize: 15, padding: "13px 24px" }}>
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

      {/* USA SHADE PRODUCT SHOWCASE */}
      <section style={{ padding: "80px 0", background: "rgba(0,0,0,0.4)" }}>
        <div className="section-wrap">
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <div className="divider" style={{ margin: "0 auto 16px" }} />
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 12,
                background: "rgba(192,57,43,0.12)", border: "1px solid rgba(192,57,43,0.3)",
                borderRadius: 100, padding: "5px 14px", fontSize: 12, color: "#c0392b", fontWeight: 700,
                letterSpacing: "0.08em", textTransform: "uppercase",
              }}>
                Authorized Installer
              </div>
              <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, color: "#f0f0f0", marginBottom: 12 }}>
                USA Shade &amp; Fabric Structures
              </h2>
              <p style={{ color: "#888", fontSize: 16, maxWidth: 580, margin: "0 auto" }}>
                We install the full line of USA Shade products — 300,000+ structures installed nationwide since 1991. Click any structure to learn more.
              </p>
            </div>
          </FadeUp>

          {/* Category filter tabs */}
          <FadeUp delay={0.1}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 36 }}>
              {categories.map((cat) => {
                const active = cat === activeCategory;
                const color = cat === "All" ? "#f0a500" : (categoryColors[cat] ?? "#888");
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      background: active ? `${color}22` : "rgba(255,255,255,0.04)",
                      border: `1px solid ${active ? color + "66" : "#2a2a2a"}`,
                      borderRadius: 100, padding: "6px 16px",
                      fontSize: 12, fontWeight: 700,
                      color: active ? color : "#666",
                      cursor: "pointer", transition: "all 0.2s",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 18 }}>
            {filtered.map((p, i) => {
              const badgeColor = categoryColors[p.category] ?? "#888";
              return (
                <FadeUp key={p.name} delay={i * 0.05}>
                  <motion.div
                    className="card"
                    style={{ overflow: "hidden", padding: 0, cursor: "pointer" }}
                    whileHover={{ y: -4, borderColor: "rgba(240,165,0,0.35)" }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setSelectedProduct(p)}
                  >
                    <div style={{ position: "relative", aspectRatio: "4/3", background: "#1a1a1a" }}>
                      <Image
                        src={p.img}
                        alt={p.name}
                        fill
                        style={{ objectFit: "contain", padding: 12 }}
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      {/* Category badge overlay */}
                      <div style={{
                        position: "absolute", top: 8, left: 8,
                        background: `${badgeColor}22`,
                        border: `1px solid ${badgeColor}55`,
                        borderRadius: 100, padding: "2px 8px",
                        fontSize: 10, fontWeight: 700,
                        color: badgeColor, letterSpacing: "0.07em",
                        textTransform: "uppercase",
                      }}>
                        {p.category}
                      </div>
                    </div>
                    <div style={{ padding: "12px 14px 14px" }}>
                      <div style={{ fontWeight: 700, color: "#f0f0f0", fontSize: 13, marginBottom: 4 }}>{p.name}</div>
                      <div style={{ color: "#777", fontSize: 11, lineHeight: 1.5, marginBottom: 8 }}>{p.desc}</div>
                      <div style={{ fontSize: 11, color: "#f0a500", fontWeight: 600 }}>View details →</div>
                    </div>
                  </motion.div>
                </FadeUp>
              );
            })}
          </div>

          <FadeUp delay={0.2}>
            <div style={{ textAlign: "center", marginTop: 40 }}>
              <p style={{ color: "#666", fontSize: 14, marginBottom: 16 }}>
                Don&apos;t see exactly what you need? USA Shade offers many more styles — contact us and we&apos;ll find the right fit.
              </p>
              <Link href="/contact" className="btn-gold" style={{ fontSize: 14 }}>
                Ask About a Product →
              </Link>
            </div>
          </FadeUp>
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

      {/* PRODUCT DETAIL MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
