import { NgModule } from "@angular/core";

import { ThemeModule } from "../../@theme/theme.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { JobtimingComponent } from "./jobtiming.component";
import { NbButtonModule, NbCardModule, NbDatepickerModule, NbIconModule, NbInputModule, NbListModule } from "@nebular/theme";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { JobComponent } from "./job/job.component";
import { StationComponent } from "./station/station.component";


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbListModule,
    NbButtonModule,
    NbInputModule,
    NbCardModule,
    NbDatepickerModule,
    Ng2SmartTableModule,
    NbIconModule
  ],
  declarations: [JobtimingComponent, JobComponent, StationComponent],
})
export class JobtimingModule {
}
