import React from "react";

import ActionBar from "./action-bar";
import CodeCell from "./code-cell";
import MarkdownCell from "./markdown-editor";

import { Cell } from "../state";

import "./cell-list-item.css";

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  const CellItem = cell.type === "markdown" ? MarkdownCell : CodeCell;

  if (cell.type === "markdown") {
    return (
      <section className="cell-list__item">
        <ActionBar id={cell.id} hovering />
        <CellItem {...cell} />
      </section>
    );
  }

  return (
    <section className="cell-list__item">
      <ActionBar id={cell.id} />
      <CellItem {...cell} />
    </section>
  );
};

export default CellListItem;
