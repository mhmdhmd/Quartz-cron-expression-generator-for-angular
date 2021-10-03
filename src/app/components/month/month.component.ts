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
  public monthsList: string[] = [];

  isCustom: boolean = false;
  ngOnInit() {
    this.monthsList = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    for(const [i,month] of this.monthsList.entries()){
      this.dropdownList[i] = { item_id: i+1, item_text: month };
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
    return this.monthService.monthModel.type === Type.Every? false: true;
  }

}
