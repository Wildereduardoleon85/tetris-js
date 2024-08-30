import { Coordinates } from './types'

export interface ITetrisBoard {
  gridSize: number
  gridColor: string
  gridsTaken: Coordinates[]
}
