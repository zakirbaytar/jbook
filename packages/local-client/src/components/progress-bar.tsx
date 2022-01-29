import React from "react";
import { classnames } from "../utils";

import "./progress-bar.css";

interface ProgressBarProps {
  wrapperClassName?: string;
  className?: string;
  color?: "primary";
  size?: "small" | "medium" | "large";
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  wrapperClassName = "",
  className = "",
  color = "primary",
  size = "small",
}) => {
  return (
    <section className={wrapperClassName}>
      <progress
        className={classnames("progress", className, {
          [`progress--${size}`]: size,
          [`progress--${color}`]: color,
        })}
        max="100"
      >
        Loading
      </progress>
    </section>
  );
};

export default ProgressBar;
