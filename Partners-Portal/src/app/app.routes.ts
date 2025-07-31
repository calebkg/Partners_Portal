import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PaymentRequestComponent } from './components/payment-request/payment-request.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: PaymentRequestComponent }, // Using payment request as placeholder
  { path: 'approved-funding', component: PaymentRequestComponent }, // Using payment request as placeholder
  { path: 'payment-request', component: PaymentRequestComponent },
  { path: 'payment-surrender', component: PaymentRequestComponent }, // Using payment request as placeholder
  { path: 'reimbursements', component: PaymentRequestComponent }, // Using payment request as placeholder
];
