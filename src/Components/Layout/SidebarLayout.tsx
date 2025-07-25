import React from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { HomeIcon, EnvelopeIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { logout } from '../../Pages/Auth/authSlice';

interface SidebarLayoutProps {
  children?: React.ReactNode;
}

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: <HomeIcon className="w-5 h-5" /> },
  { name: "Email Campaigns", path: "/campaign", icon: <EnvelopeIcon className="w-5 h-5" /> },
  { name: "Settings", path: "/settings", icon: <Cog6ToothIcon className="w-5 h-5" /> },
];

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white flex flex-col px-6 py-8 shadow">
        {/* Logo and subtitle */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-purple-600">Blumo</h1>
          <p className="text-gray-400 text-sm mt-1">Email Marketing Made Simple</p>
        </div>
        {/* User Info */}
        {user && (
          <div className="mb-8 flex flex-col items-start gap-1 bg-purple-50 rounded-lg p-4">
            <div className="font-semibold text-gray-900 text-base truncate">{user.name || user.email}</div>
            {user.email && <div className="text-xs text-gray-500 truncate">{user.email}</div>}
          </div>
        )}
        {/* Navigation */}
        <nav className="flex flex-col gap-2 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded font-medium transition hover:bg-gray-100 ${
                location.pathname === item.path
                  ? "bg-purple-500 text-white"
                  : "text-gray-700"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-8 flex items-center gap-2 px-3 py-2 rounded font-semibold text-red-500 hover:bg-red-50 transition w-full justify-start"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          Logout
        </button>
      </div>
      <main className="flex-1 bg-gray-100 p-8 overflow-y-auto">
        {/* Render children or nested routes */}
        {children}
        <Outlet />
      </main>
    </div>
  );
};

export default SidebarLayout;
