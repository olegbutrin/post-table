import React, { useEffect, useState } from "react";
import { useSelector } from "../../services/hooks";
import { TRawData, TRawPost } from "../../utils/types";
import SortHeader from "../SortHerader/SortHeader";
import Pager from "../Pager/Pager";

import "./Table.scss";

const textHiglight = (text: string, searchText: string, className: string) => {
  return text.split(searchText).reduce((arr: Array<any>, item, index, src) => {
    arr.push(item);
    if (index < src.length - 1) {
      arr.push(
        <span key={"ST_" + index} className={className}>
          {searchText}
        </span>
      );
    }
    return arr;
  }, []);
};

interface ITableRowComponent {
  index: number;
  changed: boolean;
  id: number;
  userId: number;
  title: Array<React.ReactFragment>;
  body: Array<React.ReactFragment>;
}

const TableRow = ({
  changed,
  id,
  userId,
  title,
  body,
}: ITableRowComponent) => {
  return (
    <tr className={changed ? "highlight" : ""} data-user={userId}>
      <td key={"RC_ID"} className="centered">
        {id}
      </td>
      <td key={"RC_TITLE"}>
        {title.map((item) => {
          return item;
        })}
      </td>
      <td key={"RC_BODY"}>
        {body.map((item) => {
          return item;
        })}
      </td>
    </tr>
  );
};

const MemoTableRow = React.memo(TableRow);

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
            ? textHiglight(item.title, searchText, "search")
            : [item.title];
          const body = searchText
            ? textHiglight(item.body, searchText, "search")
            : [item.body];
          const changed = title.length > 1 || body.length > 1;
          return (
            <MemoTableRow
              key={"ROW_" + item.id}
              index={index}
              changed={changed}
              id={item.id}
              userId={item.userId}
              title={title}
              body={body}
            />
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

interface ITableComponent {
  posts: TRawData;
  rowCount: number;
  current: number;
  last: number;
}

const Table = ({posts, rowCount, current, last}: ITableComponent) => {
  const { sortType, sortDirection, searchText } = useSelector(
    (store) => store.app
  );

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
