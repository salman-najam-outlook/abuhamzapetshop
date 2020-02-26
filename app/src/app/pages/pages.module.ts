import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { ProductsModule } from './products/products.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    MaintenanceModule,
    ProductsModule
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
