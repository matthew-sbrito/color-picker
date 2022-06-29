import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
  Output,
  SimpleChanges,
  OnChanges,
  EventEmitter,
  HostListener,
} from '@angular/core'

@Component({
  selector: 'app-color-palette',
  templateUrl: './color-palette.component.html',
  styleUrls: ['./color-palette.component.scss'],
})
export class ColorPaletteComponent implements AfterViewInit, OnChanges {

  private _ctx!: CanvasRenderingContext2D
  private _mousedown: boolean = false
  public _selectedPosition!: { x: number; y: number }

  @Input()
  hue!: string

  @Output()
  color: EventEmitter<string[]> = new EventEmitter<string[]>()

  @ViewChild('canvas')
  canvas!: ElementRef<HTMLCanvasElement>

  ngAfterViewInit() {
    this.draw()
  }

  draw() {
    if(!this.canvas) return

    if (!this._ctx) {
      this._ctx = this.canvas.nativeElement.getContext('2d')!;
    }

    const width = this.canvas.nativeElement.width
    const height = this.canvas.nativeElement.height

    this._ctx.fillStyle = this.hue || 'rgba(255,255,255,1)'
    this._ctx.fillRect(0, 0, width, height)

    const whiteGrad = this._ctx.createLinearGradient(0, 0, width, 0)
    whiteGrad.addColorStop(0, 'rgba(255,255,255,1)')
    whiteGrad.addColorStop(1, 'rgba(255,255,255,0)')

    this._ctx.fillStyle = whiteGrad
    this._ctx.fillRect(0, 0, width, height)

    const blackGrad = this._ctx.createLinearGradient(0, 0, 0, height)
    blackGrad.addColorStop(0, 'rgba(0,0,0,0)')
    blackGrad.addColorStop(1, 'rgba(0,0,0,1)')

    this._ctx.fillStyle = blackGrad
    this._ctx.fillRect(0, 0, width, height)

    if (this._selectedPosition) {
      this._ctx.strokeStyle = 'white'
      this._ctx.fillStyle = 'white'
      this._ctx.beginPath()
      this._ctx.arc(
        this._selectedPosition.x,
        this._selectedPosition.y,
        10,
        0,
        2 * Math.PI
      )
      this._ctx.lineWidth = 5
      this._ctx.stroke()
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['hue']) {
      this.draw()
      const pos = this._selectedPosition
      if (pos) {
        this.color.emit(this.getColorAtPosition(pos.x, pos.y))
      }
    }
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(evt: MouseEvent) {
    this._mousedown = false
  }

  onMouseDown(evt: MouseEvent) {
    this._mousedown = true
    this._selectedPosition = { x: evt.offsetX, y: evt.offsetY }
    this.draw()
    this.color.emit(this.getColorAtPosition(evt.offsetX, evt.offsetY))
  }

  onMouseMove(evt: MouseEvent) {
    if (this._mousedown) {
      this._selectedPosition = { x: evt.offsetX, y: evt.offsetY }
      this.draw()
      this.emitColor(evt.offsetX, evt.offsetY)
    }
  }

  emitColor(x: number, y: number) {
    const rgbaColor = this.getColorAtPosition(x, y)
    this.color.emit(rgbaColor)
  }

  getColorAtPosition(x: number, y: number) {
    const imageData = this._ctx.getImageData(x, y, 1, 1).data
    const red = imageData[0];
    const green = imageData[1];
    const blue = imageData[2];
    return [
      `rgb(${red},${green},${blue},1)`,
      `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`.toUpperCase()
    ]
  }
}
