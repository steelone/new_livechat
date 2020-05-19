import React, { PureComponent } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import PostsPage from "./pages/PostsPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { MenuItem, MenuList, Menu } from "@material-ui/core";

const style = {
  flexGrow: 1,
};
class Nav extends PureComponent {
  render() {
    return (
      <Router>
        <div>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <Button style={style} color="inherit">
                Home
              </Button>
              <Link to="/posts">
                <Button style={style} color="inherit">
                  <Typography>Posts</Typography>
                </Button>
              </Link>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        </div>

        <div>
          <nav>
            <div>
              <Link to="/">Home</Link>
            </div>
            <div>
              <Link to="/about">About</Link>
            </div>
            <div>
              <Link to="/posts">Posts</Link>
            </div>
          </nav>
          <hr />
          <Route exact path="/" component={Home} />
          <Route exact path="/posts/" component={PostsPage} />
          <Route exact path="/chats/:chatId" component={ChatPage} />
          <Route path="/about" component={About} />
        </div>
      </Router>
    );
  }
}

export default Nav;
