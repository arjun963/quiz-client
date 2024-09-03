import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Navbar = () => {
	const { isLoggedIn, logout } = useContext(AuthContext);

	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					<Link to="/" className="text-white no-underline">
						Quiz App
					</Link>
				</Typography>
				{isLoggedIn ? (
					<>
						<Link to="/admin" className="text-white no-underline mr-4">
							<Button color="inherit">Admin</Button>
						</Link>
						<Button color="inherit" onClick={logout}>
							Logout
						</Button>
					</>
				) : (
					<Link to="/admin/login" className="text-white no-underline">
						<Button color="inherit">Login</Button>
					</Link>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
