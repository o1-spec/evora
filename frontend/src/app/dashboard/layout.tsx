'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, BookOpen, FileText, BarChart3, CreditCard, LogOut, Menu, X, Brain, User } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

const NAV = [
  { href: '/dashboard/academy', label: 'Académie', icon: BookOpen },
  { href: '/dashboard/exams', label: 'TCF Canada', icon: FileText },
  { href: '/dashboard/tutor', label: 'Tuteur IA', icon: Brain },
  { href: '/dashboard/progress', label: 'Progression', icon: BarChart3 },
  { href: '/dashboard/billing', label: 'Abonnement', icon: CreditCard },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, loadFromStorage, logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => { loadFromStorage(); }, []);
  useEffect(() => {
    if (!isAuthenticated && typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (!token) router.push('/login');
    }
  }, [isAuthenticated]);

  const handleLogout = async () => { await logout(); router.push('/login'); };

  const tierColors: Record<string, string> = {
    FREE: 'hsl(220,12%,55%)', BASIC: 'hsl(162,82%,50%)', PREMIUM: 'hsl(250,95%,64%)', PRO: 'hsl(37,95%,58%)',
  };

  const SidebarContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '1.5rem 1rem' }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', padding: '0 0.5rem' }}>
        <div style={{ width: 34, height: 34, borderRadius: 9, background: 'linear-gradient(135deg, hsl(250,95%,64%), hsl(162,82%,50%))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Globe size={18} color="white" />
        </div>
        <span style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 800, fontSize: '1.15rem' }}>Évora</span>
      </div>

      {/* Nav */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link key={href} href={href} onClick={() => setSidebarOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.7rem 0.875rem', borderRadius: '0.625rem', textDecoration: 'none',
                fontWeight: active ? 600 : 400, fontSize: '0.925rem',
                background: active ? 'hsla(250,95%,64%,0.15)' : 'transparent',
                color: active ? 'hsl(250,95%,72%)' : 'hsl(220,12%,65%)',
                transition: 'all 0.15s',
                borderLeft: active ? '2px solid hsl(250,95%,64%)' : '2px solid transparent',
              }}>
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="glass" style={{ padding: '1rem', marginTop: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.875rem' }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, hsl(250,95%,64%), hsl(162,82%,50%))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <User size={16} color="white" />
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user?.firstName || user?.email?.split('@')[0] || 'Étudiant'}
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: tierColors[user?.subscriptionTier || 'FREE'] }}>
              {user?.subscriptionTier || 'FREE'}
            </div>
          </div>
        </div>
        <button onClick={handleLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.75rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '0.5rem', color: 'hsl(0,84%,65%)', fontSize: '0.875rem', cursor: 'pointer', fontWeight: 500 }}>
          <LogOut size={15} /> Déconnexion
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'hsl(225,20%,6%)' }}>
      {/* Desktop Sidebar */}
      <aside style={{ width: 240, flexShrink: 0, borderRight: '1px solid rgba(255,255,255,0.07)', position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column' }} className="hidden-mobile">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 40 }} />
            <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              style={{ position: 'fixed', left: 0, top: 0, bottom: 0, width: 260, zIndex: 50, background: 'hsl(226,20%,9%)', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ position: 'absolute', top: 16, right: 16 }}>
                <button onClick={() => setSidebarOpen(false)} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: 8, padding: '6px', cursor: 'pointer', color: 'white', display: 'flex' }}>
                  <X size={18} />
                </button>
              </div>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Mobile topbar */}
        <header style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'sticky', top: 0, zIndex: 30, background: 'hsl(226,20%,7%)', backdropFilter: 'blur(20px)' }}>
          <button onClick={() => setSidebarOpen(true)} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: 8, padding: '7px', cursor: 'pointer', color: 'white', display: 'flex' }}>
            <Menu size={20} />
          </button>
          <span style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700, fontSize: '1rem' }}>Évora</span>
        </header>

        <main style={{ flex: 1, padding: '2rem 1.5rem', maxWidth: 1200, width: '100%', margin: '0 auto' }}>
          {children}
        </main>
      </div>

      <style>{`.hidden-mobile { display: flex; } @media (max-width: 768px) { .hidden-mobile { display: none !important; } }`}</style>
    </div>
  );
}
