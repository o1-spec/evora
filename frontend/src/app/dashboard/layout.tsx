'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { BookOpen, FileText, BarChart3, CreditCard, LogOut, Menu, X, Brain, Globe, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import api from '@/lib/api';
import ConfirmModal from '@/components/portal/ConfirmModal';

const NAV_LINKS = [
  { href: '/dashboard/academy', label: 'Academy', icon: BookOpen },
  { href: '/dashboard/exams', label: 'TCF Simulator', icon: FileText },
  { href: '/dashboard/tutor', label: 'AI Tutor', icon: Brain },
  { href: '/dashboard/progress', label: 'Progress', icon: BarChart3 },
  { href: '/dashboard/billing', label: 'Subscription', icon: CreditCard },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  // Set mounted on client mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Validate session on mount
  useEffect(() => {
    if (mounted && !user) {
      router.push('/login');
    }
  }, [mounted, user, router]);

  const { data: profile } = useQuery({
    queryKey: ['user-profile'],
    queryFn: () => api.get('/auth/profile').then(r => r.data.user),
    enabled: !!user && mounted,
  });

  const handleLogout = async () => {
    setSigningOut(true);
    await logout();
    setSigningOut(false);
    setShowSignOutModal(false);
    router.push('/');
  };

  if (!mounted || !user) return null;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', backgroundColor: 'hsl(var(--bg-base))' }}>

      {/* SIDEBAR (Desktop) */}
      <aside style={{
        width: 280, backgroundColor: 'white', borderRight: '1px solid hsl(var(--border))',
        flexDirection: 'column', position: 'fixed', height: '100vh', zIndex: 40
      }} className="hidden lg:flex">

        {/* Brand */}
        <div style={{ height: '5rem', display: 'flex', alignItems: 'center', padding: '0 1.5rem', borderBottom: '1px solid hsl(var(--border))' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: 'hsl(var(--primary))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Globe size={18} color="white" />
            </div>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.25rem', color: 'hsl(var(--text-primary))' }}>Évora</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {NAV_LINKS.map(link => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link key={link.href} href={link.href} style={{
                display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '0.75rem 1rem', borderRadius: '0.75rem',
                backgroundColor: isActive ? 'hsl(var(--primary-light))' : 'transparent',
                color: isActive ? 'hsl(var(--primary-hover))' : 'hsl(var(--text-secondary))',
                fontWeight: isActive ? 600 : 500, transition: 'all 0.2s', textDecoration: 'none'
              }}>
                <link.icon size={20} color={isActive ? 'hsl(var(--primary))' : 'currentColor'} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* User Card */}
        <div style={{ padding: '1.5rem 1rem', borderTop: '1px solid hsl(var(--border))' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', padding: '0.5rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: 'hsl(var(--primary))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '1.1rem', textTransform: 'uppercase' }}>
              {user.firstName?.[0] || user.email[0]}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'hsl(var(--text-primary))', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user.firstName ? `${user.firstName} ${user.lastName || ''}` : user.email.split('@')[0]}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'hsl(var(--text-secondary))' }}>
                {profile?.subscriptionTier || user.subscriptionTier} Plan
              </div>
            </div>
          </div>
          <button onClick={() => setShowSignOutModal(true)} style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', width: '100%',
            borderRadius: '0.75rem', border: 'none', background: 'transparent', color: 'hsl(var(--text-secondary))',
            fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left'
          }} onMouseOver={e => e.currentTarget.style.backgroundColor = 'hsl(var(--bg-base))'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
            <LogOut size={18} /> Sign out
          </button>
        </div>
      </aside>

      {/* MOBILE HEADER */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: '4rem', backgroundColor: 'white', borderBottom: '1px solid hsl(var(--border))',
        alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem', zIndex: 40
      }} className="flex lg:hidden">
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, backgroundColor: 'hsl(var(--primary))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Globe size={16} color="white" />
          </div>
          <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.1rem', color: 'hsl(var(--text-primary))' }}>Évora</span>
        </Link>
        <button onClick={() => setIsMobileMenuOpen(true)} style={{ background: 'transparent', border: 'none', color: 'hsl(var(--text-primary))' }}>
          <Menu size={24} />
        </button>
      </div>

      {/* MOBILE MENU DRAWER */}
      {isMobileMenuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50 }} className="flex lg:hidden">
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={() => setIsMobileMenuOpen(false)} />
          <div style={{ position: 'relative', width: 280, backgroundColor: 'white', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem', borderBottom: '1px solid hsl(var(--border))' }}>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.25rem', color: 'hsl(var(--text-primary))' }}>Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)} style={{ background: 'transparent', border: 'none', color: 'hsl(var(--text-secondary))' }}><X size={24} /></button>
            </div>
            <nav style={{ flex: 1, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {NAV_LINKS.map(link => {
                const isActive = pathname.startsWith(link.href);
                return (
                  <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} style={{
                    display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '0.75rem 1rem', borderRadius: '0.75rem',
                    backgroundColor: isActive ? 'hsl(var(--primary-light))' : 'transparent',
                    color: isActive ? 'hsl(var(--primary-hover))' : 'hsl(var(--text-secondary))',
                    fontWeight: isActive ? 600 : 500, textDecoration: 'none'
                  }}>
                    <link.icon size={20} color={isActive ? 'hsl(var(--primary))' : 'currentColor'} />
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <div style={{ padding: '1rem', borderTop: '1px solid hsl(var(--border))' }}>
              <button onClick={() => { setIsMobileMenuOpen(false); setShowSignOutModal(true); }} style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', width: '100%',
                borderRadius: '0.75rem', border: 'none', background: 'transparent', color: 'hsl(var(--text-secondary))',
                fontWeight: 500, textAlign: 'left'
              }}>
                <LogOut size={18} /> Sign out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="dashboard-main">
        <div style={{ maxWidth: 1400, width: '100%', margin: '0 auto', flex: 1 }}>
          {children}
        </div>
      </main>

      {/* SIGN OUT CONFIRMATION MODAL */}
      <ConfirmModal
        open={showSignOutModal}
        onClose={() => setShowSignOutModal(false)}
        onConfirm={handleLogout}
        title="Sign out of Évora?"
        message="You will be returned to the home page. Any unsaved progress will be lost."
        confirmLabel="Yes, sign out"
        cancelLabel="Stay logged in"
        variant="danger"
        loading={signingOut}
      />
    </div>
  );
}
