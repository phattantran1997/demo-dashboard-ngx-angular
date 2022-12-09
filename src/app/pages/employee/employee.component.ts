import { Component, OnInit } from "@angular/core";
import { environment } from "../../../environments/environment";
import { AuthService } from "../../auth/auth.service";
import { PageService } from "../page.service";

@Component({
  selector: "ngx-employee",
  styleUrls: ["./employee.component.scss"],
  templateUrl: "./employee.component.html"
})
export class EmployeeComponent implements OnInit {
  onlines = [];
  offlines = [];
  fromDateControl : Date ;
  values = '';
  constructor(
    private pageService: PageService,
    private authService: AuthService
  ) {

  }

  async refresh(){
    this.pageService.date = this.fromDateControl;
    this.onlines = await this.pageService.getOnlineUser(this.fromDateControl.toLocaleDateString('en-GB'));
    this.offlines = await this.pageService.getOfflineUser();
  }
  async ngOnInit() {
    this.fromDateControl = this.pageService.date; 
    let loginUrl =
      environment.baseUrl + "/auth/login?returnUrl=/pages/employee";
    if (!this.authService.getToken()) window.location.href = loginUrl;
    this.refresh();
    // this.onlines = await this.pageService.getOnlineUser(this.datePipe.transform(this.fromDateControl, 'dd/MM/yyyy'));
    // this.offlines = await this.pageService.getOfflineUser();
  }

  onKey(event: any) { // without type info
    this.values += event.target.value + ' | ';
  }

  

}
