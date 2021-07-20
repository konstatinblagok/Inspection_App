import { Injectable } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { Base64 } from '@ionic-native/base64/ngx';

import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  pdfObjBtn = false;
  selPDFname: any;
  clientDetails: any;
  InspectionToEdit: any;
  StoredData: any;
  pdfObj = null;
  base64File: any;
  PreviewPDF = false;

  options: any = {};
  Apiurl: any;
  CopyRequestServiceData = [];
  OrderReNewIdentifier: any;
  inspectionTypes: any;
  StructureDescriptionContent: any;
  StructureObservationContent: any = [];
  StructureCommentsContent: any = [];
  StructureLimitationsContent: any = [];
  RoofingDescriptionContent: any;
  RoofingObservationContent: any = [];

  ExteriorDescriptionContent: any = [];
  ExteriorObservationContent: any = [];
  ExteriorLimitationsContent: any = [];

  ElectricalDescriptionContent: any = [];
  ElectricalObservationContent: any = [];
  ElectricalLimitationsContent: any = [];

  CoolingHVACDescriptionContent: any = [];
  CoolingHVACObservationContent: any = [];
  CoolingHVACLimitationsContent: any = [];

  StructureWallStructureContent: any = [];
  StructureCeilingStructureContent: any = [];
  StructureRoofStructureContent: any = [];

  StructureAtticMethodStructureContent: any = [];
  StructureFoundationStructureContent: any = [];
  StructureFloorStructureContent: any = [];

  AppliancesPresentStructureContent: any = [];
  AppliancesBuiltStructureContent: any = [];
  AppliancesTestedStructureContent: any = [];

  AppliancesLaundryStructureContent: any = [];
  AppliancesOtherStructureContent: any = [];

  CoolingHVACEnergyStructureContent: any = [];
  CoolingHVACTypeStructureContent: any = [];
  CoolingHVACManufacturerStructureContent: any = [];

  CoolingHVACDescriptionStructureContent: any = [];
  CoolingHVACTemperatureStructureContent: any = [];

  ElectricalServiceEntryGroundStructureContent: any = [];
  ElectricalMainDisconnectStructureContent: any = [];
  ElectricalDistributionPanelStructureContent: any = [];

  ElectricalAuxilliaryStructureContent: any = [];
  ElectricalWiringStructureContent: any = [];
  ElectricalGroundFaultStructureContent: any = [];

  ExteriorWallCladdingStructureContent: any = [];
  ExteriorSoffitFasciaStructureContent: any = [];
  ExteriorWindowDoorStructureContent: any = [];

  ExteriorDrivewaysStructureContent: any = [];
  ExteriorOverheadGarageStructureContent: any = [];
  ExteriorLotGradingStructureContent: any = [];

  InsulationAtticStructureContent: any = [];
  InsulationRoofStructureContent: any = [];
  InsulationExhastVentStructureContent: any = [];

  PlumbingWaterSuppyContent: any = [];
  PlumbingServicePipeContent: any = [];
  PlumbingSuppyPipingContent: any = [];

  PlumbingWasteSystemStructureContent: any = [];
  PlumbingDrainStructureContent: any = [];
  PlumbingWaterHeaterPressureStructureContent: any = [];

  RoofingCoveringStructureContent: any = [];
  RoofingGuttersDownspoutsStructureContent: any = [];
  RoofingMethodsStructureContent: any = [];
  RoofingChimneysStructureContent: any = [];

  generalDescriptionContent: any = [];

  generalContent: any = [];

  AllDumyDocs: any = [];

  RoofingLimitationsContent: any = [];
  constructor(
    public alertController: AlertController,
    public navCtrl: NavController,
    private storage: Storage,
    public toastController: ToastController,
    private file: File,
    private fileOpener: FileOpener,
    private base64: Base64,
    private plt: Platform
  ) {
    this.storage.create();

    this.AllDumyDocs = [
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

    this.inspectionTypes = [
      {
        name: 'Client Info',

        val: '0',
      },

      {
        name: 'Structure',

        val: '1',
      },
      {
        name: 'Roofing',

        val: '3',
      },
      {
        name: 'Exterior',

        val: '4',
      },
      {
        name: 'Electrical',

        val: '5',
      },
      {
        name: 'Cooling/ HVAC',

        val: '6',
      },

      {
        name: 'Insulation',

        val: '8',
      },
      {
        name: 'Plumbing',

        val: '9',
      },
      {
        name: 'Interior',

        val: '10',
      },
      {
        name: 'Appliances',

        val: '11',
      },
      // {
      //   name: 'Optional Sections',

      //   val: '1',
      // },
      {
        name: 'General Information',

        val: '12',
      },
    ];

    this.StructureDescriptionContent = [
      {
        text: 'WALL STRUCTURE',
        checked: false,
      },
      {
        text: 'Wood Frame',
        checked: false,
      },
      {
        text: 'CEILING STRUCTURE',
        checked: false,
      },
      {
        text: 'Truss',
        checked: false,
      },
      {
        text: 'Rafters',
        checked: false,
      },

      {
        text: 'FOUDATION',
        checked: false,
      },
      {
        text: 'Slab on Grade',
        checked: false,
      },
      {
        text: 'Concrete',
        checked: false,
      },
    ];

    this.StructureObservationContent = [
      {
        text: 'Positive Attributes',
        checked: false,
      },
      {
        text:
          'The building exhibits no evidence of substantial structural movement.      ',
        checked: false,
      },
      {
        text: 'General Comments',
        checked: false,
      },
      {
        text:
          'Many homes may have circumstances where construction practices or standards have changed since the home was built. Updating/upgrading systems are not a requirement if the home was built to the standards of the day construction was completed. It would be cost prohibitive to bring everything to current standards for every home',
        checked: false,
      },
    ];

    this.StructureCommentsContent = [
      {
        text:
          'Monitor: This home is situated in an area known for wood destroying insect activity (Florida). Wood destroying insects can do a substantial amount of damage to the wood structural components of a home. Since termites are a living and breeding insect, sometimes damage may take months or years to show evidence. Several steps can be taken to reduce the risk of a wood destroying insect problem. Additional treatment may be need in the event of swarms. Any form of wood/soil contact should be avoided. Controlling dampness in the soil around the perimeter of a home, including below porches and in crawl spaces, is recommended. Preventive chemical treatment, performed by a licensed pest control specialist, is also advisable. Termites are beyond the scope of the inspection. A licensed pest control specialist should be consulted for a thorough termite inspection and treatment (if necessary). If there is currently a termite bond the transfer of the bond is advisable.',
        checked: false,
      },
      {
        text:
          'Monitor: Common minor cracks were observed in the foundation walls of the house. This implies that some structural movement of the building has occurred, as is typical of most houses. This is usually the result of shrinkage and/or settling of the slab. It takes several years for the new concrete to fully cure. During the curing process it very common for concrete to crack due to thermal differential inside the core of the concrete. Thicker concrete slabs will cure more slowly than thinner slabs. During renovations, expect to find concrete cracks under the flooring. Floor coverings were not removed at the time of inspection. ',
        checked: false,
      },
    ];

    this.StructureLimitationsContent = [
      {
        text:
          'Structural components concealed behind finished surfaces could not be inspected.',
        checked: false,
      },
      {
        text:
          'Insulation obstructed the view of some structural components in the attic.',
        checked: false,
      },
      {
        text: 'There was no access all areas of the roof space/attic.',

        checked: false,
      },
      {
        text:
          'Insulation obstructed the view of some structural components in the attic.',

        checked: false,
      },
    ];
    this.RoofingDescriptionContent = [
      {
        text: 'Composite 3 Tab Dimensional Shingle',

        checked: false,
      },
      {
        text: 'Gutters and Downspouts - Metals',

        checked: false,
      },
      {
        text: 'Viewed from Ground',

        checked: false,
      },
      {
        text: 'Chimneys Metal below siding',

        checked: false,
      },
    ];
    this.RoofingObservationContent = [
      {
        text:
          ' The roof coverings are older as is typical for homes in this area. Enclosed porch coverings are susceptible to leakage at connection points where sections adjoin. Sealing of these areas is a relatively minor task, when needed. The configuration of the roofing system is susceptible to leaf damming. The potential for leaf dams can vary with the severity of the leaf shedding. Severe dams can result in roof leakage, typically near the eaves. Solutions include cleaning of clogged downspouts and gutters.',

        checked: false,
      },
      {
        text:
          'Improve: The roofing is nearing the later stages of its life cycle. Minor repairs are recommended in the short term to maintain the weather tightness of the roof. Damaged or missing roofing material should be repaired. All roof penetrations should be examined and sealed as necessary. Some insurance companies are limiting coverage on homes with shingle roofs that are 15 years or older.',

        checked: false,
      },
    ];
    this.RoofingLimitationsContent = [
      {
        text:
          'Roofs are designed to shed water like an umbrella and are not “waterproof”. In events of wind driven rains, and periods of intense rain, water can sometimes blow into areas such as ridge vents, roof vents and valleys and present leaking conditions. This occurrence is rare, but can possibly happen in severe storm events. Unless it is raining at the time of inspection, some roof leaks may not be identified during the inspection process..',

        checked: false,
      },
      {
        text:
          'Insulation obstructed the view of some structural components in the attic.',

        checked: false,
      },
      {
        text:
          'As prescribed in the inspection authorization and agreement, this is a visual inspection only. Roofing life expectancies can vary depending on several factors. Any estimates of remaining life are approximations only. This assessment of the roof does not preclude the possibility of leakage. Leakage can develop at any time and may depend on rain intensity, wind direction, ice build up, etc.',

        checked: false,
      },
      {
        text:
          'Please refer to the NACHI® Inspector Standards for a full explanation of the scope of the inspection. NACHI.org',

        checked: false,
      },
    ];

    this.ExteriorDescriptionContent = [
      {
        text: 'Wall Cladding: Brick, Vinyl',

        checked: false,
      },
      {
        text: 'Soffit and Fascia: Vinyl',

        checked: false,
      },

      {
        text: 'Window/Door Frames and Trim: Wood, Metal, Vinyl',

        checked: false,
      },
      {
        text: 'Porches, Decks, and Steps: Wood, Concrete',

        checked: false,
      },

      {
        text: 'Lot Grading: Level Grade',

        checked: false,
      },
    ];

    this.ExteriorObservationContent = [
      {
        text:
          'The exterior siding that has been installed on the house is relatively low maintenance. The aluminum and vinyl soffits and fascia are an excellent feature of the exterior of the home.',

        checked: false,
      },
      {
        text:
          'The exterior of the home shows signs of normal wear and tear for a home of this age and construction..',

        checked: false,
      },
    ];
    this.ExteriorLimitationsContent = [
      {
        text:
          'The general topography of the area is such that it will be difficult to control storm water entirely. During heavy rains, the accumulation of storm water on the lot may be unavoidable.',

        checked: false,
      },
      {
        text:
          'Please refer to the NACHI® Inspector Standards for a full explanation of the scope of the inspection. NACHI.org',

        checked: false,
      },
    ];

    this.ElectricalDescriptionContent = [
      {
        text: 'Service Entrance Wires: Main Disconnect: Underground',

        checked: false,
      },

      {
        text:
          'Main Distribution Panel: Branch/Auxiliary Panel(s): Breakers –100 Amp ',

        checked: false,
      },

      {
        text:
          'Ground Fault Circuit Interrupters: Copper 􏰀Ground Connection Not Visibl',

        checked: false,
      },
    ];

    this.ElectricalObservationContent = [
      {
        text:
          'Generally speaking, the electrical system is in good order. Dedicated 220-volt circuits have been provided for all 220-volt appliances within the home. All visible wiring within the home is copper. This is a good quality electrical conductor.',

        checked: false,
      },
      {
        text:
          'A licensed electrician should be consulted to undertake the improvements recommended below.',

        checked: false,
      },
    ];
    this.ElectricalLimitationsContent = [
      {
        text:
          'As prescribed in the inspection authorization and agreement, this is a visual inspection only. The inspection does not include low voltage systems, telephone wiring, intercoms, alarm systems, TV cable, timers or smoke detectors.',

        checked: false,
      },
      {
        text:
          'Please refer to the NACHI® Inspector Standards for a full explanation of the scope of the inspection. NACHI.org',

        checked: false,
      },
    ];

    this.CoolingHVACDescriptionContent = [
      {
        text: 'Energy Source: Electricity 240 Volt Power Supply',

        checked: false,
      },
      {
        text: 'Air Flow: 300-600 FPM',

        checked: false,
      },
      {
        text: 'There was no access all areas of the roof space/attic.',

        checked: false,
      },
      {
        text:
          'Insulation obstructed the view of some structural components in the attic.',

        checked: false,
      },
    ];

    this.CoolingHVACObservationContent = [
      {
        text:
          'The heat pump serves to air-condition the home and provide heat during cooler weather conditions. Upon testing in the air conditioning mode, a normal temperature drop across the evaporator coil was observed. This suggests that the system is operating properly. The system responded properly to operating controls.',

        checked: false,
      },
      {
        text:
          'It would be wise to consider a homeowner’s warranty to protect the buyers from unexpected breakdown and failure. The cooling system requires annual maintenance in addition to the monthly change of filters. String trimming equipment should be used carefully around siding and exterior air conditioning equipment.',

        checked: false,
      },
    ];

    this.CoolingHVACLimitationsContent = [
      {
        text:
          'As prescribed in the inspection authorization and agreement, this is a visual inspection only. Air conditioning and heat pump systems, like most mechanical components, can fail at any time.',

        checked: false,
      },
    ];

    this.StructureWallStructureContent = [
      {
        text: 'Wood Frame',
        checked: false,
      },
      {
        text: 'Panel',
        checked: false,
      },
    ];

    this.StructureCeilingStructureContent = [
      {
        text: 'Truss',
        checked: false,
      },
      {
        text: 'Rafters',
        checked: false,
      },
    ];

    this.StructureRoofStructureContent = [
      {
        text: 'Plywood',
        checked: false,
      },
      {
        text: 'Waferboard',
        checked: false,
      },
      {
        text: 'Truss',
        checked: false,
      },
      {
        text: 'Rafters',
        checked: false,
      },
    ];

    this.generalDescriptionContent = [
      {
        text: 'generalDescriptionContent',

        checked: false,
      },
    ];

    this.generalContent = [
      {
        text:
          'We will perform a visual inspection of the home/building and provide you with a written report identifying the defects that we (1) observed and (2) deemed material. The report is only supplementary to the seller’s disclosure.',

        checked: false,
      },

      {
        text:
          'Unless otherwise noted in this Agreement or not possible, we will perform the inspection in accordance with the current Standards of Practice (SOP) of the International Association of Certified Home Inspectors (“InterNACHI”) posted at www.nachi.org/sop If your jurisdiction has adopted mandatory standards that differ from InterNACHI’s SOP, we will perform the inspection in accordance with your jurisdiction’s standards. You understand that InterNACHI’s SOP contains limitations, exceptions, and exclusions. You understand that InterNACHI is not a party to this Agreement, has no control over us, and does not employ or supervise us.',

        checked: false,
      },

      {
        text:
          'Unless otherwise indicated in writing, we will NOT test for the presence of radon, a harmful gas. Unless otherwise indicated in writing, we will not test for mold. Unless otherwise indicated in writing, we will not test for compliance with applicable building codes or for the presence of or for any potential dangers arising from the presence of asbestos, lead paint, soil contamination, or other environmental hazards or violations. If any structure you want us to inspect is a log structure or includes log construction, you understand that such structures have unique characteristics that may make it impossible for us to inspect and evaluate them. Therefore, the scope of our inspection will not include decay of the interior of logs in log walls, log foundations or roofs, or similar defects.',

        checked: false,
      },

      {
        text:
          'Our inspection and report are for your use only. You give us permission to discuss our observations with real estate agents, owners, repair persons, or other interested parties. You will be the sole owner of the report and all rights to it. We are not responsible for use or misinterpretation by third parties, and third parties who rely on it in any way do so at their own risk and release us (including employees and business entities) from any liability whatsoever. If you or any person acting on your behalf provide the report to a third party who then sues you and/or us, you release us from any liability and agree to pay our costs and legal fees in defending any action naming us. Our inspection and report are in no way a guarantee or warranty, express or implied, regarding the future use, operability, habitability or suitability of the home/building or its components. We disclaim all warranties, express or implied, to the fullest extent allowed by law.',

        checked: false,
      },

      {
        text:
          'We do not perform engineering, architectural, plumbing, or any other job function requiring an occupational license in the jurisdiction where the property is located. If we hold a valid occupational license, we may inform you of this and you may hire us to perform additional functions. Any agreement for such additional services shall be in a separate writing.',

        checked: false,
      },

      {
        text:
          'Any dispute, controversy, interpretation or claim including claims for, but not limited to, breach of contract, any form of negligence, fraud, or misinterpretation arising out of, from or related to, this contractor arising out of, from or related to the inspection or inspection report shall be submitted first to a Non-Binding Mediation conference and absent a voluntary settlement through Non-Binding Mediation to followed by final and Binding Arbitration, if necessary, as conducted by Construction Dispute Resolution Services, LLC or Resolute Systems Inc. utilizing their respective Rules and Procedures. If the dispute is submitted to Binding Arbitration, the decision of the Arbitrator appointed there under shall be final and binding and the enforcement of the Arbitration Award may be entered in any Court or administrative tribunal having jurisdiction thereof.',

        checked: false,
      },
    ];

    this.StructureAtticMethodStructureContent = [
      {
        text: 'Entered',
        checked: false,
      },
      {
        text: 'Inaccessible Areas',
        checked: false,
      },
    ];
    this.StructureFoundationStructureContent = [
      {
        text: 'Concrete',
        checked: false,
      },
      {
        text: 'Slab on Grade',
        checked: false,
      },
    ];
    this.StructureFloorStructureContent = [
      {
        text: 'Concrete',
        checked: false,
      },
    ];

    this.AppliancesPresentStructureContent = [
      {
        text: 'Refrigerator',
        checked: false,
      },
    ];
    this.AppliancesBuiltStructureContent = [
      {
        text: 'None',
        checked: false,
      },
    ];
    this.AppliancesTestedStructureContent = [
      {
        text: 'Electric Range',
        checked: false,
      },
      {
        text: 'Microwave Oven',
        checked: false,
      },
      {
        text: 'Dishwasher',
        checked: false,
      },
    ];

    this.AppliancesLaundryStructureContent = [
      {
        text: '240 Volt Circuit for Dryer',
        checked: false,
      },
      {
        text: 'Dryer Vented to Building Exterior',
        checked: false,
      },
      {
        text: '120 Volt Circuit for Washer',
        checked: false,
      },
      {
        text: 'Hot and Cold Water Supply for Washer',
        checked: false,
      },
      {
        text: 'Waste Standpipe for Washer',
        checked: false,
      },
    ];
    this.AppliancesOtherStructureContent = [
      {
        text: 'Door Bell',
        checked: false,
      },
      {
        text: 'Waste Disposer',
        checked: false,
      },
    ];

    this.CoolingHVACEnergyStructureContent = [
      {
        text: 'Electricity',
        checked: false,
      },
      {
        text: '240 Volt Power Supply',
        checked: false,
      },
    ];

    this.CoolingHVACTypeStructureContent = [
      {
        text: 'Air Source Central Heat Pump System',
        checked: false,
      },
    ];
    this.CoolingHVACManufacturerStructureContent = [
      {
        text: 'Tempstar',
        checked: false,
      },
    ];

    this.CoolingHVACDescriptionStructureContent = [
      {
        text: 'Model #N4H448GKG101',
        checked: false,
      },
      {
        text: 'Serial #E175110996􏰀Approximate Age (in years): 4',
        checked: false,
      },
    ];
    this.CoolingHVACTemperatureStructureContent = [
      {
        text: '13 degrees 􏰀 E Heat 29 Degrees Heat',
        checked: false,
      },
      {
        text: '18 Degrees Cooling',
        checked: false,
      },
    ];

    this.ElectricalServiceEntryGroundStructureContent = [
      {
        text: 'Underground',
        checked: false,
      },
    ];
    this.ElectricalMainDisconnectStructureContent = [
      {
        text: 'Breakers –100 Amp',
        checked: false,
      },
    ];
    this.ElectricalDistributionPanelStructureContent = [
      {
        text: 'Breakers Milbank',
        checked: false,
      },
    ];

    this.ElectricalAuxilliaryStructureContent = [
      {
        text: 'Breakers Square D',
        checked: false,
      },
    ];
    this.ElectricalWiringStructureContent = [
      {
        text: 'Copper',
        checked: false,
      },
    ];
    this.ElectricalGroundFaultStructureContent = [
      {
        text: 'Bathroom(s)',
        checked: false,
      },
      {
        text: 'Kitchen',
        checked: false,
      },
    ];

    this.ExteriorWallCladdingStructureContent = [
      {
        text: 'Brick',
        checked: false,
      },
      {
        text: 'Vinyl',
        checked: false,
      },
    ];

    this.ExteriorSoffitFasciaStructureContent = [
      {
        text: 'Vinyl',
        checked: false,
      },
    ];
    this.ExteriorWindowDoorStructureContent = [
      {
        text: 'Wood',
        checked: false,
      },
      {
        text: 'Metal',
        checked: false,
      },
      {
        text: 'Vinyl',
        checked: false,
      },
    ];

    this.ExteriorDrivewaysStructureContent = [
      {
        text: 'Concrete',
        checked: false,
      },
    ];
    this.ExteriorOverheadGarageStructureContent = [
      {
        text: 'Metal',
        checked: false,
      },
    ];
    this.ExteriorLotGradingStructureContent = [
      {
        text: 'Level Grade',
        checked: false,
      },
    ];

    this.InsulationAtticStructureContent = [
      {
        text: '0(Porches and garage)3-14 inches Fiberglass in Lower Attic',
        checked: false,
      },
    ];
    this.InsulationRoofStructureContent = [
      {
        text: 'Ridge Vents',
        checked: false,
      },
      {
        text: 'Soffit Vents',
        checked: false,
      },
    ];
    this.InsulationExhastVentStructureContent = [
      {
        text: 'Level Grade',
        checked: false,
      },
    ];

    this.PlumbingWaterSuppyContent = [
      {
        text: 'Public Water Supply',
        checked: false,
      },
    ];
    this.PlumbingServicePipeContent = [
      {
        text: 'Not Visible',
        checked: false,
      },
    ];
    this.PlumbingSuppyPipingContent = [
      {
        text: 'Copper',
        checked: false,
      },
      {
        text: 'Plastic',
        checked: false,
      },
    ];

    this.PlumbingWasteSystemStructureContent = [
      {
        text: 'Unknown (Reported by Seller)',
        checked: false,
      },
    ];
    this.PlumbingDrainStructureContent = [
      {
        text: 'Plastic',
        checked: false,
      },
    ];
    this.PlumbingWaterHeaterPressureStructureContent = [
      {
        text: 'Electric',
        checked: false,
      },
      {
        text: 'Approximate Capacity (in gallons): 50',
        checked: false,
      },
    ];

    this.RoofingCoveringStructureContent = [
      {
        text: 'Composite 3 Tab Dimensional Shingle',
        checked: false,
      },
    ];
    this.RoofingGuttersDownspoutsStructureContent = [
      {
        text: 'Metal',
        checked: false,
      },
    ];
    this.RoofingMethodsStructureContent = [
      {
        text: 'Viewed from Ground',
        checked: false,
      },
    ];
    this.RoofingChimneysStructureContent = [
      {
        text: 'Metal below siding',
        checked: false,
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

  async getPDFName() {
    const alert = await this.alertController.create({
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
              this.presentToast('Please Enter PDF name');
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
  async createPdf() {
    this.StoredData = JSON.parse(
      this.storageGet('InspectionToEdit')['__zone_symbol__value']
    );

    if (this.StoredData.report_section[0].ApproximateAgeofHouse === '') {
      this.presentToast('Please fill Report Overview');
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

    console.log(this.StoredData.storedReportOverviewImage);
    //ionic cordova run android -l

    let asb = this.StoredData.storedReportOverviewImage;
    console.log(asb);

    // if (
    //   this.selPDFname == '' ||
    //   this.selPDFname == undefined ||
    //   this.selPDFname == null
    // ) {
    //   this.getPDFName();
    //   return;
    // } else {
    //   this.PreviewPDF = true;
    // }

    this.PreviewPDF = true;

    this.StoredData = JSON.parse(
      this.storageGet('InspectionToEdit')['__zone_symbol__value']
    );

    // alert('yesssss' + this.GetFileDownloadType);
    this.selPDFname = this.StoredData.client_Info[0].clientName;

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
      this.StoredData.structureComments ||
      this.StoredData.structureLimitations ||
      this.StoredData.structureWallStructure != null ||
      this.StoredData.structureCeilingStructure != null
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
      this.StoredData.structureRoofStructure ||
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
              text: '• ' + this.StoredData.structureWallStructure[0].text,
              margin: [-50, 7, 0, 0],
            },
          ],
        ],
      });
    }

    if (this.StoredData.structureCeilingStructure != null) {
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
              text: this.StoredData.structureCeilingStructure,
              //text: '• ' + this.StoredData.structureCeilingStructure[0].text + ' • ' + this.StoredData.structureCeilingStructure[1].text,
              margin: [-50, 3, 0, 0],
            },
          ],
        ],
      });
    }
    if (this.StoredData.structureRoofStructure != null) {
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
              text: this.StoredData.structureRoofStructure,
              //text: '• ' + this.StoredData.structureRoofStructure[0].text + ' • ' + this.StoredData.structureRoofStructure[1].text,
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
            this.StoredData.structureLimitations, //tobe
            //this.StoredData.structureLimitations[1],
            //this.StoredData.structureLimitations[2],
            //this.StoredData.structureLimitations[3],
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
      this.StoredData.roofingLimitations != null
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
    if (this.StoredData.roofingDescription != null) {
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
        {
          columnGap: 30,
          width: '50%',
          margin: [30, 5, 0, 0],
          fontSize: 9,
          color: '#ed3833',
          columns: [this.StoredData.roofingDescription],
        }
      );
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
            this.StoredData.roofingLimitations, //tobe
            //this.StoredData.roofingLimitations[1],
            //this.StoredData.roofingLimitations[2]
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
      this.StoredData.exteriorLimitations != null
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
    if (this.StoredData.exteriorDescription != null) {
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
        {
          columnGap: 30,
          width: '50%',
          margin: [30, 5, 0, 0],
          fontSize: 9,
          color: '#ed3833',
          columns: [this.StoredData.exteriorDescription],
        }
      );
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
      this.StoredData.electricalLimitations != null
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
    if (this.StoredData.electricalDescription != null) {
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
        {
          columnGap: 30,
          width: '50%',
          margin: [30, 5, 0, 0],
          fontSize: 9,
          color: '#ed3833',
          columns: [this.StoredData.electricalDescription],
        }
      );
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
      this.StoredData.coolingLimitations != null
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
    if (this.StoredData.coolingDescription != null) {
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
        {
          columnGap: 30,
          width: '50%',
          margin: [30, 5, 0, 0],
          fontSize: 9,
          color: '#ed3833',
          columns: [this.StoredData.coolingDescription],
        }
      );
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
      this.StoredData.insulationLimitations != null
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
    if (this.StoredData.insulationDescription != null) {
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
        {
          columnGap: 30,
          width: '50%',
          margin: [30, 5, 0, 0],
          fontSize: 9,
          color: '#ed3833',
          columns: [this.StoredData.insulationDescription],
        }
      );
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
      this.StoredData.plumbingLimitations != null
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
    if (this.StoredData.plumbingDescription != null) {
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
        },
        {
          columnGap: 30,
          width: '50%',
          margin: [0, 5, 0, 0],
          fontSize: 9,
          color: '#ed3833',
          columns: [this.StoredData.plumbingDescription],
        }
      );
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
    if (this.plt.is('cordova')) {
      console.log('Came for download (android)');
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });

        this.file.writeFile(
          this.file.externalDataDirectory,
          this.selPDFname + '.pdf',
          blob,
          {
            replace: false,
          }
        );
        /* .then((fileEntry) => {
            this.PreviewPDF = false;
            this.fileOpener.open(
              this.file.dataDirectory + this.selPDFname + '.pdf',
              'application/pdf'
            );
          }); */
      });
    } else {
      this.PreviewPDF = false;
      this.pdfObj.download(this.selPDFname + '.pdf');
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
