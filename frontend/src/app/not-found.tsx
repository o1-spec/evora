"use client";

import Link from "next/link";
import { ArrowLeft, Home, BookOpen, AlertCircle, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/useAuthStore";
import PublicLayout from "@/components/portal/PublicLayout";

export default function NotFound() {
  const { user } = useAuthStore();

  return (
    <PublicLayout>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          padding: "4rem 1.5rem",
          backgroundColor: "hsl(var(--bg-base))",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Decorative Blobs */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "5%",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "radial-gradient(circle, hsla(262, 83%, 58%, 0.08) 0%, transparent 70%)",
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "5%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, hsla(142, 71%, 45%, 0.06) 0%, transparent 70%)",
            filter: "blur(50px)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: "600px",
            width: "100%",
            textAlign: "center",
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* Animated 404 Illustration Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "90px",
              height: "90px",
              borderRadius: "2rem",
              backgroundColor: "white",
              border: "1px solid hsl(var(--border))",
              boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.1), 0 8px 10px -6px rgba(139, 92, 246, 0.05)",
              color: "hsl(var(--primary))",
              marginBottom: "2rem",
            }}
          >
            <AlertCircle size={40} strokeWidth={1.5} />
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: 900,
              fontFamily: "Outfit, sans-serif",
              color: "hsl(var(--text-primary))",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              marginBottom: "0.5rem",
            }}
          >
            404
          </motion.h1>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{
              fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
              fontWeight: 800,
              fontFamily: "Outfit, sans-serif",
              color: "hsl(var(--text-primary))",
              marginBottom: "1rem",
            }}
          >
            Page introuvable
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{
              fontSize: "1.05rem",
              color: "hsl(var(--text-secondary))",
              lineHeight: 1.6,
              marginBottom: "2.5rem",
              padding: "0 1rem",
            }}
          >
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée. Vous pouvez retourner à l'accueil ou explorer nos ressources pour le TCF Canada.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "3rem",
            }}
            className="flex-col sm:flex-row"
          >
            <Link
              href={user ? "/dashboard" : "/"}
              className="btn-primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.85rem 1.75rem",
                borderRadius: "0.75rem",
                fontWeight: 600,
                fontSize: "0.95rem",
                textDecoration: "none",
                boxShadow: "0 4px 12px rgba(139, 92, 246, 0.25)",
              }}
            >
              <Home size={16} />
              {user ? "Aller au tableau de bord" : "Retourner à l'accueil"}
            </Link>

            <Link
              href="/blog"
              className="btn-secondary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.85rem 1.75rem",
                borderRadius: "0.75rem",
                fontWeight: 600,
                fontSize: "0.95rem",
                textDecoration: "none",
                border: "1px solid hsl(var(--border))",
                backgroundColor: "white",
              }}
            >
              <BookOpen size={16} />
              Explorer l'Académie
            </Link>
          </motion.div>

          {/* Help Links Card */}
          <motion.div
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{
              backgroundColor: "white",
              border: "1px solid hsl(var(--border))",
              borderRadius: "1.25rem",
              padding: "1.5rem",
              textAlign: "left",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.03), 0 2px 4px -1px rgba(0, 0, 0, 0.01)",
            }}
          >
            <h3
              style={{
                fontSize: "0.95rem",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.75rem",
                color: "hsl(var(--text-primary))",
              }}
            >
              <HelpCircle size={16} color="hsl(var(--primary))" />
              Liens rapides utiles
            </h3>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: "0.75rem",
              }}
            >
              <li>
                <Link
                  href="/pricing"
                  style={{
                    fontSize: "0.875rem",
                    color: "hsl(var(--text-secondary))",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "hsl(var(--primary))")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "hsl(var(--text-secondary))")}
                >
                  → Offres & Tarifs
                </Link>
              </li>
              <li>
                <Link
                  href="/blog?category=Cheat Sheet"
                  style={{
                    fontSize: "0.875rem",
                    color: "hsl(var(--text-secondary))",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "hsl(var(--primary))")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "hsl(var(--text-secondary))")}
                >
                  → Fiches de révision
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  style={{
                    fontSize: "0.875rem",
                    color: "hsl(var(--text-secondary))",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "hsl(var(--primary))")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "hsl(var(--text-secondary))")}
                >
                  → Créer un compte
                </Link>
              </li>
              <li>
                <Link
                  href="/#pricing"
                  style={{
                    fontSize: "0.875rem",
                    color: "hsl(var(--text-secondary))",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "hsl(var(--primary))")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "hsl(var(--text-secondary))")}
                >
                  → FAQ Évora
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </PublicLayout>
  );
}
