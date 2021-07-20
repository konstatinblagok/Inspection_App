import { Component, OnInit } from '@angular/core';
import { ModalController, Platform, AlertController } from '@ionic/angular';
import { CommonService } from '../../common.function';
// import { ReportSelectionPage } from '../../../app/modal/report-selection/report-selection.page';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { CommonSelectionPage } from '../../../app/modal/common-selection/common-selection.page';

@Component({
  selector: 'app-general-information',
  templateUrl: './general-information.page.html',
  styleUrls: ['./general-information.page.scss'],
  providers: [FormBuilder],
})
export class GeneralInformationPage implements OnInit {
  PreviewPDF = false;
  inspectionTypes: any = [];
  generalDescriptionContent: any = [];
  generalContent: any = [];
  StructureCommentsContent: any = [];
  electricalLimitationsContent: any = [];
  public createInpForm: FormGroup;
  HouseInModes: any = [];
  Description = false;
  Description2 = false;
  selectedIndex: any;
  selectedIndex2: any;
  Selected_Item_to_add: any;
  Selected_Item_to_add2: any;
  Selected_Item_to_add3: any;
  Selected_Item_to_add4: any;
  touchtime = 0;
  disable_ = true;
  added_items: any = [];
  added_items2: any = [];
  added_items3: any = [];
  added_items4: any = [];
  obArr = [];
  itemsToDelete: any;
  itemsToDelete2: any;
  itemsToDelete3: any;
  itemsToDelete4: any;
  StoredData: any;
  Observations_UI: boolean = false;
  Comments_UI: boolean = false;
  Limitations_UI: boolean = false;
  Obersations_UI_Recommendations = false;
  itemsToDeleteObs: any;
  generalContentRecommendations: any;

