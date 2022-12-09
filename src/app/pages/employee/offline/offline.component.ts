import { Component, Input, OnInit,ViewChild } from '@angular/core';
import { EmployeeDetailComponent } from '../../employee-detail/employee-detail.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-offline',
  templateUrl: './offline.component.html',
  styleUrls: ['./offline.component.scss']
})
export class OfflineComponent implements OnInit {
  @Input() offlines;

  constructor(private router : Router) {
  }

  ngOnInit() {
  }
  

}
