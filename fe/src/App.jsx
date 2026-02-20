import { useState } from "react";
import { Routes, Route } from "react-router";
import LandingPage from "./pages/LandingPage";

function App() {
	const [count, setCount] = useState(0);

	return (
		<Routes>
			<Route path="/" element={<LandingPage />} />
		</Routes>
	);
}

export default App;
