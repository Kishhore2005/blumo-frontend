import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loginUser } from './authSlice';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import type { RootState } from '../../app/store';

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, status, error } = useAppSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(resultAction)) {
      navigate('/'); // Redirect to dashboard or home
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center w-full max-w-md">
        <div className="text-4xl md:text-5xl font-extrabold text-purple-600 tracking-tight animate-splash-pop drop-shadow mb-6 mt-2 select-none">
          Blumo
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow w-full flex flex-col gap-6"
        >
          <h2 className="text-2xl font-bold mb-2 text-center text-purple-600 tracking-tight">Login</h2>
          {error && <div className="mb-2 text-red-600 text-center">{error}</div>}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition bg-gray-50 text-[15px]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition bg-gray-50 text-[15px]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 rounded-lg font-semibold shadow hover:from-purple-600 hover:to-indigo-600 transition"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Logging in...' : 'Login'}
          </button>
          <div className="mt-2 text-center">
            <span className="text-gray-500">Don't have an account? </span>
            <Link to="/register" className="text-purple-600 font-medium hover:underline">Register</Link>
          </div>
        </form>
      </div>
      <style>{`
        @keyframes splash-pop {
          0% { transform: scale(0.7); opacity: 0; }
          60% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-splash-pop {
          animation: splash-pop 1.2s cubic-bezier(0.4,0,0.2,1) forwards;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
