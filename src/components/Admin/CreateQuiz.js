import React, { useState, useContext } from "react";
import { QuizContext } from "../../context/QuizContext";
import { useNavigate } from "react-router-dom";
import {
	TextField,
	Button,
	Typography,
	Container,
	Grid2,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@mui/material";

const CreateQuiz = () => {
	const { createQuiz, quizzes, setQuizzes } = useContext(QuizContext);
	const navigate = useNavigate();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [questions, setQuestions] = useState([]);

	const handleAddQuestion = () => {
		setQuestions([
			...questions,
			{ text: "", options: ["", "", "", ""], correctAnswer: 0 },
		]);
	};

	const handleQuestionChange = (index, field, value) => {
		setQuestions((prevQuestions) => {
			const updatedQuestions = [...prevQuestions];
			updatedQuestions[index][field] = value;
			return updatedQuestions;
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const newQuiz = { title, description, questions };

			// Call the createQuiz function from QuizContext
			await createQuiz(newQuiz);

			// Update QuizContext
			setQuizzes([...quizzes, newQuiz]);

			navigate("/admin/quizzes");
		} catch (error) {
			console.error("Error creating quiz:", error);
		}
	};
	return (
		<Container maxWidth="lg" className="py-8">
			<Typography
				variant="h4"
				component="h1"
				gutterBottom
				className="font-bold"
			>
				Create Quiz
			</Typography>

			<form onSubmit={handleSubmit}>
				<Grid2 container spacing={3}>
					<Grid2 item xs={12}>
						<TextField
							label="Title"
							fullWidth
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							margin="normal"
						/>
					</Grid2>
					<Grid2 item xs={12}>
						<TextField
							label="Description"
							fullWidth
							multiline
							rows={4}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							margin="normal"
						/>
					</Grid2>

					{questions.map((question, index) => (
						<Grid2 item xs={12} key={index} className="mb-4">
							<TextField
								label={`Question ${index + 1}`}
								fullWidth
								value={question.text}
								onChange={(e) =>
									handleQuestionChange(index, "text", e.target.value)
								}
								margin="normal"
							/>
							{question.options.map((option, optionIndex) => (
								<TextField
									key={optionIndex}
									label={`Option ${optionIndex + 1}`}
									fullWidth
									value={option}
									onChange={(e) =>
										handleQuestionChange(index, "options", [
											...question.options.slice(0, optionIndex),
											e.target.value,
											...question.options.slice(optionIndex + 1),
										])
									}
									margin="normal"
								/>
							))}
							<FormControl fullWidth margin="normal">
								<InputLabel id={`correct-answer-label-${index}`}>
									Correct Answer
								</InputLabel>
								<Select
									labelId={`correct-answer-label-${index}`}
									id={`correct-answer-${index}`}
									value={question.correctAnswer} // Added value prop
									label="Correct Answer"
									onChange={(e) =>
										handleQuestionChange(
											index,
											"correctAnswer",
											parseInt(e.target.value, 10)
										)
									}
								>
									{question.options.map((option, optionIndex) => (
										<MenuItem key={optionIndex} value={optionIndex}>
											{option}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid2>
					))}

					<Grid2 item xs={12}>
						<Button
							variant="contained"
							color="primary"
							onClick={handleAddQuestion}
						>
							Add Question
						</Button>
					</Grid2>

					<Grid2 item xs={12}>
						<Button
							type="submit"
							variant="contained"
							color="secondary"
							className="ml-2"
						>
							Create Quiz
						</Button>
					</Grid2>
				</Grid2>
			</form>
		</Container>
	);
};

export default CreateQuiz;
