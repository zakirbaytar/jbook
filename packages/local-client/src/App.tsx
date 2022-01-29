import { Provider } from "react-redux";
import { store } from "./state";

import CellList from "./components/cell-list";

function App() {
  return (
    <Provider store={store}>
      <CellList />
    </Provider>
  );
}

export default App;
