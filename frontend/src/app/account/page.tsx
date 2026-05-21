"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Calendar, CreditCard, Award, BookOpen, Clock, Settings, Sparkles, CheckCircle } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import PublicLayout from "@/components/portal/PublicLayout";
import PublicPageHero from "@/components/portal/PublicPageHero";

export default function AccountPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    // If not logged in, redirect to login
    if (!user) {
      setIsRedirecting(true);
      router.push("/login");
    }
  }, [user, router]);

  if (isRedirecting || !user) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "hsl(var(--bg-base))",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "hsl(var(--text-secondary))", fontSize: "1rem", fontWeight: 500 }}>
            Redirecting to login...
          </p>
        </div>
      </div>
    );
  }

  // Simulated metrics and progress details
  const mockSubscription = {
    planName: "Premium Membership",
    period: "Monthly",
    status: "Active",
    nextBillingDate: "June 21, 2026",
    price: "29€",
  };

  const progressHistory = [
    { type: "Written Expression", topic: "Task 1: Invitation restaurant", date: "May 20, 2026", clbScore: "CLB 8", status: "Completed" },
    { type: "Oral Expression", topic: "Task 1: Introduction personnelle", date: "May 18, 2026", clbScore: "CLB 7", status: "Completed" },
    { type: "Reading Comprehension", topic: "Timed Practice: Text Section B", date: "May 15, 2026", clbScore: "CLB 9", status: "Completed" },
    { type: "Oral Comprehension", topic: "Timed Practice: Audio Section A", date: "May 10, 2026", clbScore: "CLB 8", status: "Completed" },
  ];

  return (
    <PublicLayout>
      <PublicPageHero
        title="My Account"
        subtitle={`Welcome back, ${user.firstName ? `${user.firstName} ${user.lastName || ""}` : user.email}. View your subscription details, exam logs, and learning progress.`}
        badge="User Profile"
        badgeColor="hsl(var(--primary))"
        accentIcon={<User size={12} />}
      />

      <div style={{ backgroundColor: "#ffffff", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2.5rem" }}>
            
            {/* Left Column: Account Details & Subscription */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              
              {/* Profile Card */}
              <div className="card" style={{ padding: "2rem", backgroundColor: "white" }}>
                <h3 style={{ fontSize: "1.25rem", fontFamily: "Outfit, sans-serif", fontWeight: 800, marginBottom: "1.5rem" }}>
                  Profile Information
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div>
                    <span style={{ fontSize: "0.75rem", color: "hsl(var(--text-muted))", display: "block" }}>Full Name</span>
                    <span style={{ fontSize: "0.95rem", fontWeight: 600, color: "hsl(var(--text-primary))" }}>
                      {user.firstName ? `${user.firstName} ${user.lastName || ""}` : "TCF Candidate"}
                    </span>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.75rem", color: "hsl(var(--text-muted))", display: "block" }}>Email Address</span>
                    <span style={{ fontSize: "0.95rem", fontWeight: 600, color: "hsl(var(--text-primary))" }}>
                      {user.email}
                    </span>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.75rem", color: "hsl(var(--text-muted))", display: "block" }}>Account Status</span>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        padding: "0.2rem 0.5rem",
                        borderRadius: "0.25rem",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        backgroundColor: "rgba(34, 197, 94, 0.08)",
                        color: "rgb(34, 197, 94)",
                        textTransform: "uppercase",
                        marginTop: "0.25rem",
                      }}
                    >
                      <CheckCircle size={10} />
                      Verified
                    </span>
                  </div>
                </div>
              </div>

              {/* Subscription Card */}
              <div className="card" style={{ padding: "2rem", backgroundColor: "white" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                  <h3 style={{ fontSize: "1.25rem", fontFamily: "Outfit, sans-serif", fontWeight: 800 }}>
                    Active Subscription
                  </h3>
                  <CreditCard size={18} color="hsl(var(--primary))" />
                </div>
                <div
                  style={{
                    backgroundColor: "hsl(var(--bg-base))",
                    borderRadius: "0.75rem",
                    padding: "1.25rem",
                    border: "1px solid hsl(var(--border))",
                    marginBottom: "1.5rem",
                  }}
                >
                  <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "hsl(var(--primary))", display: "block", textTransform: "uppercase" }}>
                    {mockSubscription.planName}
                  </span>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", marginTop: "0.5rem" }}>
                    <span style={{ fontSize: "2rem", fontWeight: 900, fontFamily: "Outfit, sans-serif" }}>
                      {mockSubscription.price}
                    </span>
                    <span style={{ fontSize: "0.85rem", color: "hsl(var(--text-secondary))" }}>
                      / {mockSubscription.period}
                    </span>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.85rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "hsl(var(--text-secondary))" }}>Status</span>
                    <span style={{ fontWeight: 600, color: "rgb(34, 197, 94)" }}>{mockSubscription.status}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "hsl(var(--text-secondary))" }}>Next billing date</span>
                    <span style={{ fontWeight: 600 }}>{mockSubscription.nextBillingDate}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Progress & History */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              
              {/* Progress Summary */}
              <div className="card" style={{ padding: "2rem", backgroundColor: "white" }}>
                <h3 style={{ fontSize: "1.25rem", fontFamily: "Outfit, sans-serif", fontWeight: 800, marginBottom: "1.5rem" }}>
                  Learning Progress
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem", fontSize: "0.85rem" }}>
                      <span style={{ fontWeight: 600 }}>TCF Skill Coverage</span>
                      <span style={{ color: "hsl(var(--primary))", fontWeight: 700 }}>75%</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: "75%" }} />
                    </div>
                  </div>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem", fontSize: "0.85rem" }}>
                      <span style={{ fontWeight: 600 }}>Target Benchmark Level</span>
                      <span style={{ color: "hsl(var(--accent))", fontWeight: 700 }}>CLB 9 Projected</span>
                    </div>
                    <div className="progress-track" style={{ height: "8px" }}>
                      <div className="progress-fill" style={{ width: "90%", backgroundColor: "hsl(var(--accent))" }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Saved Practice History */}
              <div className="card" style={{ padding: "2rem", backgroundColor: "white" }}>
                <h3 style={{ fontSize: "1.25rem", fontFamily: "Outfit, sans-serif", fontWeight: 800, marginBottom: "1.5rem" }}>
                  Recent Practices & AI Scores
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {progressHistory.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "1rem",
                        borderRadius: "0.75rem",
                        border: "1px solid hsl(var(--border))",
                        backgroundColor: "hsl(var(--bg-base))",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                        <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "hsl(var(--text-primary))" }}>
                          {item.type}
                        </span>
                        <span style={{ fontSize: "0.75rem", color: "hsl(var(--text-muted))", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                          <Clock size={10} />
                          {item.date} • {item.topic}
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: "0.8rem",
                          fontWeight: 700,
                          padding: "0.2rem 0.5rem",
                          borderRadius: "0.25rem",
                          backgroundColor: "hsl(var(--primary-light))",
                          color: "hsl(var(--primary))",
                        }}
                      >
                        {item.clbScore}
                      </span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
                  <Link
                    href="/dashboard/academy"
                    className="btn-primary"
                    style={{ padding: "0.6rem 1.5rem", fontSize: "0.85rem", width: "100%", justifyContent: "center" }}
                  >
                    Go to Study Dashboard
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
