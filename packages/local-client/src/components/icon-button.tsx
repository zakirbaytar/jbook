import React from "react";
import { ArrowUp, ArrowDown, Close } from "./icons";

import "./icon-button.css";

type Icon = "arrow-down" | "arrow-up" | "close";

const IconSVG: { [key in Icon]: () => JSX.Element } = {
  "arrow-up": ArrowUp,
  "arrow-down": ArrowDown,
  close: Close,
};

interface IconButtonProps {
  icon: Icon;
  onClick: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, onClick }) => {
  const IconElement = IconSVG[icon];
  return (
    <button className="btn btn--primary icon-button" onClick={onClick}>
      <IconElement />
    </button>
  );
};

export default IconButton;
