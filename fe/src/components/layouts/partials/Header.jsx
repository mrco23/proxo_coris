import HeaderLogo from "./header/HeaderLogo";
import HeaderNav from "./header/HeaderNav";
import HeaderAuth from "./header/HeaderAuth";
import MobileMenu from "./header/MobileMenu";

function Header({ isAuthenticated, user, onLogout }) {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-transparent backdrop-blur-sm h-24 border-b border-gray-200 px-4 md:px-6 py-2 transition-colors duration-200 z-50 w-full flex justify-center">
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between">
        <HeaderLogo />
        <HeaderNav />
        <HeaderAuth
          isAuthenticated={isAuthenticated}
          user={user}
          onLogout={onLogout}
        />
        <MobileMenu
          isAuthenticated={isAuthenticated}
          user={user}
          onLogout={onLogout}
        />
      </div>
    </nav>
  );
}

export default Header;
