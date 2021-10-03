import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Type } from '../shared.model';
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
  public zeroTo23: number[] = [];

  isCustom: boolean = false;
  ngOnInit() {
    for(let i=0;i<24;i++){
      this.zeroTo23[i] = i;
      this.dropdownList[i] = { item_id: i, item_text: i };
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
    return this.hoursService.hourModel.type === Type.Every? false: true;
  }

}
