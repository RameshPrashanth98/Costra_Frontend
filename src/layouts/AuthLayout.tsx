import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div
      className="mx-auto flex min-h-[100dvh] flex-col"
      style={{
        maxWidth: 393,
        background: '#050505',
      }}
    >
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
    </div>
  );
}
