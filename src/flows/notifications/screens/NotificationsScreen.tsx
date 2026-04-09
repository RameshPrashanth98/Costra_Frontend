import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';

// ─── CSS keyframes ───────────────────────────────────────────────────────────
const KEYFRAMES = `
  @keyframes notifFadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
`;

function fadeUp(delay: number): React.CSSProperties {
  return {
    opacity: 0,
    animation: `notifFadeUp 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms both`,
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

// ─── Notification types & data ──────────────────────────────────────────────
type NotifType = 'ALERTS' | 'REMINDERS' | 'INCOME';

interface Notification {
  id: number;
  title: string;
  time: string;
  type: NotifType;
  borderColor?: string;
  showLink?: boolean;
  section: 'TODAY' | 'YESTERDAY' | 'THIS WEEK';
}

const NOTIFICATIONS: Notification[] = [
  // TODAY
  { id: 1, title: 'You might run out of budget today', time: '15 min ago', type: 'ALERTS', borderColor: '#EF4444', showLink: true, section: 'TODAY' },
  { id: 2, title: 'You spent more than usual on food this week', time: '2h ago', type: 'ALERTS', borderColor: '#EF4444', section: 'TODAY' },
  { id: 3, title: "Don't forget to add your expenses for today", time: '5h ago', type: 'REMINDERS', section: 'TODAY' },
  { id: 4, title: 'Salary of Rs.45,000 received to Commercial Bank account', time: '8h ago', type: 'INCOME', borderColor: '#3B82F6', section: 'TODAY' },
  // YESTERDAY
  { id: 5, title: 'Your transport spending dropped by 20% this week', time: 'Yesterday, 3:15 PM', type: 'ALERTS', section: 'YESTERDAY' },
  { id: 6, title: 'You have 3 unlogged expenses from yesterday', time: 'Yesterday, 10:00 AM', type: 'REMINDERS', section: 'YESTERDAY' },
  { id: 7, title: 'Great job! You stayed within budget yesterday', time: 'Yesterday, 9:00 AM', type: 'ALERTS', section: 'YESTERDAY' },
  // THIS WEEK
  { id: 8, title: 'Freelance payment of Rs.12,500 received', time: 'Mon, 2:30 PM', type: 'INCOME', borderColor: '#3B82F6', section: 'THIS WEEK' },
  { id: 9, title: 'Electricity bill reminder — CEB due in 3 days', time: 'Mon, 9:00 AM', type: 'REMINDERS', section: 'THIS WEEK' },
  { id: 10, title: 'Weekly spending summary ready', time: 'Sun, 8:00 PM', type: 'REMINDERS', showLink: true, section: 'THIS WEEK' },
];

// ─── Notification Card ───────────────────────────────────────────────────────
interface NotifCardProps {
  title: string;
  time: string;
  borderColor?: string;
  showLink?: boolean;
}

function NotifCard({ title, time, borderColor = '#1C1C1F', showLink = false }: NotifCardProps) {
  return (
    <div style={{ background: '#0A0A0B', border: '1px solid #1C1C1F', borderLeft: `3px solid ${borderColor}`, borderRadius: 14, padding: 16 }}>
      <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '0.85rem', color: '#FAFAFA' }}>{title}</p>
      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', color: '#52525B', marginTop: 6 }}>{time}</p>
      {showLink && (
        <div className="flex items-center" style={{ marginTop: 8, gap: 2 }}>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '0.75rem', color: '#C8FF00' }}>View details</span>
          <ChevronRight size={14} strokeWidth={1.5} color="#C8FF00" />
        </div>
      )}
    </div>
  );
}

// ─── Main Screen ─────────────────────────────────────────────────────────────
const FILTERS = ['ALL', 'ALERTS', 'REMINDERS', 'INCOME'] as const;
type Filter = typeof FILTERS[number];

const SECTIONS = ['TODAY', 'YESTERDAY', 'THIS WEEK'] as const;

export default function NotificationsScreen() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<Filter>('ALL');

  const filtered = activeFilter === 'ALL'
    ? NOTIFICATIONS
    : NOTIFICATIONS.filter((n) => n.type === activeFilter);

  const groupedSections = SECTIONS
    .map((section) => ({
      label: section,
      items: filtered.filter((n) => n.section === section),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <>
      <style>{KEYFRAMES}</style>
      <div style={{ background: '#050505', minHeight: '100dvh', paddingBottom: 20 }}>
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
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: '#FAFAFA', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>
            NOTIFICATIONS
          </span>
          <button
            type="button"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', color: '#C8FF00', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              MARK ALL AS READ
            </span>
          </button>
        </div>

        {/* Filter chips */}
        <div className="flex" style={{ gap: 8, padding: '0 20px', marginTop: 16, overflowX: 'auto', paddingBottom: 4, ...fadeUp(200) }}>
          {FILTERS.map((filter) => {
            const count = filter === 'ALL'
              ? NOTIFICATIONS.length
              : NOTIFICATIONS.filter((n) => n.type === filter).length;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                style={
                  activeFilter === filter
                    ? { padding: '8px 16px', borderRadius: 9999, background: '#C8FF00', border: '1.5px solid #C8FF00', color: '#050505', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.06em', textTransform: 'uppercase' as const, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' as const }
                    : { padding: '8px 16px', borderRadius: 9999, background: 'transparent', border: '1.5px solid #27272A', color: '#A1A1AA', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.06em', textTransform: 'uppercase' as const, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap' as const }
                }
              >
                {filter} ({count})
              </button>
            );
          })}
        </div>

        {/* Notification sections */}
        {groupedSections.length > 0 ? (
          groupedSections.map((group, gi) => (
            <div key={group.label} style={{ padding: '0 20px', marginTop: gi === 0 ? 20 : 24, ...fadeUp(300 + gi * 100) }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: '#52525B', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 12 }}>
                {group.label}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {group.items.map((notif) => (
                  <NotifCard
                    key={notif.id}
                    title={notif.title}
                    time={notif.time}
                    {...(notif.borderColor ? { borderColor: notif.borderColor } : {})}
                    {...(notif.showLink ? { showLink: notif.showLink } : {})}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: '60px 20px', textAlign: 'center', ...fadeUp(300) }}>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '0.9rem', color: '#52525B' }}>
              No notifications
            </p>
          </div>
        )}
      </div>
    </>
  );
}
