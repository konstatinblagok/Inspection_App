import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StructureSelectionPage } from './structure-selection.page';

const routes: Routes = [
  {
    path: '',
    component: StructureSelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StructureSelectionPageRoutingModule {}
