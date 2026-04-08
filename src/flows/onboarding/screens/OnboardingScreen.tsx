import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ─── CSS keyframes injected once ───────────────────────────────────────────
const KEYFRAMES = `
  @keyframes onboardFadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
`;

// ─── Animation helper ───────────────────────────────────────────────────────
function fadeUp(delay: number): React.CSSProperties {
  return {
    opacity: 0,
    animation: `onboardFadeUp 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms both`,
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

// ─── Slide data types ────────────────────────────────────────────────────────
type BulletsCard = {
  type: 'bullets';
  bullets: { bold?: boolean; text: string }[];
};
type AmountCard = {
  type: 'amount';
  label: string;
  amount: string;
  caption: string;
};
type LabeledBulletsCard = {
  type: 'labeled-bullets';
  label: string;
  heading: string;
  bullets: string[];
};
type CardData = BulletsCard | AmountCard | LabeledBulletsCard;

interface SlideData {
  id: number;
  eyebrow?: string;
  hasLogo?: boolean;
  title: string;
  body: string;
  card: CardData;
  supportingText?: string;
  hero: string;
  heroPosition?: string;
  cta: string;
  showSkip?: boolean;
}

// ─── Slide definitions ───────────────────────────────────────────────────────
const SLIDES: SlideData[] = [
  {
    id: 1,
    eyebrow: 'WELCOME TO COSTRA',
    hasLogo: true,
    title: 'Daily money control for real life.',
    body: 'Built for Sri Lankan households who need flexible daily and weekly control instead of rigid monthly budgeting.',
    card: {
      type: 'bullets',
      bullets: [
        { bold: true, text: 'Track money day by day, even with unstable income' },
        { text: 'See where small expenses go before they pile up' },
        { text: 'Get alerts before borrowing, overspending, or shortfalls' },
      ],
    },
    hero: '/hifi-heroes/onboarding-1.png',
    heroPosition: 'center center',
    cta: 'Continue',
    showSkip: true,
  },
  {
    id: 2,
    eyebrow: 'FLEXIBLE DAILY CONTROL',
    title: 'Budget around unstable income.',
    body: 'When income changes from day to day, Costra helps you focus on what is left now, not on impossible monthly plans.',
    card: {
      type: 'amount',
      label: 'MONEY LEFT TODAY',
      amount: 'Rs.1,480',
      caption:
        'Switch to Weekly mode when income settles, or stay in Daily mode when every rupee matters.',
    },
    supportingText:
      'You always know today\'s balance, weekly burn, and when borrowing risk is getting closer.',
    hero: '/hifi-heroes/onboarding-2.png',
    heroPosition: 'center center',
    cta: 'Next',
  },
  {
    id: 3,
    title: 'Track in seconds, not in spreadsheets.',
    body: 'Costra reduces effort with one-tap logging, voice capture, and automation so tracking can survive busy, stressful days.',
    card: {
      type: 'labeled-bullets',
      label: 'ONE TAP OR VOICE',
      heading:
        'Log an expense in one motion, speak it out loud, or let Costra prepare entries from SMS patterns.',
      bullets: [
        'One-tap categories for daily essentials',
        'Voice entry when typing feels like too much work',
        'Automation that cuts repeat effort every week',
      ],
    },
    hero: '/hifi-heroes/onboarding-3.png',
    heroPosition: 'center 66%',
    cta: 'Next',
  },
  {
    id: 4,
    title: 'See problems before money disappears.',
    body: 'Costra turns small expenses, daily summaries, and unusual trends into alerts you can act on before the week gets harder.',
    card: {
      type: 'labeled-bullets',
      label: 'SMART ALERTS',
      heading: 'Food spending is 12% higher than usual this week.',
      bullets: [
        'Daily summaries show where money went',
        'Micro-spend patterns reveal the hidden drain',
        'Warnings help you react before borrowing starts',
      ],
    },
    supportingText:
      'Start simple, stay consistent, and let the app carry more of the financial mental load.',
    hero: '/hifi-heroes/onboarding-4.png',
    heroPosition: 'center 64%',
    cta: 'Get Started',
  },
];

// ─── Card renderer ───────────────────────────────────────────────────────────
function SlideCard({ card }: { card: CardData }) {
  const cardStyle: React.CSSProperties = {
    background: '#0A0A0B',
    borderRadius: 16,
    border: '1px solid #1C1C1F',
    padding: '20px',
  };

  if (card.type === 'bullets') {
    return (
      <div style={cardStyle}>
        {card.bullets.map((b, i) => (
          <p
            key={i}
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '0.85rem',
              lineHeight: 1.6,
              color: b.bold ? '#FAFAFA' : '#A1A1AA',
              fontWeight: b.bold ? 600 : 300,
              marginBottom: i < card.bullets.length - 1 ? 8 : 0,
            }}
          >
            {`\u2022 ${b.text}`}
          </p>
        ))}
      </div>
    );
  }

  if (card.type === 'amount') {
    return (
      <div style={cardStyle}>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.6rem',
            color: '#52525B',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontWeight: 500,
            marginBottom: 6,
          }}
        >
          {card.label}
        </p>
        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            fontSize: '2rem',
            lineHeight: 1.1,
            color: '#FAFAFA',
            marginBottom: 10,
          }}
        >
          {card.amount}
        </p>
        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 300,
            fontSize: '0.82rem',
            lineHeight: 1.6,
            color: '#A1A1AA',
          }}
        >
          {card.caption}
        </p>
      </div>
    );
  }

  // labeled-bullets
  return (
    <div style={cardStyle}>
      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.6rem',
          color: '#C8FF00',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          fontWeight: 500,
          marginBottom: 10,
        }}
      >
        {card.label}
      </p>
      <p
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 700,
          fontSize: '0.95rem',
          lineHeight: 1.45,
          color: '#FAFAFA',
          marginBottom: 12,
        }}
      >
        {card.heading}
      </p>
      {card.bullets.map((b, i) => (
        <p
          key={i}
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '0.82rem',
            lineHeight: 1.6,
            color: '#A1A1AA',
            fontWeight: 300,
            marginBottom: i < card.bullets.length - 1 ? 6 : 0,
          }}
        >
          {`\u2022 ${b}`}
        </p>
      ))}
    </div>
  );
}

