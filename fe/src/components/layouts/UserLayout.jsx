import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { LuMenu } from "react-icons/lu";
import UserSidebar from "./partials/sidebar/UserSidebar";

function UserLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleNavClick = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <UserSidebar
        user={user}
        sidebarOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
        onNavClick={handleNavClick}
      />

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar */}
        <div className="fixed top-0 right-0 left-0 z-10 flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-4 md:px-6 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-600 transition hover:text-indigo-600"
            aria-label="Buka sidebar"
          >
            <LuMenu className="h-6 w-6" />
          </button>
          <span className="text-md font-semibold text-gray-800">
            {user?.username}
          </span>
        </div>

        <main className="flex-1 overflow-auto p-4 pt-20! md:p-6 lg:p-8 lg:pt-8!">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default UserLayout;
