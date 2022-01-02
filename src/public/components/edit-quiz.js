import { Button, Grid, MenuItem, TextField } from "@mui/material";
import React, { Suspense } from "react";
import { useForm } from "react-hook-form";
import Icon from "@mui/material/Icon";
import Checkbox from "@mui/material/Checkbox";
import AddShoppingCartIcon from "@mui/icons-material/AddCircleOutline";
import IconButton from "@mui/material/IconButton";
import { AddCircleOutline } from "@mui/icons-material";
import ReponseList from "./reponse-list";
import { useState } from "react";
import { themes } from "../../constantes/theme";

//import { Button } from './Button.js';
import { ListComponent } from "./ListComponent.js";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
export default function EditQuiz({ quiz }) {
  const [components, setComponents] = useState(["Sample Component"]);

  function addComponent() {
    setComponents([...components, "Sample Component"]);
  }

  const onSubmit = (data) => {
    console.log("here");
  };

  const methods = useForm({
    defaultValues: {
      name: quiz.name,
      theme: quiz.theme,
      description: quiz.description,
    },
  });

  const {
    control,
    setValue,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

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
                {...register("name", { required: true })}
              />
            </Grid>
            <Grid item xs>
              <TextField
                label="theme"
                select
                defaultValue={quiz.theme}
                variant="outlined"
                size="small"
                fullWidth
                {...register("theme")}
              >
                {themes.map((theme) => (
                  <MenuItem key={theme.value} value={theme.value}>
                    {theme.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container>
            <TextField
              label="description"
              multiline
              rows={4}
              fullWidth
              {...register("description")}
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
        {components.map((item, i) => (
          <ReponseList />
        ))}
        <Grid item>
          <Grid container spacing={3}>
            <Grid item xs>
              <IconButton color="primary" aria-label="add reponse">
                <AddCircleOutline onClick={addComponent} />
              </IconButton>
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
            <Grid item xs>
              <Button variant="contained" size="small" fullWidth type="submit">
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}
