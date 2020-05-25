import React from "react";
import { Grid, Typography, Paper, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));
const Participant = (item, i, arr) => {
  const classes = useStyles();
  const username = useSelector((state) => state.auth.username);
  const name = username === item.item.username ? "You" : item.item.username;
  const defaultAvatar =
    "https://assets.dryicons.com/uploads/icon/svg/5598/cfee5087-8773-4fb3-ac5e-63372d889b1f.svg";
  return (
    <>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <Avatar alt="Avatar" src={defaultAvatar || item.item.avatar} />
            <Typography>{name}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default Participant;
