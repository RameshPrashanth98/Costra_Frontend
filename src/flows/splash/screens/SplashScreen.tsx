import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// --- CSS keyframes injected once via a style tag ---
const KEYFRAMES = `
  @keyframes splashFadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes splashScaleUp {
    from { opacity: 0; transform: scale(0.92) translateY(12px); }
    to   { opacity: 1; transform: scale(1)    translateY(0);    }
  }
  @keyframes splashDotPulse {
    0%,  40%  { transform: scale(1);    opacity: 0.35; }
    20%       { transform: scale(1.35); opacity: 1;    }
    100%      { transform: scale(1);    opacity: 0.35; }
  }
`;

// Shared animation helper
function fadeUp(delay: number): React.CSSProperties {
  return {
    opacity: 0,
    animation: `splashFadeUp 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms forwards`,
  };
}

// --- Logo Mark (actual brand asset) ---
function LogoMark() {
  return (
    <img
      src="/logos/costra-icon.png"
      alt=""
      width={128}
      height={128}
      style={{ borderRadius: 16 }}
      aria-hidden="true"
    />
  );
}

// --- Small wordmark "C" icon (actual brand asset) ---
function WordmarkIcon() {
  return (
    <img
      src="/logos/costra-icon.png"
      alt=""
      width={14}
      height={14}
      style={{ borderRadius: 3 }}
      aria-hidden="true"
    />
  );
}

// --- Loading dots ---
function LoadingDots() {
  // Dot 1 active at 0ms, Dot 2 at 200ms, Dot 3 at 400ms
  const dots = [0, 200, 400];
  return (
    <div
      className="flex items-center justify-center"
      style={{ gap: 8 }}
      role="status"
      aria-label="Loading"
    >
      {dots.map((delay, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            width: i === 0 ? 10 : 8,
            height: i === 0 ? 10 : 8,
            borderRadius: '50%',
            background: i === 0 ? '#C8FF00' : '#2A2A20',
            animation: `splashDotPulse 1.5s ease-in-out ${delay}ms infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function SplashScreen() {
  const navigate = useNavigate();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      navigate('/onboarding');
    }, 2800);

    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, [navigate]);

  return (
    <>
      {/* Inject keyframes */}
      <style>{KEYFRAMES}</style>

      {/*
        Full-height flex column.
        Safe-area padding: top min(env(safe-area-inset-top), 48px), bottom min 32px.
        Horizontal padding: 28px.
        Background: #050505
      */}
      <main
        className="flex flex-col items-center min-h-[100dvh]"
        style={{
          background: '#050505',
          paddingTop: 'max(env(safe-area-inset-top), 48px)',
          paddingBottom: 'max(env(safe-area-inset-bottom), 32px)',
          paddingLeft: 28,
          paddingRight: 28,
        }}
      >
        {/* ── Eyebrow ── */}
        <div style={fadeUp(0)}>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.6rem',
              color: '#C8FF00',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              textAlign: 'center',
              fontWeight: 500,
              marginBottom: 24,
            }}
          >
            Cost of Living Tracker
          </p>
        </div>

        {/* ── Logo ── */}
        <div
          style={{
            opacity: 0,
            animation: `splashScaleUp 0.7s cubic-bezier(0.16,1,0.3,1) 100ms forwards`,
            marginBottom: 20,
          }}
        >
          <LogoMark />
        </div>

        {/* ── Wordmark ── */}
        <div
          className="flex items-center"
          style={{ ...fadeUp(250), gap: 7, marginBottom: 48 }}
        >
          <WordmarkIcon />
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 900,
              fontSize: '0.95rem',
              letterSpacing: '0.15em',
              color: '#FAFAFA',
            }}
          >
            COSTRA
          </span>
        </div>

        {/* ── Title ── */}
        <div style={fadeUp(400)}>
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: '1.5rem',
              lineHeight: 1.2,
              color: '#FAFAFA',
              textAlign: 'center',
              maxWidth: 280,
              marginBottom: 16,
            }}
          >
            Daily money control for real life in Sri Lanka.
          </p>
        </div>

        {/* ── Body ── */}
        <div style={fadeUp(550)}>
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 300,
              fontSize: '0.85rem',
              lineHeight: 1.65,
              color: '#A1A1AA',
              textAlign: 'center',
              maxWidth: 300,
            }}
          >
            Track essentials, stay ahead of bills, and spot pressure before it hits.
          </p>
        </div>

        {/* ── Spacer ── */}
        <div className="flex-1" />

        {/* ── Loading section ── */}
        <div
          className="flex flex-col items-center"
          style={{ ...fadeUp(750), gap: 12, marginBottom: 36 }}
        >
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              color: '#52525B',
              textAlign: 'center',
            }}
          >
            Preparing your dashboard
          </p>
          <LoadingDots />
        </div>

        {/* ── Footer ── */}
        <div style={fadeUp(900)}>
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 300,
              fontSize: '0.72rem',
              lineHeight: 1.6,
              color: '#52525B',
              textAlign: 'center',
              maxWidth: 260,
            }}
          >
            Built for everyday families, workers, and small households.
          </p>
        </div>
      </main>
    </>
  );
}
