import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsulationSelectionPage } from './insulation-selection.page';

const routes: Routes = [
  {
    path: '',
    component: InsulationSelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsulationSelectionPageRoutingModule {}
