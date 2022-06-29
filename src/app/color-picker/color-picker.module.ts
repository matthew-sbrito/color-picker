import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPickerDialog } from './color-picker.component';
import { ColorSliderComponent } from './color-slider/color-slider.component';
import { ColorPaletteComponent } from './color-palette/color-palette.component';
import { ColorPickerService } from '../shared/services/color-picker.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  declarations: [
    ColorPickerDialog,
    ColorSliderComponent,
    ColorPaletteComponent,
  ],
  exports: [ColorPickerDialog],
  providers: [ColorPickerService],
})
export class ColorPickerModule {}
