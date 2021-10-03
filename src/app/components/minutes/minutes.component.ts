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
  public zeroTo59: number[] = [];

  isCustom: boolean = false;
  ngOnInit() {
    for(let i=0;i<60;i++){
      this.zeroTo59[i] = i;
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
    return this.minutesService.minuteModel.type === Type.Every? false: true;
  }
}
