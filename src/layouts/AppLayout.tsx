import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, List, BarChart3, Wallet, UserCircle } from 'lucide-react';

// ─── Bottom Navigation ───────────────────────────────────────────────────────
interface BottomNavProps {
  hide?: boolean;
}

function BottomNav({ hide }: BottomNavProps) {
  const location = useLocation();
  const navigate = useNavigate();

  if (hide) return null;

  const tabs = [
    { label: 'HOME', icon: Home, path: '/app' },
    { label: 'TRACK', icon: List, path: '/app/track' },
    { label: 'INSIGHTS', icon: BarChart3, path: '/app/insights' },
    { label: 'WALLET', icon: Wallet, path: '/app/wallet' },
    { label: 'PROFILE', icon: UserCircle, path: '/app/profile' },
  ] as const;

  const isActive = (path: string) => {
    if (path === '/app') return location.pathname === '/app';
    return location.pathname.startsWith(path);
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: 393,
        background: '#0A0A0B',
        borderTop: '1px solid #1C1C1F',
        padding: `8px 0 calc(env(safe-area-inset-bottom, 0px) + 4px)`,
        zIndex: 50,
      }}
    >
      <div className="flex items-center justify-around">
        {tabs.map(({ label, icon: Icon, path }) => {
          const active = isActive(path);
          return (
            <button
              key={path}
              type="button"
              onClick={() => void navigate(path)}
              className="flex flex-col items-center"
              style={{ gap: 4, background: 'none', border: 'none', cursor: 'pointer', padding: '0 8px' }}
            >
              <div
                style={{
                  borderRadius: 9999,
                  padding: '6px 12px',
                  background: active ? 'rgba(200,255,0,0.12)' : 'transparent',
                  transition: 'background 0.15s ease',
                }}
              >
                <Icon
                  size={22}
                  strokeWidth={1.5}
                  color={active ? '#C8FF00' : '#52525B'}
                />
              </div>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontWeight: 500,
                  color: active ? '#C8FF00' : '#52525B',
                }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── App Layout ──────────────────────────────────────────────────────────────
export default function AppLayout() {
  const location = useLocation();
  const hideNav = location.pathname.includes('voice-entry') || location.pathname.includes('expense-added') || location.pathname.includes('income-added');

  return (
    <div
      className="mx-auto flex min-h-[100dvh] flex-col"
      style={{ maxWidth: 393, background: '#050505' }}
    >
      {/* Main scrollable content area */}
      <main
        className="flex-1 overflow-y-auto"
        style={{ paddingBottom: hideNav ? 0 : 'calc(80px + env(safe-area-inset-bottom, 0px))' }}
      >
        <Outlet />
      </main>

      {/* Fixed Bottom Navigation */}
      <BottomNav hide={hideNav} />
    </div>
  );
}
