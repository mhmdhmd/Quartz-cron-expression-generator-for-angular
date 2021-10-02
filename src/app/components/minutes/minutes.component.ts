import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Type } from '../shared.model';
import { MinutesService } from './minutes.service';

@Component({
  selector: 'app-minutes',
  templateUrl: './minutes.component.html',
  styleUrls: ['./minutes.component.css']
})
export class MinutesComponent implements OnInit {

  constructor(public minutesService: MinutesService) { }

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
      { item_id: 23, item_text: '23' },
      { item_id: 24, item_text: '24' },
      { item_id: 25, item_text: '25' },
      { item_id: 26, item_text: '26' },
      { item_id: 27, item_text: '27' },
      { item_id: 28, item_text: '28' },
      { item_id: 29, item_text: '29' },
      { item_id: 30, item_text: '30' },
      { item_id: 31, item_text: '31' },
      { item_id: 32, item_text: '32' },
      { item_id: 33, item_text: '33' },
      { item_id: 34, item_text: '34' },
      { item_id: 35, item_text: '35' },
      { item_id: 36, item_text: '36' },
      { item_id: 37, item_text: '37' },
      { item_id: 38, item_text: '38' },
      { item_id: 39, item_text: '39' },
      { item_id: 40, item_text: '40' },
      { item_id: 41, item_text: '41' },
      { item_id: 42, item_text: '42' },
      { item_id: 43, item_text: '43' },
      { item_id: 44, item_text: '44' },
      { item_id: 45, item_text: '45' },
      { item_id: 46, item_text: '46' },
      { item_id: 47, item_text: '47' },
      { item_id: 48, item_text: '48' },
      { item_id: 49, item_text: '49' },
      { item_id: 50, item_text: '50' },
      { item_id: 51, item_text: '51' },
      { item_id: 52, item_text: '52' },
      { item_id: 53, item_text: '53' },
      { item_id: 54, item_text: '54' },
      { item_id: 55, item_text: '55' },
      { item_id: 56, item_text: '56' },
      { item_id: 57, item_text: '57' },
      { item_id: 58, item_text: '58' },
      { item_id: 59, item_text: '59' }
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
    return this.minutesService.minuteModel.type === Type.Every? false: true;
  }
}
