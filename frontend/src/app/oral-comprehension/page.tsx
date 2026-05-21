"use client";

import Link from "next/link";
import { Headphones, Sparkles, CheckCircle, ArrowRight, Music, AlertCircle } from "lucide-react";
import PublicLayout from "@/components/portal/PublicLayout";
import PublicPageHero from "@/components/portal/PublicPageHero";
import ExamSectionCard from "@/components/portal/ExamSectionCard";
import TopicCard from "@/components/portal/TopicCard";

export default function OralComprehensionPage() {
  const levels = [
    {
      number: "CLB 4 - 5",
      title: "Announcements & Conversations",
      description: "Understand simple, slow, clear public announcements and short private dialogue exchanges.",
      points: [
        "Audio Type: Loudspeaker calls, basic voice messages",
        "Key Strategy: Focus on key nouns, verbs, numbers, and basic actions",
        "Difficulty: Easy"
      ]
    },
    {
      number: "CLB 6 - 7",
      title: "Radio Broadcasts & News",
      description: "Understand news items, radio weather warnings, reviews, or basic phone summaries about recent events.",
      points: [
        "Audio Type: News bulletins, brief public surveys",
        "Key Strategy: Follow transitions, logical connectives, and narrative flows",
        "Difficulty: Medium"
      ]
    },
    {
      number: "CLB 8 - 10",
      title: "Scientific & Philosophical Debates",
      description: "Follow rapid speech, detailed arguments, scientific lectures, or political talk-shows without difficulty.",
      points: [
        "Audio Type: Complex panel shows, specialized interviews",
        "Key Strategy: Learn to filter background noise and recognize subtle expressions",
        "Difficulty: Hard"
      ]
    }
  ];

  const recentTopics = [
    {
      title: "CLB 5: Comprendre une annonce de retard dans une gare ferroviaire canadienne.",
      category: "Listening Section A",
      clbLevel: "CLB 5 Target",
      difficulty: "Easy",
      timeLimit: "39 Questions Total"
    },
    {
      title: "CLB 7: Suivre un court reportage radio sur les activités culturelles à Montréal.",
      category: "Listening Section B",
      clbLevel: "CLB 7 Target",
      difficulty: "Medium",
      timeLimit: "39 Questions Total"
    },
    {
      title: "CLB 9: Comprendre une discussion d'experts sur l'impact de l'intelligence artificielle sur l'emploi.",
      category: "Listening Section C",
      clbLevel: "CLB 9 Target",
      difficulty: "Hard",
      timeLimit: "39 Questions Total"
    }
  ];

  return (
    <PublicLayout>
      <PublicPageHero
        title="TCF Canada Oral Comprehension"
        subtitle="Train your ear for natural, rapid spoken French and learn to answer 39 audio multiple-choice questions without hesitation."
        badge="Compréhension Orale"
        badgeColor="#3b82f6"
        accentIcon={<Headphones size={12} />}
      />

      {/* Main Section Content */}
      <div style={{ backgroundColor: "#ffffff", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", width: "100%" }}>
          
          {/* Listening Practice & Question Types */}
          <div style={{ marginBottom: "5rem" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h2 style={{ fontSize: "2rem", fontFamily: "Outfit, sans-serif", fontWeight: 800, marginBottom: "0.5rem" }}>
                Listening Exercise Types & CLB Levels
              </h2>
              <p style={{ color: "hsl(var(--text-secondary))", maxWidth: "600px", margin: "0 auto" }}>
                The oral comprehension test consists of 39 multiple-choice questions designed to test your parsing speed of native spoken French.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: "2rem" }}>
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

          {/* Audio Exercises Description CTA */}
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
                  <Music size={12} />
                  Native Audio Exercises
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
                  Train with High-Fidelity Audio Tracks and Speech Syncing
                </h3>
                <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "2rem" }}>
                  The TCF Oral Comprehension tracks are only played once, leaving no room for distraction. Our simulator lets you play official audio materials, answer multiple-choice options under realistic timing, and view text transcriptions alongside comprehensive score dashboards.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <CheckCircle size={16} color="hsl(var(--primary))" />
                    <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>Authentic Accent Variants</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <CheckCircle size={16} color="hsl(var(--primary))" />
                    <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>Ticking Countdown Timers</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <CheckCircle size={16} color="hsl(var(--primary))" />
                    <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>Full Transcript Overlays</span>
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
                  Try Audio Exercises
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>

          {/* Practice items list */}
          <div style={{ marginBottom: "4rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem", marginBottom: "2.5rem" }}>
              <div>
                <h2 style={{ fontSize: "1.75rem", fontFamily: "Outfit, sans-serif", fontWeight: 800, marginBottom: "0.25rem" }}>
                  Listening Comprehension Exercises
                </h2>
                <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.9rem" }}>
                  Practice audios with instant MCQ feedback designed for different CEFR levels.
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
                Browse All Audio Tasks &rarr;
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

          {/* Start listening test button */}
          <div style={{ textAlign: "center", borderTop: "1px solid hsl(var(--border))", paddingTop: "4rem" }}>
            <h3 style={{ fontSize: "1.5rem", fontFamily: "Outfit, sans-serif", fontWeight: 800, marginBottom: "0.75rem" }}>
              Launch Full Oral Comprehension Practice Test
            </h3>
            <p style={{ color: "hsl(var(--text-secondary))", maxWidth: "600px", margin: "0 auto 2rem", fontSize: "0.95rem" }}>
              Test your auditory comprehension of French speech with 39 randomized audio files and native multiple-choice questions.
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
              Start Listening Test
            </Link>
          </div>

        </div>
      </div>
    </PublicLayout>
  );
}
