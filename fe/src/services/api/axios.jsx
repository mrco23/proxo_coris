import axios from "axios";
import { getToken, clearAuth } from "../../utils/helpers";

const api = axios.create({
	baseURL: "http://localhost:5001/api",
	headers: {
		"Content-Type": "application/json",
	},
});

// Request interceptor to add token
api.interceptors.request.use(
	(config) => {
		const token = getToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

// Response interceptor to handle errors
api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			clearAuth();
			window.location.href = "/login";
		}
		return Promise.reject(error);
	},
);

// Auth API
export const authAPI = {
	login: (data) => api.post("/auth/login", data),
	register: (data) => api.post("/auth/register", data),
	getMe: () => api.get("/auth/me"),
	logout: () => api.post("/auth/logout"),
};

// User API
export const userAPI = {
	getAll: () => api.get("/users"),
	getById: (id) => api.get(`/users/${id}`),
	getByRole: (role) => api.get(`/users/by-role/${role}`),
	create: (data) => api.post("/users", data),
	update: (id, data) => api.put(`/users/${id}`, data),
	delete: (id) => api.delete(`/users/${id}`),
};

export default api;
