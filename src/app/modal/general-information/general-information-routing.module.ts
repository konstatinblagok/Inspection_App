import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralInformationPage } from './general-information.page';

const routes: Routes = [
  {
    path: '',
    component: GeneralInformationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralInformationPageRoutingModule {}
