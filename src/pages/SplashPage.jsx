import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Sprout } from 'lucide-react';

export default function SplashPage() {
  const navigate = useNavigate();
  const { token, loadCurrentUser } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      // Simulate splash screen animation delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (token) {
        try {
          const user = await loadCurrentUser();
          if (user) {
            navigate('/dashboard', { replace);
            return;
          }
        } catch (e) {
          console.error('Session validation failed', e);
        }
      }
      
      // Default fallback
      navigate('/welcome', { replace);
    };

    checkAuth();
  }, [token, loadCurrentUser, navigate]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1b4332] to-[#2d6a4f] flex flex-col items-center justify-center text-white">
      <div className="flex flex-col items-center space-y-4 animate-bounce">
        <div className="p-4 bg-white bg-opacity-10 rounded-full">
          <Sprout size={64} className="text-primary-foreground animate-pulse" />
        </div>
        <h1 className="text-4xl font-bold tracking-wider">AgriConnect</h1>
        <p className="text-[#a3b18a] text-sm font-medium tracking-wide">
          Sowing Opportunities, Harvesting Success
        </p>
      </div>

      <div className="absolute bottom-12 flex flex-col items-center space-y-2">
        <div className="h-1.5 w-32 bg-[#40916c] rounded-full overflow-hidden">
          <div className="h-full w-full bg-white rounded-full animate-[loading_1.5s_infinite]" />
        </div>
        <span className="text-xs text-[#a3b18a] font-semibold">Initializing platform...</span>
      </div>
    </div>
  );
}
