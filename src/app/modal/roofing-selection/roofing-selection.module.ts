import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoofingSelectionPageRoutingModule } from './roofing-selection-routing.module';

import { RoofingSelectionPage } from './roofing-selection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoofingSelectionPageRoutingModule
  ],
  declarations: [RoofingSelectionPage]
})
export class RoofingSelectionPageModule {}
