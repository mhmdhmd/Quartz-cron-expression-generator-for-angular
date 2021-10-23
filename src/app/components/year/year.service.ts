import { Injectable } from '@angular/core';
import { DropDownItem, RegexItemsIndex, Type } from 'src/app/shared/shared.model';
import { StringService } from 'src/app/shared/string.service';
import { Year } from './year.model';

@Injectable()
export class YearService {
  yearModel: Year;

  constructor(private stringService: StringService) {
    this.yearModel = new Year();
  }

  getExpression(): string {
    let expression = '';
    if (this.yearModel.type === Type.Every) {
      expression = '*';
    } else if (this.yearModel.type === Type.Custom) {
      //type is custom
      //isRepeat
      if (this.yearModel.custom.repeat.isRepeat) {
        const interval = +this.yearModel.custom.repeat.interval+1;
        const startAt = this.yearModel.custom.repeat.startAt;
        expression = `${startAt}/${interval}`;
      }
      //isSpecific
      if (this.yearModel.custom.specific.isSpecific) {
        var specificValues = this.yearModel.custom.specific.values.map((v) => {
          return v.id;
        });
        if(specificValues.length!==0)
          expression = this.stringService.addComma(expression);
        expression = expression.concat(specificValues.join(','));
      }
      //isBetween
      if (this.yearModel.custom.between.isBetween) {
        expression = this.stringService.addComma(expression);

        var from = this.yearModel.custom.between.from;
        var to = this.yearModel.custom.between.to;
        expression = expression.concat(`${from}-${to}`);
      }

      if (expression === '') expression = '*';
    }

    return expression;
  }

  reversExpression(cronExpressionPattern: string): void {
    this.yearModel = new Year();
    let regex: string = this.stringService.getRegexItem(cronExpressionPattern, RegexItemsIndex.Year)
    
    let isCustom: boolean = regex !== "*";
    if (!isCustom) {
      this.yearModel.type = Type.Every;
      return;
    }
    this.yearModel.type = Type.Custom;
    
    let intervalData = this.stringService.getIntervalCronData(regex);
    let hasIntervalItems = intervalData !== undefined;
    if(hasIntervalItems){
      this.yearModel.custom.repeat.isRepeat = true;
      this.yearModel.custom.repeat.interval = intervalData?.interval as number - 1;
      this.yearModel.custom.repeat.startAt = intervalData?.startAt as number;
    }

    let specificData = this.stringService.getSpecificCronData(regex);
    let hasSpecificItems = specificData !== undefined;
    if(hasSpecificItems){
      this.yearModel.custom.specific.isSpecific = true;
      this.yearModel.custom.specific.values = specificData as Array<DropDownItem>;
    }


    let rangeData = this.stringService.getRangeCronData(regex);
    let hasRangeItem = rangeData !== undefined;
    if(hasRangeItem){
      this.yearModel.custom.between.isBetween = true;
      this.yearModel.custom.between.from = rangeData?.from as number;
      this.yearModel.custom.between.to = rangeData?.to as number;
    }
  }

}
