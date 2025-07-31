import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PaymentRequestComponent } from './components/payment-request/payment-request.component';
import { NewPaymentRequestComponent } from './components/payment-request/new-payment-request/new-payment-request.component';
import { PaymentSurrenderComponent } from './components/payment-surrender/payment-surrender.component';
import { NewPaymentSurrenderComponent } from './components/payment-surrender/new-payment-surrender/new-payment-surrender.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: PaymentRequestComponent }, // Using payment request as placeholder
  { path: 'approved-funding', component: PaymentRequestComponent }, // Using payment request as placeholder
  { path: 'payment-request', component: PaymentRequestComponent },
  { path: 'new-payment-request', component: NewPaymentRequestComponent },
  { path: 'new-payment-request/:id', component: NewPaymentRequestComponent },
  { path: 'payment-surrender', component: PaymentSurrenderComponent },
  { path: 'new-payment-surrender', component: NewPaymentSurrenderComponent },
  { path: 'new-payment-surrender/:id', component: NewPaymentSurrenderComponent },
  { path: 'reimbursements', component: PaymentRequestComponent }, // Using payment request as placeholder
];
