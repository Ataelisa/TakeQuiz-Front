import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    navBar:{
        background: "red"
    },
});

export default function NavigationBar() {
    const classes = useStyles();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            className={classes.navBar}
          >
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            TakeQuiz ....
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}