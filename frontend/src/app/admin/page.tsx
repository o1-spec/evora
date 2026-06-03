'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { StatCard } from '@/components/admin/StatCard';
import { AdminBadge } from '@/components/admin/AdminBadge';
import { DashboardChart } from '@/components/admin/DashboardChart';
import {
  Users, GraduationCap, Shield, ClipboardList, Activity,
  CreditCard, CheckCircle, BookOpen,
} from 'lucide-react';

async function fetchStats() {
  const { data } = await api.get('/admin/stats');
  return data.data;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function UserInitial({ user }: { user: any }) {
  const initial = (user.firstName?.[0] || user.email?.[0] || '?').toUpperCase();
  return (
    <div style={{
      width: 36, height: 36, borderRadius: '50%',
      background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontWeight: 700, fontSize: 14, flexShrink: 0,
    }}>
      {initial}
    </div>
  );
}

export default function AdminDashboard() {
  const { data, isLoading, error } = useQuery({ queryKey: ['admin-stats'], queryFn: fetchStats });

  if (isLoading) return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div className="skeleton" style={{ height: 32, width: 200 }} />
        <div className="skeleton" style={{ height: 20, width: 280, marginTop: 8 }} />
      </div>
      <div className="admin-stat-grid">
        {[...Array(8)].map((_, i) => <div key={i} className="skeleton" style={{ height: 130, borderRadius: 16 }} />)}
      </div>
    </div>
  );

  if (error) return (
    <div className="admin-page">
      <div className="admin-error-state">
        <Shield size={40} />
        <h3>Failed to load dashboard</h3>
        <p>Could not connect to the admin API. Check your session and try again.</p>
      </div>
    </div>
  );

  const { stats, recentUsers, recentAttempts, trends } = data;

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-page-header">
        <h1 className="admin-page-title">Dashboard</h1>
        <p className="admin-page-subtitle">Live overview of all Évora platform activity</p>
      </div>

      {/* Stat Cards */}
      <div className="admin-stat-grid">
        <StatCard title="Total Users" value={stats.totalUsers} icon={Users} color="blue" />
        <StatCard title="Students" value={stats.totalStudents} icon={GraduationCap} color="green" />
        <StatCard title="Admins & Instructors" value={stats.totalAdminsInstructors} icon={Shield} color="purple" />
        <StatCard title="Active Subscriptions" value={stats.activeSubscriptions} icon={CreditCard} color="orange" />
        <StatCard title="Total Attempts" value={stats.totalAttempts} icon={ClipboardList} color="cyan" />
        <StatCard title="Completed Attempts" value={stats.completedAttempts} icon={CheckCircle} color="green"
          subtitle={`${stats.totalAttempts > 0 ? Math.round((stats.completedAttempts / stats.totalAttempts) * 100) : 0}% completion rate`}
        />
        <StatCard title="AI Evaluations" value={stats.totalAiCalls} icon={Activity} color="purple" />
        <StatCard title="TCF Exams" value={stats.totalAttempts} icon={BookOpen} color="blue" />
      </div>

      {/* Charts */}
      {trends && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 20,
          marginTop: 24,
          marginBottom: 24
        }}>
          <DashboardChart
            title="User Signups (7d)"
            data={trends.signupTrends.map((t: any) => ({ label: t.date, value: t.count }))}
            type="line"
            color="#3b82f6"
            suffix=" users"
          />
          <DashboardChart
            title="AI Costs (7d)"
            data={trends.aiCostTrends.map((t: any) => ({ label: t.date, value: t.cost }))}
            type="bar"
            color="#a855f7"
            prefix="$"
            suffix=" USD"
          />
          <DashboardChart
            title="Exam Attempts (7d)"
            data={trends.attemptTrends.map((t: any) => ({ label: t.date, value: t.count }))}
            type="line"
            color="#10b981"
            suffix=" tests"
          />
        </div>
      )}

      {/* Recent Activity */}
      <div className="admin-two-col">
        {/* Recent Users */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Recent Users</h2>
            <a href="/admin/users" className="admin-card-link">View all →</a>
          </div>
          <div className="admin-list">
            {recentUsers.length === 0 ? (
              <p className="admin-empty-text">No users yet.</p>
            ) : recentUsers.map((u: any) => (
              <div key={u.id} className="admin-list-item">
                <UserInitial user={u} />
                <div className="admin-list-info">
                  <span className="admin-list-primary">
                    {u.firstName || ''} {u.lastName || ''}
                    {!u.firstName && !u.lastName ? u.email : ''}
                  </span>
                  <span className="admin-list-secondary">{u.email}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                  <AdminBadge value={u.role} variant="role" />
                  <AdminBadge value={u.subscriptionTier} variant="tier" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Attempts */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Recent Exam Attempts</h2>
            <a href="/admin/attempts" className="admin-card-link">View all →</a>
          </div>
          <div className="admin-list">
            {recentAttempts.length === 0 ? (
              <p className="admin-empty-text">No attempts yet.</p>
            ) : recentAttempts.map((a: any) => (
              <div key={a.id} className="admin-list-item">
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: a.completedAt ? '#1a3a2a' : '#3a2010',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <ClipboardList size={16} style={{ color: a.completedAt ? '#22c55e' : '#f97316' }} />
                </div>
                <div className="admin-list-info">
                  <span className="admin-list-primary">
                    {a.user?.firstName || ''} {a.user?.lastName || a.user?.email}
                  </span>
                  <span className="admin-list-secondary">{a.exam?.title}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                  <AdminBadge value={a.completedAt ? 'COMPLETED' : 'IN_PROGRESS'} />
                  {a.clbLevel && <span style={{ fontSize: 11, color: '#67e8f9', fontWeight: 700 }}>{a.clbLevel}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
