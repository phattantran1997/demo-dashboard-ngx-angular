import { NgModule } from "@angular/core";

import { ThemeModule } from "../../@theme/theme.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EmployeeDetailComponent } from "./employee-detail.component";
import { HttpClientModule } from '@angular/common/http'
import { AgGridModule } from 'ag-grid-angular';
import { NbCardModule, NbListModule } from "@nebular/theme";

@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
    ReactiveFormsModule,
    NbListModule,
    NbCardModule,
    HttpClientModule,
    AgGridModule
  ],
  declarations: [EmployeeDetailComponent],
  providers: [],
  bootstrap: [EmployeeDetailComponent]
})
export class EmployeeDetailModule {}
