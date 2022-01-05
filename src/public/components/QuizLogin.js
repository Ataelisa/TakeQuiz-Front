import { Box, Button, TextField } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { loginToQuiz } from "../../_actions/quiz_actions";

export function QuizLogin({quizId, setQuizLogin, setOpenEditCard}) {
  const [quizPassword, setQuizPassword] = useState("");
 const [passwordError, setPasswordError] = useState(false);

  const unlockQuiz = (event) => {
    loginToQuiz(quizId, quizPassword).then(success => {
      if(success) {
        setQuizLogin(false)
        setOpenEditCard(true)
      } else {
        setPasswordError(true)
        event.target.value = "";
      }
    })
  }

  return (
    <>
      <Box style={{ margin: "10px auto"}}>
          <TextField type="password" label="Quiz Password" variant="outlined" fullWidth onChange={(event) => setQuizPassword(event.target.value)} defaultValue={quizPassword}/>
      </Box>
      { passwordError? <small style={{color: "#f44336"}}> Incorrect Quiz Password</small>: <></>}
      <Box sx={{display: 'flex', justifyContent: 'end'}}>
        <Button 
          style={{ marginTop: "10px", width: "30%", background: "#3acebc", color: "black", height: "30px", borderRadius:"10px"}}
          onClick={unlockQuiz}
          >
                          Login
        </Button>
      </Box>
    </>
    
  )
}  

