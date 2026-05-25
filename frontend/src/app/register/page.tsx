'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ArrowRight, Loader2, Mail, Lock, User, Eye, EyeOff, Sparkles, CheckCircle2, Trophy, ShieldCheck, Star, BookOpen, Clock, Activity } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuthStore();
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Stateful interactive slideshow tour carousel
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const carouselSlides = [
    {
      id: 0,
      badge: "Linguistic Correction Suite",
      badgeColor: "hsl(var(--primary))",
      title: "Interactive Written Simulator",
      description: "Get evaluated in real-time under strict exam constraints, featuring live word boundaries, strategic strategies, and detailed sentence revisions.",
      element: (
        <div style={{ position: 'relative', height: '220px', width: '100%', maxWidth: '360px', margin: '0 auto' }}>
          {/* Card 1: AI Scorecard (Back-left layer) */}
          <div style={{
            position: 'absolute', top: 0, left: '10px', width: '200px',
            borderRadius: '1.25rem', padding: '1.25rem', textAlign: 'left',
            backgroundColor: 'white',
            border: '1.5px solid #e2e8f0',
            boxShadow: '0 20px 40px -15px rgba(0,0,0,0.06)',
            zIndex: 1
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', color: 'hsl(var(--primary))', letterSpacing: '0.05em' }}>AI Evaluator</span>
              <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#10b981', backgroundColor: '#d1fae5', padding: '0.15rem 0.4rem', borderRadius: '0.25rem' }}>CLB 9</span>
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>Expression Écrite</div>
            <p style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.25rem', lineHeight: 1.4 }}>Coherence Score: 88%</p>
            <div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.75rem' }}>
              {[1,2,3,4,5].map(i => <Star key={i} size={10} fill="#f59e0b" color="#f59e0b" />)}
            </div>
          </div>

          {/* Card 2: Interactive Correction (Front-right layer) */}
          <div style={{
            position: 'absolute', bottom: '10px', right: '10px', width: '220px',
            borderRadius: '1.25rem', padding: '1.25rem', textAlign: 'left',
            backgroundColor: 'white',
            border: '1.5px solid #ddd6fe',
            boxShadow: '0 25px 50px -12px rgba(109,40,217,0.1)',
            zIndex: 2
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.75rem' }}>
              <Trophy size={14} color="#8b5cf6" />
              <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', color: '#8b5cf6', letterSpacing: '0.05em' }}>AI Corrections</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#ef4444', textDecoration: 'line-through', fontFamily: 'monospace' }}>...Option A privilégie...</div>
            <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 800, fontFamily: 'monospace', marginTop: '0.25rem' }}>...L'Option A privilégie...</div>
            <div style={{ height: '1px', backgroundColor: '#f1f5f9', margin: '0.75rem 0' }} />
            <div style={{ fontSize: '0.65rem', color: '#64748b', lineHeight: 1.4 }}>Elision is mandatory in standard French before vowel prefixes.</div>
          </div>
        </div>
      )
    },
    {
      id: 1,
      badge: "Comprehensive Syllabus",
      badgeColor: "hsl(var(--accent))",
      title: "39 Progressive Reading MCQs",
      description: "Excel at TCF Compréhension Écrite with authentic materials, including public announcements, classified ads, ecological news columns, and literary works.",
      element: (
        <div style={{ 
          width: '100%', maxWidth: '340px', margin: '0 auto', 
          backgroundColor: 'white', borderRadius: '1.5rem', padding: '1.75rem', 
          border: '1.5px solid #e2e8f0', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.06)',
          textAlign: 'left', position: 'relative', overflow: 'hidden'
        }}>
          {/* Subtle Maple Leaf Watermark */}
          <div style={{ position: 'absolute', right: '-10px', top: '-10px', opacity: 0.03, width: '120px', height: '120px', pointerEvents: 'none' }}>
            <svg viewBox="0 0 100 100" fill="hsl(var(--primary))" width="100%" height="100%">
              <path d="M50 5 L55 25 L75 25 L60 38 L65 58 L50 46 L35 58 L40 38 L25 25 L45 25 Z" />
            </svg>
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', backgroundColor: '#e0f2fe', color: '#0369a1', padding: '0.2rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.65rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            <BookOpen size={10} />
            Question 14 · B1 Level
          </div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', lineHeight: 1.4 }}>
            Why are parcs limiting visitors according to the ecological news excerpt?
          </h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {['To increase entrance ticket prices', 'To protect the local wildlife', 'To build new local infrastructure'].map((opt, i) => (
              <div 
                key={i} 
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.6rem 0.85rem', 
                  borderRadius: '0.5rem', border: i === 1 ? '1.5px solid hsl(var(--primary))' : '1px solid #e2e8f0',
                  backgroundColor: i === 1 ? 'hsl(var(--primary-light))' : 'transparent',
                  fontSize: '0.75rem', fontWeight: i === 1 ? 700 : 500, color: i === 1 ? 'hsl(var(--primary-hover))' : '#334155'
                }}
              >
                <span style={{ 
                  width: 18, height: 18, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  backgroundColor: i === 1 ? 'hsl(var(--primary))' : '#f1f5f9', color: i === 1 ? 'white' : '#64748b', fontSize: '0.65rem', fontWeight: 900
                }}>
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 2,
      badge: "Real-Time Tracking",
      badgeColor: "hsl(24, 95%, 53%)",
      title: "Detailed CLB Scoreboards",
      description: "Track your active progress across all four French skills, see historical average bands, and target your official immigration scores successfully.",
      element: (
        <div style={{ 
          width: '100%', maxWidth: '340px', margin: '0 auto', 
          backgroundColor: 'white', borderRadius: '1.5rem', padding: '1.75rem', 
          border: '1.5px solid #e2e8f0', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.06)',
          textAlign: 'left'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Activity size={16} color="hsl(var(--primary))" />
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0f172a' }}>Global Statistics</span>
            </div>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#059669', backgroundColor: '#d1fae5', padding: '0.2rem 0.5rem', borderRadius: '99px' }}>CLB 8+ Active</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {[
              { skill: 'Compréhension Écrite', progress: 85, score: 'CLB 9' },
              { skill: 'Expression Écrite', progress: 78, score: 'CLB 8' },
              { skill: 'Compréhension Orale', progress: 68, score: 'CLB 7' }
            ].map((item, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                  <span>{item.skill}</span>
                  <span style={{ color: 'hsl(var(--primary))' }}>{item.score}</span>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: '#f1f5f9', borderRadius: '99px', overflow: 'hidden' }}>
                  <div style={{ width: `${item.progress}%`, height: '100%', backgroundColor: idx === 0 ? 'hsl(var(--primary))' : idx === 1 ? '#8b5cf6' : '#10b981', borderRadius: '99px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
  ];

  const currentSlide = carouselSlides[activeSlide];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await register(formData);
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create account.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen" style={{ 
      backgroundColor: '#f8fafc',
      background: 'radial-gradient(at 0% 0%, hsla(221, 83%, 53%, 0.04) 0px, transparent 50%), radial-gradient(at 100% 100%, hsla(262, 83%, 53%, 0.04) 0px, transparent 50%)'
    }}>
      
      {/* Top Header - Logo (Mobile & Tablet) */}
      <div className="lg:hidden flex items-center justify-between p-5 border-b" style={{ borderColor: 'rgba(226, 232, 240, 0.8)', backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)', padding: '15px' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: 'hsl(var(--primary))', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(59,130,246,0.2)' }}>
            <Globe size={18} color="white" />
          </div>
          <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '1.3rem', color: '#0f172a', letterSpacing: '-0.02em' }}>Évora</span>
        </Link>
      </div>

      {/* Left side - Gorgeous UI Color-Matched Carousel Showcase (Desktop only) */}
      <div 
        className="hidden lg:flex flex-1 flex-col items-center justify-center p-16 relative overflow-hidden" 
        style={{ 
          background: 'linear-gradient(135deg, hsl(214, 100%, 98%) 0%, hsl(220, 100%, 97%) 100%)',
          borderRight: '1px solid rgba(226,232,240,0.8)'
        }}
      >
        {/* Soft glowing ambient brand lights */}
        <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

        {/* Animated Grid backing */}
        <div style={{ 
          position: 'absolute', inset: 0, 
          backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.015) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
        }} />

        <div style={{ maxWidth: 440, position: 'relative', zIndex: 10, textAlign: 'center' }}>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              {/* Slideshow Pill Tag */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', backgroundColor: 'white', border: '1px solid #e2e8f0', color: currentSlide.badgeColor, padding: '0.45rem 1rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                <Sparkles size={14} />
                {currentSlide.badge}
              </div>

              <h2 style={{ 
                fontSize: '2.4rem', 
                fontFamily: 'Outfit, sans-serif', 
                fontWeight: 900, 
                color: '#0f172a', 
                lineHeight: 1.2, 
                marginBottom: '1rem',
                letterSpacing: '-0.02em',
                background: 'linear-gradient(to right, #0f172a, #334155)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {currentSlide.title}
              </h2>
              
              <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, marginBottom: '2.5rem', fontWeight: 500 }}>
                {currentSlide.description}
              </p>

              {/* Carousel Content Element */}
              <div style={{ minHeight: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                {currentSlide.element}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Interactive Navigation Dot Indicators */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2.5rem' }}>
            {carouselSlides.map((slide, idx) => {
              const isActive = idx === activeSlide;
              return (
                <button
                  key={slide.id}
                  onClick={() => setActiveSlide(idx)}
                  style={{
                    width: isActive ? '20px' : '8px',
                    height: '8px',
                    borderRadius: '99px',
                    backgroundColor: isActive ? 'hsl(var(--primary))' : '#cbd5e1',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    padding: 0
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              );
            })}
          </div>

        </div>
      </div>

      {/* Right side - Form Section */}
      <div className="flex-1 flex flex-col justify-center p-6 sm:p-10 md:p-16 lg:p-24 relative">
        {/* Floating Brand Logo (Desktop) */}
        <div className="hidden lg:flex absolute top-10 left-16">
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: 'hsl(var(--primary))', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(59,130,246,0.2)' }}>
              <Globe size={20} color="white" />
            </div>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '1.4rem', color: '#0f172a', letterSpacing: '-0.02em' }}>Évora</span>
          </Link>
        </div>

        <div className="flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, ease: 'easeOut' }} 
            style={{ 
              width: '100%', 
              maxWidth: 480,
              backgroundColor: 'white',
              borderRadius: '2rem',
              padding: '2.5rem',
              boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.04), 0 0 0 1px rgba(15, 23, 42, 0.02)',
              border: '1px solid rgba(226, 232, 240, 0.8)'
            }}
          >
            {/* Soft Sparkle Tag */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', backgroundColor: 'rgba(59,130,246,0.06)', color: 'hsl(var(--primary))', padding: '0.35rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '1.25rem' }}>
              <Sparkles size={12} />
              Instant Free Access
            </div>

            <h1 style={{ fontSize: '2.2rem', marginBottom: '0.75rem', color: '#0f172a', fontWeight: 900, fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.03em', lineHeight: 1.15 }}>Create account</h1>
            <p style={{ color: '#64748b', marginBottom: '2rem', fontSize: '0.9rem', fontWeight: 500, lineHeight: 1.5 }}>Join Évora and start improving your French skills today.</p>

            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ backgroundColor: '#fef2f2', color: '#b91c1c', padding: '1rem', borderRadius: '0.85rem', marginBottom: '1.75rem', fontSize: '0.85rem', fontWeight: 600, border: '1px solid #fee2e2', display: 'flex', gap: '0.5rem', alignItems: 'center' }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.5rem' }}>First name</label>
                  <div style={{ position: 'relative' }}>
                    <User size={16} color="#94a3b8" style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="input-field"
                      style={{ 
                        paddingLeft: '2.75rem', 
                        padding: '0.85rem 1.25rem 0.85rem 2.75rem',
                        borderRadius: '0.85rem',
                        border: '1.5px solid #e2e8f0',
                        fontSize: '0.9rem',
                        fontWeight: 500
                      }}
                      placeholder="Jane"
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.5rem' }}>Last name</label>
                  <div style={{ position: 'relative' }}>
                    <User size={16} color="#94a3b8" style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="input-field"
                      style={{ 
                        paddingLeft: '2.75rem', 
                        padding: '0.85rem 1.25rem 0.85rem 2.75rem',
                        borderRadius: '0.85rem',
                        border: '1.5px solid #e2e8f0',
                        fontSize: '0.9rem',
                        fontWeight: 500
                      }}
                      placeholder="Doe"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.5rem' }}>Email address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} color="#94a3b8" style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                    style={{ 
                      paddingLeft: '2.75rem', 
                      padding: '0.85rem 1.25rem 0.85rem 2.75rem',
                      borderRadius: '0.85rem',
                      border: '1.5px solid #e2e8f0',
                      fontSize: '0.9rem',
                      fontWeight: 500
                    }}
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.5rem' }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} color="#94a3b8" style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="input-field"
                    style={{ 
                      paddingLeft: '2.75rem', 
                      paddingRight: '2.75rem', 
                      padding: '0.85rem 2.75rem',
                      borderRadius: '0.85rem',
                      border: '1.5px solid #e2e8f0',
                      fontSize: '0.9rem',
                      fontWeight: 500
                    }}
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem' }}
                  >
                    {showPassword ? (
                      <EyeOff size={16} color="#94a3b8" />
                    ) : (
                      <Eye size={16} color="#94a3b8" />
                    )}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading} 
                className="btn-primary" 
                style={{ 
                  marginTop: '0.5rem', 
                  width: '100%', 
                  padding: '0.9rem', 
                  fontSize: '0.95rem', 
                  fontWeight: 700,
                  borderRadius: '0.85rem',
                  boxShadow: '0 8px 20px -4px rgba(59,130,246,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : (
                  <>
                    Create Account
                    <ArrowRight size={15} style={{ marginLeft: '0.35rem' }} />
                  </>
                )}
              </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>
              Already have an account?{' '}
              <Link href="/login" style={{ color: 'hsl(var(--primary))', fontWeight: 700, textDecoration: 'none' }}>
                Sign in
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
