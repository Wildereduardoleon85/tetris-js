import { ITetrisBoard } from './interfaces'
import { Coordinates } from './types'

export class TetrisBoard implements ITetrisBoard {
  private canvas
  private ctx: CanvasRenderingContext2D | null
  private _gridSize: number
  private _gridColor
  private _gridsTaken: Coordinates[]

  constructor(
    boardWidth: number,
    canvas: HTMLCanvasElement,
    gridColor: string,
  ) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')
    this.canvas.width = boardWidth
    this.canvas.height = boardWidth * 2
    this._gridSize = boardWidth / 10
    this._gridColor = gridColor
    this._gridsTaken = []
  }

  draw() {
    this.ctx!.strokeStyle = this._gridColor
    this.ctx!.lineWidth = 1

    // Draw horizontal lines
    for (let i = 0; i < this.gridSize; i++) {
      this.ctx!.beginPath()
      this.ctx!.moveTo(this.gridSize * i, 0)
      this.ctx!.lineTo(this.gridSize * i, this.canvas.height)
      this.ctx!.stroke()
    }

    // Draw vertical lines
    for (let i = 0; i < this.gridSize * 2; i++) {
      this.ctx!.beginPath()
      this.ctx!.moveTo(0, this.gridSize * i)
      this.ctx!.lineTo(this.canvas.width, this.gridSize * i)
      this.ctx!.stroke()
    }
  }

  set gridsTaken(value: Coordinates[]) {
    this._gridsTaken = value
  }

  get gridsTaken() {
    return this._gridsTaken
  }

  get gridSize() {
    return this._gridSize
  }

  get gridColor() {
    return this._gridColor
  }
}
