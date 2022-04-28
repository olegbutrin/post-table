import { Reducer } from "redux";
import * as constants from "../constants/posts.constants";
import { TPostsStore } from "../../utils/types";
import { TPostsActions } from "../actions/posts.actions";

export const initialState: TPostsStore = {
  request: false,
  error: "",
  posts: [],
};

export const postsReducer: Reducer<TPostsStore, TPostsActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case constants.POSTS_REQUEST:
      return { ...state, request: true };
    case constants.POSTS_ERROR:
      return { ...state, request: false, error: action.payload };
    case constants.POSTS_SUCCESS:
      return { ...state, request: false, error: "", users: action.payload };
    default:
      return state;
  }
};
