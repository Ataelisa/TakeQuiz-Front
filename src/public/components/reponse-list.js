import React from "react";
import { Grid, TextField } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import Checkbox from '@mui/material/Checkbox';


export default function ReponseList() {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  return (
<Grid item>
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
        </Grid>
  );
}

