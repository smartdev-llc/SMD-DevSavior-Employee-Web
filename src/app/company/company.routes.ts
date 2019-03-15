import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FindResumesComponent } from './components/find-resumes/find-resumes.component';
import { JobListComponent } from './components/job-list/job-list.component';
import { CandidateListComponent } from './components/candidate-list/candidate-list.component';
import { CpRegisterComponent } from './components/cp-register/cp-register.component';
import { PostJobComponent } from './components/post-job/post-job.component';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component';
import { ProfileDeletedComponent } from './components/profile-deleted/profile-deleted.component';
import { BlackListCandidateComponent } from './components/blacklist-candidate/blacklist-candidate.component';
import { ByResumeSearchComponent } from './components/by-resume-search/by-resume-search.component';
import { EditJobComponent }  from './components/edit-job/edit-job.component';

// Guards
import { CompanyUserAuthGuard } from '../core/guards/company-user.guard';
import { CompanyLoggedGuard } from '../core/guards/company-logged.guard';
import { CompanyVerifyAccountComponent } from './components/company-verify-account/company-verify-account.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { LostPasswordComponent } from './components/lost-password/lost-password.component';
import { CandidateDetailComponent } from './components/candidate-detail/candidate-detail.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import {DetailJobComponent} from './detail-job/detail-job.component';

export const CompanyRoutes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent, canActivate: [CompanyLoggedGuard] },
    { path: 'register', component: CpRegisterComponent, canActivate: [CompanyLoggedGuard] },
    { path: 'find-resumes', component: FindResumesComponent, canActivate: [CompanyUserAuthGuard] },
    { path: 'jobs/:type', component: JobListComponent, canActivate: [CompanyUserAuthGuard] },
    { path: 'jobs/:jobId/candidates', component: CandidateListComponent, canActivate: [CompanyUserAuthGuard] },
    { path: 'jobs/:jobId/candidates/:candidateId', component: CandidateDetailComponent, canActivate: [CompanyUserAuthGuard] },
    { path: 'company/job/:jobId', component: DetailJobComponent, canActivate: [CompanyUserAuthGuard] },
    { path: 'post-job', component: PostJobComponent, canActivate: [CompanyUserAuthGuard] },
    { path: 'profile', component: CompanyProfileComponent, canActivate: [CompanyUserAuthGuard] },
    { path: 'verify-account', component: CompanyVerifyAccountComponent, canActivate: [CompanyLoggedGuard] },
    { path: 'blacklist-candidate', component: BlackListCandidateComponent, canActivate: [CompanyLoggedGuard] },
    { path: 'profile-deleted', component: ProfileDeletedComponent, canActivate: [CompanyLoggedGuard] },
    { path: 'by-resume-search', component: ByResumeSearchComponent, canActivate: [CompanyLoggedGuard] },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'lost-password', component: LostPasswordComponent },
    { path: 'jobs/:id/edit', component: EditJobComponent, canActivate: [CompanyUserAuthGuard] },
    { path : 'detail-candidate/:jobId/:candidateId', component: CandidateDetailComponent, canActivate: [CompanyUserAuthGuard] },
    { path: 'change-password', component: ChangePasswordComponent, canActive: [CompanyUserAuthGuard] }
];
