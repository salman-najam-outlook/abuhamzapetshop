import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {
  NbGlobalPosition,
  NbGlobalPhysicalPosition,
  NbToastrService,
  NbComponentStatus,
} from '@nebular/theme';
import { ReportService } from '../../../services/report.service';
import { Dashboard } from '../../../models/dashboard.model';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  dashboardData: Dashboard;
  constructor(private reportService: ReportService) {}
  chartPanelSummary: any[];
    ngOnInit() {
      this.reportService.getDashboardData().subscribe(
        response => {
          this.dashboardData = response;
        },
        error => {
          console.log(error);
        }
      );
      this.chartPanelSummary = [
        {title: 'Salman', value: 100, backgroundColor: '#50BFA0'},
        {title: 'Hamza', value: 100, backgroundColor: '#F2C438'},
        {title: 'Madeaha', value: 100, backgroundColor: '#F25749'},
        {title: 'Nazama', value: 100, backgroundColor: '#34A6BF'},
      ];
    }
}
