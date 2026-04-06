import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// ─── CSS keyframes injected once ───────────────────────────────────────────
const KEYFRAMES = `
  @keyframes loginFadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
`;

// ─── Animation helper ───────────────────────────────────────────────────────
function fadeUp(delay: number): React.CSSProperties {
  return {
    opacity: 0,
    animation: `loginFadeUp 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms both`,
  };
}

// ─── Status Bar ─────────────────────────────────────────────────────────────
function StatusBar() {
  return (
    <div
      className="flex items-center justify-between"
      style={{ padding: '12px 24px 8px' }}
    >
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.8rem',
          color: '#FAFAFA',
          fontWeight: 600,
        }}
      >
        9:41
      </span>
      <div className="flex items-center" style={{ gap: 5 }}>
        {/* Signal bars */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none" aria-hidden="true">
          <rect x="0" y="8" width="3" height="4" rx="0.5" fill="#FAFAFA" />
          <rect x="4.5" y="5" width="3" height="7" rx="0.5" fill="#FAFAFA" />
          <rect x="9" y="2.5" width="3" height="9.5" rx="0.5" fill="#FAFAFA" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.5" fill="#FAFAFA" />
        </svg>
        {/* Wifi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
          <path d="M8 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" fill="#FAFAFA" />
          <path d="M3.5 6.5C4.9 5.1 6.35 4.4 8 4.4s3.1.7 4.5 2.1" stroke="#FAFAFA" strokeWidth="1.4" strokeLinecap="round" fill="none" />
          <path d="M1 4C3 2 5.4 1 8 1s5 1 7 3" stroke="#FAFAFA" strokeWidth="1.4" strokeLinecap="round" fill="none" />
        </svg>
        {/* Battery */}
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none" aria-hidden="true">
          <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="#FAFAFA" strokeOpacity="0.4" />
          <rect x="2" y="2" width="16" height="8" rx="1.5" fill="#FAFAFA" />
          <path d="M23 4.5v3a1.5 1.5 0 0 0 0-3z" fill="#FAFAFA" fillOpacity="0.4" />
        </svg>
      </div>
    </div>
  );
}

// ─── Costra brand mark (actual brand asset) ────────────────────────────────
function CostraBrand() {
  return (
    <div className="flex items-center" style={{ gap: 10 }}>
      <img
        src="/logos/costra-icon.png"
        alt=""
        width={32}
        height={32}
        style={{ borderRadius: 4 }}
        aria-hidden="true"
      />
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
  );
}

// ─── Main screen ────────────────────────────────────────────────────────────
export default function LoginScreen() {
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = () => {
    if (phone.trim()) {
      void navigate('/app');
    }
  };

  return (
    <>
      <style>{KEYFRAMES}</style>

      <div
        className="flex flex-col min-h-[100dvh]"
        style={{
          background: '#050505',
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: 'max(env(safe-area-inset-bottom), 16px)',
        }}
      >
        {/* Status bar */}
        <StatusBar />

        {/* Content */}
        <div
          className="flex flex-1 flex-col"
          style={{ padding: '0 24px' }}
        >
          {/* Brand */}
          <div style={{ marginTop: 36, marginBottom: 24, ...fadeUp(0) }}>
            <CostraBrand />
          </div>

          {/* Eyebrow */}
          <div style={{ marginBottom: 12, ...fadeUp(80) }}>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.6rem',
                color: '#C8FF00',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontWeight: 500,
              }}
            >
              OTP SIGN-IN
            </p>
          </div>

          {/* Heading */}
          <div style={{ marginBottom: 10, ...fadeUp(160) }}>
            <h1
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: '1.65rem',
                lineHeight: 1.2,
                color: '#FAFAFA',
              }}
            >
              Login with your mobile number.
            </h1>
          </div>

          {/* Body */}
          <div style={{ marginBottom: 20, ...fadeUp(240) }}>
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 300,
                fontSize: '0.85rem',
                lineHeight: 1.65,
                color: '#A1A1AA',
              }}
            >
              Use the phone number you trust for daily alerts, secure backup, and
              fast access across devices.
            </p>
          </div>

          {/* Card */}
          <div style={{ ...fadeUp(320) }}>
            <div
              style={{
                background: '#0A0A0B',
                borderRadius: 16,
                border: '1px solid #1C1C1F',
                padding: '20px',
              }}
            >
              {/* Label */}
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.6rem',
                  color: '#52525B',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  marginBottom: 12,
                }}
              >
                MOBILE NUMBER
              </p>

              {/* Input row */}
              <div className="flex items-center" style={{ gap: 10 }}>
                {/* Country code chip */}
                <div
                  style={{
                    background: '#141416',
                    border: '1px solid #2A2A2E',
                    borderRadius: 10,
                    padding: '10px 14px',
                    color: '#FAFAFA',
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 600,
                    fontSize: '0.9rem',
                  }}
                >
                  +94
                </div>

                {/* Phone input */}
                <input
                  type="tel"
                  placeholder="Enter Your Mobile No"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#FAFAFA',
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '0.9rem',
                    fontWeight: 400,
                  }}
                  className="placeholder-zinc-600"
                />
              </div>

              {/* Divider */}
              <div
                style={{
                  height: 1,
                  background: '#1C1C1F',
                  margin: '14px 0',
                }}
              />

              {/* Helper text */}
              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 300,
                  fontSize: '0.78rem',
                  lineHeight: 1.55,
                  color: '#52525B',
                }}
              >
                We'll send a one-time code to verify your number.
              </p>

              {/* Bold statement */}
              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  lineHeight: 1.55,
                  color: '#FAFAFA',
                  marginTop: 10,
                }}
              >
                Your number stays linked to reminders, backup, and financial insights.
              </p>
            </div>
          </div>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Send OTP button */}
          <div style={{ ...fadeUp(400), paddingTop: 20, paddingBottom: 12 }}>
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={!phone.trim()}
              style={{
                width: '100%',
                padding: '16px',
                background: '#C8FF00',
                color: '#050505',
                borderRadius: 14,
                border: 'none',
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                fontSize: '1rem',
                cursor: phone.trim() ? 'pointer' : 'default',
                transition: 'transform 0.1s ease, opacity 0.2s ease',
                opacity: phone.trim() ? 1 : 0.4,
              }}
              onMouseDown={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.98)';
              }}
              onMouseUp={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
              }}
              onTouchStart={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.98)';
              }}
              onTouchEnd={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
              }}
            >
              Send OTP
            </button>
          </div>

          {/* Register link */}
          <div
            className="flex items-center justify-center"
            style={{ ...fadeUp(440), paddingBottom: 8 }}
          >
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '0.85rem',
                color: '#52525B',
              }}
            >
              Don't have an account?{' '}
              <Link
                to="/register"
                style={{
                  color: '#C8FF00',
                  textDecoration: 'none',
                  fontWeight: 600,
                }}
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
