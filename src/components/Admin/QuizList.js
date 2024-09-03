import React, { useContext } from "react";
import { QuizContext } from "../../context/QuizContext";
import { Link } from "react-router-dom";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Button,
	Typography,
	Container,
} from "@mui/material";

const QuizList = () => {
	const { quizzes, loading, error, deleteQuiz } = useContext(QuizContext);

	if (loading) {
		return <div>Loading quizzes...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<Container maxWidth="lg" className="py-8">
			<Typography
				variant="h4"
				component="h1"
				gutterBottom
				className="font-bold"
			>
				Quiz List
			</Typography>

			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Title</TableCell>
							<TableCell>Description</TableCell>
							<TableCell>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{quizzes.map((quiz) => (
							<TableRow key={quiz._id}>
								<TableCell>{quiz.title}</TableCell>
								<TableCell>{quiz.description}</TableCell>
								<TableCell>
									<Link to={`/admin/edit-quiz/${quiz._id}`}>
										<Button variant="contained" color="primary">
											Edit
										</Button>
									</Link>
									<Button
										variant="contained"
										color="secondary"
										onClick={() => deleteQuiz(quiz._id)} // Add onClick handler
									>
										Delete
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	);
};

export default QuizList;
