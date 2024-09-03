import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const QuizContext = createContext();

const QuizProvider = ({ children }) => {
	const [quizzes, setQuizzes] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchQuizzes = async () => {
			setLoading(true);
			try {
				// Make the API call to get the quizzes
				const response = await axios.get(
					`${process.env.REACT_APP_API_URL}/api/quizzes`
				);
				setQuizzes(response.data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		fetchQuizzes();
	}, []);

	// Add functions to create, update, and delete quizzes here...
	const createQuiz = async (newQuiz) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_API_URL}/api/quizzes`,
				newQuiz
			);
			setQuizzes([...quizzes, response.data]);
		} catch (error) {
			console.error("Error creating quiz:", error);
		}
	};

	const updateQuiz = async (id, updatedQuiz) => {
		try {
			const response = await axios.put(
				`${process.env.REACT_APP_API_URL}/api/quizzes/${id}`,
				updatedQuiz
			);
			setQuizzes(
				quizzes.map((quiz) => (quiz._id === id ? response.data : quiz))
			);
		} catch (error) {
			console.error("Error updating quiz:", error);
		}
	};

	const deleteQuiz = async (id) => {
		try {
			await axios.delete(`${process.env.REACT_APP_API_URL}/api/quizzes/${id}`);
			setQuizzes(quizzes.filter((quiz) => quiz._id !== id));
		} catch (error) {
			console.error("Error deleting quiz:", error);
		}
	};

	return (
		<QuizContext.Provider
			value={{
				quizzes,
				loading,
				error,
				setQuizzes,
				createQuiz,
				updateQuiz,
				deleteQuiz,
			}}
		>
			{children}
		</QuizContext.Provider>
	);
};

export { QuizContext, QuizProvider };
