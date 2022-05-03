import { useEffect, useState } from "react";
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "../../services/hooks";
import { getPosts } from "../../services/actions/posts.actions";
import Spinner from "../Spinner/Spinner";
import Search from "../Search/Search";
import Table from "../Table/Table";

import "./App.scss";
import RowPerPage from "../RowPerPage/RowPerPage";

const basename = "";

const Page = () => {
  const { posts } = useSelector((store) => store.posts);
  const { rowCount } = useSelector((store) => store.app);

  const [last, setLast] = useState<number>(1);

  useEffect(() => {
    setLast(Math.ceil(posts.length / rowCount));
  }, [posts.length, rowCount, setLast]);

  const { page } = useParams<{ page?: string }>();
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    if (page !== undefined && !isNaN(parseInt(page))) {
      const index = parseInt(page) as number;
      setCurrent(index);
    } else {
      setCurrent(0);
    }
  }, [page, setCurrent]);

  return (
    <>
      <div className="Row">
        <Search rowCount={rowCount} current={current} />
        <RowPerPage rowCount={rowCount} />
      </div>
      <Table posts={posts} rowCount={rowCount} current={current} last={last} />
    </>
  );
};

const RoutedContents = () => {
  return (
    <Router basename={basename}>
      <Routes>
        <Route path={"/:page"} element={<Page />} />
        <Route path="*" element={<Navigate to={"/1"} replace />} />
      </Routes>
    </Router>
  );
};

const ErrorContents = () => {
  return (
    <div className="ErrorPlaceholder">
      Ошибка получения данных. Перезагрузите страницу
    </div>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const { request, error } = useSelector((store) => store.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className="App">
      <div className="Paper">
        {request && <Spinner />}
        {!request && error && <ErrorContents />}
        {!request && !error && <RoutedContents />}
      </div>
      <div className="sourceLink">
        <a
          href="https://github.com/olegbutrin/post-table"
          target={"_blank"}
          rel="noreferrer"
        >
          [source code]
        </a>
      </div>
    </div>
  );
};

export default App;
