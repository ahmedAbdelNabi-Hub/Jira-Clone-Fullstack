import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ProjectListComponent } from "../project-list/project-list.component";
import { OrganizationService } from '../../../../core/services/Organization.service';
import { IOrganization } from '../../../../core/interfaces/IOrganization';
import { tap } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [PanelMenuModule, RouterModule, CommonModule, ProjectListComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  @Input({ required: true }) menuItems!: any[];
  loading: boolean = false;
  owenOrganization: IOrganization | null = null;
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private orgService: OrganizationService) { }


  ngOnInit(): void {
    this.orgService.getByUserId()
      .pipe(tap(org => {
        if (org) {
          this.owenOrganization = org;
        }
      }))
      .subscribe();
  }


  handleLoading() {
    this.loading = true;
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.loading = false;
      }, 500);
    }
  }
}
