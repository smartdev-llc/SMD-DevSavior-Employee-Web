import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NgxInputStarRatingModule } from '@ngx-lite/input-star-rating';
import { LayoutModule } from '../layout/index';
import { SharedModule } from '../shared/shared.module';
import { HomeModule } from '../home/index';
// Components
import { BrowseJobsComponent } from './components/list-browse-jobs/browse-jobs.component';
import { BrowseJobsAlternativeComponent } from './components/list-browse-jobs-alternative/browse-jobs-alternative.component';
import { JobDetailComponent } from './components/job-detail/job-detail.component';
import { PostJobComponent } from './components/post-job/post-job.component';

// Breadcrumb components
// Routes
import { JobsRoutes as routes } from './jobs.routes';

@NgModule({
  declarations: [
    BrowseJobsComponent,
    BrowseJobsAlternativeComponent,
    JobDetailComponent,
    PostJobComponent
  ],
  exports: [
    BrowseJobsComponent,
    BrowseJobsAlternativeComponent,
    JobDetailComponent,
    PostJobComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    NgxInputStarRatingModule,
    LayoutModule,
    SharedModule,
    HomeModule
  ]
})
export class JobsModule { }