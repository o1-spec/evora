"use client";

import Link from "next/link";
import { DollarSign, ShieldCheck, Sparkles, HelpCircle } from "lucide-react";
import PublicLayout from "@/components/portal/PublicLayout";
import PublicPageHero from "@/components/portal/PublicPageHero";
import PricingSection from "@/components/portal/PricingSection";
import QuickAccessMenu from "@/components/portal/QuickAccessMenu";

export default function PricingPage() {
  const faqs = [
    {
      q: "Can I cancel my subscription at any time?",
      a: "Yes. All our paid subscriptions (Premium and Pro) are completely contract-free. You can cancel online in one click directly from your account settings at any time."
    },
    {
      q: "How does the AI Essay Correction work?",
      a: "When you write an essay in the simulator, our AI instantly runs syntactical comparisons against official CEFR grids. It provides color-coded feedback highlighting typos, grammatical suggestions, and structural improvements with projected scores."
    },
    {
      q: "Do you offer a CLB score guarantee?",
      a: "Yes. Our Premium plan includes a CLB score guarantee. If you complete all the target academy training tracks and mock exams and do not secure at least a CLB 7 in your official test, we will offer a full refund or extend your membership free of charge."
    },
    {
      q: "Which payment methods do you support?",
      a: "We support all major international credit cards, debit cards (Visa, MasterCard, American Express), and Apple Pay securely processed via Stripe."
    }
  ];

  return (
    <PublicLayout>
      <PublicPageHero
        title="Plans and Pricing"
        subtitle="Transparent, flexible plans designed for every learning style. Secure your Canadian immigration path with the right preparation tools."
        badge="Pricing Tiers"
        badgeColor="hsl(var(--primary))"
        accentIcon={<DollarSign size={12} />}
      />

      {/* Quick Access Menu Row below navbar */}
      <QuickAccessMenu />

      {/* Main Pricing Sections Grid */}
      <PricingSection />

      {/* FAQ Section */}
      <div style={{ backgroundColor: "#ffffff", borderTop: "1px solid hsl(var(--border))", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <h2 style={{ fontSize: "2rem", fontFamily: "Outfit, sans-serif", fontWeight: 800 }}>
              Frequently Asked Questions
            </h2>
            <p style={{ color: "hsl(var(--text-secondary))", marginTop: "0.5rem" }}>
              Have questions about how Évora works or our subscription structures? Here are quick answers.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <h3 style={{ fontSize: "1.05rem", fontFamily: "Outfit, sans-serif", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <HelpCircle size={16} color="hsl(var(--primary))" style={{ flexShrink: 0 }} />
                  {faq.q}
                </h3>
                <p style={{ fontSize: "0.9rem", color: "hsl(var(--text-secondary))", lineHeight: 1.6, paddingLeft: "1.5rem" }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
