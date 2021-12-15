import { Button, Grid, TextField } from "@mui/material";
import React, { Suspense } from "react";
import { useForm } from "react-hook-form";
import Icon from '@mui/material/Icon';
import Checkbox from '@mui/material/Checkbox';
import AddShoppingCartIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from '@mui/material/IconButton';
import { AddCircleOutline } from "@mui/icons-material";
import ReponseList from "./reponse-list";
import { useState } from 'react'; 
//import { Button } from './Button.js'; 
import { ListComponent } from './ListComponent.js'; 

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
export default function EditQuiz() {
  const [components, setComponents] = useState(["Sample Component"]); 
  
  function addComponent() { 
    
    setComponents([...components, "Sample Component"]) 
  }
  const { handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1} mt={1} direction="column">
        <Grid item>
          <Grid container spacing={3}>
            <Grid item xs>
              <TextField
                label="name"
                type="text"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs>
              <TextField
                label="theme"
                type="text"
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container>
            <TextField
              label="description"
              multiline
              placeholder="Une description du Quiz ..."
              rows={4}
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid item>
          <Grid container>
            <h1>Question</h1>
            <IconButton color="primary" aria-label="add question">
            <AddCircleOutline />
          </IconButton>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container>
            <TextField
              label=""
              type="text"
              variant="outlined"
              size="small"
              fullWidth
            />
          </Grid>
        </Grid>
        {/* <Grid item>
          <Grid container>
          <Checkbox {...label} />
            <TextField
              label="Reponse"
              type="text"
              variant="outlined"
              size="small"
              focus={{outline:"none"}}
              
            />
          </Grid>
        </Grid> */}
        {components.map((item, i) => ( <ReponseList /> ))}
        <Grid item>
          <Grid container  spacing={3}>
          <Grid item xs>
          
          <IconButton color="primary" aria-label="add reponse">
            <AddCircleOutline onClick={addComponent}/>
          </IconButton>
          </Grid>
          <Grid item xs>
          <Button variant="contained" size="small" fullWidth type="submit" >
                Save
              </Button>
          </Grid>
          </Grid>
        </Grid>
        <Grid item>
        <Grid container spacing={3}>
            <Grid item xs>
              <Button variant="contained" size="small" fullWidth type="submit">
                Finish
              </Button>
              </Grid>
              <Grid item xs>
              <Button variant="contained" size="small" fullWidth type="submit">
                Exit
              </Button>
              </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}





