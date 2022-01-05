import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import EditQuiz from "../components/edit-quiz";
import { styled } from "@mui/system";
import { Status, themes } from "../../constantes/theme";
import { Button } from "@mui/material";
import CustomDialog from "./custom-dialog";
import QuizTest from "./QuizTest";
import Score from "./score";
import { useState } from "react";
import { QuizLogin } from "./QuizLogin";

const StyledCardMedia = styled(CardMedia)({
  objectFit: "contain",
  background: "beige",
});
export default function QuizCard({ quiz, loadQuizData }) {
  const [openEditCard, setOpenEditCard] = useState(false);
  const [openPlayQuizDialog, setOpenPlayQuizDialog] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(null); 
  const [ quizLogin, setQuizLogin] = useState(false);

  const subHederText = () => {
    const theme = themes.find((theme) => theme.value === quiz.theme).label;
    const status = Status.find((statut) => statut.value === quiz.status).label;
    return `${theme}, ${status}`;
  };

  const quizTags = () => {
    return quiz.tags
      .split(" ")
      .map((tag) => `#${tag}`)
      .toString()
      .replaceAll(",", " ");
  };

  return (
    <>
      {/* edit card */}
      <CustomDialog
        open={openEditCard}
        setOpen={setOpenEditCard}
        title={"Edit The Quiz"}
      >
        <EditQuiz quiz={quiz} setOpen={setOpenEditCard} loadQuizData={loadQuizData}></EditQuiz>
      </CustomDialog>

      {/* Play Quiz */}
      <CustomDialog
        open={openPlayQuizDialog}
        setOpen={setOpenPlayQuizDialog}
        title={"Take The Quiz".concat(': ', quiz.name)}
      >
        <QuizTest id={quiz.id} setShowScore={setShowScore} setOpenPlayQuizDialog={setOpenPlayQuizDialog} setScore={setScore}></QuizTest>
      </CustomDialog>

       {/* Quiz score */}
       <CustomDialog
        open={showScore}
        setOpen={setShowScore}
        title={"Score"}
      >
       <Score score={score}></Score>
      </CustomDialog>

       {/*Quiz Login */}
       <CustomDialog
        open={quizLogin}
        setOpen={setQuizLogin}
        title={"Quiz Login"}
      >
        <QuizLogin quizId={quiz.id} setOpenEditCard={setOpenEditCard} setQuizLogin={setQuizLogin}></QuizLogin>
      </CustomDialog>
     
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          action={
            quiz.status === 1 ? (
              <Button
                variant="outlined"
                size="small"
                onClick={() => setQuizLogin(true)}
              >
                {"Edit"}
              </Button>
            ) : (
              <Button
                variant="outlined"
                size="small"
                onClick={() => setOpenPlayQuizDialog(true)}
              >
                {"Play"}
              </Button>
            )
          }
          title={quiz.name}
          subheader={subHederText()}
        />

        <StyledCardMedia
          component="img"
          height="194"
          image={quiz.image}
          alt="quiz image"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {quiz.description}
          </Typography>
        </CardContent>
        <CardActions>{quizTags()}</CardActions>
      </Card>
    </>
  );
}
