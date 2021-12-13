import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
export default function EditQuiz({handleChangeEditCard}) {
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
        <Grid container spacing={3}>
            <Grid item xs>
              <Button variant="contained" size="small" fullWidth type="submit">
                Finish
              </Button>
              </Grid>
              <Grid item xs>
              <Button variant="contained" size="small" fullWidth  onClick={handleChangeEditCard}>
                Exit
              </Button>
              </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}
