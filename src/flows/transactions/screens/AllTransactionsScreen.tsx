import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Coffee, Bus, ShoppingBag, Zap, Utensils, Music } from 'lucide-react';

// ─── CSS keyframes ───────────────────────────────────────────────────────────
const KEYFRAMES = `
  @keyframes allTxFadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
`;

function fadeUp(delay: number): React.CSSProperties {
  return {
    opacity: 0,
    animation: `allTxFadeUp 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms both`,
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

// ─── Transaction Row ─────────────────────────────────────────────────────────
interface TxRowProps {
  id: string;
  name: string;
  category: string;
  time: string;
  amount: string;
  Icon: React.ElementType;
  isLast?: boolean;
  onClick: () => void;
}

function TxRow({ name, category, time, amount, Icon, isLast, onClick }: TxRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-between"
      style={{
        padding: '14px 0',
        borderBottom: isLast ? 'none' : '1px solid #1C1C1F',
        background: 'none',
        border_bottom: isLast ? 'none' : '1px solid #1C1C1F',
        width: '100%',
        cursor: 'pointer',
      } as React.CSSProperties}
    >
      <div className="flex items-center" style={{ gap: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: '#111113', border: '1px solid #1C1C1F', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon size={18} strokeWidth={1.5} color="#A1A1AA" />
        </div>
        <div style={{ textAlign: 'left' }}>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '0.85rem', color: '#FAFAFA' }}>{name}</p>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', color: '#52525B', marginTop: 3 }}>
            {category} · {time}
          </p>
        </div>
      </div>
      <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.85rem', color: '#FAFAFA' }}>{amount}</p>
    </button>
  );
}

// ─── Filters ─────────────────────────────────────────────────────────────────
const FILTERS = ['ALL', 'Food', 'Transport', 'Bills', 'Shopping'] as const;
type Filter = typeof FILTERS[number];

// ─── Main Screen ─────────────────────────────────────────────────────────────
export default function AllTransactionsScreen() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<Filter>('ALL');
  const [search, setSearch] = useState('');

  const todayTransactions = [
    { id: '1', name: 'Morning Coffee', category: 'Food', time: '8:30 AM', amount: '-Rs.45', Icon: Coffee },
    { id: '2', name: 'Bus Fare', category: 'Transport', time: '9:15 AM', amount: '-Rs.25', Icon: Bus },
    { id: '3', name: 'Amazon Order', category: 'Shopping', time: '11:45 AM', amount: '-Rs.300', Icon: ShoppingBag },
    { id: '4', name: 'Electricity Bill', category: 'Bills', time: '2:00 PM', amount: '-Rs.850', Icon: Zap },
    { id: '5', name: 'Grocery Store', category: 'Food', time: '4:30 PM', amount: '-Rs.150', Icon: Utensils },
  ];

  const yesterdayTransactions = [
    { id: '6', name: 'Lunch', category: 'Food', time: '12:30 PM', amount: '-Rs.450', Icon: Utensils },
    { id: '7', name: 'Auto Rickshaw', category: 'Transport', time: '3:15 PM', amount: '-Rs.175', Icon: Bus },
    { id: '8', name: 'Movie Tickets', category: 'Entertainment', time: '7:00 PM', amount: '-Rs.355', Icon: Music },
  ];

  return (
    <>
      <style>{KEYFRAMES}</style>
      <div style={{ background: '#050505', paddingBottom: 20 }}>
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
          <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.95rem', color: '#FAFAFA' }}>
            All Transactions
          </span>
          <div style={{ width: 30 }} />
        </div>

        {/* Search bar */}
        <div style={{ margin: '16px 20px 0', background: '#0A0A0B', border: '1px solid #1C1C1F', borderRadius: 14, padding: '12px 16px', ...fadeUp(200) }}>
          <div className="flex items-center" style={{ gap: 10 }}>
            <Search size={18} strokeWidth={1.5} color="#52525B" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#FAFAFA', fontFamily: "'Outfit', sans-serif", fontSize: '0.85rem' }}
              className="placeholder-zinc-600"
            />
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex" style={{ gap: 8, padding: '14px 20px 0', overflowX: 'auto', paddingBottom: 0, ...fadeUp(280) }}>
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              style={
                activeFilter === filter
                  ? { padding: '8px 16px', borderRadius: 9999, background: '#C8FF00', border: '1.5px solid #C8FF00', color: '#050505', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }
                  : { padding: '8px 16px', borderRadius: 9999, background: 'transparent', border: '1.5px solid #27272A', color: '#A1A1AA', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap' }
              }
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Today date group */}
        <div style={{ padding: '0 20px', marginTop: 20, ...fadeUp(360) }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 0 }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: '#52525B', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Today, 26 Mar
            </p>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '0.8rem', color: '#EF4444' }}>-Rs.1,370</p>
          </div>
          <div style={{ marginTop: 4 }}>
            {todayTransactions.map((tx, i) => (
              <TxRow
                key={tx.id}
                {...tx}
                isLast={i === todayTransactions.length - 1}
                onClick={() => void navigate(`/app/transaction/${tx.id}`)}
              />
            ))}
          </div>
        </div>

        {/* Yesterday date group */}
        <div style={{ padding: '0 20px', marginTop: 20, ...fadeUp(460) }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 0 }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: '#52525B', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Yesterday, 25 Mar
            </p>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '0.8rem', color: '#EF4444' }}>-Rs.980</p>
          </div>
          <div style={{ marginTop: 4 }}>
            {yesterdayTransactions.map((tx, i) => (
              <TxRow
                key={tx.id}
                {...tx}
                isLast={i === yesterdayTransactions.length - 1}
                onClick={() => void navigate(`/app/transaction/${tx.id}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
