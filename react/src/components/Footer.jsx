import React from "react";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const [value, setValue] = React.useState("busy");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // HERE OPEN AND CONNECT CHAT
  };
  return (
    <div>
      <Box pt={10}>
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
      </Box>
    </div>
  );
};

export default Footer;
