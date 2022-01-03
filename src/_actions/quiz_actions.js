import axios from "axios";
const baseUrl = "https://localhost:44315/Quiz";
const JsonServeur = "http://localhost:3000/quiz";

export function getListQuiz() {
  const promise = axios.get(baseUrl);
  const dataPromise = promise.then( response => response.data);

  return dataPromise
}

export function postQuiz(quiz) {
  const promise = axios.post(baseUrl, quiz);
  const dataPromise = promise.then( response => response.data)
  return dataPromise;
}

export function getQuizQuestions(quizId) {
  const promise = axios.get(baseUrl + `/${quizId}/questions`);
  const dataPromise = promise.then((response) => response.data);

  return dataPromise;
}

export function patchQuiz(quiz) {
  const promise = axios.patch(baseUrl + `/${quiz.id}`, quiz);
  const dataPromise = promise.then((response) => response.data);

  return dataPromise;
}

export function putQuestions(questions, quizId) {
  const promise = axios.put(baseUrl + `/${quizId}/questions`, questions);
  const dataPromise = promise.then((response) => response.data);

  return dataPromise;
}

export function patchStatus(quizId) {
  const promise = axios.patch(baseUrl + `/${quizId}`);
  const dataPromise = promise.then((response) => response.data);

  return dataPromise;
}

export function postEvaluteQuiz(quizId, questions) {
  const promise = axios.post(baseUrl + `/${quizId}/evaluate`, questions);
  const dataPromise = promise.then((response) => response.data);

  return dataPromise;
}
