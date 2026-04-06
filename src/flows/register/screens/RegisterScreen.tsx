import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// ─── CSS keyframes injected once ───────────────────────────────────────────
const KEYFRAMES = `
  @keyframes registerFadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
`;

// ─── Animation helper ───────────────────────────────────────────────────────
function fadeUp(delay: number): React.CSSProperties {
  return {
    opacity: 0,
    animation: `registerFadeUp 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms both`,
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

// ─── Lime Button ────────────────────────────────────────────────────────────
function LimeButton({
  children,
  onClick,
  disabled = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
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
        cursor: disabled ? 'default' : 'pointer',
        transition: 'transform 0.1s ease, opacity 0.2s ease',
        opacity: disabled ? 0.4 : 1,
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
      {children}
    </button>
  );
}

// ─── Shared styles ──────────────────────────────────────────────────────────
const eyebrowStyle: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: '0.6rem',
  color: '#C8FF00',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  fontWeight: 500,
};

const headingStyle: React.CSSProperties = {
  fontFamily: "'Outfit', sans-serif",
  fontWeight: 800,
  fontSize: '1.65rem',
  lineHeight: 1.2,
  color: '#FAFAFA',
};

const bodyStyle: React.CSSProperties = {
  fontFamily: "'Outfit', sans-serif",
  fontWeight: 300,
  fontSize: '0.85rem',
  lineHeight: 1.65,
  color: '#A1A1AA',
};

const labelStyle: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: '0.6rem',
  color: '#52525B',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  fontWeight: 500,
  marginBottom: 12,
};

const cardStyle: React.CSSProperties = {
  background: '#0A0A0B',
  borderRadius: 16,
  border: '1px solid #1C1C1F',
  padding: '20px',
};

// ─── Profile types ──────────────────────────────────────────────────────────
interface EconomicProfile {
  income: string | null;
  earnStyle: string | null;
  dependents: string | null;
  debt: string | null;
}

