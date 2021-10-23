import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DropDownItem, Type } from '../../shared/shared.model';
import { MinutesService } from './minutes.service';

@Component({
  selector: 'app-minutes',
  templateUrl: './minutes.component.html',
  styleUrls: ['./minutes.component.css']
})
export class MinutesComponent implements OnInit {

  constructor(public minutesService: MinutesService) { }

  dropdownList: DropDownItem[] = [];
  dropdownSettings : IDropdownSettings = {};
  public zeroTo59: number[] = [];

  ngOnInit() {
    for(let i=0;i<60;i++){
      this.zeroTo59[i] = i;
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
    return this.minutesService.minuteModel.type === Type.Every ? false: true;
  }
}
