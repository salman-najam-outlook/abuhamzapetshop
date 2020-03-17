import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule as ngFormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportsRoutingModule } from './reports-routing.module';

@NgModule({
  imports: [
    ThemeModule,
    ReactiveFormsModule,
    CommonModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    ngFormsModule,
    ReportsRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
      ReportsComponent,
      DashboardComponent,
  ],
})
export class ReportsModule { }
