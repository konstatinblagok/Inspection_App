import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InspectionDetailPage } from './inspection-detail.page';

const routes: Routes = [
  {
    path: '',
    component: InspectionDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InspectionDetailPageRoutingModule {}
