import axios from "axios";
const baseUrl = "https://localhost:44315/Quiz";
const JsonServeur = "http://localhost:3000/quiz";

export function getListQuiz() {
  return axios.get(baseUrl).then((response) => response.data);
}

export function postQuiz(quiz) {
  return axios
    .post(baseUrl, quiz)
    .then((response) => response.data)
    .catch((error) => console.log(error));
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
