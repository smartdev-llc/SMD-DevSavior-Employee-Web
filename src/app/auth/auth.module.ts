import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { MatchingPasswordDirective } from './validators/matching-password.directive';
import { AuthRoutes as routes } from './auth.routes';
import { PolicyComponent } from './components/policy/policy.component';
import { RegisterSuccessCPComponent } from './components/registerSuccessCP/registerSuccessCP.component';

@NgModule({
  imports: [

  CommonModule,
    RouterModule.forChild(routes),
    LayoutModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    RegisterSuccessCPComponent,
    MatchingPasswordDirective,
    PolicyComponent
  ]
})
export class AuthModule { }
