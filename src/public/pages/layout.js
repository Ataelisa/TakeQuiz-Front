import Box from "@mui/material/Box";
import NavigationBar from "../components/navigation-bar";
import React from "react";
import { Typography } from "@mui/material";
import useStyles from "../style";

const Layout = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <Box>
      <NavigationBar setOpen={setOpen} open={open} />
      <Box sx={{ width: "auto", border: "1px solid black" }} mt={1} mx={2}>
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
      </Box>
      {/* <CustomDialog open={open} setOpen={setOpen}></CustomDialog> */}
    </Box>
  );
};
export default Layout;
