'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { ToastContainer } from '@/components/admin/Toast';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Guard: must be authenticated and be ADMIN or SUPER_ADMIN
    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }
    if (user && !['ADMIN', 'SUPER_ADMIN'].includes(user.role)) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, user, router]);

  useEffect(() => {
    document.documentElement.classList.add('admin-theme');
    return () => {
      document.documentElement.classList.remove('admin-theme');
    };
  }, []);

  if (!isAuthenticated || (user && !['ADMIN', 'SUPER_ADMIN'].includes(user.role))) {
    return (
      <div className="admin-loading-screen">
        <div className="admin-spinner" />
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <AdminSidebar />
      <main className="admin-main">
        {children}
      </main>
      <ToastContainer />
    </div>
  );
}
