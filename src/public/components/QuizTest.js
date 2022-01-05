import { useEffect, useState } from "react";
import { getQuizTestQuestions, postQuizResponses } from "../../_actions/quiz_actions";
import React from "react";
import { Button, Checkbox, List, ListItemIcon, Tooltip } from "@mui/material";
import { Box, styled } from "@mui/system";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import InfoIcon from '@mui/icons-material/Info';

const StyledList = styled(List)({
 border: "1px solid #c4c4c4",
 borderRadius: "2px",
});
export default function QuizTest({ id, setShowScore, setOpenPlayQuizDialog, setScore}) {
  const [ questions, setQuestions] = useState( []);
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [finalQuestion, setFinalQuestion] = useState(false)
  const [start, setStart] = useState(true)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    getQuizTestQuestions(id)
      .then((questions) =>{
        setQuestions(questions)
      })
      .catch((error) => console.log(error));
 },[])

  const  handleStart = () => {
    setStart(false);
  };

  const handleSubmitQuiz = () => {
    
    let testQuestions = [];
    let submitedQuestions = [...questions]
    submitedQuestions.forEach((question, index) => {
      submitedQuestions.answers = question.answers.filter(answer => answer.isCorrect === true)
      testQuestions.push(question);
    });

    // evaluate Quiz
    postQuizResponses(id, testQuestions).then(testResult => {
      setScore(testResult)
      setOpenPlayQuizDialog(false)
      setShowScore(true);
    })

    

  };
  
  const handleQuestionFlow = (step) => {
    let current = currentQuestion + step;

    if (current >= 1 && current <= questions.length) {
      setCurrentQuestion(current)
      }
      current === questions.length? setFinalQuestion(true) : setFinalQuestion(false)
      setQuestions([...questions])
     
  };

  const handleChange = (answerId) => {
    let question = questions[currentQuestion - 1]
    let answerIndex = question.answers.findIndex( answer => answer.id.toString() === answerId.toString())
    let answer =  question.answers[answerIndex]
    answer.isCorrect = !answer.isCorrect;
    question.answers[answerIndex] = answer
    
    let testQuestions = questions
    testQuestions[currentQuestion - 1] = question;
    setQuestions([...testQuestions]);
  };
  
  return (
    <>
    {start ? (
          <Button
            variant="contained"
            size="small"
            fullWidth
            onClick={handleStart}
          >
            Start Quiz
          </Button>
        ) : !showResult ? (
          <>
           <Box sx={{ display: 'flex', flexDirection: 'row'}}>
              <p>{questions[currentQuestion - 1].text}</p>
              <p> 
               <Box sx={{ml: 2}}>
               <Tooltip title="Note: Click on the answer to select it">
                  <InfoIcon/>
                </Tooltip>
               </Box>
              </p>
           </Box>

            <StyledList>
              {  questions[currentQuestion - 1].answers.map((answer, index) => {
                return (
                  <ListItem
                  key={index}
                  disablePadding
                >
                  <ListItemButton role={undefined} dense>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={answer.isCorrect}
                        tabIndex={-1}
                        disableRipple
                        onClick = {() => handleChange(answer.id)}
                      />
                    </ListItemIcon>
                    <ListItemText id={answer.id} primary={answer.text} />
                  </ListItemButton>
                </ListItem>
                )
              })}
            </StyledList>
            <Box sx={{display: "flex", flexDirection: "row", alignItems: "end", justifyContent: "space-between" }}>
                <div>
                  <small>{`Question ${currentQuestion} of ${questions.length}.`}</small>
                </div>
                 <Box sx={{display: "flex", flexDirection: "row", width:"80%", justifyContent: "end"}}>
                  <Button style={{ marginTop: "10px", width: "30%", background: "#3acebc", color: "black", height: "30px", marginRight:"15px", borderRadius:"10px"}}
                    onClick={() => handleQuestionFlow(-1)}
                  >
                    Previous
                  </Button >
                    {!finalQuestion ? (
                      <Button style={{ marginTop: "10px", width: "30%", background: "#3acebc", color: "black", height: "30px", borderRadius:"10px"}}
                        onClick={() => handleQuestionFlow(1)}
                      >
                        Next
                      </Button>
                    ) : (
                      <Button style={{ marginTop: "10px", width: "30%", background: "#3acebc", color: "black", height: "30px", borderRadius:"10px"}}
                        onClick={handleSubmitQuiz}
                      >
                        Submit
                      </Button>
                    )}
                </Box>
            </Box>
          </>
        ) : <></>}
    </>
  )
 }