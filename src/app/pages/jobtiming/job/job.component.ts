import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";

@Component({
  selector: "ngx-job",
  templateUrl: "./job.component.html",
  styleUrls: ["./job.component.scss"],
})
export class JobComponent implements OnChanges {
  @Input() m2data: [];
  @Output() selectJobEvent = new EventEmitter<string>();

  selectedJob: string = null;

  /*select an answer*/
  select(job: any) {
    this.selectedJob = job.jobNO;
    this.selectJobEvent.emit(this.selectedJob);
  }

  jjob = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.m2data) {
      this.jjob = this.m2data;
      if (this.jjob.length > 0) {
        this.select(this.jjob[0])
      }
    }
  }
}
