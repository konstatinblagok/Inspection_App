import { Component, OnInit } from '@angular/core';
import { ModalController, Platform, AlertController } from '@ionic/angular';
import { CommonService } from '../../common.function';
// import { ReportSelectionPage } from '../../../app/modal/report-selection/report-selection.page';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { CommonSelectionPage } from '../../../app/modal/common-selection/common-selection.page';

@Component({
  selector: 'app-appliances-selection',
  templateUrl: './appliances-selection.page.html',
  styleUrls: ['./appliances-selection.page.scss'],
  providers: [FormBuilder],
})
export class AppliancesSelectionPage implements OnInit {
  PreviewPDF = false;
  BackPressed = false;
  Colors: Array<any> = ['#ec763d', '#ec763d', '#ec763d', '#ec763d'];
  public currentCompany;
  inspectionTypes: any = [];
  applianceDescriptionContent: any = [];
  applianceObservationContent: any = [];
  StructureCommentsContent: any = [];
  applianceLimitationsContent: any = [];
  applianceObservationRecommendations: any;
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
  itemsToDeleteObs: any;
  CompSelect1 = true;
  StructureFoundationComponents_UI = false;

  selectedIndex5: any;
  selectedIndex6: any;
  selectedIndex7: any;
  selectedIndex8: any;
  selectedIndex9: any;
  selectedIndex10: any;

  HSView1 = false;
  HSView2 = false;
  HSView3 = false;
  HSView8 = false;
  HSView9 = false;
  HSView10 = false;

  added_items5: any = [];
  added_items6: any = [];
  added_items7: any = [];
  added_items8: any = [];
  added_items9: any = [];
  added_items10: any = [];

  AppliancesPresentStructureContent: any = [];
  AppliancesBuiltStructureContent: any = [];
  AppliancesTestedStructureContent: any = [];

  AppliancesLaundryStructureContent: any = [];
  AppliancesOtherStructureContent: any = [];

