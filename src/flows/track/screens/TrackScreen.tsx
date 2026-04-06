import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import {
  X,
  Utensils,
  Bus,
  Zap,
  ShoppingBag,
  Heart,
  Music,
  BookOpen,
  MoreHorizontal,
  Pen,
  Calendar,
  Wallet,
  CreditCard,
  Mic,
  Landmark,
  Briefcase,
  Laptop,
  Users,
  Coins,
  Gift,
  RotateCcw,
} from 'lucide-react';

// ---- CSS keyframes --------------------------------------------------------
const KEYFRAMES = `
  @keyframes trackFadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes trackPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(200,255,0,0.25); }
    50%      { box-shadow: 0 0 12px 4px rgba(200,255,0,0.15); }
  }
`;

function fadeUp(delay: number): React.CSSProperties {
  return {
    opacity: 0,
    animation: `trackFadeUp 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms both`,
  };
}

// ---- Types ----------------------------------------------------------------
type TabType = 'expense' | 'income';

interface CategoryItem {
  label: string;
  icon: LucideIcon;
}

// ---- Data -----------------------------------------------------------------
const EXPENSE_CATEGORIES: CategoryItem[] = [
  { label: 'Food', icon: Utensils },
  { label: 'Transport', icon: Bus },
  { label: 'Bills', icon: Zap },
  { label: 'Shopping', icon: ShoppingBag },
  { label: 'Health', icon: Heart },
  { label: 'Fun', icon: Music },
  { label: 'Education', icon: BookOpen },
  { label: 'More', icon: MoreHorizontal },
];

const INCOME_SOURCES: CategoryItem[] = [
  { label: 'Job', icon: Landmark },
  { label: 'Business', icon: Briefcase },
  { label: 'Freelance', icon: Laptop },
  { label: 'Family', icon: Users },
  { label: 'Savings', icon: Coins },
  { label: 'Gifts', icon: Gift },
  { label: 'Refund', icon: RotateCcw },
  { label: 'More', icon: MoreHorizontal },
];

const EXPENSE_QUICK_AMOUNTS = ['200', '500', '1,000', '2,000'];
const INCOME_QUICK_AMOUNTS = ['5,000', '10,000', '25,000', '50,000'];

// ---- Shared styles --------------------------------------------------------
const sectionLabel: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: '0.6rem',
  color: '#C8FF00',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  fontWeight: 500,
  marginBottom: 14,
};

const fieldLabel: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: '0.6rem',
  color: '#52525B',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  fontWeight: 500,
  marginBottom: 10,
};

