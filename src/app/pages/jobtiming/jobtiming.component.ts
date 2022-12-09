import { Component, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { environment } from "../../../environments/environment";
import { SmartTableData } from "../../@core/data/smart-table";
import { AuthService } from "../../auth/auth.service";
import { PageService } from "../page.service";

@Component({
  selector: "ngx-jobtiming",
  styleUrls: ["./jobtiming.component.scss"],
  templateUrl: "./jobtiming.component.html",
})
export class JobtimingComponent implements OnInit {
  date3: Date;
  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      operatorID: {
        title: "Name",
        type: "string",
        editable: false,
        width: "40%",
      },
      jobday: {
        title: "Day",
        type: "string",
        editable: false,
      },
      jobtime: {
        title: "Time",
        type: "string",
        editable: false,
      },
      duration: {
        title: "Duration",
        type: "string",
        editable: false,
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  fromDateControl = new Date();
  toDateControl = new Date();
  data: any[];
  jobs = [];
  stations = [];
  m2data = [];
  duration: any;
  selectedStation: string = null;
  selectedJob: string = null;

  constructor(
    private authService: AuthService,
    private pageService: PageService
  ) {
    // this.data = this.service.getData();
    // this.source.load(this.data);
  }

  selectStation(newStation) {
    if (newStation == this.selectedStation) return;
    this.selectedStation = newStation;
    this.updateDuration();
  }

  selectJob(newJob) {
    if (newJob == this.selectedJob) return;
    this.selectedJob = newJob;
    this.updateDuration();
  }

  async updateDuration() {
    if (this.selectedJob == null || this.selectedStation == null) return;
    this.duration = await this.pageService.getDuration(
      this.selectedJob,
      this.selectedStation
    );
    this.updateDurationForSource(this.duration, this.selectedStation, this.stations);
    this.source.load(this.duration.history);
    // this.data = this.service.getData();
    // this.source.load(this.data);
  }

  updateDurationForSource(duration, stationNo, stations) {
    let index = stations.findIndex((station) => station.stationNo == stationNo);
    stations[index]["totalDuration"] = duration.totalDuration;
  }

  async filterRangeDate() {
    this.jobs = await this.pageService.getJobsNO(this.pageService.formatDate(this.fromDateControl), this.pageService.formatDate(this.toDateControl));
    this.m2data = await this.pageService.getJobM2(this.jobs);
    this.updateDuration();
  }

  async ngOnInit(): Promise<void> {
    let loginUrl =
      environment.baseUrl + "/auth/login?returnUrl=/pages/jobtiming";
    if (!this.authService.getToken()) window.location.href = loginUrl;

    this.jobs = await this.pageService.getJobsNO(this.pageService.formatDate(this.fromDateControl), this.pageService.formatDate(this.toDateControl));
    this.stations = await this.pageService.getAllStation();
    this.m2data = await this.pageService.getJobM2(this.jobs);
    this.updateDuration();
  }
}
