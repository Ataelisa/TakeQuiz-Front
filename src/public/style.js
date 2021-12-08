import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    background: "white",
    "&:hover": {
      backgroundColor: "white",
    },
  },
  quizIcon: {
    color: "dodgerblue",
  },
  textBox: {
    marginLeft: "30%",
    marginRight: "30%",
  },
});

export default useStyles;
