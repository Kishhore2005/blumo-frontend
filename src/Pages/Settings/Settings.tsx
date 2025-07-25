import React, { useEffect } from "react";
import {
  UserIcon,
  LockClosedIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { logout, fetchUser } from '../Auth/authSlice';

const Settings: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  useEffect(() => {
    if (!user && accessToken) {
      dispatch(fetchUser(accessToken));
    }
  }, [user, accessToken, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    // Clear all local/session storage keys if needed
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-1">Settings</h1>
      <p className="text-gray-500 mb-8">Manage your account preferences and configuration</p>

      {/* Welcome Card */}
      <div className="bg-white rounded-xl shadow p-6 flex items-center gap-6 mb-8">
        <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center text-white text-2xl font-bold">
          {user?.name ? user.name[0].toUpperCase() : (user?.email ? user.email[0].toUpperCase() : 'U')}
        </div>
        <div>
          <div className="text-xl font-semibold text-gray-900 mb-1">Welcome back{user?.name ? `, ${user.name}` : (user?.email ? `, ${user.email}` : '')}!</div>
          {user?.email && <div className="text-gray-600">{user.email}</div>}
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
          <div className="flex items-center gap-3 mb-2">
            <UserIcon className="w-6 h-6 text-purple-500" />
            <span className="font-semibold text-gray-900 text-lg">Profile</span>
          </div>
          <div className="text-gray-500 mb-2">View and edit your profile information</div>
          <Link to="/settings/edit-profile" className="text-purple-600 font-medium hover:underline">Edit Profile &rarr;</Link>
        </div>
        {/* Password */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
          <div className="flex items-center gap-3 mb-2">
            <LockClosedIcon className="w-6 h-6 text-green-400" />
            <span className="font-semibold text-gray-900 text-lg">Password</span>
          </div>
          <div className="text-gray-500 mb-2">Change your account password</div>
          <Link to="/settings/changepassword" className="text-purple-600 font-medium hover:underline">Change Password &rarr;</Link>
        </div>
        {/* Sign Out */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
          <div className="flex items-center gap-3 mb-2">
            <ArrowRightOnRectangleIcon className="w-6 h-6 text-red-400" />
            <span className="font-semibold text-gray-900 text-lg">Sign Out</span>
          </div>
          <div className="text-gray-500 mb-2">Sign out of your Blumo account</div>
          <button onClick={handleLogout} className="text-red-500 font-medium hover:underline text-left">Sign Out &rarr;</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
