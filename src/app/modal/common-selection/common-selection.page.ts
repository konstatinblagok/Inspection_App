import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { CommonService } from '../../common.function';
import { ReportSelectionPage } from '../../../app/modal/report-selection/report-selection.page';
import { StructureSelectionPage } from '../../../app/modal/structure-selection/structure-selection.page';
import { RoofingSelectionPage } from '../../../app/modal/roofing-selection/roofing-selection.page';
import { ExteriorSelectionPage } from '../../../app/modal/exterior-selection/exterior-selection.page';
import { ElectricalSelectionPage } from '../../../app/modal/electrical-selection/electrical-selection.page';
import { CoolingHvacSelectionPage } from '../../../app/modal/cooling-hvac-selection/cooling-hvac-selection.page';
import { NavParams } from '@ionic/angular';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import {
  FileTransfer,
  FileTransferObject,
} from '@ionic-native/file-transfer/ngx';
import { CreateInspectionPage } from '../../../app/modal/create-inspection/create-inspection.page';

import { AppliancesSelectionPage } from '../../../app/modal/appliances-selection/appliances-selection.page';
import { InsulationSelectionPage } from '../../../app/modal/insulation-selection/insulation-selection.page';
import { InteriorSelectionPage } from '../../../app/modal/interior-selection/interior-selection.page';
import { PlumbingSelectionPage } from '../../../app/modal/plumbing-selection/plumbing-selection.page';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { Base64 } from '@ionic-native/base64/ngx';
import { AlertController } from '@ionic/angular';
declare var cordova: any;
import { GeneralInformationPage } from '../../../app/modal/general-information/general-information.page';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-common-selection',
  templateUrl: './common-selection.page.html',
  styleUrls: ['./common-selection.page.scss'],
  providers: [File, FileOpener, Base64, FileTransfer, AndroidPermissions],
})
export class CommonSelectionPage implements OnInit {
  private fileTransfer: FileTransferObject = this.filetransfer.create();
  storageDirectory: string = '';
  inspectionTypes: any = [];
  pdfObjBtn = false;
  selPDFname: any;
  clientDetails: any;
  InspectionToEdit: any;
  StoredData: any;
  pdfObj = null;
  base64File: any;
  PreviewPDF = false;
  DownloadPDF = false;
  GetFileDownloadType: any;

  constructor(
    public modalController: ModalController,
    private navParams: NavParams,
    private plt: Platform,
    public config: CommonService,
    private file: File,
    private fileOpener: FileOpener,
    private base64: Base64,
    private alertCtrl: AlertController,
    private filetransfer: FileTransfer,
    private androidPermissions: AndroidPermissions
  ) {
    this.clientDetails = this.navParams.get('clientDetails');
    console.log(this.clientDetails);

    console.log(this.clientDetails);

    this.inspectionTypes = this.config.inspectionTypes;
  }

  ionViewDidEnter() {
    this.pdfObjBtn = false;
    let StorageDate = this.config.storageGet('InspectionToEdit')[
      '__zone_symbol__value'
    ];

    if (StorageDate != undefined) {
      // var uniqueCount = arr1["0"].Unique;
      this.InspectionToEdit = JSON.parse(StorageDate);
      console.log(this.InspectionToEdit);
      this.clientDetails = this.InspectionToEdit['client_Info'][0];
    }
  }

  ngOnInit() {}

  async closeM() {
    let dataSent = {
      empty: 0,
    };

    await this.modalController.dismiss(dataSent);
  }

