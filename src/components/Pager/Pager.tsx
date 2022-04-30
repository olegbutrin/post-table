import { Link, NavLink } from "react-router-dom";
import "./Pager.scss";

interface IPageListComponent {
  last: number;
}

const PageList = ({ last }: IPageListComponent) => {
  const range = [...Array(last)].map((item, index) => {
    return index + 1;
  });
  return (
    <div className="PagerPage">
      {range.map((item) => {
        return <NavLink key={"PL_" + item} to={`/${item}`}>{item}</NavLink>;
      })}
    </div>
  );
};

interface IPagerComponent {
  current: number;
  last: number;
}

const Pager = ({ current, last }: IPagerComponent) => {
  return (
    <div className="Pager">
      {current > 1 ? (
        <Link to={`/${String(current - 1)}`}>
          <div className="PagerText">Назад</div>
        </Link>
      ) : (
        <div className="PagerText last">Назад</div>
      )}
      <PageList last={last} />
      {current < last ? (
        <Link to={`/${String(current + 1)}`}>
          <div className="PagerText">Далее</div>
        </Link>
      ) : (
        <div className="PagerText last">Далее</div>
      )}
    </div>
  );
};

export default Pager;
