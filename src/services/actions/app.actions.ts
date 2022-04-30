import { Dispatch } from "redux";
import {TSortType, TSortDirection} from "../../utils/types"
import * as constants from "../constants/app.constants"

export interface ISetSortType {
  readonly type: typeof constants.SET_SORT_TYPE;
  readonly payload: TSortType;
}

export interface ISetSortDirection {
  readonly type: typeof constants.SET_SORT_DIRECTION;
  readonly payload: TSortDirection;
}

export type TAppActions = ISetSortType | ISetSortDirection;

export const setSortType = (sortType: TSortType) => {
  return (dispatch: Dispatch) => {
    dispatch({type: constants.SET_SORT_TYPE, payload: sortType});
  }
}

export const setSortDirection = (sortDirection: TSortDirection) => {
  return (dispatch: Dispatch) => {
    dispatch({type: constants.SET_SORT_DIRECTION, payload: sortDirection});
  }
}

