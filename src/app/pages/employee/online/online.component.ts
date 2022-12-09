import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeDetailComponent } from '../../employee-detail/employee-detail.component';
import { PageService } from "../../page.service";

@Component({
  selector: 'ngx-online',
  templateUrl: './online.component.html',
  styleUrls: ['./online.component.scss']
})
export class OnlineComponent implements OnInit {
  @Input() onlines;
  @Input() date;
  @Input() user;


  constructor(private router : Router, private pageService: PageService) {
  }

  ngOnInit() {
  }

  onItemClick(user : string){
    this.pageService.user = user;
    this.router.navigate([`/pages/employee-detail/${user}`], {queryParams : {state : user}});
  }
}
