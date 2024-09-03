import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Navbar = () => {
	const { isLoggedIn, logout } = useContext(AuthContext);

	return (
		<AppBar position="static" sx={{ backgroundColor: "#282c34" }}>
			{" "}
			{/* Set background color */}
			<Toolbar>
				<Typography
					variant="h6"
					component="div"
					sx={{ flexGrow: 1, color: "#FFA500" }}
				>
					{" "}
					{/* Set text color */}
					<Link
						to="/"
						className="no-underline mr-4"
						style={{ color: "#008000" }}
					>
						Quiz App
					</Link>
				</Typography>
				{isLoggedIn ? (
					<>
						<Link to="/admin" className="no-underline mr-4">
							<Button color="inherit" sx={{ color: "#FFC594" }}>
								Admin
							</Button>{" "}
							{/* Set button text color */}
						</Link>
						<Button color="inherit" onClick={logout} sx={{ color: "#FFA500" }}>
							{" "}
							{/* Set button text color */}
							Logout
						</Button>
					</>
				) : (
					<Link to="/admin/login" className="no-underline">
						<Button color="inherit" sx={{ color: "#FFA500" }}>
							Login
						</Button>{" "}
						{/* Set button text color */}
					</Link>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
