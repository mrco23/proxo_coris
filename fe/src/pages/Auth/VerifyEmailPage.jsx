import { useEffect, useRef, useState } from "react";
import { useSearchParams, Link } from "react-router";
import api, { authAPI } from "../../services/api/axios";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState(() => (token ? "loading" : "error"));
  const [message, setMessage] = useState(() =>
    token ? "" : "Token verifikasi tidak ditemukan.",
  );
  const calledRef = useRef(false);

  // Resend state
  const [resendEmail, setResendEmail] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMsg, setResendMsg] = useState(null);

  useEffect(() => {
    if (!token || calledRef.current) return;
    calledRef.current = true;

    api
      .get(`/auth/verify/${token}`)
      .then((res) => {
        setStatus("success");
        setMessage(res.data?.message || "Email berhasil diverifikasi!");
      })
      .catch((err) => {
        setStatus("error");
        setMessage(
          err.response?.data?.message ||
            "Verifikasi gagal. Token mungkin sudah kedaluwarsa.",
        );
      });
  }, [token]);

  const handleResend = async (e) => {
    e.preventDefault();
    if (!resendEmail) return;
    setResendLoading(true);
    setResendMsg(null);

    try {
      const res = await authAPI.resendVerification({ email: resendEmail });
      setResendMsg({
        type: "success",
        text: res.data?.message || "Email verifikasi telah dikirim ulang!",
      });
    } catch (err) {
      setResendMsg({
        type: "error",
        text: err.response?.data?.message || "Gagal mengirim ulang.",
      });
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center space-y-4">
        {status === "loading" && (
          <>
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-gray-500">Memverifikasi email...</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-3xl">✅</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Berhasil!</h2>
            <p className="text-gray-600">{message}</p>
            <Link
              to="/login"
              className="inline-block mt-2 px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
            >
              Masuk Sekarang
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-3xl">❌</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Gagal</h2>
            <p className="text-gray-600">{message}</p>

            {/* Resend verification form */}
            <div className="mt-4 pt-4 border-t border-gray-100 text-left space-y-3">
              <p className="text-sm text-gray-500 text-center">
                Token kedaluwarsa? Kirim ulang email verifikasi:
              </p>
              <form onSubmit={handleResend} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email kamu"
                  value={resendEmail}
                  onChange={(e) => setResendEmail(e.target.value)}
                  className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                <button
                  type="submit"
                  disabled={resendLoading}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 disabled:opacity-50 transition"
                >
                  {resendLoading ? "..." : "Kirim"}
                </button>
              </form>
              {resendMsg && (
                <p
                  className={`text-sm text-center ${resendMsg.type === "success" ? "text-green-600" : "text-red-600"}`}
                >
                  {resendMsg.text}
                </p>
              )}
            </div>

            <Link
              to="/login"
              className="inline-block mt-2 px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
            >
              Kembali ke Halaman Masuk
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
