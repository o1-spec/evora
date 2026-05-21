"use client";

import Link from "next/link";
import { FileText, Mic, Calendar, ArrowRight } from "lucide-react";

const WRITING_TOPICS = [
  {
    date: "20 mai 2026",
    title: "Tâche 1 : Rédiger un courriel à un collègue pour lui demander de remplacer vos heures de travail.",
    difficulty: "A2 / Élémentaire",
    badgeType: "primary",
  },
  {
    date: "15 mai 2026",
    title: "Tâche 2 : Écrire un article destiné à un journal local sur les avantages de vivre sans voiture en ville.",
    difficulty: "B2 / Avancé",
    badgeType: "accent",
  },
  {
    date: "02 mai 2026",
    title: "Tâche 3 : Rédiger une tribune libre comparant les cours en ligne et l'apprentissage en présentiel.",
    difficulty: "C1 / Autonome",
    badgeType: "secondary",
  },
];

const SPEAKING_TOPICS = [
  {
    date: "19 mai 2026",
    title: "Tâche 1 : Présentation de soi, vos loisirs et les motivations de votre projet d'immigration au Canada.",
    difficulty: "A1-A2 / Débutant",
    badgeType: "primary",
  },
  {
    date: "14 mai 2026",
    title: "Tâche 2 : Entretien dirigé (Jeu de rôle) : Poser des questions pour vous inscrire à un club de sport.",
    difficulty: "B1-B2 / Intermédiaire",
    badgeType: "accent",
  },
  {
    date: "05 mai 2026",
    title: "Tâche 3 : Monologue argumenté : Donner son point de vue sur le télétravail obligatoire pour tous.",
    difficulty: "B2-C1 / Supérieur",
    badgeType: "secondary",
  },
];

export default function RecentTopicsSection() {
  return (
    <section id="recent-topics" className="py-16 md:py-24" style={{ backgroundColor: "hsl(var(--bg-base))" }}>
      <div className="container-max">
        {/* Section Title */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 2.5rem)",
              marginBottom: "1rem",
              lineHeight: 1.2,
            }}
          >
            Sujets Récents Examens TCF
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
            Préparez-vous avec des sujets réels collectés lors des sessions d'examens TCF Canada les plus récentes en 2026.
          </p>
        </div>

        {/* Dual Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Column 1 - Written Expression */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "2rem",
                borderBottom: "2px solid hsl(var(--border))",
                paddingBottom: "1rem",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  backgroundColor: "hsl(var(--primary-light))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FileText size={18} color="hsl(var(--primary))" />
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>Expression Écrite</h3>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {WRITING_TOPICS.map((topic, i) => (
                <div
                  key={i}
                  className="card hover:shadow-md transition-shadow"
                  style={{ padding: "1.5rem", backgroundColor: "white" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "0.75rem",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        fontSize: "0.75rem",
                        color: "hsl(var(--text-muted))",
                      }}
                    >
                      <Calendar size={12} />
                      {topic.date}
                    </div>
                    <span
                      className={`badge ${
                        topic.badgeType === "primary"
                          ? "badge-primary"
                          : topic.badgeType === "accent"
                          ? "badge-accent"
                          : "badge-secondary"
                      }`}
                      style={{ fontSize: "0.7rem", fontWeight: 700 }}
                    >
                      {topic.difficulty}
                    </span>
                  </div>
                  <h4
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      lineHeight: 1.5,
                      marginBottom: "1rem",
                      color: "hsl(var(--text-primary))",
                    }}
                  >
                    {topic.title}
                  </h4>
                  <Link
                    href="/register"
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: "hsl(var(--primary))",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.textDecoration = "underline")}
                    onMouseOut={(e) => (e.currentTarget.style.textDecoration = "none")}
                  >
                    Rédiger ma réponse
                    <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2 - Oral Expression */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "2rem",
                borderBottom: "2px solid hsl(var(--border))",
                paddingBottom: "1rem",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  backgroundColor: "hsl(var(--primary-light))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Mic size={18} color="hsl(var(--primary))" />
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>Expression Orale</h3>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {SPEAKING_TOPICS.map((topic, i) => (
                <div
                  key={i}
                  className="card hover:shadow-md transition-shadow"
                  style={{ padding: "1.5rem", backgroundColor: "white" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "0.75rem",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        fontSize: "0.75rem",
                        color: "hsl(var(--text-muted))",
                      }}
                    >
                      <Calendar size={12} />
                      {topic.date}
                    </div>
                    <span
                      className={`badge ${
                        topic.badgeType === "primary"
                          ? "badge-primary"
                          : topic.badgeType === "accent"
                          ? "badge-accent"
                          : "badge-secondary"
                      }`}
                      style={{ fontSize: "0.7rem", fontWeight: 700 }}
                    >
                      {topic.difficulty}
                    </span>
                  </div>
                  <h4
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      lineHeight: 1.5,
                      marginBottom: "1rem",
                      color: "hsl(var(--text-primary))",
                    }}
                  >
                    {topic.title}
                  </h4>
                  <Link
                    href="/register"
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: "hsl(var(--primary))",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.textDecoration = "underline")}
                    onMouseOut={(e) => (e.currentTarget.style.textDecoration = "none")}
                  >
                    Enregistrer mon audio
                    <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
