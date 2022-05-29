import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColorPickerDialog } from './color-picker.component';

@Injectable({
  providedIn: 'root',
})
export class ColorPickerService {
  constructor(private dialog: MatDialog) {}

  open(colors?: string[]) {
    this.dialog.open(ColorPickerDialog, {
      data: {
        colors,
      },
    });
  }
}
