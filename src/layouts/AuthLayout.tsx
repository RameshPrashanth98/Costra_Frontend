import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="mx-auto flex min-h-[100dvh] max-w-md flex-col bg-white">
      <header className="px-6 pt-[calc(env(safe-area-inset-top)+1rem)] pb-4 text-center">
        <h1 className="text-lg font-semibold tracking-tight">Costra</h1>
      </header>
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
    </div>
  );
}