  constructor(
    public modalController: ModalController,
    private formBuilder: FormBuilder,
    private plt: Platform,
    public config: CommonService,
    private alertController: AlertController
  ) {
    this.inspectionTypes = [
      {
        name: 'Foundational Components',

        val: '5',
      },

      // {
      //   name: 'Apliances System Description',

      //   val: '1',
      // },
      {
        name: 'Appliance Observation',

        val: '2',
      },

      {
        name: 'Recommendations',

        val: '3',
      },

      {
        name: 'Limitations',

        val: '4',
      },
    ];

    this.applianceDescriptionContent = this.config.CoolingHVACDescriptionContent;
    this.applianceObservationContent = this.config.CoolingHVACObservationContent;
    this.applianceObservationRecommendations = this.config.CoolingHVACObservationContent;
    this.StructureCommentsContent = this.config.StructureCommentsContent;
    this.applianceLimitationsContent = this.config.CoolingHVACLimitationsContent;

    this.AppliancesPresentStructureContent = this.config.AppliancesPresentStructureContent;
    this.AppliancesBuiltStructureContent = this.config.AppliancesBuiltStructureContent;
    this.AppliancesTestedStructureContent = this.config.AppliancesTestedStructureContent;

    this.AppliancesLaundryStructureContent = this.config.AppliancesLaundryStructureContent;
    this.AppliancesOtherStructureContent = this.config.AppliancesOtherStructureContent;

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

  public selectCompany(event: any, item: any) {
    this.currentCompany = item.name;
  }

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

      if (this.StoredData['applianceDescription'] != undefined) {
        this.added_items = this.StoredData['applianceDescription'];
      }

      if (this.StoredData['applianceObservation'] != undefined) {
        this.added_items2 = this.StoredData['applianceObservation'];
      }

      if (this.StoredData['structureComments'] != undefined) {
        this.added_items3 = this.StoredData['structureComments'];
      }

      if (this.StoredData['applianceLimitations'] != undefined) {
        this.added_items4 = this.StoredData['applianceLimitations'];
      }

      if (this.StoredData['applianceObservationRecommendations'] != undefined) {
        this.added_items3 = this.StoredData[
          'applianceObservationRecommendations'
        ];
      }
    }
  }

  async goToSelection(n) {
    this.BackPressed = true;
    if (n.val == '1') {
      console.log(n);
      this.StructureFoundationComponents_UI = false;
      this.Description = true;
      this.Observations_UI = false;
      this.Comments_UI = false;
      this.Limitations_UI = false;
    }
    if (n.val == '2') {
      console.log(n);
      this.StructureFoundationComponents_UI = false;
      this.Description = false;
      this.Observations_UI = true;
      this.Comments_UI = false;
      this.Limitations_UI = false;
    }
    if (n.val == '3') {
      console.log(n);
      this.StructureFoundationComponents_UI = false;
      this.Description = false;
      this.Observations_UI = false;
      this.Comments_UI = true;
      this.Limitations_UI = false;
    }
    if (n.val == '4') {
      console.log(n);
      this.StructureFoundationComponents_UI = false;
      this.Description = false;
      this.Observations_UI = false;
      this.Comments_UI = false;
      this.Limitations_UI = true;
    }
    if (n.val == '5') {
      console.log(n);
      this.Description = false;
      this.Observations_UI = false;
      this.Comments_UI = false;
      this.Limitations_UI = false;
      this.StructureFoundationComponents_UI = true;
    }
  }

  saveReport() {
    console.log(this.createInpForm.value);
  }

  closeDescription() {
    this.BackPressed = false;
    this.Description = false;
    this.Observations_UI = false;
    this.Comments_UI = false;
    this.Limitations_UI = false;
    this.StructureFoundationComponents_UI = false;
  }

  closeDescription2() {
    this.BackPressed = true;
    this.Description = false;
    this.Observations_UI = false;
    this.Comments_UI = false;
    this.Limitations_UI = false;
    this.StructureFoundationComponents_UI = true;

    this.HSView1 = false;
    this.HSView2 = false;
    this.HSView3 = false;
    this.HSView8 = false;
    this.HSView9 = false;
    this.HSView10 = false;

    // this.StructureFoundationComponents_UI = false;
  }

  getColors(index) {
    let num = this.getnumber(index);
    console.log(num);

    return this.Colors[num];
  }

  getnumber(data) {
    let i = data;
    if (i > this.Colors.length - 1) {
      i = i - this.Colors.length;
      if (i < this.Colors.length) {
        return i;
      } else {
        this.getnumber(i);
      }
    } else {
      return i;
    }
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
      this.selectedIndex10 = _index;
      this.itemsToDelete2 = data;
      this.removeContent22();
    }
  }

  selectItem33(i, n) {
    console.log(i);
    console.log(n);
    this.selectedIndex2 = i;
    this.itemsToDelete3 = n;
  }

  selectItem4(_index: number, data, ev) {
    this.selectedIndex = _index;
    this.Selected_Item_to_add4 = data;

    if (ev.detail.checked == true) {
      this.itemsToDelete4 = data;
      this.removeContent4();
      this.DB_Click_AddNewItem4();
    }
    if (ev.detail.checked == false) {
      this.selectedIndex10 = _index;
      this.itemsToDelete4 = data;
      this.removeContent4();
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

  selectItem3(_index: number, data, ev) {
    this.selectedIndex = _index;
    this.Selected_Item_to_add3 = data;

    if (ev.detail.checked == true) {
      this.itemsToDelete3 = data;
      this.removeContent3();
      this.DB_Click_AddNewItem3();
    }
    if (ev.detail.checked == false) {
      this.selectedIndex10 = _index;
      this.itemsToDelete3 = data;
      this.removeContent3();
    }
  }

  // selectItem3_2(i, n) {
  //   console.log(i);
  //   console.log(n);
  //   this.selectedIndex = i;
  //   this.itemsToDelete = n;
  // }

  updateDescription() {
    let applianceDescription = this.config.storageGet('InspectionToEdit')[
      '__zone_symbol__value'
    ]['applianceDescription'];

    console.log('To finalize applianceDescription=====' + applianceDescription);

    if (applianceDescription != undefined) {
      if (this.added_items == '') {
        this.added_items = [];

        var newArray = this.added_items.map((o) => {
          return {
            applianceDescription: [
              {
                text: '',
              },
            ],
          };
        });
      } else {
        var newArray = this.added_items.map((o) => {
          return {
            applianceDescription: [
              {
                text: o.text,
              },
            ],
          };
        });
      }

      console.log('Array To Add++++++++' + newArray);

      let arr3 = [...applianceDescription, ...newArray];

      console.log(
        'Updating Again - Fix (2)...applianceDescription, ...newArray' + arr3
      );
    }

    if (applianceDescription == null || applianceDescription == undefined) {
      console.log('undefined------------------------------');

      let applianceDescription = this.config.storageGet('InspectionToEdit')[
        '__zone_symbol__value'
      ]['applianceDescription'];

      if (this.added_items == '') {
        console.log(this.added_items);

        this.added_items = [];

        var newArray = this.added_items.map((o) => {
          return {
            applianceDescription: [
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
        applianceDescription: [this.added_items],
      };

      this.StoredData = JSON.parse(
        this.config.storageGet('InspectionToEdit')['__zone_symbol__value']
      );

      this.StoredData.applianceDescription = newArray;

      this.config.storageRemoveItem('InspectionToEdit');
      this.config.storageSave('InspectionToEdit', this.StoredData);

      console.log(this.StoredData);

      this.presentAlertConfirm();
    }
  }

  updateDescription2() {
    let applianceObservation = this.config.storageGet('InspectionToEdit')[
      '__zone_symbol__value'
    ]['applianceObservation'];

    console.log('To finalize applianceDescription=====' + applianceObservation);

    if (applianceObservation != undefined) {
      if (this.added_items2 == '') {
        this.added_items2 = [];

        var newArray = this.added_items2.map((o) => {
          return {
            applianceObservation: [
              {
                text: '',
              },
            ],
          };
        });
      } else {
        var newArray = this.added_items2.map((o) => {
          return {
            applianceObservation: [
              {
                text: o.text,
              },
            ],
          };
        });
      }

      console.log('Array To Add++++++++' + newArray);

      let arr3 = [...applianceObservation, ...newArray];

      console.log(
        'Updating Again - Fix (2)...applianceDescription, ...newArray' + arr3
      );
    }

    if (applianceObservation == null || applianceObservation == undefined) {
      console.log('undefined------------------------------');

      let applianceObservation = this.config.storageGet('InspectionToEdit')[
        '__zone_symbol__value'
      ]['applianceObservation'];

      if (this.added_items2 == '') {
        console.log(this.added_items2);

        this.added_items2 = [];

        var newArray = this.added_items2.map((o) => {
          return {
            applianceObservation: [
              {
                text: '',
              },
            ],
          };
        });
      } else {
        console.log('??' + this.added_items2);
        var newArray = this.added_items2.map((o) => {
          return {
            text: o.text,
          };
        });
      }

      var ObArr = {
        applianceObservation: [this.added_items2],
      };

      this.StoredData = JSON.parse(
        this.config.storageGet('InspectionToEdit')['__zone_symbol__value']
      );

      this.StoredData.applianceObservation = newArray;

      this.config.storageRemoveItem('InspectionToEdit');
      this.config.storageSave('InspectionToEdit', this.StoredData);

      console.log(this.StoredData);

      this.presentAlertConfirm();
    }
  }

  updateDescription3() {
    let structureComments = this.config.storageGet('InspectionToEdit')[
      '__zone_symbol__value'
    ]['applianceObservationRecommendations'];

    console.log('To finalize applianceDescription=====' + structureComments);

    if (structureComments != undefined) {
      if (this.added_items3 == '') {
        this.added_items3 = [];

        var newArray = this.added_items3.map((o) => {
          return {
            applianceObservationRecommendations: [
              {
                text: '',
                checked: '',
              },
            ],
          };
        });
      } else {
        var newArray = this.added_items3.map((o) => {
          return {
            applianceObservationRecommendations: [
              {
                text: o.text,
                checked: o.checked,
              },
            ],
          };
        });
      }

      console.log('Array To Add++++++++' + newArray);

      let arr3 = [...structureComments, ...newArray];

      console.log(
        'Updating Again - Fix (2)...applianceDescription, ...newArray' + arr3
      );
    }

    if (structureComments == null || structureComments == undefined) {
      console.log('undefined------------------------------');

      let structureComments = this.config.storageGet('InspectionToEdit')[
        '__zone_symbol__value'
      ]['applianceDescription'];

      if (this.added_items3 == '') {
        console.log(this.added_items3);

        this.added_items3 = [];

        var newArray = this.added_items3.map((o) => {
          return {
            applianceObservationRecommendations: [
              {
                text: '',
                checked: '',
              },
            ],
          };
        });
      } else {
        console.log('??' + this.added_items3);
        var newArray = this.added_items3.map((o) => {
          return {
            text: o.text,
            checked: o.checked,
          };
        });
      }

      var ObArr = {
        structureComments: [this.added_items3],
      };

      this.StoredData = JSON.parse(
        this.config.storageGet('InspectionToEdit')['__zone_symbol__value']
      );

      this.StoredData.applianceObservationRecommendations = newArray;

      this.config.storageRemoveItem('InspectionToEdit');
      this.config.storageSave('InspectionToEdit', this.StoredData);

      console.log(this.StoredData);

      this.presentAlertConfirm();
    }
  }

  updateDescription4() {
    let applianceLimitations = this.config.storageGet('InspectionToEdit')[
      '__zone_symbol__value'
    ]['applianceLimitations'];

    console.log('To finalize applianceDescription=====' + applianceLimitations);

    if (applianceLimitations != undefined) {
      if (this.added_items4 == '') {
        this.added_items4 = [];

        var newArray = this.added_items4.map((o) => {
          return {
            applianceLimitations: [
              {
                text: '',
                checked: '',
              },
            ],
          };
        });
      } else {
        var newArray = this.added_items4.map((o) => {
          return {
            applianceLimitations: [
              {
                text: o.text,
                checked: o.checked,
              },
            ],
          };
        });
      }

      console.log('Array To Add++++++++' + newArray);

      let arr3 = [...applianceLimitations, ...newArray];
    }

    if (applianceLimitations == null || applianceLimitations == undefined) {
      console.log('undefined------------------------------');

      let applianceDescription = this.config.storageGet('InspectionToEdit')[
        '__zone_symbol__value'
      ]['applianceDescription'];

      if (this.added_items4 == '') {
        this.added_items4 = [];

        var newArray = this.added_items4.map((o) => {
          return {
            applianceLimitations: [
              {
                text: '',
                checked: '',
              },
            ],
          };
        });
      } else {
        console.log('??' + this.added_items4);
        var newArray = this.added_items4.map((o) => {
          return {
            text: o.text,
            checked: o.checked,
          };
        });
      }

      var ObArr = {
        applianceLimitations: [this.added_items4],
      };

      this.StoredData = JSON.parse(
        this.config.storageGet('InspectionToEdit')['__zone_symbol__value']
      );

      this.StoredData.applianceLimitations = newArray;

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

  selectItem5Remove(i, n) {
    console.log(i);
    console.log(n);
    this.selectedIndex5 = i;
    this.itemsToDelete = n;
  }

  selectItem6Remove(i, n) {
    console.log(i);
    console.log(n);
    this.selectedIndex6 = i;
    this.itemsToDelete = n;
  }

  selectItem7Remove(i, n) {
    console.log(i);
    console.log(n);
    this.selectedIndex7 = i;
    this.itemsToDelete = n;
  }

  selectItem8Remove(i, n) {
    console.log(i);
    console.log(n);
    this.selectedIndex8 = i;
    this.itemsToDelete = n;
  }
  selectItem9Remove(i, n) {
    console.log(i);
    console.log(n);
    this.selectedIndex9 = i;
    this.itemsToDelete = n;
  }
  selectItem10Remove(i, n) {
    console.log(i);
    console.log(n);
    this.selectedIndex10 = i;
    this.itemsToDelete = n;
  }
  onHSView1() {
    this.HSView1 = !this.HSView1;

    this.HSView2 = false;
    this.HSView3 = false;
    this.HSView8 = false;
    this.HSView9 = false;
    this.HSView10 = false;
  }
  onHSView2() {
    this.HSView2 = !this.HSView2;

    this.HSView1 = false;
    this.HSView3 = false;
    this.HSView8 = false;
    this.HSView9 = false;
    this.HSView10 = false;
  }
  onHSView3() {
    this.HSView3 = !this.HSView3;

    this.HSView1 = false;
    this.HSView2 = false;

    this.HSView8 = false;
    this.HSView9 = false;
    this.HSView10 = false;
  }

  onHSView8() {
    this.HSView8 = !this.HSView8;

    this.HSView1 = false;
    this.HSView2 = false;
    this.HSView3 = false;
    this.HSView9 = false;
    this.HSView10 = false;
  }
  onHSView9() {
    this.HSView9 = !this.HSView9;

    this.HSView1 = false;
    this.HSView2 = false;
    this.HSView3 = false;
    this.HSView8 = false;
    this.HSView10 = false;
  }
  onHSView10() {
    this.HSView10 = !this.HSView10;

    this.HSView1 = false;
    this.HSView2 = false;
    this.HSView3 = false;
    this.HSView8 = false;
    this.HSView9 = false;
  }
  removeContent5() {
    // this.inputChanged = true;
    let selected_content = this.itemsToDelete.text;

    this.added_items5 = this.added_items5.filter(
      (h) => h.text !== selected_content
    );
    this.obArr.push(this.itemsToDelete);

    var newArray = this.obArr.map((o) => {
      return {
        text: o.text,
      };
    });
  }

  removeContent6() {
    let selected_content = this.itemsToDelete.text;

    this.added_items6 = this.added_items6.filter(
      (h) => h.text !== selected_content
    );
    this.obArr.push(this.itemsToDelete);

    var newArray = this.obArr.map((o) => {
      return {
        text: o.text,
      };
    });
  }

  removeContent7() {
    let selected_content = this.itemsToDelete.text;

    this.added_items7 = this.added_items7.filter(
      (h) => h.text !== selected_content
    );
    this.obArr.push(this.itemsToDelete);

    var newArray = this.obArr.map((o) => {
      return {
        text: o.text,
      };
    });
  }
  removeContent8() {
    let selected_content = this.itemsToDelete.text;

    this.added_items8 = this.added_items8.filter(
      (h) => h.text !== selected_content
    );
    this.obArr.push(this.itemsToDelete);

    var newArray = this.obArr.map((o) => {
      return {
        text: o.text,
      };
    });
  }

  removeContent9() {
    let selected_content = this.itemsToDelete.text;

    this.added_items9 = this.added_items9.filter(
      (h) => h.text !== selected_content
    );
    this.obArr.push(this.itemsToDelete);

    var newArray = this.obArr.map((o) => {
      return {
        text: o.text,
      };
    });
  }

  removeContent10() {
    let selected_content = this.itemsToDelete.text;

    this.added_items10 = this.added_items10.filter(
      (h) => h.text !== selected_content
    );
    this.obArr.push(this.itemsToDelete);

    var newArray = this.obArr.map((o) => {
      return {
        text: o.text,
      };
    });
  }

  selectItem5(_index: number, data, ev) {
    this.selectedIndex = _index;
    this.Selected_Item_to_add = data;

    if (ev.detail.checked == true) {
      this.itemsToDelete = data;
      this.removeContent5();
      this.DB_Click_AddNewItem5();
    }
    if (ev.detail.checked == false) {
      this.selectedIndex10 = _index;
      this.itemsToDelete = data;
      this.removeContent5();
    }
  }

  selectItem6(_index: number, data, ev) {
    this.selectedIndex = _index;
    this.Selected_Item_to_add = data;
    if (ev.detail.checked == true) {
      this.itemsToDelete = data;
      this.removeContent6();
      this.DB_Click_AddNewItem6();
    }
    if (ev.detail.checked == false) {
      this.selectedIndex10 = _index;
      this.itemsToDelete = data;
      this.removeContent6();
    }
  }

  selectItem7(_index: number, data, ev) {
    this.selectedIndex = _index;
    this.Selected_Item_to_add = data;
    if (ev.detail.checked == true) {
      this.itemsToDelete = data;
      this.removeContent7();
      this.DB_Click_AddNewItem7();
    }
    if (ev.detail.checked == false) {
      this.selectedIndex10 = _index;
      this.itemsToDelete = data;
      this.removeContent7();
    }
  }
  selectItem8(_index: number, data, ev) {
    this.selectedIndex = _index;
    this.Selected_Item_to_add = data;
    if (ev.detail.checked == true) {
      this.itemsToDelete = data;
      this.removeContent8();
      this.DB_Click_AddNewItem8();
    }
    if (ev.detail.checked == false) {
      this.selectedIndex10 = _index;
      this.itemsToDelete = data;
      this.removeContent8();
    }
  }
  selectItem9(_index: number, data, ev) {
    this.selectedIndex = _index;
    this.Selected_Item_to_add = data;

    if (ev.detail.checked == true) {
      this.itemsToDelete = data;
      this.removeContent9();
      this.DB_Click_AddNewItem9();
    }
    if (ev.detail.checked == false) {
      this.selectedIndex10 = _index;
      this.itemsToDelete = data;
      this.removeContent9();
    }
  }
  selectItem10(_index: number, data) {
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

        this.DB_Click_AddNewItem10();
        this.touchtime = 0;
      } else {
        // not a double click so set as a new first click
        this.touchtime = new Date().getTime();
      }
    }
  }

  DB_Click_AddNewItem5() {
    let StorageDate = this.config.storageGet('InspectionToEdit')[
      '__zone_symbol__value'
    ];
    console.log(this.added_items);
    this.added_items5.push(this.Selected_Item_to_add);
    console.log(this.added_items);
  }

  DB_Click_AddNewItem6() {
    let StorageDate = this.config.storageGet('InspectionToEdit')[
      '__zone_symbol__value'
    ];
    console.log(this.added_items);
    this.added_items6.push(this.Selected_Item_to_add);
    console.log(this.added_items);
  }

  DB_Click_AddNewItem7() {
    let StorageDate = this.config.storageGet('InspectionToEdit')[
      '__zone_symbol__value'
    ];
    console.log(this.added_items);
    this.added_items7.push(this.Selected_Item_to_add);
    console.log(this.added_items);
  }

  DB_Click_AddNewItem8() {
    let StorageDate = this.config.storageGet('InspectionToEdit')[
      '__zone_symbol__value'
    ];
    console.log(this.added_items);
    this.added_items8.push(this.Selected_Item_to_add);
    console.log(this.added_items);
  }
  DB_Click_AddNewItem9() {
    let StorageDate = this.config.storageGet('InspectionToEdit')[
      '__zone_symbol__value'
    ];
    console.log(this.added_items);
    this.added_items9.push(this.Selected_Item_to_add);
    console.log(this.added_items);
  }
  DB_Click_AddNewItem10() {
    let StorageDate = this.config.storageGet('InspectionToEdit')[
      '__zone_symbol__value'
    ];
    console.log(this.added_items);
    this.added_items10.push(this.Selected_Item_to_add);
    console.log(this.added_items);
  }

  updateDescription5() {
    let structureLimitations = this.config.storageGet('InspectionToEdit')[
      '__zone_symbol__value'
    ]['D2appliancesPresentStructure'];

    console.log('To finalize structureDescription=====' + structureLimitations);

    if (structureLimitations != undefined) {
      if (this.added_items5 == '') {
        this.added_items5 = [];

        var newArray = this.added_items5.map((o) => {
          return {
            D2appliancesPresentStructure: [
              {
                text: '',
                checked: '',
              },
            ],
          };
        });
      } else {
        var newArray = this.added_items5.map((o) => {
          return {
            D2appliancesPresentStructure: [
              {
                text: o.text,
                checked: o.checked,
              },
            ],
          };
        });
      }

      console.log('Array To Add++++++++' + newArray);

      let arr3 = [...structureLimitations, ...newArray];
    }

    if (structureLimitations == null || structureLimitations == undefined) {
      console.log('undefined------------------------------');

      let structureDescription = this.config.storageGet('InspectionToEdit')[
        '__zone_symbol__value'
      ]['D2appliancesPresentStructure'];

      if (this.added_items5 == '') {
        this.added_items5 = [];

        var newArray = this.added_items5.map((o) => {
          return {
            D2appliancesPresentStructure: [
              {
                text: '',
                checked: '',
              },
            ],
          };
        });
      } else {
        var newArray = this.added_items5.map((o) => {
          return {
            text: o.text,
            checked: o.checked,
          };
        });
      }

      this.StoredData = JSON.parse(
        this.config.storageGet('InspectionToEdit')['__zone_symbol__value']
      );

      this.StoredData.D2appliancesPresentStructure = newArray;

      this.config.storageRemoveItem('InspectionToEdit');
      this.config.storageSave('InspectionToEdit', this.StoredData);

      console.log(this.StoredData);

      this.presentAlertConfirm();
    }
  }

  updateDescription6() {
    let structureLimitations = this.config.storageGet('InspectionToEdit')[
      '__zone_symbol__value'
    ]['D2appliancesBuiltStructure'];

    console.log('To finalize structureDescription=====' + structureLimitations);

    if (structureLimitations != undefined) {
      if (this.added_items6 == '') {
        this.added_items6 = [];

        var newArray = this.added_items6.map((o) => {
          return {
            D2appliancesBuiltStructure: [
              {
                text: '',
                checked: '',
              },
            ],
          };
        });
      } else {
        var newArray = this.added_items6.map((o) => {
          return {
            D2appliancesBuiltStructure: [
              {
                text: o.text,
                checked: o.checked,
              },
            ],
          };
        });
      }

      console.log('Array To Add++++++++' + newArray);

      let arr3 = [...structureLimitations, ...newArray];
    }

    if (structureLimitations == null || structureLimitations == undefined) {
      console.log('undefined------------------------------');

      let structureDescription = this.config.storageGet('InspectionToEdit')[
        '__zone_symbol__value'
      ]['D2appliancesBuiltStructure'];

      if (this.added_items6 == '') {
        this.added_items6 = [];

        var newArray = this.added_items6.map((o) => {
          return {
            D2appliancesBuiltStructure: [
              {
                text: '',
                checked: '',
              },
            ],
          };
        });
      } else {
        var newArray = this.added_items6.map((o) => {
          return {
            text: o.text,
            checked: o.checked,
          };
        });
      }

      this.StoredData = JSON.parse(
        this.config.storageGet('InspectionToEdit')['__zone_symbol__value']
      );

      this.StoredData.D2appliancesBuiltStructure = newArray;

      this.config.storageRemoveItem('InspectionToEdit');
      this.config.storageSave('InspectionToEdit', this.StoredData);

      console.log(this.StoredData);

      this.presentAlertConfirm();
    }
  }

  updateDescription7() {
    let structureLimitations = this.config.storageGet('InspectionToEdit')[
      '__zone_symbol__value'
    ]['D2appliancesTestedStructure'];

    console.log('To finalize structureDescription=====' + structureLimitations);

    if (structureLimitations != undefined) {
      if (this.added_items7 == '') {
        this.added_items7 = [];

        var newArray = this.added_items7.map((o) => {
          return {
            D2appliancesTestedStructure: [
              {
                text: '',
                checked: '',
              },
            ],
          };
        });
      } else {
        var newArray = this.added_items7.map((o) => {
          return {
            D2appliancesTestedStructure: [
              {
                text: o.text,
                checked: o.checked,
              },
            ],
          };
        });
      }

      console.log('Array To Add++++++++' + newArray);

      let arr3 = [...structureLimitations, ...newArray];
    }

    if (structureLimitations == null || structureLimitations == undefined) {
      console.log('undefined------------------------------');

      if (this.added_items7 == '') {
        this.added_items7 = [];

        var newArray = this.added_items7.map((o) => {
          return {
            D2appliancesTestedStructure: [
              {
                text: '',
                checked: '',
              },
            ],
          };
        });
      } else {
        var newArray = this.added_items7.map((o) => {
          return {
            text: o.text,
            checked: o.checked,
          };
        });
      }

      this.StoredData = JSON.parse(
        this.config.storageGet('InspectionToEdit')['__zone_symbol__value']
      );

      this.StoredData.D2appliancesTestedStructure = newArray;

      this.config.storageRemoveItem('InspectionToEdit');
      this.config.storageSave('InspectionToEdit', this.StoredData);

      console.log(this.StoredData);

      this.presentAlertConfirm();
    }
  }

  updateDescription8() {
    let structureLimitations = this.config.storageGet('InspectionToEdit')[
      '__zone_symbol__value'
    ]['D2appliancesLaundryStructure'];

    console.log('To finalize structureDescription=====' + structureLimitations);

    if (structureLimitations != undefined) {
      if (this.added_items8 == '') {
        this.added_items8 = [];

        var newArray = this.added_items8.map((o) => {
          return {
            D2appliancesLaundryStructure: [
              {
                text: '',
                checked: '',
              },
            ],
          };
        });
      } else {
        var newArray = this.added_items8.map((o) => {
          return {
            D2appliancesLaundryStructure: [
              {
                text: o.text,
                checked: o.checked,
              },
            ],
          };
        });
      }

      console.log('Array To Add++++++++' + newArray);

      let arr3 = [...structureLimitations, ...newArray];
    }

    if (structureLimitations == null || structureLimitations == undefined) {
      console.log('undefined------------------------------');

      let structureDescription = this.config.storageGet('InspectionToEdit')[
        '__zone_symbol__value'
      ]['D2appliancesLaundryStructure'];

      if (this.added_items8 == '') {
        this.added_items8 = [];

        var newArray = this.added_items8.map((o) => {
          return {
            D2appliancesLaundryStructure: [
              {
                text: '',
                checked: '',
              },
            ],
          };
        });
      } else {
        var newArray = this.added_items8.map((o) => {
          return {
            text: o.text,
            checked: o.checked,
          };
        });
      }

      this.StoredData = JSON.parse(
        this.config.storageGet('InspectionToEdit')['__zone_symbol__value']
      );

      this.StoredData.D2appliancesLaundryStructure = newArray;

      this.config.storageRemoveItem('InspectionToEdit');
      this.config.storageSave('InspectionToEdit', this.StoredData);

      console.log(this.StoredData);

      this.presentAlertConfirm();
    }
  }

  updateDescription9() {
    let structureLimitations = this.config.storageGet('InspectionToEdit')[
      '__zone_symbol__value'
    ]['D2appliancesOtherStructure'];

    console.log('To finalize structureDescription=====' + structureLimitations);

    if (structureLimitations != undefined) {
      if (this.added_items9 == '') {
        this.added_items9 = [];

        var newArray = this.added_items9.map((o) => {
          return {
            D2appliancesOtherStructure: [
              {
                text: '',
                checked: '',
              },
            ],
          };
        });
      } else {
        var newArray = this.added_items9.map((o) => {
          return {
            D2appliancesOtherStructure: [
              {
                text: o.text,
                checked: o.checked,
              },
            ],
          };
        });
      }

      console.log('Array To Add++++++++' + newArray);

      let arr3 = [...structureLimitations, ...newArray];
    }

    if (structureLimitations == null || structureLimitations == undefined) {
      console.log('undefined------------------------------');

      let structureDescription = this.config.storageGet('InspectionToEdit')[
        '__zone_symbol__value'
      ]['D2appliancesOtherStructure'];

      if (this.added_items9 == '') {
        this.added_items9 = [];

        var newArray = this.added_items9.map((o) => {
          return {
            D2appliancesOtherStructure: [
              {
                text: '',
                checked: '',
              },
            ],
          };
        });
      } else {
        var newArray = this.added_items9.map((o) => {
          return {
            text: o.text,
            checked: o.checked,
          };
        });
      }

      this.StoredData = JSON.parse(
        this.config.storageGet('InspectionToEdit')['__zone_symbol__value']
      );

      this.StoredData.D2appliancesOtherStructure = newArray;

      this.config.storageRemoveItem('InspectionToEdit');
      this.config.storageSave('InspectionToEdit', this.StoredData);

      console.log(this.StoredData);

      this.presentAlertConfirm();
    }
  }

  updateDescription10() {
    let structureLimitations = this.config.storageGet('InspectionToEdit')[
      '__zone_symbol__value'
    ]['structureTenStructure'];

    console.log('To finalize structureDescription=====' + structureLimitations);

    if (structureLimitations != undefined) {
      if (this.added_items10 == '') {
        this.added_items10 = [];

        var newArray = this.added_items10.map((o) => {
          return {
            structureTenStructure: [
              {
                text: '',
              },
            ],
          };
        });
      } else {
        var newArray = this.added_items10.map((o) => {
          return {
            structureTenStructure: [
              {
                text: o.text,
              },
            ],
          };
        });
      }

      console.log('Array To Add++++++++' + newArray);

      let arr3 = [...structureLimitations, ...newArray];
    }

    if (structureLimitations == null || structureLimitations == undefined) {
      console.log('undefined------------------------------');

      let structureDescription = this.config.storageGet('InspectionToEdit')[
        '__zone_symbol__value'
      ]['structureTenStructure'];

      if (this.added_items7 == '') {
        this.added_items7 = [];

        var newArray = this.added_items10.map((o) => {
          return {
            structureTenStructure: [
              {
                text: '',
              },
            ],
          };
        });
      } else {
        var newArray = this.added_items10.map((o) => {
          return {
            text: o.text,
          };
        });
      }

      this.StoredData = JSON.parse(
        this.config.storageGet('InspectionToEdit')['__zone_symbol__value']
      );

      this.StoredData.structureTenStructure = newArray;

      this.config.storageRemoveItem('InspectionToEdit');
      this.config.storageSave('InspectionToEdit', this.StoredData);

      console.log(this.StoredData);

      this.presentAlertConfirm();
    }
  }
}
