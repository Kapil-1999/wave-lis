import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WaveHelpRoutingModule } from './wave-help-routing.module';
import { ManageCalculatorComponent } from './calculator/pages/manage-calculator/manage-calculator.component';
import { CalculatorPageComponent } from './calculator/component/calculator-page/calculator-page.component';


@NgModule({
  declarations: [
    ManageCalculatorComponent,
    CalculatorPageComponent
  ],
  imports: [
    CommonModule,
    WaveHelpRoutingModule
  ]
})
export class WaveHelpModule { }
