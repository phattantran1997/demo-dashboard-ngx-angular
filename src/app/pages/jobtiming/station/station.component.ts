import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { NbThemeService } from "@nebular/theme";

@Component({
  selector: "ngx-station",
  templateUrl: "./station.component.html",
  styleUrls: ["./station.component.scss"],
})
export class StationComponent implements OnChanges {
  @Input() stations: [];
  @Input() isHeaderStation: boolean = false;
  @Output() selectStationEvent = new EventEmitter<string>();

  stationNoSelected: string = null;
  sstations = [];
  currentTheme: string;
  
  constructor(
    private themeService : NbThemeService
  ) {
    this.themeService.onThemeChange().subscribe( data => {
      this.currentTheme = data.name;
    });
  }


  ngOnChanges(changes: SimpleChanges) {
    if(changes.stations){
      this.sstations = this.stations;
      if (this.sstations.length > 0) {
        this.selectedStationEvent(this.sstations[0]);
      }
    }
  }

  selectedStationEvent(station) {
    this.stationNoSelected = station.stationNo;
    this.selectStationEvent.emit(this.stationNoSelected);
    // console.log(this.stationNoSelected);
  }
}
