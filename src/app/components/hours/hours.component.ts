import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DropDownItem, Type } from '../../shared/shared.model';
import { HoursService } from './hours.service';

@Component({
  selector: 'app-hours',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.css']
})
export class HoursComponent implements OnInit {

  constructor(public hoursService: HoursService) { }

  dropdownList: DropDownItem[] = [];
  dropdownSettings : IDropdownSettings = {};
  public zeroTo23: number[] = [];

  ngOnInit() {
    for(let i=0;i<24;i++){
      this.zeroTo23[i] = i;
      this.dropdownList[i] = new DropDownItem(i, i.toString());
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
  }

  onTypeSelect(event: any){
    //this.isCustom = this.getTypeState();
  }

  get isCustom() : boolean {
    return this.hoursService.hourModel.type === Type.Every ? false: true;
  }
  
}
