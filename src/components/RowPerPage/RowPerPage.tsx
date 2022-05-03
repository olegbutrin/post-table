import { SyntheticEvent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { setRowsCount } from "../../services/actions/app.actions";
import { useDispatch } from "../../services/hooks";

import "./RowPerPage.scss";

const rowsOpts = [5, 10, 20, 50, 100];

interface IRowPerPageComponent {
  rowCount: number;
}

const RowPerPage = ({ rowCount }: IRowPerPageComponent) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRowPerPage = useCallback(
    (e: SyntheticEvent) => {
      e.stopPropagation();
      const item = e.target as HTMLSelectElement;
      dispatch(setRowsCount(Number(item.value)));
      navigate("/1");
    },
    [dispatch, navigate]
  );

  return (
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
  );
};

export default RowPerPage;
