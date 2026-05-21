"use client";

import Link from "next/link";
import { Globe, ArrowRight, BookOpen } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: "hsl(var(--bg-base))",
        borderTop: "1px solid hsl(var(--border))",
        padding: "5rem 1.5rem 2rem",
      }}
    >
      <div className="container-max" style={{ maxWidth: "1200px" }}>
        {/* Main Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "3rem",
            marginBottom: "4rem",
          }}
        >
          {/* Brand/Description Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
              <div
                style={{
                  width: 32,
                  height: 32,
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
                  fontSize: "1.25rem",
                  color: "hsl(var(--text-primary))",
                }}
              >
                Évora
              </span>
            </Link>
            <p
              style={{
                fontSize: "0.875rem",
                color: "hsl(var(--text-secondary))",
                lineHeight: 1.6,
              }}
            >
              Première plateforme intelligente d'entraînement et d'évaluation automatisée pour le TCF Canada et Québec. Conçu pour maximiser votre score CLB.
            </p>
          </div>

          {/* Column 1: Épreuves TCF */}
          <div>
            <h4
              style={{
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "hsl(var(--text-primary))",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "1.25rem",
              }}
            >
              Épreuves TCF Canada
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <li>
                <Link href="/written-expression" style={{ fontSize: "0.875rem", color: "hsl(var(--text-secondary))", textDecoration: "none" }}>
                  Expression Écrite (E.E)
                </Link>
              </li>
              <li>
                <Link href="/oral-expression" style={{ fontSize: "0.875rem", color: "hsl(var(--text-secondary))", textDecoration: "none" }}>
                  Expression Orale (E.O)
                </Link>
              </li>
              <li>
                <Link href="/reading-comprehension" style={{ fontSize: "0.875rem", color: "hsl(var(--text-secondary))", textDecoration: "none" }}>
                  Compréhension Écrite (C.E)
                </Link>
              </li>
              <li>
                <Link href="/oral-comprehension" style={{ fontSize: "0.875rem", color: "hsl(var(--text-secondary))", textDecoration: "none" }}>
                  Compréhension Orale (C.O)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Formations */}
          <div>
            <h4
              style={{
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "hsl(var(--text-primary))",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "1.25rem",
              }}
            >
              Programmes
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <li>
                <Link href="/training" style={{ fontSize: "0.875rem", color: "hsl(var(--text-secondary))", textDecoration: "none" }}>
                  Niveaux Débutants (A1 - A2)
                </Link>
              </li>
              <li>
                <Link href="/training" style={{ fontSize: "0.875rem", color: "hsl(var(--text-secondary))", textDecoration: "none" }}>
                  Niveau Intermédiaire (B1)
                </Link>
              </li>
              <li>
                <Link href="/training" style={{ fontSize: "0.875rem", color: "hsl(var(--text-secondary))", textDecoration: "none" }}>
                  Cible TCF Canada (B2 Avancé)
                </Link>
              </li>
              <li>
                <Link href="/training" style={{ fontSize: "0.875rem", color: "hsl(var(--text-secondary))", textDecoration: "none" }}>
                  Niveaux Autonomes (C1 - C2)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Navigation & Legal */}
          <div>
            <h4
              style={{
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "hsl(var(--text-primary))",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "1.25rem",
              }}
            >
              Légal & Contact
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <li>
                <Link href="/login" style={{ fontSize: "0.875rem", color: "hsl(var(--text-secondary))", textDecoration: "none" }}>
                  Se connecter
                </Link>
              </li>
              <li>
                <Link href="/register" style={{ fontSize: "0.875rem", color: "hsl(var(--text-secondary))", textDecoration: "none" }}>
                  Créer un compte
                </Link>
              </li>
              <li>
                <Link href="#" style={{ fontSize: "0.875rem", color: "hsl(var(--text-secondary))", textDecoration: "none" }}>
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link href="#" style={{ fontSize: "0.875rem", color: "hsl(var(--text-secondary))", textDecoration: "none" }}>
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid hsl(var(--border))",
            paddingTop: "2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
          className="flex flex-col sm:flex-row text-center sm:text-left"
        >
          <span style={{ fontSize: "0.8rem", color: "hsl(var(--text-secondary))" }}>
            &copy; {currentYear} Évora. Tous droits réservés. Évora n'est pas affilié officiellement avec France Éducation International.
          </span>
          <span style={{ fontSize: "0.8rem", color: "hsl(var(--text-secondary))", display: "flex", alignItems: "center", gap: "0.25rem" }}>
            Fait avec amour pour les candidats francophones <span style={{ color: "#ef4444" }}>♥</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
