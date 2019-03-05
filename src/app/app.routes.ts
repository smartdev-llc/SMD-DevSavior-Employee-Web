import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: './company/company.module#CompanyModule'
  },
  {
    path: '',
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: '',
    loadChildren: './jobs/jobs.module#JobsModule'
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
