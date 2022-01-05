import { Box, Button, TextField } from "@mui/material";
import * as React from "react";
import { useState } from "react";

export function Player({setName, setquizPlayer, setOpenPlayQuizDialog}) {
  const [playerPseudo, setplayerPseudo] = useState("");

  const registerPlayer = () => {
    setName(playerPseudo);
    if(playerPseudo.length > 0 ) {
        setquizPlayer(false)
        setOpenPlayQuizDialog(true)
    }
  }

  return (
    <>
      <Box style={{ margin: "10px auto"}}>
          <TextField type="text" label="Player Name" variant="outlined" fullWidth onChange={(event) => setplayerPseudo(event.target.value)} defaultValue=""/>
      </Box>
      <Box sx={{display: 'flex', justifyContent: 'end'}}>
        <Button 
          style={{ marginTop: "10px", width: "30%", background: "#3acebc", color: "black", height: "30px", borderRadius:"10px"}}
          onClick={registerPlayer}
          >
                          Play
        </Button>
      </Box>
    </>
    
  )
}  

