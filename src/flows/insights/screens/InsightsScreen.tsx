import { useState } from 'react';
import {
  Settings,
  TrendingUp,
  TrendingDown,
  Utensils,
  Bus,
  Zap,
  ShoppingBag,
  Coffee,
  Coins,
  Lightbulb,
  Sparkles,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// ─── CSS keyframes ───────────────────────────────────────────────────────────
const KEYFRAMES = `
  @keyframes insightsFadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
`;

// ─── Animation helper ────────────────────────────────────────────────────────
function fadeUp(delay: number): React.CSSProperties {
  return {
    opacity: 0,
    animation: `insightsFadeUp 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms both`,
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

// ─── Icon map ────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, LucideIcon> = {
  Utensils,
  Bus,
  Zap,
  ShoppingBag,
  Coffee,
  Coins,
  Lightbulb,
  Sparkles,
};

// ─── Data types ──────────────────────────────────────────────────────────────
interface CategoryItem {
  name: string;
  icon: string;
  amount: string;
  pct: number;
}

interface SmallExpenseItem {
  label: string;
  icon: string;
  amount: string;
}

interface TrendItem {
  label: string;
  value: string;
  positive: boolean;
}

interface InsightItem {
  icon: string;
  text: string;
  lime: boolean;
}

interface TabData {
  label: string;
  trendText: string;
  amount: string;
  avgText: string;
  categories: CategoryItem[];
  smallExpenses: SmallExpenseItem[];
  smallExpensesTotal: string;
  trend: TrendItem[];
  insights: InsightItem[];
}

// ─── Mock data ───────────────────────────────────────────────────────────────
const TODAY_DATA: TabData = {
  label: 'Total Spent Today',
  trendText: '18% higher than usual',
  amount: 'Rs.1,240',
  avgText: 'Daily avg: Rs980',
  categories: [
    { name: 'Food', icon: 'Utensils', amount: 'Rs520', pct: 42 },
    { name: 'Transport', icon: 'Bus', amount: 'Rs340', pct: 27 },
    { name: 'Bills', icon: 'Zap', amount: 'Rs200', pct: 16 },
    { name: 'Shopping', icon: 'ShoppingBag', amount: 'Rs180', pct: 15 },
  ],
  smallExpenses: [
    { label: 'Coffee & snacks (3x)', icon: 'Coffee', amount: 'Rs195' },
    { label: 'Auto rides (2x)', icon: 'Bus', amount: 'Rs140' },
  ],
  smallExpensesTotal: 'Rs335',
  trend: [
    { label: 'vs Yesterday', value: '+Rs260', positive: true },
    { label: 'vs Weekly Avg', value: '-Rs80', positive: false },
  ],
  insights: [
    { icon: 'Lightbulb', text: 'You spent more on food today than usual. Try packing lunch tomorrow!', lime: true },
    { icon: 'Sparkles', text: "Transport cost is steady this week. You're on track!", lime: false },
  ],
};

const WEEK_DATA: TabData = {
  label: 'Total Spent This Week',
  trendText: '12% higher than last week',
  amount: 'Rs.8,640',
  avgText: 'Weekly avg: Rs7,700',
  categories: [
    { name: 'Food', icon: 'Utensils', amount: 'Rs3,640', pct: 42 },
    { name: 'Transport', icon: 'Bus', amount: 'Rs2,380', pct: 28 },
    { name: 'Bills', icon: 'Zap', amount: 'Rs1,400', pct: 16 },
    { name: 'Shopping', icon: 'ShoppingBag', amount: 'Rs1,220', pct: 14 },
  ],
  smallExpenses: [
    { label: 'Coffee & snacks (14x)', icon: 'Coffee', amount: 'Rs1,260' },
    { label: 'Auto rides (9x)', icon: 'Bus', amount: 'Rs810' },
  ],
  smallExpensesTotal: 'Rs2,070',
  trend: [
    { label: 'vs Last Week', value: '+Rs940', positive: true },
    { label: 'vs Monthly Avg', value: '-Rs360', positive: false },
  ],
  insights: [
    { icon: 'Lightbulb', text: 'Food spending is 12% higher than last week. Consider meal prepping on weekends!', lime: true },
    { icon: 'Sparkles', text: 'You saved Rs360 compared to your monthly average. Great progress!', lime: false },
  ],
};

// ─── Main Screen ─────────────────────────────────────────────────────────────
export default function InsightsScreen() {
  const [tab, setTab] = useState<'today' | 'week'>('today');
  const data = tab === 'today' ? TODAY_DATA : WEEK_DATA;

  return (
    <>
      <style>{KEYFRAMES}</style>
      <div style={{ background: '#050505', minHeight: '100vh' }}>
        {/* Status Bar */}
        <StatusBar />

        {/* Content */}
        <div style={{ padding: '0 20px', paddingBottom: 100 }}>
          {/* Header */}
          <div
            className="flex items-center justify-between"
            style={{ marginTop: 12, ...fadeUp(100) }}
          >
            <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1.2rem', color: '#FAFAFA' }}>
              Insights
            </p>
            <Settings size={20} strokeWidth={1.5} color="#A1A1AA" style={{ cursor: 'pointer' }} />
          </div>

          {/* Tab toggle */}
          <div style={{ marginTop: 20, ...fadeUp(180) }}>
            <div
              className="flex"
              style={{ background: '#111113', borderRadius: 9999, padding: 4 }}
            >
              <button
                type="button"
                onClick={() => setTab('today')}
                style={{
                  flex: 1,
                  padding: '8px 20px',
                  borderRadius: 9999,
                  border: 'none',
                  cursor: 'pointer',
                  background: tab === 'today' ? '#C8FF00' : 'transparent',
                  color: tab === 'today' ? '#050505' : '#A1A1AA',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.65rem',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  transition: 'all 0.2s ease',
                }}
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => setTab('week')}
                style={{
                  flex: 1,
                  padding: '8px 20px',
                  borderRadius: 9999,
                  border: 'none',
                  cursor: 'pointer',
                  background: tab === 'week' ? '#C8FF00' : 'transparent',
                  color: tab === 'week' ? '#050505' : '#A1A1AA',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.65rem',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  transition: 'all 0.2s ease',
                }}
              >
                This Week
              </button>
            </div>
          </div>

          {/* Animated content — key forces remount on tab change */}
          <div key={tab}>
            {/* Total Spent card */}
            <div
              style={{
                marginTop: 20,
                background: 'rgba(200,255,0,0.06)',
                border: '1px solid rgba(200,255,0,0.12)',
                borderRadius: 16,
                padding: 20,
                ...fadeUp(260),
              }}
            >
              <div className="flex items-center" style={{ gap: 10 }}>
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.6rem',
                  color: '#A1A1AA',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  letterSpacing: '0.15em',
                }}>
                  {data.label}
                </p>
                <span
                  className="inline-flex items-center"
                  style={{
                    border: '1px solid rgba(200,255,0,0.3)',
                    borderRadius: 9999,
                    padding: '4px 10px',
                    gap: 4,
                  }}
                >
                  <TrendingUp size={12} strokeWidth={1.5} color="#C8FF00" />
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.55rem',
                    color: '#C8FF00',
                  }}>
                    {data.trendText}
                  </span>
                </span>
              </div>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 900,
                fontSize: '2.6rem',
                color: '#FAFAFA',
                lineHeight: 1.1,
                marginTop: 8,
              }}>
                {data.amount}
              </p>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.6rem',
                color: '#52525B',
                marginTop: 4,
              }}>
                {data.avgText}
              </p>
            </div>

            {/* Where Your Money Went */}
            <div style={{ marginTop: 24, ...fadeUp(340) }}>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                fontSize: '0.95rem',
                color: '#FAFAFA',
                marginBottom: 14,
              }}>
                Where Your Money Went
              </p>
              {data.categories.map((cat) => {
                const Icon = ICON_MAP[cat.icon] || Utensils;
                return (
                  <div key={cat.name}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Icon size={18} strokeWidth={1.5} color="#A1A1AA" />
                        <span style={{
                          fontFamily: "'Outfit', sans-serif",
                          fontWeight: 400,
                          fontSize: '0.85rem',
                          color: '#FAFAFA',
                          marginLeft: 10,
                        }}>
                          {cat.name}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span style={{
                          fontFamily: "'Outfit', sans-serif",
                          fontWeight: 600,
                          fontSize: '0.85rem',
                          color: '#FAFAFA',
                        }}>
                          {cat.amount}
                        </span>
                        <span style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '0.6rem',
                          color: '#52525B',
                          marginLeft: 8,
                        }}>
                          {cat.pct}%
                        </span>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div style={{
                      height: 3,
                      background: '#1C1C1F',
                      borderRadius: 2,
                      marginTop: 8,
                      marginBottom: 14,
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        height: 3,
                        background: '#C8FF00',
                        borderRadius: 2,
                        width: `${cat.pct}%`,
                        transition: 'width 0.8s cubic-bezier(0.16,1,0.3,1)',
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Small Expenses */}
            <div
              style={{
                marginTop: 10,
                background: '#0A0A0B',
                border: '1px solid #1C1C1F',
                borderRadius: 16,
                padding: 20,
                ...fadeUp(420),
              }}
            >
              <div className="flex items-center" style={{ gap: 8 }}>
                <Coins size={18} strokeWidth={1.5} color="#C8FF00" />
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  color: '#FAFAFA',
                }}>
                  Small Expenses Add Up
                </p>
              </div>
              <div style={{ marginTop: 16 }}>
                {data.smallExpenses.map((item) => {
                  const Icon = ICON_MAP[item.icon] || Coffee;
                  return (
                    <div key={item.label} className="flex items-center justify-between" style={{ marginBottom: 10 }}>
                      <div className="flex items-center">
                        <Icon size={14} strokeWidth={1.5} color="#52525B" />
                        <span style={{
                          fontFamily: "'Outfit', sans-serif",
                          fontWeight: 400,
                          fontSize: '0.8rem',
                          color: '#A1A1AA',
                          marginLeft: 8,
                        }}>
                          {item.label}
                        </span>
                      </div>
                      <span style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 500,
                        fontSize: '0.8rem',
                        color: '#FAFAFA',
                      }}>
                        {item.amount}
                      </span>
                    </div>
                  );
                })}
              </div>
              {/* Divider */}
              <div style={{ height: 1, background: '#1C1C1F', margin: '10px 0' }} />
              {/* Total */}
              <div className="flex items-center justify-between">
                <span style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 500,
                  fontSize: '0.8rem',
                  color: '#A1A1AA',
                }}>
                  Total small expenses
                </span>
                <span style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  color: '#FAFAFA',
                }}>
                  {data.smallExpensesTotal}
                </span>
              </div>
            </div>

            {/* Spending Trend */}
            <div style={{ marginTop: 24, ...fadeUp(500) }}>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                fontSize: '0.95rem',
                color: '#FAFAFA',
                marginBottom: 10,
              }}>
                Spending Trend
              </p>
              <div className="flex" style={{ gap: 10 }}>
                {data.trend.map((t) => (
                  <div
                    key={t.label}
                    style={{
                      flex: 1,
                      background: t.positive ? 'rgba(200,255,0,0.08)' : '#111113',
                      borderRadius: 14,
                      padding: 14,
                    }}
                  >
                    <p style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.55rem',
                      color: '#A1A1AA',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}>
                      {t.label}
                    </p>
                    <div className="flex items-center" style={{ marginTop: 8 }}>
                      {t.positive ? (
                        <TrendingUp size={16} strokeWidth={1.5} color="#C8FF00" />
                      ) : (
                        <TrendingDown size={16} strokeWidth={1.5} color="#EF4444" />
                      )}
                      <span style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        color: t.positive ? '#C8FF00' : '#EF4444',
                        marginLeft: 6,
                      }}>
                        {t.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Smart Insights */}
            <div style={{ marginTop: 24, ...fadeUp(580) }}>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                fontSize: '0.95rem',
                color: '#FAFAFA',
                marginBottom: 10,
              }}>
                Smart Insights
              </p>
              {data.insights.map((insight) => {
                const Icon = ICON_MAP[insight.icon] || Lightbulb;
                return (
                  <div
                    key={insight.text}
                    style={{
                      background: insight.lime ? 'rgba(200,255,0,0.06)' : '#111113',
                      border: insight.lime ? '1px solid rgba(200,255,0,0.12)' : '1px solid #1C1C1F',
                      borderRadius: insight.lime ? 14 : 12,
                      padding: '14px 16px',
                      marginBottom: 10,
                    }}
                  >
                    <div className="flex items-start" style={{ gap: 10 }}>
                      <Icon size={16} strokeWidth={1.5} color="#C8FF00" style={{ flexShrink: 0, marginTop: 2 }} />
                      <p style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 400,
                        fontSize: '0.8rem',
                        color: '#A1A1AA',
                        lineHeight: 1.5,
                      }}>
                        {insight.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
