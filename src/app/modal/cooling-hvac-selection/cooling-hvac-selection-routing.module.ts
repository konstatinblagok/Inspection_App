import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoolingHvacSelectionPage } from './cooling-hvac-selection.page';

const routes: Routes = [
  {
    path: '',
    component: CoolingHvacSelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoolingHvacSelectionPageRoutingModule {}
