import { AddCircleOutline } from "@mui/icons-material";
import { Box, Checkbox, Grid, IconButton, TextField } from "@mui/material";
import React from "react";

export default function Question({
  question,
  addNewAnswerField,
  handlerAnswerChange,
  handleCorrectAnswer,
  handlerQuestionChange,
}) {
  return (
    <>
      <Grid item>
        <TextField
          type="text"
          variant="outlined"
          size="small"
          fullWidth
          defaultValue={question.text}
          onChange={(event) => handlerQuestionChange(event, question.id)}
        />
      </Grid>
      <Grid item>
        <Grid container>
          {question.answers.map((answer, index) => (
            <Box mt={2} key={answer.id}>
              <Checkbox
                checked={answer.isCorrect}
                onClick={() => handleCorrectAnswer(question.id, answer.id)}
              />
              <TextField
                type="text"
                variant="outlined"
                size="small"
                focus={{ outline: "none" }}
                defaultValue={answer.text}
                onChange={(event) => handlerAnswerChange(event, answer.id, question.id)}
              />
            </Box>
          ))}
          <Grid item xs={12}>
            <IconButton
              color="primary"
              title="add response"
              onClick={() => addNewAnswerField(question.id)}
            >
              <AddCircleOutline />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
