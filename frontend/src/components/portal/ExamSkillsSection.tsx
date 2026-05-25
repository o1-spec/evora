"use client";

import Link from "next/link";
import { Headphones, BookOpen, Mic, FileText, ArrowRight } from "lucide-react";

const SKILLS = [
  {
    title: "Compréhension orale",
    desc: "Écoutez des conversations et des messages enregistrés en français natif, puis répondez à des questions à choix multiples pour évaluer votre écoute.",
    questions: "39 questions QCM",
    duration: "35 minutes",
    icon: Headphones,
    color: "#6366f1", // Indigo / Premium Purple tint
    bgColor: "hsl(226, 100%, 97%)",
    href: "/oral-comprehension"
  },
  {
    title: "Compréhension écrite",
    desc: "Lisez des textes divers (courriels, articles de presse, documents officiels) et répondez à des questions pour tester votre niveau de lecture.",
    questions: "39 questions QCM",
    duration: "60 minutes",
    icon: BookOpen,
    color: "#10b981", // Green
    bgColor: "hsl(149, 80%, 96%)",
    href: "/reading-comprehension"
  },
  {
    title: "Expression orale",
    desc: "Exprimez-vous oralement face à des tâches de difficulté progressive (monologues et dialogues) analysées en temps réel par notre assistant IA.",
    questions: "3 tâches pratiques",
    duration: "12 minutes",
    icon: Mic,
    color: "#f97316", // Orange
    bgColor: "hsl(31, 100%, 97%)",
    href: "/oral-expression"
  },
  {
    title: "Expression écrite",
    desc: "Rédigez des courriels, des témoignages et des articles argumentés. Obtenez instantanément des rapports de correction grammaticale et lexicale.",
    questions: "3 tâches pratiques",
    duration: "60 minutes",
    icon: FileText,
    color: "#8b5cf6", // Purple
    bgColor: "hsl(262, 80%, 97%)",
    href: "/written-expression"
  },
];

import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";

export default function ExamSkillsSection() {
  const { isAuthenticated } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="skills" className="py-16 md:py-24" style={{ backgroundColor: "#ffffff" }}>
      <div className="container-max">
        {/* Section Title */}
        <div
          style={{
            textAlign: "center",
            maxWidth: "700px",
            margin: "0 auto 4rem",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 2.5rem)",
              marginBottom: "1rem",
              lineHeight: 1.2,
            }}
          >
            Les 4 Épreuves du TCF Canada
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              color: "hsl(var(--text-secondary))",
              lineHeight: 1.6,
            }}
          >
            Maîtrisez chaque aspect de l'examen officiel grâce à nos modules de simulation fidèles à l'examen officiel de France Éducation International.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SKILLS.map((skill) => {
            const Icon = skill.icon;
            return (
              <div
                key={skill.title}
                className="card"
                style={{
                  padding: "2.25rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <div>
                  {/* Icon and Header */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <div
                      style={{
                        width: 46,
                        height: 46,
                        borderRadius: 10,
                        backgroundColor: skill.bgColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon size={22} color={skill.color} />
                    </div>
                    <h3
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        color: "hsl(var(--text-primary))",
                      }}
                    >
                      {skill.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: "0.95rem",
                      color: "hsl(var(--text-secondary))",
                      lineHeight: 1.6,
                      marginBottom: "1.5rem",
                    }}
                  >
                    {skill.desc}
                  </p>
                </div>

                <div>
                  {/* Badges */}
                  <div
                    style={{
                      display: "flex",
                      gap: "0.75rem",
                      marginBottom: "1.75rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "hsl(var(--text-primary))",
                        backgroundColor: "hsl(var(--bg-base))",
                        padding: "0.35rem 0.75rem",
                        borderRadius: "999px",
                        border: "1px solid hsl(var(--border))",
                      }}
                    >
                      {skill.questions}
                    </span>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "hsl(var(--text-primary))",
                        backgroundColor: "hsl(var(--bg-base))",
                        padding: "0.35rem 0.75rem",
                        borderRadius: "999px",
                        border: "1px solid hsl(var(--border))",
                      }}
                    >
                      Durée : {skill.duration}
                    </span>
                  </div>

                  {/* CTA Button */}
                  <Link
                    href={mounted && isAuthenticated ? skill.href : "/register"}
                    className="btn-secondary"
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      fontWeight: 600,
                      gap: "0.5rem",
                    }}
                  >
                    Commencer à pratiquer
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
