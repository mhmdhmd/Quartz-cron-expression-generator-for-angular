import { Injectable } from '@angular/core';
import { IExpression } from 'src/app/shared/iexpression';
import { DropDownItem, RegexItemsIndex, Type } from 'src/app/shared/shared.model';
import { StringService } from 'src/app/shared/string.service';
import { Month } from './month.model';

@Injectable()
export class MonthService implements IExpression {
  monthModel: Month;
  monthList : Array<string> = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  constructor(private stringService: StringService) {
    this.monthModel = new Month();
  }

  getExpression(): string {
    let expression = '';
    if (this.monthModel.type === Type.Every) {
      expression = '*';
    } else if (this.monthModel.type === Type.Custom) {
      //type is custom
      //isRepeat
      if (this.monthModel.custom.repeat.isRepeat) {
        const interval = +this.monthModel.custom.repeat.interval+1;
        const startAt = this.monthModel.custom.repeat.startAt;
        expression = `${+startAt+1}/${interval}`;
      }
      //isSpecific
      if (this.monthModel.custom.specific.isSpecific) {
        var specificValues = this.monthModel.custom.specific.values.map((v) => {
          return v.id;
        });

        if(specificValues.length!==0)
          expression = this.stringService.addComma(expression);
        expression = expression.concat(specificValues.join(','));
      }
      //isBetween
      if (this.monthModel.custom.between.isBetween) {
        expression = this.stringService.addComma(expression);

        var from = this.monthModel.custom.between.from;
        var to = this.monthModel.custom.between.to;
        expression = expression.concat(`${+from+1}-${+to+1}`);
      }

      if (expression === '') expression = '*';
    }

    return expression;
  }

  reversExpression(cronExpressionPattern: string): void {
    this.monthModel = new Month();
    let regex: string = this.stringService.getRegexItem(cronExpressionPattern, RegexItemsIndex.Month)
    
    let isCustom: boolean = regex !== "*";
    if (!isCustom) {
      this.monthModel.type = Type.Every;
      return;
    }
    this.monthModel.type = Type.Custom;
    
    let intervalData = this.stringService.getIntervalCronData(regex);
    let hasIntervalItems = intervalData !== undefined;
    if(hasIntervalItems){
      this.monthModel.custom.repeat.isRepeat = true;
      this.monthModel.custom.repeat.interval = intervalData?.interval as number - 1;
      this.monthModel.custom.repeat.startAt = intervalData?.startAt as number -1;
    }

    let specificData = this.stringService.getSpecificCronData(regex, this.monthList);
    let hasSpecificItems = specificData !== undefined;
    if(hasSpecificItems){
      this.monthModel.custom.specific.isSpecific = true;
      this.monthModel.custom.specific.values = specificData as Array<DropDownItem>;
    }


    let rangeData = this.stringService.getRangeCronData(regex);
    let hasRangeItem = rangeData !== undefined;
    if(hasRangeItem){
      this.monthModel.custom.between.isBetween = true;
      this.monthModel.custom.between.from = rangeData?.from as number - 1;
      this.monthModel.custom.between.to = rangeData?.to as number - 1;
    }
  }

}
