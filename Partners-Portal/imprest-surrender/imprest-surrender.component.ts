import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { ImprestSurrenderService } from '../../services/imprestSurrender.service';
import { FormsModule } from '@angular/forms';
import { ImprestSurrender } from '../model/imprestSurrender';

@Component({
  selector: 'app-imprest-surrender',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, HeaderComponent, FooterComponent],
  templateUrl: './imprest-surrender.component.html',
  styleUrls: ['./imprest-surrender.component.scss']
})
export class ImprestSurrenderComponent {
  sidebarOpen = false;
  imprestSurrenders: ImprestSurrender[] = [];
  searchTerm: string = '';

  constructor(private router: Router, private imprestSurrenderService: ImprestSurrenderService) {
    // TODO: Replace with actual employeeNo from auth/user context
    const employeeNo = 'EMP001';
    this.imprestSurrenderService.apiImprestSurrenderGetImprestSurrendersEmployeeNoGet(employeeNo)
      .subscribe((data: ImprestSurrender[]) => this.imprestSurrenders = data);
  }

  addNew() {
    this.router.navigate(['/new-imprest-surrender']);
  }

  editSurrender(surrender: ImprestSurrender) {
    this.router.navigate(['/edit-imprest-surrender', surrender.no]);
  }

  get filteredSurrenders() {
    if (!this.searchTerm) return this.imprestSurrenders;
    const term = this.searchTerm.toLowerCase();
    return this.imprestSurrenders.filter(surr =>
      Object.values(surr).some(val => val && val.toString().toLowerCase().includes(term))
    );
  }
} 