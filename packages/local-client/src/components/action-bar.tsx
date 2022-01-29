import React from "react";
import IconButton from "./icon-button";

import { useActions } from "../hooks/useActions";

import "./action-bar.css";

interface ActionBarProps {
  id: string;
  hovering?: boolean;
}

const ActionBar: React.FC<ActionBarProps> = ({ id, hovering }) => {
  const { moveCell, deleteCell } = useActions();

  return (
    <header className={hovering ? "action-bar--hovering" : "action-bar"}>
      <IconButton icon="arrow-up" onClick={() => moveCell(id, "up")} />
      <IconButton icon="arrow-down" onClick={() => moveCell(id, "down")} />
      <IconButton icon="close" onClick={() => deleteCell(id)} />
    </header>
  );
};

export default ActionBar;
