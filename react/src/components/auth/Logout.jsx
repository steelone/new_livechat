import React from "react";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/auth";

const Logout = () => {
  const dispatch = useDispatch();

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={() => dispatch(logout())}
    >
      Logout
    </Button>
  );
};

export default Logout;
