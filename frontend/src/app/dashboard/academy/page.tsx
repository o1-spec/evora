'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  BookOpen, FileText, Mic, Headphones, PenTool, Target,
  MessageSquare, ChevronRight, Sparkles, Lock, CheckCircle,
  GraduationCap, Layers, Zap, Star
} from 'lucide-react';
import api from '@/lib/api';

// ─── TCF PREP DATA ──────────────────────────────────────────────────────────

const TCF_BANDS = [
  {
    id: 'beginner',
    label: 'Beginner Band',
    clb: 'CLB 4–5',
    cefr: 'A2',
    emoji: '🌱',
    color: '#ef4444',
    bgColor: 'rgba(239,68,68,0.06)',
    borderColor: 'rgba(239,68,68,0.3)',
    desc: 'Foundation-level TCF practice. Build confidence with simple texts, short dialogues, and basic writing tasks.',
    progress: 35,
    skills: [
      { label: 'Written Expression', sub: 'Expression Écrite', icon: PenTool, href: '/written-expression', exercises: 12, done: 4 },
      { label: 'Oral Expression', sub: 'Expression Orale', icon: Mic, href: '/oral-expression', exercises: 10, done: 3 },
      { label: 'Reading Comprehension', sub: 'Compréhension Écrite', icon: BookOpen, href: '/reading-comprehension', exercises: 15, done: 7 },
      { label: 'Oral Comprehension', sub: 'Compréhension Orale', icon: Headphones, href: '/oral-comprehension', exercises: 12, done: 5 },
    ],
  },
  {
    id: 'intermediate',
    label: 'Intermediate Band',
    clb: 'CLB 6–7',
    cefr: 'B1–B2',
    emoji: '📈',
    color: '#f97316',
    bgColor: 'rgba(249,115,22,0.06)',
    borderColor: 'rgba(249,115,22,0.3)',
    desc: 'The most critical band for Canadian immigration. Target B2 mastery across all four TCF skills for CLB 7.',
    progress: 60,
    recommended: true,
    skills: [
      { label: 'Written Expression', sub: 'Expression Écrite', icon: PenTool, href: '/written-expression', exercises: 18, done: 11 },
      { label: 'Oral Expression', sub: 'Expression Orale', icon: Mic, href: '/oral-expression', exercises: 16, done: 9 },
      { label: 'Reading Comprehension', sub: 'Compréhension Écrite', icon: BookOpen, href: '/reading-comprehension', exercises: 20, done: 12 },
      { label: 'Oral Comprehension', sub: 'Compréhension Orale', icon: Headphones, href: '/oral-comprehension', exercises: 18, done: 11 },
    ],
  },
  {
    id: 'advanced',
    label: 'Advanced Band',
    clb: 'CLB 8–9',
    cefr: 'B2–C1',
    emoji: '🏆',
    color: '#3b82f6',
    bgColor: 'rgba(59,130,246,0.06)',
    borderColor: 'rgba(59,130,246,0.3)',
    desc: 'Push beyond the immigration threshold. Master complex argumentation, nuanced listening, and advanced editorial writing.',
    progress: 20,
    skills: [
      { label: 'Written Expression', sub: 'Expression Écrite', icon: PenTool, href: '/written-expression', exercises: 20, done: 4 },
      { label: 'Oral Expression', sub: 'Expression Orale', icon: Mic, href: '/oral-expression', exercises: 18, done: 3 },
      { label: 'Reading Comprehension', sub: 'Compréhension Écrite', icon: BookOpen, href: '/reading-comprehension', exercises: 22, done: 5 },
      { label: 'Oral Comprehension', sub: 'Compréhension Orale', icon: Headphones, href: '/oral-comprehension', exercises: 20, done: 4 },
    ],
  },
  {
    id: 'expert',
    label: 'Expert Band',
    clb: 'CLB 10–12',
    cefr: 'C1–C2',
    emoji: '⭐',
    color: '#8b5cf6',
    bgColor: 'rgba(139,92,246,0.06)',
    borderColor: 'rgba(139,92,246,0.3)',
    desc: 'Elite-level TCF mastery. Designed for professional-grade French fluency and maximum immigration points.',
    progress: 5,
    skills: [
      { label: 'Written Expression', sub: 'Expression Écrite', icon: PenTool, href: '/written-expression', exercises: 22, done: 1 },
      { label: 'Oral Expression', sub: 'Expression Orale', icon: Mic, href: '/oral-expression', exercises: 20, done: 0 },
      { label: 'Reading Comprehension', sub: 'Compréhension Écrite', icon: BookOpen, href: '/reading-comprehension', exercises: 24, done: 2 },
      { label: 'Oral Comprehension', sub: 'Compréhension Orale', icon: Headphones, href: '/oral-comprehension', exercises: 22, done: 0 },
    ],
  },
];

