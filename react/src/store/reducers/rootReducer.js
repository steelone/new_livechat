import { combineReducers } from "redux";
import { postsReducer } from "./postsReducer";
import { appReducer } from "./appReducer";
import { authReducer } from "./authReducer";


export const rootReducer = combineReducers({
  posts: postsReducer,
  app: appReducer,
  auth: authReducer
})