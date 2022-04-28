import { Dispatch } from "redux";
import { fetchPosts } from "../../utils/api";
import { TRawData } from "../../utils/types";
import * as constants from "../constants/posts.constants";

export interface IPostsRequest {
  readonly type: typeof constants.POSTS_REQUEST;
}

export interface IPostsSuccess {
  readonly type: typeof constants.POSTS_SUCCESS;
  readonly payload: TRawData;
}

export interface IPostsError {
  readonly type: typeof constants.POSTS_ERROR;
  readonly payload: string;
}

export type TPostsActions = IPostsRequest | IPostsSuccess | IPostsError;

export const getPosts = () => {
  return (dispatch: Dispatch) => {
    dispatch({ type: constants.POSTS_REQUEST });
    fetchPosts(
      (data) => {
        dispatch({ type: constants.POSTS_SUCCESS, payload: data });
      },
      (error) => {
        dispatch({ type: constants.POSTS_ERROR, payload: error });
      }
    );
  };
};
