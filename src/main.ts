import './style.css'
import { TetrisBoard } from './TetrisBoard'
import { Tetromino } from './Tetromino'
import { TetrominoPositions, TetrominoShapes } from './types'
import { shuffleItems } from './utils'

const BOARD_WIDTH = 300
const GRID_SIZE = BOARD_WIDTH / 10
const GRID_COLOR = 'rgba(255, 255, 255, 0.1)'
const BOARD_BACKGROUND_COLOR = '#000000'

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('canvas')
  const canvasContainerElement = document.querySelector(
    '.canvas-container',
  ) as HTMLDivElement
  const tetrisBoard = new TetrisBoard(BOARD_WIDTH, canvas!, GRID_COLOR)
  const initialPosition = { x: GRID_SIZE * 4, y: 0 }
  const currentPosition: TetrominoPositions = 1
  const tetrominoShapes = [
    TetrominoShapes.T,
    TetrominoShapes.J,
    TetrominoShapes.O,
    TetrominoShapes.L,
    TetrominoShapes.S,
    TetrominoShapes.Z,
    TetrominoShapes.I,
  ]
  let shuffledShapes = shuffleItems(tetrominoShapes)
  let start: number = 0

  function getNextTetrominoShape() {
    if (shuffledShapes.length === 0) {
      shuffledShapes = shuffleItems(tetrominoShapes)
    }
    return shuffledShapes.pop()
  }

  // set board backgroundColor
  canvasContainerElement.style.backgroundColor = BOARD_BACKGROUND_COLOR

  // Paint tetris board
  tetrisBoard.draw()

  let currentTetromino = new Tetromino({
    canvas,
    coord: initialPosition,
    shape: getNextTetrominoShape(),
    position: currentPosition,
    tetrisBoard,
  })

  // Function to handle keydown events
  function handleKeydown(e: KeyboardEvent) {
    const events: { [key: string]: () => void } = {
      ArrowRight: () => currentTetromino.moveRight(),
      ArrowLeft: () => currentTetromino.moveLeft(),
      ArrowDown: () => currentTetromino.moveDown(),
      Space: () => currentTetromino.rotate(),
    }

    if (e.code in events) {
      events[e.code]()
    }
  }

  // Add event listener for keydown events
  document.addEventListener('keydown', handleKeydown)

  function update(timestamp: number) {
    if (start === 0) {
      start = timestamp
    }

    const timeElapsed = timestamp - start

    if (timeElapsed >= 1500) {
      currentTetromino.moveDown()
      start = 0
    }

    if (currentTetromino.bricksTaken.length !== 0) {
      tetrisBoard.gridsTaken = [
        ...tetrisBoard.gridsTaken,
        ...currentTetromino.bricksTaken,
      ]
    }

    if (currentTetromino.isFreezed) {
      // Start another tetromino once it hits the floor
      currentTetromino = new Tetromino({
        canvas,
        coord: initialPosition,
        shape: getNextTetrominoShape(),
        position: currentPosition,
        tetrisBoard,
      })
    }

    currentTetromino.undraw()
    currentTetromino.draw()
    tetrisBoard.watch()

    requestAnimationFrame(update)
  }

  requestAnimationFrame(update)
})
