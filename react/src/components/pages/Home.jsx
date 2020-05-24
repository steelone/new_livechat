import React, { useEffect } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { openChat } from "../../store/actions/app";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import Loader from "../Loader";
import WebSocketInstance from "../../websocket";

const useStyles = makeStyles((theme) => ({
  home: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}));

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  let history = useHistory();
  const loading = useSelector((state) => state.app.loading);
  const username = useSelector((state) => state.auth.username);
  const chatId = useSelector((state) => state.app.chatId);

  useEffect(() => {
    if (username && !chatId) {
      dispatch(openChat(username));
    } else if (username && chatId) {
      dispatch(openChat(username, chatId));
      setTimeout(() => {
        console.log("Redirect !!! ", `/chat/${chatId}`);
        history.push(`/chat/${chatId}`);
        console.log("Redirect Done ", `/chat/${chatId}`);
      }, 2000);
    }
    // }, [dispatch, history, username, chatId]);
  }, [dispatch, username]);

  useEffect(() => {
    if (chatId) {
      WebSocketInstance.disconnect();
      console.log("Redirect !!! ", `/chat/${chatId}`);
      history.push(`/chat/${chatId}`);
      console.log("Redirect Done ", `/chat/${chatId}`);
    }
  }, [chatId]);

  const preparingChat = (
    <div className={classes.home}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            <Typography variant="h5">Prepairing chat...</Typography>
            <Loader />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
  return <>{loading && preparingChat}</>;
};

export default Home;
