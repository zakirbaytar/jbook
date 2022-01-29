import { ActionType } from "../action-types";
import { Cell, CellType } from "../cell";

export type Direction = "up" | "down";

export interface MoveCellAction {
  type: ActionType.MoveCell;
  payload: {
    id: string;
    direction: Direction;
  };
}

export interface InsertCellAfterAction {
  type: ActionType.InsertCellAfter;
  payload: { id?: string; type: CellType };
}

export interface UpdateCellAction {
  type: ActionType.UpdateCell;
  payload: { id: string; content: string };
}

export interface DeleteCellAction {
  type: ActionType.DeleteCell;
  payload: {
    id: string;
  };
}

export interface BundleStartAction {
  type: ActionType.BundleStart;
  payload: {
    cellId: string;
  };
}

export interface BundleCompleteAction {
  type: ActionType.BundleComplete;
  payload: {
    cellId: string;
    bundle: {
      code: string;
      error?: string;
    };
  };
}

export interface FetchCellsAction {
  type: ActionType.FetchCells;
}

export interface FetchCellsCompleteAction {
  type: ActionType.FetchCellsComplete;
  payload: {
    cells: Cell[];
  };
}

export interface FetchCellsErrorAction {
  type: ActionType.FetchCellsError;
  payload: {
    error: string;
  };
}

export interface SaveCellsErrorAction {
  type: ActionType.SaveCellsError;
  payload: {
    error: string;
  };
}

export type Action =
  | MoveCellAction
  | InsertCellAfterAction
  | UpdateCellAction
  | DeleteCellAction
  | BundleStartAction
  | BundleCompleteAction
  | FetchCellsAction
  | FetchCellsCompleteAction
  | FetchCellsErrorAction
  | SaveCellsErrorAction;
