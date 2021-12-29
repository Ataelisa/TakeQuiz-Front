import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import { postQuiz } from "../../_actions/quiz_actions";

const StyledUploadButton = styled(Button)({
  width: "100%",
  color: "white",
});
export default function CreateQuiz({ setOpen }) {
  const methods = useForm({
    defaultValues: {},
  });

  const {
    control,
    setValue,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = (data) => {
    postQuiz(data);
    setOpen(false);
  };
  const themes = [
    {
      value: 1,
      label: "MATHS",
    },
    {
      value: 2,
      label: "ART",
    },
    {
      value: 3,
      label: "SPORT",
    },
    {
      value: 4,
      label: "PHYSICAL",
    },
  ];

  const hiddenFileInput = React.useRef(null);
  const handleChange = (event) => {
    const fileUpload = event.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      var b64 = reader.result;
      console.log({ b64 });
      setValue("image", b64);
    };

    reader.readAsDataURL(fileUpload);
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
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
              placeholder="Une description du Quiz ..."
              rows={4}
              fullWidth
              {...register("description")}
            />
          </Grid>
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item xs>
              <TextField
                label="tag"
                type="text"
                variant="outlined"
                size="small"
                fullWidth
                {...register("tag")}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={3}>
            <Grid item xs>
              <StyledUploadButton onClick={handleClick} variant="contained">
                Upload File
              </StyledUploadButton>
              <input
                type="file"
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{ display: "none" }}
              />
            </Grid>
            <Grid item xs>
              <TextField
                label="password"
                type="password"
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item xs>
              <Button variant="contained" size="small" fullWidth type="submit">
                save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}
