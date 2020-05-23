import {
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_ALERT,
  HIDE_ALERT,
  SHOW_CHAT,
  HIDE_CHAT
} from "./actionTypes";
import axios from 'axios';
import WebSocketInstance from "../../websocket";

export function showLoader() {
  return {
    type: SHOW_LOADER
  }
}

export function hideLoader() {
  return {
    type: HIDE_LOADER
  }
}

export function showAlert(text) {
  return dispatch => {
    dispatch({
      type: SHOW_ALERT,
      payload: text
    })
    setTimeout(() => {
      dispatch(hideAlert())
    }, 3000)
  }
}

export function hideAlert() {
  return {
    type: HIDE_ALERT
  }
}

export function showChat(chatId) {
  return dispatch => {
    dispatch({
      type: SHOW_CHAT,
      payload: chatId
    })
  }
}

export function hideChat() {
  return dispatch => {
    dispatch({
      type: HIDE_CHAT,
    })
  }
}

const username = localStorage.getItem('username')
const token = localStorage.getItem('token')
// LOGIC: OPEN HIS CHAT OR ADD TO AVAILABLE CHAT
export function openChat() {
  return dispatch => {
    dispatch(showLoader())
    axios
      .get(`http://127.0.0.1:8000/chat/?username=${username}`)
      .then((res) => {
        console.log("====== res.data.id ======= ", res.data[0].id);
        const chatId = res.data[0].id
        localStorage.setItem('chatId', chatId);
        dispatch(hideLoader())
        dispatch(showChat(chatId))
      })
      .catch((error) => {
        console.error(error.message);
      })
  }
}
// LOGIC: DELETE USER_CONTACT FROM THIS CHAT
export const closeChat = () => {
  return dispatch => {
    // dispatch(WebSocketInstance.disconnect());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    let contactId = 0
    axios
      .get(`http://127.0.0.1:8000/contacts/?username=${username}`)
      .then((res) => {
        console.log("====== res.data ======= ", res.data[0]);
        contactId = res.data[0].url
        const contactData = {
          available: false
        }
        axios
          .patch(`${contactId}`, contactData)
          .then((res) => {
            dispatch(hideChat())
          })
          .catch((error) => {
            console.error(error.message);
          })
      })
      .catch((error) => {
        console.error(error.message);
      })
  }
}


