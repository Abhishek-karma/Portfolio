import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

const SUGGESTIONS = [
  'What tech stack does Abhishek use?',
  'Is Abhishek open to hire?',
  'Tell me about his projects',
  'What are his certifications?',
];

async function askGemini(message: string, history: Message[]): Promise<string> {
  console.log('[ChatWidget] Calling /api/chat');

  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message,
      history: history.slice(-6),
    }),
  });

  console.log('[ChatWidget] Response status:', res.status);

  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as { error?: string; reply?: string };
    console.error('[ChatWidget] API error:', res.status, err);
    return `Error ${res.status}: ${err?.reply ?? err?.error ?? 'Unknown error'}. Try emailing abhikarma.work@gmail.com`;
  }

  const data = await res.json() as { reply?: string; error?: string };

  if (data.error) {
    return `Error: ${data.error}. Try emailing abhikarma.work@gmail.com`;
  }

  return data.reply ?? "Couldn't generate a response. Please try again.";
}

// Lightweight clean markdown renderer for chat bubbles
function FormattedText({ text }: { text: string }) {
  // Parse lines into paragraphs and list items
  const lines = text.split('\n');

  const renderInline = (str: string) => {
    // Split by markdown elements: **bold**, `code`, [link](url)
    const parts = str.split(/(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
        return (
          <strong key={index} className="font-semibold text-ink">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
        return (
          <code key={index} className="px-1.5 py-0.5 bg-border-lt rounded text-[11px] font-mono text-accent">
            {part.slice(1, -1)}
          </code>
        );
      }
      const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (linkMatch) {
        return (
          <a key={index} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-accent underline font-medium">
            {linkMatch[1]}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className="space-y-1.5 text-[13px] leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }

        // Bullet point: * text or - text or • text
        if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
          const content = trimmed.replace(/^[\*\-•]\s+/, '');
          return (
            <div key={idx} className="flex items-start gap-2 pl-1 my-0.5">
              <span className="text-accent text-[12px] leading-tight select-none mt-0.5 font-bold">•</span>
              <span className="flex-1">{renderInline(content)}</span>
            </div>
          );
        }

        // Numbered list: 1. text
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
        if (numMatch) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1 my-0.5">
              <span className="font-mono text-[11px] text-accent font-semibold min-w-[14px] leading-tight select-none mt-0.5">
                {numMatch[1]}.
              </span>
              <span className="flex-1">{renderInline(numMatch[2])}</span>
            </div>
          );
        }

        // Regular line
        return <p key={idx} className="my-0.5">{renderInline(line)}</p>;
      })}
    </div>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: "Hi! I'm Abhishek's AI assistant 👋 Ask me anything about his skills, projects, or availability.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [hasNew, setHasNew] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      setHasNew(false);
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [open]);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || loading) return;

    setInput('');
    const userMsg: Message = { role: 'user', text: q };
    const next = [...messages, userMsg];
    setMessages(next);
    setLoading(true);

    try {
      const reply = await askGemini(q, messages);
      setMessages(prev => [...prev, { role: 'bot', text: reply }]);
      if (!open) setHasNew(true);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'bot', text: 'Something went wrong. Please email abhikarma.work@gmail.com' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ── Chat Panel ── */}
      {open && (
        <div
          className="fixed bottom-24 right-4 sm:right-6 z-[8000]
                     w-[min(400px,calc(100vw-2rem))] bg-white border border-border
                     rounded-[24px] shadow-[0_24px_80px_rgba(0,0,0,0.16)]
                     flex flex-col overflow-hidden animate-[modalIn_0.25s_cubic-bezier(.22,1,.36,1)]"
          style={{ height: 'min(540px,calc(100dvh - 120px))' }}>

          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-surface shrink-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent to-[#e07020]
                            flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm">
              AV
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-ink">Ask about Abhishek</div>
              <div className="flex items-center gap-1.5 text-[11px] text-ok font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-ok animate-pulse inline-block" />
                AI powered · fast response
              </div>
            </div>
            <button onClick={() => setOpen(false)}
              className="w-7 h-7 rounded-full bg-warm hover:bg-border flex items-center justify-center
                         text-ink2 text-sm transition-colors cursor-pointer shrink-0">
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scroll-smooth">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-accent-lt flex items-center justify-center
                                  text-[10px] font-bold text-accent shrink-0 mt-1 mr-2">
                    AV
                  </div>
                )}
                <div className={`max-w-[85%] px-4 py-2.5 rounded-[16px] text-[13px] leading-relaxed shadow-sm
                                 ${msg.role === 'user'
                                   ? 'bg-ink text-bg rounded-br-[4px]'
                                   : 'bg-warm border border-border-lt text-ink rounded-bl-[4px]'}`}>
                  {msg.role === 'user' ? msg.text : <FormattedText text={msg.text} />}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="w-6 h-6 rounded-full bg-accent-lt flex items-center justify-center
                                text-[10px] font-bold text-accent shrink-0 mt-0.5 mr-2">
                  AV
                </div>
                <div className="bg-warm border border-border-lt px-4 py-3 rounded-[16px] rounded-bl-[4px]
                                flex items-center gap-1">
                  {[0, 1, 2].map(i => (
                    <span key={i}
                      className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce inline-block"
                      style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            )}

            {/* Suggested questions — only on first open */}
            {messages.length === 1 && !loading && (
              <div className="pt-1 space-y-2">
                <p className="text-[11px] text-muted font-mono px-1">Try asking</p>
                {SUGGESTIONS.map(s => (
                  <button key={s} onClick={() => send(s)}
                    className="w-full text-left px-3.5 py-2.5 rounded-[12px] border border-border
                               bg-surface text-[12px] text-ink2 hover:border-accent hover:text-accent
                               hover:bg-accent-lt transition-all duration-200 cursor-pointer">
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-border bg-surface shrink-0">
            <div className="flex items-center gap-2 bg-warm border border-border rounded-[14px] px-3.5 py-2
                            focus-within:border-accent transition-colors">
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send(input)}
                placeholder="Ask anything about Abhishek…"
                disabled={loading}
                className="flex-1 bg-transparent text-[13px] text-ink placeholder:text-muted
                           outline-none min-w-0 font-sans disabled:opacity-50" />
              <button
                onClick={() => send(input)}
                disabled={!input.trim() || loading}
                className="w-8 h-8 rounded-[10px] bg-ink text-bg flex items-center justify-center
                           text-sm transition-all cursor-pointer shrink-0
                           hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed">
                →
              </button>
            </div>
            <p className="text-[10px] text-muted text-center mt-2 font-mono">
              Powered by Gemini AI · answers about Abhishek only
            </p>
          </div>
        </div>
      )}

      {/* ── Floating Bubble ── */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-5 right-4 sm:right-6 z-[8001] w-14 h-14 rounded-full bg-accent
                   shadow-[0_8px_32px_rgba(194,94,0,0.35)] flex items-center justify-center
                   transition-all duration-300 cursor-pointer
                   hover:scale-110 hover:shadow-[0_12px_40px_rgba(194,94,0,0.45)]
                   active:scale-95"
        aria-label="Open AI chat">
        {open ? (
          /* Close X */
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-white">
            <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        ) : (
          /* Chat bubble SVG — matches accent theme */
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
              fill="currentColor" opacity="0.9"/>
            <circle cx="8.5" cy="11.5" r="1" fill="rgba(255,255,255,0.7)"/>
            <circle cx="12" cy="11.5" r="1" fill="rgba(255,255,255,0.7)"/>
            <circle cx="15.5" cy="11.5" r="1" fill="rgba(255,255,255,0.7)"/>
          </svg>
        )}
        {hasNew && !open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-ink
                           border-2 border-white animate-pulse" />
        )}
      </button>
    </>
  );
}
