import {
  TypedUseSelectorHook,
  useSelector as useDefaultSelector,
} from "react-redux";
import { RootState } from "../state";

export const useSelector: TypedUseSelectorHook<RootState> = useDefaultSelector;
