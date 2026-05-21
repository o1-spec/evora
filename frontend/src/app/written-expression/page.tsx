"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, Sparkles, HelpCircle, CheckCircle, ArrowRight, PenTool } from "lucide-react";
import PublicLayout from "@/components/portal/PublicLayout";
import PublicPageHero from "@/components/portal/PublicPageHero";
import ExamSectionCard from "@/components/portal/ExamSectionCard";
import TopicCard from "@/components/portal/TopicCard";

export default function WrittenExpressionPage() {
  const tasks = [
    {
      number: 1,
      title: "Task 1: Daily Life Message / Message de la vie quotidienne",
      description: "Write a message (email, letter, card) to one or more recipients to describe an experience, ask for advice, invite, or explain a decision.",
      points: [
        "Duration: ~15 minutes suggested",
        "Length: Minimum 60 words / Maximum 120 words",
        "Key strategy: Ensure you address all requested prompt constraints in a warm, polite tone."
      ]
    },
    {
      number: 2,
      title: "Task 2: Article or Report / Article d'opinion ou Compte-rendu",
      description: "Write an article or letter intended for a newspaper, magazine, or association, expressing an opinion or documenting a specific situation.",
      points: [
        "Duration: ~25 minutes suggested",
        "Length: Minimum 120 words / Maximum 150 words",
        "Key strategy: Build clear structured paragraphs. Formulate arguments with cohesive logical connectors."
      ]
    },
    {
      number: 3,
      title: "Task 3: Comparative Argumentation / Point de vue comparatif",
      description: "Compare two viewpoints presented in short documents and take a structured, reasoned personal stance on the topic.",
      points: [
        "Duration: ~20 minutes suggested",
        "Length: Minimum 120 words / Maximum 180 words",
        "Key strategy: Summarize arguments from both sides without copying, then defend your own synthesis."
      ]
    }
  ];

  const recentTopics = [
    {
      title: "Task 1: Vous invitez un ami à fêter votre promotion professionnelle dans un nouveau restaurant.",
      category: "Written Task 1",
      clbLevel: "CLB 7 Target",
      difficulty: "Easy",
      timeLimit: "15 min"
    },
    {
      title: "Task 2: Rédigez un article expliquant les avantages et les inconvénients du télétravail dans les grandes villes.",
      category: "Written Task 2",
      clbLevel: "CLB 9 Target",
      difficulty: "Medium",
      timeLimit: "25 min"
    },
    {
      title: "Task 3: Débat public: Faut-il interdire complètement les voitures individuelles dans les centres-villes?",
      category: "Written Task 3",
      clbLevel: "CLB 10 Target",
      difficulty: "Hard",
      timeLimit: "20 min"
    }
  ];

  return (
    <PublicLayout>
      <PublicPageHero
        title="TCF Canada Written Expression"
        subtitle="Master the three tasks of the written exam with clear formats, formal grammar, and AI evaluation feedback designed to secure your CLB 7+ score."
        badge="Expression Écrite"
        badgeColor="hsl(var(--primary))"
        accentIcon={<PenTool size={12} />}
      />

      {/* Main Section Content */}
      <div style={{ backgroundColor: "#ffffff", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", width: "100%" }}>
          
          {/* Methodology & Tips */}
          <div style={{ marginBottom: "5rem" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h2 style={{ fontSize: "2rem", fontFamily: "Outfit, sans-serif", fontWeight: 800, marginBottom: "0.5rem" }}>
                Methodology & Exam Structure
              </h2>
              <p style={{ color: "hsl(var(--text-secondary))", maxWidth: "600px", margin: "0 auto" }}>
                Understand the specific constraints and formats of the three tasks to optimize your writing speed and quality.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: "2rem" }}>
              {tasks.map((task) => (
                <ExamSectionCard
                  key={task.number}
                  number={task.number}
                  title={task.title}
                  description={task.description}
                  points={task.points}
                />
              ))}
            </div>
          </div>

          {/* AI Correction CTA */}
          <div
            style={{
              backgroundColor: "hsl(var(--primary-light))",
              borderRadius: "1.5rem",
              padding: "3rem 2rem",
              border: "1px solid rgba(59, 130, 246, 0.1)",
              marginBottom: "5rem",
              position: "relative",
              overflow: "hidden",
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
                  <Sparkles size={12} />
                  AI Essay Evaluator
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
                  Get Instantly Graded on Grammatical Coherence & CLB Levels
                </h3>
                <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "2rem" }}>
                  Write your responses directly into our interactive dashboard editor and receive real-time, detailed corrections. Our platform checks vocabulary diversity, spelling mistakes, logical coherence, and projects your official CLB level score instantly.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <CheckCircle size={16} color="hsl(var(--accent))" />
                    <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>Detailed Error Explanations</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <CheckCircle size={16} color="hsl(var(--accent))" />
                    <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>Vocabulary Enhancers</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <CheckCircle size={16} color="hsl(var(--accent))" />
                    <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>CLB 7 - CLB 10 Mapping</span>
                  </div>
                </div>
              </div>
              <div style={{ flex: "1 1 280px", display: "flex", justifyContent: "center" }}>
                <Link
                  href="/login"
                  className="btn-primary"
                  style={{ padding: "1rem 2rem", fontSize: "1rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
                >
                  Try AI Correction
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>

          {/* Recent written topics */}
          <div style={{ marginBottom: "4rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem", marginBottom: "2.5rem" }}>
              <div>
                <h2 style={{ fontSize: "1.75rem", fontFamily: "Outfit, sans-serif", fontWeight: 800, marginBottom: "0.25rem" }}>
                  Recent Essay Prompts
                </h2>
                <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.9rem" }}>
                  Practice with real exam topics sourced directly from recent TCF Canada exam sessions.
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
                Browse All Prompts &rarr;
              </Link>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "1.5rem" }}>
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

          {/* Practice Simulation CTA */}
          <div style={{ textAlign: "center", borderTop: "1px solid hsl(var(--border))", paddingTop: "4rem" }}>
            <h3 style={{ fontSize: "1.5rem", fontFamily: "Outfit, sans-serif", fontWeight: 800, marginBottom: "0.75rem" }}>
              Ready to write under realistic exam conditions?
            </h3>
            <p style={{ color: "hsl(var(--text-secondary))", maxWidth: "600px", margin: "0 auto 2rem", fontSize: "0.95rem" }}>
              Launch a full written expression simulator with a ticking timer, word count tracking, and immediate AI evaluations.
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
              Start Written Simulator
            </Link>
          </div>

        </div>
      </div>
    </PublicLayout>
  );
}
