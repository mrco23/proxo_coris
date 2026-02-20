import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-4">
        <h1 className="text-7xl font-extrabold text-indigo-600">404</h1>
        <p className="text-xl text-gray-600">
          Halaman yang kamu cari tidak ditemukan.
        </p>
        <Link
          to="/"
          className="inline-block mt-4 px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
