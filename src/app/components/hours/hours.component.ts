import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { HoursService } from './hours.service';

@Component({
  selector: 'app-hours',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.css']
})
export class HoursComponent implements OnInit {

  constructor(public hoursService: HoursService) { }

  dropdownList: {}[] = [];
  dropdownSettings : IDropdownSettings = {};

  isCustom: boolean = false;
  ngOnInit() {
    this.dropdownList = [
      { item_id: 0, item_text: '00' },
      { item_id: 1, item_text: '01' },
      { item_id: 2, item_text: '02' },
      { item_id: 3, item_text: '03' },
      { item_id: 4, item_text: '04' },
      { item_id: 5, item_text: '05' },
      { item_id: 6, item_text: '06' },
      { item_id: 7, item_text: '07' },
      { item_id: 8, item_text: '08' },
      { item_id: 9, item_text: '09' },
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
      { item_id: 23, item_text: '23' }
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
    return this.hoursService.hourModel.type === "every"? false: true;
  }

}
