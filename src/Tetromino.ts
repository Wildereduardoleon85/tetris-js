import {
  ColorPalette,
  Coordinates,
  TetrominoParams,
  TetrominoPositions,
  TetrominoShapes,
} from './types'

type CoordinatesByPosition = { [K in TetrominoPositions]: Coordinates[] }

type PositionCoordinatesByShape = {
  [K in TetrominoShapes]: CoordinatesByPosition
}

export class Tetromino {
  private ctx: CanvasRenderingContext2D | null
  private shape
  private position
  private positionCoordinatesByShape: PositionCoordinatesByShape
  private _isFreezed
  private _bricksTaken: Coordinates[]
  private gridSize
  private gridColor
  private occupiedGrids
  private colorPalletes: { [K in TetrominoShapes]: ColorPalette } = {
    L: {
      main: '#E734BA',
      lighter: '#fad6f1',
      darker: '#450f37',
      shadow: '#b82994',
    },
    T: {
      main: '#fae121',
      lighter: '#fef9d2',
      darker: '#4b4309',
      shadow: '#c8b41a',
    },
    O: {
      main: '#64a8e1',
      lighter: '#c1dcf3',
      darker: '#28435a',
      shadow: '#5086b4',
    },
    J: {
      main: '#e94f37',
      lighter: '#fadbd7',
      darker: '#451710',
      shadow: '#ba3f2c',
    },
    I: {
      main: '#44bba4',
      lighter: '#d9f1ec',
      darker: '#143831',
      shadow: '#369583',
    },
    S: {
      main: '#fa7921',
      lighter: '#fee4d2',
      darker: '#4b2409',
      shadow: '#c8601a',
    },
    Z: {
      main: '#3943b7',
      lighter: '#d7d9f0',
      darker: '#111436',
      shadow: '#2d3592',
    },
  }

