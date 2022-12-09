import { Component, HostListener, OnInit } from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import { LocalDataSource } from "ng2-smart-table";
import { PageService } from "../page.service";
import { JobNumberComponent } from "./jobnumber.component";

@Component({
  selector: "ngx-station",
  styleUrls: ["./station.component.scss"],
  templateUrl: "./station.component.html",
})
export class StationComponent implements OnInit {
  leftSource: LocalDataSource = new LocalDataSource();
  rightSource: LocalDataSource = new LocalDataSource();

  scrHeight: any;
  scrWidth: any;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
        this.scrHeight = window.innerHeight;
        this.scrWidth = window.innerWidth;
        console.log(this.scrWidth);
        
  }

  leftTableSettings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    pager :{
      perPage: 5,
    },
    columns: {
      jobNO: {
        title: "JOB NUMBER",
        editable: false,
        width: "70%",
        type: "custom",
        renderComponent: JobNumberComponent,
      },
      rate: {
        title: "Rate",
        type: "string",
        editable: false,
      },
      labour: {
        title: "Labour",
        type: "string",
        editable: false,
      },
    },
  };

  rightTableSettings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    pager :{
      perPage: 7,
    },
    columns: {
      operatorID: {
        title: "Name",
        type: "string",
        editable: false,
        width: "40%",
      },
      jobday: {
        title: "Jobday",
        type: "string",
        editable: false,
      },
      jobtime: {
        title: "Time In",
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

  fromDateControl = new Date();
  toDateControl = new Date();
  stations = [];
  jobdates = [];
  jobs = [];
  jobsTiming = [];
  stationNoSelected: string = null;
  stationNameSelected: string = null;
  totalDuration: string = "";
  currentTheme: string;

  constructor(
    private pageService: PageService,
    private themeService: NbThemeService) {
      this.themeService.onThemeChange().subscribe( data => {
        this.currentTheme = data.name;
      });
    }

  async ngOnInit() {
    this.getScreenSize();
    
    this.stations = await this.pageService.getAllStation();
    this.filterRangeDate();
    this.selectedStationEvent(this.stations[0]);
    
  }

  async filterRangeDate() {
    this.jobdates = await this.pageService.getJobsNO(
      this.pageService.formatDate(this.fromDateControl),
      this.pageService.formatDate(this.toDateControl)
    );
    this.loadLeftData();
  }

  async selectedStationEvent(station) {
    this.stationNoSelected = station.stationNo;
    this.stationNameSelected = station.stationName;
    this.loadLeftData();
  }

  async loadLeftData() {
    if (typeof this.jobdates === "string") return;
    this.jobs = await this.pageService.getAllQLDData(this.jobdates);
    this.jobs = this.jobs.filter(
      (job) => job.stationName == this.stationNameSelected
    );
    if (this.jobs.length > 0) this.leftSource.load(this.jobs);
  }

  async loadRightData($event) {
    console.log($event.data);
    if (typeof this.jobdates === "string") return;
    this.jobsTiming = await this.pageService.getAllJobtiming(this.jobdates);
    console.log("timing ", this.jobsTiming);
    this.jobsTiming = this.jobsTiming.filter(
      (job) => job.jobno == $event.data.jobNO
    );
    console.log("after", this.jobsTiming);
    if (this.jobsTiming.length > 0) this.rightSource.load(this.jobsTiming);
  }

  calDuration($event) {
    let data = $event.source.data;
    if (!data) return;
    let durations = data.map(d => d.duration);
    this.totalDuration = this.duration(durations);
  }

  duration(durations) {
    let totalHour = 0,
      totalMinute = 0,
      totalMilisecond = 0;
    for (let hms of durations) {
      let a = hms.split(":");
      totalHour += +a[0];
      totalMinute += +a[1];
      totalMilisecond += +a[2];
    }
    let bonusHour = 0,
      bonusMinute = 0;

      bonusMinute = Math.floor(totalMilisecond / 100);
      totalMilisecond = totalMilisecond % 100;
      totalMinute += bonusMinute;

      bonusHour = Math.floor(totalMinute/60);
      totalMinute = totalMinute % 60;
      totalHour += bonusHour;

      return totalHour + ":" + totalMinute + ":" + totalMilisecond;
  }
}
