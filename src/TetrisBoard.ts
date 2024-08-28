export class TetrisBoard {
  private canvas
  private ctx: CanvasRenderingContext2D | null
  private gridSize: number

  constructor(boardWidth: number, canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')
    this.canvas.width = boardWidth
    this.canvas.height = boardWidth * 2
    this.gridSize = boardWidth / 10
  }

  draw() {
    // Set the background color to black
    this.ctx!.fillStyle = '#000000'
    this.ctx!.fillRect(0, 0, this.canvas.width, this.canvas.height)

    // Set the color for the grid lines (slightly transparent white)
    const gridColor = 'rgba(255, 255, 255, 0.1)'
    this.ctx!.fillStyle = gridColor

    // Draw the vertical lines, stop before the last line to ensure visibility
    for (let x = 0; x < this.canvas.width; x += this.gridSize) {
      this.ctx!.fillRect(x, 0, 1, this.canvas.height) // 1px wide line
    }
    // Draw the rightmost line explicitly
    this.ctx!.fillRect(this.canvas.width - 1, 0, 1, this.canvas.height)

    // Draw the horizontal lines, stop before the last line to ensure visibility
    for (let y = 0; y < this.canvas.height; y += this.gridSize) {
      this.ctx!.fillRect(0, y, this.canvas.width, 1) // 1px high line
    }
    // Draw the bottommost line explicitly
    this.ctx!.fillRect(0, this.canvas.height - 1, this.canvas.width, 1)
  }
}
