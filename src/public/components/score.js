import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';

const commonStyles = {
  bgcolor: 'background.paper',
  m: 1,
  border: 1,
  width: '60%',
  height: '13rem',
  padding:"10px" ,
  borderRadius: '20px'
};


export default function Score({score}) {
  return (
   <Box>
    <List component="form"
      sx={{
        '& > :not(style)': { m: 5, width: '100ch' },
      }}
      noValidate
      autoComplete="off"
      sx={{ ...commonStyles}}>
      {score.players.map((player, index) => (
        <ListItem
          key={index}
          disableGutters
          secondaryAction={
            <p>
              Score : {player.score}
            </p>
          }
        >
          <ListItemText primary={`${player.name}`} />
        </ListItem>
      ))}
    </List>
    <br></br>
    <div align="right">
    <p style={{color: "#3acebc"}}>{`Score: ${score.score} / ${score.numberOfQuestion}`}</p>
    {score.isRank?  <p style={{color: "#3acebc"}}>Félicitation, Vous êtes classé.e</p>: <p>Désolé vous n'êtes pas classé.e, Rejouer pour une Seconde fois</p>}
    </div>
    </Box>
  );
}
