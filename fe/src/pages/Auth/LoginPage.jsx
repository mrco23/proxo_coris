import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { GoogleLoginButton } from "../../components/features/auth/GoogleButton";
import AuthLogo from "../../components/features/auth/AuthLogo";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await login(form.email, form.password);
    if (result.success) {
      const redirectTo = result.user?.role === "admin" ? "/admin" : "/";
      navigate(redirectTo);
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="space-y-5 p-6 max-w-lg w-full">
        <div className="flex items-center justify-center">
          <AuthLogo />
        </div>
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-center text-black">
            Selamat Datang
          </h1>
          <p className="text-center text-gray-500">
            Masuk ke akun anda terlebih dahulu
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="email" className="font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-(--primary) outline-(--primary) outline-[0.5px]"
            required
          />
          <label htmlFor="password" className="font-medium">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-(--primary) outline-(--primary) outline-[0.5px]"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-(--primary) hover:underline"
            >
              Lupa Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-(--primary) text-white py-2.5 rounded-lg hover:bg-(--primary-dark) disabled:opacity-50 transition font-medium cursor-pointer"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <div className="flex items-center gap-3">
          <hr className="flex-1" />
          <span className="text-gray-400 text-sm whitespace-nowrap">atau</span>
          <hr className="flex-1" />
        </div>
        <div className="flex w-full items-center justify-center">
          <GoogleLoginButton
            disabled={loading}
            onSuccess={({ user }) => {
              const redirectTo = user?.role === "admin" ? "/admin" : "/";
              navigate(redirectTo);
            }}
            onError={(err) => setError(err.message)}
          />
        </div>

        <p className="text-center text-sm text-gray-500">
          Belum punya akun?{" "}
          <Link to="/register" className="text-(--primary) hover:underline">
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
}
