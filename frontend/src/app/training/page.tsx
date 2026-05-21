"use client";

import Link from "next/link";
import { Book, CheckCircle, Award, Sparkles, BookOpen, Layers, Languages, HelpCircle } from "lucide-react";
import PublicLayout from "@/components/portal/PublicLayout";
import PublicPageHero from "@/components/portal/PublicPageHero";
import AcademyLevelsSection from "@/components/portal/AcademyLevelsSection";
import QuickAccessMenu from "@/components/portal/QuickAccessMenu";

export default function TrainingPage() {
  const learningPillars = [
    {
      title: "1. Core Lessons & Modules",
      desc: "Interactive video modules and detailed written guidebooks explaining exam targets, timing, and formatting.",
      icon: Layers,
      color: "hsl(var(--primary))"
    },
    {
      title: "2. Focused Grammar Guides",
      desc: "Master key complex French grammar points including subjunctive, conditional clauses, relative pronouns, and active/passive transitions.",
      icon: Book,
      color: "#8b5cf6"
    },
    {
      title: "3. Curated Vocabulary Logs",
      desc: "Expand your French lexicons with target thematic word sheets covering immigration, work, technology, environment, and culture.",
      icon: Languages,
      color: "#10b981"
    },
    {
      title: "4. Interactive Practice Exercises",
      desc: "Instant multiple-choice quizzes, reading text fillers, and auditory questions matched exactly with CEFR scoring standard criteria.",
      icon: HelpCircle,
      color: "#f97316"
    }
  ];

  return (
    <PublicLayout>
      <PublicPageHero
        title="Complete French Training"
        subtitle="Step-by-step curriculum from A1 to C2 designed to expand vocabulary, refine advanced grammar, and secure maximum CLB exam grades."
        badge="Course Catalog"
        badgeColor="hsl(var(--accent))"
        accentIcon={<BookOpen size={12} />}
      />

      {/* Quick Access Menu Row below navbar */}
      <QuickAccessMenu />

      {/* Core Catalog Levels Listing */}
      <AcademyLevelsSection />

      {/* Structured learning pillars */}
      <div style={{ backgroundColor: "hsl(var(--bg-base))", borderTop: "1px solid hsl(var(--border))", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "hsl(var(--primary))", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Our Pedagogical Pillars
            </span>
            <h2 style={{ fontSize: "2rem", fontFamily: "Outfit, sans-serif", fontWeight: 800, marginTop: "0.5rem" }}>
              How Our Training Leads to Success
            </h2>
            <p style={{ color: "hsl(var(--text-secondary))", maxWidth: "600px", margin: "0.5rem auto 0", fontSize: "0.95rem" }}>
              Each CEFR course level contains a dedicated, rigorous set of learning components structured to guarantee real results.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "2rem", marginBottom: "4rem" }}>
            {learningPillars.map((pillar, i) => (
              <div
                key={i}
                className="card"
                style={{
                  padding: "1.75rem",
                  backgroundColor: "white",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "0.5rem",
                    backgroundColor: "hsl(var(--bg-base))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <pillar.icon size={20} color={pillar.color} />
                </div>
                <h3 style={{ fontSize: "1.05rem", fontFamily: "Outfit, sans-serif", fontWeight: 700 }}>
                  {pillar.title}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "hsl(var(--text-secondary))", lineHeight: 1.55 }}>
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Catalog CTA banner */}
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "1rem",
              padding: "2.5rem",
              border: "1px solid hsl(var(--border))",
              textAlign: "center",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            <h3 style={{ fontSize: "1.35rem", fontFamily: "Outfit, sans-serif", fontWeight: 800, marginBottom: "0.5rem" }}>
              Ready to access modules and lessons?
            </h3>
            <p style={{ color: "hsl(var(--text-secondary))", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
              Create a free account or login to access A1-C2 level exercises, lessons, and AI evaluations.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
              <Link href="/register" className="btn-primary" style={{ padding: "0.6rem 1.75rem", fontSize: "0.9rem" }}>
                Sign Up for Free
              </Link>
              <Link href="/login" className="btn-secondary" style={{ padding: "0.6rem 1.75rem", fontSize: "0.9rem" }}>
                Login to Account
              </Link>
            </div>
          </div>

        </div>
      </div>
    </PublicLayout>
  );
}
