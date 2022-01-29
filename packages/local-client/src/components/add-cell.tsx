import React from "react";
import { useActions } from "../hooks/useActions";

import "./add-cell.css";

interface AddCellProps {
  previousCellId?: string;
}

const AddCell: React.FC<AddCellProps> = ({ previousCellId }) => {
  const { insertCellAfter } = useActions();

  return (
    <section className="add-cell">
      <div className="add-buttons">
        <button
          className="btn btn--primary btn--rounded"
          onClick={() => insertCellAfter({ id: previousCellId, type: "code" })}
        >
          <span>+</span>
          Code
        </button>
        <button
          className="btn btn--primary btn--rounded"
          onClick={() =>
            insertCellAfter({ id: previousCellId, type: "markdown" })
          }
        >
          <span>+</span>
          Text
        </button>{" "}
      </div>
      <div className="divider" />
    </section>
  );
};

export default AddCell;
