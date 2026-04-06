import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  IndianRupee,
  Globe,
  Moon,
  CalendarDays,
  Grid3X3,
  Wallet,
  Bell,
  AlertTriangle,
  Clock,
  MessageSquare,
  Sparkles,
  CloudUpload,
  Trash2,
  ShieldCheck,
  Info,
  BookOpen,
} from 'lucide-react';

// ─── CSS keyframes ───────────────────────────────────────────────────────────
const KEYFRAMES = `
  @keyframes settingsFadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes settingsSlideIn {
    from { opacity: 0; transform: translateX(-12px); }
    to   { opacity: 1; transform: translateX(0);     }
  }
  @keyframes settingsHeaderSlide {
    from { opacity: 0; transform: translateX(-20px); }
    to   { opacity: 1; transform: translateX(0);     }
  }
`;

function fadeUp(delay: number): React.CSSProperties {
  return { opacity: 0, animation: `settingsFadeUp 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms both` };
}

function slideIn(delay: number): React.CSSProperties {
  return { opacity: 0, animation: `settingsSlideIn 0.4s cubic-bezier(0.16,1,0.3,1) ${delay}ms both` };
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

// ─── Settings Row ───────────────────────────────────────────────────────────
interface RowProps {
  icon: React.ElementType;
  label: string;
  value?: string;
  hasChevron?: boolean;
  toggle?: { on: boolean; onToggle: () => void };
  subtitle?: string;
  danger?: boolean;
  delay: number;
  isFirst?: boolean;
  isLast?: boolean;
}

function SettingsRow({ icon: Icon, label, value, hasChevron = true, toggle, subtitle, danger, delay, isFirst, isLast }: RowProps) {
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
        <Icon size={18} strokeWidth={1.5} color={danger ? '#EF4444' : '#C8FF00'} style={{ flexShrink: 0 }} />
        <div style={{ minWidth: 0 }}>
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 400,
            fontSize: '0.85rem',
            color: danger ? '#EF4444' : '#FAFAFA',
          }}>
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
function SectionTitle({ title, delay }: { title: string; delay: number }) {
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

// ─── Main Settings Screen ───────────────────────────────────────────────────
export default function SettingsScreen() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [enableAlerts, setEnableAlerts] = useState(true);
  const [spendingWarnings, setSpendingWarnings] = useState(true);
  const [smsSync, setSmsSync] = useState(true);
  const [autoCateg, setAutoCateg] = useState(true);

  return (
    <>
      <style>{KEYFRAMES}</style>
      <div style={{ background: '#050505', paddingBottom: 20 }}>
        {/* Status Bar */}
        <StatusBar />

        {/* Header with back arrow */}
        <div
          className="flex items-center"
          style={{
            padding: '0 20px',
            marginTop: 8,
            gap: 12,
            opacity: 0,
            animation: 'settingsHeaderSlide 0.5s cubic-bezier(0.16,1,0.3,1) 100ms both',
          }}
        >
          <button
            type="button"
            onClick={() => void navigate('/app/profile')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
          >
            <ChevronLeft size={24} strokeWidth={1.5} color="#FAFAFA" />
          </button>
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1.4rem', color: '#FAFAFA' }}>
            Settings
          </h1>
        </div>

        {/* ─── General Settings ──────────────────────────────────────── */}
        <div style={{ padding: '0 20px' }}>
          <SectionTitle title="General Settings" delay={150} />
          <SettingsRow icon={IndianRupee} label="Currency" value="LKR (Rs.)" delay={170} isFirst isLast={false} />
          <SettingsRow icon={Globe} label="Language" value="English" delay={190} />
          <SettingsRow
            icon={Moon}
            label="Dark Mode"
            toggle={{ on: darkMode, onToggle: () => setDarkMode(!darkMode) }}
            hasChevron={false}
            delay={210}
            isLast
          />
        </div>

        {/* ─── Financial Settings ────────────────────────────────────── */}
        <div style={{ padding: '0 20px' }}>
          <SectionTitle title="Financial Settings" delay={250} />
          <SettingsRow
            icon={CalendarDays}
            label="Default Financial Mode"
            subtitle="Track spending daily or weekly"
            value="Daily"
            delay={270}
            isFirst
            isLast={false}
          />
          <SettingsRow icon={Grid3X3} label="Default Categories" delay={290} />
          <SettingsRow icon={Wallet} label="Income Type" value="Mixed" delay={310} isLast />
        </div>

        {/* ─── Notification Settings ─────────────────────────────────── */}
        <div style={{ padding: '0 20px' }}>
          <SectionTitle title="Notification Settings" delay={350} />
          <SettingsRow
            icon={Bell}
            label="Enable Alerts"
            toggle={{ on: enableAlerts, onToggle: () => setEnableAlerts(!enableAlerts) }}
            hasChevron={false}
            delay={370}
            isFirst
            isLast={false}
          />
          <SettingsRow
            icon={AlertTriangle}
            label="Spending Warnings"
            subtitle="Get notified when budget is low"
            toggle={{ on: spendingWarnings, onToggle: () => setSpendingWarnings(!spendingWarnings) }}
            hasChevron={false}
            delay={390}
          />
          <SettingsRow icon={Clock} label="Reminder Frequency" value="Daily at 9 PM" delay={410} isLast />
        </div>

        {/* ─── Automation Settings ───────────────────────────────────── */}
        <div style={{ padding: '0 20px' }}>
          <SectionTitle title="Automation Settings" delay={450} />
          <SettingsRow
            icon={MessageSquare}
            label="SMS Sync Tracking"
            subtitle="Auto-track from bank SMS"
            toggle={{ on: smsSync, onToggle: () => setSmsSync(!smsSync) }}
            hasChevron={false}
            delay={470}
            isFirst
            isLast={false}
          />
          <SettingsRow
            icon={Sparkles}
            label="Auto-categorization"
            toggle={{ on: autoCateg, onToggle: () => setAutoCateg(!autoCateg) }}
            hasChevron={false}
            delay={490}
            isLast
          />
        </div>

        {/* ─── Data & Backup ─────────────────────────────────────────── */}
        <div style={{ padding: '0 20px' }}>
          <SectionTitle title="Data & Backup" delay={530} />
          <SettingsRow
            icon={CloudUpload}
            label="Backup & Sync"
            subtitle="Last synced: 2 mins ago"
            delay={550}
            isFirst
            isLast={false}
          />
          <SettingsRow icon={Trash2} label="Reset All Data" danger delay={570} isLast />
        </div>

        {/* ─── Privacy & Security ────────────────────────────────────── */}
        <div style={{ padding: '0 20px' }}>
          <SectionTitle title="Privacy & Security" delay={610} />
          <SettingsRow icon={ShieldCheck} label="Data Permissions" delay={630} isFirst isLast={false} />
          <SettingsRow icon={Info} label="Privacy Information" delay={650} isLast />
        </div>

        {/* ─── App Information ───────────────────────────────────────── */}
        <div style={{ padding: '0 20px' }}>
          <SectionTitle title="App Information" delay={690} />
          <SettingsRow icon={Info} label="Version" value="v2.4.0" hasChevron={false} delay={710} isFirst isLast={false} />
          <SettingsRow icon={BookOpen} label="Terms & Conditions" delay={730} />
          <SettingsRow icon={Info} label="About" delay={750} isLast />
        </div>
      </div>
    </>
  );
}

