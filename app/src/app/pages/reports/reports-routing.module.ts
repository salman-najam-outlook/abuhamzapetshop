import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../../guards/admin-guard.service';
import { UserGuard } from '../../guards/user-guard.service';
import { ReportsComponent } from './reports.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConsolidatedReportComponent } from './consolidated-report/consolidated-report.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent, canActivate: [AdminGuard],
      },
      {
        path: 'consolidated-report',
        component: ConsolidatedReportComponent, canActivate: [AdminGuard],
      },
      { path: '', redirectTo: '/sales', pathMatch: 'full' },
      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
