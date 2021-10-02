import { Component, OnInit, Type } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DayService } from './day.service';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {
  constructor(public dayService: DayService) { }

  boWeekDropDownList: {}[] = [];
  boMonthDropDownList: {}[] = [];
  dropdownSettings : IDropdownSettings = {};

  isBoWeek: boolean = false;
  isBoMonth: boolean = false;
  ngOnInit() {
    this.boWeekDropDownList = [
      { item_id: 1, item_text: 'Sunday' },
      { item_id: 2, item_text: 'Monday' },
      { item_id: 3, item_text: 'Tuesday' },
      { item_id: 4, item_text: 'Wednesday' },
      { item_id: 5, item_text: 'Thursday' },
      { item_id: 6, item_text: 'Friday' },
      { item_id: 7, item_text: 'Saturday' },
    ];
    this.boMonthDropDownList = [
      { item_id: 0, item_text: '0' },
      { item_id: 1, item_text: '1' },
      { item_id: 2, item_text: '2' },
      { item_id: 3, item_text: '3' },
      { item_id: 4, item_text: '4' },
      { item_id: 5, item_text: '5' },
      { item_id: 6, item_text: '6' },
      { item_id: 7, item_text: '7' },
      { item_id: 8, item_text: '8' },
      { item_id: 9, item_text: '9' },
      { item_id: 10, item_text: '10' },
      { item_id: 11, item_text: '11' },
      { item_id: 12, item_text: '12' },
      { item_id: 13, item_text: '13' },
      { item_id: 14, item_text: '14' },
      { item_id: 15, item_text: '15' },
      { item_id: 16, item_text: '16' },
      { item_id: 17, item_text: '17' },
      { item_id: 18, item_text: '18' },
      { item_id: 19, item_text: '19' },
      { item_id: 20, item_text: '20' },
      { item_id: 21, item_text: '21' },
      { item_id: 22, item_text: '22' },
      { item_id: 23, item_text: '23' },
      { item_id: 24, item_text: '24' },
      { item_id: 25, item_text: '25' },
      { item_id: 26, item_text: '26' },
      { item_id: 27, item_text: '27' },
      { item_id: 28, item_text: '28' },
      { item_id: 29, item_text: '29' },
      { item_id: 30, item_text: '30' },
      { item_id: 31, item_text: '31' }
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
    //this.isCustom = this.getTypeState();
  }

  onTypeSelect(event: any){
    //this.isCustom = this.getTypeState();
  }

  getTypeState(){
    //return this.hoursService.hourModel.type === Type.Every? false: true;
  }

}
