import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerDialog implements OnInit {
  hue: string;
  colors: string[];

  @Input() color: string = 'rgba(0,0,0,1)';

  constructor(
    private dialogRef: MatDialogRef<ColorPickerDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    const initialColor = ['rgba(0,0,0,1)', '#000000'];
    this.colors = this.data['colors'] || initialColor;
  }

  setColor(colors: string[]) {
    this.colors = colors;
  }

  send() {
    this.dialogRef.close(this.colors);
  }
}