// ─── COMPREHENSIVE FRENCH METADATA ──────────────────────────────────────────

const LEVEL_METADATA: Record<string, { title: string; emoji: string; color: string; bgColor: string; borderColor: string; desc: string }> = {
  a1: {
    title: 'Beginner',
    emoji: '🌱',
    color: '#ef4444',
    bgColor: 'rgba(239, 68, 68, 0.04)',
    borderColor: 'rgba(239, 68, 68, 0.2)',
    desc: "Start from zero. Learn greetings, numbers, colors, days, and your first 200 essential words."
  },
  a2: {
    title: 'Elementary',
    emoji: '📖',
    color: '#f97316',
    bgColor: 'rgba(249, 115, 22, 0.04)',
    borderColor: 'rgba(249, 115, 22, 0.2)',
    desc: "Communicate in familiar everyday situations. Shopping, transportation, appointments and short messages."
  },
  b1: {
    title: 'Intermediate',
    emoji: '💬',
    color: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.04)',
    borderColor: 'rgba(16, 185, 129, 0.2)',
    desc: "Handle most travel and work situations. Express opinions clearly on familiar topics."
  },
  b2: {
    title: 'Advanced — TCF Target',
    emoji: '🎯',
    color: '#3b82f6',
    bgColor: 'rgba(59, 130, 246, 0.04)',
    borderColor: 'rgba(59, 130, 246, 0.2)',
    desc: "The TCF Canada sweet spot. Complex text comprehension, structured argumentation, professional communication."
  },
  c1: {
    title: 'Autonomous',
    emoji: '🏅',
    color: '#8b5cf6',
    bgColor: 'rgba(139, 92, 246, 0.04)',
    borderColor: 'rgba(139, 92, 246, 0.2)',
    desc: "Fluent, spontaneous expression on complex, abstract topics. Academic and professional French mastery."
  },
  c2: {
    title: 'Mastery',
    emoji: '⭐',
    color: '#64748b',
    bgColor: 'rgba(100, 116, 139, 0.04)',
    borderColor: 'rgba(100, 116, 139, 0.2)',
    desc: "Near-native mastery. Understand virtually anything read or heard with effortless precision."
  }
};


// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

function ProgressBar({ value, color }: { value: number; color: string }) {
  return (
    <div style={{ height: 5, backgroundColor: 'hsl(var(--border))', borderRadius: 999, overflow: 'hidden' }}>
      <div style={{ width: `${value}%`, height: '100%', backgroundColor: color, borderRadius: 999, transition: 'width 0.6s ease' }} />
    </div>
  );
}

