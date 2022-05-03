import React, { SyntheticEvent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { setSearchText } from "../../services/actions/app.actions";
import { useDispatch, useSelector } from "../../services/hooks";
import { TRawData } from "../../utils/types";
import "./Search.scss";

const getPagesWithSearchText: (
  posts: TRawData,
  searchText: string,
  rowCount: number
) => Array<number> = (posts, searchText, rowCount) => {
  return posts.reduce((arr: Array<number>, item, index) => {
    if (
      item.title.indexOf(searchText) !== -1 ||
      item.body.indexOf(searchText) !== -1
    ) {
      arr.push(Math.ceil((index + 1) / rowCount));
    }
    return arr;
  }, []);
};

interface ISearchComponent {
  rowCount: number;
  current: number;
}

const Search = ({ rowCount, current }: ISearchComponent) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchText } = useSelector((store) => store.app);
  const { posts } = useSelector((store) => store.posts);

  const handleChange = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const item = e.target as HTMLInputElement;
      if (item.value !== searchText) {
        dispatch(setSearchText(item.value));
      }
    },
    [dispatch, searchText]
  );

  const handlePaste = useCallback(
    (e: SyntheticEvent) => {
      e.stopPropagation();
      const item = e.target as HTMLInputElement;
      if (item.value !== searchText) {
        dispatch(setSearchText(item.value));
      }
    },
    [dispatch, searchText]
  );

  const handleGoNextEnter = useCallback(
    (e: SyntheticEvent) => {
      e.stopPropagation();
      const native = e.nativeEvent as KeyboardEvent;
      if (native.key === "Enter") {
        const pages = getPagesWithSearchText(posts, searchText, rowCount);
        if (pages.length > 0) {
          const nextPage = pages.find((item) => {
            return item > current;
          });
          if (nextPage) {
            navigate(`/${nextPage}`);
          } else {
            navigate(`/${pages[0]}`);
          }
        }
      }
    },
    [current, posts, rowCount, searchText, navigate]
  );

  return (
    <div className="Search">
      <div className="text-field">
        <input
          type={"search"}
          placeholder={"Поиск"}
          onChange={handleChange}
          onPaste={handlePaste}
          onKeyUp={handleGoNextEnter}
        />
      </div>
    </div>
  );
};

export default React.memo(Search);
