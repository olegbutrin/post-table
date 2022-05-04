import React, { SyntheticEvent, useCallback } from "react";
import {
  setSortDirection,
  setSortType,
} from "../../services/actions/app.actions";
import { useDispatch, useSelector } from "../../services/hooks";
import { TSortType } from "../../utils/types";
import "./SortHeader.scss";

interface ISortHeaderComponent {
  name: string;
  sort: TSortType;
}
const SortHeader = ({ name, sort }: ISortHeaderComponent) => {
  const dispatch = useDispatch();
  const { sortType, sortDirection } = useSelector((store) => store.app);

  const handleSortType = useCallback(
    (e: SyntheticEvent) => {
      e.stopPropagation();
      dispatch(setSortType(sort));
      dispatch(setSortDirection("asc"));
    },
    [sort, dispatch]
  );

  const handleSortDirection = useCallback(
    (e: SyntheticEvent) => {
      e.stopPropagation();
      if (sortDirection === "asc") {
        dispatch(setSortDirection("desc"));
      }
      if (sortDirection === "desc") {
        dispatch(setSortDirection("asc"));
      }
    },
    [sortDirection, dispatch]
  );

  return (
    <div
      className={sortType === sort ? "SortHeader Active" : "SortHeader"}
      onClick={handleSortType}
    >
      <div className="SortHeaderText">{name}</div>
      {sortType === sort ? (
        <div className={sortDirection} onClick={handleSortDirection}></div>
      ) : (
        <div className="asc"></div>
      )}
    </div>
  );
};

export default React.memo(SortHeader);
