import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { JobtimingModule } from './jobtiming/jobtiming.module';
import { StationModule } from './station/station.module';
import { EmployeeModule } from './employee/employee.module';
import { EmployeeDetailModule } from './employee-detail/employee-detail.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    JobtimingModule,
    StationModule,
    EmployeeModule,
    EmployeeDetailModule  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
