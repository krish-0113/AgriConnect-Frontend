import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-muted flex items-center justify-center py-8">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
        <p className="text-2xl text-muted-foreground mb-6">Page not found</p>
        <p className="text-lg text-muted-foreground mb-8">
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on track.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          <Home size={20} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
