'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, FileText, BarChart3, CreditCard, LogOut, Menu, X, Brain, Globe, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import api from '@/lib/api';
import ConfirmModal from '@/components/portal/ConfirmModal';
import ContactCTA from '@/components/portal/ContactCTA';

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
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('sidebar-collapsed');
    if (saved !== null) {
      setIsCollapsed(saved === 'true');
    }
  }, []);

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
    window.location.href = '/';
  };

  if (!mounted || !user) return null;

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        backgroundColor: 'hsl(var(--bg-base))',
        '--sidebar-width': isCollapsed ? '80px' : '240px'
      } as any}
    >

      <motion.aside
        initial={{ x: -260, opacity: 0, width: 240 }}
        animate={{ x: 0, opacity: 1, width: isCollapsed ? 80 : 240 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          backgroundColor: 'white', borderRight: '1px solid hsl(var(--border))',
          flexDirection: 'column', position: 'fixed', height: '100vh', zIndex: 40
        }}
        className="hidden lg:flex"
      >
        <button
          onClick={() => {
            const newVal = !isCollapsed;
            setIsCollapsed(newVal);
            localStorage.setItem('sidebar-collapsed', String(newVal));
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '24px',
            height: '24px',
            borderRadius: '6px',
            border: '1px solid hsl(var(--border))',
            backgroundColor: 'white',
            cursor: 'pointer',
            color: 'hsl(var(--text-secondary))',
            transition: 'all 0.2s',
            position: 'absolute',
            top: '1.8rem',
            right: '-12px',
            zIndex: 50,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
          }}
          onMouseOver={e => {
            e.currentTarget.style.backgroundColor = 'hsl(var(--bg-base))';
            e.currentTarget.style.color = 'hsl(var(--primary))';
          }}
          onMouseOut={e => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.color = 'hsl(var(--text-secondary))';
          }}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', overflow: 'hidden' }}>
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.35 }}
            style={{
              height: '5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: isCollapsed ? 'center' : 'flex-start',
              padding: isCollapsed ? '0' : '0 1.25rem',
              borderBottom: '1px solid hsl(var(--border))'
            }}
          >
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: 'hsl(var(--primary))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Globe size={18} color="white" />
              </div>
              {!isCollapsed && (
                <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.25rem', color: 'hsl(var(--text-primary))', whiteSpace: 'nowrap' }}>
                  Évora
                </span>
              )}
            </Link>
          </motion.div>

          <nav style={{ flex: 1, padding: isCollapsed ? '1.25rem 0.5rem' : '1.25rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {NAV_LINKS.map((link, i) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.18 + i * 0.07, type: 'spring', stiffness: 320, damping: 28 }}
                >
                  <Link href={link.href} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isCollapsed ? 'center' : 'flex-start',
                    gap: isCollapsed ? '0' : '0.875rem',
                    padding: isCollapsed ? '0.625rem' : '0.625rem 0.875rem',
                    borderRadius: '0.75rem',
                    backgroundColor: isActive ? 'hsl(var(--primary-light))' : 'transparent',
                    color: isActive ? 'hsl(var(--primary-hover))' : 'hsl(var(--text-secondary))',
                    fontWeight: isActive ? 600 : 500, fontSize: '0.875rem', transition: 'all 0.2s', textDecoration: 'none'
                  }}>
                    <link.icon size={18} color={isActive ? 'hsl(var(--primary))' : 'currentColor'} style={{ flexShrink: 0 }} />
                    {!isCollapsed && (
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                        {link.label}
                      </span>
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.35 }}
            style={{ padding: isCollapsed ? '1.25rem 0.5rem' : '1.25rem 0.75rem', borderTop: '1px solid hsl(var(--border))' }}
          >
            <Link href="/dashboard/billing" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: isCollapsed ? 'center' : 'flex-start',
              gap: isCollapsed ? '0' : '0.75rem',
              marginBottom: '1.25rem',
              padding: '0.5rem',
              borderRadius: '0.75rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              textDecoration: 'none'
            }} onMouseOver={e => e.currentTarget.style.backgroundColor = 'hsl(var(--bg-base))'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: 'hsl(var(--primary))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 600,
                fontSize: '1.1rem',
                textTransform: 'uppercase',
                flexShrink: 0
              }}>
                {user.firstName?.[0] || user.email[0]}
              </div>
              {!isCollapsed && (
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'hsl(var(--text-primary))', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {user.firstName ? `${user.firstName} ${user.lastName || ''}` : user.email.split('@')[0]}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'hsl(var(--text-secondary))', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {profile?.subscriptionTier || user.subscriptionTier} Plan
                  </div>
                </div>
              )}
            </Link>
            <button onClick={() => setShowSignOutModal(true)} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: isCollapsed ? 'center' : 'flex-start',
              gap: isCollapsed ? '0' : '0.75rem',
              padding: isCollapsed ? '0.75rem 0.5rem' : '0.75rem 1rem',
              width: '100%',
              borderRadius: '0.75rem',
              border: 'none',
              background: 'transparent',
              color: 'hsl(var(--text-secondary))',
              fontWeight: 500,
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              textAlign: 'left'
            }} onMouseOver={e => e.currentTarget.style.backgroundColor = 'hsl(var(--bg-base))'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
              <LogOut size={18} style={{ flexShrink: 0 }} />
              {!isCollapsed && 'Sign out'}
            </button>
          </motion.div>
        </div>
      </motion.aside>

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
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => setIsMobileMenuOpen(true)}
          style={{ background: 'transparent', border: 'none', color: 'hsl(var(--text-primary))', cursor: 'pointer' }}
        >
          <Menu size={24} />
        </motion.button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 50 }} className="flex lg:hidden">

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)' }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              style={{ position: 'relative', width: 260, backgroundColor: 'white', height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '4px 0 24px rgba(0,0,0,0.12)' }}
            >
              <div style={{ height: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem', borderBottom: '1px solid hsl(var(--border))' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{ width: 28, height: 28, borderRadius: 6, backgroundColor: 'hsl(var(--primary))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Globe size={16} color="white" />
                  </div>
                  <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.2rem', color: 'hsl(var(--text-primary))' }}>Évora</span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ background: 'transparent', border: 'none', color: 'hsl(var(--text-secondary))', cursor: 'pointer' }}
                >
                  <X size={22} />
                </motion.button>
              </div>

              <nav style={{ flex: 1, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {NAV_LINKS.map((link, i) => {
                  const isActive = pathname.startsWith(link.href);
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.06, type: 'spring', stiffness: 340, damping: 28 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '0.7rem 0.875rem', borderRadius: '0.75rem',
                          backgroundColor: isActive ? 'hsl(var(--primary-light))' : 'transparent',
                          color: isActive ? 'hsl(var(--primary-hover))' : 'hsl(var(--text-secondary))',
                          fontWeight: isActive ? 600 : 500, fontSize: '0.9rem', textDecoration: 'none',
                          transition: 'background-color 0.15s'
                        }}
                      >
                        <link.icon size={18} color={isActive ? 'hsl(var(--primary))' : 'currentColor'} />
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.38 }}
                style={{ padding: '1rem', borderTop: '1px solid hsl(var(--border))' }}
              >
                <button onClick={() => { setIsMobileMenuOpen(false); setShowSignOutModal(true); }} style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', width: '100%',
                  borderRadius: '0.75rem', border: 'none', background: 'transparent', color: 'hsl(var(--text-secondary))',
                  fontWeight: 500, fontSize: '0.875rem', cursor: 'pointer', textAlign: 'left', transition: 'background 0.15s'
                }}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = 'hsl(var(--bg-base))'}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <LogOut size={18} /> Sign out
                </button>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <main className="dashboard-main">
        <div style={{ maxWidth: 1400, width: '100%', margin: '0 auto', flex: 1 }}>
          {children}
        </div>
      </main>

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
      <ContactCTA minimal />
    </div>
  );
}
