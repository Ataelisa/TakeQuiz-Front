import Box from "@mui/material/Box";
import NavigationBar from "../components/navigation-bar";
import React from "react";
import { Typography } from "@mui/material";
import ListingQuiz from "./listing-quiz";
import { styled } from "@mui/system";

const StyledBox = styled(Box)({
  marginLeft: "30%",
  marginRight: "30%",
})
const Layout = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Box>
      <NavigationBar setOpen={setOpen} open={open} />
      <Box sx={{ width: "auto" }} mt={1} mx={2}>
        <StyledBox
          component="div"
          sx={{ border: "1px solid black", textAlign: "center", width: "40%" }}
          my={2}>
          <Typography variant="h6" component="p">
            Let's Go !!!!!!
          </Typography>
        </StyledBox>

        {/* la liste des quiz */}
        <ListingQuiz open={open} setOpen={setOpen}></ListingQuiz>
      </Box>
    </Box>
  );
};
export default Layout;
