import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Settings,
  UserCircle,
  BadgeCheck,
  Wallet,
  Grid3X3,
  IndianRupee,
  Globe,
  Bell,
  CalendarDays,
  MessageSquare,
  MapPin,
  Smartphone,
  CloudUpload,
  ShieldCheck,
  HelpCircle,
  Headphones,
  BookOpen,
  LogOut,
  ChevronRight,
} from 'lucide-react';

// ─── CSS keyframes ───────────────────────────────────────────────────────────
const KEYFRAMES = `
  @keyframes profileFadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes profileSlideIn {
    from { opacity: 0; transform: translateX(-12px); }
    to   { opacity: 1; transform: translateX(0);     }
  }
  @keyframes profileAvatarPop {
    0%   { opacity: 0; transform: scale(0.7); }
    60%  { transform: scale(1.05); }
    100% { opacity: 1; transform: scale(1); }
  }
  @keyframes profileBadgeSlide {
    from { opacity: 0; transform: translateY(8px) scale(0.9); }
    to   { opacity: 1; transform: translateY(0) scale(1);     }
  }
`;

function fadeUp(delay: number): React.CSSProperties {
  return { opacity: 0, animation: `profileFadeUp 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms both` };
}

function slideIn(delay: number): React.CSSProperties {
  return { opacity: 0, animation: `profileSlideIn 0.4s cubic-bezier(0.16,1,0.3,1) ${delay}ms both` };
}

// ─── Status Bar ─────────────────────────────────────────────────────────────
function StatusBar() {
  return (
    <div className="flex items-center justify-between" style={{ padding: '12px 24px 8px' }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: '#FAFAFA', fontWeight: 600 }}>
        9:41
      </span>
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

// ─── Toggle Switch ──────────────────────────────────────────────────────────
function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      style={{
        width: 48,
        height: 28,
        borderRadius: 14,
        border: 'none',
        cursor: 'pointer',
        background: on ? '#C8FF00' : '#27272A',
        position: 'relative',
        transition: 'background 0.25s ease',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: 11,
          background: on ? '#050505' : '#71717A',
          position: 'absolute',
          top: 3,
          left: on ? 23 : 3,
          transition: 'left 0.25s cubic-bezier(0.16,1,0.3,1), background 0.25s ease',
        }}
      />
    </button>
  );
}

// ─── Section Row ────────────────────────────────────────────────────────────
interface RowProps {
  icon: React.ElementType;
  label: string;
  value?: string;
  hasChevron?: boolean;
  toggle?: { on: boolean; onToggle: () => void };
  subtitle?: string;
  delay: number;
  isFirst?: boolean;
  isLast?: boolean;
}

function SectionRow({ icon: Icon, label, value, hasChevron = true, toggle, subtitle, delay, isFirst, isLast }: RowProps) {
  return (
    <div
      className="flex items-center justify-between"
      style={{
        padding: subtitle ? '14px 16px' : '16px 16px',
        background: '#0A0A0B',
        borderLeft: '1px solid #1C1C1F',
        borderRight: '1px solid #1C1C1F',
        borderTop: isFirst ? '1px solid #1C1C1F' : 'none',
        borderBottom: '1px solid #1C1C1F',
        borderRadius: isFirst && isLast ? 14 : isFirst ? '14px 14px 0 0' : isLast ? '0 0 14px 14px' : 0,
        ...slideIn(delay),
      }}
    >
      <div className="flex items-center" style={{ gap: 12, flex: 1, minWidth: 0 }}>
        <Icon size={18} strokeWidth={1.5} color="#C8FF00" style={{ flexShrink: 0 }} />
        <div style={{ minWidth: 0 }}>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 400, fontSize: '0.85rem', color: '#FAFAFA' }}>
            {label}
          </p>
          {subtitle && (
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.5rem', color: '#52525B', marginTop: 2 }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center" style={{ gap: 6, flexShrink: 0 }}>
        {value && (
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.65rem',
            color: '#A1A1AA',
          }}>
            {value}
          </span>
        )}
        {toggle && <Toggle on={toggle.on} onToggle={toggle.onToggle} />}
        {hasChevron && !toggle && <ChevronRight size={16} strokeWidth={1.5} color="#52525B" />}
      </div>
    </div>
  );
}

// ─── Section Header ─────────────────────────────────────────────────────────
function SectionHeader({ title, delay }: { title: string; delay: number }) {
  return (
    <p style={{
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 600,
      fontSize: '0.85rem',
      color: '#C8FF00',
      marginBottom: 10,
      marginTop: 24,
      ...fadeUp(delay),
    }}>
      {title}
    </p>
  );
}

