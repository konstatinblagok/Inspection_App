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
    let commArr = [];

    this.config.storageRemoveItem('InspectionToEdit');
    this.config.storageSave('InspectionToEdit', commArr);

    this.allDocsCreated = [
      {
        client_Info: [
          {
            clientName: 'Client 1',
            inspectionAddress: 'US',
            inspector: 'Verma',
            reportNumber: '323',
            inspectionDate: '10/10/10',
          },
        ],
        report_section: [
          {
            houseInModes: 'No Comment',
            ApproximateAgeofHouse: '10',
            MainEnteranceConsidered: 'North',
            AdditionalComment: '2',
            WeatherConditions: 'Dry',
            RecentWeatherConditions: 'Dry',
          },
        ],
      },

      {
        client_Info: [
          {
            clientName: 'Client 2',
            inspectionAddress: 'UK',
            inspector: 'Verma 2',
            reportNumber: '323',
            inspectionDate: '10/10/10',
          },
        ],
        report_section: [
          {
            houseInModes: 'No Comment',
            ApproximateAgeofHouse: '2',
            MainEnteranceConsidered: 'North',
            AdditionalComment: '2',
            WeatherConditions: 'Dry',
            RecentWeatherConditions: 'Dry',
          },
        ],
      },
    ];
  }

  async CreateInspectionForm() {
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

  async openCommonModal(c) {
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
