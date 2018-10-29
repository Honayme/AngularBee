//Include all the angular material components we need and import the present file in app module in order to make the things cleaner
import {MatButtonModule, MatCheckboxModule, MatSnackBarModule} from '@angular/material';

import { NgModule } from '@angular/core';


@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatSnackBarModule],
  exports: [MatButtonModule, MatCheckboxModule, MatSnackBarModule],
})
export class MaterialModule { }
