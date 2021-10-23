import { Injectable } from '@angular/core';
import { IExpression } from 'src/app/shared/iexpression';
import { DropDownItem, RegexItemsIndex, Type } from 'src/app/shared/shared.model';
import { StringService } from 'src/app/shared/string.service';
import { Minutes } from './minutes.model';

@Injectable()
export class MinutesService implements IExpression {
  minuteModel: Minutes;

  constructor(private stringService: StringService) {
    this.minuteModel = new Minutes();
  }

  getExpression(): string {
    let expression = '';
    if (this.minuteModel.type === Type.Every) {
      expression = '*';
    } else if (this.minuteModel.type === Type.Custom) {
      //type is custom
      //isRepeat
      if (this.minuteModel.custom.repeat.isRepeat) {
        const interval = this.minuteModel.custom.repeat.interval;
        const startAt = this.minuteModel.custom.repeat.startAt;
        expression = `${startAt}/${interval}`;
      }
      //isSpecific
      if (this.minuteModel.custom.specific.isSpecific) {
        var specificValues = this.minuteModel.custom.specific.values.map(
          (v) => {
            return v.id;
          }
        );

        if(specificValues.length !== 0)
          expression = this.stringService.addComma(expression);

        expression = expression.concat(specificValues.join(','));
      }
      //isBetween
      if (this.minuteModel.custom.between.isBetween) {
        expression = this.stringService.addComma(expression);

        var from = this.minuteModel.custom.between.from;
        var to = this.minuteModel.custom.between.to;
        expression = expression.concat(`${from}-${to}`);
      }

      if (expression === '') expression = '*';
    }

    return expression;
  }

  reversExpression(cronExpressionPattern: string): void {
    this.minuteModel = new Minutes();
    let regex: string = this.stringService.getRegexItem(cronExpressionPattern, RegexItemsIndex.Minute)
    
    let isCustom: boolean = regex !== "*";
    if (!isCustom) {
      this.minuteModel.type = Type.Every;
      return;
    }
    this.minuteModel.type = Type.Custom;
    
    let intervalData = this.stringService.getIntervalCronData(regex);
    let hasIntervalItems = intervalData !== undefined;
    if(hasIntervalItems){
      this.minuteModel.custom.repeat.isRepeat = true;
      this.minuteModel.custom.repeat.interval = intervalData?.interval as number;
      this.minuteModel.custom.repeat.startAt = intervalData?.startAt as number;
    }

    let specificData = this.stringService.getSpecificCronData(regex);
    let hasSpecificItems = specificData !== undefined;
    if(hasSpecificItems){
      this.minuteModel.custom.specific.isSpecific = true;
      this.minuteModel.custom.specific.values = specificData as Array<DropDownItem>;
    }


    let rangeData = this.stringService.getRangeCronData(regex);
    let hasRangeItem = rangeData !== undefined;
    if(hasRangeItem){
      this.minuteModel.custom.between.isBetween = true;
      this.minuteModel.custom.between.from = rangeData?.from as number;
      this.minuteModel.custom.between.to = rangeData?.to as number;
    }
  }
  
}