  constructor({
    canvas,
    coord,
    shape,
    position,
    tetrisBoard,
  }: TetrominoParams) {
    this.ctx = canvas!.getContext('2d')
    this.shape = shape
    this.position = position ?? 1
    this._isFreezed = false
    this._bricksTaken = []
    this.gridSize = tetrisBoard.gridSize
    this.gridColor = tetrisBoard.gridColor
    this.occupiedGrids = tetrisBoard.gridsTaken

    const sOddPositionCoordinates = [
      coord,
      { x: coord.x + this.gridSize, y: coord.y },
      { x: coord.x, y: coord.y + this.gridSize },
      {
        x: coord.x - this.gridSize,
        y: coord.y + this.gridSize,
      },
    ]

    const sEvenPositionCoordinates = [
      { x: coord.x - this.gridSize, y: coord.y },
      {
        x: coord.x - this.gridSize,
        y: coord.y + this.gridSize,
      },
      { x: coord.x, y: coord.y + this.gridSize },
      { x: coord.x, y: coord.y + this.gridSize * 2 },
    ]

    const zOddPositionCoordinates = [
      { x: coord.x - this.gridSize, y: coord.y },
      coord,
      { x: coord.x, y: coord.y + this.gridSize },
      {
        x: coord.x + this.gridSize,
        y: coord.y + this.gridSize,
      },
    ]

    const zEvenPositionCoordinates = [
      coord,
      { x: coord.x, y: coord.y + this.gridSize },
      {
        x: coord.x - this.gridSize,
        y: coord.y + this.gridSize,
      },
      {
        x: coord.x - this.gridSize,
        y: coord.y + this.gridSize * 2,
      },
    ]

    const oPositionCoordinates = [
      { x: coord.x - this.gridSize, y: coord.y },
      coord,
      { x: coord.x, y: coord.y + this.gridSize },
      {
        x: coord.x - this.gridSize,
        y: coord.y + this.gridSize,
      },
    ]

    const iOddPositionCoordinates = [
      coord,
      { x: coord.x, y: coord.y + this.gridSize },
      { x: coord.x, y: coord.y + this.gridSize * 2 },
      { x: coord.x, y: coord.y + this.gridSize * 3 },
    ]

    const iEvenPositionCoordinates = [
      {
        x: coord.x - this.gridSize,
        y: coord.y + this.gridSize,
      },
      { x: coord.x, y: coord.y + this.gridSize },
      {
        x: coord.x + this.gridSize,
        y: coord.y + this.gridSize,
      },
      {
        x: coord.x + this.gridSize * 2,
        y: coord.y + this.gridSize,
      },
    ]

    this.positionCoordinatesByShape = {
      J: {
        1: [
          coord,
          { x: coord.x, y: coord.y + this.gridSize },
          { x: coord.x, y: coord.y + 2 * this.gridSize },
          {
            x: coord.x - this.gridSize,
            y: coord.y + 2 * this.gridSize,
          },
        ],
        2: [
          { x: coord.x - this.gridSize, y: coord.y },
          {
            x: coord.x - this.gridSize,
            y: coord.y + this.gridSize,
          },
          { x: coord.x, y: coord.y + this.gridSize },
          {
            x: coord.x + this.gridSize,
            y: coord.y + this.gridSize,
          },
        ],
        3: [
          coord,
          { x: coord.x + this.gridSize, y: coord.y },
          { x: coord.x, y: coord.y + this.gridSize },
          { x: coord.x, y: coord.y + this.gridSize * 2 },
        ],
        4: [
          {
            x: coord.x - this.gridSize,
            y: coord.y + this.gridSize,
          },
          { x: coord.x, y: coord.y + this.gridSize },
          {
            x: coord.x + this.gridSize,
            y: coord.y + this.gridSize,
          },
          {
            x: coord.x + this.gridSize,
            y: coord.y + this.gridSize * 2,
          },
        ],
      },
      L: {
        1: [
          coord,
          { x: coord.x, y: coord.y + this.gridSize },
          { x: coord.x, y: coord.y + 2 * this.gridSize },
          {
            x: coord.x + this.gridSize,
            y: coord.y + 2 * this.gridSize,
          },
        ],
        2: [
          { x: coord.x, y: coord.y + this.gridSize },
          {
            x: coord.x + this.gridSize,
            y: coord.y + this.gridSize,
          },
          {
            x: coord.x - this.gridSize,
            y: coord.y + this.gridSize,
          },
          {
            x: coord.x - this.gridSize,
            y: coord.y + this.gridSize * 2,
          },
        ],
        3: [
          coord,
          { x: coord.x - this.gridSize, y: coord.y },
          { x: coord.x, y: coord.y + this.gridSize },
          { x: coord.x, y: coord.y + this.gridSize * 2 },
        ],
        4: [
          { x: coord.x, y: coord.y + this.gridSize },
          {
            x: coord.x + this.gridSize,
            y: coord.y + this.gridSize,
          },
          { x: coord.x + this.gridSize, y: coord.y },
          {
            x: coord.x - this.gridSize,
            y: coord.y + this.gridSize,
          },
        ],
      },
      S: {
        1: sOddPositionCoordinates,
        2: sEvenPositionCoordinates,
        3: sOddPositionCoordinates,
        4: sEvenPositionCoordinates,
      },
      Z: {
        1: zOddPositionCoordinates,
        2: zEvenPositionCoordinates,
        3: zOddPositionCoordinates,
        4: zEvenPositionCoordinates,
      },
      T: {
        1: [
          coord,
          { x: coord.x, y: coord.y + this.gridSize },
          {
            x: coord.x - this.gridSize,
            y: coord.y + this.gridSize,
          },
          {
            x: coord.x + this.gridSize,
            y: coord.y + this.gridSize,
          },
        ],
        2: [
          coord,
          { x: coord.x, y: coord.y + this.gridSize },
          { x: coord.x, y: coord.y + this.gridSize * 2 },
          {
            x: coord.x + this.gridSize,
            y: coord.y + this.gridSize,
          },
        ],
        3: [
          { x: coord.x - this.gridSize, y: coord.y + this.gridSize },
          { x: coord.x, y: coord.y + this.gridSize },
          { x: coord.x + this.gridSize, y: coord.y + this.gridSize },
          { x: coord.x, y: coord.y + this.gridSize * 2 },
        ],
        4: [
          coord,
          { x: coord.x, y: coord.y + this.gridSize },
          { x: coord.x, y: coord.y + this.gridSize * 2 },
          {
            x: coord.x - this.gridSize,
            y: coord.y + this.gridSize,
          },
        ],
      },
      O: {
        1: oPositionCoordinates,
        2: oPositionCoordinates,
        3: oPositionCoordinates,
        4: oPositionCoordinates,
      },
      I: {
        1: iOddPositionCoordinates,
        2: iEvenPositionCoordinates,
        3: iOddPositionCoordinates,
        4: iEvenPositionCoordinates,
      },
    }
  }

