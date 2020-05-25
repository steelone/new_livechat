import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import Participant from "./Participant";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import { openChat } from "../../store/actions/app";
import { useInterval } from "../../services/useInterval";

const useStyles = makeStyles((theme) => ({
  chatFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const ChatPageFooter = () => {
  const dispatch = useDispatch();
  const participants = useSelector((state) => state.app.participants);
  const chatId = localStorage.getItem("chatId");

  const username = useSelector((state) => state.auth.username);
  const [stayHere] = useState(true);
  const [loading, setLoading] = useState(true);
  const [currentParticipants, setCurrentParticipants] = useState(participants);

  useInterval(() => {
    dispatch(openChat(username, chatId, stayHere));
  }, 1000 * 10);
  useEffect(() => {
    if (participants) {
      setLoading(false);
      setCurrentParticipants(participants);
    } else {
      dispatch(openChat(username, chatId, stayHere));
      setCurrentParticipants(participants);
      setLoading(false);
    }
  }, [dispatch, participants]);

  function renderParticipants(currentParticipants) {
    return currentParticipants.map((item, i, arr) => (
      <Participant key={item.id} item={item} />
    ));
  }
  const classes = useStyles();
  return (
    <>
      {loading && (
        <div>
          participants loading...
          <Loader />
        </div>
      )}
      {!loading && (
        <div className={classes.chatFooter}>
          {participants &&
            currentParticipants &&
            renderParticipants(currentParticipants)}
        </div>
      )}
    </>
  );
};

export default ChatPageFooter;
