import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppliancesSelectionPage } from './appliances-selection.page';

const routes: Routes = [
  {
    path: '',
    component: AppliancesSelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppliancesSelectionPageRoutingModule {}
