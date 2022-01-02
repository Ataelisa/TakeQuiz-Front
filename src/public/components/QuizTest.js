class QuizTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [{ Answers: [] }],
      currentQuestion: 1,
      finalQuestion: false,
      result: "",
      percentage: "",
    };
    this.counter = "";
    this.seconds = 0;
    this.minutes = 0;
    this.answers = [];
    this.answers.push([]);
    this.state.questions[0].Answers.forEach((a) => this.answers[0].push(false));
    this.showResult = false;
    this.start = true;
  }

  componentDidMount = () => {
    let params = new URLSearchParams();
    console.log(this.props.id);
    params.set("cours_id", Number(this.props.id));
    axios({
      method: "post",
      url: `${config.apiURL}/quiz/questions`,
      data: params,
      headers: config.headers,
    })
      .then((response) => {
        console.log(response);
        this.setState({ questions: response.data.Questions });
      })
      .catch((e) => {
        console.log(e.response);
      });
  };
  handleStart = () => {
    this.start = false;
    this.forceUpdate();
    this.counter = setInterval(() => {
      this.minutes =
        (this.seconds + 1) % 60 === 0 ? this.minutes + 1 : this.minutes;
      this.seconds =
        this.seconds % 59 === 0 && this.seconds !== 0 ? 0 : this.seconds + 1;
      try {
        document.querySelector(".counter").innerHTML = `${
          this.minutes < 10 ? "0" + this.minutes : this.minutes
        }:${this.seconds < 10 ? "0" + this.seconds : this.seconds}`;
      } catch (e) {
        clearInterval(this.counter);
      }
    }, 1000);
  };

  handleSubmitQuiz = () => {
    clearInterval(this.counter);
    console.log(this.answers);
    const final = {
      cours_id: Number(this.props.id),
      token: utils.isAuth(),
      questions: [],
    };
    this.answers.forEach((answersArray, index) => {
      let q = { question_id: this.state.questions[index].id, answers: [] };
      answersArray.forEach((a, i) => {
        if (a === true)
          q.answers.push(this.state.questions[index].Answers[i].id);
      });
      final.questions.push(q);
    });

    let params = new URLSearchParams();
    params.set("token", final.token);
    params.set("cours_id", final.cours_id);
    params.set("questions", JSON.stringify(final.questions));
    axios({
      method: "post",
      url: `${config.apiURL}/cours/valider_quiz`,
      data: params,
      headers: config.headers,
    })
      .then((response) => {
        this.setState({
          result: response.data.score,
          percentage: Math.ceil(
            (Number(response.data.score) / this.answers.length) * 100
          ),
        });
      })
      .catch((e) => console.log(e.response));
    this.showResult = true;
    this.forceUpdate();
  };
  handleQuestionFlow = (step) => {
    let current = this.state.currentQuestion + step;
    if (current >= 1 && current <= this.state.questions.length) {
      if (!this.answers[current - 1]) {
        this.answers.push([]);
        this.state.questions[current - 1].Answers.forEach((a) =>
          this.answers[current - 1].push(false)
        );
      }
      this.setState({
        currentQuestion: current,
        finalQuestion: current === this.state.questions.length,
      });
    }
  };
  handleSelect = (index, e) => {
    e.target.className = Array.from(e.target.classList).includes("active")
      ? "collection-item"
      : "collection-item active";
    this.answers[this.state.currentQuestion - 1][Number(index)] = this.answers[
      this.state.currentQuestion - 1
    ][Number(index)]
      ? !this.answers[this.state.currentQuestion - 1][Number(index)]
      : true;
  };
}

export default QuizTest;
