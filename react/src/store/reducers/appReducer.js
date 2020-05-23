import {
  HIDE_LOADER,
  SHOW_LOADER,
  SHOW_ALERT,
  HIDE_ALERT,
  SHOW_CHAT,
  HIDE_CHAT
} from '../actions/actionTypes'

const initialState = {
  loading: false,
  alert: null,
  chatId: null,
}

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOADER:
      return { ...state, loading: true }
    case HIDE_LOADER:
      return { ...state, loading: false }
    case SHOW_ALERT:
      return { ...state, alert: action.payload }
    case HIDE_ALERT:
      return { ...state, alert: null }
    case SHOW_CHAT:
      return { ...state, chatId: action.payload }
    case HIDE_CHAT:
      return { ...state, chatId: null }
    default: return state
  }
}