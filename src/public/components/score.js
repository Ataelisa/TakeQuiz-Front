import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const commonStyles = {
  bgcolor: 'background.paper',
  m: 1,
  border: 1,
  width: '13rem',
  height: '13rem',
};

export default function GutterlessList() {
  return (
   <Box>
    
    <List component="form"
      sx={{
        '& > :not(style)': { m: 5, width: '100ch' },
      }}
      noValidate
      autoComplete="off"
      sx={{ ...commonStyles, borderRadius: '20px',padding:"50px" }}>
      {[1, 2, 3, 4].map((value) => (
        <div>
        <ListItem
          key={value}
          disableGutters
          secondaryAction={
            <p>
              Score :
            </p>
          }
        >
          <ListItemText primary={`${value} Name`} />
        </ListItem>
        </div>
      ))}
    </List>
    <br></br>
    <div align="right">
    <TextField label="Score" color="secondary" focused disabled="false"/>
    <p>Félicitation ou désolé vous n'êtes pas classé</p>
    </div>
    </Box>
  );
}
