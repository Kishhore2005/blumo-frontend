import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useNavigate } from "react-router-dom";
import { API_BASE } from '../../Config/Env';
import { fetchUser } from '../Auth/authSlice';

const EditProfilePage: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Failed to update profile.');
        setLoading(false);
        return;
      }
      setSuccess(true);
      dispatch(fetchUser(accessToken!));
      setTimeout(() => {
        navigate('/settings');
      }, 1500);
    } catch (err) {
      setError('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-8">
      <div className="bg-white rounded-xl shadow p-8 w-full max-w-md flex flex-col justify-center">
        <div className="text-2xl font-bold text-purple-600 mb-2 text-center tracking-tight">Edit Profile</div>
        {user && (
          <div className="mb-4 flex flex-col items-center bg-purple-50 rounded-lg p-3 w-full">
            <div className="font-semibold text-gray-900 text-base truncate">{user.name || user.email}</div>
            {user.email && <div className="text-xs text-gray-500 truncate">{user.email}</div>}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition bg-gray-50 text-[15px]"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition bg-gray-50 text-[15px]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-red-600 text-center mb-2">{error}</div>}
          {success && <div className="text-green-600 text-center mb-2">Profile updated successfully!</div>}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 rounded-lg font-semibold shadow hover:from-purple-600 hover:to-indigo-600 transition"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            className="w-full bg-gray-500 text-white py-3 rounded-lg font-semibold shadow hover:bg-gray-700 transition"
            onClick={() => navigate('/settings')}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage; 