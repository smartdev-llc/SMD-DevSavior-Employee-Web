import { Component, OnInit } from '@angular/core';
import {JobService} from '../../core/services/job.service';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap, take} from 'rxjs/operators';
import {Company} from '../../core/models/company';
import {faFacebookSquare} from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
import {faGooglePlusG} from '@fortawesome/free-brands-svg-icons/faGooglePlusG';
import {faLinkedinIn} from '@fortawesome/free-brands-svg-icons/faLinkedinIn';
import {faPinterest} from '@fortawesome/free-brands-svg-icons/faPinterest';
import {SeoService} from '../../shared/services/seo.service';
import {environment} from '../../../environments/environment';


@Component({
  selector: 'app-detail-job',
  templateUrl: './detail-job.component.html',
  styleUrls: ['./detail-job.component.css']
})
export class DetailJobComponent implements OnInit {

  isLoading = false;
  jobId = '';
  job: any;
  company: Company;
  logoCompany = 'assets/images/widget1image.png';
  fbIcon = faFacebookSquare;
  pinIcon = faPinterest;
  linkedInIcon = faLinkedinIn;
  googlePlusIcon = faGooglePlusG;
  enviromentObj = environment;

  constructor(
    private jobService: JobService,
    private route: ActivatedRoute,
    private router: Router,
    private seo: SeoService
  ) { }

  ngOnInit() {
    this.jobId = this.route.snapshot.paramMap.get('jobId');
    this.isLoading = true;
    console.log('log');

    this.route.paramMap.pipe(
      switchMap(route => this.jobService.getDetailJob(route.get('jobId')))
    ).subscribe( data => {

      this.isLoading = false;
      this.job = data;
      this.company = <Company> data['company'];

      // meta tags for SEO
        const imageCompany = this.company.logoURL ? this.enviromentObj.apiEndpoint + this.company.logoURL : './assets/images/headerimage1.jpg';
        const jobDescription = this.removeHtmlTags(this.job.description);
        this.seo.generateTags({
          title: this.job.title,
          description: jobDescription,
          image: imageCompany,
          slug: this.router.url
        });
      },
      error => {
        this.isLoading = false;
        this.router.navigate(['not-found']);
      });


  }

  getCompanyWebsite() {
    if (this.company.website && this.company.website.indexOf('http') !== 0) {
      return 'http://' + this.company.website;
    }

    return this.company.website;
  }

  private removeHtmlTags(text: string) {
    const regex = /(<([^>]+)>)/ig;
    const result = text.replace(regex, '');
    return result.trim();
  }

}
