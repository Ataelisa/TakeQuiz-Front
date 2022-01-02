import { Box, Button, Grid, MenuItem, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import IconButton from "@mui/material/IconButton";
import { AddCircleOutline } from "@mui/icons-material";
import { themes } from "../../constantes/theme";

import useSWR from "swr";
import { getQuizQuestions } from "../../_actions/quiz_actions";
import Question from "./Question";

export default function EditQuiz({ quiz }) {
  const [quizQuestions, setQuizQuestions] = useState([]);

  useEffect(() => {
    getQuizQuestions(quiz.id)
      .then((questions) => setQuizQuestions(questions))
      .catch((error) => console.log(error));
  }, []);

  const onSubmit = (data) => {
    console.log("here");
  };

  const methods = useForm({
    defaultValues: {
      name: quiz.name,
      theme: quiz.theme,
      description: quiz.description,
    },
  });

  const {
    control,
    setValue,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const addNewQuestionField = () => {
    let questions = [...quizQuestions];
    questions.push({
      id: Date.now() / Math.random(),
      text: "",
      maxError: false,
      msgError: "",
      answers: [{ id: Date.now() / Math.random(), text: "", isCorrect: false }],
    });
    setQuizQuestions(questions);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1} mt={1} direction="column">
        <Grid item>
          <Grid container spacing={3}>
            <Grid item xs>
              <TextField
                label="name"
                type="text"
                variant="outlined"
                size="small"
                {...register("name", { required: true })}
              />
            </Grid>
            <Grid item xs>
              <TextField
                label="theme"
                select
                defaultValue={quiz.theme}
                variant="outlined"
                size="small"
                fullWidth
                {...register("theme")}
              >
                {themes.map((theme) => (
                  <MenuItem key={theme.value} value={theme.value}>
                    {theme.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container>
            <TextField
              label="description"
              multiline
              rows={4}
              fullWidth
              {...register("description")}
            />
          </Grid>
        </Grid>
        <Grid item>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <h1>Questions</h1>
            <IconButton
              color="primary"
              title="add question"
              onClick={addNewQuestionField}
            >
              <AddCircleOutline fontSize="large" />
            </IconButton>
          </Box>
        </Grid>
        {quizQuestions.map((question, index) => (
          <Question question={question} key={index}></Question>
        ))}
        <Grid item>
          <Grid container spacing={3}>
            <Grid item xs>
              <Button variant="contained" size="small" fullWidth type="submit">
                Finish
              </Button>
            </Grid>
            <Grid item xs>
              <Button variant="contained" size="small" fullWidth type="submit">
                Exit
              </Button>
            </Grid>
            <Grid item xs>
              <Button variant="contained" size="small" fullWidth type="submit">
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}
