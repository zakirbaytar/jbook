import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { Action } from "../actions";

import { bundle } from "../../bundler";

interface CreateBundleArgs {
  cellId: string;
  input: string;
}

export const createBundle = ({ cellId, input }: CreateBundleArgs) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.BundleStart, payload: { cellId } });
    const result = await bundle(input);
    dispatch({
      type: ActionType.BundleComplete,
      payload: { cellId, bundle: { code: result.code, error: result.error } },
    });
  };
};
