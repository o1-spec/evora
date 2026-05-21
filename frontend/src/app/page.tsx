'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Brain, BookOpen, Mic, FileText, BarChart3,
  CheckCircle, ArrowRight, Globe, TrendingUp, ShieldCheck, PlayCircle, MessageSquare
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] } }),
};

const FEATURES = [
  { icon: FileText, title: 'TCF Canada Simulator', desc: 'Full mock exams covering listening, reading, writing, and speaking with realistic timing.', color: '#3b82f6' },
  { icon: Brain, title: 'AI Writing Correction', desc: 'Get instant grammatical, lexical, and structural feedback on your written French essays.', color: '#10b981' },
  { icon: Mic, title: 'Speaking Practice', desc: 'Record your voice and receive AI analysis on pronunciation, fluency, and CEFR level.', color: '#f59e0b' },
  { icon: PlayCircle, title: 'Listening Library', desc: 'Hundreds of native audio clips modeled after actual TCF Canada comprehension tasks.', color: '#8b5cf6' },
  { icon: BookOpen, title: 'Vocabulary Builder', desc: 'Curated flashcards and vocabulary lists categorized by CEFR level and everyday topics.', color: '#ec4899' },
  { icon: BarChart3, title: 'Progress Dashboard', desc: 'Track your estimated CLB score and pinpoint specific language skills to improve.', color: '#0ea5e9' },
];

const PATH_LEVELS = [
  { level: 'A1', title: 'Beginner', desc: 'Basic phrases and everyday situations.' },
  { level: 'A2', title: 'Elementary', desc: 'Simple exchanges and familiar topics.' },
  { level: 'B1', title: 'Intermediate', desc: 'Independent communication and travel.' },
  { level: 'B2', title: 'Upper Intermediate', desc: 'Fluent, spontaneous conversations.' },
  { level: 'C1', title: 'Advanced', desc: 'Complex texts and professional mastery.' },
  { level: 'C2', title: 'Mastery', desc: 'Near-native fluency and nuance.' },
];

const TCF_MODULES = [
  { title: 'Compréhension Orale', duration: '35 mins', questions: '39 questions', desc: 'Listen to native audio and answer multiple-choice questions.' },
  { title: 'Compréhension Écrite', duration: '60 mins', questions: '39 questions', desc: 'Read articles and texts to test your reading comprehension.' },
  { title: 'Expression Écrite', duration: '60 mins', questions: '3 tasks', desc: 'Write messages, articles, and essays with progressive difficulty.' },
  { title: 'Expression Orale', duration: '12 mins', questions: '3 tasks', desc: 'Speak to an examiner (simulated via AI) in various scenarios.' },
];

