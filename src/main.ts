import './style.css'
import { TetrisBoard } from './TetrisBoard'
import { Tetromino } from './Tetromino'
import { TetrominoShapes } from './types'

const BOARD_WIDTH = 300
const GRID_SIZE = BOARD_WIDTH / 10

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('canvas')
  const tetrisBoard = new TetrisBoard(BOARD_WIDTH, canvas!)

  // Pain tetris board
  tetrisBoard.draw()

  const tetromino = new Tetromino(canvas!, GRID_SIZE)

  // Draw a tetromino
  tetromino.draw({ x: GRID_SIZE * 4, y: 0 }, TetrominoShapes.L, 4)

  // Example: Draw an L Tetromino at position (50, 50) with each brick being 40x40 pixels
  // drawLTetromino(GRID_SIZE * 3, GRID_SIZE, GRID_SIZE)
})
