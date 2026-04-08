import { useNavigate } from 'react-router-dom';
import { Check, Landmark, Lightbulb } from 'lucide-react';

// ---- CSS keyframes --------------------------------------------------------
const KEYFRAMES = `
  @keyframes successFadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes successScale {
    0%   { transform: scale(0); }
    60%  { transform: scale(1.15); }
    100% { transform: scale(1); }
  }
`;

function fadeUp(delay: number): React.CSSProperties {
  return {
    opacity: 0,
    animation: `successFadeUp 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms both`,
  };
}

// ---- Summary row ----------------------------------------------------------
function SummaryRow({
  label,
  value,
  icon,
  isLast,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  isLast?: boolean;
}) {
  return (
    <>
      <div className="flex items-center justify-between" style={{ padding: '14px 0' }}>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.6rem',
            color: '#52525B',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontWeight: 500,
          }}
        >
          {label}
        </span>
        <div className="flex items-center" style={{ gap: 6 }}>
          {icon}
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 400,
              fontSize: '0.85rem',
              color: '#FAFAFA',
            }}
          >
            {value}
          </span>
        </div>
      </div>
      {!isLast && <div style={{ height: 1, background: '#1C1C1F' }} />}
    </>
  );
}

// ---- Main Screen ----------------------------------------------------------
export default function IncomeAddedScreen() {
  const navigate = useNavigate();

  return (
    <>
      <style>{KEYFRAMES}</style>
      <div
        className="flex flex-col items-center"
        style={{ background: '#050505', minHeight: '100dvh', padding: '60px 20px 40px' }}
      >
        {/* Checkmark circle */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 9999,
            background: '#C8FF00',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'successScale 0.6s cubic-bezier(0.16,1,0.3,1) both',
          }}
        >
          <Check size={36} strokeWidth={2.5} color="#050505" />
        </div>

        {/* Heading */}
        <h1
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            fontSize: '1.8rem',
            color: '#FAFAFA',
            lineHeight: 1.15,
            marginTop: 24,
            textAlign: 'center',
            ...fadeUp(200),
          }}
        >
          Income Added!
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 300,
            fontSize: '0.85rem',
            color: '#A1A1AA',
            lineHeight: 1.65,
            marginTop: 8,
            textAlign: 'center',
            ...fadeUp(250),
          }}
        >
          Your income has been recorded successfully
        </p>

        {/* Summary card */}
        <div
          style={{
            width: '100%',
            marginTop: 32,
            background: '#0A0A0B',
            border: '1px solid #1C1C1F',
            borderRadius: 16,
            padding: '4px 20px',
            ...fadeUp(350),
          }}
        >
          <SummaryRow label="Amount" value={'Rs.25,000'} />
          <SummaryRow label="Income Type" value="Salary" />
          <SummaryRow
            label="Source"
            value="Job"
            icon={<Landmark size={14} strokeWidth={1.5} color="#A1A1AA" />}
          />
          <SummaryRow label="Received Via" value="Bank" />
          <SummaryRow label="Date & Time" value="Today, 9:41 AM" isLast />
        </div>

        {/* Insight banner */}
        <div
          className="flex items-center w-full"
          style={{
            gap: 10,
            marginTop: 16,
            background: 'rgba(200,255,0,0.06)',
            border: '1px solid rgba(200,255,0,0.12)',
            borderRadius: 14,
            padding: '14px 16px',
            ...fadeUp(450),
          }}
        >
          <Lightbulb size={18} strokeWidth={1.5} color="#C8FF00" style={{ flexShrink: 0 }} />
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 400,
              fontSize: '0.8rem',
              color: '#A1A1AA',
              lineHeight: 1.5,
            }}
          >
            Great! You've received 50% of this month's expected income. Keep it up!
          </p>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1, minHeight: 32 }} />

        {/* CTAs */}
        <div className="w-full" style={{ display: 'flex', flexDirection: 'column', gap: 12, ...fadeUp(550) }}>
          <button
            type="button"
            onClick={() => void navigate('/app/track?tab=income')}
            style={{
              width: '100%',
              padding: 16,
              background: '#C8FF00',
              color: '#050505',
              borderRadius: 14,
              border: 'none',
              cursor: 'pointer',
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 600,
              fontSize: '1rem',
            }}
          >
            Add Another Income
          </button>
          <button
            type="button"
            onClick={() => void navigate('/app')}
            style={{
              width: '100%',
              padding: 16,
              background: 'transparent',
              color: '#FAFAFA',
              borderRadius: 14,
              border: '1px solid #27272A',
              cursor: 'pointer',
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 600,
              fontSize: '1rem',
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    </>
  );
}
