import { CREATE_POST } from './actionTypes'
import { showAlert } from './app'


const forbidden = ['fuck', 'test', 'sex']

export function forbiddenWordsMiddleware({ dispatch }) {
  return function (next) {
    return function (action) {
      if (action.type === CREATE_POST) {
        const found = forbidden.filter(w => action.payload.title.includes(w))
        if (found.length) {
          return dispatch(showAlert(`You are spammer! We didn't invite you. Go home!`))
        }
      }
      return next(action)
    }
  }
}