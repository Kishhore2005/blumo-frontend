import React, { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { registerUser } from './authSlice';
import { useNavigate, Link } from 'react-router-dom';
import type { RootState } from '../../app/store';
import { API_BASE } from '../../Config/Env';

const passwordRequirements = [
  {
    label: 'At least 8 characters',
    test: (pw: string) => pw.length >= 8,
  },
  {
    label: 'At least one lowercase letter',
    test: (pw: string) => /[a-z]/.test(pw),
  },
  {
    label: 'At least one uppercase letter',
    test: (pw: string) => /[A-Z]/.test(pw),
  },
  {
    label: 'At least one number',
    test: (pw: string) => /[0-9]/.test(pw),
  },
  {
    label: 'At least one special character',
    test: (pw: string) => /[^a-zA-Z0-9]/.test(pw),
  },
];

const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, error } = useAppSelector((state: RootState) => state.auth);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [usernameExists, setUsernameExists] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const usernameTimeout = useRef<NodeJS.Timeout | null>(null);
  const emailTimeout = useRef<NodeJS.Timeout | null>(null);

  // Debounced username check
  useEffect(() => {
    if (!username) {
      setUsernameExists(false);
      return;
    }
    setCheckingUsername(true);
    if (usernameTimeout.current) clearTimeout(usernameTimeout.current);
    usernameTimeout.current = setTimeout(async () => {
      try {
        const res = await fetch(`${API_BASE}/auth/check-username?username=${encodeURIComponent(username)}`);
        const data = await res.json();
        setUsernameExists(!!data.exists);
      } catch {
        setUsernameExists(false);
      } finally {
        setCheckingUsername(false);
      }
    }, 500);
    // eslint-disable-next-line
  }, [username]);

  // Debounced email check
  useEffect(() => {
    if (!email) {
      setEmailExists(false);
      return;
    }
    setCheckingEmail(true);
    if (emailTimeout.current) clearTimeout(emailTimeout.current);
    emailTimeout.current = setTimeout(async () => {
      try {
        const res = await fetch(`${API_BASE}/auth/check-email?email=${encodeURIComponent(email)}`);
        const data = await res.json();
        setEmailExists(!!data.exists);
      } catch {
        setEmailExists(false);
      } finally {
        setCheckingEmail(false);
      }
    }, 500);
    // eslint-disable-next-line
  }, [email]);

  const allRequirementsMet = passwordRequirements.every((req) => req.test(password));
  const canSubmit = allRequirementsMet && !usernameExists && !emailExists && !checkingUsername && !checkingEmail;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    const resultAction = await dispatch(registerUser({ username, email, password }));
    if (registerUser.fulfilled.match(resultAction)) {
      setSuccess(true);
      setTimeout(() => navigate('/login'), 1500);
    }
  };

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
          <h2 className="text-2xl font-bold mb-2 text-center text-purple-600 tracking-tight">Register</h2>
          {success && (
            <div className="mb-2 text-green-600 text-center">Registration successful! Redirecting to login...</div>
          )}
          {error && <div className="mb-2 text-red-600 text-center">{error}</div>}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Username</label>
            <input
              type="text"
              className={`w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition bg-gray-50 text-[15px] ${usernameExists ? 'border-red-400' : ''}`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
            />
            {usernameExists && (
              <div className="text-red-600 text-xs mt-1">Username already exists</div>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              className={`w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition bg-gray-50 text-[15px] ${emailExists ? 'border-red-400' : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailExists && (
              <div className="text-red-600 text-xs mt-1">Email already exists</div>
            )}
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
            <ul className="mt-2 mb-1 space-y-1">
              {passwordRequirements.map((req, idx) => {
                const met = req.test(password);
                return (
                  <li key={idx} className={`flex items-center text-sm ${met ? 'text-green-600' : 'text-gray-400'}`}>
                    <span className={`inline-block w-4 h-4 mr-2 rounded-full border-2 ${met ? 'border-green-500 bg-green-100' : 'border-gray-300 bg-gray-100'}`}>{met ? <span className="block w-2 h-2 mx-auto my-auto rounded-full bg-green-500"></span> : null}</span>
                    {req.label}
                  </li>
                );
              })}
            </ul>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 rounded-lg font-semibold shadow hover:from-purple-600 hover:to-indigo-600 transition"
            disabled={status === 'loading' || !canSubmit}
          >
            {status === 'loading' ? 'Registering...' : 'Register'}
          </button>
          <div className="mt-2 text-center">
            <span className="text-gray-500">Already have an account? </span>
            <Link to="/login" className="text-purple-600 font-medium hover:underline">Login</Link>
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

export default RegisterPage;
