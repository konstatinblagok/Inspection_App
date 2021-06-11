import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommonSelectionPageRoutingModule } from './common-selection-routing.module';

import { CommonSelectionPage } from './common-selection.page';
// import { File } from '@ionic-native/file/ngx';
// import { FileOpener } from '@ionic-native/file-opener/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommonSelectionPageRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  declarations: [CommonSelectionPage],
})
export class CommonSelectionPageModule {}
