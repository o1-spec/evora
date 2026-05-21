"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, Mail, Phone, ArrowRight, X, Send, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const QUICK_REPLIES = [
  { text: "📋 Quel est le format du TCF ?", key: "format" },
  { text: "💰 Quels sont vos tarifs ?", key: "tarifs" },
  { text: "🇨🇦 Comment valider le CLB 7 ?", key: "clb" }
];

export default function ContactCTA() {
  // Contact section fields
  const [showBubble, setShowBubble] = useState(true);
  
  // Chatbot state fields
  const [chatOpen, setChatOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial",
      text: "Bonjour ! Je suis l'assistant intelligent d'Évora. Je suis ravi de vous accompagner dans votre préparation au TCF Canada / Québec. Comment puis-je vous aider aujourd'hui ?",
      isUser: false,
      timestamp: new Date()
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll messages to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/33600000000?text=Bonjour,%20je%20souhaite%20en%20savoir%20plus%20sur%20les%20préparations%20au%20TCF%20Canada.", "_blank");
  };

  // AI Response generator logic
  const triggerAIResponse = (userText: string) => {
    setIsTyping(true);
    
    // Simulate real AI typing delay
    setTimeout(() => {
      let reply = "";
      const text = userText.toLowerCase();

      if (text.includes("format") || text.includes("examen") || text.includes("épreuve") || text.includes("déroule")) {
        reply = "Le TCF Canada comprend 4 épreuves obligatoires :\n\n" +
                "1. **Compréhension Orale** : 39 questions (35 min)\n" +
                "2. **Compréhension Écrite** : 39 questions (60 min)\n" +
                "3. **Expression Écrite** : 3 tâches (60 min) avec correction IA\n" +
                "4. **Expression Orale** : 3 tâches (12 min) avec entraînement audio\n\n" +
                "Notre simulateur vous prépare exactement dans ces conditions réelles !";
      } else if (text.includes("tarif") || text.includes("prix") || text.includes("gratuit") || text.includes("payer") || text.includes("forfait")) {
        reply = "Évora propose 3 formules transparentes pour tous les profils :\n\n" +
                "• **Gratuit (0€)** : Accès A1-A2, 1 test blanc TCF complet, 5 corrections d'Expression Écrite IA/mois.\n" +
                "• **Premium (29€/mois)** : Accès A1-C2, 10 tests blancs, 100 corrections d'essais IA, analyse vocale d'Expression Orale.\n" +
                "• **Pro (59€/mois)** : Tests & corrections par IA illimités, support tuteur 24/7, plus 1 révision mensuelle 1-on-1 (30 min) avec un enseignant expert.";
      } else if (text.includes("clb") || text.includes("canada") || text.includes("immigration") || text.includes("score") || text.includes("point")) {
        reply = "Pour l'Immigration Canada (Express Entry), obtenir un **CLB 7 (Niveau B2)** dans les 4 épreuves est le seuil clé pour débloquer le maximum de points bonus de bilinguisme.\n\n" +
                "Notre plateforme évalue constamment votre score CLB estimé et notre académie cible précisément les tournures requises pour valider ce palier rapidement.";
      } else if (text.includes("conseiller") || text.includes("tuteur") || text.includes("prof") || text.includes("contact") || text.includes("humain")) {
        reply = "Vous pouvez échanger à tout moment avec un conseiller humain par email à **contact@evora-tcf.com** ou par téléphone au support gratuit. Nos abonnés Pro bénéficient également d'un suivi direct via WhatsApp.";
      } else {
        reply = "C'est une très bonne question ! Pour vous donner le conseil le plus précis, je vous invite à créer un compte gratuit sur Évora et à passer notre premier test d'évaluation. Vous pouvez également nous écrire à **contact@evora-tcf.com**.";
      }

      setMessages(prev => [
        ...prev,
        {
          id: Math.random().toString(),
          text: reply,
          isUser: false,
          timestamp: new Date()
        }
      ]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      text: text,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setShowBubble(false); // Hide promo bubble if talking

    // Trigger reply
    triggerAIResponse(text);
  };

  // Simple markdown renderer for bold text
  const formatMessageText = (text: string) => {
    const parts = text.split(/\*\*([^*]+)\*\*/g);
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <strong key={index} style={{ fontWeight: 700 }}>{part}</strong>;
      }
      return part;
    });
  };

  return (
    <>
      {/* Contact Channels Section */}
      <section id="contact" className="py-16 md:py-20" style={{ backgroundColor: "#ffffff", borderTop: "1px solid hsl(var(--border))" }}>
        <div className="container-max" style={{ maxWidth: "1000px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "3rem",
              alignItems: "center",
            }}
          >
            {/* Left Column: Contact context */}
            <div>
              <span
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: "hsl(var(--primary))",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                UN CONSEILLER À VOTRE ÉCOUTE
              </span>
              <h2
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 2.25rem)",
                  marginTop: "0.5rem",
                  marginBottom: "1.25rem",
                  lineHeight: 1.2,
                }}
              >
                Besoin d'aide pour choisir votre formation ?
              </h2>
              <p
                style={{
                  fontSize: "1rem",
                  color: "hsl(var(--text-secondary))",
                  lineHeight: 1.6,
                  marginBottom: "2rem",
                }}
              >
                Nos conseillers pédagogiques vous accompagnent pour définir le meilleur parcours de révision selon votre niveau actuel et vos objectifs d'immigration express au Canada.
              </p>

              {/* Contact Channels */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      backgroundColor: "rgba(16, 185, 129, 0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MessageSquare size={20} color="#10b981" />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.8rem", color: "hsl(var(--text-secondary))", fontWeight: 500 }}>WhatsApp Direct</div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "hsl(var(--text-primary))" }}>+33 6 00 00 00 00</div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      backgroundColor: "rgba(59, 130, 246, 0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Mail size={20} color="hsl(var(--primary))" />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.8rem", color: "hsl(var(--text-secondary))", fontWeight: 500 }}>Email de support</div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "hsl(var(--text-primary))" }}>contact@evora-tcf.com</div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      backgroundColor: "rgba(100, 116, 139, 0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Phone size={20} color="hsl(var(--text-secondary))" />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.8rem", color: "hsl(var(--text-secondary))", fontWeight: 500 }}>Appel gratuit</div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "hsl(var(--text-primary))" }}>Lun - Ven, 9h à 18h</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: CTA Box */}
            <div
              style={{
                backgroundColor: "hsl(var(--bg-base))",
                borderRadius: "1.25rem",
                padding: "2.5rem 2rem",
                border: "1px solid hsl(var(--border))",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  backgroundColor: "hsl(var(--primary))",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem",
                  boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.3)",
                }}
              >
                <MessageSquare size={30} fill="white" color="white" />
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "0.75rem", color: "hsl(var(--text-primary))" }}>
                Posez vos questions en direct
              </h3>
              <p style={{ fontSize: "0.9rem", color: "hsl(var(--text-secondary))", lineHeight: 1.5, marginBottom: "2rem" }}>
                Discutez instantanément avec notre assistant virtuel ou lancez une discussion WhatsApp avec nos conseillers pédagogiques.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <button
                  onClick={() => setChatOpen(true)}
                  style={{
                    width: "100%",
                    padding: "0.9rem 1.5rem",
                    borderRadius: "0.75rem",
                    backgroundColor: "hsl(var(--primary))",
                    color: "white",
                    border: "none",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    boxShadow: "0 4px 6px -1px rgba(59, 130, 246, 0.2)",
                    transition: "background-color 0.2s",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "hsl(var(--primary-hover))")}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "hsl(var(--primary))")}
                >
                  Ouvrir le Chatbot IA
                  <ArrowRight size={18} />
                </button>

                <button
                  onClick={handleWhatsAppClick}
                  style={{
                    width: "100%",
                    padding: "0.85rem 1.5rem",
                    borderRadius: "0.75rem",
                    backgroundColor: "white",
                    color: "#25D366",
                    border: "1px solid #25D366",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    transition: "all 0.2s",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(37, 211, 102, 0.04)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                  }}
                >
                  Contacter via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Interactive Chatbot Box (Bottom Right) */}
      <div
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          zIndex: 100,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "0.5rem",
        }}
      >
        <AnimatePresence>
          {/* Chat Window Panel */}
          {chatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{
                width: "clamp(300px, 92vw, 380px)",
                height: "clamp(400px, 70vh, 520px)",
                maxHeight: "85vh",
                backgroundColor: "white",
                borderRadius: "1.25rem",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.08)",
                border: "1px solid hsl(var(--border))",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              {/* Chat Header */}
              <div
                style={{
                  padding: "1rem 1.25rem",
                  backgroundColor: "hsl(var(--primary))",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MessageSquare size={18} fill="white" color="white" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: "0.95rem", lineHeight: 1.2 }}>Évora Assistant</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.8)" }}>
                      <motion.span
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: "#10b981",
                          display: "inline-block",
                          boxShadow: "0 0 8px #10b981",
                        }}
                      />
                      En ligne • Tuteur IA
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setChatOpen(false)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "white",
                    padding: "0.25rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Chat Messages Log */}
              <div
                style={{
                  flex: 1,
                  padding: "1.25rem",
                  overflowY: "auto",
                  backgroundColor: "#f8fafc",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    style={{
                      display: "flex",
                      justifyContent: msg.isUser ? "flex-end" : "flex-start",
                      alignItems: "flex-end",
                      gap: "0.5rem",
                    }}
                  >
                    {/* Assistant Avatar */}
                    {!msg.isUser && (
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          backgroundColor: "rgba(59, 130, 246, 0.1)",
                          color: "hsl(var(--primary))",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        AI
                      </div>
                    )}

                    <div
                      style={{
                        maxWidth: "75%",
                        padding: "0.75rem 1rem",
                        borderRadius: msg.isUser ? "1rem 1rem 0 1rem" : "1rem 1rem 1rem 0",
                        backgroundColor: msg.isUser ? "hsl(var(--primary))" : "white",
                        color: msg.isUser ? "white" : "hsl(var(--text-primary))",
                        fontSize: "0.85rem",
                        lineHeight: 1.5,
                        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                        border: msg.isUser ? "none" : "1px solid hsl(var(--border))",
                        whiteSpace: "pre-line" // Renders formatting beautifully
                      }}
                    >
                      {formatMessageText(msg.text)}
                    </div>
                  </div>
                ))}

                {/* Animated Typing Indicator */}
                {isTyping && (
                  <div style={{ display: "flex", alignItems: "flex-end", gap: "0.5rem" }}>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                        color: "hsl(var(--primary))",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      AI
                    </div>
                    <div
                      style={{
                        padding: "0.75rem 1.25rem",
                        borderRadius: "1rem 1rem 1rem 0",
                        backgroundColor: "white",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                        border: "1px solid hsl(var(--border))",
                        display: "flex",
                        gap: "4px",
                        alignItems: "center",
                      }}
                    >
                      <motion.span
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                        style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "hsl(var(--text-muted))" }}
                      />
                      <motion.span
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.15 }}
                        style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "hsl(var(--text-muted))" }}
                      />
                      <motion.span
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.3 }}
                        style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "hsl(var(--text-muted))" }}
                      />
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Quick Replies Chips */}
              <div
                style={{
                  padding: "0.5rem 0.75rem",
                  backgroundColor: "#f1f5f9",
                  borderTop: "1px solid hsl(var(--border))",
                  display: "flex",
                  gap: "0.5rem",
                  overflowX: "auto",
                  whiteSpace: "nowrap",
                }}
                className="hide-scrollbar"
              >
                {QUICK_REPLIES.map(chip => (
                  <button
                    key={chip.key}
                    onClick={() => handleSendMessage(chip.text)}
                    disabled={isTyping}
                    style={{
                      padding: "0.35rem 0.75rem",
                      borderRadius: "9999px",
                      backgroundColor: "white",
                      border: "1px solid hsl(var(--border))",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "hsl(var(--text-secondary))",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseOver={(e) => {
                      if (!isTyping) {
                        e.currentTarget.style.borderColor = "hsl(var(--primary))";
                        e.currentTarget.style.color = "hsl(var(--primary))";
                      }
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = "hsl(var(--border))";
                      e.currentTarget.style.color = "hsl(var(--text-secondary))";
                    }}
                  >
                    {chip.text}
                  </button>
                ))}
              </div>

              {/* Chat Input Bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputValue);
                }}
                style={{
                  padding: "0.75rem 1rem",
                  borderTop: "1px solid hsl(var(--border))",
                  display: "flex",
                  gap: "0.5rem",
                  alignItems: "center",
                  backgroundColor: "white",
                }}
              >
                <input
                  type="text"
                  placeholder="Posez votre question..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isTyping}
                  style={{
                    flex: 1,
                    padding: "0.5rem 0.85rem",
                    borderRadius: "9999px",
                    border: "1px solid hsl(var(--border))",
                    fontSize: "0.85rem",
                    outline: "none",
                  }}
                />
                <button
                  type="submit"
                  disabled={isTyping || !inputValue.trim()}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    backgroundColor: inputValue.trim() && !isTyping ? "hsl(var(--primary))" : "hsl(var(--border))",
                    border: "none",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: inputValue.trim() && !isTyping ? "pointer" : "default",
                  }}
                >
                  <Send size={14} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Promo tips bubble */}
        <AnimatePresence>
          {showBubble && !chatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              onClick={() => {
                setChatOpen(true);
                setShowBubble(false);
              }}
              style={{
                backgroundColor: "white",
                borderRadius: "1rem",
                padding: "0.85rem 1.25rem",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
                border: "1px solid hsl(var(--border))",
                position: "relative",
                maxWidth: "260px",
                cursor: "pointer",
              }}
            >
              {/* Close tip */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowBubble(false);
                }}
                style={{
                  position: "absolute",
                  top: "0.35rem",
                  right: "0.35rem",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "hsl(var(--text-muted))",
                  padding: "0.15rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X size={12} />
              </button>

              {/* Bubble Text */}
              <div style={{ paddingRight: "0.5rem" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "hsl(var(--primary))", textTransform: "uppercase", display: "block", marginBottom: "0.15rem" }}>
                  ASSISTANT EN LIGNE
                </span>
                <p style={{ fontSize: "0.85rem", color: "hsl(var(--text-primary))", margin: 0, fontWeight: 500, lineHeight: 1.4 }}>
                  Bonjour ! Je suis votre tuteur virtuel. Cliquez ici pour me poser vos questions !
                </p>
              </div>

              {/* Speech bubble arrow */}
              <div
                style={{
                  position: "absolute",
                  bottom: "-6px",
                  right: "20px",
                  width: "12px",
                  height: "12px",
                  backgroundColor: "white",
                  borderRight: "1px solid hsl(var(--border))",
                  borderBottom: "1px solid hsl(var(--border))",
                  transform: "rotate(45deg)",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Chatbot Bubble Toggle Button */}
        <motion.button
          onClick={() => {
            setChatOpen(!chatOpen);
            setShowBubble(false);
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            backgroundColor: "hsl(var(--primary))",
            border: "none",
            color: "white",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.3), 0 4px 6px -2px rgba(59, 130, 246, 0.05)",
            outline: "none",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={chatOpen ? "close" : "chat"}
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.15 }}
              style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              {chatOpen ? (
                <X size={26} color="white" />
              ) : (
                <MessageSquare size={26} fill="white" color="white" />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}
