import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { QuizContext } from "../../context/QuizContext";
import { Link } from "react-router-dom";
import {
	Button,
	Typography,
	Container,
	Grid2,
	Card,
	CardContent,
	CardActions,
} from "@mui/material";

const AdminDashboard = () => {
	const { user } = useContext(AuthContext);
	const { quizzes } = useContext(QuizContext);

	return (
		<Container maxWidth="lg" className="py-8">
			<Typography
				variant="h4"
				component="h1"
				gutterBottom
				className="font-bold"
			>
				Admin Dashboard
			</Typography>

			<Grid2 container spacing={3}>
				<Grid2 item xs={12} md={4}>
					<Card>
						<CardContent>
							<Typography variant="h6" component="h2" gutterBottom>
								Welcome, {user?.username}! {/* Access username from context */}
							</Typography>
							{/* Add more user details if needed */}
						</CardContent>
					</Card>
				</Grid2>

				<Grid2 item xs={12} md={8}>
					<Card>
						<CardContent>
							<Typography variant="h6" component="h2" gutterBottom>
								Quizzes
							</Typography>
							<ul>
								{quizzes.map((quiz) => (
									<li key={quiz._id} className="mb-2">
										{quiz.title}
									</li>
								))}
							</ul>
						</CardContent>
						<CardActions>
							<Link to="/admin/quizzes">
								<Button variant="contained" color="primary">
									Manage Quizzes
								</Button>
							</Link>
							<Link to="/admin/create-quiz">
								<Button variant="contained" color="secondary">
									Create Quiz
								</Button>
							</Link>
						</CardActions>
					</Card>
				</Grid2>
			</Grid2>
		</Container>
	);
};

export default AdminDashboard;
