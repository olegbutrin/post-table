import { Reducer } from "redux";
import * as constants from "../constants/app.constants";
import { TAppstore } from "../../utils/types";
import { TAppActions } from "../actions/app.actions";

export const initialState: TAppstore = {
  sortType: "id",
  sortDirection: "asc",
  searchText: "",
  rowCount: 10,
};

export const appReducer: Reducer<TAppstore, TAppActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case constants.SET_SORT_TYPE:
      return { ...state, sortType: action.payload };
    case constants.SET_SORT_DIRECTION:
      return { ...state, sortDirection: action.payload };
    case constants.SET_SEARCH_TEXT:
      return {...state, searchText: action.payload};
      case constants.SET_ROWS_COUNT:
      return {...state, rowCount: action.payload};
    default:
      return state;
  }
};
