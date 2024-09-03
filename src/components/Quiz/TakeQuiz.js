import React, { useState, useContext, useEffect } from "react";
import { QuizContext } from "../../context/QuizContext";
import { useParams, useNavigate } from "react-router-dom";
import Question from "./Question";
import {
	Typography,
	Container,
	Grid2,
	Card,
	CardContent,
	CardActions,
	Button,
} from "@mui/material";
import QuizReport from "./QuizReport";

const TakeQuiz = () => {
	const { quizzes } = useContext(QuizContext);
	const { id } = useParams();
	const navigate = useNavigate();
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [selectedAnswers, setSelectedAnswers] = useState({});
	const [quiz, setQuiz] = useState(null);
	const [showResults, setShowResults] = useState(false);
	const [score, setScore] = useState(0);
	const [timeTaken, setTimeTaken] = useState(0);
	const [startTime, setStartTime] = useState(null);

	useEffect(() => {
		const currentQuiz = quizzes.find((quiz) => quiz._id === id);
		setQuiz(currentQuiz);

		// Set startTime only once when the component mounts
		if (!startTime) {
			setStartTime(Date.now());
		}

		return () => {
			if (!showResults) {
				const endTime = Date.now();
				setTimeTaken(Math.floor((endTime - startTime) / 1000));
			}
		};
	}, [quizzes, id, showResults]); // Remove startTime from dependencies

	const handleAnswerChange = (event) => {
		setSelectedAnswers({
			...selectedAnswers,
			[currentQuestion]: parseInt(event.target.value, 10),
		});
	};

	const handleNextQuestion = () => {
		setCurrentQuestion(currentQuestion + 1);
	};

	const handlePreviousQuestion = () => {
		setCurrentQuestion(currentQuestion - 1);
	};

	const handleSubmitQuiz = () => {
		const endTime = Date.now();
		setTimeTaken(Math.floor((endTime - startTime) / 1000));

		let calculatedScore = 0;
		quiz.questions.forEach((question, index) => {
			if (selectedAnswers[index] === question.correctAnswer) {
				calculatedScore++;
			}
		});
		setScore(calculatedScore);
		setShowResults(true);
	};

	if (!quiz) {
		return <div>Loading quiz...</div>;
	}

	if (showResults) {
		return (
			<QuizReport
				quiz={quiz}
				selectedAnswers={selectedAnswers}
				score={score}
				timeTaken={timeTaken}
			/>
		);
	}

	const question = quiz.questions[currentQuestion];

	return (
		<Container maxWidth="lg" className="py-8">
			<Typography
				variant="h4"
				component="h1"
				gutterBottom
				className="font-bold"
			>
				{quiz.title}
			</Typography>

			<Grid2 container spacing={3}>
				<Grid2 item xs={12}>
					<Card>
						<CardContent>
							<Typography variant="h6" component="h2" gutterBottom>
								Question {currentQuestion + 1} / {quiz.questions.length}
							</Typography>

							<Question
								question={question}
								selectedAnswer={selectedAnswers[currentQuestion]}
								onAnswerChange={handleAnswerChange}
							/>
						</CardContent>
						<CardActions>
							{currentQuestion > 0 && (
								<Button
									variant="contained"
									color="primary"
									onClick={handlePreviousQuestion}
								>
									Previous
								</Button>
							)}
							{currentQuestion < quiz.questions.length - 1 ? (
								<Button
									variant="contained"
									color="primary"
									onClick={handleNextQuestion}
								>
									Next
								</Button>
							) : (
								<Button
									variant="contained"
									color="secondary"
									onClick={handleSubmitQuiz}
								>
									Submit
								</Button>
							)}
						</CardActions>
					</Card>
				</Grid2>
			</Grid2>
		</Container>
	);
};

export default TakeQuiz;
