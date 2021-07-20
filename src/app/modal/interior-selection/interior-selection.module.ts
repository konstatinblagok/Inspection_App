import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InteriorSelectionPageRoutingModule } from './interior-selection-routing.module';

import { InteriorSelectionPage } from './interior-selection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InteriorSelectionPageRoutingModule
  ],
  declarations: [InteriorSelectionPage]
})
export class InteriorSelectionPageModule {}