// ─── Main Profile Screen ────────────────────────────────────────────────────
export default function ProfileScreen() {
  const navigate = useNavigate();
  const [smsTracking, setSmsTracking] = useState(true);
  const [autoCategorization, setAutoCategorization] = useState(true);

  return (
    <>
      <style>{KEYFRAMES}</style>
      <div style={{ background: '#050505', paddingBottom: 20 }}>
        {/* Status Bar */}
        <StatusBar />

        {/* Header */}
        <div
          className="flex items-center justify-between"
          style={{ padding: '0 20px', marginTop: 8, ...fadeUp(100) }}
        >
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1.6rem', color: '#FAFAFA' }}>
            Profile
          </h1>
          <button
            type="button"
            onClick={() => void navigate('/app/profile/settings')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
          >
            <Settings size={22} strokeWidth={1.5} color="#A1A1AA" />
          </button>
        </div>

        {/* ─── Profile Card ──────────────────────────────────────────── */}
        <div style={{ margin: '20px 20px 0', ...fadeUp(200) }}>
          <div
            style={{
              background: '#0A0A0B',
              border: '1px solid #1C1C1F',
              borderRadius: 16,
              padding: '28px 20px 24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 9999,
                background: 'rgba(200,255,0,0.08)',
                border: '2px solid rgba(200,255,0,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'profileAvatarPop 0.5s cubic-bezier(0.16,1,0.3,1) 0.3s both',
              }}
            >
              <UserCircle size={40} strokeWidth={1} color="#C8FF00" />
            </div>

            {/* Name */}
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 600,
              fontSize: '1.15rem',
              color: '#FAFAFA',
              marginTop: 14,
            }}>
              Chathuranga Silva
            </p>

            {/* Phone */}
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.65rem',
              color: '#A1A1AA',
              marginTop: 4,
            }}>
              +94 72 3099 110
            </p>

            {/* Verified Badge */}
            <div
              style={{
                marginTop: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: 'rgba(200,255,0,0.08)',
                border: '1px solid rgba(200,255,0,0.2)',
                borderRadius: 9999,
                padding: '5px 14px',
                animation: 'profileBadgeSlide 0.4s cubic-bezier(0.16,1,0.3,1) 0.6s both',
              }}
            >
              <BadgeCheck size={14} strokeWidth={2} color="#C8FF00" />
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.6rem',
                fontWeight: 600,
                color: '#C8FF00',
                letterSpacing: '0.04em',
              }}>
                Verified Member
              </span>
            </div>
          </div>
        </div>

        {/* ─── Financial Setup ───────────────────────────────────────── */}
        <div style={{ padding: '0 20px' }}>
          <SectionHeader title="Financial Setup" delay={300} />
          <SectionRow icon={Wallet} label="Income Type" value="Monthly" delay={320} isFirst isLast={false} />
          <SectionRow icon={Grid3X3} label="Spending Categories" value="8 active" delay={340} />
          <SectionRow icon={IndianRupee} label="Currency" value="SLRP (LKR)" delay={360} isLast />
        </div>

        {/* ─── Preferences ───────────────────────────────────────────── */}
        <div style={{ padding: '0 20px' }}>
          <SectionHeader title="Preferences" delay={400} />
          <SectionRow icon={Globe} label="Language" value="English" delay={420} isFirst isLast={false} />
          <SectionRow icon={Bell} label="Notifications" value="On" delay={440} />
          <SectionRow icon={CalendarDays} label="Financial Mode" value="Daily" delay={460} isLast />
        </div>

        {/* ─── Automation ────────────────────────────────────────────── */}
        <div style={{ padding: '0 20px' }}>
          <SectionHeader title="Automation" delay={500} />
          <SectionRow
            icon={MessageSquare}
            label="SMS Tracking"
            subtitle="Auto-detect expenses from SMS"
            toggle={{ on: smsTracking, onToggle: () => setSmsTracking(!smsTracking) }}
            hasChevron={false}
            delay={520}
            isFirst
            isLast={false}
          />
          <SectionRow
            icon={MapPin}
            label="Auto-Categorization"
            subtitle="Automatically sort expenses"
            toggle={{ on: autoCategorization, onToggle: () => setAutoCategorization(!autoCategorization) }}
            hasChevron={false}
            delay={540}
            isLast
          />
        </div>

        {/* ─── Security & Account ────────────────────────────────────── */}
        <div style={{ padding: '0 20px' }}>
          <SectionHeader title="Security & Account" delay={580} />
          <SectionRow icon={Smartphone} label="Phone Login" value="+94 •••• 7131" delay={600} isFirst isLast={false} />
          <SectionRow icon={CloudUpload} label="Backup & Sync" value="Last: Today" delay={620} />
          <SectionRow icon={ShieldCheck} label="Data Privacy" delay={640} isLast />
        </div>

        {/* ─── Support & Help ────────────────────────────────────────── */}
        <div style={{ padding: '0 20px' }}>
          <SectionHeader title="Support & Help" delay={680} />
          <SectionRow icon={HelpCircle} label="Help Center" delay={700} isFirst isLast={false} />
          <SectionRow icon={Headphones} label="Contact Support" delay={720} />
          <SectionRow icon={BookOpen} label="FAQ & Guidance" delay={740} isLast />
        </div>

        {/* ─── Log Out Button ────────────────────────────────────────── */}
        <div style={{ padding: '0 20px', marginTop: 24, ...fadeUp(780) }}>
          <button
            type="button"
            onClick={() => void navigate('/')}
            style={{
              width: '100%',
              background: 'transparent',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: 14,
              padding: 14,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              transition: 'background 0.2s ease, border-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(239,68,68,0.08)';
              e.currentTarget.style.borderColor = 'rgba(239,68,68,0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)';
            }}
          >
            <LogOut size={18} strokeWidth={1.5} color="#EF4444" />
            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 600,
              fontSize: '0.9rem',
              color: '#EF4444',
            }}>
              Log Out
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
