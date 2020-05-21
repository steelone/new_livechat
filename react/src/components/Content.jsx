import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import PostsPage from "./pages/PostsPage";
import ChatPage from "./pages/ChatPage";
import About from "./pages/About";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    flex: "1 0 auto",
    padding: "12px",
  },
});
const Content = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/posts/" component={PostsPage} />
        <Route exact path="/chat/:chatId/" component={ChatPage} />
        <Route path="/about" component={About} />
        <Route exact path="/">
          <Redirect to="/posts/" />
        </Route>
        <Route exact path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
};

export default Content;
