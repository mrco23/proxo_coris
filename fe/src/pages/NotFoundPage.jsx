import { Link } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function NotFoundPage() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="space-y-4 text-center">
        <h1 className="text-7xl font-extrabold text-(--primary)">404</h1>
        <p className="text-xl text-gray-600">
          Halaman yang kamu cari tidak ditemukan.
        </p>
        <Link
          to={user?.role === "admin" ? "/admin" : "/"}
          className="mt-4 inline-block rounded-lg bg-(--primary) px-6 py-2.5 font-medium text-white transition hover:bg-(--primary-dark)"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
