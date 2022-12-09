import { Component, Input, OnInit } from '@angular/core';

import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    <div>
      <span style="font-size:16px;"><strong>{{rowData.jobNO}}</strong></span>
      <br>
      <span style="font-size:12px;">{{rowData.pathValue}}</span>
    </div>
  `,
})
export class JobNumberComponent implements ViewCell, OnInit {

  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  ngOnInit() {
  }

}
