import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../shared/footer/footer.component';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { ImprestRequestService } from '../../services/finance-services/imprest-request-service';
import { AuthService, AuthUser } from '../../services/auth-services/auth.service';
import { ImprestRequestsModel } from './imprest-request-model';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-imprest-request',
  imports: [CommonModule, FormsModule, SidebarComponent, HeaderComponent, FooterComponent],
  templateUrl: './imprest-request.html',
  styleUrl: './imprest-request.css'
})
export class ImprestRequest implements OnInit, OnDestroy {

    private destroy$ = new Subject<void>();
    
    sidebarOpen = false;
    searchTerm = '';
    currentPage = 1;
    itemsPerPage = 10;
    
    imprestRequestList: ImprestRequestsModel[]=[];
    user: AuthUser | null = null;
    employeeNo: any;

  constructor(
    private router: Router,
    private imprestRequestService:ImprestRequestService,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}


  ngOnInit(): void {
  this.user = this.authService.getLoggedInUser();
  this.employeeNo = this.user?.employeeNo;       

  this.imprestRequestService.getImprestRequests(this.employeeNo).subscribe(data=>{
     this.imprestRequestList =data;
   })
  }

    ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

navigateToNewActivity() {
  const formValues: any = {
    employeeNo: this.employeeNo
  };
  this.imprestRequestService.createImprestRequest(formValues).subscribe({
    next: (data) => {
      this.router.navigate(['/new-imprest-request/', btoa(data['documentNo'])]);
    },
    error: (err) => {
      const message = err.error?.responseDescription || 'Failed to create imprest request.';
      this.notificationService.error('', message);
    }
  });
}


  editRequest(no: any) {
    this.router.navigate(['/new-imprest-request',btoa(no)]);
  }

  viewRequest(request: any) {
    this.router.navigate(['/edit-activity-request', request.id]);
  }

  cancelEdit(request: any) {
    if (request.originalData) {
      // Restore original data
      Object.assign(request, request.originalData);
      delete request.originalData;
    }
    request.editable = false;
  }


}
