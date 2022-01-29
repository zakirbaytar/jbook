import { useSelector } from "./useSelector";
import { render, renderNoOp } from "../components/internal-functions";

export const useCumulativeCode = (cellId: string) => {
  return useSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);

    const cumulativeCode = [];
    for (const cell of orderedCells) {
      if (cell.type === "code") {
        if (cell.id === cellId) {
          cumulativeCode.push(render);
        } else {
          cumulativeCode.push(renderNoOp);
        }
        cumulativeCode.push(cell.content);
      }
      if (cell.id === cellId) {
        break;
      }
    }

    return cumulativeCode;
  }).join("\n");
};
