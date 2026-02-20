import { Routes, Route } from "react-router";
import {
  ProtectedRoute,
  AdminRoute,
  GuestRoute,
} from "./components/common/ProtectedRoute";

/* layouts */
import PublicLayout from "./components/layouts/PublicLayout";
import AdminLayout from "./components/layouts/AdminLayout";

/* pages */
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import VerifyEmailPage from "./pages/Auth/VerifyEmailPage";
import NotFoundPage from "./pages/NotFoundPage";
import UserProfile from "./pages/Users/UserProfile";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminProfile from "./pages/Admin/AdminProfile";
import UsersManagement from "./pages/Admin/UsersManagement";

function App() {
  return (
    <Routes>
      {/* Standalone pages (no layout) */}
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route path="/verify-email" element={<VerifyEmailPage />} />

      {/* Public + User (shared Navbar via PublicLayout) */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />

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
