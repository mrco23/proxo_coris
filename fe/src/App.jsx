import { useState } from "react";
import { Routes, Route } from "react-router";
/* pages */
import LandingPage from "./pages/LandingPage";
import UserDashboard from "./pages/Users/UserDashboard";
import UserProfile from "./pages/Users/UserProfile";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminProfile from "./pages/Admin/AdminProfile";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";

/* layouts */
import UsersLayout from "./components/layouts/UsersLayout";
import AdminLayout from "./components/layouts/AdminLayout";

function App() {
	const [count, setCount] = useState(0);

	return (
		<Routes>
			<Route path="/" element={<LandingPage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<RegisterPage />} />
			<Route path="/users" element={<UsersLayout />}>
				<Route index element={<UserDashboard />} />
				<Route path="profile" element={<UserProfile />} />
			</Route>
			<Route path="/admin" element={<AdminLayout />}>
				<Route index element={<AdminDashboard />} />
				<Route path="profile" element={<AdminProfile />} />
			</Route>
		</Routes>
	);
}

export default App;
