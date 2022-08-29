export type SudokuBoard = number[][];
export type MoveInputs = {
  board: SudokuBoard,
  value: number,
  coordinates: number[]
}
export const EMPTY_SPACE = 0;
export const GRID_SIZE = 9;