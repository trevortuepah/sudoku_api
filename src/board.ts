import { EMPTY_SPACE, GRID_SIZE, MoveInputs, SudokuBoard  } from "./types";
import * as data from "./data/puzzles.json";

export const getNewBoard = (): SudokuBoard | undefined => {
  if (data.puzzles && data.puzzles.length > 0) {
    //for now just return the first puzzle
    return data.puzzles[0];
  }
}

// Verify that the board is a proper shape for Sudoku
export const validateBoard = (board: SudokuBoard): boolean => {
  //Check to see if the board has correct number of rows
  if (board.length !== GRID_SIZE) {
    throw new Error(`Board does not have ${GRID_SIZE} rows`);
  }
  // Check each row to make sure it has correct number of corresponding columns
  for (let row of board) {
    if (row.length !== GRID_SIZE) {
      throw new Error(`Board does not have ${GRID_SIZE} columns in every row`)
    }
  }
  return true;
}

// Verify that the input received from an API call is the expected type
export const validateInput = (input: any): input is MoveInputs => {
  const { board, value, coordinates } = input;
  if (!board || !coordinates) {
    throw new Error("Not all input parameters are defined")
  }
  const [row, column] = coordinates;
  if (!Number.isInteger(value) || !Number.isInteger(row) || !Number.isInteger(column)) {
    throw new Error("One of row, column or value inputs is not a number")
  }
  if (!Array.isArray(board)) {
    throw new Error("Board is not an array");
  }
  if (!board.every((row) => Array.isArray(row))) {
    throw new Error("A row entry exists that is not an array")
  }
  return true;
}

// Verify that the move fits within sudoku rules
export const validateMove = (board: SudokuBoard, value: number, coordinates: number[]): boolean => {
  const [rowCoordinate, columnCoordinate] = coordinates;

  for (let val of [value, rowCoordinate, columnCoordinate]) {
    if (val < 0 || val > GRID_SIZE - 1) {
      throw new Error(`Coordinates and values provided must be within the range of 0 to ${GRID_SIZE - 1}`);
    }
  }

  // At this point if we are doing an erase on a space, we don't need to verify against other existing numbers in the puzzle for it to be valid
  if (value === EMPTY_SPACE) {
    return true;
  }

  // Make sure we are putting value into an empty spot
  if (board[rowCoordinate][columnCoordinate] !== EMPTY_SPACE) {
    throw new Error("This tile already has a value. Erase it first if you'd like to update it");
  }
  
  // Make sure the row doesn't already contain the new value
  if (board[rowCoordinate].includes(value)) {
    throw new Error("This value already exists in this row");
  }

  // Make sure the column doesn't already contain the new value
  for (let boardRow of board) {
    if(boardRow[columnCoordinate] === value) {
      throw new Error("This value already exists in this column");
    }
  }

  // Make sure the box containing the coordinates doesn't already contain the new value
  const rowBox = Math.floor(rowCoordinate / 3); 
  const colBox = Math.floor(columnCoordinate / 3); 
  for (let r = 0; r < 3; r++ ) {
    const row = rowBox * 3 + r;
    for (let c = 0; c < 3; c++) {
      const col = colBox * 3 + c;
      if (board[row][col] === value) {
        throw new Error("This value already exists in this box");
      }
    }
  }
  return true;
}

// Since we validate every move to make sure column, row and box doesn't contain that value,
// if the board is able to be filled and has no empty spaces, we can deduce this is a win
export const checkWin = (board: SudokuBoard): boolean => {
  for (const row of board) {
    for (const cell of row) {
      if (cell === EMPTY_SPACE) {
        return false;
      }
    }
  }
  return true;
}

// For now simply update the board in place and return the updated board to be sent back to front end
export const updateBoard = (board: SudokuBoard, value: number, coordinates: number[]) => {
  const [row, col] = coordinates;
  board[row][col] = value;
  return board;
}