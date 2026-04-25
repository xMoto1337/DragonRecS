"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
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

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.3s ease",
        background: scrolled
          ? "rgba(10,10,10,0.95)"
          : "rgba(10,10,10,0.6)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid #2a2a2a" : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.5)" : "none",
      }}
    >
      <div className="section-wrap">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <div style={{
              width: 40, height: 40, borderRadius: 8,
              background: "linear-gradient(135deg, #c0392b, #f0a500)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 900, fontSize: 20, color: "white", flexShrink: 0,
            }}>
              D
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, color: "#f0f0f0", lineHeight: 1.1 }}>
                Dragon Recreation
              </div>
              <div style={{ fontSize: 11, color: "#f0a500", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Services
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: 4 }} className="hidden md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: "8px 16px",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "all 0.2s",
                  color: pathname === link.href ? "#f0a500" : "#f0f0f0",
                  background: pathname === link.href ? "rgba(240,165,0,0.1)" : "transparent",
                }}
              >
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
            style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}
            aria-label="Toggle menu"
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    display: "block",
                    width: 24,
                    height: 2,
                    background: "#f0f0f0",
                    borderRadius: 2,
                    transition: "all 0.3s",
                    transformOrigin: "center",
                    transform:
                      mobileOpen && i === 0
                        ? "rotate(45deg) translate(5px, 5px)"
                        : mobileOpen && i === 1
                        ? "scaleX(0)"
                        : mobileOpen && i === 2
                        ? "rotate(-45deg) translate(5px, -5px)"
                        : "none",
                    opacity: mobileOpen && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </div>
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
            style={{
              background: "rgba(10,10,10,0.98)",
              borderTop: "1px solid #2a2a2a",
              overflow: "hidden",
            }}
          >
            <div className="section-wrap" style={{ paddingTop: 16, paddingBottom: 24 }}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    display: "block",
                    padding: "12px 0",
                    fontSize: 16,
                    fontWeight: 500,
                    textDecoration: "none",
                    color: pathname === link.href ? "#f0a500" : "#f0f0f0",
                    borderBottom: "1px solid #1a1a1a",
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/contact" className="btn-primary" style={{ marginTop: 16, display: "inline-flex" }}>
                Get a Free Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
