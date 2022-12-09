import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "../../environments/environment";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class PageService {
  pathGetJobDate = "/jobtiming/list/dates";
  pathGetStation = "/station/all";
  pathGetM2 = "/dashboard/total/all/m2";
  pathGetDuration = "/station/all/duration/";
  pathGetOnline = '/user/getOnlineUsers';
  pathGetoffline = '/user/getOfflineUsers';
  pathGetAllQLDData = '/dashboard/get/all/qldata';
  pathGetAllJobtiming = '/jobtiming/data/detail';
  pathGeUserDetail = '/jobtiming/user/detail';

  public user: string;
  public date = new Date();
  constructor(private http: HttpClient, private authService: AuthService, private datePipe: DatePipe) {}
  padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  formatDate(date) {
    return [
      this.padTo2Digits(date.getDate()),
      this.padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join("/");
  }
  getJobsNO(date, end) {
    var req = this.http.get(environment.UrlPremierDucts + this.pathGetJobDate, {
      params: {
        date,
        end,
      },
      headers: {
        token: this.authService.getToken(),
        accept: "text/plain",
        "Content-Type": "application/json; charset=utf-8",
      },
    });

    let jobs = [];
    var subject = new Subject<any[]>();

    req.subscribe((res: any) => {
      jobs = res.data;
      subject.next(jobs);
      subject.complete();
    });
    return subject.asObservable().toPromise<any[]>();
  }

  getAllStation() {
    var req = this.http.get(environment.UrlPremierDucts + this.pathGetStation, {
      headers: {
        token: this.authService.getToken(),
        accept: "text/plain",
        "Content-Type": "application/json; charset=utf-8",
      },
    });

    let stations = [];
    var subject = new Subject<any[]>();

    req.subscribe((res: any) => {
      stations = res.data;
      subject.next(stations);
      subject.complete();
    });
    return subject.asObservable().toPromise<any[]>();
  }

  getJobM2(jobs) {
    var req = this.http.post(environment.UrlQidData + this.pathGetM2, jobs, {
      headers: {
        token: this.authService.getToken(),
        accept: "text/plain",
        "Content-Type": "application/json; charset=utf-8",
      }
    });

    let m2data = [];
    var subject = new Subject<any[]>();

    req.subscribe((res: any) => {
      m2data = res.data;
      subject.next(m2data);
      subject.complete();
    });
    return subject.asObservable().toPromise<any[]>();
  }

  getDuration(jobNo, stationNo) {
    jobNo = jobNo == "" ? "%22%22" : jobNo;
    var req = this.http.get(environment.UrlPremierDucts + this.pathGetDuration + jobNo, {
      headers: {
        token: this.authService.getToken(),
        accept: "text/plain",
        "Content-Type": "application/json; charset=utf-8",
      },
      params: {
        stationNo,
        token: this.authService.getToken()
      }
    });

    let duration = {};
    var subject = new Subject<object>();

    req.subscribe((res: any) => {
      duration = res.data;
      subject.next(duration);
      subject.complete();
    });
    return subject.asObservable().toPromise<object>();
  }

  getOnlineUser( date: string){
    var req = this.http.get(environment.UrlAppUser + this.pathGetOnline, {
      headers: {
        token: this.authService.getToken(),
        accept: "text/plain",
        "Content-Type": "application/json; charset=utf-8",
      },
      params: {
        jobday: date,
        supervisorname: this.authService.getUsername(),
        token: this.authService.getToken()
      }
    });

    let users = [];
    var subject = new Subject<any[]>();

    req.subscribe((res: any) => {
      // users = res.data;
      users = res.data.filter(d => d.operatorID != null);
      subject.next(users);
      subject.complete();
    });
    return subject.asObservable().toPromise<any[]>();
  }

  getOfflineUser(){
    var req = this.http.get(environment.UrlAppUser + this.pathGetoffline, {
      headers: {
        token: this.authService.getToken(),
        accept: "text/plain",
        "Content-Type": "application/json; charset=utf-8",
      },
      params: {
        token: this.authService.getToken()
      }
    });

    let users = [];
    var subject = new Subject<any[]>();

    req.subscribe((res: any) => {
      users = res.data;
      subject.next(users);
      subject.complete();
    });
    return subject.asObservable().toPromise<any[]>();
  }

  getUserDetail() {

    var req = this.http.get(environment.UrlPremierDucts + this.pathGeUserDetail, {
      headers: {
        token: this.authService.getToken(),
        accept: "text/plain",
        "Content-Type": "application/json; charset=utf-8",
      },
      params: {
        date: this.datePipe.transform(this.date, 'dd/MM/yyyy'),
        user: this.user,
        token: this.authService.getToken()
      }
    });

    let users = [];
    var subject = new Subject<any[]>();

    req.subscribe((res: any) => {
      // users = res.data;
      users = res.data.filter(d => d.operatorID != null);
      subject.next(users);
      subject.complete();
    });

 
    return subject.asObservable().toPromise<any[]>();
  }
  getAllQLDData(jobs) {
    var req = this.http.post(environment.UrlQidData + this.pathGetAllQLDData, jobs, {
      headers: {
        token: this.authService.getToken(),
        accept: "text/plain",
        "Content-Type": "application/json; charset=utf-8",
      }
    });

    let qlddata = [];
    var subject = new Subject<any[]>();

    req.subscribe((res: any) => {
      qlddata = res.data;
      subject.next(qlddata);
      subject.complete();
    });
    return subject.asObservable().toPromise<any[]>();
  }

  getAllJobtiming(jobs) {
    var req = this.http.post(environment.UrlPremierDucts + this.pathGetAllJobtiming, jobs, {
      headers: {
        token: this.authService.getToken(),
        accept: "text/plain",
        "Content-Type": "application/json; charset=utf-8",
      }
    });

    let alljob = [];
    var subject = new Subject<any[]>();

    req.subscribe((res: any) => {
      alljob = res.data;
      subject.next(alljob);
      subject.complete();
    });
    return subject.asObservable().toPromise<any[]>();
  }
}
