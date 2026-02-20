import { useEffect, useRef, useState } from "react";
import { useSearchParams, Link } from "react-router";
import api from "../../services/api/axios";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState(() => (token ? "loading" : "error"));
  const [message, setMessage] = useState(() =>
    token ? "" : "Token verifikasi tidak ditemukan.",
  );
  const calledRef = useRef(false);

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
              Login Sekarang
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
            <Link
              to="/login"
              className="inline-block mt-2 px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
            >
              Kembali ke Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
