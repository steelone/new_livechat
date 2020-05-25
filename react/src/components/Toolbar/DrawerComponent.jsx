import React from "react";
import Drawer from "@material-ui/core/Drawer";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  makeStyles,
} from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";
import { NavLink } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import ChatIcon from "@material-ui/icons/Chat";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

const DrawerComponent = (props) => {
  const classes = useStyles();
  const { isVisible, toggleDrawerHandler } = props;

  const sideList = (side) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawerHandler}
      onKeyDown={toggleDrawerHandler}
    >
      <List>
        <NavLink to="/">
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
        </NavLink>
        <NavLink to="/posts/">
          <ListItem button>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={"Posts"} />
          </ListItem>
        </NavLink>
        <NavLink to="/chat/1">
          <ListItem button>
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary={"Test ChatPage"} />
          </ListItem>
        </NavLink>
      </List>
      <Divider />
      <List>
        <NavLink to="/about/">
          <ListItem button>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary={"About"} />
          </ListItem>
        </NavLink>
      </List>
    </div>
  );

  return (
    <Drawer open={isVisible} onClose={toggleDrawerHandler}>
      {sideList("left")}
    </Drawer>
  );
};

export default DrawerComponent;