const PLANS = [
  { name: 'Free', price: '$0', period: '/month', desc: 'Perfect for getting started.', features: ['A1-A2 Academy Access', '1 Full TCF Mock Exam', '5 AI Evaluations/mo', 'Basic Vocabulary'], cta: 'Get Started Free', href: '/register', highlight: false },
  { name: 'Premium', price: '$29', period: '/month', desc: 'Everything you need to pass.', features: ['Full A1-C2 Academy', '10 TCF Mock Exams', '100 AI Evaluations/mo', 'Advanced Pronunciation Analysis'], cta: 'Start Premium', href: '/register', highlight: true },
  { name: 'Pro', price: '$59', period: '/month', desc: 'For intensive preparation.', features: ['Unlimited TCF Exams', 'Unlimited AI Evaluations', 'Priority Support', '1-on-1 Expert Review (Monthly)'], cta: 'Go Pro', href: '/register', highlight: false },
];

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* HEADER */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid hsl(var(--border))',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', height: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: 'hsl(var(--primary))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Globe size={18} color="white" />
            </div>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.25rem', color: 'hsl(var(--text-primary))' }}>Évora</span>
          </div>
          
          <nav style={{ display: 'none', gap: '2rem', alignItems: 'center' }} className="md:flex">
            <Link href="#academy" style={{ fontSize: '0.9rem', fontWeight: 500, color: 'hsl(var(--text-secondary))', textDecoration: 'none' }}>Academy</Link>
            <Link href="#simulator" style={{ fontSize: '0.9rem', fontWeight: 500, color: 'hsl(var(--text-secondary))', textDecoration: 'none' }}>TCF Simulator</Link>
            <Link href="#pricing" style={{ fontSize: '0.9rem', fontWeight: 500, color: 'hsl(var(--text-secondary))', textDecoration: 'none' }}>Pricing</Link>
          </nav>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <Link href="/login" className="btn-ghost">Sign In</Link>
            <Link href="/register" className="btn-primary">Get Started</Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section style={{ padding: '6rem 1.5rem', backgroundColor: 'hsl(var(--bg-base))', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          
          {/* Hero Left */}
          <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0}>
            <div className="badge badge-primary" style={{ marginBottom: '1.5rem' }}>
              <ShieldCheck size={14} /> Proven TCF Canada Preparation
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
              Master French.<br/>Achieve your <span style={{ color: 'hsl(var(--primary))' }}>CLB target.</span>
            </h1>
            <p style={{ fontSize: '1.125rem', color: 'hsl(var(--text-secondary))', marginBottom: '2.5rem', maxWidth: 480 }}>
              Prepare for TCF Canada with structured French lessons, realistic exam practice, and AI-powered feedback designed for serious learners.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/register" className="btn-primary" style={{ padding: '0.875rem 2rem', fontSize: '1rem' }}>
                Start Learning Free
              </Link>
              <Link href="#simulator" className="btn-secondary" style={{ padding: '0.875rem 2rem', fontSize: '1rem' }}>
                Explore Platform
              </Link>
            </div>
          </motion.div>

          {/* Hero Right - Dashboard Mockup */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }} style={{ position: 'relative' }}>
            <div className="card-elevated" style={{ padding: '1.5rem', position: 'relative', zIndex: 10, backgroundColor: 'white' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', color: 'hsl(var(--text-primary))' }}>Your Progress</h3>
                <span className="badge badge-secondary">This Week</span>
              </div>

              {/* Mock CLB Score */}
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ flex: 1, padding: '1rem', backgroundColor: 'hsl(var(--bg-base))', borderRadius: '0.75rem', border: '1px solid hsl(var(--border))' }}>
                  <div style={{ fontSize: '0.8rem', color: 'hsl(var(--text-secondary))', marginBottom: '0.25rem' }}>Est. CLB Level</div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'hsl(var(--primary))', fontFamily: 'Outfit, sans-serif' }}>CLB 7</div>
                </div>
                <div style={{ flex: 1, padding: '1rem', backgroundColor: 'hsl(var(--bg-base))', borderRadius: '0.75rem', border: '1px solid hsl(var(--border))' }}>
                  <div style={{ fontSize: '0.8rem', color: 'hsl(var(--text-secondary))', marginBottom: '0.25rem' }}>Lessons Done</div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'hsl(var(--text-primary))', fontFamily: 'Outfit, sans-serif' }}>24</div>
                </div>
              </div>

              {/* Mock Speaking Feedback */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <Mic size={16} color="hsl(var(--accent))" />
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Recent Speaking Feedback</span>
                </div>
                <div style={{ padding: '0.75rem', backgroundColor: 'hsl(var(--accent-light))', borderRadius: '0.5rem', fontSize: '0.85rem', color: 'hsl(142, 60%, 30%)' }}>
                  "Great fluency! Try to round your vowels more on words like 'beaucoup' and 'toujours'."
                </div>
              </div>

              {/* Mock Next Lesson */}
              <div style={{ padding: '1rem', border: '1px solid hsl(var(--border))', borderRadius: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'hsl(var(--text-secondary))', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Next Up • B1</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'hsl(var(--text-primary))' }}>Le Subjonctif Présent</div>
                </div>
                <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: 'hsl(var(--primary))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <PlayCircle size={16} />
                </div>
              </div>

            </div>
            
            {/* Decorative elements behind the card */}
            <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '120%', height: '120%', background: 'radial-gradient(circle, hsla(221, 83%, 53%, 0.08) 0%, transparent 60%)', zIndex: 0 }} />
          </motion.div>
        </div>
      </section>

      {/* TRUST / STATS SECTION */}
      <section style={{ borderBottom: '1px solid hsl(var(--border))', borderTop: '1px solid hsl(var(--border))', backgroundColor: 'white' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'hsl(var(--text-primary))', fontFamily: 'Outfit, sans-serif' }}>4 Skills</div>
            <div style={{ fontSize: '0.85rem', color: 'hsl(var(--text-secondary))', marginTop: '0.25rem' }}>Comprehensive TCF Practice</div>
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'hsl(var(--text-primary))', fontFamily: 'Outfit, sans-serif' }}>A1 to C2</div>
            <div style={{ fontSize: '0.85rem', color: 'hsl(var(--text-secondary))', marginTop: '0.25rem' }}>Structured French Academy</div>
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'hsl(var(--text-primary))', fontFamily: 'Outfit, sans-serif' }}>Instant AI</div>
            <div style={{ fontSize: '0.85rem', color: 'hsl(var(--text-secondary))', marginTop: '0.25rem' }}>Writing & Speaking Feedback</div>
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'hsl(var(--text-primary))', fontFamily: 'Outfit, sans-serif' }}>CLB 7+</div>
            <div style={{ fontSize: '0.85rem', color: 'hsl(var(--text-secondary))', marginTop: '0.25rem' }}>Targeted Immigration Score</div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" style={{ padding: '6rem 1.5rem', backgroundColor: 'white' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: 600, margin: '0 auto 4rem' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', marginBottom: '1rem' }}>Everything you need to succeed</h2>
            <p style={{ fontSize: '1.1rem', color: 'hsl(var(--text-secondary))' }}>A complete suite of learning tools and AI-driven feedback designed specifically for TCF Canada candidates.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {FEATURES.map((f, i) => (
              <motion.div key={f.title} className="card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ padding: '2rem' }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: 'hsl(var(--bg-base))', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', border: '1px solid hsl(var(--border))' }}>
                  <f.icon size={24} color={f.color} />
                </div>
                <h3 style={{ fontSize: '1.125rem', marginBottom: '0.75rem' }}>{f.title}</h3>
                <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.95rem' }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LEARNING PATH SECTION */}
      <section id="academy" style={{ padding: '6rem 1.5rem', backgroundColor: 'hsl(var(--bg-base))' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', marginBottom: '1rem' }}>Structured Learning Path</h2>
            <p style={{ fontSize: '1.1rem', color: 'hsl(var(--text-secondary))' }}>Progress logically from absolute beginner to complete mastery.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            {PATH_LEVELS.map((level, i) => (
              <motion.div key={level.level} className="card" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ padding: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'hsl(var(--primary))', fontFamily: 'Outfit, sans-serif', marginBottom: '0.5rem' }}>{level.level}</div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{level.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'hsl(var(--text-secondary))' }}>{level.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TCF PRACTICE SECTION */}
      <section id="simulator" style={{ padding: '6rem 1.5rem', backgroundColor: 'white' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', marginBottom: '1rem' }}>Authentic TCF Simulator</h2>
            <p style={{ fontSize: '1.1rem', color: 'hsl(var(--text-secondary))' }}>Practice under real exam conditions. Our simulator accurately replicates the format, timing, and difficulty of the official TCF Canada test.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {TCF_MODULES.map((mod, i) => (
              <div key={mod.title} className="card" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'hsl(var(--primary))' }}>{mod.title}</h3>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                  <span className="badge badge-secondary">{mod.duration}</span>
                  <span className="badge badge-secondary">{mod.questions}</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'hsl(var(--text-secondary))' }}>{mod.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" style={{ padding: '6rem 1.5rem', backgroundColor: 'hsl(var(--bg-base))' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', marginBottom: '1rem' }}>Simple, transparent pricing</h2>
            <p style={{ fontSize: '1.1rem', color: 'hsl(var(--text-secondary))' }}>Invest in your future in Canada with a plan that fits your needs.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'start' }}>
            {PLANS.map((plan, i) => (
              <motion.div key={plan.name} className={plan.highlight ? "card-elevated" : "card"} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} 
                style={{ 
                  padding: '2.5rem 2rem', 
                  border: plan.highlight ? '2px solid hsl(var(--primary))' : '1px solid hsl(var(--border))',
                  position: 'relative'
                }}>
                
                {plan.highlight && (
                  <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', backgroundColor: 'hsl(var(--primary))', color: 'white', padding: '0.25rem 1rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600 }}>
                    Most Popular
                  </div>
                )}

                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'hsl(var(--text-primary))', marginBottom: '0.5rem' }}>{plan.name}</h3>
                <p style={{ fontSize: '0.9rem', color: 'hsl(var(--text-secondary))', marginBottom: '1.5rem', minHeight: '40px' }}>{plan.desc}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '2rem' }}>
                  <span style={{ fontSize: '3rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>{plan.price}</span>
                  <span style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.9rem' }}>{plan.period}</span>
                </div>
                
                <Link href={plan.href} className={plan.highlight ? 'btn-primary' : 'btn-secondary'} style={{ width: '100%', marginBottom: '2rem' }}>
                  {plan.cta}
                </Link>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: 'hsl(var(--text-primary))' }}>
                      <CheckCircle size={18} color="hsl(var(--accent))" style={{ flexShrink: 0 }} /> {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: 'white', borderTop: '1px solid hsl(var(--border))', padding: '4rem 1.5rem 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Globe size={20} color="hsl(var(--primary))" />
                <span style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 800, fontSize: '1.25rem' }}>Évora</span>
              </div>
              <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.9rem', lineHeight: 1.6 }}>
                The most advanced AI-powered platform for French language learning and TCF Canada exam preparation.
              </p>
            </div>
            
            <div>
              <h4 style={{ fontWeight: 600, marginBottom: '1rem' }}>Platform</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li><Link href="#academy" style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.9rem', textDecoration: 'none' }}>Academy</Link></li>
                <li><Link href="#simulator" style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.9rem', textDecoration: 'none' }}>TCF Simulator</Link></li>
                <li><Link href="#pricing" style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.9rem', textDecoration: 'none' }}>Pricing</Link></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontWeight: 600, marginBottom: '1rem' }}>Company</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li><Link href="#" style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.9rem', textDecoration: 'none' }}>About Us</Link></li>
                <li><Link href="#" style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.9rem', textDecoration: 'none' }}>Contact</Link></li>
                <li><Link href="#" style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.9rem', textDecoration: 'none' }}>Privacy Policy</Link></li>
                <li><Link href="#" style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.9rem', textDecoration: 'none' }}>Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div style={{ borderTop: '1px solid hsl(var(--border))', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.85rem' }}>
              © 2026 Évora. All rights reserved.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'hsl(var(--text-secondary))' }}>Made for learners worldwide.</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
