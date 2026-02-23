import { useState } from "react";
import { Link } from "react-router";
import { authAPI } from "../../services/api/axios";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await authAPI.forgotPassword({ email });
      setSuccess(
        res.data?.message || "Link reset password telah dikirim ke email kamu.",
      );
    } catch (err) {
      setError(
        err.response?.data?.message || "Gagal mengirim link reset password.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-5">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Lupa Password
        </h1>
        <p className="text-sm text-gray-500 text-center">
          Masukkan email kamu dan kami akan mengirimkan link untuk reset
          password.
        </p>

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

        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition font-medium"
            >
              {loading ? "Mengirim..." : "Kirim Link Reset"}
            </button>
          </form>
        ) : (
          <p className="text-sm text-gray-500 text-center">
            Cek inbox atau folder spam di email kamu.
          </p>
        )}

        <p className="text-center text-sm text-gray-500">
          <Link
            to="/login"
            className="text-indigo-600 hover:underline font-medium"
          >
            ← Kembali ke Login
          </Link>
        </p>
      </div>
    </div>
  );
}
