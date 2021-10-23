import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DropDownItem, Type } from '../../shared/shared.model';
import { MonthService } from './month.service';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit {

  constructor(public monthService: MonthService) { }

  dropdownList: DropDownItem[] = [];
  dropdownSettings : IDropdownSettings = {};

  ngOnInit() {
    
    for(const [i,month] of this.monthsList.entries()){
      this.dropdownList[i] = new DropDownItem(i+1, month);
    }

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'text',
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

  get isCustom() : boolean {
    return this.monthService.monthModel.type === Type.Every ? false: true;
  }

  get monthsList() : Array<string> {
    return this.monthService.monthList;
  }

}
