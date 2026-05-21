"use client";

import { motion } from "framer-motion";
import { ArrowRight, Tag, Bookmark } from "lucide-react";
import Link from "next/link";

interface TopicCardProps {
  title: string;
  category: string;
  clbLevel: string;
  difficulty: "Easy" | "Medium" | "Hard" | string;
  views?: number;
  timeLimit?: string;
  practiceLink?: string;
}

export default function TopicCard({
  title,
  category,
  clbLevel,
  difficulty,
  views = 120,
  timeLimit,
  practiceLink = "/login",
}: TopicCardProps) {
  const getDifficultyColor = (diff: string) => {
    switch (diff.toLowerCase()) {
      case "easy":
        return { bg: "rgba(34, 197, 94, 0.08)", text: "rgb(34, 197, 94)" };
      case "hard":
        return { bg: "rgba(239, 68, 68, 0.08)", text: "rgb(239, 68, 68)" };
      default:
        return { bg: "rgba(249, 115, 22, 0.08)", text: "rgb(249, 115, 22)" };
    }
  };

  const diffColors = getDifficultyColor(difficulty);

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="card"
      style={{
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        backgroundColor: "white",
        gap: "1.25rem",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {/* Card Header Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
          <span
            style={{
              padding: "0.2rem 0.6rem",
              borderRadius: "0.25rem",
              fontSize: "0.7rem",
              fontWeight: 700,
              backgroundColor: "hsl(var(--primary-light))",
              color: "hsl(var(--primary))",
              textTransform: "uppercase",
            }}
          >
            {clbLevel}
          </span>
          <span
            style={{
              padding: "0.2rem 0.6rem",
              borderRadius: "0.25rem",
              fontSize: "0.7rem",
              fontWeight: 700,
              backgroundColor: diffColors.bg,
              color: diffColors.text,
              textTransform: "uppercase",
            }}
          >
            {difficulty}
          </span>
          {timeLimit && (
            <span
              style={{
                fontSize: "0.7rem",
                color: "hsl(var(--text-secondary))",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              • {timeLimit}
            </span>
          )}
        </div>

        {/* Card Title */}
        <h4
          style={{
            fontSize: "1rem",
            fontFamily: "Outfit, sans-serif",
            fontWeight: 700,
            color: "hsl(var(--text-primary))",
            lineHeight: 1.4,
          }}
        >
          {title}
        </h4>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid hsl(var(--border))",
          paddingTop: "1rem",
          marginTop: "0.5rem",
        }}
      >
        <span
          style={{
            fontSize: "0.75rem",
            color: "hsl(var(--text-muted))",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.25rem",
          }}
        >
          <Tag size={12} />
          {category}
        </span>

        <Link
          href={practiceLink}
          style={{
            fontSize: "0.825rem",
            fontWeight: 700,
            color: "hsl(var(--primary))",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.25rem",
            transition: "gap 0.2s",
          }}
          onMouseOver={(e) => {
            const svg = e.currentTarget.querySelector("svg");
            if (svg) svg.style.transform = "translateX(3px)";
          }}
          onMouseOut={(e) => {
            const svg = e.currentTarget.querySelector("svg");
            if (svg) svg.style.transform = "translateX(0)";
          }}
        >
          Start Practice
          <ArrowRight size={14} style={{ transition: "transform 0.2s" }} />
        </Link>
      </div>
    </motion.div>
  );
}
