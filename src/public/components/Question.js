import { AddCircleOutline } from "@mui/icons-material";
import { Box, Checkbox, Grid, IconButton, TextField } from "@mui/material";
import React from "react";

export default function Question({
  question,
  addNewAnswerField,
  handleCorrectAnswer,
}) {
  return (
    <>
      <Grid item>
        <TextField
          label=""
          type="text"
          variant="outlined"
          size="small"
          fullWidth
          defaultValue={question.text}
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