// ─── Pagination dots ─────────────────────────────────────────────────────────
function PaginationDots({ total, active }: { total: number; active: number }) {
  return (
    <div className="flex items-center justify-center" style={{ gap: 8 }}>
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            width: i === active ? 10 : 8,
            height: i === active ? 10 : 8,
            borderRadius: '50%',
            background: i === active ? '#C8FF00' : '#2A2A20',
            transition: 'all 0.3s ease',
          }}
        />
      ))}
    </div>
  );
}

// ─── Main screen ─────────────────────────────────────────────────────────────
export default function OnboardingScreen() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const next = () => {
    if (index < 3) {
      setIndex((i) => i + 1);
    } else {
      void navigate('/login');
    }
  };

  const skip = () => {
    void navigate('/login');
  };

  // SLIDES is a fixed-length array; index is always 0-3
  const slide = SLIDES[index]!;

  return (
    <>
      <style>{KEYFRAMES}</style>

      {/* Full screen dark bg — uses height not min-height; AuthLayout handles viewport */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100dvh',
          background: '#050505',
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: 'max(env(safe-area-inset-bottom), 16px)',
          overflow: 'hidden',
        }}
      >
        {/* Status bar */}
        <StatusBar />

        {/* Slide content — keyed on index to re-trigger animations */}
        <div
          key={index}
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: 'auto',
            padding: '0 24px',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {/* Brand logo (slide 1 only) */}
          {slide.hasLogo && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: 24,
                paddingBottom: 32,
                ...fadeUp(0),
              }}
            >
              <img
                src="/logos/costra-icon.png"
                alt=""
                width={48}
                height={48}
                style={{ borderRadius: 6 }}
                aria-hidden="true"
              />
              <span
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 900,
                  fontSize: '0.95rem',
                  letterSpacing: '0.15em',
                  color: '#FAFAFA',
                  marginTop: 10,
                }}
              >
                COSTRA
              </span>
            </div>
          )}

          {/* Eyebrow */}
          {slide.eyebrow && (
            <div style={{ marginBottom: 12, ...fadeUp(slide.hasLogo ? 60 : 0) }}>
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
                {slide.eyebrow}
              </p>
            </div>
          )}

          {/* Title */}
          <div style={{ marginBottom: 10, ...fadeUp(slide.hasLogo ? 120 : 80) }}>
            <h1
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: '1.65rem',
                lineHeight: 1.2,
                color: '#FAFAFA',
              }}
            >
              {slide.title}
            </h1>
          </div>

          {/* Body */}
          <div style={{ marginBottom: 16, ...fadeUp(slide.hasLogo ? 180 : 160) }}>
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 300,
                fontSize: '0.85rem',
                lineHeight: 1.65,
                color: '#A1A1AA',
              }}
            >
              {slide.body}
            </p>
          </div>

          {/* Content card */}
          <div style={{ marginBottom: 16, ...fadeUp(slide.hasLogo ? 240 : 240) }}>
            <SlideCard card={slide.card} />
          </div>

          {/* Supporting text (slides 2 & 4) */}
          {slide.supportingText && (
            <div style={{ marginBottom: 14, ...fadeUp(300) }}>
              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  lineHeight: 1.55,
                  color: '#FAFAFA',
                }}
              >
                {slide.supportingText}
              </p>
            </div>
          )}

          {/* Hero image */}
          <div style={{ marginBottom: 8, ...fadeUp(320) }}>
            <div
              style={{
                width: '100%',
                height: 140,
                borderRadius: 16,
                overflow: 'hidden',
                backgroundImage: `url(${slide.hero})`,
                backgroundSize: 'cover',
                backgroundPosition: slide.heroPosition ?? 'center 64%',
                backgroundRepeat: 'no-repeat',
              }}
            />
          </div>
        </div>

        {/* Bottom chrome — pagination + CTA */}
        <div
          style={{ padding: '16px 24px 0', display: 'flex', flexDirection: 'column', gap: 14 }}
        >
          {/* Pagination dots */}
          <div style={fadeUp(400)}>
            <PaginationDots total={4} active={index} />
          </div>

          {/* CTA button */}
          <div style={fadeUp(440)}>
            <button
              type="button"
              onClick={next}
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
                cursor: 'pointer',
                transition: 'transform 0.1s ease',
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
              {slide.cta}
            </button>
          </div>

          {/* Skip link — slide 1 only */}
          {slide.showSkip && (
            <div className="flex items-center justify-center" style={fadeUp(480)}>
              <button
                type="button"
                onClick={skip}
                style={{
                  background: 'none',
                  border: 'none',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '0.85rem',
                  color: '#52525B',
                  cursor: 'pointer',
                  padding: '4px 8px',
                }}
              >
                Skip for now
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
