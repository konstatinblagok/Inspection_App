import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElectricalSelectionPage } from './electrical-selection.page';

const routes: Routes = [
  {
    path: '',
    component: ElectricalSelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElectricalSelectionPageRoutingModule {}
