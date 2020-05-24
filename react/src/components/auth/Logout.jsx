import React from "react";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/auth";
import { useHistory } from "react-router-dom";
import WebSocketInstance from "../../websocket";

const Logout = () => {
  const dispatch = useDispatch();
  let history = useHistory();

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={() => {
        history.push("/");
        WebSocketInstance.disconnect();
        dispatch(logout());
      }}
    >
      Logout
    </Button>
  );
};

export default Logout;
