import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonSelectionPage } from './common-selection.page';

const routes: Routes = [
  {
    path: '',
    component: CommonSelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommonSelectionPageRoutingModule {}
