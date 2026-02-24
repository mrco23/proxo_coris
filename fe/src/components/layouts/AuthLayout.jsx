import { Outlet } from "react-router";
import AuthInfo from "../features/auth/AuthInfo";

function AuthLayout() {
  return (
    <div className="min-h-screen bg-white transition-colors duration-200 p-5  flex flex-col">
      <main className="flex w-full h-full flex-1">
        <AuthInfo />
        <Outlet />
      </main>
    </div>
  );
}

export default AuthLayout;
