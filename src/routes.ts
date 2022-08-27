import { Express, NextFunction, Request, Response } from 'express';
import { getNewBoard, updateBoard, validateBoard, validateMove } from './board';
import { EMPTY_SPACE } from './types';

export const initRoutes = (app: Express) => {
  app.get('/newgame', getSudokuBoard);
  app.post('/update', updateTile);
  app.post('/erase', eraseTile);
}

const getSudokuBoard = (request: Request, response: Response, next: NextFunction) => {
  const board = getNewBoard();
  return response.status(200).json(board);
}

const updateTile = (request: Request, response: Response) => {
  const { board, move } = request.body;
  if (!board) {
    return response.status(400).json({
      error: 'Board not found in request body',
    });
  }
  if (!validateBoard(board)) {
    return response.status(400).json({
      error: 'Board is not a valid 9 x 9 grid'
    })
  }
  const [value, coordinates] = move;
  const { valid, message } = validateMove(board, value, coordinates)
  if (!valid) {
    return response.status(400).json({
      error: message,
    });
  }
  const updatedBoard = updateBoard(board, value, coordinates);
  return response.status(200).json(updatedBoard);
}

const eraseTile = (request: Request, response: Response) => {
  const { board, coordinates } = request.body;
  if (!board) {
    return response.status(400).json({
      error: 'Board not found in request body',
    });
  }
  if (!validateBoard(board)) {
    return response.status(400).json({
      error: 'Board is not a valid 9 x 9 grid'
    })
  }
  const { valid, message } = validateMove(board, EMPTY_SPACE, coordinates)
  if (!valid) {
    return response.status(400).json({
      error: message,
    });
  }
  const updatedBoard = updateBoard(board, EMPTY_SPACE, coordinates);
  return response.status(200).json(updatedBoard);
}
