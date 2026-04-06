import { useNavigate } from 'react-router-dom';
import {
  Bell,
  User,
  AlertTriangle,
  Lightbulb,
  Utensils,
  Bus,
  ShoppingBag,
  Coffee,
  Wallet,
  CreditCard,
  Mic,
} from 'lucide-react';

// ─── CSS keyframes ───────────────────────────────────────────────────────────
const KEYFRAMES = `
  @keyframes homeFadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
`;

// ─── Animation helper ────────────────────────────────────────────────────────
function fadeUp(delay: number): React.CSSProperties {
  return {
    opacity: 0,
    animation: `homeFadeUp 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms both`,
  };
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

// ─── Main Screen ─────────────────────────────────────────────────────────────
export default function HomeScreen() {
  const navigate = useNavigate();

  return (
    <>
      <style>{KEYFRAMES}</style>
      <div style={{ background: '#050505', paddingBottom: 20 }}>
        {/* Status Bar */}
        <StatusBar />

        {/* Header row */}
        <div
          className="flex items-center justify-between"
          style={{ padding: '0 20px', marginTop: 12, ...fadeUp(100) }}
        >
          <div>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '1rem', color: '#FAFAFA' }}>
              Good Morning, Chathuranga
            </p>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: '#52525B', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4 }}>
              Wednesday, 25 March 2026
            </p>
          </div>
          <div className="flex items-center" style={{ gap: 12 }}>
            {/* Bell icon with red dot */}
            <button
              type="button"
              onClick={() => void navigate('/app/notifications')}
              style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
            >
              <Bell size={22} strokeWidth={1.5} color="#A1A1AA" />
              <span
                style={{
                  position: 'absolute',
                  top: 2,
                  right: 2,
                  width: 6,
                  height: 6,
                  borderRadius: 9999,
                  background: '#EF4444',
                }}
              />
            </button>
            <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
              <User size={22} strokeWidth={1.5} color="#A1A1AA" />
            </button>
          </div>
        </div>

        {/* Hero "Money Left" card */}
        <div style={{ margin: '20px 20px 0', ...fadeUp(200) }}>
          <div style={{ background: '#0A0A0B', border: '1px solid #1C1C1F', borderRadius: 16, padding: '24px 20px' }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: '#52525B', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              MONEY LEFT TODAY
            </p>
            <div className="flex items-center" style={{ gap: 12, marginTop: 8 }}>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: '2.6rem', color: '#FAFAFA', lineHeight: 1.1 }}>
                ₹1,245
              </p>
              <span style={{ background: 'rgba(34,197,94,0.12)', color: '#22C55E', borderRadius: 9999, padding: '4px 12px', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', textTransform: 'uppercase', fontWeight: 600 }}>
                Safe
              </span>
            </div>
            <div className="flex items-center" style={{ marginTop: 16, gap: 0 }}>
              <div>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', color: '#52525B', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Income</p>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.9rem', color: '#22C55E', marginTop: 2 }}>₹2,500</p>
              </div>
              <div style={{ width: 1, height: 32, background: '#1C1C1F', margin: '0 20px' }} />
              <div>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', color: '#52525B', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Spent</p>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.9rem', color: '#EF4444', marginTop: 2 }}>₹1,255</p>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Spending section */}
        <div style={{ padding: '0 20px', marginTop: 24, ...fadeUp(300) }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#FAFAFA' }}>Today's Spending</p>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.9rem', color: '#FAFAFA' }}>₹1,255</p>
          </div>
          <div className="flex" style={{ gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
            {/* Food */}
            <div style={{ background: '#0A0A0B', border: '1px solid #1C1C1F', borderRadius: 14, padding: 16, minWidth: 120, flexShrink: 0 }}>
              <div style={{ width: 36, height: 36, borderRadius: 9999, background: 'rgba(245,158,11,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                <Utensils size={18} strokeWidth={1.5} color="#F59E0B" />
              </div>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', color: '#A1A1AA', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Food</p>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.95rem', color: '#FAFAFA', marginTop: 4 }}>₹580</p>
            </div>
            {/* Transport */}
            <div style={{ background: '#0A0A0B', border: '1px solid #1C1C1F', borderRadius: 14, padding: 16, minWidth: 120, flexShrink: 0 }}>
              <div style={{ width: 36, height: 36, borderRadius: 9999, background: 'rgba(59,130,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                <Bus size={18} strokeWidth={1.5} color="#3B82F6" />
              </div>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', color: '#A1A1AA', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Transport</p>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.95rem', color: '#FAFAFA', marginTop: 4 }}>₹375</p>
            </div>
            {/* Shopping */}
            <div style={{ background: '#0A0A0B', border: '1px solid #1C1C1F', borderRadius: 14, padding: 16, minWidth: 120, flexShrink: 0 }}>
              <div style={{ width: 36, height: 36, borderRadius: 9999, background: 'rgba(168,85,247,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                <ShoppingBag size={18} strokeWidth={1.5} color="#A855F7" />
              </div>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', color: '#A1A1AA', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Shopping</p>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.95rem', color: '#FAFAFA', marginTop: 4 }}>₹300</p>
            </div>
          </div>
        </div>

        {/* Alert banners */}
        <div style={{ padding: '0 20px', marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10, ...fadeUp(400) }}>
          {/* Warning */}
          <div style={{ background: '#111113', border: '1px solid #1C1C1F', borderRadius: 12, padding: '14px 16px' }}>
            <div className="flex items-center" style={{ gap: 10 }}>
              <AlertTriangle size={18} strokeWidth={1.5} color="#F59E0B" />
              <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 400, fontSize: '0.8rem', color: '#A1A1AA' }}>
                You may run out by evening at this rate
              </p>
            </div>
          </div>
          {/* Insight */}
          <div style={{ background: 'rgba(200,255,0,0.06)', border: '1px solid rgba(200,255,0,0.12)', borderRadius: 12, padding: '14px 16px' }}>
            <div className="flex items-center" style={{ gap: 10 }}>
              <Lightbulb size={18} strokeWidth={1.5} color="#C8FF00" />
              <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 400, fontSize: '0.8rem', color: '#A1A1AA' }}>
                Unusual spending on Food today (+40%)
              </p>
            </div>
          </div>
        </div>

        {/* Where Your Money Went Today */}
        <div style={{ padding: '0 20px', marginTop: 24, ...fadeUp(500) }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: '#C8FF00', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 500, marginBottom: 14 }}>
            WHERE YOUR MONEY WENT TODAY
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'Tea & Snacks x4', amount: '₹180' },
              { label: 'Auto Rickshaw x2', amount: '₹175' },
              { label: 'Online Shopping', amount: '₹300' },
            ].map(({ label, amount }) => (
              <div key={label} className="flex items-center justify-between">
                <div className="flex items-center" style={{ gap: 10 }}>
                  <div style={{ width: 6, height: 6, borderRadius: 9999, background: '#C8FF00', flexShrink: 0 }} />
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 400, fontSize: '0.85rem', color: '#A1A1AA' }}>{label}</p>
                </div>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '0.85rem', color: '#FAFAFA' }}>{amount}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div style={{ padding: '0 20px', marginTop: 24, ...fadeUp(600) }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#FAFAFA' }}>Recent Transactions</p>
            <button
              type="button"
              onClick={() => void navigate('/app/transactions')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '0.8rem', color: '#C8FF00' }}
            >
              See All
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { id: '1', name: 'Morning Coffee', category: 'Food', time: '8:30 AM', amount: '-₹45', icon: Coffee },
              { id: '2', name: 'Bus Fare', category: 'Transport', time: '9:15 AM', amount: '-₹25', icon: Bus },
              { id: '3', name: 'Amazon Order', category: 'Shopping', time: '11:45 AM', amount: '-₹300', icon: ShoppingBag },
            ].map(({ id, name, category, time, amount, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => void navigate(`/app/transaction/${id}`)}
                className="flex items-center justify-between"
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, width: '100%' }}
              >
                <div className="flex items-center" style={{ gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: '#111113', border: '1px solid #1C1C1F', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={18} strokeWidth={1.5} color="#A1A1AA" />
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '0.9rem', color: '#FAFAFA' }}>{name}</p>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', color: '#52525B', marginTop: 3 }}>
                      {category} · {time}
                    </p>
                  </div>
                </div>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.9rem', color: '#FAFAFA' }}>{amount}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Wallet section */}
        <div style={{ padding: '0 20px', marginTop: 24, ...fadeUp(700) }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: '#C8FF00', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 500, marginBottom: 14 }}>
            WALLET
          </p>
          <div className="flex" style={{ gap: 10 }}>
            {/* Cash */}
            <div style={{ flex: 1, background: '#0A0A0B', border: '1px solid #1C1C1F', borderRadius: 14, padding: 16 }}>
              <Wallet size={20} strokeWidth={1.5} color="#C8FF00" />
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', color: '#A1A1AA', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 10 }}>Cash</p>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '1rem', color: '#FAFAFA', marginTop: 4 }}>₹2,450</p>
            </div>
            {/* Bank */}
            <div style={{ flex: 1, background: '#0A0A0B', border: '1px solid #1C1C1F', borderRadius: 14, padding: 16 }}>
              <CreditCard size={20} strokeWidth={1.5} color="#C8FF00" />
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', color: '#A1A1AA', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 10 }}>Bank</p>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '1rem', color: '#FAFAFA', marginTop: 4 }}>₹18,750</p>
            </div>
          </div>
        </div>

        {/* Action bar */}
        <div className="flex items-center" style={{ padding: '0 20px', marginTop: 24, gap: 10, ...fadeUp(800) }}>
          <button
            type="button"
            style={{ flex: 1, background: '#C8FF00', color: '#050505', borderRadius: 14, padding: 14, border: 'none', cursor: 'pointer', fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.85rem' }}
          >
            + Add Expense
          </button>
          <button
            type="button"
            style={{ flex: 1, background: 'transparent', color: '#FAFAFA', borderRadius: 14, padding: 14, border: '1px solid #27272A', cursor: 'pointer', fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.85rem' }}
          >
            + Add Income
          </button>
          <button
            type="button"
            onClick={() => void navigate('/app/voice-entry')}
            style={{ width: 48, height: 48, background: 'rgba(200,255,0,0.12)', borderRadius: 14, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
          >
            <Mic size={22} strokeWidth={1.5} color="#C8FF00" />
          </button>
        </div>
      </div>
    </>
  );
}
