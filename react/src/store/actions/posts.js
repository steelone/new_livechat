import { CREATE_POST, REQUEST_POSTS } from "./actionTypes";

export function createPost(post) {
  return {
    type: CREATE_POST,
    payload: post
  }
}

export function fetchPosts() {
  return {
    type: REQUEST_POSTS
  }
}