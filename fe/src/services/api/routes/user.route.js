import api from "../axios";

export const userAPI = {
  // User biasa
  getAll: (params) => api.get("/users", { params }),
  getById: (id) => api.get(`/users/${id}`),
  updateMe: (data) => api.patch("/users/me", data),
  uploadAvatar: (file) => {
    const formData = new FormData();
    formData.append("avatar", file);
    return api.post("/users/me/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  // Admin
  update: (id, data) => api.patch(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
  deactivate: (id) => api.post(`/users/${id}/deactivate`),
  activate: (id) => api.post(`/users/${id}/activate`),
};
