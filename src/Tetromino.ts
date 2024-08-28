import {
  ColorPalette,
  Coordinates,
  TetrominoPositions,
  TetrominoShapes,
} from './types'

export class Tetromino {
  private brickSize
  private ctx: CanvasRenderingContext2D | null
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

  constructor(canvas: HTMLCanvasElement, brickSize: number) {
    this.ctx = canvas.getContext('2d')
    this.brickSize = brickSize
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

  private drawLTetromino(
    coord: Coordinates,
    positions: TetrominoPositions = 1,
  ) {
    switch (positions) {
      case 1:
        this.drawBrick(coord, this.colorPalletes.L)
        this.drawBrick(
          { x: coord.x, y: coord.y + this.brickSize },
          this.colorPalletes.L,
        )
        this.drawBrick(
          { x: coord.x, y: coord.y + 2 * this.brickSize },
          this.colorPalletes.L,
        )
        this.drawBrick(
          { x: coord.x + this.brickSize, y: coord.y + 2 * this.brickSize },
          this.colorPalletes.L,
        )
        break
      case 2:
        this.drawBrick(
          { x: coord.x, y: coord.y + this.brickSize },
          this.colorPalletes.L,
        )
        this.drawBrick(
          { x: coord.x + this.brickSize, y: coord.y + this.brickSize },
          this.colorPalletes.L,
        )
        this.drawBrick(
          { x: coord.x - this.brickSize, y: coord.y + this.brickSize },
          this.colorPalletes.L,
        )
        this.drawBrick(
          { x: coord.x - this.brickSize, y: coord.y + this.brickSize * 2 },
          this.colorPalletes.L,
        )
        break
      case 3:
        this.drawBrick(coord, this.colorPalletes.L)
        this.drawBrick(
          { x: coord.x - this.brickSize, y: coord.y },
          this.colorPalletes.L,
        )
        this.drawBrick(
          { x: coord.x, y: coord.y + this.brickSize },
          this.colorPalletes.L,
        )
        this.drawBrick(
          { x: coord.x, y: coord.y + this.brickSize * 2 },
          this.colorPalletes.L,
        )
        break
      case 4:
        this.drawBrick(
          { x: coord.x, y: coord.y + this.brickSize },
          this.colorPalletes.L,
        )
        this.drawBrick(
          { x: coord.x + this.brickSize, y: coord.y + this.brickSize },
          this.colorPalletes.L,
        )
        this.drawBrick(
          { x: coord.x + this.brickSize, y: coord.y },
          this.colorPalletes.L,
        )
        this.drawBrick(
          { x: coord.x - this.brickSize, y: coord.y + this.brickSize },
          this.colorPalletes.L,
        )
        break
    }
  }

  private drawJTetromino(
    coord: Coordinates,
    positions: TetrominoPositions = 1,
  ) {
    this.drawBrick(coord, this.colorPalletes.J) // Top brick
    this.drawBrick(
      { x: coord.x, y: coord.y + this.brickSize },
      this.colorPalletes.J,
    ) // Middle brick
    this.drawBrick(
      { x: coord.x, y: coord.y + 2 * this.brickSize },
      this.colorPalletes.J,
    ) // Bottom brick
    this.drawBrick(
      { x: coord.x - this.brickSize, y: coord.y + 2 * this.brickSize },
      this.colorPalletes.J,
    ) // Left brick
  }

  private drawSTetromino(
    coord: Coordinates,
    positions: TetrominoPositions = 1,
  ) {
    this.drawBrick(coord, this.colorPalletes.S)
    this.drawBrick(
      { x: coord.x + this.brickSize, y: coord.y },
      this.colorPalletes.S,
    )
    this.drawBrick(
      { x: coord.x, y: coord.y + this.brickSize },
      this.colorPalletes.S,
    )
    this.drawBrick(
      { x: coord.x - this.brickSize, y: coord.y + this.brickSize },
      this.colorPalletes.S,
    )
  }

  draw(
    coord: Coordinates,
    shape: TetrominoShapes,
    positions: TetrominoPositions = 1,
  ) {
    const tetrominoShapesDict: { [K in TetrominoShapes]: () => void } = {
      L: () => this.drawLTetromino(coord, positions),
      J: () => this.drawJTetromino(coord, positions),
      S: () => this.drawSTetromino(coord, positions),
      Z: () => {},
      O: () => {},
      I: () => {},
      T: () => {},
    }

    tetrominoShapesDict[shape]()
  }
}
