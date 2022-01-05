import axios from "axios";
const baseUrl = "https://localhost:44315/Quiz";
const JsonServeur = "http://localhost:3000/quiz";
const newQuestionId = "aaaaaaaa-1111-2222-bbbb-2c963f66afa6"
const newAnswerId = "aaaaaaaa-2222-3333-cccc-2c963f66afa6"


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

export function getQuestionAnswers(quizId) {
  const promise = axios.get(baseUrl + `/${quizId}/questions`);
  const dataPromise = promise.then((response) => response.data);

  return dataPromise;
}

export function getQuizTestQuestions(quizId) {
  const promise = axios.get(baseUrl + `/${quizId}/test-questions`);
  const dataPromise = promise.then((response) => response.data);

  return dataPromise;
}

export function patchQuiz(quizId, quiz) {
  const promise = axios.patch(baseUrl + `/${quizId}`, quiz);
  const dataPromise = promise.then((response) => response.data);

  return dataPromise;
}

export function postQuestions(questions, quizId, finish) {

  questions.forEach(question => {
    if(question.isNew === true) {
      question.id = newQuestionId;
    }

    question.answers.forEach(answer => {
      if(answer.isNew === true) {
        answer.id = newAnswerId;
      }
    })
  });
  const promise = axios.post(baseUrl + `/${quizId}/questions?status=${finish}`, questions);
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

export function postQuizResponses( quizId, questions) {

  let responses = questions.map(question => {
    let answers  = question.answers.filter(answer => answer.isCorrect === true);
    answers = answers.map(answer => {
      return { id: answer.id};
    });
    return {
      id: question.id,
      answers: [...answers]
    }
  }) 
  const data = {
    questions: responses
  }
  console.log(responses);
  const promise = axios.post(baseUrl + `/${quizId}/evaluate`, data);
  const dataPromise = promise.then(response => response.data)
  return dataPromise;
}

export function loginToQuiz(quizId, quizPassword) {

  console.log(typeof quizPassword)
  const promise = axios.post(baseUrl + `/${quizId}/unlock`, {QuizPassword:quizPassword});
  const dataPromise = promise.then(response => response.data);

  return dataPromise;
}
 