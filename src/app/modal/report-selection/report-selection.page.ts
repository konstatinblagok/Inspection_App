import { Component, OnInit } from '@angular/core';
import { ModalController, Platform, AlertController } from '@ionic/angular';
import { CommonService } from '../../common.function';
// import { ReportSelectionPage } from '../../../app/modal/report-selection/report-selection.page';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonSelectionPage } from '../../../app/modal/common-selection/common-selection.page';

@Component({
  selector: 'app-report-selection',
  templateUrl: './report-selection.page.html',
  styleUrls: ['./report-selection.page.scss'],
  providers: [FormBuilder],
})
export class ReportSelectionPage implements OnInit {
  inspectionTypes: any = [];
  public createInpForm: FormGroup;
  HouseInModes_: any;
  RecentWeatherConditions: any = [];
  WeatherConditions: any = [];
  MainEnteranceConsidered: any = [];
  selectedCodeValue: any;

  StoredData: any;
  constructor(
    public modalController: ModalController,
    private formBuilder: FormBuilder,
    private plt: Platform,
    public config: CommonService,
    private alertController: AlertController
  ) {
    this.inspectionTypes = [{ name: 'Structure' }];

    this.HouseInModes_ = [
      {
        name: 'No Comment',

        formValue: '1',
      },
      {
        name: 'Well Built/Maintained',

        formValue: '2',
      },
      {
        name: 'Average Qual./Lacking Maint.',

        formValue: '3',
      },
      {
        name: 'Well built/ Lacking Maint.',
        formValue: '3',
      },
      {
        name: 'Average Qual./ Lacking Maint.',
        formValue: '3',
      },
      {
        name: 'Well built/ Agile Systems',
        formValue: '3',
      },
      {
        name: 'Average Quality/ Agile Systems',
        formValue: '3',
      },
      {
        name: 'Well built/ Numerous Repairs',
        formValue: '3',
      },
      {
        name: 'Average Qual./ Numerous Rep',
        formValue: '3',
      },
      {
        name: 'Low Quality/ Numerous Repairs',
        formValue: '3',
      },
    ];
    this.WeatherConditions = [
      {
        name: 'Dry',

        formValue: '1',
      },
      {
        name: 'Wet',

        formValue: '2',
      },
      {
        name: 'Snow On Ground',

        formValue: '3',
      },
      {
        name: 'Adverse Weather',

        formValue: '4',
      },
    ];

    this.RecentWeatherConditions = [
      {
        name: 'Dry',

        formValue: '1',
      },
      {
        name: 'Occasional Rain',

        formValue: '2',
      },
      {
        name: 'Very Wet',

        formValue: '3',
      },
      {
        name: 'Winter Weather',

        formValue: '4',
      },
    ];

    this.MainEnteranceConsidered = [
      {
        name: 'North',

        formValue: '1',
      },
      {
        name: 'South',

        formValue: '2',
      },
      {
        name: 'East',

        formValue: '3',
      },
      {
        name: 'West',

        formValue: '4',
      },
    ];

    this.createInpForm = this.formBuilder.group({
      houseInModes: ['', [Validators.required]],
      ApproximateAgeofHouse: ['', [Validators.required]],
      MainEnteranceConsidered: [''],
      AdditionalComment: [''],
      WeatherConditions: [''],
      RecentWeatherConditions: ['', [Validators.required]],
    });
  }

  ionViewDidEnter() {
    let StorageDate = this.config.storageGet('InspectionToEdit')[
      '__zone_symbol__value'
    ];

    if (StorageDate != undefined) {
      // var uniqueCount = arr1["0"].Unique;

      this.StoredData = JSON.parse(StorageDate);
      console.log(this.StoredData);

      this.createInpForm = this.formBuilder.group({
        houseInModes: [
          this.StoredData.report_section[0].houseInModes,
          [Validators.required],
        ],
        ApproximateAgeofHouse: [
          this.StoredData.report_section[0].ApproximateAgeofHouse,
          [Validators.required],
        ],
        MainEnteranceConsidered: [
          this.StoredData.report_section[0].MainEnteranceConsidered,
        ],
        AdditionalComment: [
          this.StoredData.report_section[0].AdditionalComment,
        ],
        WeatherConditions: [
          this.StoredData.report_section[0].WeatherConditions,
        ],
        RecentWeatherConditions: [
          this.StoredData.report_section[0].RecentWeatherConditions,
        ],
      });
    }
  }

