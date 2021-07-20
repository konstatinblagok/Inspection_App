import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportSelectionPage } from './report-selection.page';

const routes: Routes = [
  {
    path: '',
    component: ReportSelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportSelectionPageRoutingModule {}
