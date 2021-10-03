import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Type } from '../shared.model';
import { SecondsService } from './seconds.service';

@Component({
  selector: 'app-seconds',
  templateUrl: './seconds.component.html',
  styleUrls: ['./seconds.component.css']
})
export class SecondsComponent implements OnInit {

  constructor(public secondsService: SecondsService) { }

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
  onItemSelect(item: any) {
    //console.log(item);
  }
  onSelectAll(items: any) {
    //console.log(items);
  }

  onTypeSelect(event: any){
    this.isCustom = this.getTypeState();
    //console.log(this.secondsService.secondModel);
  }

  getTypeState(){
    return this.secondsService.secondModel.type === Type.Every ? false: true;
  }
}
