"use client";

import Link from "next/link";
import { Check, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

const PLANS = [
  {
    name: "Gratuit",
    price: "0€",
    period: "gratuit à vie",
    desc: "Parfait pour découvrir la plateforme et commencer votre préparation au TCF.",
    features: [
      "Accès aux modules d'apprentissage A1 - A2",
      "1 Test blanc TCF Canada complet",
      "5 Évaluations d'Expression Écrite par IA / mois",
      "Accès au vocabulaire de base (200 mots)",
      "Suivi de progression standard",
    ],
    cta: "Commencer gratuitement",
    href: "/register",
    highlight: false,
    badge: null,
  },
  {
    name: "Premium",
    price: "29€",
    period: "par mois",
    desc: "Le choix idéal pour la majorité des candidats ciblant un score CLB 7 ou plus.",
    features: [
      "Accès complet de A1 à C2 (Académie complète)",
      "10 Tests blancs TCF Canada complets simulés",
      "100 Évaluations d'Expression Écrite par IA / mois",
      "Analyse de prononciation par IA (Expression Orale)",
      "Accès complet au vocabulaire (1 500+ mots)",
      "Accès aux sujets récents d'expression orale & écrite",
      "Garantie de progression CLB",
    ],
    cta: "Passer au Premium",
    href: "/register",
    highlight: true,
    badge: "Recommandé",
  },
  {
    name: "Pro",
    price: "59€",
    period: "par mois",
    desc: "Pour les candidats pressés exigeant un accompagnement intensif de haut niveau.",
    features: [
      "Tests blancs TCF Canada 100% illimités",
      "Évaluations d'Expression Écrite & Orale IA illimitées",
      "Accès complet à la base de données de sujets d'examens officiels",
      "Support prioritaire WhatsApp 24h/24 & 7j/7",
      "1 Session individuelle de révision (30 min) avec un enseignant expert / mois",
      "Plan de révision ultra-personnalisé",
    ],
    cta: "Devenir Pro",
    href: "/register",
    highlight: false,
    badge: "Intensif",
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-16 md:py-24" style={{ backgroundColor: "hsl(var(--bg-base))" }}>
      <div className="container-max">
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span
            style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              color: "hsl(var(--primary))",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            TARIFS TRANSPARENTS
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 2.5rem)",
              marginTop: "0.5rem",
              marginBottom: "1rem",
              lineHeight: 1.2,
            }}
          >
            Investissez dans votre réussite au TCF Canada
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              color: "hsl(var(--text-secondary))",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Choisissez le forfait qui s'adapte à vos besoins d'apprentissage. Des outils avancés par IA et des simulations réalistes pour maximiser vos points d'immigration.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "2rem",
            alignItems: "stretch",
            maxWidth: "1150px",
            margin: "0 auto",
          }}
        >
          {PLANS.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                borderRadius: "1.25rem",
                padding: "2.5rem 2rem",
                backgroundColor: "white",
                border: plan.highlight
                  ? "2px solid hsl(var(--primary))"
                  : "1px solid hsl(var(--border))",
                boxShadow: plan.highlight
                  ? "0 20px 25px -5px rgba(59, 130, 246, 0.1), 0 10px 10px -5px rgba(59, 130, 246, 0.04)"
                  : "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.02)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              whileHover={{
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              {/* Badge for highlight/premium status */}
              {plan.badge && (
                <div
                  style={{
                    position: "absolute",
                    top: "-12px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: plan.highlight ? "hsl(var(--primary))" : "hsl(var(--text-primary))",
                    color: "white",
                    padding: "0.25rem 1rem",
                    borderRadius: "9999px",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  {plan.badge}
                </div>
              )}

              {/* Plan Name & Desc */}
              <div style={{ marginBottom: "2rem" }}>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 800,
                    color: "hsl(var(--text-primary))",
                    marginBottom: "0.5rem",
                  }}
                >
                  {plan.name}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "hsl(var(--text-secondary))", minHeight: "2.5rem", lineHeight: 1.5 }}>
                  {plan.desc}
                </p>
              </div>

              {/* Price Block */}
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  marginBottom: "2rem",
                  borderBottom: "1px solid #f1f5f9",
                  paddingBottom: "1.5rem",
                }}
              >
                <span
                  style={{
                    fontSize: "3.5rem",
                    fontWeight: 900,
                    color: "hsl(var(--text-primary))",
                    fontFamily: "Outfit, sans-serif",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {plan.price}
                </span>
                <span
                  style={{
                    fontSize: "0.95rem",
                    color: "hsl(var(--text-secondary))",
                    marginLeft: "0.5rem",
                    fontWeight: 500,
                  }}
                >
                  / {plan.period}
                </span>
              </div>

              {/* Feature List */}
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 2.5rem 0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.875rem",
                  flexGrow: 1,
                }}
              >
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        backgroundColor: plan.highlight ? "hsla(221, 83%, 53%, 0.1)" : "hsl(var(--bg-base))",
                        border: plan.highlight ? "none" : "1px solid hsl(var(--border))",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: "2px",
                      }}
                    >
                      <Check size={11} color={plan.highlight ? "hsl(var(--primary))" : "hsl(var(--text-secondary))"} strokeWidth={3} />
                    </div>
                    <span style={{ fontSize: "0.9rem", color: "hsl(var(--text-secondary))", lineHeight: 1.4 }}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Call to Action Button */}
              <Link
                href={plan.href}
                className={plan.highlight ? "btn-primary" : "btn-secondary"}
                style={{
                  width: "100%",
                  justifyContent: "center",
                  padding: "0.85rem",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "0.75rem",
                  boxShadow: plan.highlight ? "0 4px 6px -1px rgba(59, 130, 246, 0.2)" : "none",
                }}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Pricing Notice */}
        <div
          style={{
            maxWidth: "600px",
            margin: "3rem auto 0",
            textAlign: "center",
            padding: "1rem 1.5rem",
            backgroundColor: "hsla(221, 83%, 53%, 0.03)",
            borderRadius: "0.75rem",
            border: "1px dashed hsla(221, 83%, 53%, 0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          <HelpCircle size={16} color="hsl(var(--primary))" />
          <span style={{ fontSize: "0.825rem", color: "hsl(var(--text-secondary))", fontWeight: 500 }}>
            Des questions sur le CPF ou nos forfaits d'école ? Contactez notre équipe de conseillers.
          </span>
        </div>
      </div>
    </section>
  );
}
