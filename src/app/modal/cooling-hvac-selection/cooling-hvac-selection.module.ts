import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoolingHvacSelectionPageRoutingModule } from './cooling-hvac-selection-routing.module';

import { CoolingHvacSelectionPage } from './cooling-hvac-selection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoolingHvacSelectionPageRoutingModule
  ],
  declarations: [CoolingHvacSelectionPage]
})
export class CoolingHvacSelectionPageModule {}
