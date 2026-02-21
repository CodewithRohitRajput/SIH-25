"use client";

import { useState, useRef, useEffect } from "react";
import Header from '@/(components)/header/page';
import Footer from '@/(components)/footer/page';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
  isError?: boolean;
}

const SUGGESTIONS = [
  "What are current military protocols?",
  "How do I submit a field report?",
  "Explain communication procedures",
  "What risks should I report?",
];

export default function ChatBot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMessages([{
      text: "TACTICAL AI ONLINE.\n\nI am VAJRA — your secure military intelligence assistant. All communications are encrypted. How can I assist with your operational query?",
      isUser: false,
      timestamp: new Date()
    }]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage: Message = { text: trimmed, isUser: true, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setInput("");

    try {
      const res = await fetch("https://bbs11pr8-5002.inc1.devtunnels.ms/gemini/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ question: trimmed }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessages(prev => [...prev, { text: data.answer, isUser: false, timestamp: new Date() }]);
      } else {
        setMessages(prev => [...prev, {
          text: data.message || "Command failed. Please retry.",
          isUser: false, timestamp: new Date(), isError: true
        }]);
      }
    } catch {
      setMessages(prev => [...prev, {
        text: "SIGNAL LOST. Unable to reach VAJRA AI service. Check connection and retry.",
        isUser: false, timestamp: new Date(), isError: true
      }]);
    }
    setLoading(false);
    inputRef.current?.focus();
  };

  const clearChat = () => {
    setMessages([{
      text: "TACTICAL AI ONLINE.\n\nI am VAJRA — your secure military intelligence assistant. All communications are encrypted. How can I assist with your operational query?",
      isUser: false,
      timestamp: new Date()
    }]);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&family=Exo+2:wght@300;400;600;800&display=swap');

        :root {
          --cyan: #00e5ff;
          --cyan-dim: #00b8cc;
          --cyan-glow: rgba(0,229,255,0.10);
          --cyan-border: rgba(0,229,255,0.22);
          --bg-deep: #020c10;
          --bg-panel: #040f14;
          --bg-card: #061318;
          --text-primary: #e0f7fa;
          --text-muted: #546e7a;
          --red-alert: #ff1744;
          --amber: #ffab00;
          --green-ok: #00e676;
        }

        .cb-root {
          background: var(--bg-deep);
          min-height: 100vh;
          font-family: 'Exo 2', sans-serif;
          color: var(--text-primary);
          position: relative;
          overflow-x: hidden;
        }

        .cb-grid-bg {
          position: fixed; inset: 0;
          background-image:
            linear-gradient(rgba(0,229,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.025) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none; z-index: 0;
        }

        .cb-scanlines {
          position: fixed; inset: 0;
          background: repeating-linear-gradient(
            0deg, transparent, transparent 2px,
            rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px
          );
          pointer-events: none; z-index: 1;
        }

        .cb-content { position: relative; z-index: 2; }

        /* ---- PAGE LAYOUT ---- */
        .cb-page {
          max-width: 900px;
          margin: 0 auto;
          padding: 48px 24px 64px;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        /* ---- HERO ---- */
        .cb-hero {
          text-align: center;
          padding-bottom: 32px;
          border-bottom: 1px solid var(--cyan-border);
          margin-bottom: 28px;
          position: relative;
        }

        .cb-hero::after {
          content: '';
          position: absolute;
          bottom: 0; left: 50%; transform: translateX(-50%);
          width: 400px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--cyan), transparent);
        }

        .cb-eyebrow {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px; letter-spacing: 0.4em;
          color: var(--cyan); text-transform: uppercase;
          margin-bottom: 12px; opacity: 0.75;
        }

        .cb-hero-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 700; letter-spacing: 0.18em; line-height: 1;
          color: transparent;
          background: linear-gradient(135deg, #ffffff 0%, var(--cyan) 60%, #80deea 100%);
          -webkit-background-clip: text; background-clip: text;
          margin-bottom: 8px;
        }

        .cb-hero-sub {
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px; color: var(--text-muted); letter-spacing: 0.2em;
        }

        /* ---- CHAT PANEL ---- */
        .cb-panel {
          background: var(--bg-card);
          border: 1px solid var(--cyan-border);
          display: flex;
          flex-direction: column;
          height: 600px;
          position: relative;
          overflow: hidden;
        }

        /* Panel top glowing line */
        .cb-panel::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--cyan), var(--cyan-dim), transparent);
        }

        /* ---- CHAT TOPBAR ---- */
        .cb-topbar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 20px;
          border-bottom: 1px solid var(--cyan-border);
          background: var(--bg-panel);
          flex-shrink: 0;
        }

        .cb-topbar-left {
          display: flex; align-items: center; gap: 12px;
        }

        .cb-ai-icon {
          width: 36px; height: 36px;
          border: 1px solid var(--cyan-border);
          background: var(--cyan-glow);
          display: flex; align-items: center; justify-content: center;
          color: var(--cyan);
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
          flex-shrink: 0;
        }

        .cb-ai-name {
          font-family: 'Rajdhani', sans-serif;
          font-size: 16px; font-weight: 700;
          letter-spacing: 0.15em; color: var(--text-primary);
        }

        .cb-ai-status {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px; letter-spacing: 0.2em;
          display: flex; align-items: center; gap: 5px;
          margin-top: 1px;
        }

        .cb-status-dot {
          width: 5px; height: 5px; border-radius: 50%;
        }

        .cb-status-dot.online {
          background: var(--green-ok);
          box-shadow: 0 0 6px var(--green-ok);
          animation: cb-pulse 2s infinite;
        }

        .cb-status-dot.typing {
          background: var(--amber);
          box-shadow: 0 0 6px var(--amber);
          animation: cb-pulse 0.8s infinite;
        }

        @keyframes cb-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

        .cb-status-text { color: var(--text-muted); }
        .cb-status-text.typing { color: var(--amber); }

        .cb-clear-btn {
          background: transparent; border: 1px solid rgba(0,229,255,0.12);
          color: var(--text-muted); font-family: 'Share Tech Mono', monospace;
          font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase;
          padding: 6px 12px; cursor: pointer; transition: all 0.2s;
          display: flex; align-items: center; gap: 6px;
        }

        .cb-clear-btn:hover {
          border-color: var(--cyan-border); color: var(--cyan);
          background: var(--cyan-glow);
        }

        /* ---- MESSAGES ---- */
        .cb-messages {
          flex: 1; overflow-y: auto; padding: 20px;
          display: flex; flex-direction: column; gap: 16px;
          scrollbar-width: thin;
          scrollbar-color: rgba(0,229,255,0.15) transparent;
        }

        .cb-messages::-webkit-scrollbar { width: 4px; }
        .cb-messages::-webkit-scrollbar-track { background: transparent; }
        .cb-messages::-webkit-scrollbar-thumb { background: rgba(0,229,255,0.15); }

        .cb-msg-row {
          display: flex;
        }

        .cb-msg-row.user { justify-content: flex-end; }
        .cb-msg-row.ai { justify-content: flex-start; }

        .cb-bubble {
          max-width: 72%;
          padding: 14px 18px;
          position: relative;
        }

        /* AI bubble */
        .cb-bubble.ai {
          background: var(--bg-panel);
          border: 1px solid var(--cyan-border);
          border-left: 2px solid var(--cyan);
        }

        .cb-bubble.ai.error {
          border-left-color: var(--red-alert);
          border-color: rgba(255,23,68,0.2);
          background: rgba(255,23,68,0.04);
        }

        /* User bubble */
        .cb-bubble.user {
          background: rgba(0,229,255,0.08);
          border: 1px solid var(--cyan-border);
          border-right: 2px solid var(--cyan);
        }

        .cb-bubble-sender {
          font-family: 'Share Tech Mono', monospace;
          font-size: 8px; letter-spacing: 0.25em; text-transform: uppercase;
          margin-bottom: 6px;
        }

        .cb-bubble.ai .cb-bubble-sender { color: var(--cyan-dim); }
        .cb-bubble.user .cb-bubble-sender { color: rgba(0,229,255,0.5); text-align: right; }
        .cb-bubble.ai.error .cb-bubble-sender { color: var(--red-alert); opacity: 0.7; }

        .cb-bubble-text {
          font-size: 14px; line-height: 1.65; font-weight: 300;
          white-space: pre-wrap;
        }

        .cb-bubble.ai .cb-bubble-text { color: #90a4ae; }
        .cb-bubble.user .cb-bubble-text { color: var(--text-primary); }
        .cb-bubble.ai.error .cb-bubble-text { color: rgba(255,23,68,0.7); }

        .cb-bubble-time {
          font-family: 'Share Tech Mono', monospace;
          font-size: 8px; letter-spacing: 0.1em;
          color: #263238; margin-top: 6px;
        }

        .cb-bubble.user .cb-bubble-time { text-align: right; }

        /* ---- TYPING INDICATOR ---- */
        .cb-typing {
          display: flex; align-items: center; gap: 5px;
          padding: 14px 18px;
          background: var(--bg-panel);
          border: 1px solid var(--cyan-border);
          border-left: 2px solid var(--cyan);
          width: fit-content;
        }

        .cb-typing-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--cyan);
          animation: cb-typing-anim 1.2s infinite ease-in-out;
        }

        .cb-typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .cb-typing-dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes cb-typing-anim {
          0%, 60%, 100% { opacity: 0.2; transform: scale(0.85); }
          30% { opacity: 1; transform: scale(1); box-shadow: 0 0 6px var(--cyan); }
        }

        /* ---- INPUT AREA ---- */
        .cb-input-area {
          border-top: 1px solid var(--cyan-border);
          padding: 16px 20px;
          background: var(--bg-panel);
          flex-shrink: 0;
        }

        .cb-input-row {
          display: flex; gap: 10px; align-items: center;
        }

        .cb-input-wrap {
          flex: 1; position: relative;
        }

        .cb-prefix {
          position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
          font-family: 'Share Tech Mono', monospace;
          font-size: 12px; color: var(--cyan-dim);
          pointer-events: none; user-select: none;
        }

        .cb-input {
          width: 100%;
          background: var(--bg-card);
          border: 1px solid var(--cyan-border);
          color: var(--text-primary);
          font-family: 'Share Tech Mono', monospace;
          font-size: 12px; letter-spacing: 0.05em;
          padding: 11px 12px 11px 36px;
          outline: none; transition: border-color 0.2s, box-shadow 0.2s;
        }

        .cb-input::placeholder { color: var(--text-muted); }

        .cb-input:focus {
          border-color: var(--cyan);
          box-shadow: 0 0 16px rgba(0,229,255,0.1);
        }

        .cb-input:disabled { opacity: 0.5; cursor: not-allowed; }

        .cb-send-btn {
          width: 42px; height: 42px; flex-shrink: 0;
          background: transparent;
          border: 1px solid var(--cyan-border);
          color: var(--cyan); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
        }

        .cb-send-btn:hover:not(:disabled) {
          background: var(--cyan-glow);
          box-shadow: 0 0 16px rgba(0,229,255,0.2);
        }

        .cb-send-btn:disabled { opacity: 0.3; cursor: not-allowed; }

        /* ---- SUGGESTIONS ---- */
        .cb-suggestions {
          margin-top: 12px;
          display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
        }

        .cb-sug-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px; letter-spacing: 0.15em;
          color: #263238; text-transform: uppercase; flex-shrink: 0;
        }

        .cb-sug-btn {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px; letter-spacing: 0.1em;
          color: var(--text-muted); background: transparent;
          border: 1px solid rgba(0,229,255,0.1); padding: 4px 10px;
          cursor: pointer; transition: all 0.2s; white-space: nowrap;
          text-transform: uppercase;
        }

        .cb-sug-btn:hover:not(:disabled) {
          color: var(--cyan); border-color: var(--cyan-border);
          background: var(--cyan-glow);
        }

        .cb-sug-btn:disabled { opacity: 0.3; cursor: not-allowed; }

        /* ---- INFO STRIP ---- */
        .cb-info {
          margin-top: 16px;
          border: 1px solid rgba(0,229,255,0.08);
          background: rgba(0,229,255,0.02);
          padding: 14px 18px;
          display: flex; align-items: flex-start; gap: 10px;
        }

        .cb-info-icon { color: var(--cyan-dim); flex-shrink: 0; margin-top: 1px; }

        .cb-info-text {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px; letter-spacing: 0.08em; color: #2e4650;
          line-height: 1.6;
        }

        .cb-info-text span { color: var(--cyan-dim); }
      `}</style>

      <div className="cb-root">
        <div className="cb-grid-bg" />
        <div className="cb-scanlines" />

        <div className="cb-content">
          <Header />

          <div className="cb-page">
            {/* Hero */}
            <div className="cb-hero">
              <div className="cb-eyebrow">◈ SECURE CHANNEL · END-TO-END ENCRYPTED</div>
              <div className="cb-hero-title">TACTICAL AI</div>
              <div className="cb-hero-sub">VAJRA INTELLIGENCE ASSISTANT · POWERED BY GEMINI</div>
            </div>

            {/* Chat Panel */}
            <div className="cb-panel">
              {/* Topbar */}
              <div className="cb-topbar">
                <div className="cb-topbar-left">
                  <div className="cb-ai-icon">
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="cb-ai-name">VAJRA AI</div>
                    <div className="cb-ai-status">
                      <div className={`cb-status-dot ${loading ? 'typing' : 'online'}`} />
                      <span className={`cb-status-text${loading ? ' typing' : ''}`}>
                        {loading ? 'PROCESSING...' : 'ONLINE · SECURE'}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="cb-clear-btn" onClick={clearChat}>
                  <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  CLEAR
                </button>
              </div>

              {/* Messages */}
              <div className="cb-messages">
                {messages.map((msg, i) => (
                  <div key={i} className={`cb-msg-row ${msg.isUser ? 'user' : 'ai'}`}>
                    <div className={`cb-bubble ${msg.isUser ? 'user' : 'ai'}${msg.isError ? ' error' : ''}`}>
                      <div className="cb-bubble-sender">
                        {msg.isUser ? 'YOU' : msg.isError ? '⚠ SYSTEM ERROR' : 'VAJRA AI'}
                      </div>
                      <div className="cb-bubble-text">{msg.text}</div>
                      <div className="cb-bubble-time">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="cb-msg-row ai">
                    <div className="cb-typing">
                      <div className="cb-typing-dot" />
                      <div className="cb-typing-dot" />
                      <div className="cb-typing-dot" />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="cb-input-area">
                <form onSubmit={handleAsk} className="cb-input-row">
                  <div className="cb-input-wrap">
                    <span className="cb-prefix">&gt;_</span>
                    <input
                      ref={inputRef}
                      type="text"
                      className="cb-input"
                      placeholder="ENTER QUERY..."
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      disabled={loading}
                      autoComplete="off"
                    />
                  </div>
                  <button
                    type="submit"
                    className="cb-send-btn"
                    disabled={loading || !input.trim()}
                  >
                    {loading ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ animation: 'cb-spin 0.8s linear infinite' }}>
                        <path d="M4 4v5h5M20 20v-5h-5M4 9a9 9 0 0115 0M20 15a9 9 0 01-15 0" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    )}
                  </button>
                </form>

                <div className="cb-suggestions">
                  <span className="cb-sug-label">QUICK:</span>
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      className="cb-sug-btn"
                      onClick={() => setInput(s)}
                      disabled={loading}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Info strip */}
            <div className="cb-info">
              <div className="cb-info-icon">
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l8 4v5c0 5.25-3.5 10-8 12-4.5-2-8-6.75-8-12V7l8-4z" />
                </svg>
              </div>
              <div className="cb-info-text">
                <span>VAJRA AI</span> is a secure military intelligence assistant. All sessions are encrypted and monitored.
                For sensitive operational data, use official secure communication channels only.
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}