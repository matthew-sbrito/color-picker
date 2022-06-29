import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {ColorPickerModule} from './color-picker/color-picker.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {ColorPickerService} from './shared/services/color-picker.service';
import {MatDialogModule} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from './shared/components/confirmation-dialog/confirmation-dialog.component';
import {StaticInjector} from "./shared/common/static-injector";

@NgModule({
  declarations: [AppComponent, ConfirmationDialogComponent],
  imports: [
    BrowserModule,
    ColorPickerModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
  ],
  providers: [ColorPickerService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(injector: Injector) {
    StaticInjector.injector = injector
  }
}
