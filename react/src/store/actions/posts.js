import { CREATE_POST, REQUEST_POSTS, SHOW_LOADER, HIDE_LOADER, SHOW_ALERT, HIDE_ALERT } from "./actionTypes";

export function createPost(post) {
  return {
    type: CREATE_POST,
    payload: post
  }
}

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
    }, 1500)
  }
}

export function hideAlert() {
  return {
    type: HIDE_ALERT
  }
}

export function fetchPosts() {
  // rewrite code to the saga way
  return {
    type: REQUEST_POSTS
  }

  // return async dispatch => {
  //   try {
  //     dispatch(showLoader())
  //     const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
  //     const json = await response.json()
  //     // fiction delay
  //     setTimeout(() => {
  //       dispatch({type: FETCH_POSTS, payload: json})
  //       dispatch(hideLoader())
  //     }, 200)
  //   } catch (e) {
  //     dispatch(showAlert('Server is unavailable'))
  //     dispatch(hideLoader())
  //   }
  // }
}