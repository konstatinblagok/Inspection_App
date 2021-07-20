import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExteriorSelectionPage } from './exterior-selection.page';

const routes: Routes = [
  {
    path: '',
    component: ExteriorSelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExteriorSelectionPageRoutingModule {}
