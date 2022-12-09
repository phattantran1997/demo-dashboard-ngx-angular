import { NgModule } from "@angular/core";

import { ThemeModule } from "../../@theme/theme.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StationComponent } from "./station.component";
import { Ng2SmartTableModule } from "ng2-smart-table";
import {  NbButtonGroupModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbIconModule, NbInputModule, NbListModule } from "@nebular/theme";

@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    NbCardModule,
    NbDatepickerModule,
    NbListModule,
    NbButtonModule,
    NbInputModule,
    NbIconModule,
    NbButtonGroupModule
  ],
  declarations: [StationComponent],
})
export class StationModule {}
