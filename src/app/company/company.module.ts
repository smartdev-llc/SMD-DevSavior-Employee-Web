import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CompanyRoutes } from './company.routes';
import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/login/login.component';
import { FindResumesComponent } from './components/find-resumes/find-resumes.component';
import { JobListComponent } from './components/job-list/job-list.component';
import { CandidateListComponent } from './components/candidate-list/candidate-list.component';
import { LayoutModule } from '../layout/index';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DetailCandidateComponent } from './components/detail-candidate/detail-candidate.component';
import { CpRegisterComponent } from './components/cp-register/cp-register.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CompanyRoutes),
    LayoutModule,
    NgSelectModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule
  ],
  declarations: [
    HomeComponent,
    LoginComponent,
    FindResumesComponent,
    JobListComponent,
    CandidateListComponent,
    DetailCandidateComponent,
    CpRegisterComponent
  ],
  bootstrap: [ HomeComponent ]
})
export class CompanyModule { }
