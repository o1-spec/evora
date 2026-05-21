"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ExamSectionCardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
  points?: string[];
  number?: string | number;
}

export default function ExamSectionCard({
  title,
  description,
  icon: Icon,
  iconColor = "hsl(var(--primary))",
  iconBgColor = "hsl(var(--primary-light))",
  points,
  number,
}: ExamSectionCardProps) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="card"
      style={{
        padding: "1.75rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        height: "100%",
        backgroundColor: "white",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        {Icon ? (
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "0.75rem",
              backgroundColor: iconBgColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={20} color={iconColor} />
          </div>
        ) : number !== undefined ? (
          <div
            style={{
              fontFamily: "Outfit, sans-serif",
              fontSize: "1.5rem",
              fontWeight: 800,
              color: "hsl(var(--primary))",
              opacity: 0.4,
            }}
          >
            {number}
          </div>
        ) : null}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <h3
          style={{
            fontSize: "1.125rem",
            fontFamily: "Outfit, sans-serif",
            fontWeight: 700,
            color: "hsl(var(--text-primary))",
          }}
        >
          {title}
        </h3>
        <p style={{ fontSize: "0.875rem", color: "hsl(var(--text-secondary))", lineHeight: 1.55 }}>
          {description}
        </p>
      </div>

      {points && points.length > 0 && (
        <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem", paddingLeft: "1.25rem", margin: 0 }}>
          {points.map((pt, idx) => (
            <li
              key={idx}
              style={{
                fontSize: "0.825rem",
                color: "hsl(var(--text-secondary))",
                lineHeight: 1.45,
              }}
            >
              {pt}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
