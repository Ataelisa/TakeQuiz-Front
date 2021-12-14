import axios from "axios";
const baseUrl = 'https://localhost:44315/Quiz'

export function getListQuiz() {
  return axios
    .get(baseUrl)
    .then((response) => response.data)
}

export function postQuiz(quiz) {
  return axios
    .post(baseUrl, quiz)
    .then((response) => response.data)
}

