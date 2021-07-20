import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExteriorSelectionPageRoutingModule } from './exterior-selection-routing.module';

import { ExteriorSelectionPage } from './exterior-selection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExteriorSelectionPageRoutingModule
  ],
  declarations: [ExteriorSelectionPage]
})
export class ExteriorSelectionPageModule {}
