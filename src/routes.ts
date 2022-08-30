import { Express, Request, Response } from 'express';
import { getNewBoard, updateBoard, validateBoard, validateInput, validateMove } from './board';
import { EMPTY_SPACE } from './types';

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
  try{
    const input = request.body;
    validateInput(input);
    const { board, value, coordinates } = input;
    validateBoard(board);
    validateMove(board, value, coordinates)
    const updatedBoard = updateBoard(board, value, coordinates);
    return response.status(200).json(updatedBoard);
  } catch (error) {
    return response.status(400).json({
      error: error.message,
    });
  }
}

const eraseTile = (request: Request, response: Response) => {
  try{
    const input = request.body;

    // don't expect the value input from the request when erasing
    validateInput({ ...input, value: EMPTY_SPACE });
    const { board, coordinates } = input;
    validateBoard(board);
    validateMove(board, EMPTY_SPACE, coordinates)
    const updatedBoard = updateBoard(board, EMPTY_SPACE, coordinates);
    return response.status(200).json(updatedBoard);
  } catch (error) {
    return response.status(400).json({
      error: error.message,
    });
  }
}
