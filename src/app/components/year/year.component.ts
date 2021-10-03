import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Type } from '../shared.model';
import { YearService } from './year.service';

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.css']
})
export class YearComponent implements OnInit {

  constructor(public yearService: YearService) { }

  dropdownList: {}[] = [];
  dropdownSettings : IDropdownSettings = {};
  public zeroTo99: number[] = [];

  isCustom: boolean = false;
  ngOnInit() {

    for(let i=0; i<100; i++){
      var year = this.getYearByOffset(i);
      this.dropdownList[i] = {item_id: year, item_text: year.toString()};
      this.zeroTo99[i] = i;
    }

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.isCustom = this.getTypeState();
  }

  onTypeSelect(event: any){
    this.isCustom = this.getTypeState();
  }

  getTypeState(){
    return this.yearService.yearModel.type === Type.Every? false: true;
  }

  getYearByOffset(offset: number){
    var currentYear: number = (new Date()).getFullYear();
    return currentYear+offset;
  }
}
