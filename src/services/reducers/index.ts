import { combineReducers } from "redux";
import { postsReducer } from "./posts.reducers";
import { appReducer } from "./app.reducers";

export const rootReducer = combineReducers({ posts: postsReducer, app: appReducer });