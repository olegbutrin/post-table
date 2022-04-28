import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "../../services/hooks";
import { getPosts } from "../../services/actions/posts.actions";
import Spinner from "../Spinner/Spinner";
import { useEffect } from "react";

import "./App.scss";

const basename = "/";

const App = () => {
  const dispatch = useDispatch();
  const { request } = useSelector((store) => store.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className="App">
      <div className="Paper">
        {request && <Spinner />}
        {!request && "App"}
      </div>
    </div>
  );
};

export default App;
