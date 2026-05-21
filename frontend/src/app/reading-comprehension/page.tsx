"use client";

import Link from "next/link";
import { BookOpen, Sparkles, CheckCircle, ArrowRight, Clock, Award } from "lucide-react";
import PublicLayout from "@/components/portal/PublicLayout";
import PublicPageHero from "@/components/portal/PublicPageHero";
import ExamSectionCard from "@/components/portal/ExamSectionCard";
import TopicCard from "@/components/portal/TopicCard";
import QuickAccessMenu from "@/components/portal/QuickAccessMenu";

export default function ReadingComprehensionPage() {
  const levels = [
    {
      number: "CLB 4 - 5",
      title: "Simple Notices & Announcements",
      description: "Understand everyday documents, emails, simple public advertisements, labels, or instruction sheets.",
      points: [
        "Language: Practical, high-frequency vocabulary",
        "Goal: Quickly locate key dates, times, prices, and locations",
        "Difficulty: Easy"
      ]
    },
    {
      number: "CLB 6 - 7",
      title: "Newspaper Reports & Letters",
      description: "Understand descriptive or narrative articles, reviews, personal letters, or professional reports detailing events.",
      points: [
        "Language: Intermediate vocabulary, basic expressions",
        "Goal: Analyze main storylines, motivations, or event chronologies",
        "Difficulty: Medium"
      ]
    },
    {
      number: "CLB 8 - 10",
      title: "Complex Editorial & Academic Texts",
      description: "Analyze abstract, long, or specialized texts (editorial articles, academic thesis, or philosophical debates).",
      points: [
        "Language: Advanced syntax, rich vocabulary, idioms",
        "Goal: Identify subtle author opinions, subtexts, and arguments",
        "Difficulty: Hard"
      ]
    }
  ];

  const recentTopics = [
    {
      title: "CLB 5: Comprendre des consignes de sécurité simples dans les espaces publics canadiens.",
      category: "Reading Section A",
      clbLevel: "CLB 5 Target",
      difficulty: "Easy",
      timeLimit: "39 Questions Total"
    },
    {
      title: "CLB 7: Analyse d'un article de presse sur la transition écologique au Québec.",
      category: "Reading Section B",
      clbLevel: "CLB 7 Target",
      difficulty: "Medium",
      timeLimit: "39 Questions Total"
    },
    {
      title: "CLB 9: Décryptage d'une critique littéraire universitaire sur la francophonie moderne.",
      category: "Reading Section C",
      clbLevel: "CLB 9 Target",
      difficulty: "Hard",
      timeLimit: "39 Questions Total"
    }
  ];

  return (
    <PublicLayout>
      <PublicPageHero
        title="TCF Canada Reading Comprehension"
        subtitle="Develop elite speed-reading strategies, dissect complex syntax, and analyze multiple-choice formats under exam conditions."
        badge="Compréhension Écrite"
        badgeColor="#3b82f6"
        accentIcon={<BookOpen size={12} />}
      />

      {/* Quick Access Menu Row below navbar */}
      <QuickAccessMenu />

      {/* Main Section Content */}
      <div style={{ backgroundColor: "#ffffff", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", width: "100%" }}>
          
          {/* Question Types & Categories */}
          <div style={{ marginBottom: "5rem" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h2 style={{ fontSize: "2rem", fontFamily: "Outfit, sans-serif", fontWeight: 800, marginBottom: "0.5rem" }}>
                Reading Question Types & CLB Levels
              </h2>
              <p style={{ color: "hsl(var(--text-secondary))", maxWidth: "600px", margin: "0 auto" }}>
                The reading comprehension exam spans 39 multiple-choice questions ranging from simple announcements to editorial viewpoints.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
              {levels.map((level) => (
                <ExamSectionCard
                  key={level.number}
                  number={level.number}
                  title={level.title}
                  description={level.description}
                  points={level.points}
                />
              ))}
            </div>
          </div>

          {/* Timed Reading Practice CTA */}
          <div
            style={{
              backgroundColor: "hsla(221, 83%, 53%, 0.04)",
              borderRadius: "1.5rem",
              padding: "3rem 2rem",
              border: "1px solid rgba(59, 130, 246, 0.15)",
              marginBottom: "5rem",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "3rem" }}>
              <div style={{ flex: "2 1 480px" }}>
                <span
                  style={{
                    backgroundColor: "white",
                    color: "hsl(var(--primary))",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "999px",
                    textTransform: "uppercase",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    marginBottom: "1rem",
                  }}
                >
                  <Clock size={12} />
                  Timed Exam Simulations
                </span>
                <h3
                  style={{
                    fontSize: "1.75rem",
                    fontFamily: "Outfit, sans-serif",
                    fontWeight: 800,
                    marginBottom: "1rem",
                    color: "hsl(var(--text-primary))",
                  }}
                >
                  Train under Realistic 60-Minute TCF Constraints
                </h3>
                <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "2rem" }}>
                  TCF Canada Reading forces you to answer 39 questions in exactly 60 minutes. Our simulator mimics this strict environment with synchronized clocks, automated answer tracking sheets, and instantly graded results maps detailing which answers were correct and why.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <CheckCircle size={16} color="hsl(var(--primary))" />
                    <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>Ticking Timer Simulator</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <CheckCircle size={16} color="hsl(var(--primary))" />
                    <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>Instant Answer Grids</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <CheckCircle size={16} color="hsl(var(--primary))" />
                    <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>Detailed Rationale Explanations</span>
                  </div>
                </div>
              </div>
              <div style={{ flex: "1 1 280px", display: "flex", justifyContent: "center" }}>
                <Link
                  href="/login"
                  className="btn-primary"
                  style={{
                    padding: "1rem 2rem",
                    fontSize: "1rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  Try Reading Simulator
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>

          {/* Recent topics / practice cards */}
          <div style={{ marginBottom: "4rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem" }}>
              <div>
                <h2 style={{ fontSize: "1.75rem", fontFamily: "Outfit, sans-serif", fontWeight: 800, marginBottom: "0.25rem" }}>
                  Reading Practice Exercises
                </h2>
                <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.9rem" }}>
                  Train on text exercises segmented by target CLB level difficulties.
                </p>
              </div>
              <Link
                href="/login"
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: "hsl(var(--primary))",
                  textDecoration: "none",
                }}
              >
                Browse All Reading Exercises &rarr;
              </Link>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
              {recentTopics.map((topic, i) => (
                <TopicCard
                  key={i}
                  title={topic.title}
                  category={topic.category}
                  clbLevel={topic.clbLevel}
                  difficulty={topic.difficulty}
                  timeLimit={topic.timeLimit}
                />
              ))}
            </div>
          </div>

          {/* Start reading test button */}
          <div style={{ textAlign: "center", borderTop: "1px solid hsl(var(--border))", paddingTop: "4rem" }}>
            <h3 style={{ fontSize: "1.5rem", fontFamily: "Outfit, sans-serif", fontWeight: 800, marginBottom: "0.75rem" }}>
              Launch Full Reading Comprehension Practice Test
            </h3>
            <p style={{ color: "hsl(var(--text-secondary))", maxWidth: "600px", margin: "0 auto 2rem", fontSize: "0.95rem" }}>
              Test your speed-reading capacity with 39 randomized text questions modeled exactly on active TCF Canada exam matrices.
            </p>
            <Link
              href="/login"
              className="btn-primary"
              style={{
                padding: "1rem 2.5rem",
                borderRadius: "0.75rem",
                fontSize: "1rem",
                fontWeight: 700,
                boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.2)",
              }}
            >
              Start Reading Test
            </Link>
          </div>

        </div>
      </div>
    </PublicLayout>
  );
}
