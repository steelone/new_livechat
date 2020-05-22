import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from "./components/Header"
import Footer from './components/Footer';
import Content from './components/Content';
import { BrowserRouter } from 'react-router-dom';
import { makeStyles, Container } from "@material-ui/core";
import Auth from './components/auth/Auth';
import { authCheckState } from './store/actions/auth';

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  }
}));
function App() {
  const classes = useStyles();
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(authCheckState());
  }, [dispatch]);

  const isLoggedIn = useSelector(state => state.auth.loggedIn);
  const app = (
    <Container className={classes.main}>
      <BrowserRouter>
        <Header />
        <Content />
        <Footer />
      </BrowserRouter>
    </Container>
  )

  return (
    <>
      {isLoggedIn && app}
      {!isLoggedIn && <Auth />}
    </>
  );
}

export default App;
