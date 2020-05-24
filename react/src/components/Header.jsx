import React, { useState, useCallback } from "react";
import ToolbarComponent from "./Toolbar/ToolbarComponent";
import DrawerComponent from "./Toolbar/DrawerComponent";
import { useSelector } from "react-redux";

const Header = () => {
  const [isVisible, setIsVisibleMenu] = useState(false);
  const username = useSelector((state) => state.auth.username);

  const toggleMenu = useCallback(() => {
    setIsVisibleMenu((prev) => !prev);
  }, []);

  return (
    <>
      <ToolbarComponent openDrawerHandler={toggleMenu} username={username} />
      <DrawerComponent left={isVisible} toggleDrawerHandler={toggleMenu} />
    </>
  );
};

export default Header;
