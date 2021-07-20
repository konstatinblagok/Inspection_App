import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InspectionDetailPageRoutingModule } from './inspection-detail-routing.module';

import { InspectionDetailPage } from './inspection-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InspectionDetailPageRoutingModule
  ],
  declarations: [InspectionDetailPage]
})
export class InspectionDetailPageModule {}