  async goToReportOverview() {
    var modal = await this.modalController.create({
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
          return;
        }
        if (d.location) {
        }
      }
    });

    return await modal.present();
  }

  async goToSelection(n) {
    console.log(n);

    if (n.val == '0') {
      console.log(n);

      var modal = await this.modalController.create({
        cssClass: 'update-popup-modal',
        component: CreateInspectionPage,
        componentProps: {},
      });
    }

    if (n.val == '1') {
      console.log(n);

      var modal = await this.modalController.create({
        cssClass: 'update-popup-modal',
        component: StructureSelectionPage,
        componentProps: {},
      });
    }
    if (n.val == '3') {
      console.log(n);

      var modal = await this.modalController.create({
        cssClass: 'update-popup-modal',
        component: RoofingSelectionPage,
        componentProps: {},
      });
    }
    if (n.val == '4') {
      console.log(n);

      var modal = await this.modalController.create({
        cssClass: 'update-popup-modal',
        component: ExteriorSelectionPage,
        componentProps: {},
      });
    }
    if (n.val == '5') {
      console.log(n);

      var modal = await this.modalController.create({
        cssClass: 'update-popup-modal',
        component: ElectricalSelectionPage,
        componentProps: {},
      });
    }
    if (n.val == '6') {
      console.log(n);

      var modal = await this.modalController.create({
        cssClass: 'update-popup-modal',
        component: CoolingHvacSelectionPage,
        componentProps: {},
      });
    }

    // ==

    if (n.val == '8') {
      console.log(n);

      var modal = await this.modalController.create({
        cssClass: 'update-popup-modal',
        component: InsulationSelectionPage,
        componentProps: {},
      });
    }

    if (n.val == '9') {
      console.log(n);

      var modal = await this.modalController.create({
        cssClass: 'update-popup-modal',
        component: PlumbingSelectionPage,
        componentProps: {},
      });
    }

    if (n.val == '10') {
      console.log(n);

      var modal = await this.modalController.create({
        cssClass: 'update-popup-modal',
        component: InteriorSelectionPage,
        componentProps: {},
      });
    }

    if (n.val == '11') {
      console.log(n);

      var modal = await this.modalController.create({
        cssClass: 'update-popup-modal',
        component: AppliancesSelectionPage,
        componentProps: {},
      });
    }
    if (n.val == '12') {
      console.log(n);

      var modal = await this.modalController.create({
        cssClass: 'update-popup-modal',
        component: GeneralInformationPage,
        componentProps: {},
      });
    }

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

  async getPDFName() {
    const alert = await this.alertCtrl.create({
      header: 'Enter PDF Name',
      inputs: [
        {
          type: 'text',
          id: 'pdfname',
          name: 'pdfname',
          value: this.StoredData.client_Info[0].clientName,
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Ok',
          handler: (alrData: any) => {
            if (alrData.pdfname == '') {
              this.config.presentToast('Please Enter PDF name');
              return false;
            } else {
              this.selPDFname = alrData.pdfname;
              this.PreviewPDF = true;
              this.createPdf();
            }
          },
        },
      ],
    });

    await alert.present();
  }

  previewPDF() {
    this.StoredData = JSON.parse(
      this.config.storageGet('InspectionToEdit')['__zone_symbol__value']
    );
    this.GetFileDownloadType = 1;
    // alert('yesssss' + this.GetFileDownloadType);
    this.selPDFname = this.StoredData.client_Info[0].clientName;

    this.createPdf();
  }

  DownloadPdf_() {
    this.StoredData = JSON.parse(
      this.config.storageGet('InspectionToEdit')['__zone_symbol__value']
    );
    this.GetFileDownloadType = 2;

    if (
      this.selPDFname == '' ||
      this.selPDFname == undefined ||
      this.selPDFname == null
    ) {
      this.getPDFName();

      return;
    } else if (this.selPDFname == this.StoredData.client_Info[0].clientName) {
      this.getPDFName();

      return;
    } else {
      this.PreviewPDF = true;
    }

    this.createPdf();
  }

  async createPdf() {
    if (this.GetFileDownloadType == 2) {
      this.DownloadPDF = true;
      this.PreviewPDF = false;
    }

    if (this.GetFileDownloadType == 1) {
      this.PreviewPDF = true;
      this.DownloadPDF = false;
    }

    this.StoredData = JSON.parse(
      this.config.storageGet('InspectionToEdit')['__zone_symbol__value']
    );

    if (this.StoredData.report_section[0].ApproximateAgeofHouse === '') {
      this.config.presentToast('Please fill Report Overview');
    }

    console.log(this.StoredData);
    let Logo_Header = '../../../assets/logo.png';
    let BackgroundHouse = '../../../assets/background.png';
    let Donation = '../../../assets/donation.png';
    let blank = '../../../assets/blank.png';
    let img_1 = '../../../assets/img_1.jpg';
    let img_2 = '../../../assets/img_2.jpg';
    let img_3 = '../../../assets/img_3.jpg';
    let img_4 = '../../../assets/img_4.jpg';
    let img_5 = '../../../assets/img_5.jpg';
    let img_6 = '../../../assets/img_6.jpg';
    let img_7 = '../../../assets/img_7.jpg';
    let img_8 = '../../../assets/img_8.jpg';

    // let imagesLength = this.StoredData.storedReportOverviewImage;

    if (this.StoredData.storedReportOverviewImage != null) {
      var imagesLength = Object.keys(this.StoredData.storedReportOverviewImage)
        .length;
      console.log('LENGHT--' + imagesLength);
    }

    // if (imagesLength === '') {
    //   this.config.presentToast('Please upload Inspection Images');
    //   return;
    // }
    console.log('ARRAY LENGTH', parseInt(this.StoredData.structureWallStructure.length));
    console.log(this.StoredData.storedReportOverviewImage);
    //ionic cordova run android -l

    let asb = this.StoredData.storedReportOverviewImage;
    console.log(asb);

    /*var areaImpact = [
      {
        image_1: '../../../assets/image1.jpg',
        description:
          'The damaged light fixture (motion sensor missing) at the rear of the house should be repaired or replaced.',
      },
      {
        image_1: '../../../assets/image2.jpg',
        description:
          'The damaged light fixture (motion sensor missing) at the rear of the house should be repaired or replaced.',
      },
    ];*/

    var docDefinition = {
      footer: function (page) {
        if (page != 1) {
          return {
            columns: [
              [
                {
                  canvas: [
                    {
                      type: 'line',
                      x1: 0,
                      y1: 5,
                      x2: 510,
                      y2: 5,
                      lineWidth: 1,
                    },
                  ],
                  alignment: 'left',
                  margin: [50, -10, 0, 0],
                },
                {
                  style: 'footer',
                  text: [
                    'This confidential report is prepared exclusively for ',
                    {
                      text: 'Brian and Tabatha Clinton',
                      color: '#ed3833',
                    },
                  ],
                },
                {
                  canvas: [
                    {
                      type: 'line',
                      x1: 0,
                      y1: 5,
                      x2: 510,
                      y2: 5,
                      lineWidth: 0.8,
                    },
                  ],
                  alignment: 'left',
                  margin: [50, -2, 0, 0],
                },
                {
                  alignment: 'left',
                  margin: [527, 5, 0, 0],
                  fontSize: 8,
                  text: ['© 2021'],
                },
              ],
            ],
          };
        }
      },
      header: function (currentPage: number, pageCount: string) {
        if (currentPage > 1) {
          return {
            text:
              '424 Mayberry Street Cantonment, FL 32533\t Page ' +
              currentPage.toString() +
              ' of ' +
              pageCount,
            style: 'watermark',
            alignment: 'left',
            margin: [360, 20, 0, 0],
          };
        }
      },
      content: [
        {
          image: await this.getBase64ImageFromURL(Logo_Header),
          width: 220,
          height: 150,
          margin: [7, -5, 0, 0],
        },
        {
          text: 'HOME INSPECTION REPORT',
          style: 'header',
        },
        {
          columns: [
            {
              stack: ['424 Mayberry Street', 'Cantonment, FL', '32533'],
              style: 'headerAddress',
            },
          ],
        },
        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 5,
              x2: 182,
              y2: 5,
              lineWidth: 0.8,
            },
          ],
          alignment: 'right',
          margin: [-13, 5, 0, 0],
        },
        {
          columnGap: 30,
          width: '50%',
          margin: [-28, 3, 0, 0],
          columns: [
            [
              {
                image: await this.getBase64ImageFromURL(BackgroundHouse),
                width: 360,
              },
            ],
            [
              {
                text: 'Inspection Date:',
                style: 'ptitle',
                margin: [60, 30, 0, 0],
              },
              {
                text: this.StoredData.client_Info[0].inspectionDate,
                style: 'pdata',
                margin: [107, 0, 0, 0],
              },
              {
                text: 'Prepared For:',
                style: 'ptitle',
                margin: [75, 10, 0, 0],
              },
              {
                text: this.StoredData.client_Info[0].clientName,
                style: 'pdata',
                margin: [114, 0, 0, 7],
              },
              { text: 'Prepared By:', style: 'ptitle', margin: [80, 7, 0, 0] },
              {
                text:
                  'A Pro Inspection Service\n 4702  Bay Breeze Dr Gulf\n Breeze, FL 32563, USA',
                margin: [14, 0, 6, 0],
                style: 'pdata',
              },
              {
                text: 'Report Number',
                style: 'ptitle',
                margin: [60, 10, 0, 0],
              },
              {
                text: this.StoredData.client_Info[0].reportNumber,
                style: 'pdata',
                margin: [130, 0, 6, 0],
              },
              {
                text: 'Inspector',
                style: 'ptitle',
                margin: [95, 10, 0, 0],
              },
              {
                text: this.StoredData.client_Info[0].inspector,
                style: 'pdata',
                margin: [116, 0, 0, 0],
              },
            ],
          ],
        },
        {
          image: await this.getBase64ImageFromURL(Donation),
          width: 60,
          height: 60,
          alignment: 'left',
          margin: [405, 10, 0, 0],
        },
        {
          alignment: 'right',
          margin: [0, 17, 0, 0],
          fontSize: 7.9,
          pageBreak: 'after',
          text: [
            {
              text:
                'A portion of the inspection fee has been\ndonated to the American Cancer Society\n\n\n\n\n',
            },
            '© 2021 ',
            {
              text: 'A Pro Home Inspections',
            },
          ],
        },
        //TABLE OF CONTENTS
        {
          text: 'Table of Contents',
          style: 'toc',
        },
        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 5,
              x2: 490,
              y2: 5,
              lineWidth: 0.8,
            },
          ],
          alignment: 'center',
          margin: [0, 5, 0, 27],
          color: '#838383',
        },
        {
          columnGap: 40,
          columns: [
            [
              {
                text: 'Home Inspection Report',
                style: 'tocContents',
                margin: [30, -10, 0, 0],
              },
            ],
            [{ text: '1', style: 'tocPages', margin: [193, -10, 0, 0] }],
          ],
        },
        {
          columnGap: 30,
          columns: [
            [
              {
                text: 'Report Overview and Summary',
                style: 'tocContents',
              },
            ],
            [{ text: '3', style: 'tocPages', margin: [196, 9, 0, 0] }],
          ],
        },
        {
          columnGap: 30,
          columns: [
            [
              {
                text: 'Structural Foundation',
                style: 'tocContents',
              },
            ],
            [{ text: '9', style: 'tocPages', margin: [196, 9, 0, 0] }],
          ],
        },
        {
          columnGap: 30,
          columns: [
            [{ text: 'Roffing', style: 'tocContents' }],
            [{ text: '10', style: 'tocPages' }],
          ],
        },
        {
          columnGap: 30,
          columns: [
            [{ text: 'Exterior', style: 'tocContents' }],
            [{ text: '11', style: 'tocPages' }],
          ],
        },
        {
          columnGap: 30,
          columns: [
            [
              {
                text: 'Electrical System',
                style: 'tocContents',
              },
            ],
            [{ text: '12', style: 'tocPages' }],
          ],
        },
        {
          columnGap: 30,
          columns: [
            [
              {
                text: 'Cooling HVAC System',
                style: 'tocContents',
              },
            ],
            [{ text: '13', style: 'tocPages' }],
          ],
        },
        {
          columnGap: 30,
          columns: [
            [
              {
                text: 'Insulation / Ventilation',
                style: 'tocContents',
              },
            ],
            [{ text: '14', style: 'tocPages' }],
          ],
        },
        {
          columnGap: 30,
          columns: [
            [
              {
                text: 'Plumbing System',
                style: 'tocContents',
              },
            ],
            [{ text: '15', style: 'tocPages' }],
          ],
        },
        {
          columnGap: 30,
          columns: [
            [{ text: 'Interior', style: 'tocContents' }],
            [{ text: '16', style: 'tocPages' }],
          ],
        },
        {
          columnGap: 30,
          columns: [
            [{ text: 'Appliances', style: 'tocContents' }],
            [{ text: '17', style: 'tocPages' }],
          ],
        },
        {
          columnGap: 30,
          columns: [
            [
              {
                text: 'Maintance Advice',
                style: 'tocContents',
              },
            ],
            [
              {
                text: '20',
                style: 'tocPages',
              },
            ],
          ],
        },
        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 5,
              x2: 490,
              y2: 5,
              lineWidth: 0.8,
            },
          ],
          alignment: 'center',
          margin: [0, 40, 0, 27],
          color: '#838383',
          pageBreak: 'after',
        },
        /*
          'House Mode - ' + this.StoredData.report_section[0].houseInModes,
          'Weather Conditions is ' +
            this.StoredData.report_section[0].WeatherConditions,
          'Recent Weather Conditions - ' +
            this.StoredData.report_section[0].RecentWeatherConditions,
          'Main Enterance Considered - ' +
            this.StoredData.report_section[0].MainEnteranceConsidered,
          'Approximate Age of House - ' +
            this.StoredData.report_section[0].ApproximateAgeofHouse,
          'Additional Comments - ' +
            this.StoredData.report_section[0].AdditionalComment,
        */
        {
          color: '#000000',
          margin: [25, 0, 0, 0],
          table: {
            body: [
              [
                {
                  text: 'REPORT OVERVIEW AND SUMMARY',
                  alignment: 'center',
                  style: 'subheader',
                },
              ],
            ],
          },
          layout: {
            hLineColor: function (i, node) {
              return 'black';
            },
            vLineColor: function (i, node) {
              return 'black';
            },
            paddingLeft: function (i, node) {
              return 58;
            },
            paddingRight: function (i, node) {
              return 69;
            },
            paddingTop: function (i, node) {
              return 2;
            },
            paddingBottom: function (i, node) {
              return 2;
            },
          },
        },
        {
          color: '#000000',
          margin: [0, 8, 0, 0],
          width: 300,
          table: {
            body: [
              [
                {
                  text: 'THE HOUSE IN PERSPECTIVE',
                  alignment: 'left',
                  style: 'subbox',
                },
              ],
            ],
          },
          layout: {
            hLineColor: function (i, node) {
              return 'black';
            },
            vLineColor: function (i, node) {
              return 'black';
            },
            paddingLeft: function (i, node) {
              return 15;
            },
            paddingRight: function (i, node) {
              return 324;
            },
            paddingTop: function (i, node) {
              return 1;
            },
            paddingBottom: function (i, node) {
              return 1;
            },
          },
        },
        {
          margin: [0, 17, 0, 8],
          columns: [
            {
              stack: [
                'Please read the entire report. There may be items of concern in the body of the report that are not noted in the summary. It would be prudent to address any and all items of concern to the buyer prior to referencing repairs.\n\n',
                'Many homes may have circumstances where construction practices or standards have changed since the home was built. Updating/upgrading systems are not a requirement if the home was built to the standards of the day construction was completed. It would be cost prohibitive to bring everything to current standards for every home.',
              ],
              fontSize: 9.5,
            },
          ],
        },
        {
          text:
            'This is an average quality ' +
            this.StoredData.report_section[0].ApproximateAgeofHouse +
            ' years old (approximate age) home.  As with all homes, ongoing maintenance is required and improvements to the systems of the home will be needed over time. The improvements that are recommended in this report are not considered unusual for a home of this age and location. Please remember that there is no such thing as a perfect home.',
          style: 'paraData',
          italics: 'true',
          color: '#ed3833',
        },
        {
          margin: [0, 8, 0, 8],
          columns: [
            {
              stack: [
                'Most sellers are honest and are often surprised to learn of defects uncovered during an inspection. Realize that sellers are under no obligation to repair everything mentioned in the report. No home is perfect. Keep things in perspective. Dont kill your deal over things that dont matter. It is inappropriate to demand that a seller address deferred maintenance, conditions already listed on the sellers disclosure, or nit-picky items.\n\n',
                'A home inspection is not a “pass or fail” type of inspection. It is a visual evaluation of the conditions of the systems and accessible components of the home. Conditions can and will change after the inspection over time. Future conditions can not be foreseen or reported on. Components that are not readily accessible can not be inspected. Home that have undergone remodeling by the home-owner are usually cosmetic in nature. If structural remodeling has been undertaken, the use of licensed professionals and permits for such work can not be verified. Many “Flip Homes” are previously distressed homes that have been remodeled without the benefit of licensed professionals. Unverified or un-permitted work will be excluded from any warranties including third party warranties.',
              ],
              fontSize: 9.5,
            },
          ],
        },
        {
          text:
            'It would be wise to consider a homeowner’s warranty to protect the buyers from unexpected breakdown and failure. A one year home owner’s warranty purchased from Residential Warranty Service will be extended to 18 months and will include a 5 year Roof Leak warranty as a benefit of having the home inspected by A Pro Inspections. For more information, please call 844-367-0885 or online at MySimpleHomeWarranty.com. Choosing the premium option will provide sewer line, water line, structure, and mold coverage as well.',
          style: 'paraData',
        },
        {
          margin: [0, 8, 0, 8],
          columns: [
            {
              stack: [
                'Items found to be defective at the time of inspection are not generally covered by any home warranty\n\n',
                'Homes that are occupied at the time of inspection may have conditions that change from the time of inspection to the time of the closing. It would be wise for the prospective home owner to perform a walk through inspection after the home has been vacated to determine if there are any conditions that may have changed',
              ],
              fontSize: 9.5,
            },
          ],
        },
        {
          color: '#000000',
          margin: [0, 8, 0, 0],
          width: 300,
          table: {
            body: [
              [
                {
                  text: 'KEYS USED IN THIS REPORT',
                  alignment: 'left',
                  style: 'subbox',
                },
              ],
            ],
          },
          layout: {
            hLineColor: function (i, node) {
              return 'black';
            },
            vLineColor: function (i, node) {
              return 'black';
            },
            paddingLeft: function (i, node) {
              return 15;
            },
            paddingRight: function (i, node) {
              return 330;
            },
            paddingTop: function (i, node) {
              return 1;
            },
            paddingBottom: function (i, node) {
              return 1;
            },
          },
        },
        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 5,
              x2: 508,
              y2: 5,
              lineWidth: 3,
            },
          ],
          alignment: 'left',
          margin: [6.1, -4, 0, 0],
        },
        {
          color: '#000000',
          margin: [0, 10, 0, 0],
          bold: 'true',
          fontSize: 9.7,
          table: {
            body: [
              [
                {
                  text:
                    'For your convenience, the following keys have been used in this report.',
                  alignment: 'left',
                },
              ],
              [
                {
                  ul: [
                    'Major Concern:  Denotes an improvement recommendation that is uncommon for a building of this age or location and /or that needs immediate repair or replacement.',
                    'Safety Issue:  Denotes an observation or recommendation that is considered an immediate safety concern.',
                    'Improve:  Denotes a typical repair recommendation that may or may not be common for a building of this age and location that should be anticipated or performed over the short term prior to taking ownership of the home.',
                    'Monitor:  Denotes an area where further investigation by a specialized licensed contractor and/or monitoring is needed. Repairs may be necessary or desired. During the inspection, there was insufficient information or the observation was beyond the scope of the inspection. Improvements cannot be determined until further investigation or observations are made.',
                    'Deferred: Denotes areas that should be considered for repairs after taking ownership of the home or ongoing maintenance is needed.',
                  ],
                },
              ],
            ],
          },
          layout: {
            hLineColor: function (i, node) {
              return i === 0 || i === node.table.body.length
                ? 'black'
                : 'white';
            },
            vLineColor: function (i, node) {
              return 'black';
            },
            paddingLeft: function (i, node) {
              return 19;
            },
            paddingRight: function (i, node) {
              return 10;
            },
            paddingTop: function (i, node) {
              return 3;
            },
            paddingBottom: function (i, node) {
              return 3;
            },
          },
        },
        {
          text:
            'Note: Observations listed under “Discretionary Improvements” are not essential repairs, but represent logical long-term improvements. Conditions may exist that are conducive to the growth and formation of mold and mold spores. These conditions are, but not confined to, the presence of moisture or rotten or rotting material.  If these conditions exist, or mold is a concern, it is the responsibility of the prospective homeowner to have specific mold sampling for testing done. Mold sampling is beyond the scope of this inspection',
          fontSize: 9.5,
          margin: [0, 1, 0, 1],
        },
        {
          pageBreak: 'before',
          text: '',
          style: 'watermark',
          alignment: 'left',
          margin: [0, 0, 0, 0],
        },
        {
          margin: [0, 10, 0, 0],
          columns: [
            {
              stack: [
                'Compact fluorescent light bulbs (CFL) contain mercury. If these type bulbs have been broken previously in the home, mercury contamination may have occurred. Test for mercury is beyond the scope of the inspection. \n',
                'Issues that are considered as cosmetic are not addressed in this report. (Holes, stains, scratches, unevenness, missing trim, paint and finish flaws or odors). It is not the intent of this report to make the house new again. The inspection company is not responsible for failure to properly maintain the property or damage that occurs or uncovered after taking possession of the home.',
              ],
              fontSize: 9.5,
              color: '#000000',
            },
          ],
        },
        {
          text: 'IMPROVEMENT RECOMMENDATION HIGHLIGHTS',
          alignment: 'left',
          style: 'subbox',
          margin: [-10, 10, 0, 0],
        },
        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 5,
              x2: 510,
              y2: 5,
              lineWidth: 0.8,
            },
          ],
          alignment: 'left',
          margin: [-9, -3, 10, 0],
        },
        {
          columns: [
            {
              stack: [
                'Any person using the information contained in this report used for making a decision related to the purchase of the inspected property agrees to the terms and conditions of the authorization agreement located at the end of the report.\n',
                'The following is a synopsis of the potentially significant improvements that should be budgeted for over the short term.  Other significant improvements, outside the scope of this inspection, may also be necessary.  Please refer to the body of this report for further details on these and other recommendations. It is strongly recommended that a Homeowner’s Warranty or service contract be purchased to cover the operation of systems and appliances.  It is further recommended that appliances and systems be tested during any scheduled pre-closing walk through. Like any mechanical device, malfunctions can occur at any time (including the day after taking possession of the house). No comments or accurate speculation can be made on the longevity or future performance of any system or appliance.\n',
                'Issues that are considered as cosmetic are not addressed in this report. (Holes, stains, scratches, unevenness, missing trim, paint and finish flaws or odors). It is not the intent of this report to make the house new again. The inspection company is not responsible for failure to properly maintain the property or damage that occurs or uncovered after taking possession of the home.\n\n',
                'Insects, vermin or other wildlife can possibly enter the home at any time after taking possession of the home. Future infestations of vermin, insects or other animal activity can not be known or predicted. Identification of insects, vermin feces, or type of activity is beyond the scope of the inspection.\n\n',
                'Any claims against the inspector, the Inspection Company and or warranty companies must have completed resolution forms and notification of such claim submitted to the inspection company prior to any service performed. Failure to notify the inspection company of services prior to approval of such repair or service, the client relinquishes all claims and reimbursement for repair(s) or service(s) performed. The inspection company’s limit of liability for the home inspection is limited to the cost of the inspection only. ',
              ],
              fontSize: 9.7,
              margin: [0, 6, 4, 0],
            },
          ],
        },
        {
          text: 'Sloped Roofing',
          style: 'midsizeText',
        },
        {
          style: 'ulStyle',
          ul: [
            'Improve:  The roofing is nearing the later stages of its life cycle.  Minor repairs are recommended in the short term to maintain the weather tightness of the roof.  Damaged or missing roofing material should be repaired.  All roof penetrations should be examined and sealed as necessary. Some insurance companies are limiting coverage on homes with shingle roofs that are 15 years or older.',
          ],
        },
        {
          text: 'Exterior and Garage',
          style: 'midsizeText',
        },
        {
          style: 'ulStyle',
          ul: [
            'Improve:  Weep holes (openings in the mortar joints, typically found at foundation level) in the brick veneer wall structure should be cleared. Landscaping should not be above the weep holes.',
            'Improve:  The windows/doors require caulking around the frames  where gaps are in the current caulk',
          ],
        },
        {
          text: 'Electrical',
          style: 'midsizeText',
        },
        {
          style: 'ulStyle',
          ul: [
            'Improve:  The damaged light fixture (motion sensor missing) at the rear of the house should be repaired or replaced.',
            'Improve:  The breaker panel circuits are not labeled as to what circuits the breakers serve. These should be identified and labeled.',
            'Improve:  The light in the garage is inoperative.  If the bulbs are not blown, the circuit should be investigated.',
            'Improve:  The light switch in the garage could not be determined as to the function of the switch. Marked with a blue dot.',
          ],
        },
        {
          text: 'HVAC',
          style: 'midsizeText',
        },
        {
          style: 'ulStyle',
          ul: [
            'Monitor:  The capacity of the air conditioning system may prove to be marginal during the warmer days of the summer.  The porch has been converted to living space which increases the requirements of the system. Actual performance conditions are difficult to predict. This area will prove to be more humid due to the lack of return air.',
            'Monitor:  The HVAC registers show evidence of condensation.  This is not a major concern.  Controlling indoor humidity levels by keeping doors and windows closed would help to control this condition.',
            'Improve:  The unit’s return air area should be cleaned and sealed.',
            'Improve:  Damaged insulation on refrigerant lines should be repaired.',
          ],
        },
        {
          text: 'Plumbing',
          style: 'midsizeText',
          color: '#001aff',
        },
        {
          style: 'ulStyle',
          color: '#001aff',
          ul: [
            'Improve:  The sprinkler system functioned properly at the time of inspection. One of the sprinkler heads was observed to have a broken head. The sprinkler heads should be kept adjusted to prevent water from spraying on the house or driveways. Actual coverage of the system is beyond the scope of the inspection',
          ],
        },
        {
          text: 'Interior',
          style: 'midsizeText',
          color: '#001aff',
        },
        {
          style: 'ulStyle',
          color: '#001aff',
          ul: [
            'Improve:  The auto closer for the rear door is not working properly in the sun room. Replacement is necessary.',
            'Improve:  Weather-stripping improvements are needed at the exterior doors.',
            'Improve:  Weather-stripping improvements are needed at the exterior doors.',
            'Improve:  The window(s) were hard to open in many locations of the home.',
          ],
        },
        {
          color: '#000000',
          margin: [-10, 16, 0, 0],
          width: 300,
          table: {
            body: [
              [
                {
                  text: 'THE SCOPE OF THE INSPECTION',
                  alignment: 'left',
                  style: 'subbox',
                },
              ],
            ],
          },
          layout: {
            hLineColor: function (i, node) {
              return 'black';
            },
            vLineColor: function (i, node) {
              return 'black';
            },
            paddingLeft: function (i, node) {
              return 15;
            },
            paddingRight: function (i, node) {
              return 295;
            },
            paddingTop: function (i, node) {
              return 1;
            },
            paddingBottom: function (i, node) {
              return 1;
            },
          },
        },
        {
          columns: [
            {
              stack: [
                'All components designated for inspection in the NACHI Inspector Standards are inspected, except as may be noted in the “Limitations of Inspection” sections within this report. The NACHI® Inspector Standards can be found at the end of this report and are made part of the inspection.\n',
                'This inspection is visual only.  A representative sample of building components is viewed in areas that are accessible at the time of the inspection only.  No destructive testing or dismantling of building components is performed. Many homes may have circumstances where construction practices or standards have changed since the home was built. Updating/upgrading systems are not a requirement if the home was built to the standards of the day construction was completed. It would be cost prohibitive to bring everything to current standards for every home sold. Thermal imaging does not show the condition of areas concealed by finishes. It is used to help determine if any thermal differentials exist, that may lead to further investigation. It can not see through walls or other materials.\n\n',
                'It is the goal of the inspection to put a homebuyer in a better position to make a buying decision.  Not all improvements will be identified during this inspection.  Unexpected repairs should still be anticipated.  The inspection should not be considered a guarantee or warranty of any kind.',
              ],
              fontSize: 9.5,
              margin: [0, 6, 4, 0],
              color: '#000000',
            },
          ],
        },
        {
          fontSize: 9.5,
          margin: [0, 10, 6, 0],
          text: [
            {
              text:
                'Please refer to the pre-inspection contract for a full explanation of the scope of the inspection\n',
              bold: 'true',
            },
            {
              text:
                'Verification of compliance with current or past Building Code and/or Zoning Regulations or requirements is outside the scope of this inspection.\n\n',
              bold: 'true',
            },
            {
              text:
                'Please refer to the NACHI® Inspector Standards and the inspection authorization and agreement for a full explanation of the scope of the inspection. NACHI.org\n\n',
              italics: 'true',
            },
            {
              text: 'WEATHER CONDITIONS\n',
              bold: 'true',
              fontSize: 12,
            },
            this.StoredData.report_section[0].WeatherConditions +
              ' weather conditions prevailed at the time of the inspection. The estimated outside temperature was 68 degrees F. ' +
              this.StoredData.report_section[0].RecentWeatherConditions +
              ' weather conditions have been experienced in the days leading up to the inspection.',
          ],
        },
        {
          text: '',
          bold: 'true',
          fontSize: 10,
        },
        {
          columnGap: 0,
          width: '5%',
          margin: [0, 0, 0, 0],
          columns: [
            [
              {
                text: '',
                fontSize: 1,
              },
            ],
            [
              {
                image: await this.getBase64ImageFromURL(blank),
                width: 2,
                height: 2,
              },
              {
                text: '',
                fontSize: 9,
              },
            ],
          ],
        },
        //APPLIANCES
        {
          columnGap: 30,
          width: '50%',
          margin: [30, 5, 0, 0],
          fontSize: 9,
          color: '#ed3833',
          columns: [this.StoredData.applianceDescription],
        },
        {
          color: '#000000',
          margin: [0, 8, 0, 0],
          width: 300,
          table: {
            body: [
              [
                {
                  text: '',
                  alignment: 'left',
                  style: 'subbox',
                },
              ],
            ],
          },
          layout: {
            hLineColor: function (i, node) {
              return 'white';
            },
            vLineColor: function (i, node) {
              return 'white';
            },
          },
        },
        {
          fontSize: 9.5,
          margin: [30, 10, 6, 0],
          color: '#ed3833',
          text: [
            {
              text: '',
              bold: 'true',
            },
            {
              text: '',
            },
            {
              text: '',
              fontSize: 11,
              bold: 'true',
              color: '#000000',
            },
          ],
        },
        {
          fontSize: 9.5,
          margin: [30, 10, 6, 0],
          text: [
            {
              text: '',
            },
          ],
        },
        {
          margin: [30, 10, 6, 0],
          fontSize: 9.5,
          color: '#ed3833',
          ul: [''],
        },
        {
          fontSize: 1,
          columnGap: 4,
          color: '#000000',
          columns: [
            [
              {
                text: '',
                margin: [0, 3, 0, 0],
                bold: 'true',
              },
            ],
            [{ text: '', margin: [0, 3, 0, 0] }],
          ],
        },
        {
          style: 'watermark',
          ol: [''],
        },
      ],
      styles: {
        header: {
          fontSize: 22.5,
          bold: true,
          alignment: 'right',
          margin: [-10, -95, 0, 25],
          characterSpacing: -0.5,
        },
        ulStyle: {
          color: '#f87512',
          margin: [0, 3, 0, 0],
          fontSize: 9.5,
        },
        aggrementOL: {
          color: '#ff0000',
          margin: [30, 3, 0, 0],
          fontSize: 8.3,
        },
        headerAddress: {
          color: '#ff0000',
          bold: true,
          fontSize: 21,
          alignment: 'right',
          margin: [-45, 10, 0, 0],
          characterSpacing: -0.5,
        },
        toc: {
          fontSize: 28,
          bold: true,
          alignment: 'right',
          margin: [0, 100, 0, 10],
          characterSpacing: -0.5,
        },
        tocContents: {
          fontSize: 14.8,
          bold: true,
          margin: [30, 9, 0, 0],
          characterSpacing: -0.5,
          alignment: 'left',
        },
        tocPages: {
          fontSize: 13.5,
          bold: true,
          margin: [190, 9, 0, 0],
          alignment: 'left',
        },
        watermark: {
          bold: true,
          fontSize: 8,
          color: '#ed3833',
        },
        midsizeText: {
          margin: [0, 4, 5, 0],
          alignment: 'left',
          bold: 'true',
          fontSize: 11,
          color: '#f87512',
        },
        ptitle: {
          bold: true,
          fontSize: 14.5,
          alignment: 'left',
        },
        footer: {
          alignment: 'left',
          bold: true,
          fontSize: 9,
          margin: [247, 1, 1, 0],
        },
        pdata: {
          color: '#ed3833',
          fontSize: 13,
          bold: true,
        },
        paraData: {
          fontSize: 9.5,
          bold: true,
        },
        paraData_2: {
          fontSize: 8,
          lineHeight: 1.5,
          margin: [30, 0, 0, 0],
        },
        subheader: {
          fontSize: 22,
          bold: true,
          color: '#000000',
        },
        subheader_2: {
          fontSize: 22,
          bold: true,
          color: '#ff0000',
        },
        subbox: {
          fontSize: 13,
          bold: true,
          color: '#000000',
        },
        story: {
          alignment: 'center',
          fontSize: 18,
          bold: true,
          color: '#ed3833',
        },
      },
    };
    if (this.StoredData.storedReportOverviewImage != null) {
      docDefinition.content.push({
        text:
          'Photos are only a representative sample of conditions observed. There may be more than one area of concern not shown by photo',
        bold: 'true',
        fontSize: 10,
      });
      for (let i = 0; i < imagesLength; i++) {
        docDefinition.content.push({
          columnGap: 30,
          width: '50%',
          margin: [0, 5, 0, 0],
          columns: [
            [
              {
                image: await this.getBase64ImageFromURL(
                  this.StoredData.storedReportOverviewImage[i].img
                ),
                // image: await this.getBase64ImageFromURL(img_7),
                width: 250,
                height: 200,
              },
              {
                text: this.StoredData.storedReportOverviewImage[i].text,
                fontSize: 9,
              },
            ],
            [
              {
                // image: await this.getBase64ImageFromURL(
                //   this.StoredData.storedReportOverviewImage[i].img
                // ),
                image: await this.getBase64ImageFromURL(img_8),
                width: 250,
                height: 200,
              },
              {
                text: this.StoredData.storedReportOverviewImage[i].text,
                fontSize: 9,
              },
            ],
          ],
        });
      }
    }
    if (
      this.StoredData.structureDescription != null ||
      this.StoredData.structureDescription != null ||
      this.StoredData.structureComments!= null ||
      this.StoredData.structureLimitations!=null ||
      this.StoredData.structureWallStructure != null ||
      this.StoredData.structureCeilingStructure != null ||
      this.StoredData.structureRoofStructure != null ||
      this.StoredData.structureAtticMethodStructure != null ||
      this.StoredData.structureFoundationStructure != null ||
      this.StoredData.structureFloorStructure != null
    ) {
      docDefinition.content.push(
        {
          pageBreak: 'before',
          text: '',
          style: 'watermark',
          alignment: 'left',
          margin: [0, 0, 0, 0],
        },
        {
          color: '#000000',
          margin: [25, 10, 0, 0],
          table: {
            body: [
              [
                {
                  text: 'STRUCTURAL/FOUNDATION',
                  alignment: 'center',
                  style: 'subheader',
                },
              ],
            ],
          },
          layout: {
            hLineColor: function (i, node) {
              return 'black';
            },
            vLineColor: function (i, node) {
              return 'black';
            },
            paddingLeft: function (i, node) {
              return 100;
            },
            paddingRight: function (i, node) {
              return 100;
            },
            paddingTop: function (i, node) {
              return 2;
            },
            paddingBottom: function (i, node) {
              return 2;
            },
          },
        }
      );
    }

    /*if (this.StoredData.structureDescription != null) {
      docDefinition.content.push(
        {
          color: '#000000',
          margin: [0, 8, 0, 0],
          width: 300,
          table: {
            body: [
              [
                {
                  text: 'DESCRIPTION OF STRUCTURAL / FOUNDATION COMPONENTS',
                  alignment: 'left',
                  style: 'subbox',
                },
              ],
            ],
          },
          layout: {
            hLineColor: function (i, node) {
              return 'black';
            },
            vLineColor: function (i, node) {
              return 'black';
            },
            paddingLeft: function (i, node) {
              return 15;
            },
            paddingRight: function (i, node) {
              return 124;
            },
            paddingTop: function (i, node) {
              return 1;
            },
            paddingBottom: function (i, node) {
              return 1;
            },
          },
        },
        {
          fontSize: 10,
          margin: [30, 5, 0, 0],
          color: '#ff0f06',
          text: [
            {
              text: this.StoredData.structureDescription,
              bold: 'true',
            },
          ],
        }
      );
    }*/

    if (
      this.StoredData.structureWallStructure != null ||
      this.StoredData.structureCeilingStructure != null ||
      this.StoredData.structureRoofStructure != null ||
      this.StoredData.structureAtticMethodStructure != null ||
      this.StoredData.structureFoundationStructure != null ||
      this.StoredData.structureFloorStructure != null ||
      this.StoredData.structureRoofStructure !=null ||
      this.StoredData.structureDescription != null
    ) {
      docDefinition.content.push({
        color: '#000000',
        margin: [0, 8, 0, 0],
        width: 300,
        table: {
          body: [
            [
              {
                text: 'DESCRIPTION OF STRUCTURAL / FOUNDATION COMPONENTS',
                alignment: 'left',
                style: 'subbox',
              },
            ],
          ],
        },
        layout: {
          hLineColor: function (i, node) {
            return 'black';
          },
          vLineColor: function (i, node) {
            return 'black';
          },
          paddingLeft: function (i, node) {
            return 15;
          },
          paddingRight: function (i, node) {
            return 124;
          },
          paddingTop: function (i, node) {
            return 1;
          },
          paddingBottom: function (i, node) {
            return 1;
          },
        },
      });
    }
    if (this.StoredData.structureWallStructure != null) {
      var wallStructure = ' ';
      for(let i=0; i<parseInt(this.StoredData.structureWallStructure.length); i++)

        {
          wallStructure = wallStructure + ' • ' + this.StoredData.structureWallStructure[i].text
        }
      docDefinition.content.push({
        fontSize: 10,
        columnGap: 5,
        color: '#ff0f06',
        columns: [
          [
            {
              text: 'Wall Structure:\n',
              margin: [30, 7, 0, 0],
              bold: 'true',
            },
          ],
          [
            {
              text: wallStructure,
              margin: [-50, 7, 0, 0],
            },
          ],
        ],
      });
    }

    if (this.StoredData.structureCeilingStructure != null) {
      var cellingStructure = ' ';
      for(let i=0; i<parseInt(this.StoredData.structureCeilingStructure.length); i++)
        {
          cellingStructure = cellingStructure + ' • ' + this.StoredData.structureCeilingStructure[i].text
        }
      docDefinition.content.push({
        fontSize: 10,
        columnGap: 5,
        color: '#ff0f06',
        columns: [
          [
            {
              text: 'Ceiling Structure:\n',
              margin: [30, 3, 0, 0],
              bold: 'true',
            },
          ],
          [
            {
              text: cellingStructure,
              //text: '• ' + this.StoredData.structureCeilingStructure[0].text + ' • ' + this.StoredData.structureCeilingStructure[1].text,
              margin: [-50, 3, 0, 0],
            },
          ],
        ],
      });
    }
    if (this.StoredData.structureRoofStructure != null) {
      var RoofStructure = ' ';
      for(let i=0; i<parseInt(this.StoredData.structureRoofStructure.length); i++)
        {
          RoofStructure = RoofStructure + ' • ' + this.StoredData.structureRoofStructure[i].text
        }
      docDefinition.content.push({
        fontSize: 10,
        columnGap: 5,
        color: '#ff0f06',
        columns: [
          [
            {
              text: 'Roof Structure:\n',
              margin: [30, 3, 0, 0],
              bold: 'true',
            },
          ],
          [
            {
              text: RoofStructure,
              //text: '• ' + this.StoredData.structureRoofStructure[0].text + ' • ' + this.StoredData.structureRoofStructure[1].text,
              margin: [-50, 3, 0, 0],
            },
          ],
        ],
      });
    }
    if (this.StoredData.structureAtticMethodStructure != null) {
      var AtticMethodStructure = ' ';
      for(let i=0; i<parseInt(this.StoredData.structureAtticMethodStructure.length); i++)
        {
          AtticMethodStructure = AtticMethodStructure + ' • ' + this.StoredData.structureAtticMethodStructure[i].text
        }
      docDefinition.content.push({
        fontSize: 10,
        columnGap: 5,
        color: '#ff0f06',
        columns: [
          [
            {
              text: 'Attic Method of Inspection:\n',
              margin: [30, 3, 0, 0],
              bold: 'true',
            },
          ],
          [
            {
              text: AtticMethodStructure,
              //text: '• ' + this.StoredData.structureCeilingStructure[0].text + ' • ' + this.StoredData.structureCeilingStructure[1].text,
              margin: [-50, 3, 0, 0],
            },
          ],
        ],
      });
    }
    if (this.StoredData.structureFoundationStructure != null) {
      var FoundationStructure = ' ';
      for(let i=0; i<parseInt(this.StoredData.structureFoundationStructure.length); i++)
        {
          FoundationStructure = FoundationStructure + ' • ' + this.StoredData.structureFoundationStructure[i].text
        }
      docDefinition.content.push({
        fontSize: 10,
        columnGap: 5,
        color: '#ff0f06',
        columns: [
          [
            {
              text: 'Foundation:\n',
              margin: [30, 3, 0, 0],
              bold: 'true',
            },
          ],
          [
            {
              text: FoundationStructure,
              margin: [-50, 3, 0, 0],
            },
          ],
        ],
      });
    }
    if (this.StoredData.structureFloorStructure != null) {
      var FloorStructure = ' ';
      for(let i=0; i<parseInt(this.StoredData.structureFloorStructure.length); i++)
        {
          FloorStructure = FloorStructure + ' • ' + this.StoredData.structureFloorStructure[i].text
        }
      docDefinition.content.push({
        fontSize: 10,
        columnGap: 5,
        color: '#ff0f06',
        columns: [
          [
            {
              text: 'Floor Structure:\n',
              margin: [30, 3, 0, 0],
              bold: 'true',
            },
          ],
          [
            {
              text: FloorStructure,
              margin: [-50, 3, 0, 0],
            },
          ],
        ],
      });
    }
    if (
      this.StoredData.structureObservation != null ||
      this.StoredData.structureComments != null
    ) {
      docDefinition.content.push(
        {
          color: '#000000',
          margin: [0, 8, 0, 0],
          width: 300,
          table: {
            body: [
              [
                {
                  text: 'STRUCTURAL / FOUNDATION COMPONENT OBSERVATIONS',
                  alignment: 'left',
                  style: 'subbox',
                },
              ],
            ],
          },
          layout: {
            hLineColor: function (i, node) {
              return 'black';
            },
            vLineColor: function (i, node) {
              return 'black';
            },
            paddingLeft: function (i, node) {
              return 15;
            },
            paddingRight: function (i, node) {
              return 139;
            },
            paddingTop: function (i, node) {
              return 1;
            },
            paddingBottom: function (i, node) {
              return 1;
            },
          },
        },
        {
          fontSize: 9.5,
          margin: [30, 10, 6, 0],
          color: '#ed3833',
          text: [
            {
              text: 'Positive Attributes\n',
              bold: 'true',
            },
            {
              text: this.StoredData.structureObservation,
            },
            {
              text: '\nGeneral Comments\n',
              bold: 'true',
            },
            {
              text: this.StoredData.structureComments,
            },
            {
              text: '\n\nRECOMMENDATIONS / OBSERVATIONS \n',
              bold: 'true',
            },
            {
              text: 'Wood Boring Insects \n',
              bold: 'true',
            },
            {
              text:
                'Monitor:  This home is situated in an area known for wood destroying insect activity (Florida).  Wood destroying insects can do a substantial amount of damage to the wood structural components of a home. Since termites are a living and breeding insect, sometimes damage may take months or years to show evidence.  Several steps can be taken to reduce the risk of a wood destroying insect problem. Additional treatment may be need in the event of swarms. Any form of wood/soil contact should be avoided.  Controlling dampness in the soil around the perimeter of a home, including below porches and in crawl spaces, is recommended.  Preventive chemical treatment, performed by a licensed pest control specialist, is also advisable. Termites are beyond the scope of the inspection. A licensed pest control specialist should be consulted for a thorough termite inspection and treatment (if necessary). If there is currently a termite bond the transfer of the bond is advisable.\n\n',
            },
            {
              text: 'Foundation \n',
              bold: 'true',
            },
            {
              text:
                'Monitor:  Common minor cracks were observed in the foundation walls of the house.  This implies that some structural movement of the building has occurred, as is typical of most houses. This is usually the result of shrinkage and/or settling of the slab. It takes several years for the new concrete to fully cure. During the curing process it very common for concrete to crack due to thermal differential inside the core of the concrete. Thicker concrete slabs will cure more slowly than thinner slabs. During renovations, expect to find concrete cracks under the flooring. Floor coverings were not removed at the time of inspection.\n',
            },
          ],
        }
      );
    }
    if (this.StoredData.structureLimitations != null) {
      docDefinition.content.push(
        {
          color: '#000000',
          margin: [0, 8, 0, 0],
          width: 300,
          table: {
            body: [
              [
                {
                  text:
                    'LIMITATIONS OF STRUCTURAL / FOUNDATION COMPONENT INSPECTION',
                  alignment: 'left',
                  style: 'subbox',
                },
              ],
            ],
          },
          layout: {
            hLineColor: function (i, node) {
              return 'black';
            },
            vLineColor: function (i, node) {
              return 'black';
            },
            paddingLeft: function (i, node) {
              return 15;
            },
            paddingRight: function (i, node) {
              return 53;
            },
            paddingTop: function (i, node) {
              return 1;
            },
            paddingBottom: function (i, node) {
              return 1;
            },
          },
        },
        {
          fontSize: 9.5,
          margin: [30, 10, 6, 0],
          text: [
            {
              text:
                'As prescribed in the inspection authorization and agreement, this is a visual inspection only.  Assessing the structural integrity of a building is beyond the scope of a standard home inspection.  A certified Licensed Professional Engineer (P.E.) is recommended where there are structural concerns about the building.  Inspection of structural components was limited by (but not restricted to) the following conditions: \n',
            },
          ],
        },
        {
          margin: [30, 10, 6, 0],
          fontSize: 9.5,
          color: '#ed3833',
          ul: [
            this.StoredData.structureLimitations[0], //tobe
            this.StoredData.structureLimitations[1],
            this.StoredData.structureLimitations[2],
            this.StoredData.structureLimitations[3],
          ],
        },
        {
          margin: [30, 10, 6, 0],
          fontSize: 9.5,
          text:
            'Please refer to the NACHI® Inspector Standards for a full explanation of the scope of the inspection. NACHI.org.\n\n',
        }
      );
    }
    if (
      this.StoredData.roofingDescription != null ||
      this.StoredData.roofingObservation != null ||
      this.StoredData.roofingLimitations != null ||
      this.StoredData.D2RoofingCoveringStructure != null ||
      this.StoredData.D2RoofingGuttersDownspoutsStructure != null ||
      this.StoredData.D2RoofingMethodsStructure != null ||
      this.StoredData.D2RoofingChimneysStructure != null
    ) {
      docDefinition.content.push(
        {
          pageBreak: 'before',
          text: '',
          style: 'watermark',
          alignment: 'left',
          margin: [0, 0, 0, 0],
        },
        {
          color: '#000000',
          margin: [25, 10, 0, 0],
          table: {
            body: [
              [
                {
                  text: 'ROOFING',
                  alignment: 'center',
                  style: 'subheader',
                },
              ],
            ],
          },
          layout: {
            hLineColor: function (i, node) {
              return 'black';
            },
            vLineColor: function (i, node) {
              return 'black';
            },
            paddingLeft: function (i, node) {
              return 193;
            },
            paddingRight: function (i, node) {
              return 193;
            },
            paddingTop: function (i, node) {
              return 2;
            },
            paddingBottom: function (i, node) {
              return 2;
            },
          },
        }
      );
    }
    if (this.StoredData.roofingDescription != null ||
      this.StoredData.D2RoofingCoveringStructure != null ||
      this.StoredData.D2RoofingGuttersDownspoutsStructure != null ||
      this.StoredData.D2RoofingMethodsStructure != null ||
      this.StoredData.D2RoofingChimneysStructure != null) {
      docDefinition.content.push(
        {
          color: '#000000',
          margin: [0, 8, 0, 0],
          width: 300,
          table: {
            body: [
              [
                {
                  text: 'DESCRIPTION OF ROOFING SYSTEM',
                  alignment: 'left',
                  style: 'subbox',
                },
              ],
            ],
          },
          layout: {
            hLineColor: function (i, node) {
              return 'black';
            },
            vLineColor: function (i, node) {
              return 'black';
            },
            paddingLeft: function (i, node) {
              return 15;
            },
            paddingRight: function (i, node) {
              return 275;
            },
            paddingTop: function (i, node) {
              return 1;
            },
            paddingBottom: function (i, node) {
              return 1;
            },
          },
        },
      );
    }
    if (this.StoredData.D2RoofingCoveringStructure != null) {
      var RoofingCoveringStructure = ' ';
      for(let i=0; i<parseInt(this.StoredData.D2RoofingCoveringStructure.length); i++)
        {
          RoofingCoveringStructure = RoofingCoveringStructure + ' • ' + this.StoredData.D2RoofingCoveringStructure[i].text
        }
      docDefinition.content.push({
        fontSize: 10,
        columnGap: 5,
        color: '#ff0f06',
        columns: [
          [
            {
              text: 'Roof Covering:\n',
              margin: [30, 7, 0, 0],
              bold: 'true',
            },
          ],
          [
            {
              text: RoofingCoveringStructure,
              margin: [-50, 7, 0, 0],
            },
          ],
        ],
      });
    }
    if (this.StoredData.D2RoofingGuttersDownspoutsStructure != null) {
      var RoofingGuttersDownspoutsStructure = ' ';
      for(let i=0; i<parseInt(this.StoredData.D2RoofingGuttersDownspoutsStructure.length); i++)
        {
          RoofingGuttersDownspoutsStructure = RoofingGuttersDownspoutsStructure + ' • ' + this.StoredData.D2RoofingGuttersDownspoutsStructure[i].text
        }
      docDefinition.content.push({
        fontSize: 10,
        columnGap: 5,
        color: '#ff0f06',
        columns: [
          [
            {
              text: 'Gutters and Downspouts:\n',
              margin: [30, 3, 0, 0],
              bold: 'true',
            },
          ],
          [
            {
              text: RoofingGuttersDownspoutsStructure,
              margin: [-50, 3, 0, 0],
            },
          ],
        ],
      });
    }
    if (this.StoredData.D2RoofingMethodsStructure != null) {
      var RoofingMethodsStructure= ' ';
      for(let i=0; i<parseInt(this.StoredData.D2RoofingMethodsStructure.length); i++)
        {
          RoofingMethodsStructure = RoofingMethodsStructure + ' • ' + this.StoredData.D2RoofingMethodsStructure[i].text
        }
      docDefinition.content.push({
        fontSize: 10,
        columnGap: 5,
        color: '#ff0f06',
        columns: [
          [
            {
              text: 'Method of Inspection:\n',
              margin: [30, 3, 0, 0],
              bold: 'true',
            },
          ],
          [
            {
              text: RoofingMethodsStructure,
              margin: [-50, 3, 0, 0],
            },
          ],
        ],
      });
    }
    if (this.StoredData.D2RoofingChimneysStructure != null) {
      var RoofingChimneysStructure = ' ';
      for(let i=0; i<parseInt(this.StoredData.D2RoofingChimneysStructure.length); i++)
        {
          RoofingChimneysStructure = RoofingChimneysStructure + ' • ' + this.StoredData.D2RoofingChimneysStructure[i].text
        }
      docDefinition.content.push({
        fontSize: 10,
        columnGap: 5,
        color: '#ff0f06',
        columns: [
          [
            {
              text: 'Chimneys:\n',
              margin: [30, 3, 0, 0],
              bold: 'true',
            },
          ],
          [
            {
              text: RoofingChimneysStructure,
              margin: [-50, 3, 0, 0],
            },
          ],
        ],
      });
    }
    if (this.StoredData.roofingObservation != null) {
      docDefinition.content.push(
        {
          color: '#000000',
          margin: [0, 8, 0, 0],
          width: 300,
          table: {
            body: [
              [
                {
                  text: 'ROOFING OBSERVATIONS',
                  alignment: 'left',
                  style: 'subbox',
                },
              ],
            ],
          },
          layout: {
            hLineColor: function (i, node) {
              return 'black';
            },
            vLineColor: function (i, node) {
              return 'black';
            },
            paddingLeft: function (i, node) {
              return 15;
            },
            paddingRight: function (i, node) {
              return 336;
            },
            paddingTop: function (i, node) {
              return 1;
            },
            paddingBottom: function (i, node) {
              return 1;
            },
          },
        },
        {
          fontSize: 9.5,
          margin: [30, 10, 6, 0],
          color: '#ed3833',
          text: [
            {
              text: '\nGeneral Comments\n',
              bold: 'true',
            },
            {
              text: this.StoredData.roofingObservation,
            },
            {
              text: '\n\nRECOMMENDATIONS / OBSERVATIONS \n',
              bold: 'true',
            },
            {
              text: 'Sloped Roofing \n',
              bold: 'true',
            },
            {
              text:
                'Improve:  The roofing is nearing the later stages of its life cycle.  Minor repairs are recommended in the short term to maintain the weather tightness of the roof.  Damaged or missing roofing material should be repaired.  All roof penetrations should be examined and sealed as necessary. Some insurance companies are limiting coverage on homes with shingle roofs that are 15 years or older.\n\n',
            },
          ],
        }
      );
    }
    if (this.StoredData.roofingLimitations != null) {
      docDefinition.content.push(
        {
          color: '#000000',
          margin: [0, 8, 0, 0],
          width: 300,
          table: {
            body: [
              [
                {
                  text: 'LIMITATIONS OF ROOFING INSPECTION',
                  alignment: 'left',
                  style: 'subbox',
                },
              ],
            ],
          },
          layout: {
            hLineColor: function (i, node) {
              return 'black';
            },
            vLineColor: function (i, node) {
              return 'black';
            },
            paddingLeft: function (i, node) {
              return 15;
            },
            paddingRight: function (i, node) {
              return 258;
            },
            paddingTop: function (i, node) {
              return 1;
            },
            paddingBottom: function (i, node) {
              return 1;
            },
          },
        },
        {
          fontSize: 9.5,
          margin: [30, 10, 6, 0],
          color: 'black',
          text: [
            {
              text:
                'Roofs are designed to shed water like an umbrella and are not “waterproof”. In events of wind driven rains, and periods of intense rain, water can sometimes blow into areas such as ridge vents, roof vents and valleys and present leaking conditions. This occurrence is rare, but can possibly happen in severe storm events. Unless it is raining at the time of inspection, some roof leaks may not be identified during the inspection process. \n',
              bold: 'true',
            },
            {
              text:
                'As prescribed in the inspection authorization and agreement, this is a visual inspection only.  Roofing life expectancies can vary depending on several factors.  Any estimates of remaining life are approximations only.  This assessment of the roof does not preclude the possibility of leakage.  Leakage can develop at any time and may depend on rain intensity, wind direction, ice build up, etc.  The inspection of the roofing system was limited by (but not restricted to) the following conditions: \n',
            },
          ],
        },
        {
          margin: [30, 10, 6, 0],
          fontSize: 9.5,
          color: '#ed3833',
          ul: [
            this.StoredData.roofingLimitations[0], //tobe
            this.StoredData.roofingLimitations[1],
            this.StoredData.roofingLimitations[2]
          ],
        },
        {
          margin: [30, 10, 6, 0],
          fontSize: 9.5,
          text:
            'Please refer to the NACHI® Inspector Standards for a full explanation of the scope of the inspection. NACHI.org.\n\n',
        }
      );
    }
    if (
      this.StoredData.exteriorDescription != null ||
      this.StoredData.exteriorObservation != null ||
      this.StoredData.exteriorLimitations != null ||
      this.StoredData.D2ExteriorWallCladdingStructure != null || 
      this.StoredData.D2ExteriorSoffitFasciaStructure != null ||
      this.StoredData.D2ExteriorWindowDoorStructure != null ||
      this.StoredData.D2ExteriorDrivewaysStructureStructure != null ||
      this.StoredData.D2ExteriorOverheadGarageStructureStructure != null ||
      this.StoredData.D2ExteriorLotGradingStructureStructure != null) {
      docDefinition.content.push(
        {
          pageBreak: 'before',
          text: '',
          style: 'watermark',
          alignment: 'left',
          margin: [0, 0, 0, 0],
        },
        {
          color: '#000000',
          margin: [25, 10, 0, 0],
          table: {
            body: [
              [
                {
                  text: 'EXTERIOR',
                  alignment: 'center',
                  style: 'subheader',
                },
              ],
            ],
          },
          layout: {
            hLineColor: function (i, node) {
              return 'black';
            },
            vLineColor: function (i, node) {
              return 'black';
            },
            paddingLeft: function (i, node) {
              return 189;
            },
            paddingRight: function (i, node) {
              return 189;
            },
            paddingTop: function (i, node) {
              return 2;
            },
            paddingBottom: function (i, node) {
              return 2;
            },
          },
        }
      );
    }
    if (this.StoredData.exteriorDescription != null ||
      this.StoredData.D2ExteriorWallCladdingStructure != null || 
      this.StoredData.D2ExteriorSoffitFasciaStructure != null ||
      this.StoredData.D2ExteriorWindowDoorStructure != null ||
      this.StoredData.D2ExteriorDrivewaysStructureStructure != null ||
      this.StoredData.D2ExteriorOverheadGarageStructureStructure != null ||
      this.StoredData.D2ExteriorLotGradingStructureStructure != null ) {
      docDefinition.content.push(
        {
          color: '#000000',
          margin: [0, 8, 0, 0],
          width: 300,
          table: {
            body: [
              [
                {
                  text: 'DESCRIPTION OF EXTERIOR',
                  alignment: 'left',
                  style: 'subbox',
                },
              ],
            ],
          },
          layout: {
            hLineColor: function (i, node) {
              return 'black';
            },
            vLineColor: function (i, node) {
              return 'black';
            },
            paddingLeft: function (i, node) {
              return 15;
            },
            paddingRight: function (i, node) {
              return 324;
            },
            paddingTop: function (i, node) {
              return 1;
            },
            paddingBottom: function (i, node) {
              return 1;
            },
          },
        },
        /*
        {
          columnGap: 30,
          width: '50%',
          margin: [30, 5, 0, 0],
          fontSize: 9,
          color: '#ed3833',
          columns: [this.StoredData.exteriorDescription],
        }*/
      );
    }
    if (this.StoredData.D2ExteriorWallCladdingStructure != null) {
      var ExteriorWallCladdingStructure = ' ';
      for(let i=0; i<parseInt(this.StoredData.D2ExteriorWallCladdingStructure.length); i++)
        {
          ExteriorWallCladdingStructure = ExteriorWallCladdingStructure + ' • ' + this.StoredData.D2ExteriorWallCladdingStructure[i].text
        }
      docDefinition.content.push({
        fontSize: 10,
        columnGap: 5,
        color: '#ff0f06',
        columns: [
          [
            {
              text: 'Wall Cladding:\n',
              margin: [30, 7, 0, 0],
              bold: 'true',
            },
          ],
          [
            {
              text: ExteriorWallCladdingStructure,
              margin: [-50, 7, 0, 0],
            },
          ],
        ],
      });
    }
    if (this.StoredData.D2ExteriorSoffitFasciaStructure != null) {
      var ExteriorSoffitFasciaStructure = ' ';
      for(let i=0; i<parseInt(this.StoredData.D2ExteriorSoffitFasciaStructure.length); i++)
        {
          ExteriorSoffitFasciaStructure = ExteriorSoffitFasciaStructure + ' • ' + this.StoredData.D2ExteriorSoffitFasciaStructure[i].text
        }
      docDefinition.content.push({
        fontSize: 10,
        columnGap: 5,
        color: '#ff0f06',
        columns: [
          [
            {
              text: 'Soffit and Fascia:\n',
              margin: [30, 3, 0, 0],
              bold: 'true',
            },
          ],
          [
            {
              text: ExteriorSoffitFasciaStructure,
              margin: [-50, 3, 0, 0],
            },
          ],
        ],
      });
    }
    if (this.StoredData.D2ExteriorWindowDoorStructure != null) {
      var ExteriorWindowDoorStructure = ' ';
      for(let i=0; i<parseInt(this.StoredData.D2ExteriorWindowDoorStructure.length); i++)
        {
          ExteriorWindowDoorStructure = ExteriorWindowDoorStructure + ' • ' + this.StoredData.D2ExteriorWindowDoorStructure[i].text
        }
      docDefinition.content.push({
        fontSize: 10,
        columnGap: 5,
        color: '#ff0f06',
        columns: [
          [
            {
              text: 'Window/Door Frames and Trim:\n',
              margin: [30, 3, 0, 0],
              bold: 'true',
            },
          ],
          [
            {
              text: ExteriorWindowDoorStructure,
              margin: [-50, 3, 0, 0],
            },
          ],
        ],
      });
    }
    if (this.StoredData.D2ExteriorDrivewaysStructureStructure != null) {
      var ExteriorDrivewaysStructureStructure = ' ';
      for(let i=0; i<parseInt(this.StoredData.D2ExteriorDrivewaysStructureStructure.length); i++)
        {
          ExteriorDrivewaysStructureStructure = ExteriorDrivewaysStructureStructure + ' • ' + this.StoredData.D2ExteriorDrivewaysStructureStructure[i].text
        }
      docDefinition.content.push({
        fontSize: 10,
        columnGap: 5,
        color: '#ff0f06',
        columns: [
          [
            {
              text: 'Driveways:\n',
              margin: [30, 3, 0, 0],
              bold: 'true',
            },
          ],
          [
            {
              text: ExteriorDrivewaysStructureStructure,
              margin: [-50, 3, 0, 0],
            },
          ],
        ],
      });
    }
    if (this.StoredData.D2ExteriorOverheadGarageStructureStructure != null) {
      var ExteriorOverheadGarageStructure = ' ';
      for(let i=0; i<parseInt(this.StoredData.D2ExteriorOverheadGarageStructureStructure.length); i++)
        {
          ExteriorOverheadGarageStructure = ExteriorOverheadGarageStructure + ' • ' + this.StoredData.D2ExteriorOverheadGarageStructureStructure[i].text
        }
      docDefinition.content.push({
        fontSize: 10,
        columnGap: 5,
        color: '#ff0f06',
        columns: [
          [
            {
              text: 'Overhead Garage Door(s):\n',
              margin: [30, 3, 0, 0],
              bold: 'true',
            },
          ],
          [
            {
              text: ExteriorOverheadGarageStructure,
              margin: [-50, 3, 0, 0],
            },
          ],
        ],
      });
    }
    if (this.StoredData.D2ExteriorLotGradingStructureStructure != null) {
      var ExteriorLotGradingStructure = ' ';
      for(let i=0; i<parseInt(this.StoredData.D2ExteriorLotGradingStructureStructure.length); i++)
        {
          ExteriorLotGradingStructure = ExteriorLotGradingStructure + ' • ' + this.StoredData.D2ExteriorLotGradingStructureStructure[i].text
        }
      docDefinition.content.push({
        fontSize: 10,
        columnGap: 5,
        color: '#ff0f06',
        columns: [
          [
            {
              text: 'Lot Grading:\n',
              margin: [30, 3, 0, 0],
              bold: 'true',
            },
          ],
          [
            {
              text: ExteriorLotGradingStructure,
              margin: [-50, 3, 0, 0],
            },
          ],
        ],
      });
    }
    if (this.StoredData.exteriorObservation != null) {
      docDefinition.content.push(
        {
          color: '#000000',
          margin: [0, 8, 0, 0],
          width: 300,
          table: {
            body: [
              [
                {
                  text: 'EXTERIOR OBSERVATIONS',
                  alignment: 'left',
                  style: 'subbox',
                },
              ],
            ],
          },
          layout: {
            hLineColor: function (i, node) {
              return 'black';
            },
            vLineColor: function (i, node) {
              return 'black';
            },
            paddingLeft: function (i, node) {
              return 15;
            },
            paddingRight: function (i, node) {
              return 332;
            },
            paddingTop: function (i, node) {
              return 1;
            },
            paddingBottom: function (i, node) {
              return 1;
            },
          },
        },
        {
          fontSize: 9.5,
          margin: [30, 10, 6, 0],
          color: '#ed3833',
          text: [
            {
              text: 'General Comments\n',
              bold: 'true',
            },
            {
              text: this.StoredData.exteriorObservation,
            },
            {
              text: '\n\nRECOMMENDATIONS / OBSERVATIONS \n',
              fontSize: 11,
              bold: 'true',
              color: '#000000',
            },
            {
              text: 'Exterior and Garage\n',
              bold: 'true',
            },
          ],
        },
        {
          margin: [30, 10, 6, 0],
          fontSize: 9.5,
          color: '#ed3833',
          ul: [this.StoredData.exteriorObservation],
        }
      );
    }
    if (this.StoredData.exteriorLimitations != null) {
      docDefinition.content.push(
        {
          color: '#000000',
          margin: [0, 8, 0, 0],
          width: 300,
          table: {
            body: [
              [
                {
                  text: 'LIMITATIONS OF EXTERIOR INSPECTION',
                  alignment: 'left',
                  style: 'subbox',
                },
              ],
            ],
          },
          layout: {
            hLineColor: function (i, node) {
              return 'black';
            },
            vLineColor: function (i, node) {
              return 'black';
            },
            paddingLeft: function (i, node) {
              return 15;
            },
            paddingRight: function (i, node) {
              return 250;
            },
            paddingTop: function (i, node) {
              return 1;
            },
            paddingBottom: function (i, node) {
              return 1;
            },
          },
        },
        {
          fontSize: 9.5,
          margin: [30, 10, 6, 0],
          text: [
            {
              text:
                'The general topography of the area is such that it will be difficult to control storm water entirely.  During heavy rains, the accumulation of storm water on the lot may be unavoidable.\n',
            },
            {
              text:
                'As prescribed in the inspection authorization and agreement, this is a visual inspection only.  The inspection of the exterior was limited by (but not restricted to) the following conditions: \n',
            },
          ],
        },
        {
          margin: [30, 10, 6, 0],
          fontSize: 9.5,
          color: '#ed3833',
          ul: [this.StoredData.exteriorLimitations],
        },
        {
          margin: [30, 10, 6, 0],
          fontSize: 9.5,
          text:
            'Please refer to the NACHI® Inspector Standards for a full explanation of the scope of the inspection. NACHI.org.\n\n',
        }
      );
    }
    if (
      this.StoredData.electricalDescription != null ||
      this.StoredData.electricalObservation != null ||
      this.StoredData.electricalLimitations != null ||
      this.StoredData.D2electricalServiceEntryGroundStructure != null ||
      this.StoredData.D2electricalMainDisconnectStructure != null ||
      this.StoredData.D2electricalDistributionPanelStructure != null ||
      this.StoredData.D2electricalAuxilliaryStructureStructure != null ||
      this.StoredData.D2electricalWiringStructureStructure != null ||
      this.StoredData.D2electricalGroundFaultStructureStructure != null
    ) {
      docDefinition.content.push(
        {
          pageBreak: 'before',
          text: '',
          style: 'watermark',
          alignment: 'left',
          margin: [0, 0, 0, 0],
        },
        {
          color: '#000000',
          margin: [25, 10, 0, 0],
          table: {
            body: [
              [
                {
                  text: 'ELECTRICAL SYSTEM',
                  alignment: 'center',
                  style: 'subheader',
                },
              ],
            ],
          },
          layout: {
            hLineColor: function (i, node) {
              return 'black';
            },
            vLineColor: function (i, node) {
              return 'black';
            },
            paddingLeft: function (i, node) {
              return 134;
            },
            paddingRight: function (i, node) {
              return 134;
            },
            paddingTop: function (i, node) {
              return 2;
            },
            paddingBottom: function (i, node) {
              return 2;
            },
          },
        }
      );
    }
    if (this.StoredData.electricalDescription != null ||
      this.StoredData.D2electricalServiceEntryGroundStructure != null ||
      this.StoredData.D2electricalMainDisconnectStructure != null ||
      this.StoredData.D2electricalDistributionPanelStructure != null ||
      this.StoredData.D2electricalAuxilliaryStructureStructure != null ||
      this.StoredData.D2electricalWiringStructureStructure != null ||
      this.StoredData.D2electricalGroundFaultStructureStructure != null) {
      docDefinition.content.push(
        {
          color: '#000000',
          margin: [0, 8, 0, 0],
          width: 300,
          table: {
            body: [
              [
                {
                  text: 'DESCRIPTION OF ELECTRICAL SYSTEM',
                  alignment: 'left',
                  style: 'subbox',
                },
              ],
            ],
          },
          layout: {
            hLineColor: function (i, node) {
              return 'black';
            },
            vLineColor: function (i, node) {
              return 'black';
            },
            paddingLeft: function (i, node) {
              return 15;
            },
            paddingRight: function (i, node) {
              return 262;
            },
            paddingTop: function (i, node) {
              return 1;
            },
            paddingBottom: function (i, node) {
              return 1;
            },
          },
        },
        /*
        {
          columnGap: 30,
          width: '50%',
          margin: [30, 5, 0, 0],
          fontSize: 9,
          color: '#ed3833',
          columns: [this.StoredData.electricalDescription],
        }*/
      );
    }
    if (this.StoredData.D2electricalServiceEntryGroundStructure != null) {
      var D2electricalServiceEntryGroundStructure = ' ';
      for(let i=0; i<parseInt(this.StoredData.D2electricalServiceEntryGroundStructure.length); i++)
        {
          D2electricalServiceEntryGroundStructure = D2electricalServiceEntryGroundStructure + ' • ' + this.StoredData.D2electricalServiceEntryGroundStructure[i].text
        }
      docDefinition.content.push({
        fontSize: 10,
        columnGap: 5,
        color: '#ff0f06',
        columns: [
          [
            {
              text: 'Service Entrance Wires:\n',
              margin: [30, 7, 0, 0],
              bold: 'true',
            },
          ],
          [
            {
              text: D2electricalServiceEntryGroundStructure,
              margin: [-50, 7, 0, 0],
            },
          ],
        ],
      });
    }
    if (this.StoredData.D2electricalMainDisconnectStructure != null) {
      var D2electricalMainDisconnectStructure = ' ';
      for(let i=0; i<parseInt(this.StoredData.D2electricalMainDisconnectStructure.length); i++)
        {
          D2electricalMainDisconnectStructure = D2electricalMainDisconnectStructure + ' • ' + this.StoredData.D2electricalMainDisconnectStructure[i].text
        }
      docDefinition.content.push({
        fontSize: 10,
        columnGap: 5,
        color: '#ff0f06',
        columns: [
          [
            {
              text: 'Main Disconnect:\n',
              margin: [30, 3, 0, 0],
              bold: 'true',
            },
          ],
          [
            {
              text: D2electricalMainDisconnectStructure,
              margin: [-50, 3, 0, 0],
            },
          ],
        ],
      });
    }
    if (this.StoredData.D2electricalDistributionPanelStructure != null) {
      var D2electricalDistributionPanelStructure = ' ';
      for(let i=0; i<parseInt(this.StoredData.D2electricalDistributionPanelStructure.length); i++)
        {
          D2electricalDistributionPanelStructure = D2electricalDistributionPanelStructure + ' • ' + this.StoredData.D2electricalDistributionPanelStructure[i].text
        }
      docDefinition.content.push({
        fontSize: 10,
        columnGap: 5,
        color: '#ff0f06',
        columns: [
          [
            {
              text: 'Service Ground:\n',
              margin: [30, 3, 0, 0],
              bold: 'true',
            },
          ],
          [
            {
              text: D2electricalDistributionPanelStructure,
              margin: [-50, 3, 0, 0],
            },
          ],
        ],
      });
    }
    if (this.StoredData.D2electricalAuxilliaryStructureStructure != null) {
      var D2electricalAuxilliaryStructureStructure = ' ';
      for(let i=0; i<parseInt(this.StoredData.D2electricalAuxilliaryStructureStructure.length); i++)
        {
          D2electricalAuxilliaryStructureStructure = D2electricalAuxilliaryStructureStructure + ' • ' + this.StoredData.D2electricalAuxilliaryStructureStructure[i].text
        }
      docDefinition.content.push({
        fontSize: 10,
        columnGap: 5,
        color: '#ff0f06',
        columns: [
          [
            {
              text: 'Main Distribution Panel:\n',
              margin: [30, 3, 0, 0],
              bold: 'true',
            },
          ],
          [
            {
              text: D2electricalAuxilliaryStructureStructure,
              margin: [-50, 3, 0, 0],
            },
          ],
        ],
      });
    }
    if (this.StoredData.D2electricalWiringStructureStructure != null) {
      var D2electricalWiringStructureStructure = ' ';
      for(let i=0; i<parseInt(this.StoredData.D2electricalWiringStructureStructure.length); i++)
        {
          D2electricalWiringStructureStructure = D2electricalWiringStructureStructure + ' • ' + this.StoredData.D2electricalWiringStructureStructure[i].text
        }
      docDefinition.content.push({
        fontSize: 10,
        columnGap: 5,
        color: '#ff0f06',
        columns: [
          [
            {
              text: 'Distribution Wiring:\n',
              margin: [30, 3, 0, 0],
              bold: 'true',
            },
          ],
          [
            {
              text: D2electricalWiringStructureStructure,
              margin: [-50, 3, 0, 0],
            },
          ],
        ],
      });
    }
    if (this.StoredData.D2electricalGroundFaultStructureStructure != null) {
      var D2electricalGroundFaultStructureStructure = ' ';
      for(let i=0; i<parseInt(this.StoredData.D2electricalGroundFaultStructureStructure.length); i++)
        {
          D2electricalGroundFaultStructureStructure = D2electricalGroundFaultStructureStructure + ' • ' + this.StoredData.D2electricalGroundFaultStructureStructure[i].text
        }
      docDefinition.content.push({
        fontSize: 10,
        columnGap: 5,
        color: '#ff0f06',
        columns: [
          [
            {
              text: 'Ground Fault Circuit Interrupters:\n',
              margin: [30, 3, 0, 0],
              bold: 'true',
            },
          ],
          [
            {
              text: D2electricalGroundFaultStructureStructure,
              margin: [-50, 3, 0, 0],
            },
          ],
        ],
      });
    }
    if (this.StoredData.electricalObservation != null) {
      docDefinition.content.push(
        {
          color: '#000000',
          margin: [0, 8, 0, 0],
          width: 300,
          table: {
            body: [
              [
                {
                  text: 'ELECTRICAL OBSERVATIONS',
                  alignment: 'left',
                  style: 'subbox',
                },
              ],
            ],
          },
          layout: {
            hLineColor: function (i, node) {
              return 'black';
            },
            vLineColor: function (i, node) {
              return 'black';
            },
            paddingLeft: function (i, node) {
              return 15;
            },
            paddingRight: function (i, node) {
              return 319;
            },
            paddingTop: function (i, node) {
              return 1;
            },
            paddingBottom: function (i, node) {
              return 1;
            },
          },
        },
        {
          fontSize: 9.5,
          margin: [30, 10, 6, 0],
          color: '#ed3833',
          text: [
            {
              text: 'General Comments\n',
              bold: 'true',
            },
            {
              text: this.StoredData.electricalObservation,
            },
            {
              text: '\n\nRECOMMENDATIONS / OBSERVATIONS \n',
              fontSize: 11,
              bold: 'true',
              color: '#000000',
            },
            {
              text: 'Exterior and Garage\n',
              bold: 'true',
            },
          ],
        },
        {
          margin: [30, 10, 6, 0],
          fontSize: 9.5,
          color: '#ed3833',
          ul: [this.StoredData.electricalObservation],
        }
      );
    }
    if (this.StoredData.electricalLimitations != null) {
      docDefinition.content.push(
        {
          color: '#000000',
          margin: [0, 8, 0, 0],
          width: 300,
          table: {
            body: [
              [
                {
                  text: 'LIMITATIONS OF EXTERIOR INSPECTION',
                  alignment: 'left',
                  style: 'subbox',
                },
              ],
            ],
          },
          layout: {
            hLineColor: function (i, node) {
              return 'black';
            },
            vLineColor: function (i, node) {
              return 'black';
            },
            paddingLeft: function (i, node) {
              return 15;
            },
            paddingRight: function (i, node) {
              return 254;
            },
            paddingTop: function (i, node) {
              return 1;
            },
            paddingBottom: function (i, node) {
              return 1;
            },
          },
        },
        {
          fontSize: 9.5,
          margin: [30, 10, 6, 0],
          text: [
            {
              text:
                'As prescribed in the inspection authorization and agreement, this is a visual inspection only.  The inspection does not include low voltage systems, telephone wiring, intercoms, alarm systems, TV cable, timers or smoke detectors.  The inspection of the electrical system was limited by (but not restricted to) the following conditions:\n',
            },
          ],
        },
        {
          margin: [30, 10, 6, 0],
          fontSize: 9.5,
          color: '#ed3833',
          ul: [this.StoredData.electricalLimitations],
        },
        {
          margin: [30, 10, 6, 0],
          fontSize: 9.5,
          text:
            'Please refer to the NACHI® Inspector Standards for a full explanation of the scope of the inspection. NACHI.org.\n\n',
        }
      );
    }
    if (
      this.StoredData.coolingDescription != null ||
      this.StoredData.coolingObservation != null ||
      this.StoredData.coolingLimitations != null ||
      this.StoredData.D2coolingHVACEnergyStructure != null ||
      this.StoredData.D2coolingHVACTypeStructure != null ||
      this.StoredData.D2coolingHVACManufacturerStructure != null ||
      this.StoredData.D2coolingHVACDescriptionStructure != null ||
      this.StoredData.D2coolingHVACTemperatureStructure != null
    ) {
      docDefinition.content.push(
        {
          pageBreak: 'before',
          text: '',
          style: 'watermark',
          alignment: 'left',
          margin: [0, 0, 0, 0],
        },
        {
          color: '#000000',
          margin: [25, 10, 0, 0],
          table: {
            body: [
              [
                {
                  text: 'COOLING HVAC SYSTEM',
                  alignment: 'center',
                  style: 'subheader',
                },
              ],
            ],
          },
          layout: {
            hLineColor: function (i, node) {
              return 'black';
            },
            vLineColor: function (i, node) {
              return 'black';
            },
            paddingLeft: function (i, node) {
              return 117;
            },
            paddingRight: function (i, node) {
              return 117;
            },
            paddingTop: function (i, node) {
              return 2;
            },
            paddingBottom: function (i, node) {
              return 2;
            },
          },
        }
      );
    }
    if (this.StoredData.coolingDescription != null ||
      this.StoredData.D2coolingHVACEnergyStructure != null ||
      this.StoredData.D2coolingHVACTypeStructure != null ||
      this.StoredData.D2coolingHVACManufacturerStructure != null ||
      this.StoredData.D2coolingHVACDescriptionStructure != null ||
      this.StoredData.D2coolingHVACTemperatureStructure != null
      ) {
      docDefinition.content.push(
        {
          color: '#000000',
          margin: [0, 8, 0, 0],
          width: 300,
          table: {
            body: [
              [
                {
                  text: 'DESCRIPTION OF COOLING SYSTEM',
                  alignment: 'left',
                  style: 'subbox',
                },
              ],
            ],
          },
          layout: {
            hLineColor: function (i, node) {
              return 'black';
            },
            vLineColor: function (i, node) {
              return 'black';
            },
            paddingLeft: function (i, node) {
              return 15;
            },
            paddingRight: function (i, node) {
              return 278;
            },
            paddingTop: function (i, node) {
              return 1;
            },
            paddingBottom: function (i, node) {
              return 1;
            },
          },
        },
      );
    }
    if (this.StoredData.D2coolingHVACEnergyStructure != null) {
      var D2coolingHVACEnergyStructure = ' ';
      for(let i=0; i<parseInt(this.StoredData.D2coolingHVACEnergyStructure.length); i++)
        {
          D2coolingHVACEnergyStructure = D2coolingHVACEnergyStructure + ' • ' + this.StoredData.D2coolingHVACEnergyStructure[i].text
        }
      docDefinition.content.push({
        fontSize: 10,
        columnGap: 5,
        color: '#ff0f06',
        columns: [
          [
            {
              text: 'Energy Source:\n',
              margin: [30, 7, 0, 0],
              bold: 'true',
            },
          ],
          [
            {
              text: D2coolingHVACEnergyStructure,
              margin: [-50, 7, 0, 0],
            },
          ],
        ],
      });
    }
    if (this.StoredData.D2coolingHVACTypeStructure != null) {
      var D2coolingHVACTypeStructure = ' ';
      for(let i=0; i<parseInt(this.StoredData.D2coolingHVACTypeStructure.length); i++)
        {
          D2coolingHVACTypeStructure = D2coolingHVACTypeStructure + ' • ' + this.StoredData.D2coolingHVACTypeStructure[i].text
        }
      docDefinition.content.push({
        fontSize: 10,
        columnGap: 5,
        color: '#ff0f06',
        columns: [
          [
            {
              text: 'System Type:\n',
              margin: [30, 3, 0, 0],
              bold: 'true',
            },
          ],
          [
            {
              text: D2coolingHVACTypeStructure,
              margin: [-50, 3, 0, 0],
            },
          ],
        ],
      });
    }
    if (this.StoredData.D2coolingHVACManufacturerStructure != null) {
      var D2coolingHVACManufacturerStructure = ' ';
      for(let i=0; i<parseInt(this.StoredData.D2coolingHVACManufacturerStructure.length); i++)
        {
          D2coolingHVACManufacturerStructure = D2coolingHVACManufacturerStructure + ' • ' + this.StoredData.D2coolingHVACManufacturerStructure[i].text
        }
      docDefinition.content.push({
        fontSize: 10,
        columnGap: 5,
        color: '#ff0f06',
        columns: [
          [
            {
              text: 'System Manufacturer:\n',
              margin: [30, 3, 0, 0],
              bold: 'true',
            },
          ],
          [
            {
              text: D2coolingHVACManufacturerStructure,
              margin: [-50, 3, 0, 0],
            },
          ],
        ],
      });
    }
    if (this.StoredData.D2coolingHVACDescriptionStructure != null) {
      var D2coolingHVACDescriptionStructure = ' ';
      for(let i=0; i<parseInt(this.StoredData.D2coolingHVACDescriptionStructure.length); i++)
        {
          D2coolingHVACDescriptionStructure = D2coolingHVACDescriptionStructure + ' • ' + this.StoredData.D2coolingHVACDescriptionStructure[i].text
        }
      docDefinition.content.push({
        fontSize: 10,
        columnGap: 5,
        color: '#ff0f06',
        columns: [
          [
            {
              text: 'System Description:\n',
              margin: [30, 3, 0, 0],
              bold: 'true',
            },
          ],
          [
            {
              text: D2coolingHVACDescriptionStructure,
              margin: [-50, 3, 0, 0],
            },
          ],
        ],
      });
    }
    if (this.StoredData.D2coolingHVACTemperatureStructure != null) {
      var D2coolingHVACTemperatureStructure = ' ';
      for(let i=0; i<parseInt(this.StoredData.D2coolingHVACTemperatureStructure.length); i++)
        {
          D2coolingHVACTemperatureStructure = D2coolingHVACTemperatureStructure + ' • ' + this.StoredData.D2coolingHVACTemperatureStructure[i].text
        }
      docDefinition.content.push({
        fontSize: 10,
        columnGap: 5,
        color: '#ff0f06',
        columns: [
          [
            {
              text: 'Temperature Drop Recorded:\n',
              margin: [30, 3, 0, 0],
              bold: 'true',
            },
          ],
          [
            {
              text: D2coolingHVACTemperatureStructure,
              margin: [-50, 3, 0, 0],
            },
          ],
        ],
      });
    }
    if (this.StoredData.coolingObservation != null) {
      docDefinition.content.push(
        {
          color: '#000000',
          margin: [0, 8, 0, 0],
          width: 300,
          table: {
            body: [
              [
                {
                  text: 'SYSTEM OBSERVATIONS',
                  alignment: 'left',
                  style: 'subbox',
                },
              ],
            ],
          },
          layout: {
            hLineColor: function (i, node) {
              return 'black';
            },
            vLineColor: function (i, node) {
              return 'black';
            },
            paddingLeft: function (i, node) {
              return 15;
            },
            paddingRight: function (i, node) {
              return 340;
            },
            paddingTop: function (i, node) {
              return 1;
            },
            paddingBottom: function (i, node) {
              return 1;
            },
          },
        },
        {
          fontSize: 9.5,
          margin: [30, 10, 6, 0],
          color: '#ed3833',
          text: [
            {
              text: 'General Comments\n',
              bold: 'true',
            },
            {
              text: this.StoredData.coolingObservation,
            },
            {
              text: '\n\nRECOMMENDATIONS / OBSERVATIONS \n',
              fontSize: 11,
              bold: 'true',
              color: '#000000',
            },
            {
              text: 'HVAC\n',
              bold: 'true',
            },
          ],
        },
        {
          margin: [30, 10, 6, 0],
          fontSize: 9.5,
          color: '#ed3833',
          ul: [this.StoredData.coolingObservation],
        }
      );
    }
    if (this.StoredData.coolingLimitations != null) {
      docDefinition.content.push(
        {
          color: '#000000',
          margin: [0, 8, 0, 0],
          width: 300,
          table: {
            body: [
              [
                {
                  text: 'LIMITATIONS OF COOLING SYSTEM INSPECTION',
                  alignment: 'left',
                  style: 'subbox',
                },
              ],
            ],
          },
          layout: {
            hLineColor: function (i, node) {
              return 'black';
            },
            vLineColor: function (i, node) {
              return 'black';
            },
            paddingLeft: function (i, node) {
              return 15;
            },
            paddingRight: function (i, node) {
              return 208;
            },
            paddingTop: function (i, node) {
              return 1;
            },
            paddingBottom: function (i, node) {
              return 1;
            },
          },
        },
        {
          fontSize: 9.5,
          margin: [30, 10, 6, 0],
          text: [
            {
              text:
                'As of January 2006, air conditioning manufacturers are no longer allowed to manufacture products, or certain individual components (condensers, evaporator, compressors) for systems with less than a 13 SEER rating. As existing inventories of older efficiency style components are depleted, replacement of the A/C unit may be required in place of repairs.\n',
            },
            {
              text:
                'As prescribed in the inspection authorization and agreement, this is a visual inspection only.  Air conditioning and heat pump systems, like most mechanical components, can fail at any time.  The inspection of the cooling system was limited by (but not restricted to) the following conditions: \n',
            },
          ],
        },
        {
          margin: [30, 10, 6, 0],
          fontSize: 9.5,
          color: '#ed3833',
          ul: [this.StoredData.coolingLimitations],
        },
        {
          margin: [30, 10, 6, 0],
          fontSize: 9.5,
          text:
            'Please refer to the NACHI® Inspector Standards for a full explanation of the scope of the inspection. NACHI.org.\n\n',
        }
      );
    }
    if (
      this.StoredData.insulationDescription != null ||
      this.StoredData.insulationObservation != null ||
      this.StoredData.insulationLimitations != null ||
      this.StoredData.D2InsulationAtticStructure != null ||
      this.StoredData.D2InsulationRoofStructure != null ||
      this.StoredData.D2InsulationExhastVentStructure != null
    ) {
      docDefinition.content.push(
        {
          pageBreak: 'before',
          text: '',
          style: 'watermark',
          alignment: 'left',
          margin: [0, 0, 0, 0],
        },
        {
          color: '#000000',
          margin: [25, 10, 0, 0],
          table: {
            body: [
              [
                {
                  text: 'INSULATION/VENTILATION',
                  alignment: 'center',
                  style: 'subheader',
                },
              ],
            ],
          },
          layout: {
            hLineColor: function (i, node) {
              return 'black';
            },
            vLineColor: function (i, node) {
              return 'black';
            },
            paddingLeft: function (i, node) {
              return 104;
            },
            paddingRight: function (i, node) {
              return 104;
            },
            paddingTop: function (i, node) {
              return 2;
            },
            paddingBottom: function (i, node) {
              return 2;
            },
          },
        }
      );
    }
    if (this.StoredData.insulationDescription != null ||
      this.StoredData.D2InsulationAtticStructure != null ||
      this.StoredData.D2InsulationRoofStructure != null ||
      this.StoredData.D2InsulationExhastVentStructure != null
      ) {
      docDefinition.content.push(
        {
          color: '#000000',
          margin: [0, 8, 0, 0],
          width: 300,
          table: {
            body: [
              [
                {
                  text: 'DESCRIPTION OF INSULATION / VENTILATION',
                  alignment: 'left',
                  style: 'subbox',
                },
              ],
            ],
          },
          layout: {
            hLineColor: function (i, node) {
              return 'black';
            },
            vLineColor: function (i, node) {
              return 'black';
            },
            paddingLeft: function (i, node) {
              return 15;
            },
            paddingRight: function (i, node) {
              return 217;
            },
            paddingTop: function (i, node) {
              return 1;
            },
            paddingBottom: function (i, node) {
              return 1;
            },
          },
        },
      );
    }
    if (this.StoredData.D2InsulationAtticStructure != null) {
      var D2InsulationAtticStructure = ' ';
      for(let i=0; i<parseInt(this.StoredData.D2InsulationAtticStructure.length); i++)
        {
          D2InsulationAtticStructure = D2InsulationAtticStructure + ' • ' + this.StoredData.D2InsulationAtticStructure[i].text
        }
      docDefinition.content.push({
        fontSize: 10,
        columnGap: 5,
        color: '#ff0f06',
        columns: [
          [
            {
              text: 'Attic Insulation:\n',
              margin: [30, 7, 0, 0],
              bold: 'true',
            },
          ],
          [
            {
              text: D2InsulationAtticStructure,
              margin: [-50, 7, 0, 0],
            },
          ],
        ],
      });
    }
    if (this.StoredData.D2InsulationRoofStructure != null) {
      var D2InsulationRoofStructure = ' ';
      for(let i=0; i<parseInt(this.StoredData.D2InsulationRoofStructure.length); i++)
        {
          D2InsulationRoofStructure = D2InsulationRoofStructure + ' • ' + this.StoredData.D2InsulationRoofStructure[i].text
        }
      docDefinition.content.push({
        fontSize: 10,
        columnGap: 5,
        color: '#ff0f06',
        columns: [
          [
            {
              text: 'Roof Ventilation:\n',
              margin: [30, 3, 0, 0],
              bold: 'true',
            },
          ],
          [
            {
              text: D2InsulationRoofStructure,
              margin: [-50, 3, 0, 0],
            },
          ],
        ],
      });
    }
    if (this.StoredData.D2InsulationExhastVentStructure != null) {
      var D2InsulationExhastVentStructure = ' ';
      for(let i=0; i<parseInt(this.StoredData.D2InsulationExhastVentStructure.length); i++)
        {
          D2InsulationExhastVentStructure = D2InsulationExhastVentStructure + ' • ' + this.StoredData.D2InsulationExhastVentStructure[i].text
        }
      docDefinition.content.push({
        fontSize: 10,
        columnGap: 5,
        color: '#ff0f06',
        columns: [
          [
            {
              text: 'Exhaust Fan/vent Locations:\n',
              margin: [30, 3, 0, 0],
              bold: 'true',
            },
          ],
          [
            {
              text: D2InsulationExhastVentStructure,
              margin: [-50, 3, 0, 0],
            },
          ],
        ],
      });
    }
    if (this.StoredData.insulationObservation != null) {
      docDefinition.content.push(
        {
          color: '#000000',
          margin: [0, 8, 0, 0],
          width: 300,
          table: {
            body: [
              [
                {
                  text: 'INSULATION / VENTILATION OBSERVATIONS ',
                  alignment: 'left',
                  style: 'subbox',
                },
              ],
            ],
          },
          layout: {
            hLineColor: function (i, node) {
              return 'black';
            },
            vLineColor: function (i, node) {
              return 'black';
            },
            paddingLeft: function (i, node) {
              return 15;
            },
            paddingRight: function (i, node) {
              return 225;
            },
            paddingTop: function (i, node) {
              return 1;
            },
            paddingBottom: function (i, node) {
              return 1;
            },
          },
        },
        {
          fontSize: 9.5,
          margin: [30, 10, 6, 0],
          color: '#ed3833',
          text: [
            {
              text: 'General Comments\n',
              bold: 'true',
            },
            {
              text: this.StoredData.insulationObservation,
            },
            {
              text: '\n\nRECOMMENDATIONS / OBSERVATIONS \n',
              fontSize: 11,
              bold: 'true',
              color: '#000000',
            },
            {
              text: 'Attic / Roof\n',
              bold: 'true',
            },
          ],
        },
        {
          margin: [30, 10, 6, 0],
          fontSize: 9.5,
          color: '#ed3833',
          ul: [this.StoredData.insulationObservation],
        }
      );
    }
    if (this.StoredData.insulationLimitations != null) {
      docDefinition.content.push(
        {
          color: '#000000',
          margin: [0, 8, 0, 0],
          width: 300,
          table: {
            body: [
              [
                {
                  text: 'LIMITATIONS OF INSULATION / VENTILATION INSPECTION',
                  alignment: 'left',
                  style: 'subbox',
                },
              ],
            ],
          },
          layout: {
            hLineColor: function (i, node) {
              return 'black';
            },
            vLineColor: function (i, node) {
              return 'black';
            },
            paddingLeft: function (i, node) {
              return 15;
            },
            paddingRight: function (i, node) {
              return 140;
            },
            paddingTop: function (i, node) {
              return 1;
            },
            paddingBottom: function (i, node) {
              return 1;
            },
          },
        },
        {
          fontSize: 9.5,
          margin: [30, 10, 6, 0],
          text: [
            {
              text:
                'As prescribed in the inspection authorization and agreement, this is a visual inspection only.  The inspection of insulation and ventilation was limited by (but not restricted to) the following conditions:\n',
            },
          ],
        },
        {
          margin: [30, 10, 6, 0],
          fontSize: 9.5,
          color: '#ed3833',
          ul: [
            this.StoredData.insulationLimitations, //tobe
            //this.StoredData.coolingLimitations[1],
            //this.StoredData.coolingLimitations[2],
          ],
        },
        {
          margin: [30, 10, 6, 0],
          fontSize: 9.5,
          text:
            'Please refer to the NACHI® Inspector Standards for a full explanation of the scope of the inspection. NACHI.org.\n\n',
        }
      );
    }
    if (
      this.StoredData.plumbingDescription != null ||
      this.StoredData.plumbingObservation != null ||
      this.StoredData.plumbingLimitations != null ||
      this.StoredData.D2PlumbingWaterSuppStructure != null ||
      this.StoredData.D2PlumbingServicePipeStructure != null ||
      this.StoredData.D2PlumbingSuppyPipingStructure != null ||
      this.StoredData.D2PlumbingWasteSystemStructure != null ||
      this.StoredData.D2PlumbingDrainStructureStructure != null ||
      this.StoredData.D2PlumbingWaterHeaterPressureStructure != null
    ) {
      docDefinition.content.push(
        {
          pageBreak: 'before',
          text: '',
          style: 'watermark',
          alignment: 'left',
          margin: [0, 0, 0, 0],
        },
        {
          color: '#000000',
          margin: [25, 10, 0, 0],
          table: {
            body: [
              [
                {
                  text: 'PLUMBING SYSTEM',
                  alignment: 'center',
                  style: 'subheader',
                },
              ],
            ],
          },
          layout: {
            hLineColor: function (i, node) {
              return 'black';
            },
            vLineColor: function (i, node) {
              return 'black';
            },
            paddingLeft: function (i, node) {
              return 141;
            },
            paddingRight: function (i, node) {
              return 141;
            },
            paddingTop: function (i, node) {
              return 2;
            },
            paddingBottom: function (i, node) {
              return 2;
            },
          },
        }
      );
    }
    if (this.StoredData.plumbingDescription != null ||
      this.StoredData.D2PlumbingWaterSuppStructure != null ||
      this.StoredData.D2PlumbingServicePipeStructure != null ||
      this.StoredData.D2PlumbingSuppyPipingStructure != null ||
      this.StoredData.D2PlumbingWasteSystemStructure != null ||
      this.StoredData.D2PlumbingDrainStructureStructure != null ||
      this.StoredData.D2PlumbingWaterHeaterPressureStructure != null) {
      docDefinition.content.push(
        {
          color: '#000000',
          margin: [0, 8, 0, 0],
          width: 300,
          table: {
            body: [
              [
                {
                  text: 'DESCRIPTION OF PLUMBING SYSTEM',
                  alignment: 'left',
                  style: 'subbox',
                },
              ],
            ],
          },
          layout: {
            hLineColor: function (i, node) {
              return 'black';
            },
            vLineColor: function (i, node) {
              return 'black';
            },
            paddingLeft: function (i, node) {
              return 15;
            },
            paddingRight: function (i, node) {
              return 267;
            },
            paddingTop: function (i, node) {
              return 1;
            },
            paddingBottom: function (i, node) {
              return 1;
            },
          },
        }
      );
    }
    if (this.StoredData.D2PlumbingWaterSuppStructure != null) {
      var D2PlumbingWaterSuppStructure = ' ';
      for(let i=0; i<parseInt(this.StoredData.D2PlumbingWaterSuppStructure.length); i++)
        {
          D2PlumbingWaterSuppStructure = D2PlumbingWaterSuppStructure + ' • ' + this.StoredData.D2PlumbingWaterSuppStructure[i].text
        }
      docDefinition.content.push({
        fontSize: 10,
        columnGap: 5,
        color: '#ff0f06',
        columns: [
          [
            {
              text: 'Water Supply Source:\n',
              margin: [30, 7, 0, 0],
              bold: 'true',
            },
          ],
          [
            {
              text: D2PlumbingWaterSuppStructure,
              margin: [-50, 7, 0, 0],
            },
          ],
        ],
      });
    }
    if (this.StoredData.D2PlumbingServicePipeStructure != null) {
      var D2PlumbingServicePipeStructure = ' ';
      for(let i=0; i<parseInt(this.StoredData.D2PlumbingServicePipeStructure.length); i++)
        {
          D2PlumbingServicePipeStructure = D2PlumbingServicePipeStructure + ' • ' + this.StoredData.D2PlumbingServicePipeStructure[i].text
        }
      docDefinition.content.push({
        fontSize: 10,
        columnGap: 5,
        color: '#ff0f06',
        columns: [
          [
            {
              text: 'Service Pipe to House:\n',
              margin: [30, 3, 0, 0],
              bold: 'true',
            },
          ],
          [
            {
              text: D2PlumbingServicePipeStructure,
              margin: [-50, 3, 0, 0],
            },
          ],
        ],
      });
    }
    if (this.StoredData.D2PlumbingSuppyPipingStructure != null) {
      var D2PlumbingSuppyPipingStructure = ' ';
      for(let i=0; i<parseInt(this.StoredData.D2PlumbingSuppyPipingStructure.length); i++)
        {
          D2PlumbingSuppyPipingStructure = D2PlumbingSuppyPipingStructure + ' • ' + this.StoredData.D2PlumbingSuppyPipingStructure[i].text
        }
      docDefinition.content.push({
        fontSize: 10,
        columnGap: 5,
        color: '#ff0f06',
        columns: [
          [
            {
              text: 'Supply Piping:\n',
              margin: [30, 3, 0, 0],
              bold: 'true',
            },
          ],
          [
            {
              text: D2PlumbingSuppyPipingStructure,
              margin: [-50, 3, 0, 0],
            },
          ],
        ],
      });
    }
    if (this.StoredData.D2PlumbingWasteSystemStructure != null) {
      var D2PlumbingWasteSystemStructure = ' ';
      for(let i=0; i<parseInt(this.StoredData.D2PlumbingWasteSystemStructure.length); i++)
        {
          D2PlumbingWasteSystemStructure = D2PlumbingWasteSystemStructure + ' • ' + this.StoredData.D2PlumbingWasteSystemStructure[i].text
        }
      docDefinition.content.push({
        fontSize: 10,
        columnGap: 5,
        color: '#ff0f06',
        columns: [
          [
            {
              text: 'Waste System:\n',
              margin: [30, 3, 0, 0],
              bold: 'true',
            },
          ],
          [
            {
              text: D2PlumbingWasteSystemStructure,
              margin: [-50, 3, 0, 0],
            },
          ],
        ],
      });
    }
    if (this.StoredData.D2PlumbingDrainStructureStructure != null) {
      var D2PlumbingDrainStructureStructure = ' ';
      for(let i=0; i<parseInt(this.StoredData.D2PlumbingDrainStructureStructure.length); i++)
        {
          D2PlumbingDrainStructureStructure = D2PlumbingDrainStructureStructure + ' • ' + this.StoredData.D2PlumbingDrainStructureStructure[i].text
        }
      docDefinition.content.push({
        fontSize: 10,
        columnGap: 5,
        color: '#ff0f06',
        columns: [
          [
            {
              text: 'Drain / Waste / Vent Piping:\n',
              margin: [30, 3, 0, 0],
              bold: 'true',
            },
          ],
          [
            {
              text: D2PlumbingDrainStructureStructure,
              margin: [-50, 3, 0, 0],
            },
          ],
        ],
      });
    }
    if (this.StoredData.D2PlumbingWaterHeaterPressureStructure != null) {
      var D2PlumbingWaterHeaterPressureStructure = ' ';
      for(let i=0; i<parseInt(this.StoredData.D2PlumbingWaterHeaterPressureStructure.length); i++)
        {
          D2PlumbingWaterHeaterPressureStructure = D2PlumbingWaterHeaterPressureStructure + ' • ' + this.StoredData.D2PlumbingWaterHeaterPressureStructure[i].text
        }
      docDefinition.content.push({
        fontSize: 10,
        columnGap: 5,
        color: '#ff0f06',
        columns: [
          [
            {
              text: 'Water Heater:\n',
              margin: [30, 3, 0, 0],
              bold: 'true',
            },
          ],
          [
            {
              text: D2PlumbingWaterHeaterPressureStructure,
              margin: [-50, 3, 0, 0],
            },
          ],
        ],
      });
    }
    if (this.StoredData.plumbingObservation != null) {
      docDefinition.content.push(
        {
          color: '#000000',
          margin: [0, 8, 0, 0],
          width: 300,
          table: {
            body: [
              [
                {
                  text: 'PLUMBING OBSERVATIONS',
                  alignment: 'left',
                  style: 'subbox',
                },
              ],
            ],
          },
          layout: {
            hLineColor: function (i, node) {
              return 'black';
            },
            vLineColor: function (i, node) {
              return 'black';
            },
            paddingLeft: function (i, node) {
              return 15;
            },
            paddingRight: function (i, node) {
              return 328;
            },
            paddingTop: function (i, node) {
              return 1;
            },
            paddingBottom: function (i, node) {
              return 1;
            },
          },
        },
        {
          fontSize: 9.5,
          margin: [30, 10, 6, 0],
          color: '#ed3833',
          text: [
            {
              text: 'General Comments\n',
              bold: 'true',
            },
            {
              text: this.StoredData.plumbingObservation,
            },
            {
              text: '\n\nRECOMMENDATIONS / OBSERVATIONS \n',
              fontSize: 11,
              bold: 'true',
              color: '#000000',
            },
            {
              text: this.StoredData.plumbingObservationRecommendations,
              bold: 'true',
            },
          ],
        },
        {
          margin: [30, 10, 6, 0],
          fontSize: 9.5,
          color: '#ed3833',
          ul: [this.StoredData.plumbingObservation],
        }
      );
    }
    if (this.StoredData.plumbingLimitations != null) {
      docDefinition.content.push(
        {
          color: '#000000',
          margin: [0, 8, 0, 0],
          width: 300,
          table: {
            body: [
              [
                {
                  text: 'LIMITATIONS OF PLUMBING INSPECTION',
                  alignment: 'left',
                  style: 'subbox',
                },
              ],
            ],
          },
          layout: {
            hLineColor: function (i, node) {
              return 'black';
            },
            vLineColor: function (i, node) {
              return 'black';
            },
            paddingLeft: function (i, node) {
              return 15;
            },
            paddingRight: function (i, node) {
              return 248;
            },
            paddingTop: function (i, node) {
              return 1;
            },
            paddingBottom: function (i, node) {
              return 1;
            },
          },
        },
        {
          fontSize: 9.5,
          margin: [30, 10, 6, 0],
          text: [
            {
              text:
                'As prescribed in the inspection authorization and agreement, this is a visual inspection only.  The inspection of the plumbing system was limited by (but not restricted to) the following conditions:\n',
            },
          ],
        },
        {
          margin: [30, 10, 6, 0],
          fontSize: 9.5,
          color: '#ed3833',
          ul: [
            this.StoredData.plumbingLimitations, //tobe
            //this.StoredData.coolingLimitations[1],
            //this.StoredData.coolingLimitations[2],
          ],
        },
        {
          margin: [30, 10, 6, 0],
          fontSize: 9.5,
          text:
            'Please refer to the NACHI® Inspector Standards for a full explanation of the scope of the inspection. NACHI.org.\n\n',
        }
      );
    }
    if (
      this.StoredData.interiorDescription != null ||
      this.StoredData.interiorObservation != null ||
      this.StoredData.interiorLimitations != null
    ) {
      docDefinition.content.push(
        {
          pageBreak: 'before',
          text: '',
          style: 'watermark',
          alignment: 'left',
          margin: [0, 0, 0, 0],
        },
        {
          color: '#000000',
          margin: [25, 10, 0, 0],
          table: {
            body: [
              [
                {
                  text: 'INTERIOR',
                  alignment: 'center',
                  style: 'subheader',
                },
              ],
            ],
          },
          layout: {
            hLineColor: function (i, node) {
              return 'black';
            },
            vLineColor: function (i, node) {
              return 'black';
            },
            paddingLeft: function (i, node) {
              return 191;
            },
            paddingRight: function (i, node) {
              return 191;
            },
            paddingTop: function (i, node) {
              return 2;
            },
            paddingBottom: function (i, node) {
              return 2;
            },
          },
        }
      );
    }
    if (this.StoredData.interiorDescription != null) {
      docDefinition.content.push(
        {
          color: '#000000',
          margin: [0, 8, 0, 0],
          width: 300,
          table: {
            body: [
              [
                {
                  text: 'DESCRIPTION OF INTERIOR',
                  alignment: 'left',
                  style: 'subbox',
                },
              ],
            ],
          },
          layout: {
            hLineColor: function (i, node) {
              return 'black';
            },
            vLineColor: function (i, node) {
              return 'black';
            },
            paddingLeft: function (i, node) {
              return 15;
            },
            paddingRight: function (i, node) {
              return 325;
            },
            paddingTop: function (i, node) {
              return 1;
            },
            paddingBottom: function (i, node) {
              return 1;
            },
          },
        },
        {
          columnGap: 30,
          width: '50%',
          margin: [0, 5, 0, 0],
          fontSize: 9,
          color: '#ed3833',
          columns: [this.StoredData.interiorDescription],
        }
      );
    }
    if (this.StoredData.interiorObservation != null) {
      docDefinition.content.push(
        {
          color: '#000000',
          margin: [0, 8, 0, 0],
          width: 300,
          table: {
            body: [
              [
                {
                  text: 'INTERIOR OBSERVATIONS',
                  alignment: 'left',
                  style: 'subbox',
                },
              ],
            ],
          },
          layout: {
            hLineColor: function (i, node) {
              return 'black';
            },
            vLineColor: function (i, node) {
              return 'black';
            },
            paddingLeft: function (i, node) {
              return 15;
            },
            paddingRight: function (i, node) {
              return 333;
            },
            paddingTop: function (i, node) {
              return 1;
            },
            paddingBottom: function (i, node) {
              return 1;
            },
          },
        },
        {
          fontSize: 9.5,
          margin: [30, 10, 6, 0],
          color: '#ed3833',
          text: [
            {
              text: 'General Condition of Interior Finishes\n',
              bold: 'true',
            },
            {
              text: this.StoredData.interiorObservation,
            },
            {
              text: '\n\nRECOMMENDATIONS / OBSERVATIONS \n',
              fontSize: 11,
              bold: 'true',
              color: '#000000',
            },
            {
              text: this.StoredData.interiorObservationRecommendations,
              bold: 'true',
            },
          ],
        },
        {
          margin: [30, 10, 6, 0],
          fontSize: 9.5,
          color: '#ed3833',
          ul: [this.StoredData.interiorObservation],
        }
      );
    }
    if (this.StoredData.interiorLimitations != null) {
      docDefinition.content.push(
        {
          color: '#000000',
          margin: [0, 8, 0, 0],
          width: 300,
          table: {
            body: [
              [
                {
                  text: 'LIMITATIONS OF INTERIOR INSPECTION',
                  alignment: 'left',
                  style: 'subbox',
                },
              ],
            ],
          },
          layout: {
            hLineColor: function (i, node) {
              return 'black';
            },
            vLineColor: function (i, node) {
              return 'black';
            },
            paddingLeft: function (i, node) {
              return 15;
            },
            paddingRight: function (i, node) {
              return 247;
            },
            paddingTop: function (i, node) {
              return 1;
            },
            paddingBottom: function (i, node) {
              return 1;
            },
          },
        },
        {
          fontSize: 9.5,
          margin: [30, 10, 6, 0],
          text: [
            {
              text:
                'Double paned windows will eventually lose their seal.  This will result in condensation developing between the panes of glass.  This “fogging” of the glass is primarily a cosmetic concern, and need only be improved for cosmetic or contractual reasons. The degree of visual “fogging” or condensation can vary with temperature and humidity conditions. At times, the fogging may be barely noticeable. While replacement of noticeably fogged windows may be desirable, other windows may be budgeted for and replaced as they become more noticeable.  Lighting conditions such as overcast skies can make seeing broken seals difficult\n',
            },
            {
              text:
                'As prescribed in the inspection authorization and agreement, this is a visual inspection only.  Assessing the quality and condition of interior finishes is highly subjective.  Issues such as cleanliness, cosmetic flaws, quality of materials, architectural appeal and color are outside the scope of this inspection.  Comments will be general, except where functional concerns exist.  No comment is offered on the extent of cosmetic repairs that may be needed after removal of existing wall hangings and furniture.  The inspection of the interior was limited by (but not restricted to) the following conditions\n',
            },
          ],
        },
        {
          margin: [30, 10, 6, 0],
          fontSize: 9.5,
          color: '#ed3833',
          ul: [
            this.StoredData.interiorLimitations, //tobe
            //this.StoredData.coolingLimitations[1],
            //this.StoredData.coolingLimitations[2],
          ],
        },
        {
          margin: [30, 10, 6, 0],
          fontSize: 9.5,
          text:
            'Please refer to the NACHI® Inspector Standards for a full explanation of the scope of the inspection. NACHI.org.\n\n',
        }
      );
    }
    if (
      this.StoredData.applianceDescription != null ||
      this.StoredData.applianceObservation != null ||
      this.StoredData.applianceLimitations != null
    ) {
      docDefinition.content.push(
        {
          pageBreak: 'before',
          text: '',
          style: 'watermark',
          alignment: 'left',
          margin: [0, 0, 0, 0],
        },
        {
          color: '#000000',
          margin: [25, 10, 0, 0],
          table: {
            body: [
              [
                {
                  text: 'APPLIANCES',
                  alignment: 'center',
                  style: 'subheader',
                },
              ],
            ],
          },
          layout: {
            hLineColor: function (i, node) {
              return 'black';
            },
            vLineColor: function (i, node) {
              return 'black';
            },
            paddingLeft: function (i, node) {
              return 176;
            },
            paddingRight: function (i, node) {
              return 176;
            },
            paddingTop: function (i, node) {
              return 2;
            },
            paddingBottom: function (i, node) {
              return 2;
            },
          },
        }
      );
    }
    if (this.StoredData.applianceDescription != null) {
      docDefinition.content.push(
        {
          color: '#000000',
          margin: [0, 8, 0, 0],
          width: 300,
          table: {
            body: [
              [
                {
                  text: 'DESCRIPTION OF APPLIANCES',
                  alignment: 'left',
                  style: 'subbox',
                },
              ],
            ],
          },
          layout: {
            hLineColor: function (i, node) {
              return 'black';
            },
            vLineColor: function (i, node) {
              return 'black';
            },
            paddingLeft: function (i, node) {
              return 15;
            },
            paddingRight: function (i, node) {
              return 310;
            },
            paddingTop: function (i, node) {
              return 1;
            },
            paddingBottom: function (i, node) {
              return 1;
            },
          },
        },
        {
          columnGap: 30,
          width: '50%',
          margin: [30, 5, 0, 0],
          fontSize: 9,
          color: '#ed3833',
          columns: [this.StoredData.applianceDescription],
        }
      );
    }
    if (this.StoredData.applianceObservation != null) {
      docDefinition.content.push(
        {
          color: '#000000',
          margin: [0, 8, 0, 0],
          width: 300,
          table: {
            body: [
              [
                {
                  text: 'APPLIANCE OBSERVATIONS',
                  alignment: 'left',
                  style: 'subbox',
                },
              ],
            ],
          },
          layout: {
            hLineColor: function (i, node) {
              return 'black';
            },
            vLineColor: function (i, node) {
              return 'black';
            },
            paddingLeft: function (i, node) {
              return 15;
            },
            paddingRight: function (i, node) {
              return 328;
            },
            paddingTop: function (i, node) {
              return 1;
            },
            paddingBottom: function (i, node) {
              return 1;
            },
          },
        },
        {
          fontSize: 9.5,
          margin: [30, 10, 6, 0],
          color: '#ed3833',
          text: [
            {
              text: 'General Comments\n',
              bold: 'true',
            },
            {
              text: this.StoredData.applianceObservation,
            },
            {
              text: '\n\nRECOMMENDATIONS / OBSERVATIONS \n',
              fontSize: 11,
              bold: 'true',
              color: '#000000',
            },
          ],
        },
        {
          margin: [30, 10, 6, 0],
          fontSize: 9.5,
          color: '#ed3833',
          ul: [this.StoredData.applianceObservationRecommendations],
        }
      );
    }
    if (this.StoredData.applianceLimitations != null) {
      docDefinition.content.push(
        {
          color: '#000000',
          margin: [0, 8, 0, 0],
          width: 300,
          table: {
            body: [
              [
                {
                  text: 'LIMITATIONS OF APPLIANCES INSPECTION',
                  alignment: 'left',
                  style: 'subbox',
                },
              ],
            ],
          },
          layout: {
            hLineColor: function (i, node) {
              return 'black';
            },
            vLineColor: function (i, node) {
              return 'black';
            },
            paddingLeft: function (i, node) {
              return 15;
            },
            paddingRight: function (i, node) {
              return 248;
            },
            paddingTop: function (i, node) {
              return 1;
            },
            paddingBottom: function (i, node) {
              return 1;
            },
          },
        },
        {
          fontSize: 9.5,
          margin: [30, 10, 6, 0],
          text: [
            {
              text:
                'As prescribed in the inspection authorization and agreement, this is a visual inspection only.  Appliances are tested by turning them on for a short period of time only. It is strongly recommended that a Homeowner’s Warranty or service contract be purchased to cover the operation of appliances.  It is further recommended that appliances be tested during any scheduled pre-closing walk through.  Like any mechanical device, appliances can malfunction at any time (including the day after taking possession of the house).  The inspection of the appliances was limited by (but not restricted to) the following conditions:\n',
            },
          ],
        },
        {
          margin: [30, 10, 6, 0],
          fontSize: 9.5,
          color: '#ed3833',
          ul: [
            this.StoredData.applianceLimitations, //tobe
            //this.StoredData.coolingLimitations[1],
            //this.StoredData.coolingLimitations[2],
          ],
        },
        {
          margin: [30, 10, 6, 0],
          fontSize: 9.5,
          text:
            'Please refer to the NACHI® Inspector Standards for a full explanation of the scope of the inspection. NACHI.org.\n\n',
        }
      );
    }
    docDefinition.content.push(
      {
        pageBreak: 'before',
        text: '',
        style: 'watermark',
        alignment: 'left',
        margin: [0, 0, 0, 0],
      },
      {
        color: '#ff0000',
        margin: [15, 0, 0, 0],
        table: {
          body: [
            [
              {
                text: 'AUTHORIZATION AGREEMENT',
                alignment: 'center',
                style: 'subheader_2',
              },
            ],
          ],
        },
        layout: {
          hLineColor: function (i, node) {
            return 'black';
          },
          vLineColor: function (i, node) {
            return 'black';
          },
          paddingLeft: function (i, node) {
            return 93;
          },
          paddingRight: function (i, node) {
            return 90;
          },
          paddingTop: function (i, node) {
            return 2;
          },
          paddingBottom: function (i, node) {
            return 2;
          },
        },
      },
      {
        margin: [30, 17, 0, 8],
        columns: [
          {
            stack: [
              'A Professional Inspection Service (A Pro), herein after known as the Inspector agrees to conduct an inspection for the purpose of informing the client of major deficiencies in the condition of the property listed on the cover page of the report. THE WRITTEN REPORT IS THE PROPERTY OFTHE INSPECTOR AND THE CLIENT AND SHALL NOT BE USED BY OR TRANSFERRED TO ANY OTHER PERSON OR COMPANY WITHOUT BOTH THE INSPECTOR’S AND THE CLIENTS WRITTEN CONSENT.',
            ],
            fontSize: 9.5,
            color: '#ff0000',
          },
        ],
      },
      {
        text:
          'This is an Agreement between you, the undersigned Client, and us, the Inspector, pertaining to our inspection of the Property at:\n Listed on the cover page of the report.  The terms below govern this Agreement.\n\n',
        style: 'paraData_2',
        italics: 'true',
        color: '#ff0000',
      },
      {
        style: 'aggrementOL',
        /*ol: [
          'The fee for our inspection is the price payable in full at the time of the appointment.\n\n',
          'We will perform a visual inspection of the home/building and provide you with a written report identifying the defects that we (1) observed and (2) deemed material.  The report is only supplementary to the seller’s disclosure.\n\n',
          'Unless otherwise noted in this Agreement or not possible, we will perform the inspection in accordance with the current Standards of Practice (SOP) of the International Association of Certified Home Inspectors (“InterNACHI”) posted at www.nachi.org/sop  If your jurisdiction has adopted mandatory standards that differ from InterNACHI’s SOP, we will perform the inspection in accordance with your jurisdiction’s standards.  You understand that InterNACHI’s SOP contains limitations, exceptions, and exclusions.  You understand that InterNACHI is not a party to this Agreement, has no control over us, and does not employ or supervise us.',
          'Unless otherwise indicated in writing, we will NOT test for the presence of radon, a harmful gas.  Unless otherwise indicated in writing, we will not test for mold.  Unless otherwise indicated in writing, we will not test for compliance with applicable building codes or for the presence of or for any potential dangers arising from the presence of asbestos, lead paint, soil contamination, or other environmental hazards or violations.  If any structure you want us to inspect is a log structure or includes log construction, you understand that such structures have unique characteristics that may make it impossible for us to inspect and evaluate them.  Therefore, the scope of our inspection will not include decay of the interior of logs in log walls, log foundations or roofs, or similar defects.\n\n',
          'Our inspection and report are for your use only.  You give us permission to discuss our observations with real estate agents, owners, repair persons, or other interested parties. You will be the sole owner of the report and all rights to it.  We are not responsible for use or misinterpretation by third parties, and third parties who rely on it in any way do so at their own risk and release us (including employees and business entities) from any liability whatsoever. If you or any person acting on your behalf provide the report to a third party who then sues you and/or us, you release us from any liability and agree to pay our costs and legal fees in defending any action naming us. Our inspection and report are in no way a guarantee or warranty, express or implied, regarding the future use, operability, habitability or suitability of the home/building or its components. We disclaim all warranties, express or implied, to the fullest extent allowed by law.\n\n Liquidated Damages- Limited Liability Clause \n\n',
          'Due to the nature of the services we are providing, it is difficult to foresee or determine (at the time this Agreement is formed) potential damages in the event of negligence or breach of Agreement by us. Thus, if we fail to perform the services as provided herein or are careless and negligent in the performance of the Services and/or preparing the report, our liability any and all claims related thereto is limited to the fee paid for the Services and or preparing the Report and you release us from any and all additional liability, whether based on contract, tort, or any other legal theory. There will be no recovery for consequential damages. You understand the performance of the Services without this limitation would be more technically exhaustive, likely require specialties and would cost substantially more than the fee paid for this limited visual inspection.\nWe assume no liability for the cost of repair or replacement of unreported defects, either current or arising in the future. In all cases, our liability is limited to liquidate damages in an amount not greater than the fee you paid us.  You waive any claim for consequential, exemplary, special or incidental damages or for the loss of the use of the home/building.  You acknowledge that this liquidated damages is not a penalty, but that we intend it to: (i) reflect the fact that actual damages may be difficult or impractical to ascertain; (ii) allocate risk between us; and (iii) enable us to perform the inspection for the agreed-upon fee.\n\n',
          'We do not perform engineering, architectural, plumbing, or any other job function requiring an occupational license in the jurisdiction where the property is located.  If we hold a valid occupational license, we may inform you of this and you may hire us to perform additional functions. Any agreement for such additional services shall be in a separate writing.\n\n',
          'Dispute Resolution-Arbitration Clause\nAny dispute, controversy, interpretation or claim including claims for, but not limited to, breach of contract, any form of negligence, fraud, or misinterpretation arising out of, from or related to, this contractor arising out of, from or related to the inspection or inspection report shall be submitted first to a Non-Binding Mediation conference and absent a voluntary settlement through Non-Binding Mediation to followed by final and Binding Arbitration, if necessary, as conducted by Construction Dispute Resolution Services, LLC or Resolute Systems Inc. utilizing their respective Rules and Procedures. If the dispute is submitted to Binding Arbitration, the decision of the Arbitrator appointed there under shall be final and binding and the enforcement of the Arbitration Award may be entered in any Court or administrative tribunal having jurisdiction thereof.\n\n',
          'If you believe you have a claim against us, you agree to provide us with the following: (1) written notification of your claim within seven days of discovery in sufficient detail and with sufficient supporting documents that we can evaluate it; and (2) immediate access to the premises.  Failure to comply with these conditions releases us from liability.\n\n',
          'You agree that the exclusive venue for any litigation arising out of this Agreement shall be in the county where we have our principal place of business.  If you fail to prove any claim against us, you agree to pay all our legal costs, expenses and attorney’s fees incurred in defending that claim. You agree that the exclusive venue for any legal action against InterNACHI itself, allegedly arising out of this Agreement or our membership in InterNACHI, will be in Boulder County, Colorado.  Before bringing any such action, you must provide InterNACHI with 30 days’ written notice of the nature of the claim in sufficient detail and with sufficient supporting documents that InterNACHI can evaluate it.  In any action against us or InterNACHI, you waive trial by jury.\n\n',
          'If a court declares any provision of this Agreement invalid, the remaining provisions remain in effect.  This Agreement represents our entire agreement; there are no terms other than those set forth herein.  All prior discussions are merged into this Agreement.  No statement or promise by us shall be binding unless reduced to writing and signed by one of our authorized officers.  Any modification of this Agreement must be in writing and signed by you and by one of our authorized officers. This Agreement shall be binding upon and enforceable by the parties and their heirs, executors, administrators, successors and assignees. You will have no cause of action against us after one year from the date of the inspection.\n\n',
          'Past-due fees for your inspection shall accrue interest at 8% per year.  You agree to pay all costs and attorney’s fees we incur in collecting the fees owed to us.  If the Client is a corporation, LLC, or similar entity, you personally guarantee payment of the fee\n\n',
          'If you request a re-inspection, the re-inspection is subject to the terms of this Agreement. \n\n',
          'You may not assign this Agreement.\n\n',
          'If a court finds any term of this Agreement ambiguous or requiring judicial interpretation, the court shall not construe that term against us by reason of the rule that any ambiguity in a document is construed against the party drafting it.  You had the opportunity to consult qualified counsel before signing this.\n\n',
          'If there is more than one Client, you are signing on behalf of all of them, and you represent that you are authorized to do so.\n\n',
          'If you would like a large print version of this Agreement before signing it, you may request one by emailing us.\n\n',
          'If you elect to participate in InterNACHI’s Buy-Back Program, you will be bound by the terms you may view at www.nachi.org/buy. \n\n' 
        ],*/

        ol: [this.StoredData.generalDescription],
      }
    );

    this.pdfObj = pdfMake.createPdf(docDefinition);
    this.pdfObjBtn = true;
    console.log(this.pdfObj);

    this.downloadPdf();
  }

  downloadPdf() {
    if (this.GetFileDownloadType == 2) {
      this.DownloadPDF = false;
      this.PreviewPDF = false;
    }

    if (this.GetFileDownloadType == 1) {
      this.PreviewPDF = false;
      this.DownloadPDF = false;
    }

    let n = this.GetFileDownloadType;

    console.log('opop---' + this.GetFileDownloadType);

    if (n == 2) {
      if (this.plt.is('cordova')) {
        console.log('Came for download');
        this.androidPermissions
          .requestPermissions([
            this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
            this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
          ])
          .then((res) => {
            console.log(res);
          });

        this.pdfObj.getBuffer((buffer) => {
          var blob = new Blob([buffer], { type: 'application/pdf' });

          this.file
            .writeFile(
              this.file.externalRootDirectory,
              this.selPDFname + '.pdf',
              blob,
              {
                replace: true,
              }
            )
            .then((fileEntry) => {
              console.log(fileEntry);
              this.PreviewPDF = false;
              // console.log(fileEntry.nativeURL);

              // this.file.download(this.selPDFname + '.pdf');
              // this.fileOpener.open(
              //   this.file.dataDirectory + this.selPDFname + '.pdf',
              //   'application/pdf'
              // );
              let nameD = this.selPDFname + '.pdf';
              // const imageLocation = `${cordova.file.applicationDirectory}www/assets/${nameD}`;
              const imageLocation = `${cordova.file.externalRootDirectory}${nameD}`;

              const imglo = fileEntry.nativeURL;
              // alert('imageLocation'+imageLocation);
              this.fileTransfer
                .download(
                  imageLocation,
                  cordova.file.externalDataDirectory + nameD
                )
                .then(
                  (entry) => {
                    // alert('File saved!');
                    console.log(
                      'Downloaded successfully.' + JSON.stringify(entry)
                    );
                  },
                  (error) => {
                    console.log('Error downloading.' + JSON.stringify(error));
                  }
                );
            });
        });
      } else {
        // this.PreviewPDF = false;

        if (this.GetFileDownloadType == 2) {
          this.DownloadPDF = false;
          this.PreviewPDF = false;
        }

        if (this.GetFileDownloadType == 1) {
          this.PreviewPDF = false;
          this.DownloadPDF = false;
        }

        this.pdfObj.download(this.selPDFname + '.pdf');
      }
    }

    if (n == 1) {
      if (this.plt.is('cordova')) {
        this.pdfObj.getBuffer((buffer) => {
          var blob = new Blob([buffer], { type: 'application/pdf' });

          this.file
            .writeFile(
              this.file.dataDirectory,
              this.selPDFname + '.pdf',
              blob,
              {
                replace: true,
              }
            )
            .then((fileEntry) => {
              // this.PreviewPDF = false;

              if (this.GetFileDownloadType == 2) {
                this.DownloadPDF = false;
                this.PreviewPDF = false;
              }

              if (this.GetFileDownloadType == 1) {
                this.PreviewPDF = false;
                this.DownloadPDF = false;
              }

              // this.file.download(this.selPDFname + '.pdf');
              this.fileOpener.open(
                this.file.dataDirectory + this.selPDFname + '.pdf',
                'application/pdf'
              );
            });
        });
      } else {
        // this.PreviewPDF = false;

        if (this.GetFileDownloadType == 2) {
          this.DownloadPDF = false;
          this.PreviewPDF = false;
        }

        if (this.GetFileDownloadType == 1) {
          this.PreviewPDF = false;
          this.DownloadPDF = false;
        }

        this.pdfObj.download(this.selPDFname + '.pdf');
      }
    }
  }

  DownloadFile() {
    // let url = encodeURI(filePath);
    // this.fileTransfer = this.transfer.create();
  }
  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute('crossOrigin', '');

      img.onload = () => {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL('image/png');

        resolve(dataURL);
      };

      img.onerror = (error) => {
        reject(error);
      };

      img.src = url;
    });
  }
}
