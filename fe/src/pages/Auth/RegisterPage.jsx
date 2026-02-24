import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { GoogleRegisterButton } from "../../components/features/auth/GoogleButton";
import AuthLogo from "../../components/features/auth/AuthLogo";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    full_name: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (form.password !== confirmPassword) {
      setError("Password tidak cocok");
      setLoading(false);
      return;
    }

    const result = await register(form);
    if (result.success) {
      setSuccess(
        "Registrasi berhasil! Silakan cek email kamu untuk verifikasi.",
      );
      setForm({
        email: "",
        username: "",
        password: "",
        full_name: "",
      });
      setConfirmPassword("");
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
            Buat Akun Baru
          </h1>
          <p className="text-center text-gray-500">
            Daftarkan diri anda untuk mulai bergabung
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 text-green-700 text-sm p-3 rounded-lg">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="full_name" className="font-medium">
            Nama Lengkap
          </label>
          <input
            type="text"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-(--primary) outline-(--primary) outline-[0.5px]"
            required
          />
          <label htmlFor="username" className="font-medium">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-(--primary) outline-(--primary) outline-[0.5px]"
            required
          />
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
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-(--primary) outline-(--primary) outline-[0.5px]"
            required
          />
          <label htmlFor="confirm_password" className="font-medium">
            Konfirmasi Password
          </label>
          <input
            type="password"
            name="confirm_password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-(--primary) outline-(--primary) outline-[0.5px]"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-(--primary) text-white py-2.5 rounded-lg hover:bg-(--primary-dark) disabled:opacity-50 transition font-medium cursor-pointer"
          >
            {loading ? "Memproses..." : "Buat Akun"}
          </button>
        </form>

        <div className="flex items-center gap-3">
          <hr className="flex-1" />
          <span className="text-gray-400 text-sm whitespace-nowrap">atau</span>
          <hr className="flex-1" />
        </div>
        <div className="flex w-full items-center justify-center">
          <GoogleRegisterButton
            disabled={loading}
            onSuccess={() => navigate("/")}
            onError={(err) => setError(err.message)}
          />
        </div>

        <p className="text-center text-sm text-gray-500">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-(--primary) hover:underline">
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
}
