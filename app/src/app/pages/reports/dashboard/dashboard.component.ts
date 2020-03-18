import { Component, OnInit } from '@angular/core';

import {
  NbGlobalPosition,
  NbGlobalPhysicalPosition,
  NbToastrService,
  NbComponentStatus,
} from '@nebular/theme';
import { ReportService } from '../../../services/report.service';
import { Dashboard } from '../../../models/dashboard.model';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})

export class DashboardComponent implements OnInit {
  dashboardData: Dashboard;

  // Toaster Setting Starts
  index = 1;
  destroyByClick = true;
  duration = 5000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  // Toaster Setting Ends

  constructor(
    private reportService: ReportService,
    private router: Router,
    private toastrService: NbToastrService,
  ) {}

  ngOnInit() {
    this.reportService.getDashboardData().subscribe(
      response => {
        this.dashboardData = response;
      },
      error => {
        if (error.status === 401) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('expires');
          localStorage.removeItem('user');
          this.router.navigate(['auth'], {
            queryParams: {
              isSessionExpired: true,
            },
          });
        } else {
          this.showToast(
            'danger',
            'Error!',
            'An error occured while fetching Dashboard details.',
          );
        }
      },
    );
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `${title}` : '';
    this.toastrService.show(body, `${titleContent}`, config);
  }
}
