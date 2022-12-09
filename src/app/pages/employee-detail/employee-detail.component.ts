import { Component, Input, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ResponseData } from '../../entities/ResponseData';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs/observable'
import { PageService } from "../page.service";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {

  // Each Column Definition results in one Column.
  public columnDefs: string[] = ['jobno', 'operatorID',
    'jobday', 'jobtime', 'stationNo', 'duration', 'filename',
    'handle', 'itemno', 'station', 'Status'
  ];
  public user: string;
  public date: string;
  ngOnInit(): void {
    this.user = history.state;
  }
  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  // Data that gets displayed in the grid
  public rowData: any[];

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

   constructor(private http: HttpClient
    , private router: Router
    , private activatedRoute: ActivatedRoute,
    private pageService: PageService,
    ) 
  {
    // console.log('abc',this.router.getCurrentNavigation().extras.state);
    activatedRoute.params.subscribe(param => {
      this.user = param.username;
      console.log(this.user)
    })
    this.date= this.pageService.date.toLocaleDateString('en-GB');
   
    this.pageService.getUserDetail().then(dt =>{
      this.rowData =  dt
    } );
  }

  public sortTable() {
    console.log('click')
  }

}
