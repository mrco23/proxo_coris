import { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../services/api/axios";
import {
	getToken,
	setToken,
	removeToken,
	getUser,
	setUser,
	removeUser,
	clearAuth,
} from "../utils/helpers";

const AuthContext = createContext(null);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

export const AuthProvider = ({ children }) => {
	const [user, setUserState] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Check auth on mount
	useEffect(() => {
		const initAuth = async () => {
			const token = getToken();
			const savedUser = getUser();

			if (token && savedUser) {
				try {
					const response = await authAPI.getMe();
					setUserState(response.data.user);
					setUser(response.data.user);
				} catch (err) {
					console.error("Auth init error:", err);
					clearAuth();
					setUserState(null);
				}
			}
			setLoading(false);
		};

		initAuth();
	}, []);

	const login = async (email, password) => {
		try {
			setError(null);
			const response = await authAPI.login({ email, password });
			const { token, user } = response.data;

			setToken(token);
			setUser(user);
			setUserState(user);

			return { success: true };
		} catch (err) {
			const message = err.response?.data?.message || "Login gagal";
			setError(message);
			return { success: false, message };
		}
	};

	const logout = async () => {
		try {
			await authAPI.logout();
		} catch (err) {
			console.error("Logout error:", err);
		} finally {
			clearAuth();
			setUserState(null);
		}
	};

	const value = {
		user,
		loading,
		error,
		isAuthenticated: !!user,
		login,
		logout,
		clearError: () => setError(null),
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
