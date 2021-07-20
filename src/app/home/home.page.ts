import { Component } from '@angular/core';
import {
  MenuController,
  ModalController,
  Platform,
  AlertController,
} from '@ionic/angular';
import { CommonService } from '../common.function';

import { ApiService } from '../api.service';
import { LoadingController, NavController } from '@ionic/angular';
import { CreateInspectionPage } from '../../app/modal/create-inspection/create-inspection.page';
import { CommonSelectionPage } from '../../app/modal/common-selection/common-selection.page';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  SavedPDFshow = false;

  _userlogged_in = false;
  InspectionDetail: any;
  allDocsCreated: any = [];
  constructor(
    public alertController: AlertController,

    public loadingController: LoadingController,
    public config: CommonService,
    public api: ApiService,
    public modalController: ModalController,
    public platform: Platform
  ) {
    // this.config.storageSave('InspectionsCreated', this.allDocsCreated);
    // let newVr = [];
    // newVr.push(this.allDocsCreated);
    // newVr.push(InspectionsCreated);
    // console.log('New Vr=====' + JSON.stringify(newVr));
  }
  ionViewDidEnter() {
    let commArr = [];

    // this.config.storageRemoveItem('InspectionToEdit');
    // let vr = this.config.storageSave('InspectionToEdit', commArr);

    let InspectionsCreated = JSON.parse(
      this.config.storageGet('InspectionsCreated')['__zone_symbol__value']
    );

    // this.config.storageRemoveItem('InspectionsCreated');
    commArr = InspectionsCreated;
    console.log(JSON.stringify(commArr));

    if (InspectionsCreated == null) {
      console.log('NULL');
      this.allDocsCreated = this.config.AllDumyDocs;
    } else {
      console.log('NotNull');
      let InspectionsCreated = JSON.parse(
        this.config.storageGet('InspectionsCreated')['__zone_symbol__value']
      );
      // this.allDocsCreated = this.config.AllDumyDocs;
      // this.allDocsCreated = InspectionsCreated;
      this.allDocsCreated = commArr;
    }
  }

  async CreateInspectionForm() {
    this.config.storageRemoveItem('InspectionToEdit');
    const modal = await this.modalController.create({
      cssClass: 'update-popup-modal',
      component: CreateInspectionPage,
      componentProps: {},
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        let d = dataReturned.data;

        if (d.empty == 0) {
          return;
        }
        if (d.empty == 1) {
          this._userlogged_in = true;
          let inps = JSON.parse(
            this.config.storageGet('CreateInspection')['__zone_symbol__value']
          );
          console.log(inps);

          this.InspectionDetail = inps.name;
          return;
        }
        if (d.location) {
        }
      }
    });

    return await modal.present();
  }
  SavedPDFSHow() {
    this.SavedPDFshow = !this.SavedPDFshow;
  }

  async openCommonModal(c) {
    this.config.storageRemoveItem('InspectionsCreated');

    this.config.storageRemoveItem('InspectionToEdit');
    this.config.storageSave('InspectionToEdit', c);

    const modal = await this.modalController.create({
      cssClass: 'update-popup-modal',
      component: CommonSelectionPage,
      componentProps: {
        clientDetails: c,
      },
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        let d = dataReturned.data;

        if (d.empty == 0) {
          return;
        }
        if (d.empty == 1) {
          this._userlogged_in = true;
          let inps = JSON.parse(
            this.config.storageGet('CreateInspection')['__zone_symbol__value']
          );
          console.log(inps);

          this.InspectionDetail = inps.name;
          return;
        }
        if (d.location) {
        }
      }
    });

    return await modal.present();
  }
}
