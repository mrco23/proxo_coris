import { Toaster } from "react-hot-toast";

/* ───────────────────────────────────────────────
 * Global Toaster
 * ─────────────────────────────────────────────── */
export default function AppToaster() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          borderRadius: "12px",
          padding: "14px 20px",
          fontSize: "14px",
          fontFamily: "Raleway, sans-serif",
        },
        success: {
          duration: 3000,
        },
        error: {
          duration: 5000,
        },
      }}
    />
  );
}
