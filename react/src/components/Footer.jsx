import React, { useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
  Container,
} from "@material-ui/core";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import * as actions from "../store/actions/auth";
import { connect } from "react-redux";
import WebSocketInstance from "../websocket";

import { useDispatch, useSelector } from "react-redux";
import { openChat, closeChat } from "../store/actions/app";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}));
const Footer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let history = useHistory();

  const username = useSelector((state) => state.auth.username);
  const token = useSelector((state) => state.auth.token);
  // const available = useSelector((state) => state.auth.available);
  // const chatId = useSelector((state) => state.app.chatId);
  const contactId = useSelector((state) => state.app.contactId);
  // let status = useSelector((state) => state.app.status);
  const [status, setStatus] = useState("busy");

  // TODO HERE OPEN AND CONNECT CHAT
  const handleChange = (e, value) => {
    if (username && value === "available") {
      setStatus(value);
      WebSocketInstance.connect();
      dispatch(openChat());
    } else {
      WebSocketInstance.disconnect();
      contactId && dispatch(closeChat(username, token, contactId));
      history.push("/");
    }
  };

  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <BottomNavigation value={status} onChange={handleChange}>
          <BottomNavigationAction
            label="I'm busy"
            value="busy"
            icon={<RestoreIcon />}
          />
          <BottomNavigationAction
            label="Let's chat"
            value="available"
            icon={<FavoriteIcon />}
          />
          <BottomNavigationAction
            label="Nearby"
            value="nearby"
            icon={<LocationOnIcon />}
          />
        </BottomNavigation>
      </Container>
    </footer>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(null, mapDispatchToProps)(Footer);
