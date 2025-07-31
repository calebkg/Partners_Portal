import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { ApprovedFundingComponent } from './components/approved-funding/approved-funding.component';
import { PaymentRequestComponent } from './components/payment-request/payment-request.component';
import { PaymentSurrenderComponent } from './components/payment-surrender/payment-surrender.component';
import { ReimbursementsComponent } from './components/reimbursements/reimbursements.component';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    ApprovedFundingComponent,
    PaymentRequestComponent,
    PaymentSurrenderComponent,
    ReimbursementsComponent
  ],
  providers: []
})
export class AppModule { }