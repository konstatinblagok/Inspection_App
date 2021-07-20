import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InsulationSelectionPageRoutingModule } from './insulation-selection-routing.module';

import { InsulationSelectionPage } from './insulation-selection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InsulationSelectionPageRoutingModule
  ],
  declarations: [InsulationSelectionPage]
})
export class InsulationSelectionPageModule {}
