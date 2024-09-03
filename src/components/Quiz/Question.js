import React from "react";
import {
	Typography,
	FormControl,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Radio,
} from "@mui/material";

const Question = ({ question, selectedAnswer, onAnswerChange }) => {
	return (
		<div>
			<Typography variant="h6" component="h2" gutterBottom>
				{question.text}
			</Typography>
			<FormControl component="fieldset">
				<FormLabel component="legend">Options</FormLabel>
				<RadioGroup
					aria-label="answer"
					name="answer"
					value={selectedAnswer || ""}
					onChange={onAnswerChange}
				>
					{question.options.map((option, index) => (
						<FormControlLabel
							key={index}
							value={index}
							control={<Radio />}
							label={option}
						/>
					))}
				</RadioGroup>
			</FormControl>
		</div>
	);
};

export default Question;
