import React from "react";
import { Routes, Route } from "react-router-dom";
import TakeQuiz from "../components/Quiz/TakeQuiz";

const Quiz = () => {
	return (
		<Routes>
			<Route path="/*" element={<TakeQuiz />} /> // Wildcard directly on this
			Route
		</Routes>
	);
};

export default Quiz;
