import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { ImprestSurrenderService } from '../../services/imprestSurrender.service';
import { ImprestSurrender } from '../model/imprestSurrender';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-imprest-surrender',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, HeaderComponent, FooterComponent],
  templateUrl: './new-imprest-surrender.component.html',
  styleUrls: ['./new-imprest-surrender.component.scss']
})
export class NewImprestSurrenderComponent {
  sidebarOpen = false;
  newSurrender: ImprestSurrender = {} as ImprestSurrender;

  constructor(private router: Router, private imprestSurrenderService: ImprestSurrenderService) {}

  submitNewSurrender() {
    this.imprestSurrenderService.apiImprestSurrenderCreateNewImprestSurrenderPost(this.newSurrender)
      .subscribe(() => this.router.navigate(['/imprest-surrender']));
  }

  cancel() {
    this.router.navigate(['/imprest-surrender']);
  }

  triggerFileUpload() {
    // TODO: Implement file upload logic
    console.log('File upload triggered');
  }
} 