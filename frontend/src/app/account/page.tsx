"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Calendar, CreditCard, Award, BookOpen, Clock, Settings, Sparkles, CheckCircle, Trophy } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
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

  const { data: profile, isLoading } = useQuery({
    queryKey: ['user-profile'],
    queryFn: () => api.get('/auth/profile').then(r => r.data.user),
  });

  const subTier = profile?.subscriptionTier || 'FREE';
  const PLAN_NAMES: Record<string, string> = {
    FREE: 'Free Plan',
    BASIC: 'Basique (Basic)',
    PREMIUM: 'Premium Membership',
    PRO: 'Professionnel (Pro)',
  };
  const PLAN_PRICES: Record<string, string> = {
    FREE: '0€',
    BASIC: '19€',
    PREMIUM: '39€',
    PRO: '79€',
  };
  const isPremium = subTier !== 'FREE';
  
  const subscription = {
    planName: PLAN_NAMES[subTier] || 'Free Plan',
    period: "Monthly",
    status: isPremium ? "Active" : "Free tier",
    nextBillingDate: profile?.subActiveUntil 
      ? new Date(profile.subActiveUntil).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      : "N/A",
    price: PLAN_PRICES[subTier] || '0€',
  };

  const completedLessons = profile?.progress?.filter((p: any) => p.isCompleted) || [];
  const totalLessonsCount = profile?.progress?.length || 0;
  const skillCoveragePercent = totalLessonsCount > 0 
    ? Math.round((completedLessons.length / totalLessonsCount) * 100)
    : 0;

  const latestAttempt = profile?.examAttempts?.[0];
  const projectedLevel = latestAttempt?.clbLevel || "CLB 5";
  const projectedPercent = (parseInt(projectedLevel.replace('CLB ', '')) || 5) * 10;

  const attemptsList = profile?.examAttempts?.slice(0, 4) || [];

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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: "2.5rem" }}>
            
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
                    {isLoading ? 'Loading...' : subscription.planName}
                  </span>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", marginTop: "0.5rem" }}>
                    <span style={{ fontSize: "2rem", fontWeight: 900, fontFamily: "Outfit, sans-serif" }}>
                      {isLoading ? '...' : subscription.price}
                    </span>
                    <span style={{ fontSize: "0.85rem", color: "hsl(var(--text-secondary))" }}>
                      / {subscription.period}
                    </span>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.85rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "hsl(var(--text-secondary))" }}>Status</span>
                    <span style={{ fontWeight: 600, color: isPremium ? "rgb(34, 197, 94)" : "hsl(var(--text-muted))" }}>
                      {isLoading ? '...' : subscription.status}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "hsl(var(--text-secondary))" }}>Next billing date</span>
                    <span style={{ fontWeight: 600 }}>{isLoading ? '...' : subscription.nextBillingDate}</span>
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
                      <span style={{ color: "hsl(var(--primary))", fontWeight: 700 }}>
                        {isLoading ? '...' : `${skillCoveragePercent}%`}
                      </span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: isLoading ? '0%' : `${skillCoveragePercent}%` }} />
                    </div>
                  </div>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem", fontSize: "0.85rem" }}>
                      <span style={{ fontWeight: 600 }}>Target Benchmark Level</span>
                      <span style={{ color: "hsl(var(--accent))", fontWeight: 700 }}>
                        {isLoading ? '...' : `${projectedLevel} Projected`}
                      </span>
                    </div>
                    <div className="progress-track" style={{ height: "8px" }}>
                      <div className="progress-fill" style={{ width: isLoading ? '0%' : `${projectedPercent}%`, backgroundColor: "hsl(var(--accent))" }} />
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
                  {isLoading ? (
                    <div style={{ textAlign: "center", color: "hsl(var(--text-muted))", fontSize: "0.95rem", padding: "1rem" }}>
                      Loading practice history...
                    </div>
                  ) : attemptsList.length > 0 ? (
                    attemptsList.map((item: any, i: number) => (
                      <div
                        key={item.id || i}
                        style={{
                          padding: "1rem",
                          borderRadius: "0.75rem",
                          border: "1px solid hsl(var(--border))",
                          backgroundColor: "hsl(var(--bg-base))",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexWrap: "wrap",
                          gap: "1rem",
                        }}
                      >
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                          <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "hsl(var(--text-primary))" }}>
                            {item.title || "TCF Exam Simulation"}
                          </span>
                          <span style={{ fontSize: "0.75rem", color: "hsl(var(--text-muted))", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                            <Clock size={10} />
                            {new Date(item.startedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {item.completedAt ? "Completed" : "In Progress"}
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
                          {item.clbLevel || "–"}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div style={{ textAlign: "center", padding: "1.5rem 1rem", color: "hsl(var(--text-muted))", fontSize: "0.9rem" }}>
                      <Trophy size={32} style={{ margin: "0 auto 0.75rem", opacity: 0.3 }} />
                      <p>No timed exams completed yet.</p>
                    </div>
                  )}
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
