import { Express, Request, Response } from 'express';
import { getNewBoard, updateBoard, validateBoard, validateInput, validateMove } from './board';
import { EMPTY_SPACE, GRID_SIZE } from './types';

export const initRoutes = (app: Express) => {
  app.get('/newgame', getSudokuBoard);
  app.post('/update', updateTile);
  app.post('/erase', eraseTile);
}

const getSudokuBoard = (_request: Request, response: Response) => {
  const board = getNewBoard();
  return response.status(200).json(board);
}

const updateTile = (request: Request, response: Response) => {
  const input = request.body;
  if(!validateInput(input)) {
    return response.status(400).json({
      error: 'Input did not match the expected shape'
    });
  }
  const { board, value, coordinates } = input;
  if (!validateBoard(board)) {
    return response.status(400).json({
      error: `Board is not a valid ${GRID_SIZE} x ${GRID_SIZE} grid`
    });
  }
  const { valid, message } = validateMove(board, value, coordinates);
  if (!valid) {
    return response.status(400).json({
      error: message,
    });
  }
  const updatedBoard = updateBoard(board, value, coordinates);
  return response.status(200).json(updatedBoard);
}

const eraseTile = (request: Request, response: Response) => {
  const input = request.body;
  if (!validateInput(input)) {
    return response.status(400).json({
      error: 'Input did not match the expected shape, value must be a number, board must be a nested ${GRID_SIZE} x ${GRID_SIZE} array and coordinates must be an array of length 2'
    });
  }
  const { board, coordinates } = input;
  if (!validateBoard(board)) {
    return response.status(400).json({
      error: `Board is not a valid ${GRID_SIZE} x ${GRID_SIZE} grid`
    });
  }
  const { valid, message } = validateMove(board, EMPTY_SPACE, coordinates);
  if (!valid) {
    return response.status(400).json({
      error: message,
    });
  }
  const updatedBoard = updateBoard(board, EMPTY_SPACE, coordinates);
  return response.status(200).json(updatedBoard);
}
