import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Dashboard } from '../models/dashboard.model';
import { DailyReportModel } from '../models/reports/dailyReport.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private httpClient: HttpClient) {}

  getDashboardData() {
    return this.httpClient.get<Dashboard>(
      'http://localhost:51110/api/reports/GetDashboardData',
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  getDailyReportData(): Observable<DailyReportModel> {
    return this.httpClient.get<DailyReportModel>(
      'http://localhost:51110/api/reports/DailyReport',
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }
}