  ngOnInit() {}

  async closeM() {
    let dataSent = {
      empty: 0,
    };

    await this.modalController.dismiss(dataSent);
  }

  async goToSelection(n) {
    if (n == 'Structure') {
      console.log(n);
    }

    const modal = await this.modalController.create({
      cssClass: 'update-popup-modal',
      component: ReportSelectionPage,
      componentProps: {},
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        let d = dataReturned.data;

        if (d.empty == 0) {
          return;
        }
        if (d.empty == 1) {
          let inps = JSON.parse(
            this.config.storageGet('CreateInspection')['__zone_symbol__value']
          );
          console.log(inps);

          return;
        }
        if (d.location) {
        }
      }
    });

    return await modal.present();
  }

  saveReport() {
    // console.log(this.createInpForm.value);
    this.getData_toInsert();
  }

  getData_toInsert() {
    console.log(this.StoredData);

    this.StoredData.report_section = [
      {
        houseInModes: this.createInpForm.value.houseInModes,
        ApproximateAgeofHouse: this.createInpForm.value.ApproximateAgeofHouse,
        MainEnteranceConsidered: this.createInpForm.value
          .MainEnteranceConsidered,
        AdditionalComment: this.createInpForm.value.AdditionalComment,
        WeatherConditions: this.createInpForm.value.WeatherConditions,
        RecentWeatherConditions: this.createInpForm.value
          .RecentWeatherConditions,
      },
    ];
    // let obj = {
    //   client_Info: [
    //     {
    //       clientName: this.StoredData.client_Info[0].clientName,
    //       inspectionAddress: this.StoredData.client_Info[0].inspectionAddress,
    //       inspector: this.StoredData.client_Info[0].inspector,
    //       reportNumber: this.StoredData.client_Info[0].reportNumber,
    //       inspectionDate: this.StoredData.client_Info[0].inspectionDate,
    //     },
    //   ],
    //   report_section: [
    //     {
    //       houseInModes: this.createInpForm.value.houseInModes,
    //       ApproximateAgeofHouse: this.createInpForm.value.ApproximateAgeofHouse,
    //       MainEnteranceConsidered: this.createInpForm.value
    //         .MainEnteranceConsidered,
    //       AdditionalComment: this.createInpForm.value.AdditionalComment,
    //       WeatherConditions: this.createInpForm.value.WeatherConditions,
    //       RecentWeatherConditions: this.createInpForm.value
    //         .RecentWeatherConditions,
    //     },
    //   ],
    // };

    console.log(this.StoredData);

    this.config.storageRemoveItem('InspectionToEdit');
    this.config.storageSave('InspectionToEdit', this.StoredData);

    this.presentAlertConfirm();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Report Overview Updated.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Continue Editing',
          handler: () => {
            console.log('Confirm Okay');

            this.openCommonModal();
          },
        },
      ],
    });

    await alert.present();
  }

  async openCommonModal() {
    let commArr = {
      client_Info: [
        {
          clientName: this.StoredData.client_Info.clientName,
          inspectionAddress: this.StoredData.client_Info.inspectionAddress,
          inspector: this.StoredData.client_Info.inspector,
          reportNumber: this.StoredData.client_Info.reportNumber,
          inspectionDate: this.StoredData.client_Info.inspectionDate,
        },
      ],

      report_Selection_Info: [
        {
          houseInModes: this.createInpForm.value.houseInModes,
          ApproximateAgeofHouse: this.createInpForm.value.ApproximateAgeofHouse,
          MainEnteranceConsidered: this.createInpForm.value
            .MainEnteranceConsidered,
          AdditionalComment: this.createInpForm.value.AdditionalComment,
          WeatherConditions: this.createInpForm.value.WeatherConditions,
          RecentWeatherConditions: this.createInpForm.value
            .RecentWeatherConditions,
        },
      ],
    };

    const modal = await this.modalController.create({
      cssClass: 'update-popup-modal',
      component: CommonSelectionPage,
      componentProps: {
        clientDetails: commArr,
      },
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        let d = dataReturned.data;

        if (d.empty == 0) {
          return;
        }
        if (d.empty == 1) {
          let inps = JSON.parse(
            this.config.storageGet('CreateInspection')['__zone_symbol__value']
          );
          console.log(inps);

          return;
        }
        if (d.location) {
        }
      }
    });

    return await modal.present();
  }

  codeSelected() {
    console.log('It');
  }
}