  private drawBrick(coord: Coordinates, colorPallete: ColorPalette) {
    // Draw the main brick
    this.ctx!.fillStyle = colorPallete.main
    this.ctx!.fillRect(coord.x, coord.y, this.gridSize, this.gridSize)

    // Create the inner shadow effect
    const shadowInset = 4 // How much smaller the shadow rectangle is
    this.ctx!.fillStyle = colorPallete.shadow
    this.ctx!.fillRect(
      coord.x + shadowInset,
      coord.y + shadowInset,
      this.gridSize - 2 * shadowInset,
      this.gridSize - 2 * shadowInset,
    )

    // Draw a small square in the middle of the brick
    const squareSize = this.gridSize / 3 // Size of the small square (1/3 of the brick size)
    const squareX = coord.x + (this.gridSize - squareSize) / 2
    const squareY = coord.y + (this.gridSize - squareSize) / 2
    this.ctx!.fillStyle = colorPallete.main
    this.ctx!.fillRect(squareX, squareY, squareSize, squareSize)

    // Draw the black border
    this.ctx!.strokeStyle = '#000000' // Black color for the border
    this.ctx!.lineWidth = 2 // Thickness of the border
    this.ctx!.strokeRect(coord.x, coord.y, this.gridSize, this.gridSize)

    // Draw the thin light line on the upper and left sides
    const lightColor = colorPallete.lighter // Almost white color for the light effect
    const lightLineHeight = 2 // Thickness of the light line
    this.ctx!.fillStyle = lightColor
    this.ctx!.fillRect(coord.x, coord.y, this.gridSize, lightLineHeight) // Top edge line
    this.ctx!.fillRect(coord.x, coord.y, lightLineHeight, this.gridSize) // Left edge line

    // Draw the thin dark line on the right and bottom sides
    const darkColor = colorPallete.darker // Darker color for the shadow effect
    const darkLineHeight = 2 // Thickness of the dark line
    this.ctx!.fillStyle = darkColor
    this.ctx!.fillRect(
      coord.x + this.gridSize - darkLineHeight,
      coord.y,
      darkLineHeight,
      this.gridSize,
    ) // Right edge line
    this.ctx!.fillRect(
      coord.x,
      coord.y + this.gridSize - darkLineHeight,
      this.gridSize,
      darkLineHeight,
    ) // Bottom edge line
  }

  draw() {
    this.positionCoordinatesByShape[this.shape][this.position].forEach(
      (coord) => {
        this.drawBrick(coord, this.colorPalletes[this.shape])
      },
    )
  }

  undraw() {
    this.ctx!.strokeStyle = this.gridColor
    this.ctx!.lineWidth = 1

    this.positionCoordinatesByShape[this.shape][this.position].forEach(
      (coord) => {
        this.ctx!.clearRect(coord.x, coord.y, this.gridSize, this.gridSize)
        this.ctx!.strokeRect(coord.x, coord.y, this.gridSize, this.gridSize)
      },
    )
  }

