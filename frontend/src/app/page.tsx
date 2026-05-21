"use client";

import TopBar from "@/components/portal/TopBar";
import Navbar from "@/components/portal/Navbar";
import QuickAccessMenu from "@/components/portal/QuickAccessMenu";
import HeroSection from "@/components/portal/HeroSection";
import ExamSkillsSection from "@/components/portal/ExamSkillsSection";
import RecentTopicsSection from "@/components/portal/RecentTopicsSection";
import AcademyLevelsSection from "@/components/portal/AcademyLevelsSection";
import PricingSection from "@/components/portal/PricingSection";
import ContactCTA from "@/components/portal/ContactCTA";
import Footer from "@/components/portal/Footer";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#ffffff" }}>
      {/* Top Bar Announcement */}
      <TopBar />

      {/* Main Responsive Sticky Navbar */}
      <Navbar />

      {/* Main Content Layout */}
      <main style={{ flexGrow: 1 }}>
        {/* Professional Circular Quick Access Menu */}
        <QuickAccessMenu />

        {/* Hero Section with interactive study cards */}
        <HeroSection />

        {/* The 4 TCF core skills grid detail */}
        <ExamSkillsSection />

        {/* Real recent exam prep topics list */}
        <RecentTopicsSection />

        {/* Formal Course Catalogue by CEFR Levels */}
        <AcademyLevelsSection />

        {/* Transparent transparent pricing tiers */}
        <PricingSection />

        {/* Contact direct CTAs & Floating WhatsApp support bubble */}
        <ContactCTA />
      </main>

      {/* Broad multi-column footer */}
      <Footer />
    </div>
  );
}
