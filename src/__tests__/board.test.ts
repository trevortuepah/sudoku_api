import { validateMove } from "../board";
import { EMPTY_SPACE } from "../types";

const testBoard = [
  [0,7,0,0,0,0,0,4,3],
  [0,4,0,0,0,9,6,1,0],
  [8,0,0,6,3,4,9,0,0],
  [0,9,4,0,5,2,0,0,0],
  [3,5,8,4,6,0,0,2,0],
  [0,0,0,8,0,0,5,3,0],
  [0,8,0,0,7,0,0,9,1],
  [9,0,2,1,0,0,0,0,5],
  [0,0,7,0,4,0,8,0,2],
]

describe('validateMove', () => {
  describe('returns invalid', () => {
    test('if you try to play in a filled spot', () => {
      const validate = validateMove(testBoard, 2, [0,1]);
      expect(validate.valid).toBe(false);
    });
    test('if you try to play a value in a row that already contains that value', () => {
      const validate = validateMove(testBoard, 7, [0,0]);
      expect(validate.valid).toEqual(false);
      expect(validate.message).toEqual('This value already exists in this row');
    });
    test('if you try to play a value in a column that already contains that value', () => {
      const validate = validateMove(testBoard, 3, [8,0]);
      expect(validate.valid).toEqual(false);
      expect(validate.message).toEqual('This value already exists in this column');
    });
    test('if you try to play a value in a column that already contains that value', () => {
      const validate = validateMove(testBoard, 3, [8,0]);
      expect(validate.valid).toEqual(false);
      expect(validate.message).toEqual('This value already exists in this column');
    });
    test('if you try to play a value in a 3x3 box that already contains that value', () => {
      const validate = validateMove(testBoard, 7, [1,0]);
      expect(validate.valid).toEqual(false);
      expect(validate.message).toEqual('This value already exists in this box');
    });
  });
  describe('returns valid', () => {
    test('if you place a number in a box without a matching number in that row, column or 3x3 square', () => {
      const validate = validateMove(testBoard, 3, [1, 2]);
      expect(validate.valid).toEqual(true);
    });
    test('if you try to erase a space that has a value', () => {
      const validate = validateMove(testBoard, EMPTY_SPACE, [0,1]);
      expect(validate.valid).toEqual(true);
    })
  });
})


/* Additional test cases to cover:
validateInput: I think it's important to be able to make sure that the incoming input is properly formatted and of the right type, otherwise there could be errors accessing and updating the values in the board
updateTile: since this function is also used when erasing want to make sure we get expected responses from the API and get a properly updated board back so the player doesn't experience strange behaviour, such as 
            updating a tile and getting the wrong board back. This function is also used by eraseTile so it needs to be well tested
checkWin: Would be frustrating for a user to finish their game and not be properly alerted that it is a winning board
*/