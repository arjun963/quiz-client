import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const PrivateRoute = ({ children }) => {
	const { isLoggedIn } = useContext(AuthContext);
	const location = useLocation();

	if (!isLoggedIn) {
		// Redirect to login page if not logged in
		return <Navigate to="/admin/login" state={{ from: location }} replace />;
	}

	return children;
};

export default PrivateRoute;
