import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState(null);

	useEffect(() => {
		// Check local storage for token on mount AND whenever isLoggedIn changes
		const storedToken = localStorage.getItem("token");
		if (storedToken) {
			setIsLoggedIn(true);
			// You might also want to fetch user details here
		} else {
			setIsLoggedIn(false); // Make sure to set isLoggedIn to false if no token
			setUser(null); // Clear user data if no token
		}
	}, [isLoggedIn]); // Add isLoggedIn to the dependency array

	const login = (token, userData) => {
		localStorage.setItem("token", token);
		setIsLoggedIn(true);
		setUser(userData);
	};

	const logout = () => {
		localStorage.removeItem("token");
		setIsLoggedIn(false);
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
