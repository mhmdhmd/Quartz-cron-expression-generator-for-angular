import { Component, OnInit, Type } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DropDownItem } from 'src/app/shared/shared.model';
import { BaseOnMonthType, BaseOnWeekType, DayType } from './day.model';
import { DayService } from './day.service';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {
  constructor(public dayService: DayService) { }

  boWeekDropDownList: DropDownItem[] = [];
  boMonthDropDownList: DropDownItem[] = [];
  dropdownSettings : IDropdownSettings = {};
  public daysIndexInMonth: number[] = [1,2,3,4,5];
  public zeroTo30: number[] = [];

  ngOnInit() {
    for(const [i, day] of this.daysList.entries())
      this.boWeekDropDownList[i] = new DropDownItem(i+1, day);

    for(let i=0; i<31;i++){
      this.zeroTo30[i]=i;
      this.boMonthDropDownList[i] = new DropDownItem(i+1, (i+1).toString());
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
    //this.getTypeState();
  }

  get daysList() : Array<string> {
    return this.dayService.daysList;
  }

  get isBoWeek() : boolean {
    return this.dayService.dayModel.type === DayType.BOWeek? true: false;
  }

  get isBoMonth() : boolean {
    return this.dayService.dayModel.type === DayType.BOMonth? true: false;
  }

  get isBoWeekCustom() : boolean {
    return this.dayService.dayModel.baseOnWeek.type === BaseOnWeekType.Custom? true: false;
  }

  get isBoMonthCustom() : boolean {
    return this.dayService.dayModel.baseOnMonth.type === BaseOnMonthType.Custom? true: false;
  }

  get isBoMonthBefore() : boolean {
    return this.dayService.dayModel.baseOnMonth.type === BaseOnMonthType.Before? true: false;
  }

}
