import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppliancesSelectionPageRoutingModule } from './appliances-selection-routing.module';

import { AppliancesSelectionPage } from './appliances-selection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppliancesSelectionPageRoutingModule
  ],
  declarations: [AppliancesSelectionPage]
})
export class AppliancesSelectionPageModule {}
