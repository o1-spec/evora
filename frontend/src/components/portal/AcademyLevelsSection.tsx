"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";

const LEVELS = [
  {
    code: "A1",
    title: "Débutant",
    desc: "Comprendre et utiliser des expressions familières et quotidiennes ainsi que des énoncés très simples.",
    lessons: "12 Modules",
    vocab: "200 mots",
    color: "#ef4444", // Red
    bgColor: "rgba(239, 68, 68, 0.05)",
  },
  {
    code: "A2",
    title: "Élémentaire",
    desc: "Comprendre des phrases isolées et des expressions fréquemment utilisées en relation avec des sujets familiers.",
    lessons: "16 Modules",
    vocab: "450 mots",
    color: "#f97316", // Orange
    bgColor: "rgba(249, 115, 22, 0.05)",
  },
  {
    code: "B1",
    title: "Intermédiaire",
    desc: "Comprendre les points essentiels d'un langage clair et standard sur des sujets familiers dans le travail, l'école, etc.",
    lessons: "24 Modules",
    vocab: "800 mots",
    color: "#3b82f6", // Blue
    bgColor: "rgba(59, 130, 246, 0.05)",
  },
  {
    code: "B2",
    title: "Avancé (Cible TCF)",
    desc: "Comprendre le contenu essentiel de sujets concrets ou abstraits dans un texte complexe, y compris les discussions techniques.",
    lessons: "30 Modules",
    vocab: "1500 mots",
    color: "#10b981", // Green
    bgColor: "rgba(16, 185, 129, 0.05)",
  },
  {
    code: "C1",
    title: "Autonome",
    desc: "Comprendre une grande variété de textes longs et exigeants, ainsi que de saisir des significations implicites.",
    lessons: "20 Modules",
    vocab: "2500 mots",
    color: "#8b5cf6", // Purple
    bgColor: "rgba(139, 92, 246, 0.05)",
  },
  {
    code: "C2",
    title: "Maîtrise",
    desc: "Comprendre sans effort pratiquement tout ce qui est lu ou entendu, et restituer faits et arguments de diverses sources.",
    lessons: "15 Modules",
    vocab: "4000 mots",
    color: "#64748b", // Slate
    bgColor: "rgba(100, 116, 139, 0.05)",
  },
];

export default function AcademyLevelsSection() {
  return (
    <section id="academy" className="py-16 md:py-24" style={{ backgroundColor: "#ffffff" }}>
      <div className="container-max">
        {/* Section Title */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span
            style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              color: "hsl(var(--primary))",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            NOTRE PROGRAMME ACADÉMIQUE
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 2.5rem)",
              marginTop: "0.5rem",
              marginBottom: "1rem",
              lineHeight: 1.2,
            }}
          >
            Parcours d'Apprentissage Structuré
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              color: "hsl(var(--text-secondary))",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Progresse pas à pas depuis le niveau débutant A1 jusqu'au niveau expert C2 grâce à notre catalogue de cours complet.
          </p>
        </div>

        {/* Levels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEVELS.map((level) => (
            <div
              key={level.code}
              className="card"
              style={{
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: "white",
                border: "1px solid hsl(var(--border))",
                transition: "all 0.2s",
              }}
            >
              <div>
                {/* Level Tag Header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "1.25rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.75rem",
                      fontWeight: 800,
                      color: level.color,
                      fontFamily: "Outfit, sans-serif",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "0.5rem",
                      backgroundColor: level.bgColor,
                    }}
                  >
                    {level.code}
                  </div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      color: "hsl(var(--text-secondary))",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                  >
                    <BookOpen size={14} />
                    {level.lessons}
                  </div>
                </div>

                {/* Level Title */}
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    marginBottom: "0.75rem",
                    color: "hsl(var(--text-primary))",
                  }}
                >
                  {level.title}
                </h3>

                {/* Level Description */}
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "hsl(var(--text-secondary))",
                    lineHeight: 1.5,
                    marginBottom: "1.5rem",
                  }}
                >
                  {level.desc}
                </p>
              </div>

              {/* Card Footer Details */}
              <div
                style={{
                  borderTop: "1px solid #f1f5f9",
                  paddingTop: "1.25rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "hsl(var(--text-secondary))",
                    fontWeight: 600,
                  }}
                >
                  Vocabulaire requis: {level.vocab}
                </span>

                <Link
                  href={`/register`}
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: "hsl(var(--primary))",
                    textDecoration: "none",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.textDecoration = "underline")}
                  onMouseOut={(e) => (e.currentTarget.style.textDecoration = "none")}
                >
                  Consulter le programme &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
