// File: src/pages/ChangePassword.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from '../../app/hooks';
import { API_BASE } from '../../Config/Env';

const ChangePassword: React.FC = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Failed to change password.');
        setLoading(false);
        return;
      }
      setShowSuccess(true);
      setTimeout(() => {
        navigate("/settings");
      }, 2000);
    } catch (err) {
      setError('Failed to change password.');
    } finally {
      setLoading(false);
    }
  };

  // For input focus and button hover
  const [focusField, setFocusField] = useState<string | null>(null);
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-8">
      <div className="bg-white rounded-xl shadow p-8 w-full max-w-md min-h-[420px] flex flex-col justify-center">
        <div className="flex flex-col items-center mb-5">
          <div className="text-2xl font-bold text-purple-600 tracking-tight">Change Password</div>
          {user && (
            <div className="mt-2 flex flex-col items-center bg-purple-50 rounded-lg p-3 w-full">
              <div className="font-semibold text-gray-900 text-base truncate">{user.name || user.email}</div>
              {user.email && <div className="text-xs text-gray-500 truncate">{user.email}</div>}
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <label htmlFor="oldPassword" className="block mb-1 text-gray-700 font-medium text-[15px]">Current Password</label>
          <input
            id="oldPassword"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-lg text-[15px] bg-gray-50 mb-2 focus:outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100 border-gray-200 ${focusField === "old" ? "border-purple-500 ring-2 ring-purple-100" : ""}`}
            onFocus={() => setFocusField("old")}
            onBlur={() => setFocusField(null)}
            required
          />
          <label htmlFor="newPassword" className="block mb-1 text-gray-700 font-medium text-[15px]">New Password</label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-lg text-[15px] bg-gray-50 mb-2 focus:outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100 border-gray-200 ${focusField === "new" ? "border-purple-500 ring-2 ring-purple-100" : ""}`}
            onFocus={() => setFocusField("new")}
            onBlur={() => setFocusField(null)}
            required
          />
          <label htmlFor="confirmPassword" className="block mb-1 text-gray-700 font-medium text-[15px]">Confirm New Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-lg text-[15px] bg-gray-50 mb-2 focus:outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100 border-gray-200 ${focusField === "confirm" ? "border-purple-500 ring-2 ring-purple-100" : ""}`}
            onFocus={() => setFocusField("confirm")}
            onBlur={() => setFocusField(null)}
            required
          />
          {error && <div className="text-red-600 text-center mb-2">{error}</div>}
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg font-semibold text-[15px] shadow hover:from-purple-600 hover:to-indigo-600 transition mt-1"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button
            type="button"
            className="px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold text-[15px] shadow hover:bg-gray-700 transition mt-1"
            onClick={() => navigate("/settings")}
          >
            Cancel
          </button>
        </form>
        {showSuccess && (
          <div className="mt-6 p-4 bg-purple-100 text-purple-700 border border-purple-400 rounded-lg text-center font-medium">
            Password changed successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangePassword;
