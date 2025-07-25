import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from '../../app/hooks';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate, isAuthenticated]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-400">
      <div className="flex flex-col items-center">
        {/* Animated Logo/Text */}
        <div className="text-5xl md:text-6xl font-extrabold text-white tracking-tight animate-splash-pop drop-shadow-lg">
          Blumo
        </div>
        <div className="mt-4 text-lg text-indigo-100 font-medium animate-fade-in">
          Email Marketing Made Simple
        </div>
        {/* Loader */}
        <div className="mt-10 flex justify-center">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
      {/* Custom animation keyframes */}
      <style>{`
        @keyframes splash-pop {
          0% { transform: scale(0.7); opacity: 0; }
          60% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-splash-pop {
          animation: splash-pop 1.2s cubic-bezier(0.4,0,0.2,1) forwards;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 1.5s 0.8s both;
        }
      `}</style>
    </div>
  );
};

export default SplashScreen; 