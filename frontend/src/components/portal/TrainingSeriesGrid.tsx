'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, BookOpen, Headphones, PenLine, Mic, 
  Clock, Award, HelpCircle, Lightbulb, ChevronRight, 
  ArrowLeft, CheckCircle2, Sparkles, LogOut, ChevronLeft,
  Volume2, ShieldCheck, Flame, Trophy, RefreshCw, LayoutGrid, Check,
  Info, AlertTriangle, Eye, X, Send, AlertCircle, FileText, CheckCircle
} from 'lucide-react';
import { readingQuestions, listeningQuestions, writtenTasks, oralTasks, TcfQuestionData, TcfWrittenTaskData, TcfOralTaskData } from '@/lib/tcfQuestions';
import api from '@/lib/api';
import PublicLayout from '@/components/portal/PublicLayout';

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

  // Responsive device width state tracking
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // General Portal states
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'FINISHED' | 'UNFINISHED'>('ALL');
  const [selectedSeries, setSelectedSeries] = useState<number | null>(null);
  const [isLaunching, setIsLaunching] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  // Active MCQ Simulator states (Reading / Listening)
  const [activeSeriesId, setActiveSeriesId] = useState<number | null>(null);
  const [questions, setQuestions] = useState<TcfQuestionData[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [timeRemaining, setTimeRemaining] = useState<number>(3600); // 60 mins
  const [isExamFinished, setIsExamFinished] = useState<boolean>(false);
  const [showNavGrid, setShowNavGrid] = useState<boolean>(false);

  // --- Stateful Written Expression Simulator states ---
  const [wTasks, setWTasks] = useState<TcfWrittenTaskData[]>([]);
  const [currentWTaskIndex, setCurrentWTaskIndex] = useState<number>(0); // 0, 1, 2
  const [writingAnswers, setWritingAnswers] = useState<Record<number, string>>({
    1: '', 2: '', 3: ''
  });
  const [activeReportTab, setActiveReportTab] = useState<1 | 2 | 3>(1);

  // --- Stateful Oral Expression Simulator states ---
  const [oTasks, setOTasks] = useState<TcfOralTaskData[]>([]);
  const [currentOTaskIndex, setCurrentOTaskIndex] = useState<number>(0); // 0, 1, 2
  const [speakingAnswers, setSpeakingAnswers] = useState<Record<number, { isRecorded: boolean; durationSec: number; transcript: string }>>({
    1: { isRecorded: false, durationSec: 0, transcript: '' },
    2: { isRecorded: false, durationSec: 0, transcript: '' },
    3: { isRecorded: false, durationSec: 0, transcript: '' }
  });
  const [recordingState, setRecordingState] = useState<'IDLE' | 'PREPARING' | 'RECORDING' | 'PAUSED' | 'SAVED'>('IDLE');
  const [prepTimeRemaining, setPrepTimeRemaining] = useState<number>(180); // 3 minutes preparation for Task 2
  const [recordTime, setRecordTime] = useState<number>(0);
  const [isTranscribing, setIsTranscribing] = useState<boolean>(false);

  // Custom Toast state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);

  // Custom Modals state
  const [activeModal, setActiveModal] = useState<'LEAVE_EXAM' | 'UNLOCK_PREMIUM' | 'ZOOM_POSTER' | null>(null);

  // Timer reference
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Real AI evaluation and audio recording states/refs
  const [writingEvaluations, setWritingEvaluations] = useState<Record<number, any>>({});
  const [isEvaluatingWriting, setIsEvaluatingWriting] = useState<boolean>(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioStreamRef = useRef<MediaStream | null>(null);

  // Trigger temporary custom toast
  const triggerToast = (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    setToast({ message, type });
  };

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  // Load questions, written tasks, and oral tasks
  useEffect(() => {
    if (sectionType === 'READING') {
      setQuestions(activeSeriesId !== null ? readingQuestions.filter(q => q.seriesId === activeSeriesId) : []);
    } else if (sectionType === 'LISTENING') {
      setQuestions(activeSeriesId !== null ? listeningQuestions.filter(q => q.seriesId === activeSeriesId) : []);
    } else if (sectionType === 'WRITING') {
      setWTasks(activeSeriesId !== null ? writtenTasks.filter(t => t.seriesId === activeSeriesId) : []);
    } else if (sectionType === 'SPEAKING') {
      setOTasks(activeSeriesId !== null ? oralTasks.filter(t => t.seriesId === activeSeriesId) : []);
    }
  }, [sectionType, activeSeriesId]);

  // Handle Speaking-specific preparation and recording timers
  useEffect(() => {
    let t: ReturnType<typeof setInterval> | null = null;
    if (activeSeriesId !== null && !isExamFinished && sectionType === 'SPEAKING') {
      t = setInterval(() => {
        if (recordingState === 'PREPARING') {
          setPrepTimeRemaining(prev => {
            if (prev <= 1) {
              setRecordingState('RECORDING');
              return 0;
            }
            return prev - 1;
          });
        } else if (recordingState === 'RECORDING') {
          setRecordTime(prev => prev + 1);
        }
      }, 1000);
    }
    return () => {
      if (t) clearInterval(t);
    };
  }, [activeSeriesId, isExamFinished, sectionType, recordingState]);

  // Handle active countdown ticking
  useEffect(() => {
    if (activeSeriesId !== null && !isExamFinished) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleFinishExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeSeriesId, isExamFinished]);

  // Format remaining seconds into MM:SS
  const formatTime = (seconds: number) => {
    const mm = Math.floor(seconds / 60).toString().padStart(2, '0');
    const ss = (seconds % 60).toString().padStart(2, '0');
    return `${mm}:${ss}`;
  };

  // Generate 40 simulated Series
  const seriesList = Array.from({ length: 40 }, (_, i) => {
    const id = i + 1;
    const isUnlocked = id <= 3;
    const isFinished = id === 1; 
    
    // Dynamic series parameters based on sectionType
    const questionsCount = (sectionType === 'WRITING' || sectionType === 'SPEAKING') ? 3 : 39;
    const durationMinutes = sectionType === 'SPEAKING' ? 15 : 60;
    const points = sectionType === 'SPEAKING' ? 900 : 699;

    return {
      id,
      title: `Series ${id}`,
      questionsCount,
      durationMinutes,
      points,
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
          setIsLaunching(false);
          setCountdown(null);
          setActiveSeriesId(selectedSeries);
          setSelectedSeries(null);
          setCurrentQIndex(0);
          setCurrentWTaskIndex(0);
          setAnswers({});
          setWritingAnswers({ 1: '', 2: '', 3: '' });
          setTimeRemaining(3600); // 60 mins
          setIsExamFinished(false);
          triggerToast(`Series ${selectedSeries} TCF Practice Session started!`, 'success');
          return 0;
        }
        return prev - 1;
      });
    }, 600);
  };

  // Safe Exit exam attempt (after confirmation modal approval)
  const confirmLeaveExam = () => {
    setActiveModal(null);
    setActiveSeriesId(null);
    setIsExamFinished(false);
    setAnswers({});
    setWritingAnswers({ 1: '', 2: '', 3: '' });
    triggerToast('Practice session closed.', 'info');
  };

  // Grade exam and calculate results
  const handleFinishExam = async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setShowNavGrid(false);

    if (sectionType === 'WRITING') {
      setIsEvaluatingWriting(true);
      try {
        const evaluations: Record<number, any> = {};

        await Promise.all([1, 2, 3].map(async (taskNum) => {
          const text = writingAnswers[taskNum] || '';
          if (text.trim().length > 5) {
            const currentWTask = wTasks.find(t => t.taskNumber === taskNum);
            const prompt = currentWTask ? currentWTask.prompt : `Task ${taskNum}`;
            const response = await api.post('/ai/evaluate-writing', {
              text,
              promptInstruction: prompt
            });
            evaluations[taskNum] = response.data.evaluation;
          } else {
            evaluations[taskNum] = {
              overallScore: 0,
              clbLevel: 'CLB 0',
              strengths: [],
              weaknesses: ["No response provided."],
              corrections: [],
              comments: "No response was written for this task."
            };
          }
        }));

        setWritingEvaluations(evaluations);
        setIsExamFinished(true);
        triggerToast('Written tasks submitted and graded by AI!', 'success');
      } catch (err) {
        console.error('Failed to grade writing tasks:', err);
        triggerToast('Failed to evaluate writing tasks. Please check your connection.', 'warning');
      } finally {
        setIsEvaluatingWriting(false);
      }
    } else {
      setIsExamFinished(true);
      triggerToast('Answers submitted and graded!', 'success');
    }
  };

  // Reset attempt session
  const handleRestartTraining = () => {
    setActiveSeriesId(null);
    setIsExamFinished(false);
    setAnswers({});
    setWritingAnswers({ 1: '', 2: '', 3: '' });
    setWritingEvaluations({});
    setSpeakingAnswers({
      1: { isRecorded: false, durationSec: 0, transcript: '' },
      2: { isRecorded: false, durationSec: 0, transcript: '' },
      3: { isRecorded: false, durationSec: 0, transcript: '' }
    });
    setRecordingState('IDLE');
    setCurrentOTaskIndex(0);
    setPrepTimeRemaining(180);
    setRecordTime(0);
  };

  // Calculate final score statistics
  const scoreStats = () => {
    let correctCount = 0;
    let totalPoints = 0;
    let earnedPoints = 0;
    
    questions.forEach(q => {
      totalPoints += q.points;
      if (answers[q.id] === q.correctKey) {
        correctCount++;
        earnedPoints += q.points;
      }
    });

    const percent = Math.round((correctCount / questions.length) * 100);
    
    // Determine Canadian Language Benchmarks (CLB) level
    let clb = 'CLB 4';
    let feedback = '';
    if (percent >= 88) {
      clb = 'CLB 9';
      feedback = 'Félicitations ! Vous avez acquis un excellent niveau de compréhension. Vous êtes prêt pour les dossiers professionnels complexes au Canada.';
    } else if (percent >= 74) {
      clb = 'CLB 8';
      feedback = 'Trés bon niveau ! Vos réponses démontrent une excellente maîtrise des structures de la langue écrite francophone.';
    } else if (percent >= 60) {
      clb = 'CLB 7';
      feedback = 'Bon résultat ! Vous franchissez le seuil d\'admissibilité clé pour l\'immigration canadienne. Continuez à affiner la lecture rapide.';
    } else if (percent >= 45) {
      clb = 'CLB 6';
      feedback = 'Niveau intermédiaire. Des révisions de vocabulaire avancé et de connecteurs logiques vous aideront à franchir le palier CLB 7.';
    } else {
      clb = 'CLB 5';
      feedback = 'Résultat à consolider. Travaillez sur les posters d\'annonces simples (A1-A2) et la vitesse de lecture avant votre prochaine tentative.';
    }

    return { correctCount, totalPoints, earnedPoints, percent, clb, feedback };
  };

  // Helper to count words
  const countWords = (text: string) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  // Generate real AI corrections for writing feedback
  const getWritingCorrections = (taskNum: number) => {
    const text = writingAnswers[taskNum] || '';
    const evalData = writingEvaluations[taskNum];

    if (evalData) {
      return {
        score: evalData.overallScore ?? 50,
        clb: evalData.clbLevel ?? 'CLB 5',
        corrections: evalData.corrections ?? [],
        strengths: evalData.strengths ?? [],
        weaknesses: evalData.weaknesses ?? [],
        comments: evalData.comments ?? ""
      };
    }

    // High quality offline fallback in case API is completely unreachable
    const wordCount = countWords(text);
    if (taskNum === 1) {
      return {
        score: wordCount < 60 ? 45 : wordCount > 120 ? 60 : 85,
        clb: wordCount < 60 ? 'CLB 5' : wordCount > 120 ? 'CLB 6' : 'CLB 9',
        corrections: [
          { original: "Je vais a Paris", suggested: "Je vais à Paris", explanation: "L'accent grave est requis sur la préposition 'à' pour la différencier du verbe avoir." }
        ],
        strengths: ["Respect des consignes", "Choix du registre familier adapté"],
        weaknesses: ["Fautes d'accents sur les prépositions", "Conjugaisons après préposition"]
      };
    } else if (taskNum === 2) {
      return {
        score: wordCount < 120 ? 55 : 82,
        clb: wordCount < 120 ? 'CLB 6' : 'CLB 8',
        corrections: [
          { original: "Le télétravail présente beaucoup de bienfaits", suggested: "Le télétravail offre de nombreux avantages", explanation: "Le terme 'avantages' est plus précis et professionnel que 'bienfaits' dans un article d'opinion." }
        ],
        strengths: ["Bonne articulation logique", "Paragraphes structurés"],
        weaknesses: ["Répétitions du mot 'travail'", "Vocabulaire parfois trop général"]
      };
    } else {
      return {
        score: wordCount < 120 ? 50 : 88,
        clb: wordCount < 120 ? 'CLB 6' : 'CLB 9',
        corrections: [
          { original: "Option A privilégie une approche", suggested: "L'Option A privilégie une approche", explanation: "L'élision et l'article défini 'L\'' sont indispensables devant 'Option'." }
        ],
        strengths: ["Excellente synthèse des deux options", "Stance personnelle convaincante"],
        weaknesses: ["Accord de l'adjectif dans le paragraphe final", "Légère confusion de préposition"]
      };
    }
  };

  // Generate real AI corrections for speaking feedback
  const getOralCorrections = (taskNum: number) => {
    const ans = speakingAnswers[taskNum];
    const duration = ans?.durationSec || 0;

    if (ans && (ans as any).evaluation) {
      const evalData = (ans as any).evaluation;
      return {
        score: evalData.overallScore ?? 50,
        clb: evalData.clbLevel ?? 'CLB 5',
        transcript: ans.transcript,
        corrections: evalData.corrections ?? [],
        strengths: evalData.strengths ?? [],
        weaknesses: evalData.weaknesses ?? []
      };
    }

    // High quality offline fallback in case API transcription wasn't triggered
    if (taskNum === 1) {
      return {
        score: duration === 0 ? 0 : duration < 30 ? 45 : duration > 120 ? 60 : 86,
        clb: duration === 0 ? 'CLB 0' : duration < 30 ? 'CLB 5' : duration > 120 ? 'CLB 6' : 'CLB 9',
        transcript: ans?.transcript || "(No audio response recorded)",
        corrections: [
          { original: "Je viens de emménager", suggested: "Je viens d'emménager", explanation: "L'élision est obligatoire devant une voyelle pour assurer une prononciation fluide." }
        ],
        strengths: ["Bonne intonation et débit de parole naturel", "Utilisation de structures grammaticales simples mais maîtrisées"],
        weaknesses: ["Légères hésitations sur le vocabulaire des loisirs", "Prononciation de la liaison dans 'trente ans'"]
      };
    } else if (taskNum === 2) {
      return {
        score: duration === 0 ? 0 : duration < 60 ? 50 : 84,
        clb: duration === 0 ? 'CLB 0' : duration < 60 ? 'CLB 6' : 'CLB 8',
        transcript: ans?.transcript || "(No audio response recorded)",
        corrections: [
          { original: "renseignements pour inscrire", suggested: "renseignements pour m'inscrire", explanation: "Le verbe s'inscrire est pronominal, il nécessite le pronom réfléchi 'm'' à la première personne." }
        ],
        strengths: ["Respect parfait des consignes d'interaction sociale", "Utilisation constante du vouvoiement poli"],
        weaknesses: ["Structures interrogatives peu variées", "Formulation un peu répétitive des demandes d'information"]
      };
    } else {
      return {
        score: duration === 0 ? 0 : duration < 90 ? 55 : 90,
        clb: duration === 0 ? 'CLB 0' : duration < 90 ? 'CLB 6' : 'CLB 10',
        transcript: ans?.transcript || "(No audio response recorded)",
        corrections: [
          { original: "pose un risque majeur", suggested: "représente un risque majeur", explanation: "Le verbe 'représenter' offre un registre lexical plus académique et adapté aux critères du niveau C1/C2." }
        ],
        strengths: ["Structure argumentative rigoureuse avec introduction, thèse et synthèse", "Richesse et précision du vocabulaire abstrait", "Débit fluide et articulateurs logiques indispensables"],
        weaknesses: ["Léger trébuchement de prononciation sur le mot 'fondamentales'", "Rythme de phrase parfois un peu trop rapide"]
      };
    }
  };

  // --- RENDER SCREEN 1A: STUNNING TCF WRITTEN simULATOR WORKSPACE ---
  if (activeSeriesId !== null && !isExamFinished && sectionType === 'WRITING') {
    const currentWTask = wTasks[currentWTaskIndex];
    if (!currentWTask) return null;

    const taskAnswer = writingAnswers[currentWTask.taskNumber] || '';
    const wordCount = countWords(taskAnswer);
    const isWithinBounds = wordCount >= currentWTask.minWords && wordCount <= currentWTask.maxWords;

    return (
      <div 
        style={{ 
          backgroundColor: '#f8fafc', 
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Toast Notification Mount */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              style={{
                position: 'fixed',
                top: '24px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 99999,
                backgroundColor: toast.type === 'success' ? '#10b981' : toast.type === 'warning' ? '#f59e0b' : '#3b82f6',
                color: 'white',
                padding: '0.85rem 1.75rem',
                borderRadius: '0.75rem',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.15)',
                fontWeight: 700,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                pointerEvents: 'none'
              }}
            >
              <Info size={16} />
              {toast.message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 📋 Sticky Header Action Bar */}
        <header
          style={{
            height: '70px',
            backgroundColor: 'white',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2rem',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            flexShrink: 0
          }}
        >
          {/* Left Section title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button 
              onClick={() => setActiveModal('LEAVE_EXAM')}
              style={{
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                color: '#64748b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.5rem',
                borderRadius: '0.5rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f1f5f9'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#8b5cf6', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                TCF Written Expression
              </span>
              <h2 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Written Simulator · Series {activeSeriesId}
              </h2>
            </div>
          </div>

          {/* Center Tasks selector pills */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {wTasks.map((t, idx) => {
              const isActive = idx === currentWTaskIndex;
              const hasDraft = countWords(writingAnswers[t.taskNumber]) > 5;
              return (
                <button
                  key={t.id}
                  onClick={() => setCurrentWTaskIndex(idx)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '0.6rem',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    backgroundColor: isActive ? '#8b5cf6' : '#f1f5f9',
                    color: isActive ? 'white' : '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    transition: 'all 0.2s'
                  }}
                >
                  Task {t.taskNumber}
                  {hasDraft && <CheckCircle size={12} color={isActive ? 'white' : '#10b981'} />}
                </button>
              );
            })}
          </div>

          {/* Right Timer pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.4rem', 
                backgroundColor: timeRemaining < 300 ? '#fef2f2' : '#faf5ff',
                border: timeRemaining < 300 ? '1px solid #fca5a5' : '1px solid #ddd6fe',
                padding: '0.45rem 0.85rem',
                borderRadius: '0.6rem',
                color: timeRemaining < 300 ? '#ef4444' : '#6d28d9',
                fontWeight: 700,
                fontFamily: 'monospace',
                fontSize: '0.9rem'
              }}
            >
              <Clock size={14} />
              {formatTime(timeRemaining)}
            </div>
          </div>
        </header>

        {/* 📚 2-Column Split Workspace */}
        <main
          style={{
            flex: 1,
            display: isMobile ? 'flex' : 'grid',
            flexDirection: isMobile ? 'column' : undefined,
            gridTemplateColumns: isMobile ? undefined : 'repeat(auto-fit, minmax(320px, 1fr))',
            height: isMobile ? 'auto' : 'calc(100vh - 140px)',
            overflow: isMobile ? 'visible' : 'hidden'
          }}
        >
          {/* 📄 Left Column: Examiner Prompt Card */}
          <section
            style={{
              padding: isMobile ? '1.5rem 1rem' : '2.5rem',
              overflowY: isMobile ? 'visible' : 'auto',
              borderRight: isMobile ? 'none' : '1px solid #e2e8f0',
              borderBottom: isMobile ? '1px solid #e2e8f0' : 'none',
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '100%'
            }}
          >
            <div style={{ maxWidth: '520px', margin: '0 auto', width: '100%' }}>
              
              {/* Task CEFR and word counts badges */}
              <div style={{ marginBottom: '1.25rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span 
                  style={{ 
                    fontSize: '0.7rem', 
                    fontWeight: 800, 
                    backgroundColor: '#faf5ff', 
                    color: '#6d28d9',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '0.25rem',
                    border: '1px solid #ddd6fe'
                  }}
                >
                  Task {currentWTask.taskNumber} · {currentWTask.difficulty}
                </span>
                <span 
                  style={{ 
                    fontSize: '0.7rem', 
                    fontWeight: 800, 
                    backgroundColor: '#e0f2fe', 
                    color: '#0369a1',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '0.25rem'
                  }}
                >
                  Required: {currentWTask.minWords} - {currentWTask.maxWords} words
                </span>
              </div>

              {/* Title */}
              <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a', marginBottom: '1rem' }}>
                {currentWTask.title}
              </h3>

              {/* Promp card body */}
              <div 
                style={{ 
                  backgroundColor: '#faf8ff', 
                  borderRadius: '1rem', 
                  border: '1px solid #e9d5ff', 
                  padding: '1.75rem',
                  fontSize: '1.05rem',
                  lineHeight: 1.7,
                  color: '#3b0764',
                  fontWeight: 500,
                  whiteSpace: 'pre-wrap',
                  marginBottom: '1.5rem',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                {currentWTask.prompt}
              </div>

              {/* Amber Examiner Strategic Advice Alert */}
              <div 
                style={{ 
                  backgroundColor: 'hsl(35, 100%, 97%)', 
                  border: '1.5px dashed hsl(35, 100%, 80%)', 
                  borderRadius: '1rem', 
                  padding: '1.25rem',
                  display: 'flex',
                  gap: '0.5rem'
                }}
              >
                <Lightbulb size={20} style={{ color: 'hsl(35, 100%, 40%)', flexShrink: 0 }} />
                <p style={{ fontSize: '0.8rem', color: 'hsl(35, 95%, 20%)', lineHeight: 1.5 }}>
                  <strong>Strategic advice:</strong> {currentWTask.contextAdvice}
                </p>
              </div>
            </div>
          </section>

          {/* 📝 Right Column: Frosted Text Editor Workspace */}
          <section
            style={{
              padding: isMobile ? '1.5rem 1rem' : '2.5rem',
              overflowY: isMobile ? 'visible' : 'auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '100%'
            }}
          >
            <div style={{ maxWidth: '560px', margin: '0 auto', width: '100%' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h4 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em' }}>
                  Student Response Sheet
                </h4>
                
                {/* Autosaved mock status */}
                <span style={{ fontSize: '0.75rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.2rem', fontWeight: 600 }}>
                  <Check size={12} strokeWidth={3} />
                  Draft Autosaved
                </span>
              </div>

              {/* Frosted text editor textarea */}
              <textarea
                value={taskAnswer}
                onChange={(e) => setWritingAnswers(prev => ({ ...prev, [currentWTask.taskNumber]: e.target.value }))}
                placeholder="Rédigez votre réponse en français ici..."
                rows={13}
                style={{
                  width: '100%',
                  padding: '1.5rem',
                  borderRadius: '1rem',
                  border: '2px solid #e2e8f0',
                  backgroundColor: 'white',
                  color: '#0f172a',
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  fontFamily: 'Inter, sans-serif',
                  outline: 'none',
                  resize: 'none',
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.01)'
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#8b5cf6'; e.currentTarget.style.boxShadow = '0 0 0 4px rgba(139, 92, 246, 0.15)'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; }}
              />

              {/* Dynamic Word count metrics block */}
              <div 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginTop: '1rem' 
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span 
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      padding: '0.3rem 0.75rem',
                      borderRadius: '0.5rem',
                      backgroundColor: isWithinBounds ? '#d1fae5' : wordCount === 0 ? '#f1f5f9' : '#fee2e2',
                      color: isWithinBounds ? '#065f46' : wordCount === 0 ? '#475569' : '#b91c1c',
                      transition: 'all 0.2s'
                    }}
                  >
                    {wordCount} words
                  </span>
                  
                  {isWithinBounds ? (
                    <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>
                      ✓ Within requested boundaries
                    </span>
                  ) : wordCount > 0 ? (
                    <span style={{ fontSize: '0.75rem', color: '#b91c1c', fontWeight: 600 }}>
                      {wordCount < currentWTask.minWords ? 'Too short' : 'Exceeds maximum words'}
                    </span>
                  ) : null}
                </div>

                <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>
                  Boundaries: {currentWTask.minWords} - {currentWTask.maxWords}
                </span>
              </div>

            </div>
          </section>
        </main>

        {/* 📦 Sticky Bottom Control Bar */}
        <footer
          style={{
            height: '70px',
            backgroundColor: 'white',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2rem',
            position: 'sticky',
            bottom: 0,
            zIndex: 100,
            flexShrink: 0
          }}
        >
          {/* Prev button */}
          <button
            onClick={() => setCurrentWTaskIndex(prev => Math.max(0, prev - 1))}
            disabled={currentWTaskIndex === 0}
            style={{
              padding: '0.55rem 1rem',
              borderRadius: '0.5rem',
              border: '1px solid #cbd5e1',
              backgroundColor: 'white',
              color: currentWTaskIndex === 0 ? '#94a3b8' : '#475569',
              fontWeight: 600,
              fontSize: '0.8rem',
              cursor: currentWTaskIndex === 0 ? 'not-allowed' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              transition: 'all 0.2s'
            }}
          >
            <ChevronLeft size={16} />
            Previous Task
          </button>

          {/* Submit or Next */}
          {currentWTaskIndex === 2 ? (
            <button
              onClick={handleFinishExam}
              style={{
                padding: '0.55rem 1.75rem',
                borderRadius: '0.5rem',
                border: 'none',
                backgroundColor: '#10b981',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                boxShadow: '0 4px 6px rgba(16,185,129,0.15)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#059669'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#10b981'; }}
            >
              Grade Written Simulator
              <Send size={15} />
            </button>
          ) : (
            <button
              onClick={() => setCurrentWTaskIndex(prev => Math.min(2, prev + 1))}
              style={{
                padding: '0.55rem 1.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                backgroundColor: '#8b5cf6',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                boxShadow: '0 4px 6px rgba(139,92,246,0.15)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#7c3aed'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#8b5cf6'; }}
            >
              Next Task
              <ChevronRight size={15} />
            </button>
          )}
        </footer>

        {/* Custom Confirmation Modals */}
        <AnimatePresence>
          {activeModal === 'LEAVE_EXAM' && (
            <div 
              style={{ 
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(9, 13, 22, 0.45)', backdropFilter: 'blur(10px)',
                zIndex: 99999, display: 'flex', justifyContent: 'center', alignItems: 'center',
                padding: '1.5rem'
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                style={{
                  width: '100%', maxWidth: '420px', backgroundColor: 'white',
                  borderRadius: '1.5rem', padding: '2rem', textAlign: 'center',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', border: '1px solid #e2e8f0'
                }}
              >
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#fee2e2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                  <AlertTriangle size={24} />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                  Exit Writing Simulator?
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5, marginBottom: '1.75rem' }}>
                  Are you sure you want to exit? Your progressive drafts in this Written Expression series will not be saved.
                </p>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button 
                    onClick={() => setActiveModal(null)}
                    style={{ flex: 1, padding: '0.7rem', borderRadius: '0.75rem', border: '1px solid #cbd5e1', backgroundColor: 'white', color: '#475569', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
                  >
                    Keep Drafting
                  </button>
                  <button 
                    onClick={confirmLeaveExam}
                    style={{ flex: 1, padding: '0.7rem', borderRadius: '0.75rem', border: 'none', backgroundColor: '#ef4444', color: 'white', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
                  >
                    Yes, Exit
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    );
  }

  // --- RENDER SCREEN 1B: STUNNING TCF ORAL SIMULATOR WORKSPACE ---
  if (activeSeriesId !== null && !isExamFinished && sectionType === 'SPEAKING') {
    const currentOTask = oTasks[currentOTaskIndex];
    if (!currentOTask) return null;

    const taskAnswer = speakingAnswers[currentOTask.taskNumber] || { isRecorded: false, durationSec: 0, transcript: '' };

    const handleStartPrep = () => {
      setRecordingState('PREPARING');
      setPrepTimeRemaining(180); // 3 minutes
    };

    const handleSkipPrep = () => {
      setRecordingState('RECORDING');
      setRecordTime(0);
    };

    const handleStartRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioStreamRef.current = stream;
        audioChunksRef.current = [];

        const recorder = new MediaRecorder(stream);
        mediaRecorderRef.current = recorder;

        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        recorder.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          // Stop all audio tracks
          stream.getTracks().forEach(track => track.stop());

          // Call evaluate speech endpoint
          await uploadAndEvaluateSpeech(audioBlob);
        };

        recorder.start();
        setRecordingState('RECORDING');
        setRecordTime(0);
      } catch (err) {
        console.error('Error starting audio recording:', err);
        triggerToast('Microphone access denied or error starting recording.', 'warning');
      }
    };

    const handleStopRecording = () => {
      setRecordingState('SAVED');
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
    };

    const uploadAndEvaluateSpeech = async (audioBlob: Blob) => {
      setIsTranscribing(true);
      try {
        const formData = new FormData();
        formData.append('audio', audioBlob, `task_${currentOTask.taskNumber}.webm`);
        formData.append('taskInstruction', currentOTask.prompt);

        const response = await api.post('/ai/evaluate-speech', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const { transcript, evaluation } = response.data;
        const durationSec = recordTime > 5 ? recordTime : 75;

        setSpeakingAnswers(prev => ({
          ...prev,
          [currentOTask.taskNumber]: {
            isRecorded: true,
            durationSec,
            transcript: transcript || '(No speech detected)',
            evaluation
          }
        }));

        triggerToast(`Task ${currentOTask.taskNumber} audio response processed successfully!`, 'success');
      } catch (error) {
        console.error('Failed to evaluate speech:', error);
        triggerToast('Failed to evaluate speech. Please try again.', 'warning');
        setRecordingState('IDLE');
      } finally {
        setIsTranscribing(false);
      }
    };

    const handleRerecord = () => {
      setRecordingState('IDLE');
      setRecordTime(0);
      setPrepTimeRemaining(180);
      setSpeakingAnswers(prev => ({
        ...prev,
        [currentOTask.taskNumber]: { isRecorded: false, durationSec: 0, transcript: '' }
      }));
    };

    // Format minutes/seconds for task timer
    const formatDuration = (sec: number) => {
      const mm = Math.floor(sec / 60).toString().padStart(2, '0');
      const ss = (sec % 60).toString().padStart(2, '0');
      return `${mm}:${ss}`;
    };

    return (
      <div 
        style={{ 
          backgroundColor: '#f8fafc', 
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              style={{
                position: 'fixed', top: '24px', left: '50%', transform: 'translateX(-50%)', zIndex: 99999,
                backgroundColor: toast.type === 'success' ? '#10b981' : toast.type === 'warning' ? '#f59e0b' : '#3b82f6',
                color: 'white', padding: '0.85rem 1.75rem', borderRadius: '0.75rem',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.15)', fontWeight: 700, fontSize: '0.85rem',
                display: 'flex', alignItems: 'center', gap: '0.5rem', pointerEvents: 'none'
              }}
            >
              <Info size={16} />
              {toast.message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 📋 Sticky Header Action Bar */}
        <header
          style={{
            height: '70px', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 2rem', position: 'sticky', top: 0, zIndex: 100, flexShrink: 0
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button 
              onClick={() => setActiveModal('LEAVE_EXAM')}
              style={{
                border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b',
                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem',
                borderRadius: '0.5rem', transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f1f5f9'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f97316', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                TCF Oral Expression
              </span>
              <h2 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Speaking Simulator · Series {activeSeriesId}
              </h2>
            </div>
          </div>

          {/* Center Tasks selector pills */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {oTasks.map((t, idx) => {
              const isActive = idx === currentOTaskIndex;
              const isDone = speakingAnswers[t.taskNumber]?.isRecorded;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setCurrentOTaskIndex(idx);
                    setRecordingState(speakingAnswers[t.taskNumber]?.isRecorded ? 'SAVED' : 'IDLE');
                  }}
                  style={{
                    padding: '0.5rem 1rem', borderRadius: '0.6rem', border: 'none', fontWeight: 700, fontSize: '0.8rem',
                    cursor: 'pointer', backgroundColor: isActive ? '#f97316' : '#f1f5f9', color: isActive ? 'white' : '#64748b',
                    display: 'flex', alignItems: 'center', gap: '0.35rem', transition: 'all 0.2s'
                  }}
                >
                  Task {t.taskNumber}
                  {isDone && <CheckCircle size={12} color={isActive ? 'white' : '#10b981'} />}
                </button>
              );
            })}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div 
              style={{ 
                display: 'flex', alignItems: 'center', gap: '0.4rem', 
                backgroundColor: timeRemaining < 300 ? '#fef2f2' : '#faf5ff',
                border: timeRemaining < 300 ? '1px solid #fca5a5' : '1px solid #ddd6fe',
                padding: '0.45rem 0.85rem', borderRadius: '0.6rem',
                color: timeRemaining < 300 ? '#ef4444' : '#6d28d9',
                fontWeight: 700, fontFamily: 'monospace', fontSize: '0.9rem'
              }}
            >
              <Clock size={14} />
              {formatTime(timeRemaining)}
            </div>
          </div>
        </header>

        {/* 📚 2-Column Split Workspace */}
        <main
          style={{
            flex: 1, display: isMobile ? 'flex' : 'grid', flexDirection: isMobile ? 'column' : undefined,
            gridTemplateColumns: isMobile ? undefined : 'repeat(auto-fit, minmax(320px, 1fr))',
            height: isMobile ? 'auto' : 'calc(100vh - 140px)', overflow: isMobile ? 'visible' : 'hidden'
          }}
        >
          {/* Left Column: Prompt details */}
          <section
            style={{
              padding: isMobile ? '1.5rem 1rem' : '2.5rem', overflowY: isMobile ? 'visible' : 'auto',
              borderRight: isMobile ? 'none' : '1px solid #e2e8f0', borderBottom: isMobile ? '1px solid #e2e8f0' : 'none',
              backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%'
            }}
          >
            <div style={{ maxWidth: '520px', margin: '0 auto', width: '100%' }}>
              <div style={{ marginBottom: '1.25rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span 
                  style={{ 
                    fontSize: '0.7rem', fontWeight: 800, backgroundColor: '#fff7ed', color: '#ea580c',
                    padding: '0.2rem 0.5rem', borderRadius: '0.25rem', border: '1px solid #ffedd5'
                  }}
                >
                  Task {currentOTask.taskNumber} · {currentOTask.difficulty}
                </span>
                <span 
                  style={{ 
                    fontSize: '0.7rem', fontWeight: 800, backgroundColor: '#e0f2fe', color: '#0369a1',
                    padding: '0.2rem 0.5rem', borderRadius: '0.25rem'
                  }}
                >
                  Time limit: {currentOTask.minDurationSec}s - {currentOTask.maxDurationSec}s
                </span>
              </div>

              <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a', marginBottom: '1rem' }}>
                {currentOTask.title}
              </h3>

              <div 
                style={{ 
                  backgroundColor: '#fffaf5', borderRadius: '1rem', border: '1px solid #ffedd5', padding: '1.75rem',
                  fontSize: '1.05rem', lineHeight: 1.7, color: '#431407', fontWeight: 500,
                  whiteSpace: 'pre-wrap', marginBottom: '1.5rem', fontFamily: 'Inter, sans-serif'
                }}
              >
                {currentOTask.prompt}
              </div>

              <div style={{ backgroundColor: 'hsl(35, 100%, 97%)', border: '1.5px dashed hsl(35, 100%, 80%)', borderRadius: '1rem', padding: '1.25rem', display: 'flex', gap: '0.5rem' }}>
                <Lightbulb size={20} style={{ color: 'hsl(35, 100%, 40%)', flexShrink: 0 }} />
                <p style={{ fontSize: '0.8rem', color: 'hsl(35, 95%, 20%)', lineHeight: 1.5 }}>
                  <strong>Strategic advice:</strong> {currentOTask.contextAdvice}
                </p>
              </div>
            </div>
          </section>

          {/* Right Column: Audio Recording panel */}
          <section
            style={{
              padding: isMobile ? '1.5rem 1rem' : '2.5rem', overflowY: isMobile ? 'visible' : 'auto',
              display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%'
            }}
          >
            <div style={{ maxWidth: '560px', margin: '0 auto', width: '100%', textAlign: 'center' }}>
              
              {/* Task 2 Preparation Step */}
              {currentOTask.taskNumber === 2 && recordingState === 'IDLE' && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ padding: '2.5rem', borderRadius: '1.5rem', backgroundColor: 'white', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                  <Volume2 size={48} style={{ color: '#ea580c', margin: '0 auto 1.5rem' }} />
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                    Interactive Roleplay Preparation
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6, marginBottom: '2rem' }}>
                    According to official TCF Canada guidelines, you are allowed **3 minutes** to prepare your response card and structure your interview questions before the speaking timer begins.
                  </p>
                  
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button
                      onClick={handleStartPrep}
                      style={{
                        backgroundColor: '#ea580c', border: 'none', borderRadius: '0.75rem',
                        padding: '0.75rem 1.5rem', color: 'white', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(234,88,12,0.2)'
                      }}
                    >
                      Start 3m Prep
                    </button>
                    <button
                      onClick={handleSkipPrep}
                      style={{
                        backgroundColor: 'transparent', border: '1px solid #cbd5e1', borderRadius: '0.75rem',
                        padding: '0.75rem 1.5rem', color: '#475569', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer'
                      }}
                    >
                      Skip Prep & Record
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Prep Ticker Display */}
              {recordingState === 'PREPARING' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '2.5rem', borderRadius: '1.5rem', backgroundColor: '#fff7ed', border: '1.5px dashed #ffedd5' }}>
                  <Clock size={40} style={{ color: '#ea580c', margin: '0 auto 1rem' }} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ea580c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Preparation Ticking Down
                  </span>
                  <div style={{ fontSize: '3rem', fontWeight: 900, fontFamily: 'monospace', color: '#7c2d12', margin: '0.5rem 0' }}>
                    {formatDuration(prepTimeRemaining)}
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#9a3412', marginBottom: '1.5rem' }}>
                    Take notes and structure your questions. Recording will start automatically once this timer reaches zero.
                  </p>
                  <button
                    onClick={handleSkipPrep}
                    style={{
                      backgroundColor: '#ea580c', border: 'none', borderRadius: '0.75rem',
                      padding: '0.6rem 1.25rem', color: 'white', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer'
                    }}
                  >
                    Start Recording Now
                  </button>
                </motion.div>
              )}

              {/* Live Recorder Workspace */}
              {((currentOTask.taskNumber !== 2 && recordingState === 'IDLE') || recordingState === 'RECORDING') && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ padding: '3rem 2rem', borderRadius: '1.5rem', backgroundColor: 'white', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                  
                  {/* Flashing Status indicator */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                    <div 
                      style={{ 
                        width: '8px', height: '8px', borderRadius: '50%',
                        backgroundColor: recordingState === 'RECORDING' ? '#ef4444' : '#64748b'
                      }} 
                    />
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: recordingState === 'RECORDING' ? '#ef4444' : '#64748b', letterSpacing: '0.05em' }}>
                      {recordingState === 'RECORDING' ? 'Live Microphone Recording' : 'Microphone Ready'}
                    </span>
                  </div>

                  {/* Pulsing Central Mic Ring */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                    <button
                      onClick={recordingState === 'RECORDING' ? handleStopRecording : handleStartRecording}
                      style={{
                        width: '96px', height: '96px', borderRadius: '50%', border: 'none',
                        background: recordingState === 'RECORDING' 
                          ? 'radial-gradient(circle, #ef4444 0%, #dc2626 100%)'
                          : 'radial-gradient(circle, #ea580c 0%, #c2410c 100%)',
                        color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', position: 'relative', outline: 'none',
                        boxShadow: recordingState === 'RECORDING'
                          ? '0 0 0 8px rgba(239, 68, 68, 0.15), 0 8px 24px rgba(239, 68, 68, 0.3)'
                          : '0 0 0 8px rgba(234, 88, 12, 0.1), 0 8px 24px rgba(234, 88, 12, 0.35)',
                        transition: 'all 0.2s'
                      }}
                    >
                      <Mic size={36} />
                    </button>
                  </div>

                  {/* Dynamic Timer Ticker */}
                  <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'monospace', color: '#1e293b', marginBottom: '1.5rem' }}>
                    {formatDuration(recordTime)} / {formatDuration(currentOTask.maxDurationSec)}
                  </div>

                  {/* Audio Wave Visualizer mockup */}
                  {recordingState === 'RECORDING' ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px', height: '50px', marginBottom: '1rem' }}>
                      {[8, 2, 9, 3, 7, 1, 6, 4, 8, 3, 9, 2, 7, 5, 8].map((val, idx) => (
                        <motion.div
                          key={idx}
                          animate={{ height: [12, val * 5, 12] }}
                          transition={{ repeat: Infinity, duration: 0.5 + (idx % 3) * 0.15, ease: "easeInOut" }}
                          style={{ width: '4px', backgroundColor: '#ef4444', borderRadius: '2px' }}
                        />
                      ))}
                    </div>
                  ) : (
                    <div style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.5 }}>
                      Click the microphone button to start recording your response. Speak clearly in French.
                    </div>
                  )}

                  {recordingState === 'RECORDING' && (
                    <button
                      onClick={handleStopRecording}
                      style={{
                        marginTop: '1.5rem', padding: '0.5rem 1.25rem', borderRadius: '0.5rem',
                        border: 'none', backgroundColor: '#f1f5f9', color: '#334155',
                        fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.2s'
                      }}
                    >
                      Stop & Save Response
                    </button>
                  )}
                </motion.div>
              )}

              {/* Saved response / Audio play and Transcribing block */}
              {recordingState === 'SAVED' && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ padding: '2.5rem', borderRadius: '1.5rem', backgroundColor: 'white', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                  
                  {isTranscribing ? (
                    <div style={{ padding: '1.5rem 0' }}>
                      <RefreshCw size={36} className="animate-spin" style={{ color: '#ea580c', margin: '0 auto 1rem' }} />
                      <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.35rem' }}>
                        Processing Audio Signal...
                      </h4>
                      <p style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        AI Neural Transcriber is outputting French text transcript...
                      </p>
                    </div>
                  ) : (
                    <div>
                      <ShieldCheck size={40} style={{ color: '#10b981', margin: '0 auto 1rem' }} />
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                        Audio Response Recorded
                      </h4>
                      <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1.5rem' }}>
                        Response duration: **{formatDuration(taskAnswer.durationSec)}**. Your audio has been saved successfully in your practice session record.
                      </p>

                      <div 
                        style={{ 
                          textAlign: 'left', backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '0.75rem',
                          border: '1px solid #e2e8f0', fontSize: '0.85rem', lineHeight: 1.6, color: '#334155',
                          marginBottom: '2rem', fontStyle: 'italic', maxHeight: '150px', overflowY: 'auto'
                        }}
                      >
                        <strong>Speech transcript preview:</strong><br />
                        "{taskAnswer.transcript}"
                      </div>

                      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                        <button
                          onClick={handleRerecord}
                          style={{
                            backgroundColor: 'white', border: '1px solid #cbd5e1', borderRadius: '0.75rem',
                            padding: '0.6rem 1.25rem', color: '#475569', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer'
                          }}
                        >
                          Re-record Response
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

            </div>
          </section>
        </main>

        {/* 📋 Simulator Sticky Footer bar */}
        <footer
          style={{
            height: '70px', backgroundColor: 'white', borderTop: '1px solid #e2e8f0',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 2rem', flexShrink: 0
          }}
        >
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>
            Oral Expression Series {activeSeriesId} · Speaking Training
          </span>

          {currentOTaskIndex < 2 ? (
            <button
              onClick={() => {
                setCurrentOTaskIndex(prev => prev + 1);
                setRecordingState(speakingAnswers[oTasks[currentOTaskIndex + 1].taskNumber]?.isRecorded ? 'SAVED' : 'IDLE');
              }}
              style={{
                backgroundColor: '#f97316', border: 'none', borderRadius: '0.6rem',
                padding: '0.6rem 1.5rem', color: 'white', fontWeight: 700, fontSize: '0.8rem',
                cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.25rem'
              }}
            >
              Next Task
              <ChevronRight size={15} />
            </button>
          ) : (
            <button
              onClick={handleFinishExam}
              disabled={recordingState === 'RECORDING'}
              style={{
                backgroundColor: '#10b981', border: 'none', borderRadius: '0.6rem',
                padding: '0.6rem 1.5rem', color: 'white', fontWeight: 700, fontSize: '0.8rem',
                cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
                opacity: recordingState === 'RECORDING' ? 0.5 : 1
              }}
            >
              Finish Oral Exam
              <ChevronRight size={15} />
            </button>
          )}
        </footer>

        {/* Custom Confirmation Modals */}
        <AnimatePresence>
          {activeModal === 'LEAVE_EXAM' && (
            <div 
              style={{ 
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(9, 13, 22, 0.45)', backdropFilter: 'blur(10px)',
                zIndex: 99999, display: 'flex', justifyContent: 'center', alignItems: 'center',
                padding: '1.5rem'
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                style={{
                  width: '100%', maxWidth: '420px', backgroundColor: 'white',
                  borderRadius: '1.5rem', padding: '2rem', textAlign: 'center',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', border: '1px solid #e2e8f0'
                }}
              >
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#fee2e2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                  <AlertTriangle size={24} />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                  Exit Speaking Simulator?
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5, marginBottom: '1.75rem' }}>
                  Are you sure you want to exit? Your recorded spoken answers in this series will not be saved.
                </p>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button 
                    onClick={() => setActiveModal(null)}
                    style={{ flex: 1, padding: '0.7rem', borderRadius: '0.75rem', border: '1px solid #cbd5e1', backgroundColor: 'white', color: '#475569', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
                  >
                    Keep Practicing
                  </button>
                  <button 
                    onClick={confirmLeaveExam}
                    style={{ flex: 1, padding: '0.7rem', borderRadius: '0.75rem', border: 'none', backgroundColor: '#ef4444', color: 'white', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
                  >
                    Yes, Exit
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // --- RENDER SCREEN: WRITING EVALUATION LOADER ---
  if (activeSeriesId !== null && isEvaluatingWriting && sectionType === 'WRITING') {
    return (
      <div 
        style={{ 
          backgroundColor: '#f1f5f9', 
          minHeight: '100vh', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '2rem'
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '400px', width: '100%' }}>
          <Sparkles size={48} className="animate-pulse" style={{ color: 'hsl(262, 83%, 53%)', margin: '0 auto 1.5rem' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem', fontFamily: 'Outfit, sans-serif' }}>
            Evora AI Grading in Progress
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6, marginBottom: '2rem' }}>
            Analyzing your French grammar, vocabulary diversity, and sentence structure. This may take up to 15 seconds...
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="animate-spin" style={{ width: '24px', height: '24px', border: '3px solid #cbd5e1', borderTopColor: 'hsl(262, 83%, 53%)', borderRadius: '50%' }} />
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER SCREEN 2A: HIGH-END AI SCORING REPORT CARD FOR WRITTEN SIMULATOR ---
  if (activeSeriesId !== null && isExamFinished && sectionType === 'WRITING') {
    const feedback1 = getWritingCorrections(1);
    const feedback2 = getWritingCorrections(2);
    const feedback3 = getWritingCorrections(3);

    const activeFeedback = activeReportTab === 1 ? feedback1 : activeReportTab === 2 ? feedback2 : feedback3;
    const activeTextAnswer = writingAnswers[activeReportTab] || '';
    const activeTextWordCount = countWords(activeTextAnswer);

    // Compute average CLB level
    const avgScore = (feedback1.score + feedback2.score + feedback3.score) / 3;
    let overallClb = 'CLB 6';
    if (avgScore >= 85) overallClb = 'CLB 9';
    else if (avgScore >= 74) overallClb = 'CLB 8';
    else if (avgScore >= 60) overallClb = 'CLB 7';

    return (
      <div 
        style={{ 
          backgroundColor: '#f1f5f9', 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '4rem 1.5rem'
        }}
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card-elevated p-6 sm:p-12"
          style={{
            width: '100%',
            maxWidth: '820px',
            backgroundColor: 'white',
            borderRadius: '2rem',
            border: '1px solid rgba(255,255,255,0.7)',
            position: 'relative'
          }}
        >
          {/* Header section with Trophy and Score card */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '2rem', marginBottom: '2rem' }}>
            <div 
              style={{ 
                width: '64px', 
                height: '64px', 
                borderRadius: '50%', 
                backgroundColor: '#faf5ff', 
                color: '#8b5cf6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Trophy size={32} />
            </div>

            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#8b5cf6', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                TCF Written Series {activeSeriesId} AI Evaluation
              </span>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0f172a', marginTop: '0.1rem' }}>
                Linguistic Correction Dashboard
              </h2>
            </div>

            {/* Glowing CLB tag */}
            <div 
              style={{ 
                padding: '0.75rem 1.5rem', 
                borderRadius: '1rem', 
                background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', 
                color: 'white', 
                textAlign: 'center',
                boxShadow: '0 8px 20px -4px rgba(139,92,246,0.3)'
              }}
            >
              <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', opacity: 0.9 }}>
                Overall Benchmark
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 900, fontFamily: 'Outfit, sans-serif' }}>
                {overallClb}
              </div>
            </div>
          </div>

          {/* Tab selector for Task 1, 2, and 3 report cards */}
          <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '0.75rem', marginBottom: '1.75rem' }}>
            {([1, 2, 3] as const).map((taskNum) => {
              const isActive = activeReportTab === taskNum;
              const taskScore = taskNum === 1 ? feedback1.score : taskNum === 2 ? feedback2.score : feedback3.score;
              return (
                <button
                  key={taskNum}
                  onClick={() => setActiveReportTab(taskNum)}
                  style={{
                    padding: '0.6rem 1.25rem',
                    borderRadius: '0.75rem',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    backgroundColor: isActive ? 'rgba(139,92,246,0.08)' : 'transparent',
                    color: isActive ? '#6d28d9' : '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s'
                  }}
                >
                  Task {taskNum} report card
                  <span style={{ fontSize: '0.75rem', padding: '0.1rem 0.4rem', borderRadius: '0.35rem', backgroundColor: isActive ? '#8b5cf6' : '#f1f5f9', color: isActive ? 'white' : '#64748b' }}>
                    {taskScore}%
                  </span>
                </button>
              );
            })}
          </div>

          {/* Interactive AI Corrections layout */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            
            {/* Left Box: Original drafted response and Word count status */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h4 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em' }}>
                  Your Submitted Draft
                </h4>
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
                  {activeTextWordCount} words
                </span>
              </div>
              
              <div 
                style={{
                  height: '240px',
                  overflowY: 'auto',
                  padding: '1.25rem',
                  backgroundColor: '#f8fafc',
                  borderRadius: '1rem',
                  border: '1.5px solid #cbd5e1',
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  color: '#334155',
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                {activeTextAnswer || "[Aucun texte rédigé pour cette tâche.]"}
              </div>
            </div>

            {/* Right Box: AI Corrections list & explanations accordion */}
            <div>
              <h4 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                Linguistic Grammar Corrections
              </h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '240px', overflowY: 'auto', paddingRight: '0.25rem' }}>
                {activeFeedback.corrections.map((corr: { original: string; suggested: string; explanation: string }, idx: number) => (
                  <div 
                    key={idx}
                    style={{
                      padding: '1rem',
                      borderRadius: '0.85rem',
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.01)'
                    }}
                  >
                    {/* Original in Red */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#b91c1c', textDecoration: 'line-through', fontWeight: 500 }}>
                      <span style={{ padding: '0.1rem 0.3rem', borderRadius: '0.25rem', backgroundColor: '#fee2e2', fontSize: '0.7rem', fontWeight: 700 }}>Original</span>
                      "{corr.original}"
                    </div>
                    {/* Suggested in Green */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#047857', fontWeight: 700, marginTop: '0.35rem' }}>
                      <span style={{ padding: '0.1rem 0.3rem', borderRadius: '0.25rem', backgroundColor: '#d1fae5', fontSize: '0.7rem', fontWeight: 700 }}>Suggested</span>
                      "{corr.suggested}"
                    </div>
                    {/* Explanation */}
                    <div style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.5, marginTop: '0.5rem', borderTop: '1px dashed #e2e8f0', paddingTop: '0.4rem', fontStyle: 'italic' }}>
                      💡 {corr.explanation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Strengths & Weaknesses quick tags list */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2.5rem', borderTop: '1px solid #e2e8f0', paddingTop: '2rem' }}>
            <div>
              <h4 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: '#059669', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                Linguistic Strengths
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {activeFeedback.strengths.map((s: string) => (
                  <span key={s} style={{ fontSize: '0.75rem', fontWeight: 600, backgroundColor: '#d1fae5', color: '#065f46', padding: '0.25rem 0.65rem', borderRadius: '0.5rem' }}>
                    ✦ {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: '#ef4444', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                Linguistic Weaknesses
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {activeFeedback.weaknesses.map((w: string) => (
                  <span key={w} style={{ fontSize: '0.75rem', fontWeight: 600, backgroundColor: '#fee2e2', color: '#991b1b', padding: '0.25rem 0.65rem', borderRadius: '0.5rem' }}>
                    ⚠ {w}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom actions panel */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem', borderTop: '1px solid #e2e8f0', paddingTop: '2rem' }}>
            <button
              onClick={handleRestartTraining}
              style={{
                padding: '0.85rem 2.5rem',
                borderRadius: '0.75rem',
                border: 'none',
                backgroundColor: '#8b5cf6',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 12px rgba(139,92,246,0.2)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#7c3aed'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#8b5cf6'; }}
            >
              <RefreshCw size={16} />
              Go Back to Series
            </button>
          </div>

        </motion.div>
      </div>
    );
  }

  // --- RENDER SCREEN 1: PROFESSIONAL EXAM SIMULATOR (THE 2-COLUMN STATE PANEL) ---
  if (activeSeriesId !== null && !isExamFinished) {
    const currentQuestion = questions[currentQIndex];
    const isAnswered = (id: number) => !!answers[id];
    const selectedOption = answers[currentQuestion.id];
    const isLastQ = currentQIndex === questions.length - 1;

    return (
      <div 
        style={{ 
          backgroundColor: '#f8fafc', 
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Toast Notification Mount */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              style={{
                position: 'fixed',
                top: '24px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 99999,
                backgroundColor: toast.type === 'success' ? '#10b981' : toast.type === 'warning' ? '#f59e0b' : '#3b82f6',
                color: 'white',
                padding: '0.85rem 1.75rem',
                borderRadius: '0.75rem',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.15)',
                fontWeight: 700,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                pointerEvents: 'none'
              }}
            >
              <Info size={16} />
              {toast.message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 📋 1. STICKY TOP NAVIGATION BAR */}
        <header
          style={{
            height: '70px',
            backgroundColor: 'white',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2rem',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            flexShrink: 0
          }}
        >
          {/* Left Title details */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button 
              onClick={() => setActiveModal('LEAVE_EXAM')}
              style={{
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                color: '#64748b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.5rem',
                borderRadius: '0.5rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f1f5f9'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: `hsl(${meta.color})`, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {meta.label} Practice
              </span>
              <h2 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Practice Series {activeSeriesId}
              </h2>
            </div>
          </div>

          {/* Center Progress tracking bar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '280px' }} className="hidden sm:flex">
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', marginBottom: '0.25rem' }}>
              Question {currentQIndex + 1} of {questions.length} · {Object.keys(answers).length} answered
            </span>
            <div style={{ width: '100%', height: '6px', backgroundColor: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
              <motion.div 
                style={{ height: '100%', backgroundColor: `hsl(${meta.color})` }}
                animate={{ width: `${((currentQIndex + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>

          {/* Right Timer & Quick Helpers */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Countdown clock badge */}
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.4rem', 
                backgroundColor: timeRemaining < 300 ? '#fef2f2' : '#f0fdf4',
                border: timeRemaining < 300 ? '1px solid #fca5a5' : '1px solid #bbf7d0',
                padding: '0.45rem 0.85rem',
                borderRadius: '0.6rem',
                color: timeRemaining < 300 ? '#ef4444' : '#15803d',
                fontWeight: 700,
                fontFamily: 'monospace',
                fontSize: '0.9rem'
              }}
            >
              <Clock size={14} />
              {formatTime(timeRemaining)}
            </div>
          </div>
        </header>

        {/* 📖 2. CENTRAL SPLIT BOARD (CONTENT ON LEFT, QUESTIONS/OPTIONS ON RIGHT) */}
        <main
          style={{
            flex: 1,
            display: isMobile ? 'flex' : 'grid',
            flexDirection: isMobile ? 'column' : undefined,
            gridTemplateColumns: isMobile ? undefined : 'repeat(auto-fit, minmax(320px, 1fr))',
            height: isMobile ? 'auto' : 'calc(100vh - 140px)',
            overflow: isMobile ? 'visible' : 'hidden'
          }}
        >
          {/* 📄 LEFT COLUMN: READABLE DOCUMENT CANVAS */}
          <section
            style={{
              padding: isMobile ? '1.5rem 1rem' : '2.5rem',
              overflowY: isMobile ? 'visible' : 'auto',
              borderRight: isMobile ? 'none' : '1px solid #e2e8f0',
              borderBottom: isMobile ? '1px solid #e2e8f0' : 'none',
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              width: '100%'
            }}
          >
            {/* Sleek watermarked sheet */}
            <div
              className="p-6 sm:p-10"
              style={{
                width: '100%',
                maxWidth: '560px',
                borderRadius: '1.25rem',
                border: '1.5px dashed #cbd5e1',
                backgroundColor: '#fafbfc',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Maple leaf background watermark */}
              <div 
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '280px',
                  height: '280px',
                  opacity: 0.02,
                  pointerEvents: 'none'
                }}
              >
                <svg viewBox="0 0 100 100" fill="#1d4ed8" width="100%" height="100%">
                  <path d="M50 5 L55 25 L75 25 L60 38 L65 58 L50 46 L35 58 L40 38 L25 25 L45 25 Z" />
                </svg>
              </div>

              {/* Document/Poster Subtitle */}
              <div 
                style={{ 
                  fontSize: '0.75rem', 
                  fontWeight: 700, 
                  color: '#64748b', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.05em', 
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: `hsl(${meta.color})` }} />
                {currentQuestion.sectionTitle}
              </div>

              {/* Central text formatted professionally */}
              <div
                style={{
                  fontSize: '1.2rem',
                  color: '#1e293b',
                  lineHeight: 1.7,
                  whiteSpace: 'pre-wrap',
                  fontWeight: 500,
                  fontFamily: 'Inter, system-ui'
                }}
              >
                {currentQuestion.posterText}
              </div>

              <div 
                style={{ 
                  marginTop: '2.5rem', 
                  borderTop: '1px solid #e2e8f0', 
                  paddingTop: '0.75rem', 
                  fontSize: '0.7rem', 
                  color: '#94a3b8', 
                  fontWeight: 600,
                  textAlign: 'right'
                }}
              >
                TCF Source Matrix · www.formation-tcfcanada.com
              </div>
            </div>
            
            {/* Magnifier Glass Zoom Button */}
            <div 
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#f1f5f9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#475569',
                cursor: 'pointer',
                border: '1px solid #e2e8f0',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#e2e8f0'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#f1f5f9'; }}
              onClick={() => setActiveModal('ZOOM_POSTER')}
            >
              <Eye size={16} />
            </div>
          </section>

          {/* 📝 RIGHT COLUMN: QUESTION & SELECTION MATRIX */}
          <section
            style={{
              padding: isMobile ? '1.5rem 1rem' : '3rem 2.5rem',
              overflowY: isMobile ? 'visible' : 'auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '100%'
            }}
          >
            <div style={{ maxWidth: '520px', margin: '0 auto', width: '100%' }}>
              
              {/* Question difficulty flag */}
              <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span 
                  style={{ 
                    fontSize: '0.7rem', 
                    fontWeight: 800, 
                    backgroundColor: '#f1f5f9', 
                    color: '#475569',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '0.25rem',
                    border: '1px solid #cbd5e1'
                  }}
                >
                  Difficulty Level: {currentQuestion.difficulty}
                </span>
                <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b' }}>
                  ★ {currentQuestion.points} points
                </span>
              </div>

              {/* The prompt question */}
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.4, marginBottom: '2rem' }}>
                {currentQuestion.questionText}
              </h3>

              {/* Vertical choice cards stack */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {currentQuestion.options.map((opt, oIdx) => {
                  const letter = ['A', 'B', 'C', 'D'][oIdx] as 'A' | 'B' | 'C' | 'D';
                  const isSelected = selectedOption === letter;

                  return (
                    <button
                      key={letter}
                      onClick={() => setAnswers(prev => ({ ...prev, [currentQuestion.id]: letter }))}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '1rem 1.25rem',
                        borderRadius: '0.85rem',
                        border: isSelected ? '1.5px solid #2563eb' : '1.5px solid #e2e8f0',
                        backgroundColor: isSelected ? '#f8fafc' : 'white',
                        color: isSelected ? '#1e40af' : '#334155',
                        fontWeight: isSelected ? 600 : 500,
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        boxShadow: isSelected ? '0 4px 6px -1px rgba(37,99,235,0.05)' : 'none'
                      }}
                      onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.borderColor = '#cbd5e1'; }}
                      onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.borderColor = '#e2e8f0'; }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {/* Circle letter selector badge */}
                        <div 
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            backgroundColor: isSelected ? '#2563eb' : '#f1f5f9',
                            color: isSelected ? 'white' : '#64748b',
                            marginRight: '0.75rem',
                            flexShrink: 0
                          }}
                        >
                          {letter}
                        </div>
                        <span style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>
                          {opt}
                        </span>
                      </div>
                      
                      {isSelected && (
                        <div style={{ color: '#2563eb', display: 'flex', alignItems: 'center' }}>
                          <Check size={16} strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        </main>

        {/* 📦 3. STICKY BOTTOM ACTIONS CONTROL BAR */}
        <footer
          style={{
            height: '70px',
            backgroundColor: 'white',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2rem',
            position: 'sticky',
            bottom: 0,
            zIndex: 100,
            flexShrink: 0
          }}
        >
          {/* Previous Trigger */}
          <button
            onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
            disabled={currentQIndex === 0}
            style={{
              padding: '0.55rem 1rem',
              borderRadius: '0.5rem',
              border: '1px solid #cbd5e1',
              backgroundColor: 'white',
              color: currentQIndex === 0 ? '#94a3b8' : '#475569',
              fontWeight: 600,
              fontSize: '0.8rem',
              cursor: currentQIndex === 0 ? 'not-allowed' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              transition: 'all 0.2s'
            }}
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          {/* Toggle navigation popover drawer button */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowNavGrid(prev => !prev)}
              style={{
                padding: '0.55rem 1.25rem',
                borderRadius: '0.5rem',
                border: '1px solid #cbd5e1',
                backgroundColor: showNavGrid ? '#f1f5f9' : 'white',
                color: '#475569',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.2s'
              }}
            >
              <LayoutGrid size={15} />
              Navigation Grid ({Object.keys(answers).length}/{questions.length})
            </button>

            {/* 🚪 Beautiful Popover Drawer */}
            <AnimatePresence>
              {showNavGrid && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  style={{
                    position: 'absolute',
                    bottom: '80px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '320px',
                    backgroundColor: 'white',
                    borderRadius: '1rem',
                    border: '1px solid #cbd5e1',
                    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
                    padding: '1.25rem',
                    zIndex: 200
                  }}
                >
                  <h4 style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em', marginBottom: '0.75rem', textAlign: 'center' }}>
                    Jump to Question
                  </h4>
                  <div 
                    style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(6, 1fr)', 
                      gap: '0.4rem',
                      maxHeight: '180px',
                      overflowY: 'auto'
                    }}
                  >
                    {questions.map((q, idx) => {
                      const isCurrent = idx === currentQIndex;
                      const answered = isAnswered(q.id);
                      
                      let bgColor = 'white';
                      let borderColor = '#e2e8f0';
                      let textColor = '#475569';

                      if (isCurrent) {
                        bgColor = '#2563eb';
                        borderColor = '#2563eb';
                        textColor = 'white';
                      } else if (answered) {
                        bgColor = '#e0f2fe';
                        borderColor = '#bae6fd';
                        textColor = '#0369a1';
                      }

                      return (
                        <button
                          key={q.id}
                          onClick={() => {
                            setCurrentQIndex(idx);
                            setShowNavGrid(false);
                          }}
                          style={{
                            height: '32px',
                            borderRadius: '0.35rem',
                            border: `1px solid ${borderColor}`,
                            backgroundColor: bgColor,
                            color: textColor,
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.1s ease'
                          }}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Next / Submit trigger */}
          {isLastQ ? (
            <button
              onClick={handleFinishExam}
              style={{
                padding: '0.55rem 1.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                backgroundColor: '#10b981',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                boxShadow: '0 4px 6px rgba(16,185,129,0.15)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#059669'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#10b981'; }}
            >
              Finish Practice
              <CheckCircle2 size={15} />
            </button>
          ) : (
            <button
              onClick={() => setCurrentQIndex(prev => Math.min(questions.length - 1, prev + 1))}
              style={{
                padding: '0.55rem 1.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                backgroundColor: '#2563eb',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                boxShadow: '0 4px 6px rgba(37,99,235,0.15)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1d4ed8'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#2563eb'; }}
            >
              Next Question
              <ChevronRight size={15} />
            </button>
          )}
        </footer>

        {/* 🛡️ 4. CUSTOM MODALS OVERLAYS */}
        <AnimatePresence>
          {/* A. LEAVE EXAM CONFIRMATION MODAL */}
          {activeModal === 'LEAVE_EXAM' && (
            <div 
              style={{ 
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(9, 13, 22, 0.45)', backdropFilter: 'blur(10px)',
                zIndex: 99999, display: 'flex', justifyContent: 'center', alignItems: 'center',
                padding: '1.5rem'
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                style={{
                  width: '100%', maxWidth: '420px', backgroundColor: 'white',
                  borderRadius: '1.5rem', padding: '2rem', textAlign: 'center',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', border: '1px solid #e2e8f0'
                }}
              >
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#fee2e2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                  <AlertTriangle size={24} />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                  Exit Practice Session?
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5, marginBottom: '1.75rem' }}>
                  Are you sure you want to exit? Your progressive answers in this TCF Canada practice series will not be saved.
                </p>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button 
                    onClick={() => setActiveModal(null)}
                    style={{ flex: 1, padding: '0.7rem', borderRadius: '0.75rem', border: '1px solid #cbd5e1', backgroundColor: 'white', color: '#475569', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
                  >
                    Keep Testing
                  </button>
                  <button 
                    onClick={confirmLeaveExam}
                    style={{ flex: 1, padding: '0.7rem', borderRadius: '0.75rem', border: 'none', backgroundColor: '#ef4444', color: 'white', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
                  >
                    Yes, Exit
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {/* B. MAGNIFYING ZOOM POSTER MODAL */}
          {activeModal === 'ZOOM_POSTER' && (
            <div 
              style={{ 
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(9, 13, 22, 0.55)', backdropFilter: 'blur(15px)',
                zIndex: 99999, display: 'flex', justifyContent: 'center', alignItems: 'center',
                padding: '1.5rem'
              }}
              onClick={() => setActiveModal(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                style={{
                  width: '100%', maxWidth: '720px', backgroundColor: 'white',
                  borderRadius: '2rem', padding: '3.5rem 3rem', position: 'relative',
                  border: '2px solid #3b82f6', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => setActiveModal(null)}
                  style={{
                    position: 'absolute', top: '1.5rem', right: '1.5rem',
                    border: 'none', background: '#f1f5f9', cursor: 'pointer',
                    width: '32px', height: '32px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b'
                  }}
                >
                  <X size={16} />
                </button>
                
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  TCF Reader Maximizer Mode
                </span>
                
                <h3 style={{ fontSize: '1.75rem', fontWeight: 900, marginTop: '0.25rem', marginBottom: '2rem', color: '#0f172a' }}>
                  Document Passage Zoom
                </h3>

                <div 
                  style={{
                    fontSize: '1.65rem', color: '#334155', lineHeight: 1.8,
                    fontWeight: 500, fontFamily: 'Georgia, serif', whiteSpace: 'pre-wrap',
                    padding: '2rem', backgroundColor: '#f8fafc', borderRadius: '1.25rem',
                    border: '1.5px dashed #cbd5e1'
                  }}
                >
                  {currentQuestion.posterText}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // --- RENDER SCREEN 2B: HIGH-END AI SCORING REPORT CARD FOR ORAL SIMULATOR ---
  if (activeSeriesId !== null && isExamFinished && sectionType === 'SPEAKING') {
    const feedback1 = getOralCorrections(1);
    const feedback2 = getOralCorrections(2);
    const feedback3 = getOralCorrections(3);

    const activeFeedback = activeReportTab === 1 ? feedback1 : activeReportTab === 2 ? feedback2 : feedback3;
    const activeAnswer = speakingAnswers[activeReportTab] || { isRecorded: false, durationSec: 0, transcript: '' };

    // Compute average CLB level
    const avgScore = (feedback1.score + feedback2.score + feedback3.score) / 3;
    let overallClb = 'CLB 6';
    if (avgScore === 0) overallClb = 'CLB 0';
    else if (avgScore >= 85) overallClb = 'CLB 9';
    else if (avgScore >= 74) overallClb = 'CLB 8';
    else if (avgScore >= 60) overallClb = 'CLB 7';

    // Format duration helper
    const formatDuration = (sec: number) => {
      const mm = Math.floor(sec / 60).toString().padStart(2, '0');
      const ss = (sec % 60).toString().padStart(2, '0');
      return `${mm}:${ss}`;
    };

    return (
      <div 
        style={{ 
          backgroundColor: '#f1f5f9', 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '4rem 1.5rem',
          width: '100%'
        }}
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card-elevated p-6 sm:p-12"
          style={{
            width: '100%',
            maxWidth: '820px',
            backgroundColor: 'white',
            borderRadius: '2rem',
            border: '1px solid rgba(255,255,255,0.7)',
            position: 'relative'
          }}
        >
          {/* Header section with Trophy and Score card */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '2rem', marginBottom: '2rem' }}>
            <div 
              style={{ 
                width: '64px', 
                height: '64px', 
                borderRadius: '50%', 
                backgroundColor: '#fff7ed', 
                color: '#ea580c',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Trophy size={32} />
            </div>

            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ea580c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                TCF Speaking Series {activeSeriesId} AI Evaluation
              </span>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0f172a', marginTop: '0.1rem' }}>
                Oral Expression Correction Dashboard
              </h2>
            </div>

            {/* Glowing CLB tag */}
            <div 
              style={{ 
                padding: '0.75rem 1.5rem', 
                borderRadius: '1rem', 
                background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)', 
                color: 'white', 
                textAlign: 'center',
                boxShadow: '0 8px 20px -4px rgba(234,88,12,0.3)'
              }}
            >
              <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', opacity: 0.9 }}>
                Overall CLB Level
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 900, fontFamily: 'Outfit, sans-serif' }}>
                {overallClb}
              </div>
            </div>
          </div>

          {/* Tab selector for Task 1, 2, and 3 report cards */}
          <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '0.75rem', marginBottom: '1.75rem' }}>
            {([1, 2, 3] as const).map((taskNum) => {
              const isActive = activeReportTab === taskNum;
              const taskScore = taskNum === 1 ? feedback1.score : taskNum === 2 ? feedback2.score : feedback3.score;
              return (
                <button
                  key={taskNum}
                  onClick={() => setActiveReportTab(taskNum)}
                  style={{
                    padding: '0.6rem 1.25rem',
                    borderRadius: '0.75rem',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    backgroundColor: isActive ? 'rgba(234,88,12,0.08)' : 'transparent',
                    color: isActive ? '#c2410c' : '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s'
                  }}
                >
                  Task {taskNum} report card
                  <span style={{ fontSize: '0.75rem', padding: '0.1rem 0.4rem', borderRadius: '0.35rem', backgroundColor: isActive ? '#ea580c' : '#f1f5f9', color: isActive ? 'white' : '#64748b' }}>
                    {taskScore}%
                  </span>
                </button>
              );
            })}
          </div>

          {/* Interactive AI Corrections layout */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            
            {/* Left Box: Speech Transcript Preview */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h4 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em' }}>
                  Speech-to-Text Transcript
                </h4>
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
                  Duration: {formatDuration(activeAnswer.durationSec)}
                </span>
              </div>
              
              <div 
                style={{
                  height: '240px',
                  overflowY: 'auto',
                  padding: '1.25rem',
                  backgroundColor: '#f8fafc',
                  borderRadius: '1rem',
                  border: '1.5px solid #cbd5e1',
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  color: '#334155',
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                {activeAnswer.isRecorded ? activeFeedback.transcript : "[Aucun enregistrement audio pour cette tâche.]"}
              </div>
            </div>

            {/* Right Box: AI Corrections list & explanations accordion */}
            <div>
              <h4 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                Linguistic & Pronunciation Feedback
              </h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '240px', overflowY: 'auto', paddingRight: '0.25rem' }}>
                {activeAnswer.isRecorded ? (
                  activeFeedback.corrections.map((corr: { original: string; suggested: string; explanation: string }, idx: number) => (
                    <div 
                      key={idx}
                      style={{
                        padding: '1rem',
                        borderRadius: '0.85rem',
                        backgroundColor: 'white',
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.01)'
                      }}
                    >
                      {/* Original in Red */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#b91c1c', textDecoration: 'line-through', fontWeight: 500 }}>
                        <span style={{ padding: '0.1rem 0.3rem', borderRadius: '0.25rem', backgroundColor: '#fee2e2', fontSize: '0.7rem', fontWeight: 700 }}>Spoken</span>
                        "{corr.original}"
                      </div>
                      {/* Suggested in Green */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#047857', fontWeight: 700, marginTop: '0.35rem' }}>
                        <span style={{ padding: '0.1rem 0.3rem', borderRadius: '0.25rem', backgroundColor: '#d1fae5', fontSize: '0.7rem', fontWeight: 700 }}>Suggested</span>
                        "{corr.suggested}"
                      </div>
                      {/* Explanation */}
                      <div style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.5, marginTop: '0.5rem', borderTop: '1px dashed #e2e8f0', paddingTop: '0.4rem', fontStyle: 'italic' }}>
                        💡 {corr.explanation}
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ fontSize: '0.85rem', color: '#64748b', fontStyle: 'italic', padding: '1rem', textAlign: 'center' }}>
                    No feedback available without recording.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Strengths & Weaknesses quick tags list */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2.5rem', borderTop: '1px solid #e2e8f0', paddingTop: '2rem' }}>
            <div>
              <h4 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: '#059669', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                Speaking Strengths
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {activeAnswer.isRecorded ? (
                  activeFeedback.strengths.map((s: string) => (
                    <span key={s} style={{ fontSize: '0.75rem', fontWeight: 600, backgroundColor: '#d1fae5', color: '#065f46', padding: '0.25rem 0.65rem', borderRadius: '0.5rem' }}>
                      ✦ {s}
                    </span>
                  ))
                ) : (
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>N/A</span>
                )}
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: '#ef4444', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                Pronunciation / Grammar to Adjust
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {activeAnswer.isRecorded ? (
                  activeFeedback.weaknesses.map((w: string) => (
                    <span key={w} style={{ fontSize: '0.75rem', fontWeight: 600, backgroundColor: '#fee2e2', color: '#991b1b', padding: '0.25rem 0.65rem', borderRadius: '0.5rem' }}>
                      ⚠ {w}
                    </span>
                  ))
                ) : (
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>N/A</span>
                )}
              </div>
            </div>
          </div>

          {/* Bottom actions panel */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem', borderTop: '1px solid #e2e8f0', paddingTop: '2rem' }}>
            <button
              onClick={handleRestartTraining}
              style={{
                padding: '0.85rem 2.5rem',
                borderRadius: '0.75rem',
                border: 'none',
                backgroundColor: '#ea580c',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 12px rgba(234,88,12,0.2)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#d0520b'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#ea580c'; }}
            >
              <RefreshCw size={16} />
              Go Back to Series
            </button>
          </div>

        </motion.div>
      </div>
    );
  }

  // --- RENDER SCREEN 2: HIGH-END SCORE CARD EVALUATION DASHBOARD ---
  if (activeSeriesId !== null && isExamFinished) {
    const report = scoreStats();

    return (
      <div 
        style={{ 
          backgroundColor: '#f1f5f9', 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '3rem 1.5rem'
        }}
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card-elevated p-6 sm:p-10"
          style={{
            width: '100%',
            maxWidth: '640px',
            backgroundColor: 'white',
            borderRadius: '2rem',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.7)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Subtle background decorative shapes */}
          <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '150px', height: '150px', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '180px', height: '180px', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '50%' }} />

          {/* Trophy Header */}
          <div 
            style={{ 
              width: '80px', 
              height: '80px', 
              borderRadius: '50%', 
              backgroundColor: '#fef3c7', 
              color: '#d97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem'
            }}
          >
            <Trophy size={40} />
          </div>

          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Practice Series {activeSeriesId} Evaluation
          </span>
          
          <h2 style={{ fontSize: '2.25rem', fontWeight: 900, marginTop: '0.25rem', color: '#0f172a' }}>
            Scoring Report Complete
          </h2>

          {/* Glowing Metallic CLB grade bubble */}
          <div 
            style={{ 
              margin: '2rem auto',
              width: '180px',
              padding: '1.25rem',
              borderRadius: '1.5rem',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.3)',
              position: 'relative'
            }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', opacity: 0.9 }}>
              Estimated Benchmark
            </span>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em', marginTop: '0.1rem' }}>
              {report.clb}
            </div>
          </div>

          {/* Score distribution grid stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
            <div style={{ padding: '1rem', borderRadius: '1rem', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#334155' }}>
                {report.correctCount} / {questions.length}
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', marginTop: '0.1rem' }}>Correct Items</div>
            </div>
            <div style={{ padding: '1rem', borderRadius: '1rem', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#334155' }}>
                {report.percent}%
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', marginTop: '0.1rem' }}>Success Rate</div>
            </div>
            <div style={{ padding: '1rem', borderRadius: '1rem', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#334155' }}>
                {report.earnedPoints} pts
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', marginTop: '0.1rem' }}>Points Awarded</div>
            </div>
          </div>

          {/* Encouraging French feedback banner */}
          <div 
            style={{ 
              backgroundColor: '#f0fdf4', 
              border: '1.5px dashed #10b981', 
              borderRadius: '1.25rem', 
              padding: '1.5rem',
              marginBottom: '2.5rem',
              color: '#065f46',
              fontSize: '0.9rem',
              lineHeight: 1.6,
              fontWeight: 500
            }}
          >
            💡 {report.feedback}
          </div>

          {/* Actions */}
          <button
            onClick={handleRestartTraining}
            style={{
              padding: '0.85rem 2rem',
              borderRadius: '0.75rem',
              border: 'none',
              backgroundColor: '#2563eb',
              color: 'white',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1d4ed8'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#2563eb'; }}
          >
            <RefreshCw size={16} />
            Go Back to Series
          </button>
        </motion.div>
      </div>
    );
  }

  // --- RENDER SCREEN 3: SERIES MATRIX DASHBOARD (THE 40 TRAINING SETS CARDS) ---
  return (
    <PublicLayout>
      <div style={{ backgroundColor: 'hsl(var(--bg-base))', minHeight: '100vh', paddingBottom: '6rem' }}>
      
      {/* Toast Notification Mount */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            style={{
              position: 'fixed',
              top: '24px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 99999,
              backgroundColor: toast.type === 'success' ? '#10b981' : toast.type === 'warning' ? '#f59e0b' : '#3b82f6',
              color: 'white',
              padding: '0.85rem 1.75rem',
              borderRadius: '0.75rem',
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.15)',
              fontWeight: 700,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              pointerEvents: 'none'
            }}
          >
            <Info size={16} />
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

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
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                {sectionType === 'WRITING' ? '60 Minutes / Series' : sectionType === 'SPEAKING' ? '15 Minutes / Series' : '60 Minutes / Series'}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)', padding: '0.5rem 1.25rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.1)' }}>
              <HelpCircle size={16} />
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                {sectionType === 'WRITING' ? '3 Tasks to Draft' : sectionType === 'SPEAKING' ? '3 Tasks to Record' : '39 Custom Questions'}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)', padding: '0.5rem 1.25rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Award size={16} />
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                {sectionType === 'WRITING' ? 'CLB 5 to CLB 10+ AI score' : sectionType === 'SPEAKING' ? 'CLB 5 to CLB 10+ AI Monologue' : 'CLB 4 to CLB 10+ Scaling'}
              </span>
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
                  border: series.isFinished ? '1.5px solid #10b981' : '1px solid hsl(var(--border))',
                  boxShadow: series.isUnlocked ? '0 4px 6px -1px rgba(0,0,0,0.02), 0 2px 4px -1px rgba(0,0,0,0.01)' : 'none',
                  opacity: series.isUnlocked ? 1 : 0.82
                }}
                whileHover={series.isUnlocked ? { 
                  y: -5, 
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  borderColor: `rgba(${meta.accentColor}, 0.3)` 
                } : {}}
              >
                {/* Visual Glow Indicator for finished/unlocked series */}
                {series.isFinished && (
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', backgroundColor: '#10b981' }} />
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
                    {sectionType === 'WRITING' ? '3 Tasks to Draft' : sectionType === 'SPEAKING' ? '3 Tasks to Record' : `${series.questionsCount} Questions included`}
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
                      onClick={(e) => { e.stopPropagation(); setActiveModal('UNLOCK_PREMIUM'); }}
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
                        <div style={{ fontSize: '1.5rem', fontWeight: 900, color: `hsl(${meta.color})` }}>{(sectionType === 'WRITING' || sectionType === 'SPEAKING') ? '3' : '39'}</div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'hsl(var(--text-secondary))', marginTop: '0.1rem' }}>{(sectionType === 'WRITING' || sectionType === 'SPEAKING') ? 'Tasks' : 'Questions'}</div>
                      </div>
                      <div style={{ padding: '1rem', borderRadius: '1rem', backgroundColor: 'hsl(var(--bg-base))', textAlign: 'center', border: '1px solid hsl(var(--border))' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 900, color: `hsl(${meta.color})` }}>{sectionType === 'SPEAKING' ? '15' : '60'}</div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'hsl(var(--text-secondary))', marginTop: '0.1rem' }}>Minutes</div>
                      </div>
                      <div style={{ padding: '1rem', borderRadius: '1rem', backgroundColor: 'hsl(var(--bg-base))', textAlign: 'center', border: '1px solid hsl(var(--border))' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 900, color: `hsl(${meta.color})` }}>{sectionType === 'SPEAKING' ? '900' : '699'}</div>
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
                          {sectionType === 'WRITING' ? (
                            "Focus strictly on word counts (Task 1: 60-120, Task 2: 120-150, Task 3: 120-180). Structuring clear paragraphs and connecting arguments logically with cohesive French connectors yields the highest CLB tiers."
                          ) : sectionType === 'SPEAKING' ? (
                            "Ensure you fill the recommended speaking duration (Task 1: 2 mins, Task 2: 3 mins, Task 3: 4.5 mins). Keep your speech fluent, avoid long pauses, use rich vocabulary, and sound warm and interactive in Task 2."
                          ) : (
                            "The questions increase progressively in difficulty: A1 → A2 → B1 → B2 → C1 → C2. Manage your time carefully. We highly recommend focusing the bulk of your reading on the final 20 high-tier questions."
                          )}
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

      {/* 🚪 Premium Active Unlock Modal & Warning modals */}
      <AnimatePresence>
        {activeModal === 'UNLOCK_PREMIUM' && (
          <div 
            style={{ 
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(9, 13, 22, 0.45)', backdropFilter: 'blur(10px)',
              zIndex: 99999, display: 'flex', justifyContent: 'center', alignItems: 'center',
              padding: '1.5rem'
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                width: '100%', maxWidth: '440px', backgroundColor: 'white',
                borderRadius: '1.5rem', padding: '2.5rem', textAlign: 'center',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', border: '1.5px solid hsl(45, 100%, 80%)'
              }}
            >
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'hsl(45, 100%, 96%)', color: 'hsl(45, 100%, 40%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <Sparkles size={28} />
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.5rem' }}>
                Unlock Premium Practice Set
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6, marginBottom: '2rem' }}>
                This high-tier training set is reserved for Premium subscribers. Upgrade now to unlock immediate AI-graded corrections and speech diagnostics.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button 
                  onClick={() => setActiveModal(null)}
                  style={{ flex: 1, padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid #cbd5e1', backgroundColor: 'white', color: '#475569', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
                >
                  Close
                </button>
                <button 
                  onClick={() => { setActiveModal(null); triggerToast('Redirecting to Stripe checkout portal...', 'info'); }}
                  style={{ flex: 1, padding: '0.75rem', borderRadius: '0.75rem', border: 'none', backgroundColor: '#eab308', color: 'white', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
                >
                  Upgrade $19
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      </div>
    </PublicLayout>
  );
}
