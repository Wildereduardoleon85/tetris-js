export class TetrisBoard {
  private canvas
  private ctx: CanvasRenderingContext2D | null
  private gridSize: number
  private colorGrid

  constructor(
    boardWidth: number,
    canvas: HTMLCanvasElement,
    colorGrid: string,
  ) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')
    this.canvas.width = boardWidth
    this.canvas.height = boardWidth * 2
    this.gridSize = boardWidth / 10
    this.colorGrid = colorGrid
  }

  draw() {
    this.ctx!.strokeStyle = this.colorGrid
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
}