// ─── Main screen ────────────────────────────────────────────────────────────
export default function RegisterScreen() {
  const navigate = useNavigate();

  // Step state (1-4)
  const [step, setStep] = useState(1);

  // Step 1 state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // Step 2 state
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const [focusedOtp, setFocusedOtp] = useState(0);
  const [otpTimer, setOtpTimer] = useState(30);
  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Step 3 state
  const [profile, setProfile] = useState<EconomicProfile>({
    income: null,
    earnStyle: null,
    dependents: null,
    debt: null,
  });

  // OTP countdown timer
  useEffect(() => {
    if (step !== 2) return;
    if (otpTimer <= 0) return;
    const id = setInterval(() => {
      setOtpTimer((t) => {
        if (t <= 1) {
          clearInterval(id);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [step, otpTimer]);

  // Auto-focus first OTP input on step 2
  useEffect(() => {
    if (step === 2) {
      otpRefs[0]!.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const handleOtpChange = (index: number, value: string) => {
    // Only accept single digit
    const digit = value.replace(/[^0-9]/g, '').slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Auto-advance to next
    if (digit && index < 3) {
      otpRefs[index + 1]!.current?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs[index - 1]!.current?.focus();
    }
  };

  const allOtpFilled = otp.every((d) => d !== '');

  const handleContinueStep1 = () => {
    setOtp(['', '', '', '']);
    setOtpTimer(30);
    setStep(2);
  };

  const handleVerifyOtp = () => {
    if (allOtpFilled) setStep(3);
  };

  const handleFinishSetup = () => {
    setStep(4);
  };

  const handleGoToLogin = () => {
    void navigate('/login');
  };

  // ─── Step 1: Register Form ─────────────────────────────────────────────
  const renderStep1 = () => (
    <>
      {/* Brand */}
      <div style={{ marginTop: 36, marginBottom: 24, ...fadeUp(0) }}>
        <CostraBrand />
      </div>

      {/* Eyebrow */}
      <div style={{ marginBottom: 12, ...fadeUp(80) }}>
        <p style={eyebrowStyle}>CREATE ACCOUNT</p>
      </div>

      {/* Heading */}
      <div style={{ marginBottom: 10, ...fadeUp(160) }}>
        <h1 style={headingStyle}>Enter your name and enter your mobile no.</h1>
      </div>

      {/* Body */}
      <div style={{ marginBottom: 20, ...fadeUp(240) }}>
        <p style={bodyStyle}>
          Use your full name and active mobile number to create your Costra account.
        </p>
      </div>

      {/* Card */}
      <div style={{ ...fadeUp(320) }}>
        <div style={cardStyle}>
          {/* Full Name label */}
          <p style={labelStyle}>FULL NAME</p>
          <input
            type="text"
            placeholder="Enter Your Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              borderBottom: '1px solid #2A2A2E',
              outline: 'none',
              color: '#FAFAFA',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '0.9rem',
              fontWeight: 400,
              paddingBottom: 12,
            }}
            className="placeholder-zinc-600"
          />

          {/* Spacing */}
          <div style={{ marginTop: 18 }} />

          {/* Mobile Number label */}
          <p style={labelStyle}>MOBILE NUMBER</p>

          {/* Phone input row */}
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
          <div style={{ height: 1, background: '#1C1C1F', margin: '14px 0' }} />

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
            We'll send a one-time code to verify your number and continue.
          </p>
        </div>
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Continue button */}
      <div style={{ ...fadeUp(400), paddingTop: 20, paddingBottom: 12 }}>
        <LimeButton
          onClick={handleContinueStep1}
          disabled={!name.trim() || !phone.trim()}
        >
          Continue
        </LimeButton>
      </div>

      {/* Already registered link */}
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
          Already registered?{' '}
          <Link
            to="/login"
            style={{
              color: '#C8FF00',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            Log in
          </Link>
        </p>
      </div>
    </>
  );

  // ─── Step 2: OTP Verification ───────────────────────────────────────────
  const renderStep2 = () => (
    <>
      {/* Brand */}
      <div style={{ marginTop: 36, marginBottom: 24, ...fadeUp(0) }}>
        <CostraBrand />
      </div>

      {/* Eyebrow */}
      <div style={{ marginBottom: 12, ...fadeUp(80) }}>
        <p style={eyebrowStyle}>OTP VERIFICATION</p>
      </div>

      {/* Heading */}
      <div style={{ marginBottom: 10, ...fadeUp(160) }}>
        <h1 style={headingStyle}>Verify your mobile number.</h1>
      </div>

      {/* Body */}
      <div style={{ marginBottom: 20, ...fadeUp(240) }}>
        <p style={bodyStyle}>
          Enter the 4-digit code sent to +94 {phone} to finish setting up your Costra account.
        </p>
      </div>

      {/* Card */}
      <div style={{ ...fadeUp(320) }}>
        <div style={cardStyle}>
          {/* Label */}
          <p style={labelStyle}>ENTER CODE</p>

          {/* OTP inputs row */}
          <div className="flex" style={{ gap: 12 }}>
            {[0, 1, 2, 3].map((i) => (
              <input
                key={i}
                ref={otpRefs[i]}
                type="text"
                inputMode="numeric"
                maxLength={1}
                pattern="[0-9]"
                value={otp[i]}
                onChange={(e) => handleOtpChange(i, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(i, e)}
                onFocus={() => setFocusedOtp(i)}
                style={{
                  width: 64,
                  height: 64,
                  textAlign: 'center',
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  borderRadius: 12,
                  border: focusedOtp === i ? 'none' : '1px solid #2A2A2E',
                  outline: 'none',
                  fontFamily: "'Outfit', sans-serif",
                  background: focusedOtp === i ? '#C8FF00' : '#141416',
                  color: focusedOtp === i ? '#050505' : '#FAFAFA',
                  transition: 'background 0.15s ease, color 0.15s ease',
                }}
              />
            ))}
          </div>

          {/* Timer + change number row */}
          <div
            className="flex items-center justify-between"
            style={{ marginTop: 16 }}
          >
            {otpTimer > 0 ? (
              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '0.78rem',
                  color: '#52525B',
                  fontWeight: 300,
                }}
              >
                Resend code in 00:{otpTimer.toString().padStart(2, '0')}
              </p>
            ) : (
              <button
                type="button"
                onClick={() => setOtpTimer(30)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  color: '#C8FF00',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Resend code
              </button>
            )}
            <button
              type="button"
              onClick={() => setStep(1)}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                color: '#C8FF00',
                fontFamily: "'Outfit', sans-serif",
                fontSize: '0.78rem',
                fontWeight: 600,
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

      {/* Verify button */}
      <div style={{ ...fadeUp(400), paddingTop: 20, paddingBottom: 12 }}>
        <LimeButton onClick={handleVerifyOtp} disabled={!allOtpFilled}>
          Verify and Continue
        </LimeButton>
      </div>
    </>
  );

  // ─── Step 3: Economic Profile ───────────────────────────────────────────
  const chipGroups: {
    key: keyof EconomicProfile;
    title: string;
    options: string[];
  }[] = [
    {
      key: 'income',
      title: 'Approx. household income per month',
      options: ['Under Rs.40k', 'Rs.40k-80k', 'Above Rs.80k'],
    },
    {
      key: 'earnStyle',
      title: 'How do you usually earn?',
      options: ['Daily wages', 'Monthly salary', 'Mixed / irregular'],
    },
    {
      key: 'dependents',
      title: 'How many people depend on this income?',
      options: ['1-2', '3-4', '5+'],
    },
    {
      key: 'debt',
      title: 'Are you currently paying debt or loans?',
      options: ['Yes, regularly', 'Sometimes', 'No'],
    },
  ];

  const renderStep3 = () => (
    <>
      {/* Brand */}
      <div style={{ marginTop: 36, marginBottom: 24, ...fadeUp(0) }}>
        <CostraBrand />
      </div>

      {/* Eyebrow */}
      <div style={{ marginBottom: 12, ...fadeUp(80) }}>
        <p style={eyebrowStyle}>STEP 3 OF 3</p>
      </div>

      {/* Heading */}
      <div style={{ marginBottom: 10, ...fadeUp(160) }}>
        <h1 style={headingStyle}>Tell us about your money situation.</h1>
      </div>

      {/* Body */}
      <div style={{ marginBottom: 20, ...fadeUp(240) }}>
        <p style={bodyStyle}>
          This helps Costra adjust spending alerts, wallet guidance, and insights to your real economic pressure.
        </p>
      </div>

      {/* Scrollable chip groups */}
      <div style={{ flex: 1, overflowY: 'auto', ...fadeUp(320) }}>
        {chipGroups.map((group) => (
          <div key={group.key} style={{ ...cardStyle, marginBottom: 14 }}>
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 500,
                fontSize: '0.85rem',
                color: '#FAFAFA',
                marginBottom: 14,
              }}
            >
              {group.title}
            </p>
            <div className="flex flex-wrap" style={{ gap: 10 }}>
              {group.options.map((option) => {
                const selected = profile[group.key] === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      setProfile((p) => ({ ...p, [group.key]: option }))
                    }
                    style={{
                      background: selected ? '#C8FF00' : 'transparent',
                      color: selected ? '#050505' : '#FAFAFA',
                      border: selected
                        ? '1px solid #C8FF00'
                        : '1px solid #2A2A2E',
                      borderRadius: 20,
                      padding: '8px 16px',
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: selected ? 600 : 400,
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Finish Setup button */}
      <div style={{ ...fadeUp(400), paddingTop: 20, paddingBottom: 8 }}>
        <LimeButton onClick={handleFinishSetup}>Finish Setup</LimeButton>
      </div>

      {/* Helper text */}
      <div style={{ ...fadeUp(440), paddingBottom: 8 }}>
        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 300,
            fontSize: '0.75rem',
            color: '#52525B',
            textAlign: 'center',
          }}
        >
          You can update these later in Profile {'>'} Financial Setup.
        </p>
      </div>
    </>
  );

  // ─── Step 4: Account Ready ──────────────────────────────────────────────
  const renderStep4 = () => {
    const limeCircle: React.CSSProperties = {
      width: 36,
      height: 36,
      background: '#C8FF00',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    };

    const mutedCircle: React.CSSProperties = {
      width: 36,
      height: 36,
      background: '#141416',
      border: '1px solid #2A2A2E',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    };

    const rowStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'row',
      gap: 14,
      alignItems: 'center',
      padding: '16px 0',
    };

    const divider: React.CSSProperties = {
      height: 1,
      background: '#1C1C1F',
    };

    return (
      <>
        {/* Brand */}
        <div style={{ marginTop: 36, marginBottom: 24, ...fadeUp(0) }}>
          <CostraBrand />
        </div>

        {/* Eyebrow */}
        <div style={{ marginBottom: 12, ...fadeUp(80) }}>
          <p style={eyebrowStyle}>ACCOUNT READY</p>
        </div>

        {/* Heading */}
        <div style={{ marginBottom: 10, ...fadeUp(160) }}>
          <h1 style={headingStyle}>Your Costra account has been created.</h1>
        </div>

        {/* Body */}
        <div style={{ marginBottom: 20, ...fadeUp(240) }}>
          <p style={bodyStyle}>
            You're all set. Use your registered mobile number and password to log in and start tracking your real cost of living.
          </p>
        </div>

        {/* Info card */}
        <div style={{ ...fadeUp(320) }}>
          <div style={cardStyle}>
            {/* Row 1 */}
            <div style={rowStyle}>
              <div style={limeCircle}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8.5L6.5 12L13 4" stroke="#050505" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    color: '#FAFAFA',
                  }}
                >
                  Setup complete
                </p>
                <p
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 300,
                    fontSize: '0.78rem',
                    color: '#A1A1AA',
                    marginTop: 2,
                  }}
                >
                  Your profile is saved and ready for first login.
                </p>
              </div>
            </div>

            <div style={divider} />

            {/* Row 2 */}
            <div style={rowStyle}>
              <div style={mutedCircle}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <rect x="4" y="1" width="8" height="14" rx="1.5" stroke="#52525B" strokeWidth="1.4" fill="none" />
                  <line x1="6.5" y1="12.5" x2="9.5" y2="12.5" stroke="#52525B" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 400,
                    fontSize: '0.85rem',
                    color: '#FAFAFA',
                  }}
                >
                  Sign in using the mobile number you registered during setup.
                </p>
              </div>
            </div>

            <div style={divider} />

            {/* Row 3 */}
            <div style={rowStyle}>
              <div style={limeCircle}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <circle cx="8" cy="8" r="6" stroke="#050505" strokeWidth="1.5" fill="none" />
                  <path d="M5.5 8L7.2 9.7L10.5 6.3" stroke="#050505" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 400,
                    fontSize: '0.85rem',
                    color: '#FAFAFA',
                  }}
                >
                  Your verification is complete, so you can log in immediately.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Go to Login button */}
        <div style={{ ...fadeUp(400), paddingTop: 20, paddingBottom: 12 }}>
          <LimeButton onClick={handleGoToLogin}>Go to Login</LimeButton>
        </div>
      </>
    );
  };

  // ─── Render ─────────────────────────────────────────────────────────────
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

        {/* Content — key={step} re-triggers animations */}
        <div
          key={step}
          className="flex flex-1 flex-col"
          style={{
            padding: '0 24px',
            ...(step === 3 ? { overflowY: 'auto' } : {}),
          }}
        >
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
        </div>
      </div>
    </>
  );
}
