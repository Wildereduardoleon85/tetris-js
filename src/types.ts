export enum TetrominoShapes {
  L = 'L',
  T = 'T',
  S = 'S',
  Z = 'Z',
  I = 'I',
  O = 'O',
  J = 'J',
}

export type ColorPalette = {
  main: string
  shadow: string
  lighter: string
  darker: string
}

export type Coordinates = {
  x: number
  y: number
}

export type TetrominoPositions = 1 | 2 | 3 | 4
