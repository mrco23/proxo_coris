import { Routes, Route } from "react-router";
import {
  ProtectedRoute,
  AdminRoute,
  GuestRoute,
} from "./components/common/ProtectedRoute";

/* layouts */
import PublicLayout from "./components/layouts/PublicLayout";
import AdminLayout from "./components/layouts/AdminLayout";
import AuthLayout from "./components/layouts/AuthLayout";

/* pages */
import LandingPage from "./pages/public/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";
import NotFoundPage from "./pages/NotFoundPage";
import UserProfile from "./pages/user/UserProfilePage";
import AdminDashboard from "./pages/admin/AdminDashboardPage";
import AdminProfile from "./pages/admin/AdminProfilePage";
import UsersManagement from "./pages/admin/AdminUserManagementPage";
import KolaboratorPage from "./pages/public/KolaboratorPage";

function App() {
  return (
    <Routes>
      {/* Standalone pages (no layout) */}
      <Route element={<GuestRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Route>
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />

      {/* Public + User */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/fitur/kolaborator" element={<KolaboratorPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<UserProfile />} />
        </Route>
      </Route>

      {/* Admin (sidebar layout) */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="users" element={<UsersManagement />} />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
