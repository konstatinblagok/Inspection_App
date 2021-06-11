import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { ApiService } from './api.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { HttpClientModule } from '@angular/common/http';
// import { File } from '@ionic-native/file';
// import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  exports: [],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    HttpClientModule,
    FormsModule,
    // File,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    ApiService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
