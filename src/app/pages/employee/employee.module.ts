import { NgModule } from "@angular/core";

import { ThemeModule } from "../../@theme/theme.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EmployeeComponent } from "./employee.component";
import { OfflineComponent } from "./offline/offline.component";
import { OnlineComponent } from "./online/online.component";
import {  NbButtonGroupModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbIconModule, NbInputModule, NbListModule } from "@nebular/theme";

@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
    ReactiveFormsModule,
    NbListModule,
    NbCardModule,
    NbDatepickerModule,
    NbListModule,
    NbButtonModule,
    NbInputModule,
    NbIconModule,
    NbButtonGroupModule
  ],
  declarations: [EmployeeComponent,OfflineComponent,OnlineComponent],
})
export class EmployeeModule {}
