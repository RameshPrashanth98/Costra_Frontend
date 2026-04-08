import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Pen, ArrowUpRight, Utensils, Calendar, CreditCard, Tag, Lightbulb, Trash2 } from 'lucide-react';

// ─── CSS keyframes ───────────────────────────────────────────────────────────
const KEYFRAMES = `
  @keyframes txDetailFadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
`;

function fadeUp(delay: number): React.CSSProperties {
  return {
    opacity: 0,
    animation: `txDetailFadeUp 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms both`,
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

// ─── Main Screen ─────────────────────────────────────────────────────────────
export default function TransactionDetailsScreen() {
  const navigate = useNavigate();

  return (
    <>
      <style>{KEYFRAMES}</style>
      <div style={{ background: '#050505', paddingBottom: 32 }}>
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
            Transaction Details
          </span>
          <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <Pen size={20} strokeWidth={1.5} color="#A1A1AA" />
          </button>
        </div>

        {/* Expense badge */}
        <div className="flex justify-center" style={{ marginTop: 20, ...fadeUp(200) }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(200,255,0,0.12)', borderRadius: 9999, padding: '6px 16px' }}>
            <ArrowUpRight size={16} strokeWidth={1.5} color="#C8FF00" />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: '#C8FF00', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Expense</span>
          </div>
        </div>

        {/* Amount */}
        <div className="flex justify-center" style={{ marginTop: 16, ...fadeUp(300) }}>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: '2.6rem', color: '#FAFAFA', lineHeight: 1.1 }}>Rs. 450.00</p>
        </div>

        {/* Category */}
        <div className="flex items-center justify-center" style={{ gap: 10, marginTop: 8, ...fadeUp(350) }}>
          <div style={{ width: 36, height: 36, borderRadius: 12, background: '#111113', border: '1px solid #1C1C1F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Utensils size={18} strokeWidth={1.5} color="#A1A1AA" />
          </div>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: '0.85rem', color: '#A1A1AA' }}>Food & Dining</p>
        </div>

        {/* Details card */}
        <div style={{ margin: '24px 20px 0', background: '#0A0A0B', border: '1px solid #1C1C1F', borderRadius: 16, padding: 20, ...fadeUp(400) }}>
          {/* Date & Time row */}
          <div className="flex items-center justify-between" style={{ paddingBottom: 14, borderBottom: '1px solid #1C1C1F' }}>
            <div className="flex items-center" style={{ gap: 10 }}>
              <Calendar size={16} strokeWidth={1.5} color="#52525B" />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', color: '#52525B', textTransform: 'uppercase', letterSpacing: '0.1em' }}>DATE & TIME</span>
            </div>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 400, fontSize: '0.85rem', color: '#FAFAFA' }}>25 Mar 2026, 12:30 PM</span>
          </div>
          {/* Payment Method row */}
          <div className="flex items-center justify-between" style={{ padding: '14px 0', borderBottom: '1px solid #1C1C1F' }}>
            <div className="flex items-center" style={{ gap: 10 }}>
              <CreditCard size={16} strokeWidth={1.5} color="#52525B" />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', color: '#52525B', textTransform: 'uppercase', letterSpacing: '0.1em' }}>PAYMENT METHOD</span>
            </div>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 400, fontSize: '0.85rem', color: '#FAFAFA' }}>Cash</span>
          </div>
          {/* Category row */}
          <div className="flex items-center justify-between" style={{ paddingTop: 14 }}>
            <div className="flex items-center" style={{ gap: 10 }}>
              <Tag size={16} strokeWidth={1.5} color="#52525B" />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.55rem', color: '#52525B', textTransform: 'uppercase', letterSpacing: '0.1em' }}>CATEGORY</span>
            </div>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 400, fontSize: '0.85rem', color: '#FAFAFA' }}>Food & Dining</span>
          </div>
        </div>

        {/* Notes section */}
        <div style={{ margin: '20px 20px 0', ...fadeUp(500) }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: '#52525B', textTransform: 'uppercase', letterSpacing: '0.15em' }}>NOTES</p>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 400, fontSize: '0.85rem', color: '#A1A1AA', marginTop: 8, lineHeight: 1.6 }}>
            Lunch at office canteen with colleagues
          </p>
        </div>

        {/* Insight banner */}
        <div style={{ margin: '20px 20px 0', background: 'rgba(200,255,0,0.06)', border: '1px solid rgba(200,255,0,0.12)', borderRadius: 14, padding: '14px 16px', ...fadeUp(600) }}>
          <div className="flex items-center" style={{ gap: 10 }}>
            <Lightbulb size={18} strokeWidth={1.5} color="#C8FF00" />
            <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 400, fontSize: '0.8rem', color: '#A1A1AA' }}>
              This is Rs.120 higher than your usual lunch spend
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ margin: '24px 20px 0', display: 'flex', flexDirection: 'column', gap: 12, ...fadeUp(700) }}>
          <button
            type="button"
            style={{ width: '100%', padding: 16, background: '#C8FF00', color: '#050505', borderRadius: 14, border: 'none', cursor: 'pointer', fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '1rem' }}
          >
            Edit Transaction
          </button>
          <button
            type="button"
            style={{ width: '100%', padding: 16, background: 'transparent', color: '#EF4444', borderRadius: 14, border: '1px solid rgba(239,68,68,0.3)', cursor: 'pointer', fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '1rem' }}
          >
            <div className="flex items-center justify-center" style={{ gap: 8 }}>
              <Trash2 size={18} strokeWidth={1.5} color="#EF4444" />
              Delete Transaction
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
