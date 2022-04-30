import { useEffect } from "react";
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { useDispatch, useSelector } from "../../services/hooks";
import { getPosts } from "../../services/actions/posts.actions";
import Spinner from "../Spinner/Spinner";
import Search from "../Search/Search";
import Table from "../Table/Table";

import "./App.scss";

const basename = "";

const Page = () => {
  return (
    <>
      <Search />
      <Table />
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
    </div>
  );
};

export default App;
