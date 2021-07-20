import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'welcome-page',
    loadChildren: () =>
      import('./welcome-page/welcome-page.module').then(
        (m) => m.WelcomePagePageModule
      ),
  },
  {
    path: '',
    redirectTo: 'welcome-page',
    pathMatch: 'full',
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.module').then((m) => m.SettingsPageModule),
  },
  {
    path: 'create-inspection',
    loadChildren: () =>
      import('./modal/create-inspection/create-inspection.module').then(
        (m) => m.CreateInspectionPageModule
      ),
  },
  {
    path: 'inspection-detail',
    loadChildren: () =>
      import('./inspection-detail/inspection-detail.module').then(
        (m) => m.InspectionDetailPageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./signup/signup.module').then((m) => m.SignupPageModule),
  },
  {
    path: 'common-selection',
    loadChildren: () =>
      import('./modal/common-selection/common-selection.module').then(
        (m) => m.CommonSelectionPageModule
      ),
  },
  {
    path: 'report-selection',
    loadChildren: () =>
      import('./modal/report-selection/report-selection.module').then(
        (m) => m.ReportSelectionPageModule
      ),
  },
  {
    path: 'structure-selection',
    loadChildren: () =>
      import('./modal/structure-selection/structure-selection.module').then(
        (m) => m.StructureSelectionPageModule
      ),
  },
  {
    path: 'roofing-selection',
    loadChildren: () =>
      import('./modal/roofing-selection/roofing-selection.module').then(
        (m) => m.RoofingSelectionPageModule
      ),
  },
  {
    path: 'exterior-selection',
    loadChildren: () =>
      import('./modal/exterior-selection/exterior-selection.module').then(
        (m) => m.ExteriorSelectionPageModule
      ),
  },
  {
    path: 'electrical-selection',
    loadChildren: () =>
      import('./modal/electrical-selection/electrical-selection.module').then(
        (m) => m.ElectricalSelectionPageModule
      ),
  },
  {
    path: 'cooling-hvac-selection',
    loadChildren: () =>
      import(
        './modal/cooling-hvac-selection/cooling-hvac-selection.module'
      ).then((m) => m.CoolingHvacSelectionPageModule),
  },
  {
    path: 'insulation-selection',
    loadChildren: () =>
      import('./modal/insulation-selection/insulation-selection.module').then(
        (m) => m.InsulationSelectionPageModule
      ),
  },
  {
    path: 'plumbing-selection',
    loadChildren: () =>
      import('./modal/plumbing-selection/plumbing-selection.module').then(
        (m) => m.PlumbingSelectionPageModule
      ),
  },
  {
    path: 'interior-selection',
    loadChildren: () =>
      import('./modal/interior-selection/interior-selection.module').then(
        (m) => m.InteriorSelectionPageModule
      ),
  },
  {
    path: 'appliances-selection',
    loadChildren: () =>
      import('./modal/appliances-selection/appliances-selection.module').then(
        (m) => m.AppliancesSelectionPageModule
      ),
  },
  {
    path: 'general-information',
    loadChildren: () => import('./modal/general-information/general-information.module').then( m => m.GeneralInformationPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
