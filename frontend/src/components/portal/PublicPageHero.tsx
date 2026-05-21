"use client";

import { motion } from "framer-motion";

interface PublicPageHeroProps {
  title: string;
  subtitle: string;
  badge?: string;
  badgeColor?: string;
  accentIcon?: React.ReactNode;
}

export default function PublicPageHero({
  title,
  subtitle,
  badge,
  badgeColor = "hsl(var(--primary))",
  accentIcon,
}: PublicPageHeroProps) {
  return (
    <section
      style={{
        position: "relative",
        padding: "3.5rem 1.5rem",
        backgroundColor: "hsl(var(--primary-light))",
        borderBottom: "1px solid hsl(var(--border))",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Background graphics: Canadian Maple outline silhouette */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "450px",
          height: "450px",
          opacity: 0.05,
          color: "hsl(var(--primary))",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
        </svg>
      </div>

      {/* Decorative Blur Bubble */}
      <div
        style={{
          position: "absolute",
          bottom: "-50px",
          left: "10%",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background: "radial-gradient(circle, hsla(221, 83%, 53%, 0.08) 0%, transparent 70%)",
          filter: "blur(20px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          width: "100%",
          position: "relative",
          zIndex: 2,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ maxWidth: "800px" }}
        >
          {badge && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                padding: "0.3rem 0.85rem",
                borderRadius: "999px",
                fontSize: "0.75rem",
                fontWeight: 700,
                backgroundColor: "white",
                color: badgeColor,
                boxShadow: "0 2px 4px rgba(59, 130, 246, 0.04)",
                border: `1px solid rgba(59, 130, 246, 0.1)`,
                marginBottom: "1rem",
              }}
            >
              {accentIcon && <span style={{ display: "inline-flex", flexShrink: 0 }}>{accentIcon}</span>}
              {badge}
            </span>
          )}

          <h1
            style={{
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontFamily: "Outfit, sans-serif",
              fontWeight: 800,
              color: "hsl(var(--text-primary))",
              lineHeight: 1.15,
              marginBottom: "0.75rem",
            }}
          >
            {title}
          </h1>

          <p
            style={{
              fontSize: "clamp(0.95rem, 2.2vw, 1.125rem)",
              color: "hsl(var(--text-secondary))",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
