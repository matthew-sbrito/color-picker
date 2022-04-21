import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-color-slider',
  templateUrl: './color-slider.component.html',
  styleUrls: ['./color-slider.component.scss']
})
export class ColorSliderComponent implements AfterViewInit {

  private _ctx: CanvasRenderingContext2D;
  private _mousedown: boolean = false;
  private _selectedHeight: number;

  @Output()
  color: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('canvas')
  canvas: ElementRef<HTMLCanvasElement>;

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(event: MouseEvent){
    this._mousedown = false;
  }

  constructor() { }

  ngAfterViewInit(): void {
    this.draw();
  }

  draw() {
    if (!this._ctx) {
      this._ctx = this.canvas.nativeElement.getContext('2d')!;
    }

    const width = this.canvas.nativeElement.width;
    const height = this.canvas.nativeElement.height;
    this._ctx.clearRect(0,0, width, height);

    const gradient = this._ctx.createLinearGradient(0,0,0, height);

    gradient.addColorStop(0, 'rgba(255, 0, 0, 1)');
    gradient.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
    gradient.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
    gradient.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
    gradient.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
    gradient.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
    gradient.addColorStop(1, 'rgba(255, 0, 0, 1)');

    this._ctx.beginPath();
    this._ctx.rect(0,0, width, height)
    this._ctx.fillStyle = gradient;
    this._ctx.fill();
    this._ctx.closePath();

    if (this._selectedHeight) {
      this._ctx.beginPath()
      this._ctx.strokeStyle = 'white'
      this._ctx.lineWidth = 5
      this._ctx.rect(0, this._selectedHeight - 5, width, 10)
      this._ctx.stroke()
      this._ctx.closePath()
    }
  }

  onMouseMove(event: MouseEvent) {
    if(this._mousedown) {
      this._selectedHeight = event.offsetY;
      this.draw();
      this.emitColor(event.offsetX, event.offsetY)
    }
  }

  onMouseDown(event: MouseEvent) {
    this._mousedown = true;
    this._selectedHeight = event.offsetY;
    this.draw();
    this.emitColor(event.offsetX, event.offsetY)
  }

  private emitColor(offsetX: number, offsetY: number) {
    const rgbaColor = this.getColorAtPosition(offsetX, offsetY);
    this.color.emit(rgbaColor);
  }

  private getColorAtPosition(offsetX: number, offsetY: number) {
    const imageData = this._ctx.getImageData(offsetX, offsetY, 1,1).data;
    return `rgba(${imageData[0]},${imageData[1]},${imageData[2]},1)`;
  }
}
