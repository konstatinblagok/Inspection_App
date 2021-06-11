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

  getData_toInsert() {
    let commArr = {
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

    this.config.storageRemoveItem('InspectionToEdit');
    this.config.storageSave('InspectionToEdit', commArr);

    this.presentAlertConfirm();
  }

  async presentAlertConfirm() {
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

  async openCommonModal() {
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
