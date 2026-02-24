import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../../contexts/AuthContext";
import { authAPI } from "../../../services/api/routes/auth.route";
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
          message: err.response?.data?.message || "Gagal masuk dengan Google",
          status: err.response?.status,
        });
      }
    },
    onError: () => onError?.({ message: "Masuk dengan Google dibatalkan" }),
  });

  return (
    <button
      onClick={() => googleLogin()}
      disabled={disabled}
      className=" flex bg-(--primary) items-center justify-center gap-3 border border-black p-1 rounded-full hover:bg-(--primary-dark) disabled:opacity-50 transition font-medium cursor-pointer"
    >
      <GoogleIcon />
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
      className="flex bg-(--primary) items-center justify-center gap-3 border border-black p-1 rounded-full hover:bg-(--primary-dark) disabled:opacity-50 transition font-medium cursor-pointer"
    >
      <GoogleIcon />
    </button>
  );
}
