import { useNavigate } from 'react-router-dom';
import { ArrowLeft, X, Mic, ArrowUpRight } from 'lucide-react';

// ─── CSS keyframes ───────────────────────────────────────────────────────────
const KEYFRAMES = `
  @keyframes voiceFadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes voicePulse {
    0%, 100% { transform: scale(1); opacity: 0.3; }
    50% { transform: scale(1.3); opacity: 0.1; }
  }
  @keyframes waveform {
    0%, 100% { height: 8px; }
    50% { height: 24px; }
  }
`;

function fadeUp(delay: number): React.CSSProperties {
  return {
    opacity: 0,
    animation: `voiceFadeUp 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms both`,
  };
}

// ─── Status Bar ─────────────────────────────────────────────────────────────
function StatusBar() {
  return (
    <div className="flex items-center justify-between" style={{ padding: '12px 24px 8px' }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: '#FAFAFA', fontWeight: 600 }}>9:41</span>
      <div className="flex items-center" style={{ gap: 5 }}>
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none" aria-hidden="true">
          <rect x="0" y="8" width="3" height="4" rx="0.5" fill="#FAFAFA" />
          <rect x="4.5" y="5" width="3" height="7" rx="0.5" fill="#FAFAFA" />
          <rect x="9" y="2.5" width="3" height="9.5" rx="0.5" fill="#FAFAFA" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.5" fill="#FAFAFA" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
          <path d="M8 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" fill="#FAFAFA" />
          <path d="M3.5 6.5C4.9 5.1 6.35 4.4 8 4.4s3.1.7 4.5 2.1" stroke="#FAFAFA" strokeWidth="1.4" strokeLinecap="round" fill="none" />
          <path d="M1 4C3 2 5.4 1 8 1s5 1 7 3" stroke="#FAFAFA" strokeWidth="1.4" strokeLinecap="round" fill="none" />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none" aria-hidden="true">
          <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="#FAFAFA" strokeOpacity="0.4" />
          <rect x="2" y="2" width="16" height="8" rx="1.5" fill="#FAFAFA" />
          <path d="M23 4.5v3a1.5 1.5 0 0 0 0-3z" fill="#FAFAFA" fillOpacity="0.4" />
        </svg>
      </div>
    </div>
  );
}

