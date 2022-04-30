import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "../../services/hooks";
import { POST_PER_PAGE } from "../../utils/options";
import { TRawPost } from "../../utils/types";
import SortHeader from "../SortHerader/SortHeader";
import Pager from "../Pager/Pager";

import "./Table.scss";

interface ITableContents {
  data: Array<TRawPost>;
}
const TableContents = ({ data }: ITableContents) => {
  return (
    <table>
      <thead>
        <tr>
          <th>
            <SortHeader key={"TH_ID"} name="ID" sort={"id"} />
          </th>
          <th>
            <SortHeader key={"TH_HEAD"} name="Заголовок" sort={"title"} />
          </th>
          <th>
            <SortHeader key={"TH_DESCRIPTION"} name="Описание" sort={"body"} />
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => {
          return (
            <tr key={"ROW_" + index} data-user={item.userId}>
              <td className="centered">{item.id}</td>
              <td>{item.title}</td>
              <td>{item.body}</td>
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
  const { sortType, sortDirection } = useSelector((store) => store.app);

  const [last, setLast] = useState<number>(1);

  useEffect(() => {
    setLast(Math.ceil(posts.length / POST_PER_PAGE));
  }, [posts.length, setLast]);

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
      (current - 1) * POST_PER_PAGE,
      current * POST_PER_PAGE
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
  }, [posts, current, sortType, sortDirection, setData]);

  return (
    <>
      {current > 0 && current <= last ? (
        <TableContents data={data} />
      ) : (
        <TablePlaceholder />
      )}
      <Pager current={current} last={last} />
    </>
  );
};

export default Table;
