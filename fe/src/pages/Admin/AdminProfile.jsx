import { useState, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { userAPI } from "../../services/api/routes/user.route";
import { authAPI } from "../../services/api/routes/auth.route";
import { getToken } from "../../utils/storage";

function AdminProfile() {
  const { user, saveSession, refreshUser } = useAuth();

  // Profile form
  const [form, setForm] = useState({
    full_name: user?.full_name || "",
    username: user?.username || "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  // Avatar
  const fileInputRef = useRef(null);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [avatarMsg, setAvatarMsg] = useState(null);

  // Change password
  const [pwForm, setPwForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [pwLoading, setPwLoading] = useState(false);
  const [pwSuccess, setPwSuccess] = useState(null);
  const [pwError, setPwError] = useState(null);

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

  // Avatar upload
  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setAvatarMsg({ type: "error", text: "Ukuran file maksimal 5MB" });
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      setAvatarMsg({ type: "error", text: "Format file harus JPG atau PNG" });
      return;
    }

    setAvatarLoading(true);
    setAvatarMsg(null);

    try {
      await userAPI.uploadAvatar(file);
      await refreshUser();
      setAvatarMsg({ type: "success", text: "Avatar berhasil diupdate!" });
    } catch (err) {
      setAvatarMsg({
        type: "error",
        text: err.response?.data?.message || "Gagal upload avatar",
      });
    } finally {
      setAvatarLoading(false);
    }
  };

  // Change password
  const handlePwChange = (e) =>
    setPwForm({ ...pwForm, [e.target.name]: e.target.value });

  const handlePwSubmit = async (e) => {
    e.preventDefault();
    setPwError(null);
    setPwSuccess(null);

    if (pwForm.new_password !== pwForm.confirm_password) {
      setPwError("Password baru tidak sama.");
      return;
    }

    if (pwForm.new_password.length < 8) {
      setPwError("Password minimal 8 karakter.");
      return;
    }

    setPwLoading(true);
    try {
      await authAPI.changePassword({
        current_password: pwForm.current_password,
        new_password: pwForm.new_password,
      });
      setPwSuccess("Password berhasil diperbarui!");
      setPwForm({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });
    } catch (err) {
      setPwError(err.response?.data?.message || "Gagal mengubah password");
    } finally {
      setPwLoading(false);
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Profil Saya</h1>
      <div className="mx-auto w-full space-y-8">
        {/* Avatar Section */}
        <div className="flex items-center gap-4">
          <div className="group relative">
            {user?.avatar_url ? (
              <img
                src={user.avatar_url}
                alt="avatar"
                referrerPolicy="no-referrer"
                className="h-20 w-20 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-2xl font-bold text-(--primary)">
                {user?.full_name?.charAt(0).toUpperCase() || "?"}
              </div>
            )}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={avatarLoading}
              className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/40 opacity-0 transition group-hover:opacity-100"
            >
              <span className="text-xs font-medium text-white">
                {avatarLoading ? "..." : "Ubah"}
              </span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/jpg"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>
          <div>
            <p className="font-semibold">{user?.full_name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
            {avatarMsg && (
              <p
                className={`mt-1 text-xs ${avatarMsg.type === "success" ? "text-green-600" : "text-red-600"}`}
              >
                {avatarMsg.text}
              </p>
            )}
          </div>
        </div>

        <div className="flex w-full flex-col gap-4 md:flex-row">
          {/* Profile Form */}
          <div className="w-full space-y-4 md:max-w-[568px]">
            <h2 className="text-lg font-semibold text-gray-800">
              Informasi Profil
            </h2>

            {success && (
              <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
                {success}
              </div>
            )}
            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
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
                  className="mt-1 w-full rounded-lg border px-4 py-2.5 focus:ring-1 focus:ring-(--primary) focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border px-4 py-2.5 focus:ring-1 focus:ring-(--primary) focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={user?.email}
                  disabled
                  className="mt-1 w-full cursor-not-allowed rounded-lg border bg-gray-50 px-4 py-2.5 text-gray-400"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer rounded-lg bg-(--primary) py-2.5 font-medium text-white transition hover:bg-(--primary-dark) disabled:opacity-50"
              >
                {loading ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </form>
          </div>

          {/* Change Password Section (only for non-Google accounts) */}
          {user?.auth_provider !== "google" && (
            <div className="w-full space-y-4 md:max-w-[568px]">
              <h2 className="text-lg font-semibold text-gray-800">
                Ubah Password
              </h2>

              {pwSuccess && (
                <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
                  {pwSuccess}
                </div>
              )}
              {pwError && (
                <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  {pwError}
                </div>
              )}

              <form
                onSubmit={handlePwSubmit}
                className="space-y-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Password Saat Ini
                  </label>
                  <input
                    type="password"
                    name="current_password"
                    value={pwForm.current_password}
                    onChange={handlePwChange}
                    className="mt-1 w-full rounded-lg border px-4 py-2.5 focus:ring-1 focus:ring-(--primary) focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Password Baru
                  </label>
                  <input
                    type="password"
                    name="new_password"
                    value={pwForm.new_password}
                    onChange={handlePwChange}
                    className="mt-1 w-full rounded-lg border px-4 py-2.5 focus:ring-1 focus:ring-(--primary) focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Konfirmasi Password Baru
                  </label>
                  <input
                    type="password"
                    name="confirm_password"
                    value={pwForm.confirm_password}
                    onChange={handlePwChange}
                    className="mt-1 w-full rounded-lg border px-4 py-2.5 focus:ring-1 focus:ring-(--primary) focus:outline-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={pwLoading}
                  className="w-full cursor-pointer rounded-lg bg-gray-800 py-2.5 font-medium text-white transition hover:bg-gray-900 disabled:opacity-50"
                >
                  {pwLoading ? "Menyimpan..." : "Ubah Password"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>{" "}
    </div>
  );
}

export default AdminProfile;
