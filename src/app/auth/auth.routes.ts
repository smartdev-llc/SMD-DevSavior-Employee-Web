import { PolicyComponent } from './components/policy/policy.component';
import { CompanyLoggedGuard } from '../core/guards/company-logged.guard';
import { RegisterSuccessCPComponent } from './components/registerSuccessCP/registerSuccessCP.component';

export const AuthRoutes = [
  { path: 'cp-register-success', component: RegisterSuccessCPComponent, canActivate: [CompanyLoggedGuard] },
  { path: 'privacy-policy', component: PolicyComponent }
];
