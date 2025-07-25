import React from 'react';
import { Outlet } from 'react-router-dom';

const DashboardLayout: React.FC = () => {
  return (
    <div className="flex h-screen">
      <aside className="w-60 bg-gray-900 text-white p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <nav>
          <ul className="space-y-2">
            <li><a href="/dashboard" className="hover:underline">Home</a></li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-50 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
