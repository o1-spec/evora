"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mic, Sparkles, CheckCircle, ArrowRight, PlayCircle, Volume2 } from "lucide-react";
import PublicLayout from "@/components/portal/PublicLayout";
import PublicPageHero from "@/components/portal/PublicPageHero";
import ExamSectionCard from "@/components/portal/ExamSectionCard";
import TopicCard from "@/components/portal/TopicCard";
import { useAuthStore } from "@/store/useAuthStore";
import TrainingSeriesGrid from "@/components/portal/TrainingSeriesGrid";

export default function OralExpressionPage() {
  const { isAuthenticated } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted && isAuthenticated) {
    return <TrainingSeriesGrid sectionType="SPEAKING" title="TCF Canada Oral Expression" />;
  }

  const tasks = [
    {
      number: 1,
      title: "Task 1: Directed Interview / Entretien dirigé",
      description: "Introduce yourself and talk about your life, habits, family, professional background, or leisure activities without preparation.",
      points: [
        "Duration: 2 minutes",
        "Preparation: None",
        "Key strategy: Speak naturally, use diverse past/present/future tenses, and keep a continuous flow."
      ]
    },
    {
      number: 2,
      title: "Task 2: Information Gathering / Exercice en interaction",
      description: "Ask questions to the examiner (who roleplays a service provider or acquaintance) based on a short document prompt to make plans or get details.",
      points: [
        "Duration: 3.5 minutes speaking",
        "Preparation: 2 minutes",
        "Key strategy: Formulate varied questions (inversion, 'est-ce que', formal/informal registers) showing curiosity."
      ]
    },
    {
      number: 3,
      title: "Task 3: Argued Opinion / Monologue suivi",
      description: "Express your structured opinion on a general, controversial societal question based on a short citation prompt.",
      points: [
        "Duration: 4.5 minutes speaking",
        "Preparation: None",
        "Key strategy: Present a clear thesis. Support your points with concrete personal or public examples."
      ]
    }
  ];

  const recentTopics = [
    {
      title: "Task 1: Décrivez votre ville d'origine et ce que vous préférez y faire le week-end.",
      category: "Oral Task 1",
      clbLevel: "CLB 5 Target",
      difficulty: "Easy",
      timeLimit: "2 min"
    },
    {
      title: "Task 2: Votre ami vend son appartement. Posez-lui des questions pour obtenir des détails.",
      category: "Oral Task 2",
      clbLevel: "CLB 7 Target",
      difficulty: "Medium",
      timeLimit: "3.5 min"
    },
    {
      title: "Task 3: Estimez-vous que les livres physiques vont disparaître au profit du tout-numérique?",
      category: "Oral Task 3",
      clbLevel: "CLB 9 Target",
      difficulty: "Hard",
      timeLimit: "4.5 min"
    }
  ];

  return (
    <PublicLayout>
      <PublicPageHero
        title="TCF Canada Oral Expression"
        subtitle="Perfect your spoken French with real-time simulated interviews, voice recording diagnostics, and automated pronunciation evaluations designed for success."
        badge="Expression Orale"
        badgeColor="#f97316"
        accentIcon={<Mic size={12} />}
      />

      {/* Main Section Content */}
      <div style={{ backgroundColor: "#ffffff", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", width: "100%" }}>
          
          {/* Speaking Methodology */}
          <div style={{ marginBottom: "5rem" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h2 style={{ fontSize: "2rem", fontFamily: "Outfit, sans-serif", fontWeight: 800, marginBottom: "0.5rem" }}>
                Speaking Tasks & Methodology
              </h2>
              <p style={{ color: "hsl(var(--text-secondary))", maxWidth: "600px", margin: "0 auto" }}>
                Discover the three steps of the oral exam and master their preparation rules to avoid blank moments.
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

          {/* AI Voice Recording CTA */}
          <div
            style={{
              backgroundColor: "hsla(24, 95%, 50%, 0.04)",
              borderRadius: "1.5rem",
              padding: "3rem 2rem",
              border: "1px solid rgba(249, 115, 22, 0.15)",
              marginBottom: "5rem",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "3rem" }}>
              <div style={{ flex: "2 1 480px" }}>
                <span
                  style={{
                    backgroundColor: "white",
                    color: "#f97316",
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
                  Speech-to-Text Analytics
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
                  Record Your Answer and View Full Transcript and Corrections
                </h3>
                <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "2rem" }}>
                  Speak directly into your microphone inside our state-of-the-art simulator. Our intelligent speech engine transcribes your response, flags grammatical hesitation gaps, highlights mispronounced vocabulary, and offers native audio comparisons.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <CheckCircle size={16} color="#f97316" />
                    <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>Pronunciation Accent Feedback</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <CheckCircle size={16} color="#f97316" />
                    <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>Speech Fluency Tracking</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <CheckCircle size={16} color="#f97316" />
                    <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>Vocabulary Alternative Suggestions</span>
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
                    backgroundColor: "#f97316",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#ea580c")}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#f97316")}
                >
                  Start Speaking Practice
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>

          {/* Pronunciation tips section */}
          <div
            style={{
              padding: "2.5rem 1.75rem",
              borderRadius: "1rem",
              backgroundColor: "hsl(var(--bg-base))",
              border: "1px solid hsl(var(--border))",
              marginBottom: "5rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <Volume2 size={24} color="#f97316" />
              <h3 style={{ fontSize: "1.25rem", fontFamily: "Outfit, sans-serif", fontWeight: 800 }}>
                Pronunciation Tips for CLB 9+
              </h3>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "2rem" }}>
              <div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.4rem" }}>French Liaisons</h4>
                <p style={{ fontSize: "0.85rem", color: "hsl(var(--text-secondary))", lineHeight: 1.5 }}>
                  Always connect silent final consonants to the initial vowels of the following word (e.g. "ils ont" [il-zõ], "nous avons" [nu-zavõ]). This improves your syntax score.
                </p>
              </div>
              <div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.4rem" }}>Intonation & Stress</h4>
                <p style={{ fontSize: "0.85rem", color: "hsl(var(--text-secondary))", lineHeight: 1.5 }}>
                  French words are stressed strictly on the last syllable of a rhythmic group. Never stress the beginning of words. Rise in pitch for questions and fall for statements.
                </p>
              </div>
              <div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.4rem" }}>Vowel Rounding</h4>
                <p style={{ fontSize: "0.85rem", color: "hsl(var(--text-secondary))", lineHeight: 1.5 }}>
                  Clear, rounded vowel production (like [u], [y], and [ø]) is critical. Emphasize standard nasal sounds [ã], [õ], [ɛ̃] to ensure speech engine clarity.
                </p>
              </div>
            </div>
          </div>

          {/* Recent oral topics */}
          <div style={{ marginBottom: "4rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem", marginBottom: "2.5rem" }}>
              <div>
                <h2 style={{ fontSize: "1.75rem", fontFamily: "Outfit, sans-serif", fontWeight: 800, marginBottom: "0.25rem" }}>
                  Recent Speaking Topics
                </h2>
                <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.9rem" }}>
                  Read actual examiner prompts and roleplay situations shared by recent test takers.
                </p>
              </div>
              <Link
                href="/login"
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: "#f97316",
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

          {/* Start oral simulation button */}
          <div style={{ textAlign: "center", borderTop: "1px solid hsl(var(--border))", paddingTop: "4rem" }}>
            <h3 style={{ fontSize: "1.5rem", fontFamily: "Outfit, sans-serif", fontWeight: 800, marginBottom: "0.75rem" }}>
              Launch Your Interactive Spoken Interview Simulation
            </h3>
            <p style={{ color: "hsl(var(--text-secondary))", maxWidth: "600px", margin: "0 auto 2rem", fontSize: "0.95rem" }}>
              Practice speaking under standard TCF time limits with custom roleplay cards, real-time microphone testing, and AI evaluations.
            </p>
            <Link
              href="/login"
              className="btn-primary"
              style={{
                padding: "1rem 2.5rem",
                borderRadius: "0.75rem",
                fontSize: "1rem",
                fontWeight: 700,
                backgroundColor: "#f97316",
                boxShadow: "0 10px 15px -3px rgba(249, 115, 22, 0.2)",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#ea580c")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#f97316")}
            >
              Start Oral Simulator
            </Link>
          </div>

        </div>
      </div>
    </PublicLayout>
  );
}
