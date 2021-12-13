import axios from "axios";
const baseUrl = 'https://localhost:44315/Quiz'

export function getListQuiz() {
  return axios
    .get(baseUrl)
    .then((response) => response.data)
}