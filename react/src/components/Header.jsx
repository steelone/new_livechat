import React, { useState, useCallback } from "react";
import ToolbarComponent from "./Toolbar/ToolbarComponent";
import DrawerComponent from "./Toolbar/DrawerComponent";

const Header = () => {
  const [isVisible, setIsVisibleMenu] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsVisibleMenu((prev) => !prev);
  }, []);

  return (
    <>
      <ToolbarComponent openDrawerHandler={toggleMenu} />
      <DrawerComponent left={isVisible} toggleDrawerHandler={toggleMenu} />
    </>
  );
};

export default Header;
