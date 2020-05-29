import {
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_ALERT,
  HIDE_ALERT,
  SHOW_CHAT,
  HIDE_CHAT
} from "./actionTypes";
import axios from 'axios';

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

export function showChat(chatId, participants) {
  return dispatch => {
    dispatch({
      type: SHOW_CHAT,
      payload: {
        chatId,
        participants
      }
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

// LOGIC: OPEN HIS CHAT OR ENTER TO AVAILABLE CHAT
export function openChat(username, chatId, stayHere) {
  return dispatch => {
    dispatch(showLoader())
    let url = `http://127.0.0.1:8000/chat/?username=${username}`
    if (chatId) {
      url = `http://127.0.0.1:8000/chat/?username=${username}&chatID=${chatId}`
    }
    if (stayHere && chatId) {
      url = `http://127.0.0.1:8000/chat/?username=${username}&chatID=${chatId}&stayHere=${stayHere}`
    }
    axios
      .get(url)
      .then((res) => {
        const chatId = res.data[0].id
        localStorage.setItem('chatId', chatId);
        const participants = res.data[0].participants.map((item, i, arr) => {
          return item = {
            id: item.user.id,
            username: item.user.username,
            avatar: item.user.avatar
          }
        })
        dispatch(hideLoader())
        dispatch(showChat(chatId, participants))
      })
      .catch((error) => {
        console.error(error.message);
      })
  }
}

export const closeChat = (username, token) => {
  return dispatch => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    console.log('LOGOUT...')
    let contactId = 0
    axios
      .get(`http://127.0.0.1:8000/contacts/?username=${username}`)
      .then((res) => {
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


