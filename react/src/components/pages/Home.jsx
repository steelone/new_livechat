import React, { useEffect } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
// import { connect } from "react-redux";

import { useDispatch, useSelector } from "react-redux";
import { openChat, closeChat } from "../../store/actions/app";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import Loader from "../Loader";

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
  const token = useSelector((state) => state.auth.token);
  const chatId = useSelector((state) => state.app.chatId);

  useEffect(() => {
    if (username && !chatId) {
      dispatch(openChat());
    } else {
      console.log("Redirect !!! ", `/chat/${chatId}`);
      history.push(`/chat/${chatId}`);
    }
    setTimeout(() => {}, 1000);
  }, [dispatch, chatId]);

  // const closeChatA = () => {
  //   chatId && dispatch(closeChat(username, token, chatId));
  //   console.log("closeChat clicked !!! ");
  //   history.push("/");
  // };

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
  return (
    <>
      {loading && preparingChat}
      {/* <button onClick={openChatA}>openChat</button>
      <button onClick={closeChatA}>closeChat</button> */}
    </>
  );
};

export default Home;
