import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ApprovedFundingComponent } from './components/approved-funding/approved-funding.component';
import { PaymentRequestComponent } from './components/payment-request/payment-request.component';
import { PaymentSurrenderComponent } from './components/payment-surrender/payment-surrender.component';
import { ReimbursementsComponent } from './components/reimbursements/reimbursements.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'approved-funding', component: ApprovedFundingComponent },
  { path: 'payment-request', component: PaymentRequestComponent },
  { path: 'payment-surrender', component: PaymentSurrenderComponent },
  { path: 'reimbursements', component: ReimbursementsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }