import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SidebarLayout from "./Components/Layout/SidebarLayout";
import DashboardIndex from "./Pages/Dashboard/DashboardIndex";
import CampaignIndex from "./Pages/Campaign/CampaignIndex";
import Settings from "./Pages/Settings/Settings";
import QuillEditor from "./Components/Editors/QuillEditor";
import ChangePassword from "./Pages/Settings/ChangePassword";
import LoginPage from "./Pages/Auth/LoginPage";
import RegisterPage from "./Pages/Auth/RegisterPage";
import { Provider } from "react-redux";
import { store } from "./app/store";
import RequireAuth from "./Components/Layout/RequireAuth";
import EditProfilePage from "./Pages/Settings/EditProfilePage";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { fetchUser } from "./Pages/Auth/authSlice";
import SplashScreen from "./Pages/Auth/SplashScreen";

function AuthBootstrapper() {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const user = useAppSelector(state => state.auth.user);
  useEffect(() => {
    const storedToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (!user && storedToken && accessToken === storedToken) {
      dispatch(fetchUser(storedToken));
    }
  }, [user, accessToken, dispatch]);
  return null;
}

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AuthBootstrapper />
      <Router>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<SplashScreen />} />

          {/* Protected Routes */}
          <Route element={<RequireAuth><SidebarLayout /></RequireAuth>}>
            <Route path="/dashboard" element={<DashboardIndex />} />
            <Route path="/campaign" element={<CampaignIndex />} />
            <Route path="/campaign/compose" element={<QuillEditor />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/settings/changepassword" element={<ChangePassword />} />
            <Route path="/settings/edit-profile" element={<EditProfilePage />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Route>

          {/* Not Found */}
          <Route
            path="*"
            element={
              <div style={{ padding: "20px" }}>
                <h2>Page Not Found</h2>
              </div>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
