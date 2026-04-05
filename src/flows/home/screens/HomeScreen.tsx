import { Link } from 'react-router-dom';

export default function HomeScreen() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
      <h2 className="text-2xl font-bold">Home</h2>
      <p className="text-sm text-gray-500">Phase 1 placeholder</p>
      <Link to="/app/track" className="text-blue-600 underline">
        → Track
      </Link>
      <Link to="/app/wallet" className="text-blue-600 underline">
        → Wallet
      </Link>
      <Link to="/app/insights" className="text-blue-600 underline">
        → Insights
      </Link>
      <Link to="/app/profile" className="text-blue-600 underline">
        → Profile
      </Link>
    </section>
  );
}
