import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageCalculatorComponent } from './calculator/pages/manage-calculator/manage-calculator.component';

const routes: Routes = [
  {
    path : 'calculator', component : ManageCalculatorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaveHelpRoutingModule { }
