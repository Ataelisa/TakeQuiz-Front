import { Box, Button, Grid, MenuItem, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import IconButton from "@mui/material/IconButton";
import { AddCircleOutline } from "@mui/icons-material";
import { themes } from "../../constantes/theme";

import useSWR from "swr";
import {
  getQuestionAnswers,
  patchQuiz,
  postQuestions,
  patchStatus,
} from "../../_actions/quiz_actions";
import Question from "./Question";

export default function EditQuiz({ quiz, setOpen, loadQuizData }) {
  const [quizQuestions, setQuizQuestions] = useState([]);

  useEffect(() => {
    getQuestionAnswers(quiz.id)
      .then((questions) => setQuizQuestions(questions))
      .catch((error) => console.log(error));
    setQuizQuestions([])
  }, []);

  const methods = useForm({
    defaultValues: {
      name: quiz.name,
      theme: quiz.theme,
      description: quiz.description,
    },
  });

  const {
    register,
    getValues,
    reset,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = () => {
    patchQuiz(quiz.id, getValues())
      .then((data) => loadQuizData())
      .catch((error) => console.log(error));
  };

  const addNewQuestionField = () => {
    let questions = [...quizQuestions];
    questions.push({
      id: Date.now()/Math.random() ,
      text: "",
      isNew: true,
      answers: [],
    });
    setQuizQuestions(questions);
  };

  const addNewAnswerField = (id) => {
    let indexQuestion = quizQuestions.findIndex((q) => q.id === id);
    const question = quizQuestions[indexQuestion];

    question.answers.push({
      id: Date.now()/Math.random(),
      text: "",
      isCorrect: false,
      isNew: true
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

  const  handlerQuestionChange = (event, questionId) =>{
    let indexQuestion = quizQuestions.findIndex(question => question.id.toString() === questionId.toString());
    const question = quizQuestions[indexQuestion];
    question.text = event.target.value;

    let questions = [...quizQuestions];
    questions[indexQuestion] = question;
    setQuizQuestions(questions);
 }

 const  handlerAnswerChange = (event, answerId, questionId) =>{
  let indexQuestion = quizQuestions.findIndex(question => question.id.toString() === questionId.toString());
  const question = quizQuestions[indexQuestion];
  const answerIndex =  question.answers.findIndex(answer => answer.id.toString() === answerId.toString());

  const answer =  question.answers[answerIndex];
  answer.text = event.target.value;
  question.answers[answerIndex] = answer;
  
  let questions = [...quizQuestions];
  questions[indexQuestion] = question;
  setQuizQuestions(questions);
}
  const saveDraft = () => {
    postQuestions(quizQuestions, quiz.id, 0)
    .then((success) => {
      loadQuizData();
      setOpen(false)})
      .catch((error) => console.log(error));
  };
  const saveQuiz = () => {
    postQuestions(quizQuestions, quiz.id, 1)
    .then((success) => {
      loadQuizData();
      setOpen(false)})
    .catch((error) => console.log(error));
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
            <h4 style={{marginTop: "5px"}}>Questions</h4>
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
            handlerAnswerChange = {handlerAnswerChange}
            handleCorrectAnswer={handleCorrectAnswer}
            handlerQuestionChange = {handlerQuestionChange}
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
