import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import ListMenu from "../components/List-Menu";
import EditQuiz from "../components/edit-quiz";
import { styled } from "@mui/system";
import { Status, themes } from "../../constantes/theme";
import { Button } from "@mui/material";

const StyledCardMedia = styled(CardMedia)({
  objectFit: "contain",
  background: "beige",
});
export default function QuizCard({ quiz }) {
  const [openEditCard, setOpenEditCard] = React.useState(false);

  const handleChangeEditCard = () => {
    setOpenEditCard(!openEditCard);
  };

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
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        action={
          quiz.status === 1 ? (
            <Button variant="outlined" size="small">
              {"Edit"}
            </Button>
          ) : (
            <Button variant="outlined" size="small">
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
  );
}
