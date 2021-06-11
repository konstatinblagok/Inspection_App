import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateInspectionPageRoutingModule } from './create-inspection-routing.module';
// import { File } from '@ionic-native/file/ngx';
// import { FileOpener } from '@ionic-native/file-opener/ngx';
import { CreateInspectionPage } from './create-inspection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateInspectionPageRoutingModule,
    ReactiveFormsModule,
  ],

  providers: [],
  declarations: [CreateInspectionPage],
})
export class CreateInspectionPageModule {}
