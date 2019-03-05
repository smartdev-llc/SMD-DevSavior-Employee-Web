import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
// Components
import { HomeCompanyComponent } from './home-company/home-company.component';
import { FooterComponent } from './footer/footer.component';
import { HomeCompanyLoggedComponent } from './home-company-logged/home-company-logged.component';
import { HeaderComponent } from './header/header.component';

import { LanguageService } from './services/language.service';

// Modules
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    // components
    HeaderComponent,
    FooterComponent,
    HomeCompanyComponent,
    HomeCompanyLoggedComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    HomeCompanyComponent,
    HomeCompanyLoggedComponent
  ],
  imports: [
  RouterModule,
    SharedModule
  ],
  providers: [
    LanguageService
  ]
})
export class LayoutModule { }
