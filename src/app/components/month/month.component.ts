import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Type } from '../shared.model';
import { MonthService } from './month.service';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit {

  constructor(public monthService: MonthService) { }

  dropdownList: {}[] = [];
  dropdownSettings : IDropdownSettings = {};

  isCustom: boolean = false;
  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: 'January' },
      { item_id: 2, item_text: 'February' },
      { item_id: 3, item_text: 'March' },
      { item_id: 4, item_text: 'April' },
      { item_id: 5, item_text: 'May' },
      { item_id: 6, item_text: 'June' },
      { item_id: 7, item_text: 'July' },
      { item_id: 8, item_text: 'August' },
      { item_id: 9, item_text: 'September' },
      { item_id: 10, item_text: 'October' },
      { item_id: 11, item_text: 'November' },
      { item_id: 12, item_text: 'December' },
    ];
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
    return this.monthService.monthModel.type === Type.Every? false: true;
  }

}
