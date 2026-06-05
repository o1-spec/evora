"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home, AlertTriangle, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to console or any analytics service
    console.error("Application error captured:", error);
  }, [error]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "4rem 1.5rem",
        backgroundColor: "hsl(var(--bg-base))",
        position: "relative",
        overflow: "hidden",
        fontFamily: "Inter, sans-serif",
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
          background: "radial-gradient(circle, hsla(0, 84%, 60%, 0.05) 0%, transparent 70%)",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "550px",
          width: "100%",
          textAlign: "center",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Animated Error Illustration Badge */}
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
            boxShadow: "0 10px 25px -5px rgba(239, 68, 68, 0.1), 0 8px 10px -6px rgba(239, 68, 68, 0.05)",
            color: "#ef4444",
            marginBottom: "2rem",
          }}
        >
          <AlertTriangle size={40} strokeWidth={1.5} />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
            fontWeight: 900,
            fontFamily: "Outfit, sans-serif",
            color: "hsl(var(--text-primary))",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            marginBottom: "1rem",
          }}
        >
          Oups ! Quelque chose s'est mal passé
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{
            fontSize: "1.025rem",
            color: "hsl(var(--text-secondary))",
            lineHeight: 1.6,
            marginBottom: "2rem",
            padding: "0 1.5rem",
          }}
        >
          Une erreur inattendue est survenue dans l'application. Nos équipes ont été alertées et travaillent à sa résolution.
        </motion.p>

        {/* Error Details Card */}
        {error.digest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            style={{
              display: "inline-block",
              margin: "0 auto 2rem auto",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              backgroundColor: "rgba(239, 68, 68, 0.04)",
              border: "1px solid rgba(239, 68, 68, 0.15)",
              color: "#ef4444",
              fontSize: "0.775rem",
              fontFamily: "monospace",
            }}
          >
            ID d'erreur : {error.digest}
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "2.5rem",
          }}
        >
          <button
            onClick={() => reset()}
            className="btn-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.85rem 1.75rem",
              borderRadius: "0.75rem",
              fontWeight: 600,
              fontSize: "0.95rem",
              cursor: "pointer",
              border: "none",
              boxShadow: "0 4px 12px rgba(139, 92, 246, 0.25)",
              width: "100%",
              maxWidth: "280px",
              justifyContent: "center",
            }}
          >
            <RefreshCw size={16} />
            Réessayer la page
          </button>

          <Link
            href="/"
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
              width: "100%",
              maxWidth: "280px",
              justifyContent: "center",
            }}
          >
            <Home size={16} />
            Retourner à l'accueil
          </Link>
        </motion.div>

        {/* Help Notice */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            padding: "1rem 1.5rem",
            backgroundColor: "white",
            borderRadius: "0.75rem",
            border: "1px solid hsl(var(--border))",
          }}
        >
          <HelpCircle size={16} color="hsl(var(--primary))" />
          <span style={{ fontSize: "0.825rem", color: "hsl(var(--text-secondary))", fontWeight: 500 }}>
            L'erreur persiste ? Contactez le support technique d'Évora.
          </span>
        </motion.div>
      </div>
    </div>
  );
}
