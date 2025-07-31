import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { ImprestRequestService } from '../../../services/finance-services/imprest-request-service';
import { GlobalDimenisionModel } from '../global-dimenision-model';
import { NgSelectModule } from '@ng-select/ng-select';
import { StandardModel } from '../standard-model';
import { AuthService, AuthUser } from '../../../services/auth-services/auth.service';
import { NotificationService } from '../../../services/notification.service';


@Component({
  selector: 'app-new-imprest-request',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, HeaderComponent, FooterComponent,ReactiveFormsModule,NgSelectModule],
  providers: [DatePipe],
  templateUrl: './new-imprest-request.component.html',
  styleUrls: ['./new-imprest-request.component.scss']
})
export class NewImprestRequestComponent {
  sidebarOpen = false;
   imprestRequestForm: FormGroup;
   dimension1_list:GlobalDimenisionModel[]=[];
   dimension2_code_list: Array<GlobalDimenisionModel>;
   dimension4_code_list: Array<GlobalDimenisionModel>;
   currency_code_list: Array<StandardModel>;
   imprest_code_list:Array<StandardModel>;
   imprestRequestLinesDetails: any;
   program_area_code_aist:Array<GlobalDimenisionModel>;
   showImprestLinesModal=false;
   showAddLineModal = false;
   no: string
   imprest_request_lines: any
   imprestRequestLinesForm: FormGroup
   showModal = false;
   isEditMode = false;
   employeeNo:any
   user: AuthUser | null = null;
   loading=false
  
  constructor(
    private router: Router,
    private imprestRequestService: ImprestRequestService,
    private fb: FormBuilder,
    private activatedRoutes: ActivatedRoute,
    private authService: AuthService,
     private datePipe: DatePipe,
     private notificationService: NotificationService
  ) {
     this.activatedRoutes.params.subscribe(data => {
      this.no = atob(data['id']);
    });
  }


  ngOnInit(): void {

    this.user = this.authService.getLoggedInUser();
    this.employeeNo = this.user?.employeeNo;  


    this.imprestRequestForm = this.fb.group({
      no: [''],
      employeeNo: [''],
      mpesaPhoneNo: [''],
      employeeName: [''],
      currencyCode: [''],
      startDate: [''],
      endDate: [''],
      postingDate: [''],
      approvalComment: [''],
      destination: [''],
      globalDimension1Code: [''],
      globalDimension2Code: [''],
      shortcutDimension3Code: [''],
      shortcutDimension4Code: [''],
      shortcutDimension5Code: [''],
      shortcutDimension6Code: [''],
      shortcutDimension7Code: [''],
      shortcutDimension8Code: [''],
      responsiblityCenter: [''],
      documentDate: [''],
      amount: [''],
      description: [''],
      newImprestLine:['']
    });
   this.imprestRequestLinesForm = this.fb.group({
      lineNo: 0,
      transactionCode: ['',Validators.required],
      documentNo: [''],
      quantity: [''],
      amount:[0,Validators.required],
      amountSpent: [0,Validators.required],
      description: ['',Validators.required],
      unitCost:[0,Validators.required],
      globalDimension1Code: [''],
      globalDimension2Code: ['',Validators.required],
      shortcutDimension3Code: ['',Validators.required],
      shortcutDimension4Code: [''],
      shortcutDimension5Code: [''],
      shortcutDimension6Code: [''],
      shortcutDimension7Code: [''],
      shortcutDimension8Code: [''],
     })
    this.getGlobalDimension1Codes()
    this.getAllImprestLines()
    this.getCurrencyCodes()
    

  if ((this.no !== undefined) || (this.no !== null)) {
      this.imprestRequestService.getSingleImprestRequest(this.no).subscribe(data => {
        // this.imprestRequestDetails = data;
        this.imprestRequestForm.patchValue(data);
        this.getGlobalDimension1Value(data.globalDimension1Code)
        this.getGlobalDimension1Codes();
      })
    }
  }
 getGlobalDimension1Codes() {
    this.imprestRequestService.getGlobalDimension1Codes().subscribe(data => {
      this.dimension1_list =data
    });
  }

