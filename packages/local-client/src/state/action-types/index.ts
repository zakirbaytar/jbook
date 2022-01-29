export enum ActionType {
  MoveCell = "move_cell",
  InsertCellAfter = "insert_cell_after",
  UpdateCell = "update_cell",
  DeleteCell = "delete_cell",
  BundleStart = "bundle_start",
  BundleComplete = "bundle_complete",
  FetchCells = "fetch_cells",
  FetchCellsComplete = "fetch_cells_complete",
  FetchCellsError = "fetch_cells_error",
  SaveCellsError = "save_cells_error",
}
