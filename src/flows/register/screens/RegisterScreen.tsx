import { Link } from 'react-router-dom';

export default function RegisterScreen() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
      <h2 className="text-2xl font-bold">Register</h2>
      <p className="text-sm text-gray-500">Phase 1 placeholder</p>
      <Link to="/app" className="text-blue-600 underline">
        → App
      </Link>
    </section>
  );
}
