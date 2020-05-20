import React from 'react';
import Header from "./components/Header"
import Footer from './components/Footer';
import Content from './components/Content';
import { BrowserRouter } from 'react-router-dom';
import { makeStyles, Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  }
}));
function App() {
  const classes = useStyles();

  return (
    <Container className={classes.main}>
      <BrowserRouter>
        <Header />
        <Content />
        <Footer />
      </BrowserRouter>
    </Container>
  );
}

export default App;
