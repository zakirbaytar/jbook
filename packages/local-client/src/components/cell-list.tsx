import React, { Fragment, useEffect } from "react";
import { useActions } from "../hooks/useActions";
import { useSelector } from "../hooks/useSelector";

import AddCell from "./add-cell";
import CellListItem from "./cell-list-item";

import "./cell-list.css";

interface CellListProps {}

const CellList: React.FC<CellListProps> = () => {
  const { fetchCells } = useActions();

  useEffect(() => {
    fetchCells();
  }, []);

  const cells = useSelector(({ cells: { order, data } }) => {
    return order.map((id) => data[id]);
  });

  return (
    <div className="cell-list">
      <AddCell />
      {cells.map((cell) => (
        <Fragment key={cell.id}>
          <CellListItem cell={cell} />
          <AddCell previousCellId={cell.id} />
        </Fragment>
      ))}
    </div>
  );
};

export default CellList;
