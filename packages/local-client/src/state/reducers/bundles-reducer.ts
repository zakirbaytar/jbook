import produce, { Draft } from "immer";
import { ActionType } from "../action-types";
import { Action, BundleStartAction, BundleCompleteAction } from "../actions";

interface BundlesReducerState {
  [key: string]:
    | {
        loading: boolean;
        code: string;
        error?: string;
      }
    | undefined;
}

const initialState: BundlesReducerState = {};

function generateHandlers(state: BundlesReducerState) {
  const bundleStart = ({ payload: { cellId } }: BundleStartAction) => {
    state[cellId] = { loading: true, code: "(() => {\n})();\n" };
    return state;
  };

  const bundleComplete = ({
    payload: { cellId, bundle },
  }: BundleCompleteAction) => {
    state[cellId] = { loading: false, code: bundle.code, error: bundle.error };
    return state;
  };

  return {
    bundleStart,
    bundleComplete,
  };
}

const reducer = produce((state: Draft<BundlesReducerState>, action: Action) => {
  const { bundleStart, bundleComplete } = generateHandlers(state);

  switch (action.type) {
    case ActionType.BundleStart:
      return bundleStart(action);
    case ActionType.BundleComplete:
      return bundleComplete(action);
    default:
      return state;
  }
}, initialState);

export default reducer;
