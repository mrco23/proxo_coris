import { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../services/api/axios";
import { getToken, setToken, setUser, clearAuth } from "../utils/helpers";

const AuthContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();
      if (token) {
        try {
          const res = await authAPI.getMe();
          setUserState(res.data.data);
          setUser(res.data.data);
        } catch {
          clearAuth();
          setUserState(null);
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const saveSession = (token, userData) => {
    setToken(token);
    setUser(userData);
    setUserState(userData);
  };

  const refreshUser = async () => {
    try {
      const res = await authAPI.getMe();
      setUserState(res.data.data);
      setUser(res.data.data);
      return res.data.data;
    } catch {
      return null;
    }
  };

  const login = async (email, password) => {
    try {
      const res = await authAPI.login({ email, password });
      const { access_token, user } = res.data.data;
      saveSession(access_token, user);
      return { success: true, user };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Login gagal",
      };
    }
  };

  const register = async (formData) => {
    try {
      await authAPI.register(formData);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Registrasi gagal",
      };
    }
  };

  const logout = async () => {
    // try {
    //   await authAPI.logout();
    // } catch {
    //   // ignore error
    // }
    clearAuth();
    setUserState(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        saveSession,
        refreshUser,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
