import React from "react";
import {
	Typography,
	Container,
	Grid2,
	Card,
	CardContent,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const QuizReport = ({ quiz, selectedAnswers, score, timeTaken }) => {
	return (
		<Container maxWidth="lg" className="py-8">
			<Typography
				variant="h4"
				component="h1"
				gutterBottom
				className="font-bold"
			>
				Quiz Report
			</Typography>

			<Grid2 container spacing={3}>
				<Grid2 item xs={12}>
					<Card>
						<CardContent>
							<Typography variant="h6" component="h2" gutterBottom>
								{quiz.title}
							</Typography>
							<Typography variant="body1">
								You scored {score} out of {quiz.questions.length}!
							</Typography>
							<Typography variant="body1">
								Time taken: {timeTaken} seconds
							</Typography>

							<List>
								{quiz.questions.map((question, index) => (
									<ListItem key={index}>
										<ListItemIcon>
											{selectedAnswers[index] === question.correctAnswer ? (
												<CheckCircleOutlineIcon color="success" />
											) : (
												<HighlightOffIcon color="error" />
											)}
										</ListItemIcon>
										<ListItemText
											primary={question.text}
											secondary={
												<>
													Your answer:{" "}
													{question.options[selectedAnswers[index]] ||
														"Not answered"}
													<br />
													Correct answer:{" "}
													{question.options[question.correctAnswer]}
												</>
											}
										/>
									</ListItem>
								))}
							</List>
						</CardContent>
					</Card>
				</Grid2>
			</Grid2>
		</Container>
	);
};

export default QuizReport;
