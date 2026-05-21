'use client';

import { useState, useRef, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Send, Mic, MicOff, Loader2 } from 'lucide-react';
import api from '@/lib/api';
import { useAuthStore } from '@/store/useAuthStore';

interface Message { role: 'user' | 'assistant'; content: string; }

export default function TutorPage() {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Bonjour ! 👋 Je suis **Évora IA**, votre tuteur de français personnel.\n\nJe peux vous aider à :\n• Corriger votre grammaire et orthographe\n• Expliquer des règles de conjugaison\n• Préparer votre examen TCF Canada\n• Répondre à toutes vos questions en français\n\nQue voulez-vous travailler aujourd'hui ?" },
  ]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const chatMutation = useMutation({
    mutationFn: (message: string) =>
      api.post('/ai/tutor-chat', {
        message,
        chatHistory: messages.slice(-10).map(m => ({ role: m.role, content: m.content })),
      }).then(r => r.data.reply),
    onSuccess: (reply) => {
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    },
  });

  const speakMutation = useMutation({
    mutationFn: (formData: FormData) =>
      api.post('/ai/evaluate-speech', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data),
    onSuccess: (data) => {
      const msg = `📝 **Transcription** : "${data.transcript}"\n\n🎯 **Score** : ${data.evaluation?.overallScore}/100 · ${data.evaluation?.clbLevel}\n\n✅ **Points forts** : ${data.evaluation?.strengths?.join(', ')}\n\n⚠️ **À améliorer** : ${data.evaluation?.weaknesses?.join(', ')}`;
      setMessages(prev => [...prev, { role: 'assistant', content: msg }]);
    },
  });

  const sendMessage = async () => {
    if (!input.trim()) return;
    const text = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    chatMutation.mutate(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const toggleRecording = async () => {
    if (isRecording) {
      mediaRef.current?.stop();
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        chunksRef.current = [];
        const recorder = new MediaRecorder(stream);
        mediaRef.current = recorder;
        recorder.ondataavailable = e => chunksRef.current.push(e.data);
        recorder.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
          const formData = new FormData();
          formData.append('audio', blob, 'recording.webm');
          formData.append('taskInstruction', 'Exercice de prononciation libre avec le tuteur Évora IA.');
          setMessages(prev => [...prev, { role: 'user', content: '🎤 [Enregistrement vocal envoyé pour évaluation...]' }]);
          speakMutation.mutate(formData);
          stream.getTracks().forEach(t => t.stop());
        };
        recorder.start();
        setIsRecording(true);
      } catch {
        alert('Accès au microphone refusé. Veuillez autoriser l\'accès dans les paramètres de votre navigateur.');
      }
    }
  };

  const isLoading = chatMutation.isPending || speakMutation.isPending;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 5rem)', maxWidth: 780, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexShrink: 0 }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: 'hsl(var(--primary))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Brain size={24} color="white" />
        </div>
        <div>
          <h1 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.5rem', fontWeight: 800 }}>Évora AI Tutor</h1>
          <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.85rem' }}>Your personal 24/7 assistant · Ask any question</p>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <span className={`badge ${isLoading ? 'badge-secondary' : 'badge-primary'}`} style={{ backgroundColor: isLoading ? 'transparent' : undefined }}>
            {isLoading ? '● Thinking...' : '● Online'}
          </span>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', paddingRight: '0.25rem', marginBottom: '1rem' }}>
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
              style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              {msg.role === 'assistant' && (
                <div style={{ width: 30, height: 30, borderRadius: '50%', backgroundColor: 'hsl(var(--primary))', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '0.625rem', flexShrink: 0, marginTop: 4 }}>
                  <Brain size={14} color="white" />
                </div>
              )}
              <div style={{
                maxWidth: '80%', padding: '0.875rem 1.125rem', borderRadius: msg.role === 'user' ? '1rem 1rem 0.25rem 1rem' : '1rem 1rem 1rem 0.25rem',
                backgroundColor: msg.role === 'user' ? 'hsl(var(--primary))' : 'white',
                border: msg.role === 'user' ? 'none' : '1px solid hsl(var(--border))',
                fontSize: '0.9rem', lineHeight: 1.75, whiteSpace: 'pre-wrap',
                color: msg.role === 'user' ? 'white' : 'hsl(var(--text-primary))',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              }}>
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <div style={{ width: 30, height: 30, borderRadius: '50%', backgroundColor: 'hsl(var(--primary))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Brain size={14} color="white" />
            </div>
            <div style={{ backgroundColor: 'white', border: '1px solid hsl(var(--border))', borderRadius: '1rem 1rem 1rem 0.25rem', padding: '0.875rem 1.125rem', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              <Loader2 size={18} className="animate-spin" style={{ color: 'hsl(var(--primary))' }} />
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="card" style={{ padding: '0.875rem 1rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-end', flexShrink: 0, backgroundColor: 'white' }}>
        <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
          placeholder="Ask a question in French... (Enter to send)"
          rows={2} style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', resize: 'none', color: 'hsl(var(--text-primary))', fontSize: '0.95rem', fontFamily: 'Inter,sans-serif', lineHeight: 1.6 }} />

        <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
          <button id="mic-btn" onClick={toggleRecording} title="Enregistrer votre voix"
            style={{ width: 40, height: 40, borderRadius: '50%', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: isRecording ? 'hsla(0, 84%, 60%, 0.1)' : 'hsl(var(--bg-base))', color: isRecording ? 'hsl(0, 84%, 60%)' : 'hsl(var(--text-secondary))', transition: 'all 0.2s', flexShrink: 0 }}>
            {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
          </button>
          <button id="send-btn" onClick={sendMessage} disabled={!input.trim() || isLoading}
            style={{ width: 40, height: 40, borderRadius: '50%', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: input.trim() ? 'hsl(var(--primary))' : 'hsl(var(--bg-base))', color: input.trim() ? 'white' : 'hsl(var(--text-muted))', transition: 'all 0.2s', flexShrink: 0 }}>
            <Send size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}
