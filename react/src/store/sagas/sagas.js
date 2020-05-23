import { takeEvery, put, call } from 'redux-saga/effects'
import { FETCH_POSTS, REQUEST_POSTS } from '../actions/actionTypes'
import { showLoader, hideLoader, showAlert } from '../actions/app'

export function* sagaWatcher() {
  yield takeEvery(REQUEST_POSTS, sagaWorker)
}

function* sagaWorker() {
  try {
    yield put(showLoader())
    const payload = yield call(fetchPosts)
    yield put({ type: FETCH_POSTS, payload })
    yield put(hideLoader())
  } catch (e) {
    yield put(showAlert('Error'))
    yield put(hideLoader())
  }
}

async function fetchPosts() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
  return await response.json()
}