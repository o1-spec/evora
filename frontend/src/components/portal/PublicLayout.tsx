"use client";

import TopBar from "@/components/portal/TopBar";
import PublicNavbar from "@/components/portal/PublicNavbar";
import ContactCTA from "@/components/portal/ContactCTA";
import Footer from "@/components/portal/Footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#ffffff" }}>
      {/* Announcement top bar */}
      <TopBar />

      {/* Main navigation */}
      <PublicNavbar />

      {/* Main content viewport */}
      <main style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {children}
      </main>

      {/* Interactive Floating Chatbot Widget & Bottom CTAs */}
      <ContactCTA />

      {/* Footer component */}
      <Footer />
    </div>
  );
}
