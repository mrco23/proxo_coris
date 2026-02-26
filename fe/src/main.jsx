import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

import AppToaster from "./components/common/AppToaster.jsx";
import ScrollToTop from "./components/common/ScrollToTop.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <AuthProvider>
          <BrowserRouter>
            <AppToaster />
            <ScrollToTop />
            <App />
          </BrowserRouter>
        </AuthProvider>
      </GoogleOAuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
