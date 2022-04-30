import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  setRowsCount,
  setSearchText,
} from "../../services/actions/app.actions";
import { useDispatch, useSelector } from "../../services/hooks";
import { TRawData } from "../../utils/types";
import "./Search.scss";

const rowsOpts = [5, 10, 20, 50, 100];

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

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchText, rowCount } = useSelector((store) => store.app);
  const { posts } = useSelector((store) => store.posts);

  const { page } = useParams<{ page?: string }>();
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    if (page !== undefined && !isNaN(parseInt(page))) {
      const index = parseInt(page) as number;
      setCurrent(index);
    } else {
      setCurrent(1);
    }
  }, [page, setCurrent]);

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
      e.preventDefault();
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

  const handleRowPerPage = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const item = e.target as HTMLSelectElement;
      dispatch(setRowsCount(Number(item.value)));
      navigate("/1");
    },
    [dispatch, navigate]
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
      <div className="rowPerPage">
        <label htmlFor="row_per_page">Строк на странице:</label>
        <select
          id="row_per_page"
          name="row_per_page"
          defaultValue={rowCount}
          onChange={handleRowPerPage}
        >
          {rowsOpts.map((item, index) => {
            return <option key={"RPP_" + index}>{item}</option>;
          })}
        </select>
      </div>
    </div>
  );
};

export default Search;
