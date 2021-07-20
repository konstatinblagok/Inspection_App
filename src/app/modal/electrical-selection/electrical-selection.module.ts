import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElectricalSelectionPageRoutingModule } from './electrical-selection-routing.module';

import { ElectricalSelectionPage } from './electrical-selection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElectricalSelectionPageRoutingModule
  ],
  declarations: [ElectricalSelectionPage]
})
export class ElectricalSelectionPageModule {}
