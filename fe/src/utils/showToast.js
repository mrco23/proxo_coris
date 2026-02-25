import toast from "react-hot-toast";

/**
 * Helper utility untuk menampilkan toast notification.
 * Cara pakai:
 *
 *   import showToast from "../utils/showToast";
 *
 *   showToast.success("Berhasil disimpan!");
 *   showToast.error("Terjadi kesalahan!");
 *   showToast.info("Silakan lengkapi form");
 *   showToast.promise(fetchData(), {
 *     loading: "Memuat...",
 *     success: "Berhasil!",
 *     error: "Gagal memuat data",
 *   });
 */
const showToast = {
  success: (message, options = {}) =>
    toast.success(message, { duration: 3000, ...options }),

  error: (message, options = {}) =>
    toast.error(message, { duration: 5000, ...options }),

  info: (message, options = {}) =>
    toast(message, { icon: "ℹ️", duration: 4000, ...options }),

  warning: (message, options = {}) =>
    toast(message, { icon: "⚠️", duration: 4000, ...options }),

  promise: (promise, messages, options = {}) =>
    toast.promise(promise, messages, options),
};

export default showToast;
