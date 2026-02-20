import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { userAPI } from "../../services/api/axios";
import { getToken } from "../../utils/helpers";

function UserProfile() {
  const { user, saveSession } = useAuth();
  const [form, setForm] = useState({
    full_name: user?.full_name || "",
    username: user?.username || "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await userAPI.updateMe(form);
      saveSession(getToken(), res.data.data);
      setSuccess("Profil berhasil diperbarui!");
    } catch (err) {
      setError(err.response?.data?.message || "Gagal memperbarui profil");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-6 py-8 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Profil Saya</h1>

      {/* Avatar */}
      <div className="flex items-center gap-4">
        {user?.avatar_url ? (
          <img
            src={user.avatar_url}
            alt="avatar"
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xl font-bold">
            {user?.full_name?.charAt(0).toUpperCase() || "?"}
          </div>
        )}
        <div>
          <p className="font-semibold">{user?.full_name}</p>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
      </div>

      {success && (
        <div className="bg-green-50 text-green-700 text-sm p-3 rounded-lg">
          {success}
        </div>
      )}
      {error && (
        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100"
      >
        <div>
          <label className="text-sm font-medium text-gray-700">
            Nama Lengkap
          </label>
          <input
            type="text"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            className="mt-1 w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="mt-1 w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={user?.email}
            disabled
            className="mt-1 w-full border rounded-lg px-4 py-2.5 bg-gray-50 text-gray-400 cursor-not-allowed"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition font-medium"
        >
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </form>
    </div>
  );
}

export default UserProfile;
