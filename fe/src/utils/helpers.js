// Format date to Indonesian locale
export const formatDate = (date) => {
	if (!date) return "-";
	return new Date(date).toLocaleDateString("id-ID", {
		day: "2-digit",
		month: "long",
		year: "numeric",
	});
};

// Format date with time
export const formatDateTime = (date) => {
	if (!date) return "-";
	return new Date(date).toLocaleString("id-ID", {
		day: "2-digit",
		month: "short",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
};

// Format relative time
export const formatRelativeTime = (date) => {
	if (!date) return "-";
	const now = new Date();
	const diff = now - new Date(date);
	const seconds = Math.floor(diff / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	if (days > 0) return `${days} hari lalu`;
	if (hours > 0) return `${hours} jam lalu`;
	if (minutes > 0) return `${minutes} menit lalu`;
	return "Baru saja";
};

// Truncate text
export const truncateText = (text, maxLength = 50) => {
	if (!text) return "-";
	if (text.length <= maxLength) return text;
	return text.substring(0, maxLength) + "...";
};

// Get file extension
export const getFileExtension = (filename) => {
	if (!filename) return "";
	return filename.split(".").pop().toLowerCase();
};

// Check if file is PDF
export const isPDF = (filename) => {
	return getFileExtension(filename) === "pdf";
};

// Check if file is image
export const isImage = (filename) => {
	const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
	return imageExtensions.includes(getFileExtension(filename));
};

// Generate initials from name
export const getInitials = (name) => {
	if (!name) return "?";
	return name
		.split(" ")
		.map((word) => word[0])
		.join("")
		.toUpperCase()
		.substring(0, 2);
};

// Storage helpers
export const storage = {
	get: (key) => {
		try {
			const item = localStorage.getItem(key);
			return item ? JSON.parse(item) : null;
		} catch {
			return null;
		}
	},
	set: (key, value) => {
		try {
			localStorage.setItem(key, JSON.stringify(value));
		} catch {
			console.error("Error saving to localStorage");
		}
	},
	remove: (key) => {
		try {
			localStorage.removeItem(key);
		} catch {
			console.error("Error removing from localStorage");
		}
	},
};

// Token helpers
export const getToken = () => storage.get("token");
export const setToken = (token) => storage.set("token", token);
export const removeToken = () => storage.remove("token");

// User helpers
export const getUser = () => storage.get("user");
export const setUser = (user) => storage.set("user", user);
export const removeUser = () => storage.remove("user");

// Clear all auth data
export const clearAuth = () => {
	removeToken();
	removeUser();
};
