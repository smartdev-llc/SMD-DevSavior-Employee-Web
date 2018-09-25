
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FindResumesComponent } from './components/find-resumes/find-resumes.component';
import { JobListComponent } from "./components/job-list/job-list.component";
import { CandidateListComponent } from "./components/candidate-list/candidate-list.component";

export const CompanyRoutes = [
    {
        path: 'employer',
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent },
            { path: 'home', component: HomeComponent },
            { path: 'find-resumes', component: FindResumesComponent },
            { path: 'jobs', component: JobListComponent},
            { path: 'candidates', component: CandidateListComponent}
        ]
    }
];