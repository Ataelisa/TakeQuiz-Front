import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import QuizCard from "../components/quiz-card";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CustomDialog from "../components/custom-dialog";
import CreateQuiz from "../components/create-quiz";
import { styled } from "@mui/system";
import { getListQuiz } from "../../_actions/quiz_actions";
import useSWR from "swr";

const StyledBox = styled(Box)({
  marginLeft: "30%",
  marginRight: "30%",
})
const ListingQuiz = ({ open, setOpen }) => {
  const { data: somethings} = useSWR( () =>
    getListQuiz()
  )

  return (
    <>
      <CustomDialog open={open} setOpen={setOpen} title={"Create The Quiz"}>
        <CreateQuiz></CreateQuiz>
      </CustomDialog>
      <StyledBox sx={{ width: "40%" }} >
        <TextField
          id="input-with-icon-textfield"
          InputProps={{
            startAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          fullWidth
          variant="outlined"
          size="small"
        />
      </StyledBox>
      <Box sx={{ flexGrow: 1 }} mt={4}>
        <Grid
          container
          spacing={{ xs: 3, md: 8 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {Array.from(Array(9)).map((_, index) => (
            <Grid item xs={2} sm={3} md={3} key={index}>
              <QuizCard title={`card ${index}`}></QuizCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default ListingQuiz;
