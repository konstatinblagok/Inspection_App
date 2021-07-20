import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlumbingSelectionPageRoutingModule } from './plumbing-selection-routing.module';

import { PlumbingSelectionPage } from './plumbing-selection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlumbingSelectionPageRoutingModule
  ],
  declarations: [PlumbingSelectionPage]
})
export class PlumbingSelectionPageModule {}
