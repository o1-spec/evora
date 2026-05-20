'use client';

import { useState, useRef, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Send, Mic, MicOff, Loader2, Volume2 } from 'lucide-react';
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
        <div style={{ width: 48, height: 48, borderRadius: 14, background: 'linear-gradient(135deg, hsl(250,95%,64%), hsl(162,82%,50%))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Brain size={24} color="white" />
        </div>
        <div>
          <h1 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.5rem', fontWeight: 800 }}>Tuteur Évora IA</h1>
          <p style={{ color: 'hsl(220,12%,55%)', fontSize: '0.85rem' }}>Votre assistant personnel 24/7 · Posez n'importe quelle question</p>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <span className={`badge ${isLoading ? 'badge-warning' : 'badge-accent'}`}>
            {isLoading ? '● Réflexion...' : '● En ligne'}
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
                <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg, hsl(250,95%,64%), hsl(162,82%,50%))', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '0.625rem', flexShrink: 0, marginTop: 4 }}>
                  <Brain size={14} color="white" />
                </div>
              )}
              <div style={{
                maxWidth: '80%', padding: '0.875rem 1.125rem', borderRadius: msg.role === 'user' ? '1rem 1rem 0.25rem 1rem' : '1rem 1rem 1rem 0.25rem',
                background: msg.role === 'user' ? 'linear-gradient(135deg, hsl(250,95%,64%), hsl(248,87%,55%))' : 'rgba(255,255,255,0.06)',
                border: msg.role === 'user' ? 'none' : '1px solid rgba(255,255,255,0.08)',
                fontSize: '0.9rem', lineHeight: 1.75, whiteSpace: 'pre-wrap',
                color: msg.role === 'user' ? 'white' : 'hsl(220,12%,80%)',
              }}>
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg, hsl(250,95%,64%), hsl(162,82%,50%))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Brain size={14} color="white" />
            </div>
            <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem 1rem 1rem 0.25rem', padding: '0.875rem 1.125rem' }}>
              <Loader2 size={18} style={{ animation: 'spin 1s linear infinite', color: 'hsl(250,95%,64%)' }} />
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="glass" style={{ padding: '0.875rem 1rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-end', flexShrink: 0 }}>
        <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
          placeholder="Posez votre question en français... (Entrée pour envoyer)"
          rows={2} style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', resize: 'none', color: 'hsl(220,18%,92%)', fontSize: '0.9rem', fontFamily: 'Inter,sans-serif', lineHeight: 1.6 }} />

        <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
          <button id="mic-btn" onClick={toggleRecording} title="Enregistrer votre voix"
            style={{ width: 40, height: 40, borderRadius: '50%', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: isRecording ? 'hsla(0,84%,60%,0.2)' : 'rgba(255,255,255,0.07)', color: isRecording ? 'hsl(0,84%,65%)' : 'hsl(220,12%,60%)', transition: 'all 0.2s', flexShrink: 0 }}>
            {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
          </button>
          <button id="send-btn" onClick={sendMessage} disabled={!input.trim() || isLoading}
            style={{ width: 40, height: 40, borderRadius: '50%', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: input.trim() ? 'hsl(250,95%,64%)' : 'rgba(255,255,255,0.06)', color: 'white', transition: 'all 0.2s', flexShrink: 0 }}>
            <Send size={17} />
          </button>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
