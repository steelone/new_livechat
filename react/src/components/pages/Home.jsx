import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";

const Home = () => (
  <>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper>
          <Typography variant="h3" component="h2">
            WELCOME HOME
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  </>
);

export default Home;
