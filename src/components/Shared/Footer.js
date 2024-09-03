import React from "react";
import { Typography, Container } from "@mui/material";

const Footer = () => {
	return (
		<footer className="bg-gray-200 py-4 mt-8">
			<Container maxWidth="lg">
				<Typography variant="body2" align="center">
					© {new Date().getFullYear()} Quiz App. All rights reserved.
				</Typography>
			</Container>
		</footer>
	);
};

export default Footer;
