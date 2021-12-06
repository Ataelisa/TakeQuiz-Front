import Box from "@mui/material/Box";
import NavigationBar from "../components/navigation-bar";
import React from "react";
import { Typography } from "@mui/material";
import ListingQuiz from "./listing-quiz";
import useStyles from "../style";

const Layout = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <Box>
      <NavigationBar setOpen={setOpen} open={open} classes={classes} />
      <Box sx={{ width: "auto" }} mt={1} mx={2}>
        <Box
          component="div"
          sx={{ border: "1px solid black", textAlign: "center", width: "40%" }}
          my={2}
          className={classes.textBox}
        >
          <Typography variant="h6" component="p">
            Let's Go !!!!!!
          </Typography>
        </Box>

        {/* la liste des quiz */}
        <ListingQuiz open={open} setOpen={setOpen}></ListingQuiz>
      </Box>
    </Box>
  );
};
export default Layout;
