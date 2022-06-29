import {Component, OnInit} from '@angular/core';
import {ColorPickerService} from "./shared/services/color-picker.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'color-picker';

  constructor(
    private colorPicker: ColorPickerService,
  ) { }

  openColorPicker() {
    this.colorPicker.open();
  }

  ngOnInit(): void {
  }
}
