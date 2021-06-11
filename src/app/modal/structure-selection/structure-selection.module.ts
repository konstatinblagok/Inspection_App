import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StructureSelectionPageRoutingModule } from './structure-selection-routing.module';

import { StructureSelectionPage } from './structure-selection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StructureSelectionPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [StructureSelectionPage],
})
export class StructureSelectionPageModule {}
