import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { LuUser, LuSettings, LuLogOut } from "react-icons/lu";

function HeaderAuth({ isAuthenticated, user, onLogout }) {
  const [avatarOpen, setAvatarOpen] = useState(false);
  const avatarRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target)) {
        setAvatarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setAvatarOpen(false);
    await onLogout();
  };

  if (!isAuthenticated) {
    return (
      <div className="hidden md:flex items-center">
        <Link
          to="/login"
          className="px-5 py-2 bg-gray-900 text-white rounded-lg hover:bg-black transition font-medium text-sm shadow-sm"
        >
          Bergabung
        </Link>
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center">
      <div className="relative" ref={avatarRef}>
        <button
          onClick={() => setAvatarOpen(!avatarOpen)}
          className="flex items-center gap-2 cursor-pointer rounded-full hover:ring-2 hover:ring-emerald-200 transition"
        >
          {user?.avatar_url ? (
            <img
              src={user.avatar_url}
              alt=""
              referrerPolicy="no-referrer"
              className="w-9 h-9 rounded-full object-cover border-2 border-gray-200"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center text-sm font-bold text-white border-2 border-gray-400">
              {user?.username?.charAt(0).toUpperCase() || "?"}
            </div>
          )}
        </button>

        {avatarOpen && (
          <div className="absolute right-0 top-full mt-2 w-60 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-[fadeIn_0.15s_ease-out]">
            {/* User info */}
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-800 truncate">
                {user?.username || user?.full_name}
              </p>
              <p className="text-xs text-gray-500 truncate mt-0.5">
                {user?.email}
              </p>
            </div>

            {/* Menu items */}
            {user?.role === "admin" && (
              <Link
                to="/admin"
                onClick={() => setAvatarOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-emerald-600 transition"
              >
                <LuSettings className="w-4 h-4" />
                Admin Panel
              </Link>
            )}
            <Link
              to="/profile"
              onClick={() => setAvatarOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-emerald-600 transition"
            >
              <LuUser className="w-4 h-4" />
              Profil
            </Link>

            {/* Logout */}
            <div className="border-t border-gray-100 mt-1 pt-1">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 hover:text-red-600 transition cursor-pointer"
              >
                <LuLogOut className="w-4 h-4" />
                Keluar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeaderAuth;
