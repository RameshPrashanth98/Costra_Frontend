import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div className="mx-auto flex min-h-[100dvh] max-w-md flex-col bg-gray-50">
      <header className="px-6 pb-4 pt-[calc(env(safe-area-inset-top)+1rem)]">
        <h1 className="text-lg font-semibold tracking-tight">Costra App</h1>
      </header>
      <main className="flex-1 overflow-y-auto px-6 pb-[calc(env(safe-area-inset-bottom)+4rem)]">
        <Outlet />
      </main>
      {/* BottomNav slot — reserved height for Phase 3 primitive */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 bottom-0 mx-auto h-16 max-w-md border-t border-gray-200 bg-white/80"
      >
        <div className="flex h-full items-center justify-center text-xs text-gray-400">
          [BottomNav — Phase 3]
        </div>
      </div>
    </div>
  );
}