  constructor(
    public modalController: ModalController,
    private formBuilder: FormBuilder,
    private plt: Platform,
    public config: CommonService,
    private alertController: AlertController
  ) {
    this.inspectionTypes = [
      // {
      //   name: 'General Description',

      //   val: '1',
      // },
      {
        name: 'General Content',

        val: '2',
      },

      // {
      //   name: 'General Comments',

      //   val: '3',
      // },

      // {
      //   name: 'Limitations',

      //   val: '4',
      // },

      // {
      //   name: 'Recommendations',

      //   val: '5',
      // },
    ];

    this.generalDescriptionContent = this.config.generalDescriptionContent;
    this.generalContent = this.config.generalContent;
    // this.generalContentRecommendations = this.config.generalContent;
    // this.electricalLimitationsContent = this.config.ElectricalLimitationsContent;

    this.HouseInModes = [
      {
        name: 'No Comment',

        formValue: '1',
      },
      {
        name: 'Well Built/ Maintainedt',

        formValue: '2',
      },
    ];
    this.createInpForm = this.formBuilder.group({
      houseInModes: ['', [Validators.required]],
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

  ionViewDidEnter() {
    let StorageDate = this.config.storageGet('InspectionToEdit')[
      '__zone_symbol__value'
    ];
    if (StorageDate != undefined) {
      this.StoredData = JSON.parse(StorageDate);
      console.log(this.StoredData);

      if (this.StoredData['generalDescription'] != undefined) {
        this.added_items = this.StoredData['generalDescription'];
      }

      if (this.StoredData['generalContent'] != undefined) {
        this.added_items2 = this.StoredData['generalContent'];
      }

      if (this.StoredData['structureComments'] != undefined) {
        this.added_items3 = this.StoredData['structureComments'];
      }

      if (this.StoredData['electricalLimitations'] != undefined) {
        this.added_items4 = this.StoredData['electricalLimitations'];
      }

      if (this.StoredData['generalContentRecommendations'] != undefined) {
        this.added_items3 = this.StoredData['generalContentRecommendations'];
      }
    }
  }

  async goToSelection(n) {
    // this.BackPressed = true;
    if (n.val == '1') {
      console.log(n);
      this.Description = true;
      this.Observations_UI = false;
      this.Comments_UI = false;
      this.Limitations_UI = false;
      this.Obersations_UI_Recommendations = false;
    }
    if (n.val == '2') {
      console.log(n);
      this.Description = false;
      this.Observations_UI = true;
      this.Comments_UI = false;
      this.Limitations_UI = false;
      this.Obersations_UI_Recommendations = false;
    }
    if (n.val == '3') {
      console.log(n);
      this.Description = false;
      this.Observations_UI = false;
      this.Comments_UI = true;
      this.Limitations_UI = false;
      this.Obersations_UI_Recommendations = false;
    }
    if (n.val == '4') {
      console.log(n);
      this.Description = false;
      this.Observations_UI = false;
      this.Comments_UI = false;
      this.Limitations_UI = true;
      this.Obersations_UI_Recommendations = false;
    }

    if (n.val == '5') {
      console.log(n);
      this.Obersations_UI_Recommendations = true;
      this.Description = false;
      this.Observations_UI = false;
      this.Comments_UI = false;
      this.Limitations_UI = false;
    }
  }

  saveReport() {
    console.log(this.createInpForm.value);
  }

  closeDescription() {
    this.Description = false;
    this.Observations_UI = false;
    this.Comments_UI = false;
    this.Limitations_UI = false;
    this.Obersations_UI_Recommendations = false;
  }

  selectItem2(_index: number, data) {
    this.selectedIndex = _index;
    this.Selected_Item_to_add = data;

    if (this.touchtime == 0) {
      // set first click
      this.disable_ = false;
      this.touchtime = new Date().getTime();
    } else {
      // compare first click to this click and see if they occurred within double click threshold
      if (new Date().getTime() - this.touchtime < 800) {
        // double click occurred

        this.DB_Click_AddNewItem();
        this.touchtime = 0;
      } else {
        // not a double click so set as a new first click
        this.touchtime = new Date().getTime();
      }
    }
  }

  selectItem2Rem(i, n) {
    console.log(i);
    console.log(n);
    this.selectedIndex2 = i;
    this.itemsToDelete2 = n;
  }
  selectItem2Remove(i, n) {
    console.log(i);
    console.log(n);
    this.selectedIndex2 = i;
    this.itemsToDelete = n;
  }

  selectItem22(_index: number, data, ev) {
    this.selectedIndex = _index;
    this.Selected_Item_to_add2 = data;

    if (ev.detail.checked == true) {
      this.itemsToDelete2 = data;
      this.removeContent22();
      this.DB_Click_AddNewItem2();
    }
    if (ev.detail.checked == false) {
      this.itemsToDelete2 = data;
      this.removeContent22();
    }

    // if (this.touchtime == 0) {
    //   // set first click
    //   this.disable_ = false;
    //   this.touchtime = new Date().getTime();
    // } else {
    //   // compare first click to this click and see if they occurred within double click threshold
    //   if (new Date().getTime() - this.touchtime < 800) {
    //     // double click occurred

    //     this.DB_Click_AddNewItem2();
    //     this.touchtime = 0;
    //   } else {
    //     // not a double click so set as a new first click
    //     this.touchtime = new Date().getTime();
    //   }
    // }
  }

  selectItem33(i, n) {
    console.log(i);
    console.log(n);
    this.selectedIndex2 = i;
    this.itemsToDelete3 = n;
  }

  selectItem4(_index: number, data) {
    this.selectedIndex = _index;
    this.Selected_Item_to_add4 = data;

    if (this.touchtime == 0) {
      // set first click
      this.disable_ = false;
      this.touchtime = new Date().getTime();
    } else {
      // compare first click to this click and see if they occurred within double click threshold
      if (new Date().getTime() - this.touchtime < 800) {
        // double click occurred

        this.DB_Click_AddNewItem4();
        this.touchtime = 0;
      } else {
        // not a double click so set as a new first click
        this.touchtime = new Date().getTime();
      }
    }
  }
  selectItem44(i, n) {
    console.log(i);
    console.log(n);
    this.selectedIndex2 = i;
    this.itemsToDelete4 = n;
  }

  removeContent22() {
    let selected_content = this.itemsToDelete2.text;

    this.added_items2 = this.added_items2.filter(
      (h) => h.text !== selected_content
    );
    this.obArr.push(this.itemsToDelete2);

    var newArray = this.obArr.map((o) => {
      return {
        text: o.text,
      };
    });

    console.log(newArray);
  }

  DB_Click_AddNewItem() {
    let StorageDate = this.config.storageGet('InspectionToEdit')[
      '__zone_symbol__value'
    ];
    console.log(this.added_items);
    this.added_items.push(this.Selected_Item_to_add);
    console.log(this.added_items);
  }

  DB_Click_AddNewItem2() {
    let StorageDate = this.config.storageGet('InspectionToEdit')[
      '__zone_symbol__value'
    ];
    console.log(this.added_items2);
    this.added_items2.push(this.Selected_Item_to_add2);
    console.log(this.added_items2);
  }

  DB_Click_AddNewItem3() {
    let StorageDate = this.config.storageGet('InspectionToEdit')[
      '__zone_symbol__value'
    ];
    console.log(this.added_items3);
    this.added_items3.push(this.Selected_Item_to_add3);
    console.log(this.added_items3);
  }

  DB_Click_AddNewItem4() {
    let StorageDate = this.config.storageGet('InspectionToEdit')[
      '__zone_symbol__value'
    ];
    console.log(this.added_items4);
    this.added_items4.push(this.Selected_Item_to_add4);
    console.log(this.added_items4);
  }

  removeContent() {
    // this.inputChanged = true;
    let selected_content = this.itemsToDelete.text;

    this.added_items = this.added_items.filter(
      (h) => h.text !== selected_content
    );
    this.obArr.push(this.itemsToDelete);

    var newArray = this.obArr.map((o) => {
      return {
        text: o.text,
      };
    });

    console.log(newArray);
  }

  removeContent2() {
    // this.inputChanged = true;
    let selected_content = this.itemsToDelete2.text;

    this.added_items2 = this.added_items2.filter(
      (h) => h.text !== selected_content
    );
    this.obArr.push(this.itemsToDelete2);

    var newArray = this.obArr.map((o) => {
      return {
        text: o.text,
      };
    });

    console.log(newArray);

    // this.config.storageRemoveItem("items_to_delete");
    // this.config.storageSave("items_to_delete", newArray);
  }

  removeContent3() {
    // this.inputChanged = true;
    let selected_content = this.itemsToDelete3.text;

    this.added_items3 = this.added_items3.filter(
      (h) => h.text !== selected_content
    );
    this.obArr.push(this.itemsToDelete3);

    var newArray = this.obArr.map((o) => {
      return {
        text: o.text,
      };
    });

    console.log(newArray);
  }

  removeContent4() {
    // this.inputChanged = true;
    let selected_content = this.itemsToDelete4.text;

    this.added_items4 = this.added_items4.filter(
      (h) => h.text !== selected_content
    );
    this.obArr.push(this.itemsToDelete4);

    var newArray = this.obArr.map((o) => {
      return {
        text: o.text,
      };
    });

    console.log(newArray);

    // this.config.storageRemoveItem("items_to_delete");
    // this.config.storageSave("items_to_delete", newArray);
  }

  selectItem3(_index: number, data) {
    this.selectedIndex = _index;
    this.Selected_Item_to_add3 = data;

    if (this.touchtime == 0) {
      // set first click
      this.disable_ = false;
      this.touchtime = new Date().getTime();
    } else {
      // compare first click to this click and see if they occurred within double click threshold
      if (new Date().getTime() - this.touchtime < 800) {
        // double click occurred

        this.DB_Click_AddNewItem3();
        this.touchtime = 0;
      } else {
        // not a double click so set as a new first click
        this.touchtime = new Date().getTime();
      }
    }
  }

  // selectItem3_2(i, n) {
  //   console.log(i);
  //   console.log(n);
  //   this.selectedIndex = i;
  //   this.itemsToDelete = n;
  // }

  updateDescription() {
    let generalDescription = this.config.storageGet('InspectionToEdit')[
      '__zone_symbol__value'
    ]['generalDescription'];

    console.log('To finalize generalDescription=====' + generalDescription);

    if (generalDescription != undefined) {
      if (this.added_items == '') {
        this.added_items = [];

        var newArray = this.added_items.map((o) => {
          return {
            generalDescription: [
              {
                text: '',
              },
            ],
          };
        });
      } else {
        var newArray = this.added_items.map((o) => {
          return {
            generalDescription: [
              {
                text: o.text,
              },
            ],
          };
        });
      }

      console.log('Array To Add++++++++' + newArray);

      let arr3 = [...generalDescription, ...newArray];

      console.log(
        'Updating Again - Fix (2)...generalDescription, ...newArray' + arr3
      );
    }

    if (generalDescription == null || generalDescription == undefined) {
      console.log('undefined------------------------------');

      let generalDescription = this.config.storageGet('InspectionToEdit')[
        '__zone_symbol__value'
      ]['generalDescription'];

      if (this.added_items == '') {
        console.log(this.added_items);

        this.added_items = [];

        var newArray = this.added_items.map((o) => {
          return {
            generalDescription: [
              {
                text: '',
              },
            ],
          };
        });
      } else {
        console.log('??' + this.added_items);
        var newArray = this.added_items.map((o) => {
          return {
            text: o.text,
          };
        });
      }

      var ObArr = {
        generalDescription: [this.added_items],
      };

      this.StoredData = JSON.parse(
        this.config.storageGet('InspectionToEdit')['__zone_symbol__value']
      );

      this.StoredData.generalDescription = newArray;

      this.config.storageRemoveItem('InspectionToEdit');
      this.config.storageSave('InspectionToEdit', this.StoredData);

      console.log(this.StoredData);

      this.presentAlertConfirm();
    }
  }

  updateDescription2() {
    let generalContent = this.config.storageGet('InspectionToEdit')[
      '__zone_symbol__value'
    ]['generalContent'];

    console.log('To finalize generalDescription=====' + generalContent);

    if (generalContent != undefined) {
      if (this.added_items2 == '') {
        this.added_items2 = [];

        var newArray = this.added_items2.map((o) => {
          return {
            generalContent: [
              {
                text: '',
                checked: '',
              },
            ],
          };
        });
      } else {
        var newArray = this.added_items2.map((o) => {
          return {
            generalContent: [
              {
                text: o.text,
                checked: o.checked,
              },
            ],
          };
        });
      }

      console.log('Array To Add++++++++' + newArray);

      let arr3 = [...generalContent, ...newArray];

      console.log(
        'Updating Again - Fix (2)...generalDescription, ...newArray' + arr3
      );
    }

    if (generalContent == null || generalContent == undefined) {
      console.log('undefined------------------------------');

      let generalContent = this.config.storageGet('InspectionToEdit')[
        '__zone_symbol__value'
      ]['generalContent'];

      if (this.added_items2 == '') {
        console.log(this.added_items2);

        this.added_items2 = [];

        var newArray = this.added_items2.map((o) => {
          return {
            generalContent: [
              {
                text: '',
                checked: '',
              },
            ],
          };
        });
      } else {
        console.log('??' + this.added_items2);
        var newArray = this.added_items2.map((o) => {
          return {
            text: o.text,
            checked: o.checked,
          };
        });
      }

      var ObArr = {
        generalContent: [this.added_items2],
      };

      this.StoredData = JSON.parse(
        this.config.storageGet('InspectionToEdit')['__zone_symbol__value']
      );

      this.StoredData.generalContent = newArray;

      this.config.storageRemoveItem('InspectionToEdit');
      this.config.storageSave('InspectionToEdit', this.StoredData);

      console.log(this.StoredData);

      this.presentAlertConfirm();
    }
  }

  updateDescription3() {
    let structureComments = this.config.storageGet('InspectionToEdit')[
      '__zone_symbol__value'
    ]['generalContentRecommendations'];

    console.log('To finalize generalDescription=====' + structureComments);

    if (structureComments != undefined) {
      if (this.added_items3 == '') {
        this.added_items3 = [];

        var newArray = this.added_items3.map((o) => {
          return {
            generalContentRecommendations: [
              {
                text: '',
              },
            ],
          };
        });
      } else {
        var newArray = this.added_items3.map((o) => {
          return {
            generalContentRecommendations: [
              {
                text: o.text,
              },
            ],
          };
        });
      }

      console.log('Array To Add++++++++' + newArray);

      let arr3 = [...structureComments, ...newArray];

      console.log(
        'Updating Again - Fix (2)...generalDescription, ...newArray' + arr3
      );
    }

    if (structureComments == null || structureComments == undefined) {
      console.log('undefined------------------------------');

      let structureComments = this.config.storageGet('InspectionToEdit')[
        '__zone_symbol__value'
      ]['generalDescription'];

      if (this.added_items3 == '') {
        console.log(this.added_items3);

        this.added_items3 = [];

        var newArray = this.added_items3.map((o) => {
          return {
            generalContentRecommendations: [
              {
                text: '',
              },
            ],
          };
        });
      } else {
        console.log('??' + this.added_items3);
        var newArray = this.added_items3.map((o) => {
          return {
            text: o.text,
          };
        });
      }

      var ObArr = {
        structureComments: [this.added_items3],
      };

      this.StoredData = JSON.parse(
        this.config.storageGet('InspectionToEdit')['__zone_symbol__value']
      );

      this.StoredData.generalContentRecommendations = newArray;

      this.config.storageRemoveItem('InspectionToEdit');
      this.config.storageSave('InspectionToEdit', this.StoredData);

      console.log(this.StoredData);

      this.presentAlertConfirm();
    }
  }

  updateDescription4() {
    let electricalLimitations = this.config.storageGet('InspectionToEdit')[
      '__zone_symbol__value'
    ]['electricalLimitations'];

    console.log('To finalize generalDescription=====' + electricalLimitations);

    if (electricalLimitations != undefined) {
      if (this.added_items4 == '') {
        this.added_items4 = [];

        var newArray = this.added_items4.map((o) => {
          return {
            electricalLimitations: [
              {
                text: '',
              },
            ],
          };
        });
      } else {
        var newArray = this.added_items4.map((o) => {
          return {
            electricalLimitations: [
              {
                text: o.text,
              },
            ],
          };
        });
      }

      console.log('Array To Add++++++++' + newArray);

      let arr3 = [...electricalLimitations, ...newArray];
    }

    if (electricalLimitations == null || electricalLimitations == undefined) {
      console.log('undefined------------------------------');

      let generalDescription = this.config.storageGet('InspectionToEdit')[
        '__zone_symbol__value'
      ]['generalDescription'];

      if (this.added_items4 == '') {
        this.added_items4 = [];

        var newArray = this.added_items4.map((o) => {
          return {
            electricalLimitations: [
              {
                text: '',
              },
            ],
          };
        });
      } else {
        console.log('??' + this.added_items4);
        var newArray = this.added_items4.map((o) => {
          return {
            text: o.text,
          };
        });
      }

      var ObArr = {
        electricalLimitations: [this.added_items4],
      };

      this.StoredData = JSON.parse(
        this.config.storageGet('InspectionToEdit')['__zone_symbol__value']
      );

      this.StoredData.electricalLimitations = newArray;

      this.config.storageRemoveItem('InspectionToEdit');
      this.config.storageSave('InspectionToEdit', this.StoredData);

      console.log(this.StoredData);

      this.presentAlertConfirm();
    }
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Done.',
      buttons: [
        {
          text: 'Go Back',
          handler: () => {
            console.log('Confirm Okay');

            this.openCommonModal();
          },
        },
        {
          text: 'Dismiss',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
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

  onRenderItems(event) {
    console.log(`Moving item from ${event.detail.from} to ${event.detail.to}`);
    let draggedItem = this.added_items.splice(event.detail.from, 1)[0];
    this.added_items.splice(event.detail.to, 0, draggedItem);
    //this.listItems = reorderArray(this.listItems, event.detail.from, event.detail.to);
    event.detail.complete();

    console.log(this.added_items);
  }
  onRenderItems2(event) {
    console.log(`Moving item from ${event.detail.from} to ${event.detail.to}`);
    let draggedItem = this.added_items2.splice(event.detail.from, 1)[0];
    this.added_items2.splice(event.detail.to, 0, draggedItem);
    //this.listItems = reorderArray(this.listItems, event.detail.from, event.detail.to);
    event.detail.complete();

    console.log(this.added_items2);
  }
  onRenderItems3(event) {
    console.log(`Moving item from ${event.detail.from} to ${event.detail.to}`);
    let draggedItem = this.added_items3.splice(event.detail.from, 1)[0];
    this.added_items3.splice(event.detail.to, 0, draggedItem);
    //this.listItems = reorderArray(this.listItems, event.detail.from, event.detail.to);
    event.detail.complete();

    console.log(this.added_items3);
  }
  onRenderItems4(event) {
    console.log(`Moving item from ${event.detail.from} to ${event.detail.to}`);
    let draggedItem = this.added_items4.splice(event.detail.from, 1)[0];
    this.added_items4.splice(event.detail.to, 0, draggedItem);
    //this.listItems = reorderArray(this.listItems, event.detail.from, event.detail.to);
    event.detail.complete();

    console.log(this.added_items4);
  }

  createPdf() {
    this.PreviewPDF = true;
    let an = this.config.createPdf();
    console.log(an);

    setTimeout(() => {
      //<<<---using ()=> syntax
      this.PreviewPDF = false;
    }, 3000);

    if (an['__zone_symbol__state'] == true) {
      this.PreviewPDF = false;
    }
  }
}
