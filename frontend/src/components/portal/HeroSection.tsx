"use client";

import Link from "next/link";
import { FileText, Mic, PlayCircle, ShieldCheck, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

export default function HeroSection() {
  const { isAuthenticated } = useAuthStore();

  return (
    <section
      style={{
        background: "linear-gradient(135deg, hsl(214, 100%, 98%) 0%, hsl(220, 100%, 97%) 100%)",
        borderBottom: "1px solid hsl(var(--border))",
        overflow: "hidden",
      }}
      className="py-12 md:py-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center container-max">
        {/* Left Side Content - 7 cols on desktop */}
        <div className="lg:col-span-7">
          <div
            className="badge badge-primary"
            style={{
              marginBottom: "1.5rem",
              border: "1px solid hsl(214, 100%, 90%)",
              fontSize: "0.8rem",
            }}
          >
            <ShieldCheck size={14} style={{ marginRight: "0.25rem" }} />
            Préparation officielle TCF Canada & TCF Québec
          </div>

          <h1
            style={{
              fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)",
              letterSpacing: "-0.025em",
              marginBottom: "1.5rem",
              lineHeight: 1.15,
            }}
          >
            Se préparer au{" "}
            <span style={{ color: "hsl(var(--primary))" }}>TCF Canada</span> et{" "}
            <span style={{ color: "hsl(var(--primary))" }}>TCF Québec</span>
          </h1>

          <p
            style={{
              fontSize: "1.1rem",
              color: "hsl(var(--text-secondary))",
              marginBottom: "2.5rem",
              lineHeight: 1.6,
              maxWidth: 580,
            }}
          >
            Plateforme spécialisée pour pratiquer les 4 épreuves du TCF avec des exercices, simulations et corrections assistées par IA. Obtenez votre CLB 7+ pour vos démarches d'immigration.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
              gap: "1rem",
              marginBottom: "2rem",
            }}
          >
            <Link
              href="#recent-topics"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "1rem",
                borderRadius: "0.875rem",
                backgroundColor: "white",
                border: "1px solid hsl(var(--border))",
                textDecoration: "none",
                color: "hsl(var(--text-primary))",
                boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
                transition: "all 0.2s",
              }}
              className="hover:border-purple-400 hover:shadow-sm"
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  backgroundColor: "hsl(var(--primary-light))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FileText size={18} color="hsl(var(--primary))" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "0.85rem", fontWeight: 700 }}>Sujets récents E.E.</div>
                <div style={{ fontSize: "0.75rem", color: "hsl(var(--text-secondary))" }}>
                  Expression écrite &middot; IA
                </div>
              </div>
              <ArrowRight size={14} color="hsl(var(--text-muted))" />
            </Link>

            <Link
              href="#recent-topics"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "1rem",
                borderRadius: "0.875rem",
                backgroundColor: "white",
                border: "1px solid hsl(var(--border))",
                textDecoration: "none",
                color: "hsl(var(--text-primary))",
                boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
                transition: "all 0.2s",
              }}
              className="hover:border-purple-400 hover:shadow-sm"
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  backgroundColor: "hsl(var(--primary-light))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Mic size={18} color="hsl(var(--primary))" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "0.85rem", fontWeight: 700 }}>Sujets récents E.O.</div>
                <div style={{ fontSize: "0.75rem", color: "hsl(var(--text-secondary))" }}>
                  Expression orale &middot; Audio
                </div>
              </div>
              <ArrowRight size={14} color="hsl(var(--text-muted))" />
            </Link>
          </div>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard/academy"
                  className="btn-primary"
                  style={{ padding: "0.875rem 2.25rem", fontSize: "1rem" }}
                >
                  Tableau de bord
                </Link>
                <Link
                  href="/dashboard/exams"
                  className="btn-secondary"
                  style={{ padding: "0.875rem 2.25rem", fontSize: "1rem" }}
                >
                  Démarrer un test blanc
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  className="btn-primary"
                  style={{ padding: "0.875rem 2.25rem", fontSize: "1rem" }}
                >
                  S'inscrire gratuitement
                </Link>
                <Link
                  href="/login"
                  className="btn-secondary"
                  style={{ padding: "0.875rem 2.25rem", fontSize: "1rem" }}
                >
                  Démarrer un test blanc
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Right Side Mockup Card Stack - 5 cols on desktop */}
        <div className="lg:col-span-5 relative">
          <div
            className="card-elevated"
            style={{
              padding: "1.5rem",
              backgroundColor: "white",
              border: "1px solid hsl(var(--border))",
              position: "relative",
              zIndex: 10,
            }}
          >
            {/* Header of Mock Card */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
                borderBottom: "1px solid #f1f5f9",
                paddingBottom: "1rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: "#22c55e",
                  }}
                />
                <span
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: "hsl(var(--text-primary))",
                  }}
                >
                  SIMULATION EN COURS
                </span>
              </div>
              <span className="badge badge-secondary" style={{ fontWeight: 600 }}>
                Temps restant: 45:00
              </span>
            </div>

            {/* Speaking/Audio Waveform Mock */}
            <div style={{ marginBottom: "1.5rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.75rem",
                }}
              >
                <Mic size={16} color="hsl(var(--primary))" />
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "hsl(var(--text-primary))" }}>
                  Tâche 2 : Expression Orale (Monologue)
                </span>
              </div>
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "hsl(var(--bg-base))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.75rem",
                  fontSize: "0.8rem",
                  lineHeight: 1.5,
                  color: "hsl(var(--text-secondary))",
                }}
              >
                <strong>Sujet :</strong> Présentez une activité culturelle de votre pays d'origine à un ami francophone. Expliquez pourquoi vous l'appréciez.
              </div>
            </div>

            {/* Mock Level Estimator */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))",
                gap: "0.75rem",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  padding: "0.875rem",
                  backgroundColor: "hsl(var(--primary-light))",
                  border: "1px solid hsla(262, 83%, 58%, 0.1)",
                  borderRadius: "0.75rem",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "0.7rem", color: "hsl(var(--text-secondary))", marginBottom: "0.15rem" }}>
                  Niveau estimé
                </div>
                <div
                  style={{
                    fontSize: "1.35rem",
                    fontWeight: 800,
                    color: "hsl(var(--primary))",
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  B2 / CLB 7
                </div>
              </div>

              <div
                style={{
                  padding: "0.875rem",
                  backgroundColor: "hsl(var(--accent-light))",
                  border: "1px solid hsla(142, 71%, 45%, 0.1)",
                  borderRadius: "0.75rem",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "0.7rem", color: "hsl(var(--text-secondary))", marginBottom: "0.15rem" }}>
                  Correction IA
                </div>
                <div
                  style={{
                    fontSize: "1.35rem",
                    fontWeight: 800,
                    color: "hsl(var(--accent))",
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  Grammaire 88%
                </div>
              </div>
            </div>

            {/* Progress bar inside mockup */}
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.7rem",
                  marginBottom: "0.25rem",
                  color: "hsl(var(--text-secondary))",
                }}
              >
                <span>Modules terminés</span>
                <span>3/4 Épreuves</span>
              </div>
              <div className="progress-track" style={{ height: "6px" }}>
                <div className="progress-fill" style={{ width: "75%" }} />
              </div>
            </div>
          </div>

          {/* Abstract shadow layers behind the mockup card */}
          <div
            style={{
              position: "absolute",
              top: "10%",
              right: "-5%",
              width: "105%",
              height: "100%",
              backgroundColor: "hsla(262, 83%, 58%, 0.03)",
              borderRadius: "1rem",
              zIndex: 0,
              transform: "rotate(2deg)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
