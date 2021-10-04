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
  public daysList: string[] = [];
  public daysIndexInMonth: number[] = [1,2,3,4,5];
  public zeroTo30: number[] = [];

  isBoWeek: boolean = false;
  isBoWeekCustom: boolean = false;
  isBoMonth: boolean = false;
  isBoMonthCustom: boolean = false;
  isBoMonthBefore: boolean = false;

  ngOnInit() {
    this.daysList = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

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
    this.getTypeState();
  }

  onTypeSelect(event: any){
    this.getTypeState();
  }

  getTypeState(){
    this.isBoWeek = this.dayService.dayModel.type === DayType.BOWeek? true: false;
    this.isBoMonth = this.dayService.dayModel.type === DayType.BOMonth? true: false;

    this.isBoWeekCustom = this.dayService.dayModel.baseOnWeek.type === BaseOnWeekType.Custom? true: false;
    this.isBoMonthCustom = this.dayService.dayModel.baseOnMonth.type === BaseOnMonthType.Custom? true: false;
    this.isBoMonthBefore = this.dayService.dayModel.baseOnMonth.type === BaseOnMonthType.Before? true: false;
  }

}
