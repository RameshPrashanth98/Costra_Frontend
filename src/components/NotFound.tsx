import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[100dvh] max-w-md flex-col items-center justify-center gap-4 p-6">
      <h2 className="text-2xl font-bold">Not Found</h2>
      <p className="text-sm text-gray-500">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link to="/" className="text-blue-600 underline">
        ← Back to home
      </Link>
    </div>
  );
}