  getGlobalDimension1Value(code: string){
    //
    if(code){
     this.imprestRequestService.getGlobalDimension2Codes(code).subscribe(data => {
      this.dimension2_code_list = data;
    });

    this.imprestRequestService.getShortcutDimension3Codes(code).subscribe(data => {
      this.program_area_code_aist = data
    })

    this.imprestRequestService.getShortcutDimension4Codes(code).subscribe(data=>{
        this.dimension4_code_list = data
    })
    }
  
  }

 getCurrencyCodes() {
    this.imprestRequestService.getCurrencyCodes().subscribe(data => {
      this.currency_code_list = data;
    });
  }

  getAllImprestLines() {
    this.imprestRequestService.getAllImprestLines(this.no).subscribe(data => {
      this.imprest_request_lines = data;
    });
  }

  getImprestCodes(){
    this.imprestRequestService.getProjectImprestTypeCodes().subscribe(data => {
     this.imprest_code_list = data
    })
  }

 updateImprestRequest() {
     this.loading=true
    if (this.imprestRequestForm.valid) {
      const formValues = this.imprestRequestForm.value;
      formValues.no = this.no;
      formValues.startDate = this.datePipe.transform(formValues.startDate, 'MM/dd/yyyy');
      formValues.endDate = this.datePipe.transform(formValues.endDate, 'MM/dd/yyyy');
      this.imprestRequestService.modifyImprestRequest(formValues).subscribe({
        next: (res) => {
          this.loading = false;
          this.notificationService.success('', res['responseDescription']);
          this.router.navigate(['imprest-request']);
          this.imprestRequestForm.reset();
        },
        error: (err) => {
          this.loading = false;
          const message = err.error?.responseDescription || 'Failed to update request.';
          this.notificationService.error('', message);
        }
      });

      } else {
        this.notificationService.warning('', 'Please fill all required fields correctly.');
        this.imprestRequestForm.markAllAsTouched();
    }

  }

  triggerFileUpload() {
    console.log('File upload triggered');
  }
  
  cancel() {
    this.router.navigate(['/imprest-request']);
  }



  openAddLineModal() {
    this.showAddLineModal = true;
    this.getImprestCodes()
    this.getGlobalDimension1Codes()
  }
  openEditModal(lineNo:any): void {
    this.isEditMode = false;
    this.showAddLineModal = true;
    this.getImprestCodes()
    this.getGlobalDimension1Codes()
  }

   
  closeAddLineModal() {
    this.showAddLineModal = false;
    this.imprestRequestLinesForm.reset();
  }

 submitLine(){
    if (this.isEditMode) {
    this.updateLine();
      } else {
        this.createaline();
      }
  }
  

createaline() {
  this.loading=true
  if (this.imprestRequestLinesForm.valid) {
    const formValues = this.imprestRequestLinesForm.value;
    formValues.employeeNo = this.employeeNo;
    formValues.documentNo = this.no;

    this.imprestRequestService.createImprestRequestLines(formValues).subscribe({
      next: (res) => {
        this.notificationService.success('', res['responseDescription']);
        this.getAllImprestLines();
        this.closeAddLineModal();
        this.imprestRequestLinesForm.reset();
      },
      error: (err) => {
        const message = err.error?.responseDescription || 'Failed to create line.';
        this.notificationService.error('', message);
      }
    });
  } else {
    this.notificationService.warning('', 'Please fill all required fields.');
    Object.values(this.imprestRequestLinesForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}

  updateLine(){
    this.loading=true
      if (this.imprestRequestLinesForm.valid) {
        const formValues = this.imprestRequestLinesForm.value;
        formValues.employeeNo = this.employeeNo;
        formValues.documentNo = this.no;

        this.imprestRequestService.updateImprestRequestLines(formValues).subscribe({
          next: (res) => {
            this.notificationService.success('', res['responseDescription']);
            this.getAllImprestLines();
            this.closeAddLineModal();
            this.imprestRequestLinesForm.reset();
          },
          error: (err) => {
            const message = err.error?.responseDescription || 'Failed to create line.';
            this.notificationService.error('', message);
          }
        });
      } else {
        this.notificationService.warning('', 'Please fill all required fields.');
        Object.values(this.imprestRequestLinesForm.controls).forEach(control => {
          control.markAsTouched();
        });
      }
  }

   onFileSelected(event: Event) {}


  deleteImprestLine(){}
}