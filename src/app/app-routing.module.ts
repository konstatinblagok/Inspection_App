import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'create-inspection',
    loadChildren: () => import('./modal/create-inspection/create-inspection.module').then( m => m.CreateInspectionPageModule)
  },
  {
    path: 'inspection-detail',
    loadChildren: () => import('./inspection-detail/inspection-detail.module').then( m => m.InspectionDetailPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'common-selection',
    loadChildren: () => import('./modal/common-selection/common-selection.module').then( m => m.CommonSelectionPageModule)
  },
  {
    path: 'report-selection',
    loadChildren: () => import('./modal/report-selection/report-selection.module').then( m => m.ReportSelectionPageModule)
  },
  {
    path: 'structure-selection',
    loadChildren: () => import('./modal/structure-selection/structure-selection.module').then( m => m.StructureSelectionPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
