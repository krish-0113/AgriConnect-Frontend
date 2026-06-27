import { Link } from 'react-router-dom';
import { ArrowRight, Users, Briefcase, Star, TrendingUp } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Connect with Agricultural Opportunities
            </h1>
            <p className="text-xl mb-8 text-gray-100">
              AgriConnect is the leading platform for agricultural professionals and employers. Find your perfect match in the farming industry.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/jobs"
                className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Browse Jobs <ArrowRight size={20} />
              </Link>
              {!isAuthenticated && (
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition"
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose AgriConnect?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 border border-border rounded-lg">
              <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4">
                <Briefcase size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Thousands of Jobs</h3>
              <p className="text-muted-foreground">
                Access a wide range of agricultural positions from field work to management roles.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 border border-border rounded-lg">
              <div className="w-12 h-12 bg-secondary text-white rounded-lg flex items-center justify-center mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Qualified Professionals</h3>
              <p className="text-muted-foreground">
                Find experienced agricultural professionals with verified skills and certifications.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 border border-border rounded-lg">
              <div className="w-12 h-12 bg-accent text-white rounded-lg flex items-center justify-center mb-4">
                <Star size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trusted Community</h3>
              <p className="text-muted-foreground">
                Our verified ratings and reviews help you make informed hiring decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50K+</div>
              <p className="text-muted-foreground">Active Job Listings</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">30K+</div>
              <p className="text-muted-foreground">Verified Workers</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">5K+</div>
              <p className="text-muted-foreground">Trusted Companies</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Next Opportunity?</h2>
          <p className="text-xl mb-8 text-gray-100">
            Whether you&apos;re looking for work or hiring talent, AgriConnect makes it easy.
          </p>
          {!isAuthenticated ? (
            <div className="flex justify-center gap-4">
              <Link
                to="/register?role=worker"
                className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                I&apos;m a Worker
              </Link>
              <Link
                to="/register?role=company"
                className="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition"
              >
                I&apos;m Hiring
              </Link>
            </div>
          ) : (
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Explore Opportunities <TrendingUp size={20} />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
