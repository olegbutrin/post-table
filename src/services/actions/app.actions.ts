import { Dispatch } from "redux";
import { TSortType, TSortDirection } from "../../utils/types";
import * as constants from "../constants/app.constants";

export interface ISetSortType {
  readonly type: typeof constants.SET_SORT_TYPE;
  readonly payload: TSortType;
}

export interface ISetSortDirection {
  readonly type: typeof constants.SET_SORT_DIRECTION;
  readonly payload: TSortDirection;
}

export interface ISetSearchText {
  readonly type: typeof constants.SET_SEARCH_TEXT;
  readonly payload: string;
}

export interface ISetRowsCount {
  readonly type: typeof constants.SET_ROWS_COUNT;
  readonly payload: number;
}

export type TAppActions =
  | ISetSortType
  | ISetSortDirection
  | ISetSearchText
  | ISetRowsCount;

export const setSortType = (sortType: TSortType) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: constants.SET_SORT_TYPE, payload: sortType });
  };
};

export const setSortDirection = (sortDirection: TSortDirection) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: constants.SET_SORT_DIRECTION, payload: sortDirection });
  };
};

export const setSearchText = (searchText: string) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: constants.SET_SEARCH_TEXT, payload: searchText });
  };
};

export const setRowsCount = (count: number) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: constants.SET_ROWS_COUNT, payload: count });
  };
};
