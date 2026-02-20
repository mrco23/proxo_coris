import { useState, useEffect } from "react";
import { userAPI } from "../../services/api/axios";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState({
    page: 1,
    per_page: 10,
    search: "",
    role: "",
    is_verified: "",
    sort_by: "created_at",
    sort_order: "desc",
  });

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      // Bersihkan params kosong sebelum dikirim
      const params = Object.fromEntries(
        // eslint-disable-next-line no-unused-vars
        Object.entries(query).filter(([_, v]) => v !== ""),
      );
      const res = await userAPI.getAll(params);
      setUsers(res.data.data);
      setMeta(res.data.meta?.pagination);
    } catch (err) {
      setError(err.response?.data?.message || "Gagal memuat data user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.page, query.role, query.is_verified, query.sort_order]);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery((q) => ({ ...q, page: 1 }));
    fetchUsers();
  };

  const handleDeactivate = async (userId) => {
    if (!confirm("Nonaktifkan user ini?")) return;
    try {
      await userAPI.deactivate(userId);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menonaktifkan user");
    }
  };

  const handleDelete = async (userId) => {
    if (!confirm("Hapus user ini? Tindakan ini tidak bisa dibatalkan.")) return;
    try {
      await userAPI.delete(userId);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menghapus user");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Manajemen User</h1>

      {/* Filter & Search */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 space-y-3">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            placeholder="Cari email, username, nama..."
            value={query.search}
            onChange={(e) =>
              setQuery((q) => ({ ...q, search: e.target.value }))
            }
            className="flex-1 border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition"
          >
            Cari
          </button>
        </form>

        <div className="flex gap-3 flex-wrap">
          <select
            value={query.role}
            onChange={(e) =>
              setQuery((q) => ({ ...q, role: e.target.value, page: 1 }))
            }
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Semua Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <select
            value={query.is_verified}
            onChange={(e) =>
              setQuery((q) => ({ ...q, is_verified: e.target.value, page: 1 }))
            }
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Semua Status</option>
            <option value="true">Terverifikasi</option>
            <option value="false">Belum Verifikasi</option>
          </select>

          <select
            value={query.sort_order}
            onChange={(e) =>
              setQuery((q) => ({ ...q, sort_order: e.target.value, page: 1 }))
            }
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="desc">Terbaru</option>
            <option value="asc">Terlama</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {error && (
          <div className="p-4 text-red-600 text-sm bg-red-50">{error}</div>
        )}

        {loading ? (
          <div className="p-10 flex justify-center">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : users.length === 0 ? (
          <div className="p-10 text-center text-gray-400 text-sm">
            Tidak ada user ditemukan
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">
                    User
                  </th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">
                    Role
                  </th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">
                    Login via
                  </th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">
                    Dibuat
                  </th>
                  <th className="text-right px-4 py-3 text-gray-600 font-medium">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {user.avatar_url ? (
                          <img
                            src={user.avatar_url}
                            alt=""
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                            {user.full_name?.charAt(0).toUpperCase() || "?"}
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-800">
                            {user.full_name || "-"}
                          </p>
                          <p className="text-gray-400 text-xs">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {!user.is_active ? (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-600">
                          Nonaktif
                        </span>
                      ) : user.is_verified ? (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600">
                          Aktif
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-600">
                          Belum Verifikasi
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-500 capitalize">
                      {user.auth_provider === "google"
                        ? "🔵 Google"
                        : "✉️ Email"}
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs">
                      {new Date(user.created_at).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {user.is_active && (
                          <button
                            onClick={() => handleDeactivate(user.id)}
                            className="text-xs text-yellow-600 hover:text-yellow-800 transition"
                          >
                            Nonaktifkan
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-xs text-red-500 hover:text-red-700 transition"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {meta && meta.total_pages > 1 && (
          <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
            <span>
              Menampilkan {users.length} dari {meta.total} user
            </span>
            <div className="flex gap-2">
              <button
                disabled={!meta.has_prev}
                onClick={() => setQuery((q) => ({ ...q, page: q.page - 1 }))}
                className="px-3 py-1 border rounded-lg disabled:opacity-40 hover:bg-gray-50 transition"
              >
                ← Prev
              </button>
              <span className="px-3 py-1">
                {meta.page} / {meta.total_pages}
              </span>
              <button
                disabled={!meta.has_next}
                onClick={() => setQuery((q) => ({ ...q, page: q.page + 1 }))}
                className="px-3 py-1 border rounded-lg disabled:opacity-40 hover:bg-gray-50 transition"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
