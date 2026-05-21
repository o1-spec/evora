"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Menu, X, LogIn, LogOut, User } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

export default function PublicNavbar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Welcome", route: "/" },
    { label: "Written expression", route: "/written-expression" },
    { label: "Oral expression", route: "/oral-expression" },
    { label: "Reading comprehension", route: "/reading-comprehension" },
    { label: "Oral comprehension", route: "/oral-comprehension" },
    { label: "Training", route: "/training" },
    { label: "Prices", route: "/pricing" },
    { label: "My account", route: "/account" },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid hsl(var(--border))",
      }}
    >
      <div
        style={{
          height: "auto",
          minHeight: "3.5rem", // Compact, aligned
          padding: "0.5rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1280px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Brand Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.4rem", textDecoration: "none" }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 6,
              backgroundColor: "hsl(var(--primary))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Globe size={16} color="white" />
          </div>
          <span
            style={{
              fontFamily: "Outfit, sans-serif",
              fontWeight: 800,
              fontSize: "1.2rem",
              color: "hsl(var(--text-primary))",
            }}
          >
            Évora
          </span>
        </Link>

        {/* Center Navigation Links (Desktop) */}
        <nav
          style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}
          className="hidden xl:flex"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.route;
            return (
              <Link
                key={item.route}
                href={item.route}
                style={{
                  fontSize: "0.825rem",
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? "hsl(var(--primary))" : "hsl(var(--text-secondary))",
                  textDecoration: "none",
                  padding: "0.4rem 0.75rem",
                  borderRadius: "0.375rem",
                  backgroundColor: isActive ? "rgba(59, 130, 246, 0.08)" : "transparent",
                  transition: "all 0.15s ease",
                }}
                onMouseOver={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "rgba(59, 130, 246, 0.04)";
                    e.currentTarget.style.color = "hsl(var(--primary))";
                  }
                }}
                onMouseOut={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "hsl(var(--text-secondary))";
                  }
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Login/Logout (Desktop) */}
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }} className="hidden xl:flex">
          {user ? (
            <button
              onClick={handleLogout}
              className="btn-ghost"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                padding: "0.4rem 0.75rem",
                fontSize: "0.825rem",
                fontWeight: 600,
                color: "hsl(var(--text-secondary))",
                cursor: "pointer",
              }}
            >
              <LogOut size={14} />
              Sign out
            </button>
          ) : (
            <Link
              href="/login"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                padding: "0.4rem 0.75rem",
                fontSize: "0.825rem",
                fontWeight: 600,
                color: "hsl(var(--primary))",
                textDecoration: "none",
                borderRadius: "0.375rem",
                backgroundColor: pathname === "/login" ? "rgba(59, 130, 246, 0.08)" : "transparent",
              }}
            >
              <LogIn size={14} />
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            alignItems: "center",
            justifyContent: "center",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0.4rem",
          }}
          className="flex xl:hidden"
        >
          {mobileMenuOpen ? (
            <X size={20} color="hsl(var(--text-primary))" />
          ) : (
            <Menu size={20} color="hsl(var(--text-primary))" />
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              borderTop: "1px solid hsl(var(--border))",
              backgroundColor: "rgba(255, 255, 255, 0.98)",
              padding: "1rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
            className="flex xl:hidden"
          >
            {navItems.map((item) => {
              const isActive = pathname === item.route;
              return (
                <Link
                  key={item.route}
                  href={item.route}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? "hsl(var(--primary))" : "hsl(var(--text-secondary))",
                    textDecoration: "none",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "0.375rem",
                    backgroundColor: isActive ? "rgba(59, 130, 246, 0.08)" : "transparent",
                    display: "block",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}

            <hr style={{ borderColor: "hsl(var(--border))", margin: "0.5rem 0" }} />

            <div>
              {user ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    width: "100%",
                    padding: "0.5rem 0.75rem",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: "hsl(var(--text-secondary))",
                    background: "none",
                    border: "none",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                >
                  <LogOut size={16} />
                  Sign out
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    width: "100%",
                    padding: "0.5rem 0.75rem",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: "hsl(var(--primary))",
                    textDecoration: "none",
                  }}
                >
                  <LogIn size={16} />
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
