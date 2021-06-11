import { Injectable } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  options: any = {};
  Apiurl: any;
  CopyRequestServiceData = [];
  OrderReNewIdentifier: any;
  inspectionTypes: any;
  StructureDescriptionContent: any;
  StructureObservationContent: any = [];
  StructureCommentsContent: any = [];
  StructureLimitationsContent: any = [];

  constructor(
    public alertController: AlertController,
    public navCtrl: NavController,
    private storage: Storage,
    public toastController: ToastController
  ) {
    this.storage.create();

    this.inspectionTypes = [
      {
        name: 'Structure',

        val: '1',
      },
      {
        name: 'Roofing',

        val: '1',
      },
      {
        name: 'Exterior',

        val: '1',
      },
      {
        name: 'Electrical',

        val: '1',
      },
      {
        name: 'Heating',

        val: '1',
      },
      {
        name: 'Cooling/ Heat Pump',

        val: '1',
      },
      {
        name: 'Insulation',

        val: '1',
      },
      {
        name: 'Plumbing',

        val: '1',
      },
      {
        name: 'Interior',

        val: '1',
      },
      {
        name: 'Appliances',

        val: '1',
      },
      {
        name: 'Optional Sections',

        val: '1',
      },
      {
        name: 'General Information',

        val: '1',
      },
    ];

    this.StructureDescriptionContent = [
      {
        text: 'WALL STRUCTURE',
      },
      {
        text: 'Wood Frame',
      },
      {
        text: 'CEILING STRUCTURE',
      },
      {
        text: 'Truss',
      },
      {
        text: 'Rafters',
      },
      {
        text: '',
      },
      {
        text: 'FOUNDATION',
      },
      {
        text: 'Slab on Grade',
      },
      {
        text: 'Concrete',
      },
    ];

    this.StructureObservationContent = [
      {
        text: 'Positive Attributes',
      },
      {
        text:
          'The building exhibits no evidence of substantial structural movement.      ',
      },
      {
        text: 'General Comments',
      },
      {
        text:
          'Many homes may have circumstances where construction practices or standards have changed since the home was built. Updating/upgrading systems are not a requirement if the home was built to the standards of the day construction was completed. It would be cost prohibitive to bring everything to current standards for every home',
      },
    ];

    this.StructureCommentsContent = [
      {
        text:
          'Monitor: This home is situated in an area known for wood destroying insect activity (Florida). Wood destroying insects can do a substantial amount of damage to the wood structural components of a home. Since termites are a living and breeding insect, sometimes damage may take months or years to show evidence. Several steps can be taken to reduce the risk of a wood destroying insect problem. Additional treatment may be need in the event of swarms. Any form of wood/soil contact should be avoided. Controlling dampness in the soil around the perimeter of a home, including below porches and in crawl spaces, is recommended. Preventive chemical treatment, performed by a licensed pest control specialist, is also advisable. Termites are beyond the scope of the inspection. A licensed pest control specialist should be consulted for a thorough termite inspection and treatment (if necessary). If there is currently a termite bond the transfer of the bond is advisable.',
      },
      {
        text:
          'Monitor: Common minor cracks were observed in the foundation walls of the house. This implies that some structural movement of the building has occurred, as is typical of most houses. This is usually the result of shrinkage and/or settling of the slab. It takes several years for the new concrete to fully cure. During the curing process it very common for concrete to crack due to thermal differential inside the core of the concrete. Thicker concrete slabs will cure more slowly than thinner slabs. During renovations, expect to find concrete cracks under the flooring. Floor coverings were not removed at the time of inspection. ',
      },
    ];

    this.StructureLimitationsContent = [
      {
        text:
          'Structural components concealed behind finished surfaces could not be inspected.',
      },
      {
        text:
          'Insulation obstructed the view of some structural components in the attic.',
      },
      {
        text: 'There was no access all areas of the roof space/attic.',
      },
      {
        text:
          'Insulation obstructed the view of some structural components in the attic.',
      },
    ];
  }

  async alert_(m) {
    const alert = await this.alertController.create({
      header: '',
      message: m,

      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // ('Confirm Cancel: blah');
          },
        },
      ],
    });

    await alert.present();
  }

  async storageSave(name, name1) {
    this.storage.remove(name);
    localStorage.removeItem(name);
    this.storage.set(name, name1);
    localStorage.setItem(name, JSON.stringify(name1));
  }

  async storageClear() {
    this.storage.clear();
    localStorage.clear();
  }

  async storageGet(get) {
    let val2 = localStorage.getItem(get);
    this.storage.get(get).then((val) => {
      let val2 = val;
      return val2;
    });
    return val2;
  }

  async navigate(page) {
    this.navCtrl.navigateForward(page);
  }

  async storageRemoveItem(key) {
    localStorage.removeItem(key);
    this.storage.remove(key);
  }
  async presentToast(message) {}
}
