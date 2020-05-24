import axios from 'axios';
import * as actionTypes from './actionTypes';
import { closeChat } from './app'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (username, token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    username: username
  }
}

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const logout = () => {
  return dispatch => {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const chatId = localStorage.getItem('chatId');
    chatId && dispatch(closeChat(username, token));
    dispatch(logoutFinish());
  }
}


export const logoutFinish = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('chatId');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
}

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000)
  }
}

export const authLogin = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    axios.post('http://127.0.0.1:8000/rest-auth/login/', {
      username: username,
      password: password
    })
      .then(res => {
        console.log('res.data', res.data)
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('expirationDate', expirationDate);

        dispatch(authSuccess(username, token));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err))
      })
  }
}

export const authSignup = (username, email, password1, password2) => {
  return dispatch => {
    dispatch(authStart());
    axios.post('http://127.0.0.1:8000/rest-auth/registration/', {
      username: username,
      email: email,
      password1: password1,
      password2: password2
    })
      .then(res => {
        const token = res.data.key;
        // const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        const expirationDate = new Date(new Date().getTime() + 3600);
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('expirationDate', expirationDate);
        dispatch(authSuccess(username, token));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err))
      })
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(username, token));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  }
}