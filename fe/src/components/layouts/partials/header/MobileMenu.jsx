import { useState } from "react";
import { Link } from "react-router";
import { LuMenu, LuX, LuChevronDown } from "react-icons/lu";
import { fiturItems } from "./navConstants";

function MobileMenu({ isAuthenticated, user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileFiturOpen, setMobileFiturOpen] = useState(false);

  const handleLogout = async () => {
    setMenuOpen(false);
    await onLogout();
  };

  return (
    <>
      {/* Hamburger button */}
      <div className="flex items-center gap-2 md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-600 hover:text-black hover:font-bold transition p-1 cursor-pointer"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <LuX className="w-6 h-6" />
          ) : (
            <LuMenu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Dropdown menu */}
      {menuOpen && (
        <div className="md:hidden absolute left-0 right-0 top-full bg-white border-b border-gray-200 px-4 pb-3 pt-3 space-y-1 z-40 shadow-sm">
          {/* Navigation */}
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block px-3 py-2.5 text-sm text-gray-700 hover:text-black hover:font-semibold hover:bg-gray-50 rounded-lg transition font-medium"
          >
            Beranda
          </Link>
          <Link
            to="/peta"
            onClick={() => setMenuOpen(false)}
            className="block px-3 py-2.5 text-sm text-gray-700 hover:text-black hover:font-semibold hover:bg-gray-50 rounded-lg transition font-medium"
          >
            Peta
          </Link>

          {/* Fitur accordion */}
          <div>
            <button
              onClick={() => setMobileFiturOpen(!mobileFiturOpen)}
              className="flex items-center justify-between w-full px-3 py-2.5 text-sm text-gray-700 hover:text-black hover:font-semibold hover:bg-gray-50 rounded-lg transition font-medium cursor-pointer"
            >
              Fitur
              <LuChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  mobileFiturOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {mobileFiturOpen && (
              <div className="ml-4 mt-1 space-y-1 border-l-2 border-emerald-200 pl-3">
                {fiturItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 text-sm text-gray-600 hover:text-black hover:font-semibold hover:bg-gray-50 rounded-lg transition font-medium"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Auth section */}
          <div className="border-t border-gray-200 pt-2 mt-2">
            {isAuthenticated ? (
              <>
                <div className="px-3 py-2">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {user?.username || user?.full_name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email}
                  </p>
                </div>
                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    onClick={() => setMenuOpen(false)}
                    className="block px-3 py-2.5 text-sm text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-lg transition font-medium"
                  >
                    Admin Panel
                  </Link>
                )}
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2.5 text-sm text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-lg transition font-medium"
                >
                  Profil
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2.5 text-sm text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition font-medium cursor-pointer"
                >
                  Keluar
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block mx-3 mt-1 text-center px-4 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-black transition font-medium text-sm"
              >
                Bergabung
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default MobileMenu;
