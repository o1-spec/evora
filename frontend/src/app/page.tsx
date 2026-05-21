"use client";

import PublicLayout from "@/components/portal/PublicLayout";
import HeroSection from "@/components/portal/HeroSection";
import ExamSkillsSection from "@/components/portal/ExamSkillsSection";
import RecentTopicsSection from "@/components/portal/RecentTopicsSection";
import AcademyLevelsSection from "@/components/portal/AcademyLevelsSection";
import PricingSection from "@/components/portal/PricingSection";

export default function Home() {
  return (
    <PublicLayout>
      {/* Hero section */}
      <HeroSection />

      {/* 4 TCF tests/skills section */}
      <ExamSkillsSection />

      {/* Recent exam prep topics */}
      <RecentTopicsSection />

      {/* Academy and level course listings */}
      <AcademyLevelsSection />

      {/* Plans and pricing tiers */}
      <PricingSection />
    </PublicLayout>
  );
}
