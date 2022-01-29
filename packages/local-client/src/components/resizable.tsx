import { useState, useEffect } from "react";
import {
  ResizableBox,
  ResizableBoxProps,
  ResizeCallbackData,
} from "react-resizable";
import { debounce } from "../utils";

import "./resizable.css";

type Direction = "horizontal" | "vertical";

interface GetResizableBoxPropsArgs {
  direction: Direction;
  innerWidth: number;
  innerHeight: number;
  width: number;
}

interface ResizableProps {
  direction: Direction;
}

function getInitialWidth(direction: Direction) {
  if (direction === "vertical") {
    return Infinity;
  }

  return window.innerWidth * 0.75;
}

function getResizableBoxProps({
  direction,
  innerWidth,
  innerHeight,
  width,
}: GetResizableBoxPropsArgs): ResizableBoxProps {
  if (direction === "horizontal") {
    return {
      className: "resizable--horizontal",
      width,
      height: Infinity,
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.75, Infinity],
      resizeHandles: ["e"],
    };
  }

  return {
    className: "resizable--vertical",
    width: Infinity,
    height: 300,
    minConstraints: [Infinity, 24],
    maxConstraints: [Infinity, innerHeight * 0.75],
    resizeHandles: ["s"],
  };
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  const [width, setWidth] = useState(getInitialWidth(direction));
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);

  useEffect(() => {
    const resizeHandler = debounce<any>(() => {
      setInnerWidth(window.innerWidth);
      setInnerHeight(window.innerHeight);
    }, 250);

    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  function onResizeStop(
    event: React.SyntheticEvent,
    { size: { width } }: ResizeCallbackData
  ) {
    setWidth(width);
  }

  return (
    <ResizableBox
      onResizeStop={onResizeStop}
      {...getResizableBoxProps({ direction, innerHeight, innerWidth, width })}
    >
      {children}
    </ResizableBox>
  );
};

export default Resizable;
