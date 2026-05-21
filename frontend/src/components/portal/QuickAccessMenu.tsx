"use client";

import Link from "next/link";
import { TrendingUp, FileText, Info, Mic, Headphones, BookOpen, Sparkles } from "lucide-react";

const QUICK_ITEMS = [
  {
    label: "Résultat",
    desc: "Vos scores",
    icon: TrendingUp,
    color: "#3b82f6", // Blue
    border: "2px solid #3b82f6",
    href: "/dashboard/progress",
  },
  {
    label: "YouTube",
    desc: "Cours vidéo",
    svg: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="#ef4444">
        <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11C4.483 20.455 12 20.455 12 20.455s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    border: "2px solid #ef4444",
    href: "https://youtube.com",
    external: true,
  },
  {
    label: "E.E",
    desc: "Ecrit",
    icon: FileText,
    color: "#f97316", // Orange
    border: "2px solid #f97316",
    href: "#skills",
  },
  {
    label: "Infos",
    desc: "Le guide TCF",
    icon: Info,
    color: "#0ea5e9", // Sky blue
    border: "2px solid #0ea5e9",
    href: "#skills",
  },
  {
    label: "E.O",
    desc: "Oral",
    icon: Mic,
    color: "#f97316", // Orange
    border: "2px solid #f97316",
    href: "#skills",
  },
  {
    label: "C.O",
    desc: "Audios",
    icon: Headphones,
    color: "#3b82f6", // Blue
    border: "2px solid #3b82f6",
    href: "#skills",
  },
  {
    label: "C.E",
    desc: "Textes",
    icon: BookOpen,
    color: "#3b82f6", // Blue
    border: "2px solid #3b82f6",
    href: "#skills",
  },
  {
    label: "Nouveauté",
    desc: "Mises à jour",
    icon: Sparkles,
    color: "#8b5cf6", // Purple
    border: "2px solid #8b5cf6",
    href: "#academy",
  },
  {
    label: "WhatsApp",
    desc: "Assistance",
    svg: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="#25d366">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.458L0 24zm6.59-4.846c1.6.95 3.197 1.45 4.817 1.451 5.433 0 9.851-4.407 9.854-9.842.002-2.634-1.02-5.11-2.88-6.974-1.86-1.865-4.332-2.891-6.97-2.892-5.44 0-9.858 4.41-9.862 9.845-.002 1.83.476 3.618 1.385 5.183l-.99 3.616 3.7-.971zm10.743-6.993c-.272-.136-1.61-.795-1.86-.886-.25-.092-.432-.136-.613.136-.182.273-.705.886-.863 1.068-.159.182-.318.205-.59.069-.272-.136-1.15-.424-2.19-1.353-.809-.722-1.355-1.614-1.514-1.886-.159-.273-.017-.42.119-.556.122-.122.272-.318.408-.477.136-.159.182-.273.272-.455.09-.182.046-.341-.023-.477-.069-.136-.613-1.477-.84-2.023-.222-.534-.447-.463-.613-.471-.159-.008-.341-.01-.523-.01s-.477.068-.727.341c-.25.273-.954.932-.954 2.273 0 1.341.977 2.636 1.114 2.818.137.182 1.92 2.932 4.653 4.114.65.281 1.157.449 1.552.574.653.207 1.248.178 1.717.108.523-.078 1.61-.659 1.838-1.295.227-.637.227-1.182.159-1.295-.068-.113-.25-.182-.523-.318z" />
      </svg>
    ),
    border: "2px solid #25d366",
    href: "https://wa.me/message/TCF_CANADA",
    external: true,
  },
];

export default function QuickAccessMenu() {
  return (
    <section style={{ backgroundColor: "#ffffff" }} className="py-8 border-b border-slate-100">
      <div className="container-max">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "2.5rem 1.5rem",
          }}
        >
          {QUICK_ITEMS.map((item) => {
            const isExternal = item.external;
            const content = (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                  width: "5.5rem",
                  transition: "transform 0.2s",
                }}
                className="hover:scale-105"
              >
                {/* Circular Button Wrapper */}
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: item.border,
                    backgroundColor: "white",
                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.03), 0 2px 4px -1px rgba(0,0,0,0.02)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {item.svg ? (
                    item.svg
                  ) : item.icon ? (
                    <item.icon size={22} color={item.color} />
                  ) : null}
                </div>
                {/* Labels */}
                <span
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    color: "hsl(var(--text-primary))",
                    textAlign: "center",
                    lineHeight: 1.1,
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    fontSize: "0.6875rem",
                    color: "hsl(var(--text-secondary))",
                    textAlign: "center",
                    marginTop: "0.15rem",
                  }}
                >
                  {item.desc}
                </span>
              </div>
            );

            if (isExternal) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  {content}
                </a>
              );
            }

            return (
              <Link key={item.label} href={item.href} style={{ textDecoration: "none" }}>
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
