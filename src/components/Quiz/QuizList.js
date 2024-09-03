import React, { useContext } from "react";
import { QuizContext } from "../../context/QuizContext";
import { Link } from "react-router-dom";
import {
	Typography,
	Container,
	Grid2,
	Card,
	CardContent,
	CardActions,
	Button,
} from "@mui/material";

const QuizList = () => {
	const { quizzes, loading, error } = useContext(QuizContext);

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
				Available Quizzes
			</Typography>

			<Grid2 container spacing={3}>
				{quizzes.map((quiz) => (
					<Grid2 item xs={12} sm={6} md={4} key={quiz._id}>
						<Card>
							<CardContent>
								<Typography variant="h6" component="h2" gutterBottom>
									{quiz.title}
								</Typography>
								<Typography variant="body2" color="textSecondary">
									{quiz.description}
								</Typography>
							</CardContent>
							<CardActions>
								<Link to={`/quiz/${quiz._id}/take`}>
									<Button variant="contained" color="primary">
										Start Quiz
									</Button>
								</Link>
							</CardActions>
						</Card>
					</Grid2>
				))}
			</Grid2>
		</Container>
	);
};

export default QuizList;