  moveRight() {
    // Detect collision to right wall
    const itCollidedWithTheWall = this.positionCoordinatesByShape[this.shape][
      this.position
    ].some((coord) => coord.x >= this.gridSize * 10 - this.gridSize)

    // Detect collision with another brick
    const itCollidedWithAnotherBrick = this.positionCoordinatesByShape[
      this.shape
    ][this.position].some((currentCoord) =>
      this.occupiedGrids.some(
        (occupiedBrick) =>
          occupiedBrick.x === currentCoord.x + this.gridSize &&
          occupiedBrick.y === currentCoord.y,
      ),
    )

    if (itCollidedWithTheWall || itCollidedWithAnotherBrick) return

    this.undraw()

    const coordsByShape: PositionCoordinatesByShape =
      this.positionCoordinatesByShape

    // Move all shapes in all positions to the right
    Object.keys(coordsByShape).forEach((shape) => {
      const tetrominoShape = shape as TetrominoShapes
      Object.keys(coordsByShape[tetrominoShape]).forEach((position) => {
        coordsByShape[shape as TetrominoShapes][
          position as unknown as TetrominoPositions
        ] = coordsByShape[shape as TetrominoShapes][
          position as unknown as TetrominoPositions
        ].map((coord) => ({
          ...coord,
          x: coord.x + this.gridSize,
        }))
      })
    })

    this.draw()
  }

  moveLeft() {
    // Detect collision to right wall
    const itCollidedWithTheWall = this.positionCoordinatesByShape[this.shape][
      this.position
    ].some((coord) => coord.x <= 0)

    // Detect collision with another brick
    const itCollidedWithAnotherBrick = this.positionCoordinatesByShape[
      this.shape
    ][this.position].some((currentCoord) =>
      this.occupiedGrids.some(
        (occupiedBrick) =>
          occupiedBrick.x === currentCoord.x - this.gridSize &&
          occupiedBrick.y === currentCoord.y,
      ),
    )

    if (itCollidedWithTheWall || itCollidedWithAnotherBrick) return

    this.undraw()

    const coordsByShape: PositionCoordinatesByShape =
      this.positionCoordinatesByShape

    // Move all shapes in all positions to the left
    Object.keys(coordsByShape).forEach((shape) => {
      const tetrominoShape = shape as TetrominoShapes
      Object.keys(coordsByShape[tetrominoShape]).forEach((position) => {
        coordsByShape[shape as TetrominoShapes][
          position as unknown as TetrominoPositions
        ] = coordsByShape[shape as TetrominoShapes][
          position as unknown as TetrominoPositions
        ].map((coord) => ({
          ...coord,
          x: coord.x - this.gridSize,
        }))
      })
    })

    this.draw()
  }

  moveDown() {
    const itCollidedWithTheFloor = this.positionCoordinatesByShape[this.shape][
      this.position
    ].some((coord) => coord.y >= this.gridSize * 20 - this.gridSize)

    const itCollidedWithAnotherBrick = this.positionCoordinatesByShape[
      this.shape
    ][this.position].some((currentCoord) =>
      this.occupiedGrids.some(
        (occupiedBrick) =>
          occupiedBrick.x === currentCoord.x &&
          occupiedBrick.y === currentCoord.y + this.gridSize,
      ),
    )

    if (itCollidedWithTheFloor || itCollidedWithAnotherBrick) {
      this._isFreezed = true
      this._bricksTaken = [
        ...this._bricksTaken,
        ...this.positionCoordinatesByShape[this.shape][this.position],
      ]
      return
    }

    this.undraw()

    const coordsByShape: PositionCoordinatesByShape =
      this.positionCoordinatesByShape

    // Move all shapes in all positions down
    Object.keys(coordsByShape).forEach((shape) => {
      const tetrominoShape = shape as TetrominoShapes
      Object.keys(coordsByShape[tetrominoShape]).forEach((position) => {
        coordsByShape[shape as TetrominoShapes][
          position as unknown as TetrominoPositions
        ] = coordsByShape[shape as TetrominoShapes][
          position as unknown as TetrominoPositions
        ].map((coord) => ({
          ...coord,
          y: coord.y + this.gridSize,
        }))
      })
    })

    this.draw()
  }

  private changePosition() {
    if (this.position === 4) {
      this.position = 1
    } else {
      this.position = (this.position + 1) as TetrominoPositions
    }
  }

  rotate() {
    this.undraw()
    this.changePosition()
    this.draw()
  }

  get isFreezed() {
    return this._isFreezed
  }

  get bricksTaken() {
    return this._bricksTaken
  }
}
