"use client";

import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: "#080808", borderTop: "1px solid #1a1a1a", marginTop: "auto" }}>
      <div className="section-wrap" style={{ paddingTop: 64, paddingBottom: 32 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 48, marginBottom: 48 }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8,
                background: "linear-gradient(135deg, #c0392b, #f0a500)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 900, fontSize: 18, color: "white",
              }}>D</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 14, color: "#f0f0f0" }}>Dragon Recreation</div>
                <div style={{ fontSize: 10, color: "#f0a500", letterSpacing: "0.1em", textTransform: "uppercase" }}>Services</div>
              </div>
            </div>
            <p style={{ color: "#888", fontSize: 14, lineHeight: 1.6, maxWidth: 260 }}>
              Professional installation of shade structures, pavillions, sports court coatings, and more.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ color: "#f0a500", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>
              Services
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {["Fabric Shade Structures", "Pavillions", "Sports Court Coatings", "Shade Replacement", "Custom Projects"].map((s) => (
                <li key={s}>
                  <Link href="/services" style={{ color: "#888", fontSize: 14, textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#f0f0f0")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#888")}>
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: "#f0a500", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { href: "/", label: "Home" },
                { href: "/gallery", label: "Project Gallery" },
                { href: "/contact", label: "Request a Quote" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} style={{ color: "#888", fontSize: 14, textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#f0f0f0")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#888")}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: "#f0a500", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>
              Contact Us
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a href="tel:+1234567890" style={{ color: "#888", fontSize: 14, textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "#f0a500" }}>&#9742;</span> (000) 000-0000
              </a>
              <a href="mailto:info@dragonrecreation.com" style={{ color: "#888", fontSize: 14, textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "#f0a500" }}>&#9993;</span> info@dragonrecreation.com
              </a>
              <div style={{ color: "#888", fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "#f0a500" }}>&#128205;</span> Florida &amp; Surrounding Areas
              </div>
            </div>
            <Link href="/contact" className="btn-primary" style={{ marginTop: 20, fontSize: 13, padding: "10px 18px" }}>
              Get a Free Quote
            </Link>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: 24, display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ color: "#555", fontSize: 13 }}>
            &copy; {year} Dragon Recreation Services. All rights reserved.
          </p>
          <Link href="/admin" style={{ color: "#333", fontSize: 12, textDecoration: "none" }}>Admin</Link>
        </div>
      </div>
    </footer>
  );
}
