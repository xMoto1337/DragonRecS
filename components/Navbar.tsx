"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      transition: "all 0.3s ease",
      background: scrolled ? "rgba(10,10,10,0.97)" : "rgba(10,10,10,0.75)",
      backdropFilter: "blur(12px)",
      borderBottom: scrolled ? "1px solid #2a2a2a" : "1px solid transparent",
      boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.5)" : "none",
    }}>
      <div className="section-wrap">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 68, gap: 12 }}>

          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 8, flexShrink: 0,
              background: "linear-gradient(135deg, #c0392b, #f0a500)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 900, fontSize: 20, color: "white",
            }}>D</div>
            <div style={{ lineHeight: 1.15 }}>
              <div style={{ fontWeight: 800, fontSize: 15, color: "#f0f0f0", whiteSpace: "nowrap" }}>
                Dragon Recreation
              </div>
              <div style={{ fontSize: 10, color: "#f0a500", letterSpacing: "0.1em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                Services
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex" style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {navLinks.filter(l => l.href !== "/contact").map((link) => (
              <Link key={link.href} href={link.href} style={{
                padding: "8px 14px", borderRadius: 8, fontSize: 14, fontWeight: 500,
                textDecoration: "none", transition: "all 0.2s",
                color: pathname === link.href ? "#f0a500" : "#f0f0f0",
                background: pathname === link.href ? "rgba(240,165,0,0.1)" : "transparent",
              }}>
                {link.label}
              </Link>
            ))}
            <Link href="/contact" className="btn-primary" style={{ marginLeft: 8, padding: "10px 20px", fontSize: 14 }}>
              Get a Quote
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: mobileOpen ? "rgba(192,57,43,0.15)" : "rgba(255,255,255,0.06)",
              border: `1px solid ${mobileOpen ? "#c0392b55" : "#2a2a2a"}`,
              borderRadius: 8, cursor: "pointer",
              width: 44, height: 44, flexShrink: 0,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 5,
              transition: "all 0.2s",
            }}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span key={i} style={{
                display: "block", width: 20, height: 2,
                background: mobileOpen ? "#c0392b" : "#f0f0f0",
                borderRadius: 2, transition: "all 0.3s", transformOrigin: "center",
                transform:
                  mobileOpen && i === 0 ? "rotate(45deg) translate(5px, 5px)" :
                  mobileOpen && i === 2 ? "rotate(-45deg) translate(5px, -5px)" : "none",
                opacity: mobileOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{ background: "#0a0a0a", borderTop: "1px solid #2a2a2a", overflow: "hidden" }}
          >
            <div className="section-wrap" style={{ paddingTop: 8, paddingBottom: 24 }}>
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} style={{
                  display: "flex", alignItems: "center", padding: "14px 0",
                  fontSize: 17, fontWeight: 600, textDecoration: "none",
                  color: pathname === link.href ? "#f0a500" : "#f0f0f0",
                  borderBottom: "1px solid #1a1a1a",
                  transition: "color 0.2s",
                }}>
                  {link.label}
                  {pathname === link.href && (
                    <span style={{ marginLeft: 8, width: 6, height: 6, borderRadius: "50%", background: "#f0a500", display: "inline-block" }} />
                  )}
                </Link>
              ))}
              <Link href="/contact" className="btn-primary" style={{
                marginTop: 20, display: "flex", justifyContent: "center",
                fontSize: 16, padding: "14px 20px", width: "100%",
              }}>
                Get a Free Quote →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
