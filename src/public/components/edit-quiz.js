import { Box, Button, Grid, MenuItem, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import IconButton from "@mui/material/IconButton";
import { AddCircleOutline } from "@mui/icons-material";
import { themes } from "../../constantes/theme";

import useSWR from "swr";
import {
  getQuizQuestions,
  patchQuiz,
  putQuestions,
  patchStatus,
} from "../../_actions/quiz_actions";
import Question from "./Question";

export default function EditQuiz({ quiz, setOpen }) {
  const [quizQuestions, setQuizQuestions] = useState([]);

  useEffect(() => {
    getQuizQuestions(quiz.id)
      .then((questions) => setQuizQuestions(questions))
      .catch((error) => console.log(error));
  }, []);

  const methods = useForm({
    defaultValues: {
      id: quiz.id,
      name: quiz.name,
      theme: quiz.theme,
      description: quiz.description,
      status: quiz.status,
    },
  });

  const {
    register,
    getValues,
    reset,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = () => {
    patchQuiz(getValues())
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  const addNewQuestionField = () => {
    let questions = [...quizQuestions];
    questions.push({
      id: Date.now() / Math.random(),
      text: "",
      maxError: false,
      msgError: "",
      answers: [],
    });
    setQuizQuestions(questions);
  };

  const addNewAnswerField = (id) => {
    let indexQuestion = quizQuestions.findIndex((q) => q.id === id);
    const question = quizQuestions[indexQuestion];

    question.answers.push({
      id: Date.now() / Math.random(),
      text: "",
      isCorrect: false,
    });

    let questions = [...quizQuestions];
    questions[indexQuestion] = question;
    setQuizQuestions(questions);
  };

  const handleCorrectAnswer = (questionId, answerId) => {
    let indexQuestion = quizQuestions.findIndex(
      (q) => q.id.toString() === questionId.toString()
    );
    let question = quizQuestions[indexQuestion];
    let indexAnswer = question.answers.findIndex(
      (a) => a.id.toString() === answerId.toString()
    );
    question.answers[indexAnswer].isCorrect = !question.answers[indexAnswer]
      .isCorrect;
    let questions = [...quizQuestions];
    questions[indexQuestion] = question;
    setQuizQuestions(questions);
  };

  const saveDraft = () => {
    putQuestions(quizQuestions, quiz.id)
      .then((response) => console.log("ok"))
      .catch((error) => console.log(error));
  };
  const saveQuiz = () => {
    patchStatus(quiz.id).then((sucess) => {
      if (sucess) {
        setOpen(false);
        reset();
      }
    });
  };
  return (
    <form>
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
        <Grid item xs>
          <Box
            sx={{
              width: "25%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              size="small"
              fullWidth
              onClick={onSubmit}
            >
              Save
            </Button>
          </Box>
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
          <Question
            question={question}
            key={index}
            addNewAnswerField={addNewAnswerField}
            handleCorrectAnswer={handleCorrectAnswer}
          ></Question>
        ))}
        <Grid item>
          <Grid container spacing={3}>
            <Grid item xs>
              <Button
                variant="contained"
                size="small"
                fullWidth
                onClick={() => saveQuiz()}
              >
                Finish
              </Button>
            </Grid>

            <Grid item xs>
              <Button
                variant="contained"
                size="small"
                fullWidth
                onClick={saveDraft}
              >
                Save as Draft
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}
