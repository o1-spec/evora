'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Brain, BookOpen, Mic, FileText, BarChart3,
  CheckCircle, ArrowRight, Globe, Zap, Shield
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.55, ease: [0.4, 0, 0.2, 1] } }),
};

const FEATURES = [
  { icon: Brain, title: 'IA Évaluatrice', desc: 'Corrections grammaticales ultra-précises propulsées par GPT-4o sur vos écrits et vos enregistrements vocaux.', color: 'var(--primary)' },
  { icon: Mic, title: 'Évaluation Vocale', desc: 'Enregistrez votre réponse orale. Notre IA transcrit et note votre prononciation et votre fluidité en temps réel.', color: '#34d399' },
  { icon: BookOpen, title: 'Académie A1→C2', desc: '6 niveaux structurés avec modules, leçons, vocabulaire, grammaire, dialogues et exercices interactifs.', color: '#f59e0b' },
  { icon: FileText, title: 'Simulateur TCF Canada', desc: 'Examen blanc complet — Compréhension orale, lecture, expression écrite et expression orale — avec notation CLB automatique.', color: '#a78bfa' },
  { icon: BarChart3, title: 'Tableau de Bord', desc: 'Suivez votre score CLB actuel, votre historique de progression, et vos points forts vs. points faibles dans chaque compétence.', color: '#f472b6' },
  { icon: Zap, title: 'Tuteur IA 24/7', desc: 'Posez nimporte quelle question de grammaire, conjugaison ou vocabulaire.Évora IA répond instantanément.', color: '#38bdf8' },
];

