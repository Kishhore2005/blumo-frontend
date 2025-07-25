import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from '../Pages/Auth/LoginPage';
import RegisterPage from '../Pages/Auth/RegisterPage';
import RequireAuth from '../Components/Layout/RequireAuth';
// Import your actual dashboard page here
// import DashboardPage from '../Pages/Dashboard/DashboardIndex';

// Placeholder for a protected dashboard page
const DashboardPage = () => <div className="p-8">Welcome to the Dashboard!</div>;

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/',
    element: (
      <RequireAuth>
        <DashboardPage />
      </RequireAuth>
    ),
  },
]);

const AppRouter: React.FC = () => <RouterProvider router={router} />;

export default AppRouter;
