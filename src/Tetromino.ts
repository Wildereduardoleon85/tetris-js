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
  private brickSize
  private ctx: CanvasRenderingContext2D | null
  private shape
  private position
  private positionCoordinatesByShape: PositionCoordinatesByShape
  private gridColor
  private coordsTaken: Coordinates[]
  private _isFreezed
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
    brickSize,
    gridColor,
    coord,
    shape,
    position,
  }: TetrominoParams) {
    const sOddPositionCoordinates = [
      coord,
      { x: coord.x + brickSize, y: coord.y },
      { x: coord.x, y: coord.y + brickSize },
      { x: coord.x - brickSize, y: coord.y + brickSize },
    ]

    const sEvenPositionCoordinates = [
      { x: coord.x - brickSize, y: coord.y },
      { x: coord.x - brickSize, y: coord.y + brickSize },
      { x: coord.x, y: coord.y + brickSize },
      { x: coord.x, y: coord.y + brickSize * 2 },
    ]

    const zOddPositionCoordinates = [
      { x: coord.x - brickSize, y: coord.y },
      coord,
      { x: coord.x, y: coord.y + brickSize },
      { x: coord.x + brickSize, y: coord.y + brickSize },
    ]

    const zEvenPositionCoordinates = [
      coord,
      { x: coord.x, y: coord.y + brickSize },
      { x: coord.x - brickSize, y: coord.y + brickSize },
      {
        x: coord.x - brickSize,
        y: coord.y + brickSize * 2,
      },
    ]

    const oPositionCoordinates = [
      { x: coord.x - brickSize, y: coord.y },
      coord,
      { x: coord.x, y: coord.y + brickSize },
      { x: coord.x - brickSize, y: coord.y + brickSize },
    ]

    const iOddPositionCoordinates = [
      coord,
      { x: coord.x, y: coord.y + brickSize },
      { x: coord.x, y: coord.y + brickSize * 2 },
      { x: coord.x, y: coord.y + brickSize * 3 },
    ]

    const iEvenPositionCoordinates = [
      { x: coord.x - brickSize, y: coord.y + brickSize },
      { x: coord.x, y: coord.y + brickSize },
      { x: coord.x + brickSize, y: coord.y + brickSize },
      {
        x: coord.x + brickSize * 2,
        y: coord.y + brickSize,
      },
    ]

    this.ctx = canvas!.getContext('2d')
    this.brickSize = brickSize
    this.gridColor = gridColor
    this.shape = shape
    this.position = position ?? 1
    this.coordsTaken = []
    this._isFreezed = false
    this.positionCoordinatesByShape = {
      J: {
        1: [
          coord,
          { x: coord.x, y: coord.y + brickSize },
          { x: coord.x, y: coord.y + 2 * brickSize },
          {
            x: coord.x - brickSize,
            y: coord.y + 2 * brickSize,
          },
        ],
        2: [
          { x: coord.x - brickSize, y: coord.y },
          {
            x: coord.x - brickSize,
            y: coord.y + brickSize,
          },
          { x: coord.x, y: coord.y + brickSize },
          {
            x: coord.x + brickSize,
            y: coord.y + brickSize,
          },
        ],
        3: [
          coord,
          { x: coord.x + brickSize, y: coord.y },
          { x: coord.x, y: coord.y + brickSize },
          { x: coord.x, y: coord.y + brickSize * 2 },
        ],
        4: [
          {
            x: coord.x - brickSize,
            y: coord.y + brickSize,
          },
          { x: coord.x, y: coord.y + brickSize },
          {
            x: coord.x + brickSize,
            y: coord.y + brickSize,
          },
          {
            x: coord.x + brickSize,
            y: coord.y + brickSize * 2,
          },
        ],
      },
      L: {
        1: [
          coord,
          { x: coord.x, y: coord.y + brickSize },
          { x: coord.x, y: coord.y + 2 * brickSize },
          {
            x: coord.x + brickSize,
            y: coord.y + 2 * brickSize,
          },
        ],
        2: [
          { x: coord.x, y: coord.y + brickSize },
          {
            x: coord.x + brickSize,
            y: coord.y + brickSize,
          },
          {
            x: coord.x - brickSize,
            y: coord.y + brickSize,
          },
          {
            x: coord.x - brickSize,
            y: coord.y + brickSize * 2,
          },
        ],
        3: [
          coord,
          { x: coord.x - brickSize, y: coord.y },
          { x: coord.x, y: coord.y + brickSize },
          { x: coord.x, y: coord.y + brickSize * 2 },
        ],
        4: [
          { x: coord.x, y: coord.y + brickSize },
          {
            x: coord.x + brickSize,
            y: coord.y + brickSize,
          },
          { x: coord.x + brickSize, y: coord.y },
          {
            x: coord.x - brickSize,
            y: coord.y + brickSize,
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
          { x: coord.x, y: coord.y + brickSize },
          {
            x: coord.x - brickSize,
            y: coord.y + brickSize,
          },
          {
            x: coord.x + brickSize,
            y: coord.y + brickSize,
          },
        ],
        2: [
          coord,
          { x: coord.x, y: coord.y + brickSize },
          { x: coord.x, y: coord.y + brickSize * 2 },
          {
            x: coord.x + brickSize,
            y: coord.y + brickSize,
          },
        ],
        3: [
          { x: coord.x - brickSize, y: coord.y + brickSize },
          { x: coord.x, y: coord.y + brickSize },
          { x: coord.x + brickSize, y: coord.y + brickSize },
          { x: coord.x, y: coord.y + brickSize * 2 },
        ],
        4: [
          coord,
          { x: coord.x, y: coord.y + brickSize },
          { x: coord.x, y: coord.y + brickSize * 2 },
          {
            x: coord.x - brickSize,
            y: coord.y + brickSize,
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
    this.ctx!.fillRect(coord.x, coord.y, this.brickSize, this.brickSize)

    // Create the inner shadow effect
    const shadowInset = 4 // How much smaller the shadow rectangle is
    this.ctx!.fillStyle = colorPallete.shadow
    this.ctx!.fillRect(
      coord.x + shadowInset,
      coord.y + shadowInset,
      this.brickSize - 2 * shadowInset,
      this.brickSize - 2 * shadowInset,
    )

    // Draw a small square in the middle of the brick
    const squareSize = this.brickSize / 3 // Size of the small square (1/3 of the brick size)
    const squareX = coord.x + (this.brickSize - squareSize) / 2
    const squareY = coord.y + (this.brickSize - squareSize) / 2
    this.ctx!.fillStyle = colorPallete.main
    this.ctx!.fillRect(squareX, squareY, squareSize, squareSize)

    // Draw the black border
    this.ctx!.strokeStyle = '#000000' // Black color for the border
    this.ctx!.lineWidth = 2 // Thickness of the border
    this.ctx!.strokeRect(coord.x, coord.y, this.brickSize, this.brickSize)

    // Draw the thin light line on the upper and left sides
    const lightColor = colorPallete.lighter // Almost white color for the light effect
    const lightLineHeight = 2 // Thickness of the light line
    this.ctx!.fillStyle = lightColor
    this.ctx!.fillRect(coord.x, coord.y, this.brickSize, lightLineHeight) // Top edge line
    this.ctx!.fillRect(coord.x, coord.y, lightLineHeight, this.brickSize) // Left edge line

    // Draw the thin dark line on the right and bottom sides
    const darkColor = colorPallete.darker // Darker color for the shadow effect
    const darkLineHeight = 2 // Thickness of the dark line
    this.ctx!.fillStyle = darkColor
    this.ctx!.fillRect(
      coord.x + this.brickSize - darkLineHeight,
      coord.y,
      darkLineHeight,
      this.brickSize,
    ) // Right edge line
    this.ctx!.fillRect(
      coord.x,
      coord.y + this.brickSize - darkLineHeight,
      this.brickSize,
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
        this.ctx!.clearRect(coord.x, coord.y, this.brickSize, this.brickSize)
        this.ctx!.strokeRect(coord.x, coord.y, this.brickSize, this.brickSize)
      },
    )
  }

  moveRight() {
    // Detect collision to right wall
    if (
      this.positionCoordinatesByShape[this.shape][this.position].some(
        (coord) => coord.x >= this.brickSize * 10 - this.brickSize,
      )
    )
      return

    this.undraw()

    const coordsByShape: PositionCoordinatesByShape =
      this.positionCoordinatesByShape

    Object.keys(coordsByShape).forEach((shape) => {
      const tetrominoShape = shape as TetrominoShapes
      Object.keys(coordsByShape[tetrominoShape]).forEach((position) => {
        coordsByShape[shape as TetrominoShapes][
          position as unknown as TetrominoPositions
        ] = coordsByShape[shape as TetrominoShapes][
          position as unknown as TetrominoPositions
        ].map((coord) => ({
          ...coord,
          x: coord.x + this.brickSize,
        }))
      })
    })

    this.draw()
  }

  moveLeft() {
    // Detect collision to right wall
    if (
      this.positionCoordinatesByShape[this.shape][this.position].some(
        (coord) => coord.x <= 0,
      )
    )
      return

    this.undraw()

    const coordsByShape: PositionCoordinatesByShape =
      this.positionCoordinatesByShape

    Object.keys(coordsByShape).forEach((shape) => {
      const tetrominoShape = shape as TetrominoShapes
      Object.keys(coordsByShape[tetrominoShape]).forEach((position) => {
        coordsByShape[shape as TetrominoShapes][
          position as unknown as TetrominoPositions
        ] = coordsByShape[shape as TetrominoShapes][
          position as unknown as TetrominoPositions
        ].map((coord) => ({
          ...coord,
          x: coord.x - this.brickSize,
        }))
      })
    })

    this.draw()
  }

  moveDown() {
    const itCollidedWithTheFloor = this.positionCoordinatesByShape[this.shape][
      this.position
    ].some((coord) => coord.y >= this.brickSize * 20 - this.brickSize)

    const itCollidedWithAnotherBrick = this.positionCoordinatesByShape[
      this.shape
    ][this.position].some((currentCoord) =>
      this.coordsTaken.some(
        (coordTaken) =>
          coordTaken.x === currentCoord.x && coordTaken.y === currentCoord.y,
      ),
    )

    if (itCollidedWithTheFloor || itCollidedWithAnotherBrick) {
      this._isFreezed = true
      this.coordsTaken = [
        ...this.coordsTaken,
        ...this.positionCoordinatesByShape[this.shape][this.position],
      ]
      return
    }

    this.undraw()

    const coordsByShape: PositionCoordinatesByShape =
      this.positionCoordinatesByShape

    Object.keys(coordsByShape).forEach((shape) => {
      const tetrominoShape = shape as TetrominoShapes
      Object.keys(coordsByShape[tetrominoShape]).forEach((position) => {
        coordsByShape[shape as TetrominoShapes][
          position as unknown as TetrominoPositions
        ] = coordsByShape[shape as TetrominoShapes][
          position as unknown as TetrominoPositions
        ].map((coord) => ({
          ...coord,
          y: coord.y + 30,
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

  isFreezed() {
    return this._isFreezed
  }
}
