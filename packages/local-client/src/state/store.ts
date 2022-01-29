import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { persistanceMiddleware } from "./middlewares/persistance-middleware";

import reducers from "./reducers";

export const store = createStore(
  reducers,
  {},
  applyMiddleware(thunk, persistanceMiddleware)
);
