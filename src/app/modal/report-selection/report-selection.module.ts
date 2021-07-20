import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportSelectionPageRoutingModule } from './report-selection-routing.module';

import { ReportSelectionPage } from './report-selection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportSelectionPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ReportSelectionPage],
})
export class ReportSelectionPageModule {}
