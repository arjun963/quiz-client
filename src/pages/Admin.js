import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../components/Admin/AdminDashboard";
import QuizList from "../components/Admin/QuizList";
import CreateQuiz from "../components/Admin/CreateQuiz";
import EditQuiz from "../components/Admin/EditQuiz";

const Admin = () => {
	return (
		<Routes>
			<Route path="/" element={<AdminDashboard />} />
			<Route path="/quizzes" element={<QuizList />} />
			<Route path="/create-quiz" element={<CreateQuiz />} />
			<Route path="/edit-quiz/:id" element={<EditQuiz />} />
		</Routes>
	);
};

export default Admin;
