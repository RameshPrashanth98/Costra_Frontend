import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

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
export default function LoginOtpScreen() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [countdown, setCountdown] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  // Auto-focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    const id = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    // Only allow single digit
    const digit = value.replace(/\D/g, '').slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Auto-advance to next input
    if (digit && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Move focus to previous input and clear it
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setCountdown(30);
  };

  const allFilled = otp.every((d) => d !== '');

  const handleVerify = () => {
    if (allFilled) {
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
              OTP VERIFICATION
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
              Verify your mobile number.
            </h1>
          </div>

          {/* Description */}
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
              Enter the 4-digit code sent to your mobile number to verify your identity.
            </p>
          </div>

          {/* Card container */}
          <div style={{ ...fadeUp(320) }}>
            <div
              style={{
                background: '#0A0A0B',
                borderRadius: 16,
                border: '1px solid #1C1C1F',
                padding: '24px 20px',
              }}
            >
              {/* ENTER CODE label */}
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.6rem',
                  color: '#52525B',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  marginBottom: 16,
                }}
              >
                ENTER CODE
              </p>

              {/* 4 OTP input boxes */}
              <div className="flex" style={{ gap: 12 }}>
                {otp.map((digit, index) => {
                  return (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      style={{
                        width: 70,
                        height: 60,
                        textAlign: 'center',
                        fontSize: '1.4rem',
                        fontWeight: 700,
                        fontFamily: "'Outfit', sans-serif",
                        background: '#141416',
                        border: '1px solid #27272A',
                        borderRadius: 12,
                        color: '#FAFAFA',
                        outline: 'none',
                        caretColor: '#C8FF00',
                        transition: 'background 0.15s ease, border-color 0.15s ease, color 0.15s ease',
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.background = '#C8FF00';
                        e.currentTarget.style.borderColor = '#C8FF00';
                        e.currentTarget.style.color = '#050505';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.background = '#141416';
                        e.currentTarget.style.borderColor = '#27272A';
                        e.currentTarget.style.color = '#FAFAFA';
                      }}
                    />
                  );
                })}
              </div>

              {/* Bottom row */}
              <div
                className="flex items-center justify-between"
                style={{ marginTop: 16 }}
              >
                {/* Countdown / Resend */}
                <div>
                  {countdown > 0 ? (
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.6rem',
                        color: '#52525B',
                        fontWeight: 400,
                      }}
                    >
                      Resend code in 00:{String(countdown).padStart(2, '0')}
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResend}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.6rem',
                        color: '#C8FF00',
                        fontWeight: 500,
                        cursor: 'pointer',
                        letterSpacing: '0.05em',
                      }}
                    >
                      Resend Code
                    </button>
                  )}
                </div>

                {/* Change number */}
                <button
                  type="button"
                  onClick={() => void navigate('/login')}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '0.8rem',
                    color: '#C8FF00',
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  Change number
                </button>
              </div>
            </div>
          </div>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Verify and Continue CTA */}
          <div style={{ ...fadeUp(400), paddingTop: 20, paddingBottom: 12 }}>
            <button
              type="button"
              onClick={handleVerify}
              disabled={!allFilled}
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
                cursor: allFilled ? 'pointer' : 'default',
                transition: 'transform 0.1s ease, opacity 0.2s ease',
                opacity: allFilled ? 1 : 0.4,
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
              Verify and Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
