"use client";

import { useState } from "react";
import { MessageSquare, Mail, Phone, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactCTA() {
  const [showBubble, setShowBubble] = useState(true);

  const handleWhatsAppClick = () => {
    // Open a realistic WhatsApp chat link
    window.open("https://wa.me/33600000000?text=Bonjour,%20je%20souhaite%20en%20savoir%20plus%20sur%20les%20préparations%20au%20TCF%20Canada.", "_blank");
  };

  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-20" style={{ backgroundColor: "#ffffff", borderTop: "1px solid hsl(var(--border))" }}>
        <div className="container-max" style={{ maxWidth: "1000px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "3rem",
              alignItems: "center",
            }}
          >
            {/* Left Column: Context */}
            <div>
              <span
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: "hsl(var(--primary))",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                UN CONSEILLER À VOTRE ÉCOUTE
              </span>
              <h2
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 2.25rem)",
                  marginTop: "0.5rem",
                  marginBottom: "1.25rem",
                  lineHeight: 1.2,
                }}
              >
                Besoin d'aide pour choisir votre formation ?
              </h2>
              <p
                style={{
                  fontSize: "1rem",
                  color: "hsl(var(--text-secondary))",
                  lineHeight: 1.6,
                  marginBottom: "2rem",
                }}
              >
                Nos conseillers pédagogiques vous accompagnent pour définir le meilleur parcours de révision selon votre niveau actuel et vos objectifs d'immigration express au Canada.
              </p>

              {/* Direct channels */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      backgroundColor: "rgba(16, 185, 129, 0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MessageSquare size={20} color="#10b981" />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.8rem", color: "hsl(var(--text-secondary))", fontWeight: 500 }}>WhatsApp Direct</div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "hsl(var(--text-primary))" }}>+33 6 00 00 00 00</div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      backgroundColor: "rgba(59, 130, 246, 0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Mail size={20} color="hsl(var(--primary))" />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.8rem", color: "hsl(var(--text-secondary))", fontWeight: 500 }}>Email de support</div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "hsl(var(--text-primary))" }}>contact@evora-tcf.com</div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      backgroundColor: "rgba(100, 116, 139, 0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Phone size={20} color="hsl(var(--text-secondary))" />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.8rem", color: "hsl(var(--text-secondary))", fontWeight: 500 }}>Appel gratuit</div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "hsl(var(--text-primary))" }}>Lun - Ven, 9h à 18h</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: CTA Box */}
            <div
              style={{
                backgroundColor: "hsl(var(--bg-base))",
                borderRadius: "1.25rem",
                padding: "2.5rem 2rem",
                border: "1px solid hsl(var(--border))",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  backgroundColor: "#25D366", // WhatsApp Green
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem",
                  boxShadow: "0 10px 15px -3px rgba(37, 211, 102, 0.3)",
                }}
              >
                <MessageSquare size={32} fill="white" color="white" />
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "0.75rem", color: "hsl(var(--text-primary))" }}>
                Discutez avec nous sur WhatsApp
              </h3>
              <p style={{ fontSize: "0.9rem", color: "hsl(var(--text-secondary))", lineHeight: 1.5, marginBottom: "2rem" }}>
                Obtenez une réponse instantanée de l'un de nos tuteurs. Nous répondons en moins de 10 minutes en moyenne.
              </p>

              <button
                onClick={handleWhatsAppClick}
                style={{
                  width: "100%",
                  padding: "0.9rem 1.5rem",
                  borderRadius: "0.75rem",
                  backgroundColor: "#25D366",
                  color: "white",
                  border: "none",
                  fontWeight: 700,
                  fontSize: "1rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  boxShadow: "0 4px 6px -1px rgba(37, 211, 102, 0.2)",
                  transition: "background-color 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#20ba5a")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#25D366")}
              >
                Lancer la discussion
                <ArrowRight size={18} />
              </button>

              <span
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  color: "hsl(var(--text-secondary))",
                  marginTop: "1rem",
                  fontWeight: 500,
                }}
              >
                Service 100% gratuit • Disponible sur Mobile et Web
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Widget (Bottom Right) */}
      <div
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          zIndex: 100,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "0.5rem",
          pointerEvents: "none", // Prevent overlay blocking click
        }}
      >
        <AnimatePresence>
          {showBubble && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              style={{
                backgroundColor: "white",
                borderRadius: "1rem",
                padding: "0.85rem 1.25rem",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
                border: "1px solid hsl(var(--border))",
                position: "relative",
                maxWidth: "260px",
                pointerEvents: "auto", // Allow clicking inside bubble
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowBubble(false)}
                style={{
                  position: "absolute",
                  top: "0.35rem",
                  right: "0.35rem",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "hsl(var(--text-muted))",
                  padding: "0.15rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X size={12} />
              </button>

              {/* Text */}
              <div style={{ paddingRight: "0.5rem" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "hsl(var(--primary))", textTransform: "uppercase", display: "block", marginBottom: "0.15rem" }}>
                  TUTEUR EN LIGNE
                </span>
                <p style={{ fontSize: "0.85rem", color: "hsl(var(--text-primary))", margin: 0, fontWeight: 500, lineHeight: 1.4 }}>
                  Bonjour ! Une question sur nos préparations TCF Canada ? Écrivez-nous !
                </p>
              </div>

              {/* Speech bubble arrow */}
              <div
                style={{
                  position: "absolute",
                  bottom: "-6px",
                  right: "20px",
                  width: "12px",
                  height: "12px",
                  backgroundColor: "white",
                  borderRight: "1px solid hsl(var(--border))",
                  borderBottom: "1px solid hsl(var(--border))",
                  transform: "rotate(45deg)",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Button */}
        <button
          onClick={handleWhatsAppClick}
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            backgroundColor: "#25D366",
            border: "none",
            color: "white",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 10px rgba(37, 211, 102, 0.4), 0 2px 4px rgba(0, 0, 0, 0.05)",
            pointerEvents: "auto",
            transition: "transform 0.2s, background-color 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "scale(1.08)";
            e.currentTarget.style.backgroundColor = "#20ba5a";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.backgroundColor = "#25D366";
          }}
        >
          <MessageSquare size={26} fill="white" color="white" />
        </button>
      </div>
    </>
  );
}
