import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { TextField, Button, Typography, Container, Grid2 } from "@mui/material";

const Login = () => {
	const { login } = useContext(AuthContext);
	const navigate = useNavigate();
	const location = useLocation();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/api/users/login`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ username, password }),
				}
			);

			if (response.ok) {
				const data = await response.json();
				login(data.token, { username }); // Call login function from context

				// Redirect to the previous location or admin dashboard
				const from = location.state?.from?.pathname || "/admin";
				navigate(from, { replace: true });
			} else {
				console.error("Login failed");
				// Handle login error (e.g., display an error message)
			}
		} catch (error) {
			console.error("Error during login:", error);
			// Handle login error
		}
	};

	return (
		<Container maxWidth="xs" className="py-8">
			<Typography
				variant="h4"
				component="h1"
				gutterBottom
				className="font-bold"
			>
				Admin Login
			</Typography>

			<form onSubmit={handleSubmit}>
				<Grid2 container spacing={3}>
					<Grid2 item xs={12}>
						<TextField
							label="Username"
							fullWidth
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							margin="normal"
						/>
					</Grid2>
					<Grid2 item xs={12}>
						<TextField
							label="Password"
							fullWidth
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							margin="normal"
						/>
					</Grid2>
					<Grid2 item xs={12}>
						<Button type="submit" variant="contained" color="primary">
							Login
						</Button>
					</Grid2>
				</Grid2>
			</form>
		</Container>
	);
};

export default Login;
