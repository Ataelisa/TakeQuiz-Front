import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import QuizIcon from "@mui/icons-material/Quiz";
import { styled } from "@mui/system";

const StyledIconButton = styled(IconButton)({
  background: "white",
    "&:hover": {
      backgroundColor: "white",
    }
})
const StyledQuizIcon = styled(QuizIcon)({
  color: "dodgerblue",
})
export default function NavigationBar({ setOpen, open }) {
  const showQuizForm = () => {
    if (open === false) {
      setOpen(true);
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "block", sm: "block" } }}
          >
            TakeQuiz &hellip;
          </Typography>
          <StyledIconButton
            title="add Quiz"
            sx={{ mr: 2 }}
            onClick={showQuizForm}
          >
            <StyledQuizIcon></StyledQuizIcon>
          </StyledIconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
