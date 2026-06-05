'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { ConfirmModal } from '@/components/admin/ConfirmModal';
import {
  LayoutDashboard, Users, CreditCard, BookOpen, FileQuestion,
  GraduationCap, ClipboardList, MessageSquare, Activity,
  Mail, Settings, LogOut, ChevronLeft, ChevronRight, Shield,
  Menu, X, History
} from 'lucide-react';
import { useState } from 'react';

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/subscriptions', label: 'Subscriptions', icon: CreditCard },
  { href: '/admin/exams', label: 'TCF Exams', icon: BookOpen },
  { href: '/admin/questions', label: 'Questions', icon: FileQuestion },
  { href: '/admin/academy', label: 'Academy', icon: GraduationCap },
  { href: '/admin/attempts', label: 'Attempts', icon: ClipboardList },
  { href: '/admin/ai-feedback', label: 'AI Feedback', icon: MessageSquare },
  { href: '/admin/ai-usage', label: 'AI Usage', icon: Activity },
  { href: '/admin/email-logs', label: 'Email Logs', icon: Mail },
  { href: '/admin/audit-logs', label: 'Audit Logs', icon: History },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
      setShowLogoutConfirm(false);
      window.location.href = '/';
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <>
      {/* Mobile Top Header */}
      <div className="admin-mobile-header">
        <button
          className="admin-mobile-menu-btn"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>
        <div className="admin-mobile-header-title">
          <Shield size={18} className="admin-sidebar-logo-icon" />
          <span>Évora Admin</span>
        </div>
        <div style={{ width: 36 }} />
      </div>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="admin-sidebar-backdrop"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`admin-sidebar ${mobileOpen ? 'mobile-open' : ''}`}
        style={{ width: collapsed ? '72px' : '260px' }}
      >
        {/* Logo */}
        <div className="admin-sidebar-logo">
          <Shield className="admin-sidebar-logo-icon" size={22} />
          {!collapsed && <span className="admin-sidebar-logo-text">Évora Admin</span>}
          <button
            className="admin-sidebar-collapse-btn"
            onClick={() => setCollapsed(!collapsed)}
            aria-label="Toggle sidebar"
          >
            {collapsed ? <ChevronRight key="chevron-right" size={16} /> : <ChevronLeft key="chevron-left" size={16} />}
          </button>
          {/* Mobile Close Button */}
          <button
            className="admin-sidebar-mobile-close-btn"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="admin-sidebar-nav">
          {NAV_ITEMS.map(({ href, label, icon: Icon, exact }) => (
            <Link
              key={href}
              href={href}
              className={`admin-nav-item ${isActive(href, exact) ? 'active' : ''}`}
              title={collapsed ? label : undefined}
              onClick={() => setMobileOpen(false)}
            >
              <Icon size={18} className="admin-nav-icon" />
              {!collapsed && <span>{label}</span>}
            </Link>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="admin-sidebar-footer">
          {!collapsed && (
            <div className="admin-sidebar-user">
              <div className="admin-sidebar-avatar">
                {(user?.firstName?.[0] || user?.email?.[0] || 'A').toUpperCase()}
              </div>
              <div className="admin-sidebar-user-info">
                <span className="admin-sidebar-user-name">
                  {user?.firstName || 'Admin'}
                </span>
                <span className="admin-sidebar-user-role">{user?.role}</span>
              </div>
            </div>
          )}
          <button
            className="admin-sidebar-logout"
            onClick={() => {
              setMobileOpen(false);
              setShowLogoutConfirm(true);
            }}
            title="Logout"
          >
            <LogOut size={16} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>

        <ConfirmModal
          isOpen={showLogoutConfirm}
          title="Logout of Évora Admin?"
          message="Are you sure you want to log out of the administration panel? You will be redirected to the home page."
          confirmLabel="Logout"
          cancelLabel="Stay logged in"
          variant="danger"
          loading={loggingOut}
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutConfirm(false)}
        />
      </aside>
    </>
  );
}
