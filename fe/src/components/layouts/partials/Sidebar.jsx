import { Link, useLocation } from "react-router";
import { LuLayoutDashboard, LuUsers, LuUserCog, LuX } from "react-icons/lu";

const menuItems = [
  { label: "Dashboard", path: "/admin", icon: LuLayoutDashboard },
  { label: "Pengguna", path: "/admin/users", icon: LuUsers },
  { label: "Profil", path: "/admin/profile", icon: LuUserCog },
];

function Sidebar({ user, sidebarOpen, onClose, onLogout, onNavClick }) {
  const location = useLocation();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white flex flex-col shrink-0 transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Brand */}
      <div className="px-6 py-5 border-b border-gray-800 flex items-center justify-between">
        <div>
          <Link to="/admin" className="text-lg font-bold text-white">
            Torang Bersih
          </Link>
          <p className="text-xs text-gray-400 mt-0.5">Panel Admin</p>
        </div>
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="lg:hidden text-gray-400 hover:text-white transition"
          aria-label="Tutup sidebar"
        >
          <LuX className="w-5 h-5" />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onNavClick}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                isActive
                  ? "bg-indigo-600 text-white font-medium"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User info + Logout */}
      <div className="px-4 py-4 border-t border-gray-800">
        <div className="flex items-center gap-3 mb-3">
          {user?.avatar_url ? (
            <img
              src={user.avatar_url}
              alt=""
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold">
              {user?.full_name?.charAt(0).toUpperCase() || "?"}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {user?.full_name || user?.username}
            </p>
            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full cursor-pointer text-sm text-gray-400 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-lg transition text-center"
        >
          Keluar
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
