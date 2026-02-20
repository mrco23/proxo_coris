import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { GoogleLoginButton } from "../../components/features/auth/GoogleButton";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-5">
        <h1 className="text-2xl font-bold text-center text-gray-800">Login</h1>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition font-medium"
          >
            {loading ? "Memproses..." : "Login"}
          </button>
        </form>

        <div className="flex items-center gap-3">
          <hr className="flex-1" />
          <span className="text-gray-400 text-sm">atau</span>
          <hr className="flex-1" />
        </div>

        <GoogleLoginButton
          disabled={loading}
          onSuccess={({ user }) => {
            const redirectTo = user?.role === "admin" ? "/admin" : "/";
            navigate(redirectTo);
          }}
          onError={(err) => {
            if (err.status === 404) {
              setError("Akun tidak ditemukan. Silakan daftar terlebih dahulu.");
            } else {
              setError(err.message);
            }
          }}
        />

        <p className="text-center text-sm text-gray-500">
          Belum punya akun?{" "}
          <Link
            to="/register"
            className="text-indigo-600 hover:underline font-medium"
          >
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
}
