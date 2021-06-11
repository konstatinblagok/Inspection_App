import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { CommonService } from '../../common.function';
import { ReportSelectionPage } from '../../../app/modal/report-selection/report-selection.page';
import { StructureSelectionPage } from '../../../app/modal/structure-selection/structure-selection.page';
import { NavParams } from '@ionic/angular';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { Base64 } from '@ionic-native/base64/ngx';

@Component({
  selector: 'app-common-selection',
  templateUrl: './common-selection.page.html',
  styleUrls: ['./common-selection.page.scss'],
  providers: [File, FileOpener, Base64],
})
export class CommonSelectionPage implements OnInit {
  inspectionTypes: any = [];
  pdfObjBtn = false;
  clientDetails: any;
  InspectionToEdit: any;
  StoredData: any;
  pdfObj = null;
  base64File: any;
  constructor(
    public modalController: ModalController,
    private navParams: NavParams,
    private plt: Platform,
    public config: CommonService,
    private file: File,
    private fileOpener: FileOpener,
    private base64: Base64
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

    if (n.val == '1') {
      console.log(n);

      var modal = await this.modalController.create({
        cssClass: 'update-popup-modal',
        component: StructureSelectionPage,
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

  async createPdf() {
    this.StoredData = JSON.parse(
      this.config.storageGet('InspectionToEdit')['__zone_symbol__value']
    );

    console.log(this.StoredData);
    let Logo_Header = '../../../assets/logo.png';
    let BackgroundHouse = '../../../assets/background.png';
    var docDefinition = {
      content: [
        {
          image: await this.getBase64ImageFromURL(Logo_Header),
          width: 180,
          height: 70,
          margin: [0, -20, 0, 0],
        },
        {
          text: 'HOME INSPECTION REPORT',
          style: 'header',
          alignment: 'right',
          margin: [0, -40, 0, 25],
        },
        {
          columns: [
            {
              stack: ['424 Mayberry Street', 'Cantonment, FL', '32533'],
              fontSize: 15,
              bold: true,
              alignment: 'right',
              margin: [0, 5, 0, 10],
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
              x2: 195,
              y2: 5,
              lineWidth: 0.8,
            },
          ],
          alignment: 'right',
          margin: [0, 5, 0, 5],
        },
        {
          columnGap: 30,
          width: '50%',
          columns: [
            [
              {
                image: await this.getBase64ImageFromURL(BackgroundHouse),
                width: 300,
              },
            ],
            [
              {
                text: 'Inspection Date:',
                style: 'ptitle',
                alignment: 'center',
                margin: [-10, 0, 0, 0],
              },
              {
                text: this.StoredData.client_Info[0].inspectionDate,
                alignment: 'center',
                style: 'pdata',
                margin: [15, 0, 0, 7],
              },
              { text: 'Prepared For:', style: 'ptitle', alignment: 'center' },
              {
                text: this.StoredData.client_Info[0].clientName,
                alignment: 'center',
                style: 'pdata',
                margin: [23, 0, 0, 7],
              },
              { text: 'Prepared By:', style: 'ptitle', alignment: 'center' },
              {
                text:
                  'A Pro Inspection Service\n 4702  Bay Breeze Dr Gulf\n Breeze, FL 32563, USA',
                margin: [60, 0, 0, 7],
                style: 'pdata',
              },
              {
                text: 'Report Number',
                style: 'ptitle',
                alignment: 'center',
                margin: [-17, 0, 0, 0],
              },
              {
                text: this.StoredData.client_Info[0].reportNumber,
                alignment: 'center',
                style: 'pdata',
                margin: [23, 0, 0, 7],
              },
              {
                text: 'Inspector',
                style: 'ptitle',
                alignment: 'center',
                margin: [8, 0, 0, 0],
              },
              {
                text: this.StoredData.client_Info[0].inspector,
                alignment: 'center',
                style: 'pdata',
                margin: [19, 0, 0, 7],
              },
              {
                text: 'Inspection Address',
                style: 'ptitle',
                alignment: 'center',
                margin: [-37, 0, 0, 0],
              },
              {
                text: this.StoredData.client_Info[0].inspectionAddress,
                alignment: 'center',
                style: 'pdata',
                margin: [23, 0, 0, 5],
              },
            ],
          ],
        },

        {
          text: new Date().toTimeString(),
          alignment: 'right',
          style: 'watermark',
          margin: [0, 390, 0, 0],
          pageBreak: 'after',
        },
        /*{
          text: '424 Mayberry Street Cantonment, FL 32533\t Page 2 of 22',
          style: 'watermark',
          alignment: 'right',
          margin: [0, -10, 0, 0]
        },*/
        {
          text: 'Table of Contents',
          alignment: 'right',
          margin: [0, 110, 0, 10],
          style: 'toc',
        },
        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 5,
              x2: 510,
              y2: 5,
              lineWidth: 1.2,
            },
          ],
          alignment: 'center',
          margin: [0, 5, 0, 27],
        },
        {
          columnGap: 30,
          columns: [
            [
              {
                text: 'Home Inspection Report',
                style: 'tocContents',
                alignment: 'left',
              },
            ],
            [{ text: '1', alignment: 'right', style: 'tocContents' }],
          ],
        },
        {
          columnGap: 30,
          columns: [
            [
              {
                text: 'Report Overview and Summary',
                style: 'tocContents',
                alignment: 'left',
              },
            ],
            [{ text: '3', alignment: 'right', style: 'tocContents' }],
          ],
        },
        {
          columnGap: 30,
          columns: [
            [
              {
                text: 'Structural Foundation',
                style: 'tocContents',
                alignment: 'left',
              },
            ],
            [{ text: '9', alignment: 'right', style: 'tocContents' }],
          ],
        },
        {
          columnGap: 30,
          columns: [
            [{ text: 'Roffing', style: 'tocContents', alignment: 'left' }],
            [{ text: '10', alignment: 'right', style: 'tocContents' }],
          ],
        },
        {
          columnGap: 30,
          columns: [
            [{ text: 'Exterior', style: 'tocContents', alignment: 'left' }],
            [{ text: '11', alignment: 'right', style: 'tocContents' }],
          ],
        },
        {
          columnGap: 30,
          columns: [
            [
              {
                text: 'Electrical System',
                style: 'tocContents',
                alignment: 'left',
              },
            ],
            [{ text: '12', alignment: 'right', style: 'tocContents' }],
          ],
        },
        {
          columnGap: 30,
          columns: [
            [
              {
                text: 'Cooling HVAC System',
                style: 'tocContents',
                alignment: 'left',
              },
            ],
            [{ text: '13', alignment: 'right', style: 'tocContents' }],
          ],
        },
        {
          columnGap: 30,
          columns: [
            [
              {
                text: 'Insulation / Ventilation',
                style: 'tocContents',
                alignment: 'left',
              },
            ],
            [{ text: '14', alignment: 'right', style: 'tocContents' }],
          ],
        },
        {
          columnGap: 30,
          columns: [
            [
              {
                text: 'Plumbing System',
                style: 'tocContents',
                alignment: 'left',
              },
            ],
            [{ text: '15', alignment: 'right', style: 'tocContents' }],
          ],
        },
        {
          columnGap: 30,
          columns: [
            [{ text: 'Interior', style: 'tocContents', alignment: 'left' }],
            [{ text: '16', alignment: 'right', style: 'tocContents' }],
          ],
        },
        {
          columnGap: 30,
          columns: [
            [{ text: 'Appliances', style: 'tocContents', alignment: 'left' }],
            [{ text: '17', alignment: 'right', style: 'tocContents' }],
          ],
        },
        {
          columnGap: 30,
          columns: [
            [
              {
                text: 'Maintance Advice',
                style: 'tocContents',
                alignment: 'left',
              },
            ],
            [
              {
                text: '20',
                alignment: 'right',
                style: 'tocContents',
                pageBreak: 'after',
              },
            ],
          ],
        },
        /*{
          text: '424 Mayberry Street Cantonment, FL 32533\t Page 3 of 22',
          style: 'watermark',
          alignment: 'right',
          margin: [0, -10, 0, 20]
        },
        { text: 'REPORT OVERVIEW AND SUMMARY', style: 'subheader' },
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
        {
          text: 'HOME INSPECTION REPORT',
          style: 'story',
          margin: [0, 40, 0, 20],
        },
        {
          ul: ['Structure', 'Roofing', 'Exterior', 'Electrical', 'Heating'],
        },*/
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
          margin: [0, 17, 0, 8],
          columns: [
            {
              stack: [
                'Please read the entire report. There may be items of concern in the body of the report that are not noted in the summary. It would be prudent to address any and all items of concern to the buyer prior to referencing repairs.\n\n',
                'Many homes may have circumstances where construction practices or standards have changed since the home was built. Updating/upgrading systems are not a requirement if the home was built to the standards of the day construction was completed. It would be cost prohibitive to bring everything to current standards for every home.',
              ],
              fontSize: 10,
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
              fontSize: 10,
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
              fontSize: 10,
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
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 5,
              x2: 500,
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
          fontSize: 10,
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
            'Note: Observations listed under “Discretionary Improvements” are not essential repairs, but represent logical long-term improvements. Conditions may exist that are conducive to the growth and formation of mold and mold spores.  These conditions are, but not confined to, the presence of',
          fontSize: 8,
          margin: [0, 1, 0, 1],
        },
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
          alignment: 'right',
          margin: [0, 1, 0, 1],
        },
        {
          text:
            'This confidential report is prepared exclusively for Brian and Tabatha Clinton',
          style: 'footer',
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
          alignment: 'right',
          margin: [0, -2, 0, 0],
        },

        { text: 'STRUCTURAL/ FOUNDATION', style: 'subheader' },

        {
          columnGap: 30,
          columns: [
            [{ text: 'Description', style: 'tocContents', alignment: 'left' }],
          ],
        },

        {
          columnGap: 30,
          columns: [this.StoredData.structureDescription],
        },

        {
          columnGap: 30,
          columns: [
            [{ text: 'Observation', style: 'tocContents', alignment: 'left' }],
          ],
        },

        {
          columnGap: 30,
          columns: [this.StoredData.structureObservation],
        },

        {
          columnGap: 30,
          columns: [
            [{ text: 'Comments', style: 'tocContents', alignment: 'left' }],
          ],
        },

        {
          columnGap: 30,
          columns: [this.StoredData.structureComments],
        },

        {
          columnGap: 30,
          columns: [
            [{ text: 'Limitations', style: 'tocContents', alignment: 'left' }],
          ],
        },

        {
          columnGap: 30,
          columns: [this.StoredData.structureLimitations],
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          aligment: '',
        },
        headerAddress: {
          color: '#ed3833',
          bold: true,
        },
        toc: {
          fontSize: 24,
          bold: true,
        },
        tocContents: {
          fontSize: 16,
          bold: true,
          margin: [0, 0, 0, 13],
        },
        watermark: {
          bold: true,
          fontSize: 7,
          color: '#ed3833',
        },
        ptitle: {
          bold: true,
          fontSize: 10.5,
        },
        footer: {
          alignment: 'right',
          color: '#ed3833',
          bold: true,
          fontSize: 10,
        },
        pdata: {
          color: '#ed3833',
          fontSize: 10.5,
          bold: true,
        },
        paraData: {
          fontSize: 10,
          bold: true,
        },
        subheader: {
          fontSize: 22,
          bold: true,
          color: '#000000',
        },
        subbox: {
          fontSize: 14,
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

    this.pdfObj = pdfMake.createPdf(docDefinition);
    this.pdfObjBtn = true;
    console.log(this.pdfObj);
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

  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');

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
