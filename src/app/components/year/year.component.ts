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
  public yearList: number[] = [];

  isCustom: boolean = false;
  ngOnInit() {
    var currentYear: number = (new Date()).getFullYear();

    for(let i=0; i<100; i++){
      this.dropdownList[i] = {item_id: currentYear, item_text: currentYear.toString()};
      this.yearList[i]=currentYear;
      currentYear++;
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
}
