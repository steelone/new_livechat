import React from "react";
import PostForm from "../posts/PostForm";
import FetchedPosts from "../posts/FetchedPosts";
import Posts from "../posts/Posts";
// import MouseTracker from "../MouseTracker/MouseTracker";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    color: theme.palette.text.secondary,
  },
}));

const PostsPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <PostForm />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <h2>Sync Posts</h2>
            <Posts />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <h2>Async Posts</h2>
            <FetchedPosts />
          </Paper>
        </Grid>
        {/* <Grid item xs={12}>
          <Paper><MouseTracker /></Paper>
        </Grid> */}
      </Grid>
    </div>
  );
};

export default PostsPage;
