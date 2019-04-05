import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { SharedModule } from '../shared/shared.module';
import { CompanyRoutes } from './company.routes';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FindResumesComponent } from './components/find-resumes/find-resumes.component';
import { JobListComponent } from './components/job-list/job-list.component';
import { CandidateListComponent } from './components/candidate-list/candidate-list.component';
import { LayoutModule } from '../layout';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CpRegisterComponent } from './components/cp-register/cp-register.component';
import { PostJobComponent } from './components/post-job/post-job.component';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component';
import { CarouselModule } from 'ngx-bootstrap';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { CategoryCompanyService } from '../core/services/category/CategoryCompanyService';
import { PostJobCompanyService } from '../core/services/post-job/PostJobCompanyService';
import { SkillService } from '../core/services/skill/SkillService';
import { ProfileService } from './services/profile.service';
import { CompanyVerifyAccountComponent } from './components/company-verify-account/company-verify-account.component';
import { ProfileDeletedComponent } from './components/profile-deleted/profile-deleted.component';
import { BlackListCandidateComponent } from './components/blacklist-candidate/blacklist-candidate.component';
import { ByResumeSearchComponent } from './components/by-resume-search/by-resume-search.component';
import { LostPasswordComponent } from './components/lost-password/lost-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { CandidateDetailComponent } from './components/candidate-detail/candidate-detail.component';
import { CandidateService } from '../core/services/candidate/candidate.service';
import { EditJobComponent }  from './components/edit-job/edit-job.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component'
import { DetailJobComponent } from './detail-job/detail-job.component';
import {JobService} from '../core/services/job.service';
import { ShareButtonModule } from '@ngx-share/button';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CompanyRoutes),
    CarouselModule.forRoot(),
    QuillModule,
    LayoutModule,
    NgSelectModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    SharedModule,
    PaginationModule.forRoot(),
    ScrollToModule.forRoot(),
    ShareButtonModule.forRoot()


  ],
  declarations: [
    HomeComponent,
    LoginComponent,
    FindResumesComponent,
    JobListComponent,
    CandidateListComponent,
    CpRegisterComponent,
    PostJobComponent,
    CompanyProfileComponent,
    CompanyVerifyAccountComponent,
    BlackListCandidateComponent,
    ProfileDeletedComponent,
    ByResumeSearchComponent,
    LostPasswordComponent,
    ResetPasswordComponent,
    CandidateDetailComponent,
    EditJobComponent,
    ChangePasswordComponent,
    DetailJobComponent
  ],
  providers: [
    CategoryCompanyService,
    PostJobCompanyService,
    SkillService,
    ProfileService,
    CandidateService,
    JobService
  ]
 })

export class CompanyModule {   }
