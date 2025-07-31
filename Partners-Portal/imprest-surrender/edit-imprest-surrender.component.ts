import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { ImprestSurrenderService } from '../../services/imprestSurrender.service';
import { ImprestSurrender } from '../model/imprestSurrender';

@Component({
  selector: 'app-edit-imprest-surrender',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, HeaderComponent, FooterComponent],
  templateUrl: './edit-imprest-surrender.component.html',
  styleUrls: ['./edit-imprest-surrender.component.scss']
})
export class EditImprestSurrenderComponent implements OnInit {
  sidebarOpen = false;
  editSurrender: ImprestSurrender = {} as ImprestSurrender;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private imprestSurrenderService: ImprestSurrenderService
  ) {}

  ngOnInit() {
    const documentNo = this.route.snapshot.params['id'];
    this.imprestSurrenderService.apiImprestSurrenderGetImprestSurrenderDocumentNoGet(documentNo)
      .subscribe((data: ImprestSurrender) => this.editSurrender = data);
  }

  submitEditSurrender() {
    this.imprestSurrenderService.apiImprestSurrenderEditImprestSurrenderPost(this.editSurrender)
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