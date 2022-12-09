import { Injector, ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HttpRequest } from "@angular/common/http";

import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbInputModule,
  NbLayoutModule,
} from "@nebular/theme";

import { LoginComponent } from "./login/login.component";

@NgModule({
  imports: [
    CommonModule,
    NbLayoutModule,
    NbCardModule,
    NbCheckboxModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    FormsModule,
    HttpClientModule,
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent],
})
export class AuthModule {}
