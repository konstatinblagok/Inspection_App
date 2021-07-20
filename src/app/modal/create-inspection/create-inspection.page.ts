import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { ModalController, Platform, AlertController } from '@ionic/angular';
import { CommonService } from '../../common.function';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonSelectionPage } from '../../../app/modal/common-selection/common-selection.page';

@Component({
  selector: 'app-create-inspection',
  templateUrl: './create-inspection.page.html',
  styleUrls: ['./create-inspection.page.scss'],
  providers: [File, FileOpener, FormBuilder],
})
export class CreateInspectionPage implements OnInit {
  letterObj = {
    to: '',
    from: '',
    text: '',
  };
  StoredData2: any;
  StoredData: any;
  UpdateNow = false;
  public createInpForm: FormGroup;
  pdfObj = null;
  pdfObjBtn = false;
  constructor(
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    public modalController: ModalController,
    private file: File,
    private fileOpener: FileOpener,
    private plt: Platform,
    public config: CommonService
  ) {
    this.createInpForm = this.formBuilder.group({
      clientName: ['', [Validators.required]],
      inspectionAddress: ['', [Validators.required]],
      inspector: ['', [Validators.required]],
      reportNumber: ['', [Validators.required]],
      inspectionDate: ['', [Validators.required]],
    });
  }

  ionViewDidEnter() {
    let StorageDate = this.config.storageGet('InspectionToEdit')[
      '__zone_symbol__value'
    ];

    console.log(JSON.stringify(StorageDate));

    if (StorageDate != undefined) {
      this.UpdateNow = true;
      // var uniqueCount = arr1["0"].Unique;

      this.StoredData = JSON.parse(StorageDate);
      console.log(this.StoredData);

      this.createInpForm = this.formBuilder.group({
        clientName: [
          this.StoredData.client_Info[0].clientName,
          [Validators.required],
        ],
        inspectionAddress: [
          this.StoredData.client_Info[0].inspectionAddress,
          [Validators.required],
        ],
        inspector: [this.StoredData.client_Info[0].inspector],
        reportNumber: [this.StoredData.client_Info[0].reportNumber],
        inspectionDate: [this.StoredData.client_Info[0].inspectionDate],
      });
    } else {
      this.UpdateNow = false;
    }
  }

  ngOnInit() {}

  async closeM() {
    let dataSent = {
      empty: 0,
    };

    await this.modalController.dismiss(dataSent);
  }

  saveReport() {
    // console.log(JSON.stringify(this.createInpForm));

    this.getData_toInsert();
  }

  createPdf() {
    var docDefinition = {
      content: [
        { text: 'REMINDER', style: 'header' },
        { text: new Date().toTimeString(), alignment: 'right' },

        { text: 'From', style: 'Client Name' },
        { text: this.createInpForm.value.clientName },

        { text: 'To', style: 'subheader' },
        this.letterObj.to,

        { text: this.letterObj.text, style: 'story', margin: [0, 20, 0, 20] },

        {
          ul: ['Bacon', 'Rips', 'BBQ'],
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0],
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        },
      },
    };
    this.pdfObj = pdfMake.createPdf(docDefinition);
  }

  downloadPdf() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
        this.file
          .writeFile(this.file.dataDirectory, 'myletter.pdf', blob, {
            replace: true,
          })
          .then((fileEntry) => {
            this.fileOpener.open(
              this.file.dataDirectory + 'myletter.pdf',
              'application/pdf'
            );
          });
      });
    } else {
      this.pdfObj.download();
    }
  }

  getDataTo_Update() {
    console.log(this.StoredData);

    this.StoredData.client_Info = [
      {
        clientName: this.createInpForm.value.clientName,
        inspectionAddress: this.createInpForm.value.inspectionAddress,
        inspector: this.createInpForm.value.inspector,
        reportNumber: this.createInpForm.value.reportNumber,
        inspectionDate: this.createInpForm.value.inspectionDate,
      },
    ];

    console.log(this.StoredData);

    this.config.storageRemoveItem('InspectionToEdit');
    this.config.storageSave('InspectionToEdit', this.StoredData);

    this.presentAlertConfirm2();
  }

  getData_toInsert() {
    let commArr = [
      {
        client_Info: [
          {
            clientName: this.createInpForm.value.clientName,
            inspectionAddress: this.createInpForm.value.inspectionAddress,
            inspector: this.createInpForm.value.inspector,
            reportNumber: this.createInpForm.value.reportNumber,
            inspectionDate: this.createInpForm.value.inspectionDate,
          },
        ],
      },
    ];

    let mm = [];
    this.StoredData2 = [];

    let commArr2 = {
      client_Info: [
        {
          clientName: this.createInpForm.value.clientName,
          inspectionAddress: this.createInpForm.value.inspectionAddress,
          inspector: this.createInpForm.value.inspector,
          reportNumber: this.createInpForm.value.reportNumber,
          inspectionDate: this.createInpForm.value.inspectionDate,
        },
      ],
    };

    // this.StoredData2.client_Info = cc;

    let InspectionsCreated = JSON.parse(
      this.config.storageGet('InspectionsCreated')['__zone_symbol__value']
    );

    console.log(commArr);
    console.log(this.StoredData2);
    this.config.storageRemoveItem('InspectionToEdit');
    this.config.storageSave('InspectionToEdit', commArr2);

    // this.config.storageRemoveItem('InspectionsCreated');

    // let newIns = [];
    console.log(JSON.stringify(commArr2));

    if (InspectionsCreated == null) {
      console.log('null SAVE NOW');

      this.config.storageRemoveItem('InspectionsCreated');
      this.config.storageSave('InspectionsCreated', commArr);
    } else {
      let InspectionsCreated = [];
      let InspectionsCreated2 = JSON.parse(
        this.config.storageGet('InspectionsCreated')['__zone_symbol__value']
      );

      console.log(InspectionsCreated2);

      // InspectionsCreated.push(commArr);
      // InspectionsCreated.push(InspectionsCreated2);
      // this.config.storageSave('InspectionsCreated', commArr);
      console.log('InspectionsCreated' + JSON.stringify(InspectionsCreated2));

      let arr33 = [...commArr, ...InspectionsCreated2];

      this.config.storageRemoveItem('InspectionsCreated');
      this.config.storageSave('InspectionsCreated', arr33);

      // this.allDocsCreated = InspectionsCreated;
    }

    this.presentAlertConfirm();
  }

  async presentAlertConfirm() {
    this.createInpForm.reset();
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Inspection Created.',
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

  async presentAlertConfirm2() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Inspection Updated.',
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
    let InspectionsCreated2 = JSON.parse(
      this.config.storageGet('InspectionToEdit')['__zone_symbol__value']
    );

    console.log(InspectionsCreated2);

    let arr2 = {
      clientName: this.createInpForm.value.clientName,
      inspectionAddress: this.createInpForm.value.inspectionAddress,
      inspector: this.createInpForm.value.inspector,
      reportNumber: this.createInpForm.value.reportNumber,
      inspectionDate: this.createInpForm.value.inspectionDate,
    };

    const modal = await this.modalController.create({
      cssClass: 'update-popup-modal',
      component: CommonSelectionPage,
      componentProps: {
        clientDetails: arr2,
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
}
