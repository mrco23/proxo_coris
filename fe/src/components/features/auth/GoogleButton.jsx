import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../../contexts/AuthContext";
import { authAPI } from "../../../services/api/axios";
import GoogleIcon from "./GoogleIcon";

export function GoogleLoginButton({ onSuccess, onError, disabled = false }) {
  const { saveSession } = useAuth();

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ access_token }) => {
      try {
        const res = await authAPI.googleAuth({ access_token, intent: "login" });
        const { access_token: accessToken, user } = res.data.data;
        saveSession(accessToken, user);
        onSuccess?.({ user });
      } catch (err) {
        onError?.({
          message: err.response?.data?.message || "Login Google gagal",
          status: err.response?.status,
        });
      }
    },
    onError: () => onError?.({ message: "Login Google dibatalkan" }),
  });

  return (
    <button
      onClick={() => googleLogin()}
      disabled={disabled}
      className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2.5 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition font-medium"
    >
      <GoogleIcon />
      Lanjutkan dengan Google
    </button>
  );
}

export function GoogleRegisterButton({ onSuccess, onError, disabled = false }) {
  const { saveSession } = useAuth();

  const googleRegister = useGoogleLogin({
    onSuccess: async ({ access_token }) => {
      try {
        const res = await authAPI.googleAuth({
          access_token,
          intent: "register",
        });
        const { access_token: accessToken, user } = res.data.data;
        saveSession(accessToken, user);
        onSuccess?.({ user });
      } catch (err) {
        onError?.({
          message: err.response?.data?.message || "Register Google gagal",
          status: err.response?.status,
        });
      }
    },
    onError: () => onError?.({ message: "Register Google dibatalkan" }),
  });

  return (
    <button
      onClick={() => googleRegister()}
      disabled={disabled}
      className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2.5 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition font-medium"
    >
      <GoogleIcon />
      Daftar dengan Google
    </button>
  );
}
