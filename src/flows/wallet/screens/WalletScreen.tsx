import { useNavigate } from 'react-router-dom';
import {
  Settings,
  Wallet,
  Landmark,
  ArrowDownLeft,
  ArrowUpRight,
  Plus,
  RefreshCw,
  Utensils,
  Bus,
  ArrowDownRight,
} from 'lucide-react';

// ─── CSS keyframes ───────────────────────────────────────────────────────────
const KEYFRAMES = `
  @keyframes walletFadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes walletSlideIn {
    from { opacity: 0; transform: translateX(-12px); }
    to   { opacity: 1; transform: translateX(0);     }
  }
  @keyframes walletPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); }
  }
  @keyframes walletCountUp {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0);   }
  }
  @keyframes walletCardShine {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
`;

// ─── Animation helper ────────────────────────────────────────────────────────
function fadeUp(delay: number): React.CSSProperties {
  return {
    opacity: 0,
    animation: `walletFadeUp 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms both`,
  };
}

function slideIn(delay: number): React.CSSProperties {
  return {
    opacity: 0,
    animation: `walletSlideIn 0.4s cubic-bezier(0.16,1,0.3,1) ${delay}ms both`,
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

// ─── Transaction Row ────────────────────────────────────────────────────────
interface TransactionProps {
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  name: string;
  source: string;
  time: string;
  amount: string;
  isPositive?: boolean;
  delay: number;
}

function TransactionRow({ icon: Icon, iconBg, iconColor, name, source, time, amount, isPositive, delay }: TransactionProps) {
  return (
    <div
      className="flex items-center justify-between"
      style={{ padding: '14px 0', ...slideIn(delay) }}
    >
      <div className="flex items-center" style={{ gap: 12 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            background: iconBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Icon size={20} strokeWidth={1.5} color={iconColor} />
        </div>
        <div>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '0.9rem', color: '#FAFAFA' }}>
            {name}
          </p>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', color: '#52525B', marginTop: 3 }}>
            {source} · {time}
          </p>
        </div>
      </div>
      <p style={{
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 600,
        fontSize: '0.9rem',
        color: isPositive ? '#C8FF00' : '#FAFAFA',
      }}>
        {amount}
      </p>
    </div>
  );
}

// ─── Main Wallet Screen ─────────────────────────────────────────────────────
export default function WalletScreen() {
  const navigate = useNavigate();

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
          <h1 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
            fontSize: '1.6rem',
            color: '#FAFAFA',
          }}>
            Wallet
          </h1>
          <button
            type="button"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
          >
            <Settings size={22} strokeWidth={1.5} color="#A1A1AA" />
          </button>
        </div>

        {/* ─── Total Available Card ─────────────────────────────────────── */}
        <div style={{ margin: '20px 20px 0', ...fadeUp(200) }}>
          <div
            style={{
              background: '#0A0A0B',
              border: '1px solid #1C1C1F',
              borderRadius: 16,
              padding: '24px 20px 20px',
              animation: 'walletPulse 3s ease-in-out 1s 1',
            }}
          >
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.6rem',
              color: '#52525B',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
            }}>
              Total Available
            </p>
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 900,
              fontSize: '2.6rem',
              color: '#FAFAFA',
              lineHeight: 1.1,
              marginTop: 8,
              animation: 'walletCountUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.4s both',
            }}>
              Rs.21,200
            </p>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.55rem',
              color: '#52525B',
              marginTop: 6,
            }}>
              Cash + Bank
            </p>

            {/* Cash / Bank split */}
            <div
              className="flex items-center"
              style={{
                marginTop: 16,
                borderTop: '1px solid #1C1C1F',
                paddingTop: 16,
              }}
            >
              <div style={{ flex: 1 }}>
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  fontSize: '1rem',
                  color: '#FAFAFA',
                }}>
                  Rs.2,450
                </p>
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.55rem',
                  color: '#52525B',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginTop: 3,
                }}>
                  Cash
                </p>
              </div>
              <div style={{ width: 1, height: 32, background: '#1C1C1F' }} />
              <div style={{ flex: 1, textAlign: 'right' }}>
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  fontSize: '1rem',
                  color: '#FAFAFA',
                }}>
                  Rs.18,750
                </p>
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.55rem',
                  color: '#52525B',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginTop: 3,
                }}>
                  Bank
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Accounts ─────────────────────────────────────────────────── */}
        <div style={{ padding: '0 20px', marginTop: 24, ...fadeUp(300) }}>
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
            fontSize: '1rem',
            color: '#FAFAFA',
            marginBottom: 14,
          }}>
            Accounts
          </p>
          <div className="flex" style={{ gap: 10 }}>
            {/* Cash card */}
            <div
              style={{
                flex: 1,
                background: '#0A0A0B',
                border: '1px solid #1C1C1F',
                borderRadius: 14,
                padding: 16,
                cursor: 'pointer',
                transition: 'border-color 0.2s ease, transform 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#C8FF00';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1C1C1F';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: 'rgba(200,255,0,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Wallet size={18} strokeWidth={1.5} color="#C8FF00" />
              </div>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.55rem',
                color: '#A1A1AA',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginTop: 12,
              }}>
                Cash
              </p>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                fontSize: '1.05rem',
                color: '#FAFAFA',
                marginTop: 4,
              }}>
                Rs.2,450
              </p>
            </div>

            {/* Bank card */}
            <div
              style={{
                flex: 1,
                background: '#0A0A0B',
                border: '1px solid #1C1C1F',
                borderRadius: 14,
                padding: 16,
                cursor: 'pointer',
                transition: 'border-color 0.2s ease, transform 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#C8FF00';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1C1C1F';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: 'rgba(200,255,0,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Landmark size={18} strokeWidth={1.5} color="#C8FF00" />
              </div>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.55rem',
                color: '#A1A1AA',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginTop: 12,
              }}>
                Bank
              </p>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                fontSize: '1.05rem',
                color: '#FAFAFA',
                marginTop: 4,
              }}>
                Rs.18,750
              </p>
            </div>
          </div>
        </div>

        {/* ─── Recent Income ────────────────────────────────────────────── */}
        <div style={{ padding: '0 20px', marginTop: 24, ...fadeUp(400) }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#FAFAFA' }}>
              Recent Income
            </p>
            <button
              type="button"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 500,
                fontSize: '0.8rem',
                color: '#C8FF00',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <Plus size={14} strokeWidth={2} color="#C8FF00" />
              Add
            </button>
          </div>

          {/* Income items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {/* Daily Wage */}
            <div
              className="flex items-center justify-between"
              style={{
                background: '#0A0A0B',
                border: '1px solid #1C1C1F',
                borderRadius: '14px 14px 0 0',
                padding: '16px',
                ...slideIn(450),
              }}
            >
              <div>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '0.9rem', color: '#FAFAFA' }}>
                  Daily Wage
                </p>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', color: '#52525B', marginTop: 3 }}>
                  Today · Cash
                </p>
              </div>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.9rem', color: '#C8FF00' }}>
                +Rs.850
              </p>
            </div>
            {/* Salary */}
            <div
              className="flex items-center justify-between"
              style={{
                background: '#0A0A0B',
                border: '1px solid #1C1C1F',
                borderTop: 'none',
                borderRadius: '0 0 14px 14px',
                padding: '16px',
                ...slideIn(500),
              }}
            >
              <div>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '0.9rem', color: '#FAFAFA' }}>
                  Salary
                </p>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', color: '#52525B', marginTop: 3 }}>
                  Mar 20 · Bank
                </p>
              </div>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.9rem', color: '#C8FF00' }}>
                +Rs.15,000
              </p>
            </div>
          </div>
        </div>

        {/* ─── Borrowing & Credit ───────────────────────────────────────── */}
        <div style={{ padding: '0 20px', marginTop: 24, ...fadeUp(550) }}>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#FAFAFA', marginBottom: 14 }}>
            Borrowing & Credit
          </p>
          <div
            style={{
              background: '#0A0A0B',
              border: '1px solid #1C1C1F',
              borderRadius: 14,
              padding: '16px 16px 12px',
            }}
          >
            {/* Borrowed */}
            <div className="flex items-center justify-between" style={{ padding: '10px 0', ...slideIn(600) }}>
              <div className="flex items-center" style={{ gap: 10 }}>
                <ArrowDownLeft size={16} strokeWidth={2} color="#EF4444" />
                <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 400, fontSize: '0.85rem', color: '#A1A1AA' }}>
                  Borrowed
                </p>
              </div>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.9rem', color: '#FAFAFA' }}>
                Rs.3,500
              </p>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: '#1C1C1F' }} />

            {/* To Repay */}
            <div className="flex items-center justify-between" style={{ padding: '10px 0', ...slideIn(650) }}>
              <div className="flex items-center" style={{ gap: 10 }}>
                <ArrowUpRight size={16} strokeWidth={2} color="#F59E0B" />
                <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 400, fontSize: '0.85rem', color: '#A1A1AA' }}>
                  To Repay
                </p>
              </div>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.9rem', color: '#FAFAFA' }}>
                Rs.2,000
              </p>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: '#1C1C1F' }} />

            {/* Status */}
            <div className="flex items-center justify-between" style={{ padding: '10px 0', ...slideIn(700) }}>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 400, fontSize: '0.85rem', color: '#A1A1AA' }}>
                Status
              </p>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.65rem',
                fontWeight: 600,
                color: '#C8FF00',
                background: 'rgba(200,255,0,0.1)',
                border: '1px solid rgba(200,255,0,0.2)',
                borderRadius: 9999,
                padding: '4px 14px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}>
                Pending
              </span>
            </div>
          </div>
        </div>

        {/* ─── Recent Transactions ──────────────────────────────────────── */}
        <div style={{ padding: '0 20px', marginTop: 24, ...fadeUp(750) }}>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#FAFAFA', marginBottom: 14 }}>
            Recent Transactions
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <TransactionRow
              icon={Utensils}
              iconBg="rgba(245,158,11,0.15)"
              iconColor="#F59E0B"
              name="Groceries"
              source="Cash"
              time="10:30 AM"
              amount="-Rs.320"
              delay={800}
            />
            <div style={{ height: 1, background: '#1C1C1F', marginLeft: 56 }} />
            <TransactionRow
              icon={Bus}
              iconBg="rgba(59,130,246,0.15)"
              iconColor="#3B82F6"
              name="Bus Fare"
              source="Wallet"
              time="8:15 AM"
              amount="-Rs.30"
              delay={850}
            />
            <div style={{ height: 1, background: '#1C1C1F', marginLeft: 56 }} />
            <TransactionRow
              icon={ArrowDownRight}
              iconBg="rgba(200,255,0,0.1)"
              iconColor="#C8FF00"
              name="Received from Ravi"
              source="Bank"
              time="Yesterday"
              amount="+Rs.500"
              isPositive
              delay={900}
            />
          </div>
        </div>

        {/* ─── Action Buttons ───────────────────────────────────────────── */}
        <div className="flex items-center" style={{ padding: '0 20px', marginTop: 24, gap: 10, ...fadeUp(950) }}>
          <button
            type="button"
            onClick={() => void navigate('/app/track?tab=income')}
            style={{
              flex: 1,
              background: '#C8FF00',
              color: '#050505',
              borderRadius: 14,
              padding: 14,
              border: 'none',
              cursor: 'pointer',
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 600,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(200,255,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <Plus size={16} strokeWidth={2.5} />
            Add Income
          </button>
          <button
            type="button"
            style={{
              flex: 1,
              background: 'transparent',
              color: '#FAFAFA',
              borderRadius: 14,
              padding: 14,
              border: '1px solid #27272A',
              cursor: 'pointer',
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 600,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              transition: 'border-color 0.15s ease, transform 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#C8FF00';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#27272A';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <RefreshCw size={16} strokeWidth={2} />
            Update Balance
          </button>
        </div>
      </div>
    </>
  );
}
