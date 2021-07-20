import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoofingSelectionPage } from './roofing-selection.page';

const routes: Routes = [
  {
    path: '',
    component: RoofingSelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoofingSelectionPageRoutingModule {}
