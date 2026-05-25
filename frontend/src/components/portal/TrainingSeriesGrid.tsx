'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, Play, BookOpen, Headphones, PenLine, Mic, 
  Clock, Award, HelpCircle, Lightbulb, ChevronRight, 
  ArrowLeft, CheckCircle2, ShieldCheck, Sparkles 
} from 'lucide-react';

interface TrainingSeriesGridProps {
  sectionType: 'READING' | 'WRITING' | 'LISTENING' | 'SPEAKING';
  title: string;
}

const SECTION_METADATA = {
  READING: {
    icon: BookOpen,
    label: 'Reading Comprehension',
    badgeText: 'Compréhension Écrite',
    color: '221 83% 53%', // Primary Blue
    accentColor: '221, 83%, 53%',
    desc: 'TCF Canada Compréhension Écrite training sets. Accelerate text-scanning speeds and master grammar nuances.',
  },
  WRITING: {
    icon: PenLine,
    label: 'Written Expression',
    badgeText: 'Expression Écrite',
    color: '262 83% 53%', // Purple
    accentColor: '262, 83%, 53%',
    desc: 'TCF Canada Expression Écrite simulated tasks. Structure argumentative essays and clear everyday correspondences.',
  },
  LISTENING: {
    icon: Headphones,
    label: 'Oral Comprehension',
    badgeText: 'Compréhension Orale',
    color: '142 71% 45%', // Emerald
    accentColor: '142, 71%, 45%',
    desc: 'TCF Canada Compréhension Orale practice audio files. Enhance spoken keyword parsing under strict exam constraints.',
  },
  SPEAKING: {
    icon: Mic,
    label: 'Oral Expression',
    badgeText: 'Expression Orale',
    color: '24 95% 53%', // Orange/Amber
    accentColor: '24, 95%, 53%',
    desc: 'TCF Canada Expression Orale simulated speaking modules. Excel in structured presentations and interact with active prompts.',
  }
};

export default function TrainingSeriesGrid({ sectionType, title }: TrainingSeriesGridProps) {
  const meta = SECTION_METADATA[sectionType];
  const IconComponent = meta.icon;

  const [activeFilter, setActiveFilter] = useState<'ALL' | 'FINISHED' | 'UNFINISHED'>('ALL');
  const [selectedSeries, setSelectedSeries] = useState<number | null>(null);
  const [isLaunching, setIsLaunching] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  // Generate 40 simulated Series
  // Series 1, 2, 3 are unlocked. Series 4 to 40 are locked/Premium
  const seriesList = Array.from({ length: 40 }, (_, i) => {
    const id = i + 1;
    const isUnlocked = id <= 3;
    const isFinished = id === 1; // Mark Series 1 as finished for visual variety
    return {
      id,
      title: `Series ${id}`,
      questionsCount: 39,
      durationMinutes: 60,
      points: 699,
      isUnlocked,
      isFinished,
    };
  });

  const filteredSeries = seriesList.filter(series => {
    if (activeFilter === 'FINISHED') return series.isFinished;
    if (activeFilter === 'UNFINISHED') return !series.isFinished;
    return true;
  });

  // Launch countdown simulator
  const handleStartExam = () => {
    setIsLaunching(true);
    setCountdown(3);
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev === null) return null;
        if (prev <= 1) {
          clearInterval(interval);
          setTimeout(() => {
            // Simulator mock finish - reset modal
            setIsLaunching(false);
            setCountdown(null);
            setSelectedSeries(null);
            alert(`🚀 TCF Canada ${meta.label} - Series ${selectedSeries} Mock Simulator Activated! (Questions and testing controls would load here)`);
          }, 600);
          return 0;
        }
        return prev - 1;
      });
    }, 800);
  };

  return (
    <div style={{ backgroundColor: 'hsl(var(--bg-base))', minHeight: '100vh', paddingBottom: '6rem' }}>
      
      {/* 🔮 High-End Glassmorphic Banner with Glowing Gradient */}
      <div 
        style={{
          background: `linear-gradient(135deg, hsl(${meta.color}) 0%, hsl(262 70% 30%) 100%)`,
          position: 'relative',
          overflow: 'hidden',
          padding: '4.5rem 1.5rem 6.5rem 1.5rem',
          textAlign: 'center',
          color: 'white',
          boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.15)'
        }}
      >
        {/* Soft floating background light blobs */}
        <div style={{ position: 'absolute', top: '-10%', left: '20%', width: '300px', height: '300px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '50%', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', bottom: '-20%', right: '15%', width: '250px', height: '250px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '50%', filter: 'blur(60px)' }} />

        <div style={{ maxWidth: '960px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <motion.div 
            initial={{ opacity: 0, y: -12 }} 
            animate={{ opacity: 1, y: 0 }}
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              backgroundColor: 'rgba(255, 255, 255, 0.12)', 
              backdropFilter: 'blur(10px)',
              padding: '0.4rem 1rem', 
              borderRadius: '999px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '1.5rem'
            }}
          >
            <IconComponent size={14} />
            {meta.badgeText}
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 12 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ 
              fontSize: '3rem', 
              fontWeight: 900, 
              color: 'white', 
              letterSpacing: '-0.02em', 
              marginBottom: '1rem',
              textShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}
          >
            40 Exclusive Training Series
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 12 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ 
              color: 'rgba(255, 255, 255, 0.85)', 
              maxWidth: '650px', 
              margin: '0 auto 2.5rem', 
              fontSize: '1.05rem', 
              lineHeight: 1.6 
            }}
          >
            {meta.desc}
          </motion.p>

          {/* Quick Metrics Badges */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              flexWrap: 'wrap', 
              gap: '1rem' 
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)', padding: '0.5rem 1.25rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Clock size={16} />
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>60 Minutes / Series</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)', padding: '0.5rem 1.25rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.1)' }}>
              <HelpCircle size={16} />
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>39 Custom Questions</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)', padding: '0.5rem 1.25rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Award size={16} />
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>CLB 4 to CLB 10+ Scaling</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 🚀 Main Portal Container */}
      <div style={{ maxWidth: '1200px', margin: '-3.5rem auto 0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 10 }}>
        
        {/* Modern Sliding Filter Pill Control */}
        <div 
          className="card"
          style={{ 
            padding: '0.5rem', 
            borderRadius: '1.25rem', 
            display: 'inline-flex', 
            gap: '0.25rem',
            backgroundColor: 'white',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05), 0 10px 10px -5px rgba(0,0,0,0.02)',
            marginBottom: '3rem'
          }}
        >
          {(['ALL', 'FINISHED', 'UNFINISHED'] as const).map((filter) => {
            const isActive = activeFilter === filter;
            const label = filter === 'ALL' ? 'All Practice Sets' : filter === 'FINISHED' ? 'Completed' : 'Incomplete';
            const count = filter === 'ALL' ? 40 : filter === 'FINISHED' ? 1 : 39;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                style={{
                  padding: '0.6rem 1.25rem',
                  borderRadius: '1rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  position: 'relative',
                  backgroundColor: isActive ? `hsl(${meta.color})` : 'transparent',
                  color: isActive ? 'white' : 'hsl(var(--text-secondary))',
                  transition: 'all 0.25s ease'
                }}
              >
                {label}
                <span 
                  style={{ 
                    fontSize: '0.75rem', 
                    padding: '0.1rem 0.4rem', 
                    borderRadius: '0.5rem',
                    backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'hsl(var(--bg-base))',
                    color: isActive ? 'white' : 'hsl(var(--text-muted))',
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 🎴 Series Grid */}
        <motion.div 
          layout
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '1.5rem' 
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredSeries.map((series) => (
              <motion.div
                key={series.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={() => series.isUnlocked && setSelectedSeries(series.id)}
                className="card"
                style={{
                  padding: '1.75rem',
                  borderRadius: '1.25rem',
                  backgroundColor: 'white',
                  cursor: series.isUnlocked ? 'pointer' : 'default',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '190px',
                  border: series.isFinished ? '1.5px solid hsl(142, 71%, 45%)' : '1px solid hsl(var(--border))',
                  boxShadow: series.isUnlocked ? '0 4px 6px -1px rgba(0,0,0,0.02), 0 2px 4px -1px rgba(0,0,0,0.01)' : 'none',
                  opacity: series.isUnlocked ? 1 : 0.82
                }}
                whileHover={series.isUnlocked ? { 
                  y: -5, 
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  borderColor: `rgba(var(--accent-color), 0.3)` 
                } : {}}
              >
                {/* Visual Glow Indicator for finished/unlocked series */}
                {series.isFinished && (
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', backgroundColor: 'hsl(142, 71%, 45%)' }} />
                )}
                {series.isUnlocked && !series.isFinished && (
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', backgroundColor: `hsl(${meta.color})` }} />
                )}

                {/* Card Top Information */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'hsl(var(--text-primary))' }}>
                      {series.title}
                    </h3>
                    
                    {series.isFinished ? (
                      <span className="badge badge-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', padding: '0.2rem 0.5rem', fontSize: '0.7rem' }}>
                        <CheckCircle2 size={12} />
                        Completed
                      </span>
                    ) : series.isUnlocked ? (
                      <span className="badge badge-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', padding: '0.2rem 0.5rem', fontSize: '0.7rem' }}>
                        Active
                      </span>
                    ) : (
                      <span style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '0.2rem', 
                        padding: '0.2rem 0.5rem', 
                        fontSize: '0.7rem',
                        borderRadius: '999px',
                        backgroundColor: 'hsl(45, 100%, 96%)',
                        color: 'hsl(45, 100%, 35%)',
                        border: '1px solid hsl(45, 100%, 85%)',
                        fontWeight: 600
                      }}>
                        <Lock size={10} />
                        Premium
                      </span>
                    )}
                  </div>

                  <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.85rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <HelpCircle size={14} style={{ color: 'hsl(var(--text-muted))' }} />
                    {series.questionsCount} Questions included
                  </p>
                  <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.85rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                    <Clock size={14} style={{ color: 'hsl(var(--text-muted))' }} />
                    {series.durationMinutes} Minutes time constraint
                  </p>
                </div>

                {/* Card Bottom / Action Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid hsl(var(--border))', paddingTop: '0.75rem', marginTop: '1rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'hsl(var(--text-muted))' }}>
                    {series.points} Points
                  </span>

                  {series.isUnlocked ? (
                    <span 
                      style={{ 
                        fontSize: '0.8rem', 
                        fontWeight: 700, 
                        color: `hsl(${meta.color})`, 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.25rem',
                        transition: 'transform 0.2s'
                      }}
                      className="group-hover:translate-x-1"
                    >
                      Start Test
                      <ChevronRight size={14} />
                    </span>
                  ) : (
                    <button 
                      onClick={(e) => { e.stopPropagation(); alert('Premium activation triggered. Redirecting to stripe plan checkout page...'); }}
                      style={{ 
                        padding: '0.35rem 0.85rem', 
                        borderRadius: '0.5rem', 
                        border: '1px solid hsl(45, 100%, 80%)', 
                        backgroundColor: 'hsl(45, 100%, 98%)',
                        color: 'hsl(45, 100%, 35%)',
                        fontSize: '0.75rem', 
                        fontWeight: 700, 
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        boxShadow: '0 2px 4px rgba(229,191,0,0.05)',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'hsl(45, 100%, 94%)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'hsl(45, 100%, 98%)'; }}
                    >
                      <Sparkles size={12} />
                      Unlock Set
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* 🚪 Premium Redesigned Dialog Modal */}
      <AnimatePresence>
        {selectedSeries !== null && (
          <div 
            style={{ 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0, 
              backgroundColor: 'rgba(9, 13, 22, 0.45)', 
              backdropFilter: 'blur(12px)',
              zIndex: 9999, 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              padding: '1.5rem'
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="card-elevated"
              style={{
                width: '100%',
                maxWidth: '540px',
                backgroundColor: 'white',
                borderRadius: '1.75rem',
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid rgba(255,255,255,0.7)',
                padding: '2.25rem'
              }}
            >
              <AnimatePresence mode="wait">
                {isLaunching ? (
                  /* 🎬 Countdown Launcher Layout */
                  <motion.div 
                    key="launching" 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    style={{ textAlign: 'center', padding: '3rem 1rem' }}
                  >
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }} 
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      style={{ 
                        width: '90px', 
                        height: '90px', 
                        borderRadius: '50%', 
                        background: `hsl(${meta.color})`, 
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 2rem',
                        fontSize: '2.5rem',
                        fontWeight: 900,
                        boxShadow: `0 10px 25px -5px rgba(${meta.accentColor}, 0.4)`
                      }}
                    >
                      {countdown}
                    </motion.div>
                    
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                      Initializing French Exam Matrix...
                    </h3>
                    <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.9rem' }}>
                      Locking inputs and synchronizing 60-minute time grids.
                    </p>
                  </motion.div>
                ) : (
                  /* 🛡️ Strategic Confirmation Layout */
                  <motion.div 
                    key="confirm" 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                  >
                    {/* Header with platform logo / emblem */}
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                      <div 
                        style={{ 
                          width: '64px', 
                          height: '64px', 
                          borderRadius: '1.25rem', 
                          background: `linear-gradient(135deg, hsl(${meta.color}) 0%, hsl(262 70% 30%) 100%)`, 
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 1rem',
                          boxShadow: `0 8px 16px -4px rgba(${meta.accentColor}, 0.3)`
                        }}
                      >
                        <IconComponent size={28} />
                      </div>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: `hsl(${meta.color})`, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        TCF Prep Academy
                      </span>
                      <h2 style={{ fontSize: '1.75rem', fontWeight: 900, marginTop: '0.25rem' }}>
                        Practice Series {selectedSeries}
                      </h2>
                    </div>

                    {/* Highly aesthetic metrics boxes */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                      <div style={{ padding: '1rem', borderRadius: '1rem', backgroundColor: 'hsl(var(--bg-base))', textAlign: 'center', border: '1px solid hsl(var(--border))' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 900, color: `hsl(${meta.color})` }}>39</div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'hsl(var(--text-secondary))', marginTop: '0.1rem' }}>Questions</div>
                      </div>
                      <div style={{ padding: '1rem', borderRadius: '1rem', backgroundColor: 'hsl(var(--bg-base))', textAlign: 'center', border: '1px solid hsl(var(--border))' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 900, color: `hsl(${meta.color})` }}>60</div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'hsl(var(--text-secondary))', marginTop: '0.1rem' }}>Minutes</div>
                      </div>
                      <div style={{ padding: '1rem', borderRadius: '1rem', backgroundColor: 'hsl(var(--bg-base))', textAlign: 'center', border: '1px solid hsl(var(--border))' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 900, color: `hsl(${meta.color})` }}>699</div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'hsl(var(--text-secondary))', marginTop: '0.1rem' }}>Max Points</div>
                      </div>
                    </div>

                    {/* Elegant Amber Glow Strategic Advice Alert block */}
                    <div 
                      style={{ 
                        backgroundColor: 'hsl(35, 100%, 97%)', 
                        border: '1px solid hsl(35, 100%, 85%)', 
                        borderRadius: '1.25rem', 
                        padding: '1.25rem 1.5rem',
                        marginBottom: '2rem',
                        display: 'flex',
                        gap: '0.75rem'
                      }}
                    >
                      <Lightbulb size={20} style={{ color: 'hsl(35, 100%, 40%)', flexShrink: 0, marginTop: '0.1rem' }} />
                      <div>
                        <h4 style={{ color: 'hsl(35, 100%, 30%)', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                          Strategic Examiner Advice
                        </h4>
                        <p style={{ color: 'hsl(35, 95%, 25%)', fontSize: '0.8rem', lineHeight: 1.5 }}>
                          The questions increase progressively in difficulty: <strong>A1 &rarr; A2 &rarr; B1 &rarr; B2 &rarr; C1 &rarr; C2</strong>. 
                          Manage your time carefully. We highly recommend focusing the bulk of your reading on the final 20 high-tier questions, as they grant the maximum point weight.
                        </p>
                      </div>
                    </div>

                    {/* Action Panel */}
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                      <button 
                        onClick={() => setSelectedSeries(null)}
                        style={{
                          backgroundColor: 'transparent',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '0.75rem',
                          padding: '0.75rem 1.25rem',
                          color: 'hsl(var(--text-secondary))',
                          fontWeight: 600,
                          fontSize: '0.9rem',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'hsl(var(--bg-base))'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                      >
                        <ArrowLeft size={16} />
                        Go Back
                      </button>
                      
                      <button 
                        onClick={handleStartExam}
                        style={{
                          backgroundColor: `hsl(${meta.color})`,
                          border: 'none',
                          borderRadius: '0.75rem',
                          padding: '0.75rem 1.75rem',
                          color: 'white',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          boxShadow: `0 4px 14px rgba(${meta.accentColor}, 0.25)`,
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}
                      >
                        Start the test
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