// ─── Main Screen ─────────────────────────────────────────────────────────────
export default function VoiceEntryScreen() {
  const navigate = useNavigate();

  return (
    <>
      <style>{KEYFRAMES}</style>
      <div style={{ background: '#050505', minHeight: '100dvh', paddingBottom: 32 }}>
        <StatusBar />

        {/* Top bar */}
        <div className="flex items-center justify-between" style={{ padding: '12px 20px', ...fadeUp(100) }}>
          <button
            type="button"
            onClick={() => void navigate(-1)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
          >
            <ArrowLeft size={22} strokeWidth={1.5} color="#FAFAFA" />
          </button>
          <div style={{ width: 30 }} />
          <button
            type="button"
            onClick={() => void navigate(-1)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
          >
            <X size={22} strokeWidth={1.5} color="#FAFAFA" />
          </button>
        </div>

        {/* Label + Title */}
        <div style={{ padding: '0 20px', marginTop: 12, ...fadeUp(200) }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: '#C8FF00', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 500 }}>
            VOICE ENTRY
          </p>
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '1.8rem', color: '#FAFAFA', lineHeight: 1.15, marginTop: 8 }}>
            Tell Costra what you spent.
          </h1>
        </div>

        {/* Listening card */}
        <div style={{ margin: '32px 20px 0', background: '#0A0A0B', border: '1px solid #1C1C1F', borderRadius: 16, padding: 32, textAlign: 'center', ...fadeUp(300) }}>
          {/* Mic with pulse rings */}
          <div style={{ position: 'relative', width: 100, height: 100, margin: '0 auto 16px' }}>
            {/* Outer pulse ring */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 100,
              height: 100,
              borderRadius: 9999,
              border: '1px solid rgba(200,255,0,0.15)',
              animation: 'voicePulse 2s ease infinite 0.5s',
            }} />
            {/* Inner pulse ring */}
            <div style={{
              position: 'absolute',
              top: 10,
              left: 10,
              width: 80,
              height: 80,
              borderRadius: 9999,
              border: '1px solid rgba(200,255,0,0.15)',
              animation: 'voicePulse 2s ease infinite 0s',
            }} />
            {/* Mic button */}
            <div style={{
              position: 'absolute',
              top: 18,
              left: 18,
              width: 64,
              height: 64,
              borderRadius: 9999,
              background: 'rgba(200,255,0,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Mic size={32} strokeWidth={1.5} color="#C8FF00" />
            </div>
          </div>

          {/* Listening label */}
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: '#C8FF00', textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: 16 }}>
            Listening now
          </p>

          {/* Prompt text */}
          <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, fontSize: '0.8rem', color: '#52525B', marginTop: 8, maxWidth: 260, margin: '8px auto 0' }}>
            Say something like 'Spent 650 on groceries and 120 for bus fare.'
          </p>
        </div>

        {/* Waveform dots */}
        <div className="flex items-end justify-center" style={{ marginTop: 20, gap: 5, ...fadeUp(400) }}>
          {[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6].map((delay, i) => (
            <div
              key={i}
              style={{
                width: 4,
                borderRadius: 9999,
                background: '#C8FF00',
                animation: `waveform 0.8s ease infinite ${delay}s`,
                height: 8,
              }}
            />
          ))}
        </div>

        {/* Live transcript */}
        <div style={{ padding: '0 20px', marginTop: 28, ...fadeUp(500) }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: '#52525B', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            LIVE TRANSCRIPT
          </p>
          <div style={{ background: '#0A0A0B', border: '1px solid #1C1C1F', borderRadius: 14, padding: 16, marginTop: 10 }}>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 400, fontSize: '0.9rem', color: '#FAFAFA', lineHeight: 1.6 }}>
              Spent seven hundred and seventy rupees at Keells, groceries and bus fare
            </p>
          </div>
        </div>

        {/* Parsed result card */}
        <div style={{ margin: '20px 20px 0', background: '#0A0A0B', border: '1px solid #1C1C1F', borderRadius: 16, padding: 20, ...fadeUp(600) }}>
          {/* Amount row */}
          <div className="flex items-center justify-between" style={{ paddingBottom: 12, borderBottom: '1px solid #1C1C1F' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', color: '#52525B', textTransform: 'uppercase', letterSpacing: '0.1em' }}>AMOUNT</span>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.95rem', color: '#FAFAFA' }}>₹770</span>
          </div>
          {/* Type row */}
          <div className="flex items-center justify-between" style={{ padding: '12px 0', borderBottom: '1px solid #1C1C1F' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', color: '#52525B', textTransform: 'uppercase', letterSpacing: '0.1em' }}>TYPE</span>
            <div className="flex items-center" style={{ gap: 4 }}>
              <ArrowUpRight size={14} strokeWidth={1.5} color="#FAFAFA" />
              <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.95rem', color: '#FAFAFA' }}>Expense</span>
            </div>
          </div>
          {/* Merchant row */}
          <div className="flex items-center justify-between" style={{ padding: '12px 0', borderBottom: '1px solid #1C1C1F' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', color: '#52525B', textTransform: 'uppercase', letterSpacing: '0.1em' }}>MERCHANT</span>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.95rem', color: '#FAFAFA' }}>Keells</span>
          </div>
          {/* Category row */}
          <div className="flex items-center justify-between" style={{ paddingTop: 12 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', color: '#52525B', textTransform: 'uppercase', letterSpacing: '0.1em' }}>CATEGORY</span>
            <div className="flex items-center" style={{ gap: 6 }}>
              <span style={{ background: '#111113', border: '1px solid #1C1C1F', borderRadius: 9999, padding: '4px 10px', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', color: '#A1A1AA' }}>
                Groceries
              </span>
              <span style={{ background: '#111113', border: '1px solid #1C1C1F', borderRadius: 9999, padding: '4px 10px', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', color: '#A1A1AA' }}>
                Travel
              </span>
            </div>
          </div>
        </div>

        {/* CTA buttons */}
        <div style={{ padding: '24px 20px 0', ...fadeUp(700) }}>
          <button
            type="button"
            style={{ width: '100%', padding: 16, background: '#C8FF00', color: '#050505', borderRadius: 14, border: 'none', cursor: 'pointer', fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '1rem' }}
          >
            Create Transaction Draft
          </button>
          <div className="flex" style={{ gap: 12, marginTop: 12 }}>
            <button
              type="button"
              style={{ flex: 1, padding: 14, background: 'transparent', color: '#FAFAFA', borderRadius: 14, border: '1px solid #27272A', cursor: 'pointer', fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '0.85rem' }}
            >
              Try Again
            </button>
            <button
              type="button"
              style={{ flex: 1, padding: 14, background: 'transparent', color: '#FAFAFA', borderRadius: 14, border: '1px solid #27272A', cursor: 'pointer', fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '0.85rem' }}
            >
              Type Instead
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
