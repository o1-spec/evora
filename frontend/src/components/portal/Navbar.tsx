"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Menu, X } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

export default function Navbar() {
  const { user } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid hsl(var(--border))",
      }}
    >
      <div
        style={{
          height: "auto",
          minHeight: "4.5rem",
          padding: "1rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1280px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Brand Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              backgroundColor: "hsl(var(--primary))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Globe size={18} color="white" />
          </div>
          <span
            style={{
              fontFamily: "Outfit, sans-serif",
              fontWeight: 800,
              fontSize: "1.35rem",
              color: "hsl(var(--text-primary))",
            }}
          >
            Évora
          </span>
        </Link>

        {/* Center Navigation Links (Desktop) */}
        <nav
          style={{ gap: "1.75rem", alignItems: "center" }}
          className="hidden lg:flex"
        >
          <Link
            href="/"
            style={{
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "hsl(var(--text-primary))",
              textDecoration: "none",
            }}
          >
            Accueil
          </Link>
          <Link
            href="#skills"
            style={{
              fontSize: "0.9rem",
              fontWeight: 500,
              color: "hsl(var(--text-secondary))",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = "hsl(var(--primary))")}
            onMouseOut={(e) => (e.currentTarget.style.color = "hsl(var(--text-secondary))")}
          >
            Épreuves TCF
          </Link>
          <Link
            href="#academy"
            style={{
              fontSize: "0.9rem",
              fontWeight: 500,
              color: "hsl(var(--text-secondary))",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = "hsl(var(--primary))")}
            onMouseOut={(e) => (e.currentTarget.style.color = "hsl(var(--text-secondary))")}
          >
            Formations
          </Link>
          <Link
            href="#pricing"
            style={{
              fontSize: "0.9rem",
              fontWeight: 500,
              color: "hsl(var(--text-secondary))",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = "hsl(var(--primary))")}
            onMouseOut={(e) => (e.currentTarget.style.color = "hsl(var(--text-secondary))")}
          >
            Tarifs
          </Link>
          <Link
            href="#contact"
            style={{
              fontSize: "0.9rem",
              fontWeight: 500,
              color: "hsl(var(--text-secondary))",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = "hsl(var(--primary))")}
            onMouseOut={(e) => (e.currentTarget.style.color = "hsl(var(--text-secondary))")}
          >
            Contact
          </Link>
        </nav>

        {/* Right CTA Actions */}
        <div style={{ gap: "0.75rem", alignItems: "center" }} className="hidden lg:flex">
          {user ? (
            <Link
              href="/dashboard/academy"
              className="btn-primary"
              style={{
                padding: "0.6rem 1.25rem",
                fontSize: "0.9rem",
                borderRadius: "0.5rem",
                fontWeight: 700,
                boxShadow: "0 4px 6px -1px rgba(139, 92, 246, 0.15)",
                whiteSpace: "nowrap"
              }}
            >
              Tableau de bord
            </Link>
          ) : (
            <>
              <Link href="/login" className="btn-ghost" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                Connexion
              </Link>
              <Link
                href="/register"
                className="btn-primary"
                style={{
                  padding: "0.6rem 1.25rem",
                  fontSize: "0.9rem",
                  borderRadius: "0.5rem",
                  fontWeight: 700,
                  whiteSpace: "nowrap"
                }}
              >
                Commencer
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            alignItems: "center",
            justifyContent: "center",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0.5rem",
          }}
          className="flex lg:hidden"
        >
          {mobileMenuOpen ? (
            <X size={24} color="hsl(var(--text-primary))" />
          ) : (
            <Menu size={24} color="hsl(var(--text-primary))" />
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              borderTop: "1px solid hsl(var(--border))",
              backgroundColor: "rgba(255, 255, 255, 0.98)",
              padding: "1.5rem",
              gap: "1.25rem",
            }}
            className="flex lg:hidden flex-col"
          >
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "hsl(var(--text-primary))",
                textDecoration: "none",
              }}
            >
              Accueil
            </Link>
            <Link
              href="#skills"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: "0.95rem",
                fontWeight: 500,
                color: "hsl(var(--text-secondary))",
                textDecoration: "none",
              }}
            >
              Épreuves TCF
            </Link>
            <Link
              href="#academy"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: "0.95rem",
                fontWeight: 500,
                color: "hsl(var(--text-secondary))",
                textDecoration: "none",
              }}
            >
              Formations
            </Link>
            <Link
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: "0.95rem",
                fontWeight: 500,
                color: "hsl(var(--text-secondary))",
                textDecoration: "none",
              }}
            >
              Tarifs
            </Link>
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: "0.95rem",
                fontWeight: 500,
                color: "hsl(var(--text-secondary))",
                textDecoration: "none",
              }}
            >
              Contact
            </Link>
            <hr style={{ borderColor: "hsl(var(--border))" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {user ? (
                <Link
                  href="/dashboard/academy"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-primary"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Tableau de bord
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-ghost"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    Connexion
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-primary"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    Commencer
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
