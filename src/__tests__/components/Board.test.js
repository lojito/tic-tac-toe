import Board from '../../components/Board/Board';
import * as constants from '../../Constants';

const { COMPUTER, USER, EASY, HARD, NORMAL, TOTAL_SQUARES } = constants;

let board;

beforeEach(() => {
  board = new Board();
});

test("should create an empty board", () => {
  expect(board.isEmpty).toBeTruthy();
})

test("should create an board of 9 squares", () => {
  expect(board.players.length).toBe(TOTAL_SQUARES);
})

test("should set level to easy", () => {
  expect(board.level).toBe(EASY);
})

test("should set level to hard", () => {
  board.level = HARD;
  expect(board.level).toBe(HARD);
})

test("should set level to normal", () => {
  board.level = NORMAL;
  expect(board.level).toBe(NORMAL);
})

test("should set the starting player to be the user", () => {
  expect(board.first).toBe(USER);  
})

test("should set the starting player to be the computer", () => {
  board.first = COMPUTER;
  expect(board.first).toBe(COMPUTER);  
})

test("should set the number of moves to 0", () => {
  expect(board.moves).toBe(0);
})

test("should not have any empty square", () => {
  board.place(USER, 0);
  board.place(COMPUTER, 1);
  board.place(USER, 2);
  board.place(COMPUTER, 3);
  board.place(USER, 4);
  board.place(COMPUTER, 5);
  board.place(USER, 6);
  board.place(COMPUTER, 7);
  board.place(USER, 8);
  expect(board.isFull).toBeTruthy();
})

test("should have some empty squares", () => {
  board.place(USER, 0);
  board.place(USER, 4);  
  board.place(USER, 8);
  const result = board.emptySquares;
  expect(result).toEqual([1, 2, 3, 5, 6, 7]);
})

test("should reset the board", () => {
  board.place(USER, 0);
  board.place(USER, 4);  
  board.place(USER, 8);
  board.reset();
  expect(board.isEmpty).toBeTruthy();
})

test("should place player on a square", () => {
  board.place(USER, 5);
  expect(board.players[5]).toBe(USER);
})

test("shoud expect the user to be about to win the game", () => {
  board.place(USER, 0);
  board.place(COMPUTER, 1);
  board.place(USER, 4);
  board.place(COMPUTER, 3);
  expect(board.isAboutToWin(USER)).toBeTruthy();
})

test("should expect the user to be the winner", () => {
  board.place(USER, 0);
  board.place(COMPUTER, 1);
  board.place(USER, 4);
  board.place(COMPUTER, 3);
  board.place(USER, 8);
  expect(board.isAWinner(USER)).toBeTruthy();
})

test("should expect the game to be a tie", () => {
  board.place(COMPUTER, 0);
  board.place(USER, 1);
  board.place(COMPUTER, 2);
  board.place(USER, 3);
  board.place(COMPUTER, 4);
  board.place(USER, 5);
  board.place(USER, 6);
  board.place(COMPUTER, 7);
  board.place(USER, 8);
  expect(board.isFull).toBeTruthy();
  expect(board.isAWinner(USER)).toBeFalsy();
  expect(board.isAWinner(COMPUTER)).toBeFalsy();
})