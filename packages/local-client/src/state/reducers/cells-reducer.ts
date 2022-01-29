import produce, { Draft } from "immer";
import { ActionType } from "../action-types";
import {
  Action,
  DeleteCellAction,
  FetchCellsCompleteAction,
  FetchCellsErrorAction,
  InsertCellAfterAction,
  MoveCellAction,
  UpdateCellAction,
} from "../actions";
import { Cell } from "../cell";

interface CellsReducerState {
  data: { [key: string]: Cell };
  loading: boolean;
  error: string | null;
  order: string[];
}

const initialState: CellsReducerState = {
  data: {},
  error: null,
  order: [],
  loading: false,
};

function generateHandlers(state: CellsReducerState) {
  const findOrderIndexById = (id: string) => {
    return state.order.findIndex((cellId) => cellId === id);
  };

  const moveCell = ({ payload: { id, direction } }: MoveCellAction) => {
    const index = findOrderIndexById(id);
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= state.order.length) {
      return state;
    }

    state.order[index] = state.order[targetIndex];
    state.order[targetIndex] = id;
    return state;
  };

  const insertCellAfter = ({
    payload: { id, type },
  }: InsertCellAfterAction) => {
    const cell: Cell = {
      id: randomId(),
      content: "",
      type,
    };

    state.data[cell.id] = cell;

    if (!id) {
      state.order.unshift(cell.id);
    } else {
      const index = findOrderIndexById(id);
      state.order.splice(index + 1, 0, cell.id);
    }

    return state;
  };

  const updateCell = ({ payload: { id, content } }: UpdateCellAction) => {
    state.data[id].content = content;
    return state;
  };

  const deleteCell = ({ payload: { id } }: DeleteCellAction) => {
    delete state.data[id];
    state.order = state.order.filter((cellId) => cellId !== id);
    return state;
  };

  const fetchCells = () => {
    state.loading = true;
    state.error = null;
    return state;
  };

  const fetchCellsComplete = ({
    payload: { cells },
  }: FetchCellsCompleteAction) => {
    state.loading = false;
    state.data = cells.reduce((cells, cell) => {
      cells[cell.id] = cell;
      return cells;
    }, {} as CellsReducerState["data"]);
    state.order = cells.map((cell) => cell.id);
    return state;
  };

  const fetchCellsError = ({ payload: { error } }: FetchCellsErrorAction) => {
    state.loading = false;
    state.error = error;
    return state;
  };

  return {
    moveCell,
    insertCellAfter,
    updateCell,
    deleteCell,
    fetchCells,
    fetchCellsComplete,
    fetchCellsError,
  };
}

const reducer = produce((state: Draft<CellsReducerState>, action: Action) => {
  const handlers = generateHandlers(state);

  switch (action.type) {
    case ActionType.MoveCell:
      return handlers.moveCell(action);
    case ActionType.InsertCellAfter:
      return handlers.insertCellAfter(action);
    case ActionType.UpdateCell:
      return handlers.updateCell(action);
    case ActionType.DeleteCell:
      return handlers.deleteCell(action);
    case ActionType.FetchCells:
      return handlers.fetchCells();
    case ActionType.FetchCellsComplete:
      return handlers.fetchCellsComplete(action);
    case ActionType.FetchCellsError:
      return handlers.fetchCellsError(action);
    default:
      return state;
  }
}, initialState);

const randomId = () => {
  return Math.random().toString(36).substring(0, 5);
};

export default reducer;