function SkillCard({ skill, bandColor }: { skill: typeof TCF_BANDS[0]['skills'][0]; bandColor: string }) {
  const Icon = skill.icon;
  const pct = Math.round((skill.done / skill.exercises) * 100);
  return (
    <Link href={skill.href} style={{ textDecoration: 'none' }}>
      <div
        className="card"
        style={{
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          height: '100%',
          transition: 'box-shadow 0.2s, transform 0.15s',
          cursor: 'pointer',
        }}
        onMouseOver={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
        onMouseOut={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, backgroundColor: `${bandColor}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon size={17} color={bandColor} />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'hsl(var(--text-primary))' }}>{skill.label}</div>
              <div style={{ fontSize: '0.7rem', color: 'hsl(var(--text-muted))' }}>{skill.sub}</div>
            </div>
          </div>
          <ChevronRight size={14} color="hsl(var(--text-muted))" />
        </div>

        <ProgressBar value={pct} color={bandColor} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem' }}>
          <span style={{ color: 'hsl(var(--text-muted))' }}>{skill.done}/{skill.exercises} exercises</span>
          <span style={{ fontWeight: 700, color: bandColor }}>{pct}%</span>
        </div>
      </div>
    </Link>
  );
}

function ModuleCard({ mod, levelColor, levelCode }: { mod: { label: string; icon: any; count: number; done: number }; levelColor: string; levelCode: string }) {
  const Icon = mod.icon;
  const pct = mod.count > 0 ? Math.round((mod.done / mod.count) * 100) : 0;

  // Determine query parameter based on label
  let tabParam = 'all';
  const lbl = mod.label.toLowerCase();
  if (lbl.includes('vocab')) tabParam = 'vocabulary';
  else if (lbl.includes('gramm')) tabParam = 'grammar';
  else if (lbl.includes('dialog') || lbl.includes('convers')) tabParam = 'dialogues';
  else if (lbl.includes('écri') || lbl.includes('text')) tabParam = 'writing';
  else if (lbl.includes('débat') || lbl.includes('oral') || lbl.includes('speech')) tabParam = 'speaking';

  return (
    <Link href={`/dashboard/academy/${levelCode.toLowerCase()}?tab=${tabParam}`} style={{ textDecoration: 'none' }}>
      <div
        className="card"
        style={{
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          height: '100%',
          cursor: 'pointer',
          transition: 'transform 0.15s, box-shadow 0.2s',
        }}
        onMouseOver={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
        onMouseOut={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, backgroundColor: `${levelColor}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon size={17} color={levelColor} />
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'hsl(var(--text-primary))' }}>{mod.label}</span>
        </div>
        <ProgressBar value={pct} color={levelColor} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
          <span style={{ color: 'hsl(var(--text-muted))' }}>{mod.done}/{mod.count} leçons</span>
          <span style={{ fontWeight: 700, color: levelColor }}>{pct}%</span>
        </div>
      </div>
    </Link>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────

export default function AcademyPage() {
  const [activeTrack, setActiveTrack] = useState<'tcf' | 'french'>('tcf');
  const [tcfBands, setTcfBands] = useState(TCF_BANDS);
  const [frenchLevels, setFrenchLevels] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('evora_academy_track');
      if (saved === 'tcf' || saved === 'french') {
        setActiveTrack(saved as 'tcf' | 'french');
      }
    }
  }, []);

  const handleTrackChange = (track: 'tcf' | 'french') => {
    setActiveTrack(track);
    if (typeof window !== 'undefined') {
      localStorage.setItem('evora_academy_track', track);
    }
  };

  useEffect(() => {
    async function loadProgress() {
      try {
        const { data } = await api.get('/learning/progress/academy');
        
        // 1. Update TCF Bands state dynamically based on API responses
        setTcfBands(prev => prev.map(band => {
          const apiBand = data[band.id];
          if (apiBand) {
            return {
              ...band,
              progress: apiBand.progress,
              skills: band.skills.map(skill => {
                const apiSkill = apiBand.skills.find((s: any) => s.label === skill.label);
                return apiSkill ? { ...skill, done: apiSkill.done, exercises: apiSkill.exercises } : skill;
              })
            };
          }
          return band;
        }));

        // 2. Build Comprehensive French CEFR Levels dynamically from the API response
        const activeLevels: any[] = [];
        ['a1', 'a2', 'b1', 'b2', 'c1', 'c2'].forEach(code => {
          const apiLevel = data[code];
          if (apiLevel) {
            const meta = LEVEL_METADATA[code] || {
              title: code.toUpperCase(),
              emoji: '📚',
              color: 'hsl(var(--primary))',
              bgColor: 'hsl(var(--primary-light))',
              borderColor: 'hsl(var(--border))',
              desc: 'General French Course Level.'
            };

            const vocabModules = apiLevel.modules.filter((m: any) => m.label.toLowerCase().includes('vocab'));
            const otherModules = apiLevel.modules.filter((m: any) => !m.label.toLowerCase().includes('vocab'));

            const modules: any[] = [];

            if (vocabModules.length > 0) {
              const totalCount = vocabModules.reduce((sum: number, m: any) => sum + m.count, 0);
              const totalDone = vocabModules.reduce((sum: number, m: any) => sum + m.done, 0);
              const hasFrenchVocab = vocabModules.some((m: any) => m.label.toLowerCase().includes('vocabulaire'));
              const label = hasFrenchVocab ? 'Vocabulaire' : 'Vocabulary';

              modules.push({
                label,
                icon: Layers,
                count: totalCount,
                done: totalDone
              });
            }

            otherModules.forEach((m: any) => {
              let icon = BookOpen;
              const lbl = m.label.toLowerCase();
              if (lbl.includes('gramm')) icon = BookOpen;
              else if (lbl.includes('dialog') || lbl.includes('convers')) icon = MessageSquare;
              else if (lbl.includes('écri') || lbl.includes('text')) icon = PenTool;
              else if (lbl.includes('débat') || lbl.includes('oral') || lbl.includes('speech')) icon = Mic;
              else icon = Star;

              modules.push({
                label: m.label,
                icon,
                count: m.count,
                done: m.done
              });
            });

            activeLevels.push({
              code: code.toUpperCase(),
              title: meta.title,
              emoji: meta.emoji,
              color: meta.color,
              bgColor: meta.bgColor,
              borderColor: meta.borderColor,
              desc: meta.desc,
              progress: apiLevel.progress,
              modules
            });
          }
        });

        setFrenchLevels(activeLevels);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load live academy progress:', error);
        setIsLoading(false);
      }
    }
    loadProgress();
  }, []);

  return (
    <div>
      {/* Page Header */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
          <GraduationCap size={24} color="hsl(var(--primary))" />
          <h1 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.875rem', fontWeight: 800 }}>Academy</h1>
        </div>
        <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.95rem' }}>
          Choose your learning path — targeted TCF exam prep or comprehensive French from beginner to expert.
        </p>
      </motion.div>

      {/* Track Toggle Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        style={{
          display: 'inline-flex',
          backgroundColor: 'white',
          border: '1px solid hsl(var(--border))',
          borderRadius: '0.875rem',
          padding: '0.3rem',
          marginBottom: '2.5rem',
          gap: '0.25rem',
        }}
      >
        {[
          { key: 'tcf', label: 'TCF Exam Prep', icon: Target, desc: 'CLB-banded practice' },
          { key: 'french', label: 'Comprehensive French', icon: BookOpen, desc: 'A1 → C2 full course' },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTrack === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => handleTrackChange(tab.key as 'tcf' | 'french')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.6rem 1.25rem',
                borderRadius: '0.625rem',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: isActive ? 700 : 500,
                backgroundColor: isActive ? 'hsl(var(--primary))' : 'transparent',
                color: isActive ? 'white' : 'hsl(var(--text-secondary))',
                transition: 'all 0.2s ease',
              }}
            >
              <Icon size={15} />
              {tab.label}
            </button>
          );
        })}
      </motion.div>

      {/* Track Content */}
      <AnimatePresence mode="wait">
        {activeTrack === 'tcf' ? (
          <motion.div
            key="tcf"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {/* TCF Info Banner */}
            <div
              className="card"
              style={{
                padding: '1rem 1.5rem',
                marginBottom: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                backgroundColor: 'hsl(var(--primary-light))',
                borderLeft: '4px solid hsl(var(--primary))',
                flexWrap: 'wrap',
              }}
            >
              <Zap size={20} color="hsl(var(--primary))" style={{ flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'hsl(var(--primary-hover))' }}>
                  Your Goal: CLB 7 (B2 Intermediate Band)
                </div>
                <div style={{ fontSize: '0.82rem', color: 'hsl(var(--primary))' }}>
                  Focus on the Intermediate Band below. Complete all 4 skills at CLB 6–7 to hit your immigration target.
                </div>
              </div>
              <Link href="/dashboard/exams" style={{ marginLeft: 'auto', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'hsl(var(--primary))', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  Full Mock Exam <ChevronRight size={14} />
                </span>
              </Link>
            </div>

            {/* CLB Bands */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {tcfBands.map((band, bi) => (
                <motion.div
                  key={band.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: bi * 0.08 }}
                >
                  {/* Band Header */}
                  <div
                    style={{
                      backgroundColor: band.bgColor,
                      border: `1px solid ${band.borderColor}`,
                      borderRadius: '1rem',
                      padding: '1.25rem 1.5rem',
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '1rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>{band.emoji}</span>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                          <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.1rem', fontWeight: 800, color: 'hsl(var(--text-primary))' }}>
                            {band.label}
                          </h2>
                          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: band.color, backgroundColor: `${band.color}18`, padding: '0.15rem 0.5rem', borderRadius: 999 }}>
                            {band.cefr}
                          </span>
                          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'hsl(var(--text-muted))', backgroundColor: 'hsl(var(--bg-base))', padding: '0.15rem 0.5rem', borderRadius: 999, border: '1px solid hsl(var(--border))' }}>
                            {band.clb}
                          </span>
                          {band.recommended && (
                            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#f97316', backgroundColor: 'rgba(249,115,22,0.1)', padding: '0.15rem 0.5rem', borderRadius: 999 }}>
                              ★ Recommended
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'hsl(var(--text-secondary))', marginTop: '0.2rem', maxWidth: '520px' }}>
                          {band.desc}
                        </p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.3rem', minWidth: '100px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: band.color }}>{band.progress}% complete</span>
                      <div style={{ width: '100px' }}>
                        <ProgressBar value={band.progress} color={band.color} />
                      </div>
                    </div>
                  </div>

                  {/* Skill Cards Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1rem' }}>
                    {band.skills.map(skill => (
                      <SkillCard key={skill.label} skill={skill} bandColor={band.color} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="french"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {/* Comprehensive Info Banner */}
            <div
              className="card"
              style={{
                padding: '1rem 1.5rem',
                marginBottom: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                backgroundColor: 'rgba(16,185,129,0.05)',
                borderLeft: '4px solid #10b981',
                flexWrap: 'wrap',
              }}
            >
              <Sparkles size={20} color="#10b981" style={{ flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#059669' }}>
                  Complete French Journey — A1 to C2
                </div>
                <div style={{ fontSize: '0.82rem', color: '#10b981' }}>
                  All levels are freely accessible. Each CEFR level contains vocabulary, grammar, dialogues, and writing exercises.
                </div>
              </div>
            </div>

            {/* CEFR Level Sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {frenchLevels.length === 0 ? (
                <div className="card" style={{ padding: '3.5rem 2rem', textAlign: 'center', color: 'hsl(var(--text-secondary))', backgroundColor: 'white', border: '1px dashed hsl(var(--border))', borderRadius: '1.25rem' }}>
                  <BookOpen size={40} color="hsl(var(--text-muted))" style={{ margin: '0 auto 1.25rem', display: 'block', opacity: 0.7 }} />
                  <div style={{ fontWeight: 800, fontSize: '1.15rem', color: 'hsl(var(--text-primary))', marginBottom: '0.35rem', fontFamily: 'Outfit, sans-serif' }}>No Levels Loaded</div>
                  <p style={{ fontSize: '0.875rem', color: 'hsl(var(--text-muted))', maxWidth: '440px', margin: '0 auto', lineHeight: 1.5 }}>
                    The learning database is currently empty. Run the database seed script to populate levels A1 to C2 and start learning step-by-step.
                  </p>
                </div>
              ) : (
                frenchLevels.map((level, li) => (
                  <motion.div
                    key={level.code}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: li * 0.08 }}
                  >
                    {/* Level Header */}
                    <Link href={`/dashboard/academy/${level.code.toLowerCase()}`} style={{ textDecoration: 'none' }}>
                      <div
                        style={{
                          backgroundColor: level.bgColor,
                          border: `1px solid ${level.borderColor}`,
                          borderRadius: '1rem',
                          padding: '1.25rem 1.5rem',
                          marginBottom: '1rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          gap: '1rem',
                          cursor: 'pointer',
                          transition: 'transform 0.15s, box-shadow 0.2s',
                        }}
                        onMouseOver={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-1px)'; }}
                        onMouseOut={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{
                            width: 48, height: 48, borderRadius: 12,
                            backgroundColor: `${level.color}18`,
                            border: `2px solid ${level.borderColor}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: '1rem', color: level.color,
                            flexShrink: 0,
                          }}>
                            {level.code}
                          </div>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                              <h2 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.1rem', fontWeight: 800, color: 'hsl(var(--text-primary))' }}>
                                {level.emoji} {level.title}
                              </h2>
                              {level.recommended && (
                                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.1)', padding: '0.15rem 0.5rem', borderRadius: 999 }}>
                                  ★ TCF Target Level
                                </span>
                              )}
                            </div>
                            <p style={{ fontSize: '0.8rem', color: 'hsl(var(--text-secondary))', marginTop: '0.2rem', maxWidth: '520px' }}>
                              {level.desc}
                            </p>
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.3rem', minWidth: '110px' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: level.color }}>
                            {level.progress > 0 ? `${level.progress}% complete` : 'Not started'}
                          </span>
                          <div style={{ width: '110px' }}>
                            <ProgressBar value={level.progress} color={level.color} />
                          </div>
                        </div>
                      </div>
                    </Link>

                    {/* Module Cards Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '1rem' }}>
                      {level.modules.map((mod: any) => (
                        <ModuleCard key={mod.label} mod={mod} levelColor={level.color} levelCode={level.code} />
                      ))}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
