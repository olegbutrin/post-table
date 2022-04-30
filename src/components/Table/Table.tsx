import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "../../services/hooks";
import { TRawPost } from "../../utils/types";
import SortHeader from "../SortHerader/SortHeader";
import Pager from "../Pager/Pager";

import "./Table.scss";

interface ITableContents {
  data: Array<TRawPost>;
  searchText: string;
}
const TableContents = ({ data, searchText }: ITableContents) => {
  return (
    <table>
      <thead>
        <tr>
          <th style={{ width: "10%" }}>
            <SortHeader key={"TH_ID"} name="ID" sort={"id"} />
          </th>
          <th style={{ width: "30%" }}>
            <SortHeader key={"TH_HEAD"} name="Заголовок" sort={"title"} />
          </th>
          <th style={{ width: "60%" }}>
            <SortHeader key={"TH_DESCRIPTION"} name="Описание" sort={"body"} />
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => {
          const title = searchText
            ? item.title
                .split(searchText)
                .reduce((arr: Array<any>, item, index, src) => {
                  arr.push(item);
                  if (index < src.length - 1) {
                    arr.push(<span key={"ST_" + index} className="search">{searchText}</span>);
                  }
                  return arr;
                }, [])
            : [item.title];
          const body = searchText
            ? item.body
                .split(searchText)
                .reduce((arr: Array<any>, item, index, src) => {
                  arr.push(item);
                  if (index < src.length - 1) {
                    arr.push(<span key={"ST_" + index} className="search">{searchText}</span>);
                  }
                  return arr;
                }, [])
            : [item.body];
          const changed = title.length > 1 || body.length > 1;
          return (
            <tr
              key={"ROW_" + index}
              className={changed ? "highlight" : ""}
              data-user={item.userId}
            >
              <td className="centered">{item.id}</td>
              <td>
                {title.map((item) => {
                  return item;
                })}
              </td>
              <td>
                {body.map((item) => {
                  return item;
                })}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const TablePlaceholder = () => {
  return (
    <div className="TablePlaceholder">
      Нет такой страницы. Перейдите на любую доступную
    </div>
  );
};

const Table = () => {
  const { posts } = useSelector((store) => store.posts);
  const { sortType, sortDirection, searchText, rowCount } = useSelector(
    (store) => store.app
  );

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
      setCurrent(1);
    }
  }, [page, setCurrent]);

  const [data, setData] = useState<Array<TRawPost>>([]);

  useEffect(() => {
    const tableData = [...posts].slice(
      (current - 1) * rowCount,
      current * rowCount
    );
    switch (sortType) {
      case "id":
        tableData.sort((a, b) => {
          return a.id - b.id;
        });
        break;
      case "title":
        tableData.sort((a, b) => {
          return a.title.localeCompare(b.title);
        });
        break;
      case "body":
        tableData.sort((a, b) => {
          return a.body.localeCompare(b.body);
        });
        break;
    }
    if (sortDirection === "desc") {
      tableData.reverse();
    }
    setData(tableData);
  }, [posts, current, sortType, sortDirection, rowCount, setData]);

  return (
    <>
      <div className="Table">
        {current > 0 && current <= last ? (
          <TableContents data={data} searchText={searchText} />
        ) : (
          <TablePlaceholder />
        )}
      </div>
      <Pager current={current} last={last} />
    </>
  );
};

export default Table;
