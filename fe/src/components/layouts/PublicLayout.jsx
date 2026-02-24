import { Outlet } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import Header from "./partials/header/Header";
import Footer from "./partials/Footer";

function PublicLayout() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-200 flex flex-col">
      <Header isAuthenticated={isAuthenticated} user={user} onLogout={logout} />

      {/* Content fill empty space*/}
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default PublicLayout;
