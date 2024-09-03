import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { QuizProvider } from "./context/QuizContext";
import Navbar from "./components/Shared/Navbar";
import Footer from "./components/Shared/Footer";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Quiz from "./pages/Quiz";
import Login from "./components/Admin/Login"; // Import the Login component
import PrivateRoute from "./components/Shared/PrivateRoute"; // Import PrivateRoute

function App() {
	return (
		<Router>
			<AuthProvider>
				<QuizProvider>
					<Navbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/quiz/:id/take" element={<Quiz />} />{" "}
						{/* Make the route more specific */}
						<Route path="/admin/login" element={<Login />} />
						<Route
							path="/admin/*"
							element={
								<PrivateRoute>
									<Admin />
								</PrivateRoute>
							}
						/>
					</Routes>
					<Footer />
				</QuizProvider>
			</AuthProvider>
		</Router>
	);
}

export default App;