// ---- Component: CategoryGrid ----------------------------------------------
function CategoryGrid({
  items,
  selected,
  onSelect,
  delay,
}: {
  items: CategoryItem[];
  selected: string;
  onSelect: (label: string) => void;
  delay: number;
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 12,
        ...fadeUp(delay),
      }}
    >
      {items.map(({ label, icon: Icon }) => {
        const active = selected === label;
        return (
          <button
            key={label}
            type="button"
            onClick={() => onSelect(label)}
            className="flex flex-col items-center"
            style={{ gap: 6, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: active ? 'rgba(200,255,0,0.12)' : '#111113',
                border: `1px solid ${active ? '#C8FF00' : '#1C1C1F'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease',
              }}
            >
              <Icon size={20} strokeWidth={1.5} color={active ? '#C8FF00' : '#A1A1AA'} />
            </div>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.55rem',
                color: active ? '#C8FF00' : '#A1A1AA',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                fontWeight: 500,
                transition: 'color 0.15s ease',
              }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ---- Component: ChipRow ---------------------------------------------------
function ChipRow({
  items,
  selected,
  onSelect,
  delay,
}: {
  items: { label: string; icon?: LucideIcon }[];
  selected: string;
  onSelect: (label: string) => void;
  delay: number;
}) {
  return (
    <div className="flex flex-wrap" style={{ gap: 8, ...fadeUp(delay) }}>
      {items.map(({ label, icon: Icon }) => {
        const active = selected === label;
        return (
          <button
            key={label}
            type="button"
            onClick={() => onSelect(label)}
            className="flex items-center"
            style={{
              gap: 6,
              padding: '8px 16px',
              borderRadius: 9999,
              background: active ? '#C8FF00' : 'transparent',
              border: `1.5px solid ${active ? '#C8FF00' : '#27272A'}`,
              color: active ? '#050505' : '#A1A1AA',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.65rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              fontWeight: active ? 600 : 500,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {Icon && <Icon size={14} strokeWidth={1.5} color={active ? '#050505' : '#A1A1AA'} />}
            {label}
          </button>
        );
      })}
    </div>
  );
}

// ---- Component: QuickAmounts ----------------------------------------------
function QuickAmounts({
  amounts,
  onSelect,
  delay,
}: {
  amounts: string[];
  onSelect: (val: string) => void;
  delay: number;
}) {
  return (
    <div className="flex flex-wrap" style={{ gap: 8, ...fadeUp(delay) }}>
      {amounts.map((amt) => (
        <button
          key={amt}
          type="button"
          onClick={() => onSelect(amt)}
          style={{
            padding: '8px 16px',
            borderRadius: 9999,
            background: 'transparent',
            border: '1.5px solid #27272A',
            color: '#A1A1AA',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.65rem',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          {'\u20B9'}{amt}
        </button>
      ))}
    </div>
  );
}

// ---- Main Screen ----------------------------------------------------------
export default function TrackScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialTab: TabType = searchParams.get('tab') === 'income' ? 'income' : 'expense';

  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [selectedCategory, setSelectedCategory] = useState('Food');
  const [selectedPayment, setSelectedPayment] = useState('Cash');
  const [selectedIncomeType, setSelectedIncomeType] = useState('Salary');
  const [selectedSource, setSelectedSource] = useState('Job');
  const [selectedReceivedVia, setSelectedReceivedVia] = useState('Bank');
  const [amount, setAmount] = useState('0.00');
  const [note, setNote] = useState('');

  // Sync tab with URL param on navigation
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'income') setActiveTab('income');
    else if (tab === 'expense') setActiveTab('expense');
  }, [searchParams]);

  const handleQuickAmount = (val: string) => {
    setAmount(val.replace(/,/g, '') + '.00');
  };

  return (
    <>
      <style>{KEYFRAMES}</style>
      <div className="flex flex-col" style={{ background: '#050505', minHeight: '100dvh' }}>
        {/* Header */}
        <div
          className="flex items-center justify-between"
          style={{ padding: '16px 20px', ...fadeUp(50) }}
        >
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: '1rem',
              color: '#FAFAFA',
            }}
          >
            {activeTab === 'expense' ? 'Add Transaction' : 'Add Income'}
          </p>
          <button
            type="button"
            onClick={() => void navigate('/app')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
          >
            <X size={22} strokeWidth={1.5} color="#A1A1AA" />
          </button>
        </div>

        {/* Amount Input Section */}
        <div className="flex flex-col items-center" style={{ padding: '20px 20px 24px', ...fadeUp(100) }}>
          <p style={fieldLabel}>Enter Amount</p>
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 900,
              fontSize: '2.6rem',
              color: '#FAFAFA',
              lineHeight: 1.1,
              marginTop: 8,
            }}
          >
            {'\u20B9'}{amount}
          </p>
          <div
            style={{
              width: 60,
              height: 3,
              background: '#C8FF00',
              borderRadius: 9999,
              marginTop: 12,
            }}
          />
        </div>

        {/* Expense / Income Toggle */}
        <div className="flex justify-center" style={{ padding: '0 20px', ...fadeUp(150) }}>
          <div
            className="flex"
            style={{
              background: '#111113',
              borderRadius: 9999,
              padding: 4,
            }}
          >
            {(['expense', 'income'] as TabType[]).map((tab) => {
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '8px 24px',
                    borderRadius: 9999,
                    background: active ? '#C8FF00' : 'transparent',
                    color: active ? '#050505' : '#A1A1AA',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.65rem',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable form content */}
        <div className="flex-1 overflow-y-auto" style={{ padding: '24px 20px 20px' }}>
          {activeTab === 'expense' ? (
            /* ── EXPENSE TAB ── */
            <div className="flex flex-col" style={{ gap: 24 }}>
              {/* Category */}
              <div>
                <p style={{ ...sectionLabel, ...fadeUp(200) }}>Category</p>
                <CategoryGrid
                  items={EXPENSE_CATEGORIES}
                  selected={selectedCategory}
                  onSelect={setSelectedCategory}
                  delay={250}
                />
              </div>

              {/* Quick Amounts */}
              <div>
                <p style={{ ...fieldLabel, ...fadeUp(300) }}>Quick Amount</p>
                <QuickAmounts amounts={EXPENSE_QUICK_AMOUNTS} onSelect={handleQuickAmount} delay={350} />
              </div>

              {/* Note field */}
              <div
                className="flex items-center"
                style={{
                  gap: 12,
                  background: '#0A0A0B',
                  border: '1px solid #1C1C1F',
                  borderRadius: 14,
                  padding: '14px 16px',
                  ...fadeUp(400),
                }}
              >
                <Pen size={18} strokeWidth={1.5} color="#52525B" />
                <input
                  type="text"
                  placeholder="Add a note (optional)"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '0.85rem',
                    color: '#FAFAFA',
                  }}
                />
              </div>

              {/* Date & Time */}
              <div
                className="flex items-center justify-between"
                style={{
                  background: '#0A0A0B',
                  border: '1px solid #1C1C1F',
                  borderRadius: 14,
                  padding: '14px 16px',
                  ...fadeUp(450),
                }}
              >
                <div className="flex items-center" style={{ gap: 12 }}>
                  <Calendar size={18} strokeWidth={1.5} color="#52525B" />
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.6rem',
                      color: '#52525B',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}
                  >
                    Date & Time
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 400,
                    fontSize: '0.85rem',
                    color: '#FAFAFA',
                  }}
                >
                  Today, 9:41 AM
                </span>
              </div>

              {/* Payment Method */}
              <div>
                <p style={{ ...fieldLabel, ...fadeUp(500) }}>Payment Method</p>
                <ChipRow
                  items={[
                    { label: 'Cash', icon: Wallet },
                    { label: 'Bank', icon: CreditCard },
                    { label: 'Wallet', icon: Wallet },
                  ]}
                  selected={selectedPayment}
                  onSelect={setSelectedPayment}
                  delay={550}
                />
              </div>
            </div>
          ) : (
            /* ── INCOME TAB ── */
            <div className="flex flex-col" style={{ gap: 24 }}>
              {/* Income Type */}
              <div>
                <p style={{ ...fieldLabel, ...fadeUp(200) }}>Income Type</p>
                <ChipRow
                  items={[
                    { label: 'Daily' },
                    { label: 'Salary' },
                    { label: 'Other' },
                  ]}
                  selected={selectedIncomeType}
                  onSelect={setSelectedIncomeType}
                  delay={250}
                />
              </div>

              {/* Source */}
              <div>
                <p style={{ ...sectionLabel, ...fadeUp(300) }}>Source</p>
                <CategoryGrid
                  items={INCOME_SOURCES}
                  selected={selectedSource}
                  onSelect={setSelectedSource}
                  delay={350}
                />
              </div>

              {/* Quick Amounts */}
              <div>
                <p style={{ ...fieldLabel, ...fadeUp(400) }}>Quick Amount</p>
                <QuickAmounts amounts={INCOME_QUICK_AMOUNTS} onSelect={handleQuickAmount} delay={450} />
              </div>

              {/* Note field */}
              <div
                className="flex items-center"
                style={{
                  gap: 12,
                  background: '#0A0A0B',
                  border: '1px solid #1C1C1F',
                  borderRadius: 14,
                  padding: '14px 16px',
                  ...fadeUp(500),
                }}
              >
                <Pen size={18} strokeWidth={1.5} color="#52525B" />
                <input
                  type="text"
                  placeholder="Add a note (optional)"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '0.85rem',
                    color: '#FAFAFA',
                  }}
                />
              </div>

              {/* Date & Time */}
              <div
                className="flex items-center justify-between"
                style={{
                  background: '#0A0A0B',
                  border: '1px solid #1C1C1F',
                  borderRadius: 14,
                  padding: '14px 16px',
                  ...fadeUp(550),
                }}
              >
                <div className="flex items-center" style={{ gap: 12 }}>
                  <Calendar size={18} strokeWidth={1.5} color="#52525B" />
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.6rem',
                      color: '#52525B',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}
                  >
                    Date & Time
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 400,
                    fontSize: '0.85rem',
                    color: '#FAFAFA',
                  }}
                >
                  Today, 9:41 AM
                </span>
              </div>

              {/* Received Via */}
              <div>
                <p style={{ ...fieldLabel, ...fadeUp(600) }}>Received Via</p>
                <ChipRow
                  items={[
                    { label: 'Bank', icon: CreditCard },
                    { label: 'Cash', icon: Wallet },
                  ]}
                  selected={selectedReceivedVia}
                  onSelect={setSelectedReceivedVia}
                  delay={650}
                />
              </div>
            </div>
          )}
        </div>

        {/* CTA row at bottom */}
        <div
          className="flex items-center"
          style={{ padding: '16px 20px calc(16px + env(safe-area-inset-bottom, 0px))', gap: 10, ...fadeUp(700) }}
        >
          <button
            type="button"
            onClick={() =>
              void navigate(
                activeTab === 'expense'
                  ? '/app/track/expense-added'
                  : '/app/track/income-added'
              )
            }
            style={{
              flex: 1,
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
            + {activeTab === 'expense' ? 'Add Expense' : 'Add Income'}
          </button>
          <button
            type="button"
            onClick={() => void navigate('/app/voice-entry')}
            style={{
              width: 48,
              height: 48,
              background: 'rgba(200,255,0,0.12)',
              borderRadius: 14,
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              animation: 'trackPulse 3s ease-in-out infinite',
            }}
          >
            <Mic size={22} strokeWidth={1.5} color="#C8FF00" />
          </button>
        </div>
      </div>
    </>
  );
}
