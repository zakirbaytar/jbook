import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from "..";
import { ActionType } from "../action-types";
import {
  MoveCellAction,
  InsertCellAfterAction,
  UpdateCellAction,
  DeleteCellAction,
  Direction,
  Action,
} from "../actions";
import { CellType } from "../cell";

interface InsertCellAfterPayload {
  id?: string;
  type: CellType;
}

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MoveCell,
    payload: { id, direction },
  };
};

export const insertCellAfter = ({
  id,
  type,
}: InsertCellAfterPayload): InsertCellAfterAction => {
  return {
    type: ActionType.InsertCellAfter,
    payload: { id, type },
  };
};

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UpdateCell,
    payload: { id, content },
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DeleteCell,
    payload: { id },
  };
};

export const fetchCells = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.FetchCells });
    try {
      const result = await axios.get("/cells");
      dispatch({
        type: ActionType.FetchCellsComplete,
        payload: { cells: result.data.cells },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch({
          type: ActionType.FetchCellsError,
          payload: { error: error.message },
        });
      }
    }
  };
};

export const saveCells = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    try {
      const {
        cells: { data, order },
      } = getState();

      const cells = order.map((id) => data[id]);

      await axios.post("/cells", { cells });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch({
          type: ActionType.SaveCellsError,
          payload: { error: error.message },
        });
      }
    }
  };
};
