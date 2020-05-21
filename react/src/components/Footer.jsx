import React from "react";
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
  const [value, setValue] = React.useState("busy");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // TODO HERE OPEN AND CONNECT CHAT
    if (newValue === "available") {
      WebSocketInstance.connect();
    } else {
      WebSocketInstance.disconnect();
    }
  };
  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <BottomNavigation value={value} onChange={handleChange}>
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