const PLANS = [
  { name: 'Gratuit', price: '0 €', period: '/mois', features: ['5 évaluations IA/mois', '1 examen TCF blanc', 'Niveaux A1–A2'], cta: 'Commencer gratuitement', href: '/register', highlight: false },
  { name: 'Premium', price: '39 €', period: '/mois', features: ['100 évaluations IA/mois', '15 examens TCF blancs', 'Niveaux A1–C2 complets', 'Corrections phonétiques'], cta: 'Démarrer Premium', href: '/register', highlight: true },
  { name: 'Pro', price: '79 €', period: '/mois', features: ['Évaluations illimitées', 'Examens TCF illimités', 'Accès total à l\'académie', 'Tutorat IA en continu'], cta: 'Accès Pro Illimité', href: '/register', highlight: false },
];

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'hsl(225,20%,6%)' }}>

      {/* NAV */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(20px)',
        background: 'rgba(10,11,18,0.85)',
        padding: '0 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, hsl(250,95%,64%) 0%, hsl(162,82%,50%) 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Globe size={20} color="white" />
          </div>
          <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.25rem' }}>Évora</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link href="/login" className="btn-secondary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}>
            Connexion
          </Link>
          <Link href="/register" className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}>
            Commencer
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: '7rem 2rem 5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Background orbs */}
        <div style={{
          position: 'absolute', top: '-20%', left: '30%', width: 600, height: 600,
          borderRadius: '50%', background: 'radial-gradient(circle, hsla(250,95%,64%,0.12) 0%, transparent 70%)',
          pointerEvents: 'none', transform: 'translateX(-50%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '0', right: '10%', width: 400, height: 400,
          borderRadius: '50%', background: 'radial-gradient(circle, hsla(162,82%,50%,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0}>
          <span className="badge badge-primary" style={{ fontSize: '0.8rem', marginBottom: '1.5rem', display: 'inline-flex' }}>
            <Zap size={12} /> Propulsé par GPT-4o & Whisper AI
          </span>
        </motion.div>

        <motion.h1 initial="hidden" animate="show" variants={fadeUp} custom={1}
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontFamily: 'Outfit, sans-serif', fontWeight: 900, marginBottom: '1.5rem', lineHeight: 1.1 }}>
          Maîtrisez le Français.<br />
          <span className="gradient-text">Réussissez le TCF Canada.</span>
        </motion.h1>

        <motion.p initial="hidden" animate="show" variants={fadeUp} custom={2}
          style={{ fontSize: '1.2rem', color: 'hsl(220,12%,65%)', maxWidth: 640, margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
          La plateforme IA qui vous guide du niveau débutant A1 jusqu'à l'obtention de votre score CLB pour l'immigration canadienne.
        </motion.p>

        <motion.div initial="hidden" animate="show" variants={fadeUp} custom={3}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/register" className="btn-primary" style={{ fontSize: '1rem', padding: '0.875rem 2rem' }}>
            Démarrer gratuitement <ArrowRight size={18} />
          </Link>
          <Link href="/dashboard/exams" className="btn-secondary" style={{ fontSize: '1rem', padding: '0.875rem 2rem' }}>
            Voir le simulateur TCF
          </Link>
        </motion.div>

        <motion.div initial="hidden" animate="show" variants={fadeUp} custom={4}
          style={{ marginTop: '3rem', display: 'flex', gap: '2.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[['CLB 4→10+', 'Niveaux canadiens'], ['4 Compétences', 'Oral · Écrit · Lecture · Écoute'], ['IA Temps Réel', 'Corrections instantanées']].map(([val, lbl]) => (
            <div key={lbl} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }} className="gradient-text">{val}</div>
              <div style={{ fontSize: '0.8rem', color: 'hsl(220,12%,55%)', marginTop: '0.25rem' }}>{lbl}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: '5rem 2rem', maxWidth: 1200, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontFamily: 'Outfit, sans-serif', fontWeight: 800, marginBottom: '1rem' }}>
            Tout ce qu'il vous faut pour <span className="gradient-text">réussir</span>
          </h2>
          <p style={{ color: 'hsl(220,12%,60%)', fontSize: '1.1rem' }}>Une suite complète d'outils IA conçue pour les candidats au TCF Canada.</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))', gap: '1.5rem' }}>
          {FEATURES.map((f, i) => (
            <motion.div key={f.title} className="glass" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              style={{ padding: '2rem', cursor: 'default' }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14, marginBottom: '1.25rem',
                background: `${f.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <f.icon size={26} color={f.color} />
              </div>
              <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem' }}>{f.title}</h3>
              <p style={{ color: 'hsl(220,12%,60%)', fontSize: '0.9rem', lineHeight: 1.7 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section style={{ padding: '5rem 2rem', maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontFamily: 'Outfit, sans-serif', fontWeight: 800, marginBottom: '1rem' }}>
            Plans & <span className="gradient-text">Tarifs</span>
          </h2>
          <p style={{ color: 'hsl(220,12%,60%)', fontSize: '1.1rem' }}>Commencez gratuitement. Évoluez quand vous êtes prêt.</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
          {PLANS.map((plan, i) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.12 }}
              className={plan.highlight ? 'glass-strong glow-primary' : 'glass'}
              style={{
                padding: '2.25rem 2rem',
                border: plan.highlight ? '1px solid hsla(250,95%,64%,0.4)' : undefined,
                position: 'relative', overflow: 'hidden',
              }}>
              {plan.highlight && (
                <div style={{
                  position: 'absolute', top: 16, right: 16,
                }} className="badge badge-primary">⭐ Populaire</div>
              )}
              <div style={{ fontSize: '1rem', fontWeight: 600, color: 'hsl(220,12%,70%)', marginBottom: '0.5rem' }}>{plan.name}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '1.75rem' }}>
                <span style={{ fontSize: '2.75rem', fontWeight: 900, fontFamily: 'Outfit,sans-serif' }} className={plan.highlight ? 'gradient-text' : ''}>{plan.price}</span>
                <span style={{ color: 'hsl(220,12%,55%)', fontSize: '0.9rem' }}>{plan.period}</span>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                {plan.features.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'hsl(220,12%,75%)' }}>
                    <CheckCircle size={16} color="hsl(162,82%,50%)" style={{ flexShrink: 0 }} /> {f}
                  </li>
                ))}
              </ul>
              <Link href={plan.href} className={plan.highlight ? 'btn-primary' : 'btn-secondary'} style={{ width: '100%', display: 'flex' }}>
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '2.5rem 2rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Globe size={18} color="hsl(250,95%,64%)" />
          <span style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 700 }}>Évora</span>
        </div>
        <p style={{ color: 'hsl(220,12%,40%)', fontSize: '0.875rem' }}>
          © 2026 Évora · Plateforme IA d'apprentissage du français & préparation TCF Canada
        </p>
      </footer>
    </div>
  );
}
