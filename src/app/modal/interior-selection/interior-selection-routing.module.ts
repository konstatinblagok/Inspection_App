import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InteriorSelectionPage } from './interior-selection.page';

const routes: Routes = [
  {
    path: '',
    component: InteriorSelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InteriorSelectionPageRoutingModule {}
