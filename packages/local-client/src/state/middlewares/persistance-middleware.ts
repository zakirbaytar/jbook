import { Dispatch } from "redux";
import { RootState } from "..";
import { saveCells } from "../action-creators";
import { ActionType } from "../action-types";
import { Action } from "../actions";

interface Store {
  dispatch: Dispatch<Action>;
  getState: () => RootState;
}

type Next = (action: Action) => void;

export const persistanceMiddleware = ({ dispatch, getState }: Store) => {
  let timer: NodeJS.Timeout;

  return (next: Next) => {
    return (action: Action) => {
      next(action);

      if (
        [
          ActionType.MoveCell,
          ActionType.InsertCellAfter,
          ActionType.UpdateCell,
          ActionType.DeleteCell,
        ].includes(action.type)
      ) {
        if (timer) {
          clearTimeout(timer);
        }

        timer = setTimeout(() => {
          saveCells()(dispatch, getState);
        }, 750);
      }
    };
  };
};
