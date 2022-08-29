import { validateMove } from "../board";

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
    test('if you try to erase a space that already exists', () => {
      
    })
  });
})


/* Additional test cases to cover:



*/