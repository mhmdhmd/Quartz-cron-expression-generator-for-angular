import { Injectable } from '@angular/core';
import { IExpression } from 'src/app/shared/iexpression';
import { DropDownItem, RegexItemsIndex, Type } from 'src/app/shared/shared.model';
import { StringService } from 'src/app/shared/string.service';
import { Hours } from './hours.model';

@Injectable()
export class HoursService implements IExpression {
  hourModel: Hours;

  constructor(private stringService: StringService) {
    this.hourModel = new Hours();
  }

  getExpression(): string {
    let expression = '';
    if (this.hourModel.type === Type.Every) {
      expression = '*';
    } else if (this.hourModel.type === Type.Custom) {
      //type is custom
      //isRepeat
      if (this.hourModel.custom.repeat.isRepeat) {
        const interval = this.hourModel.custom.repeat.interval;
        const startAt = this.hourModel.custom.repeat.startAt;
        expression = `${startAt}/${interval}`;
      }
      //isSpecific
      if (this.hourModel.custom.specific.isSpecific) {
        var specificValues = this.hourModel.custom.specific.values.map((v) => {
          return v.id;
        });

        if(specificValues.length !== 0)
          expression = this.stringService.addComma(expression);

        expression = expression.concat(specificValues.join(','));
      }
      //isBetween
      if (this.hourModel.custom.between.isBetween) {
        expression = this.stringService.addComma(expression);

        var from = this.hourModel.custom.between.from;
        var to = this.hourModel.custom.between.to;
        expression = expression.concat(`${from}-${to}`);
      }

      if (expression === '') expression = '*';
    }

    return expression;
  }

  reversExpression(cronExpressionPattern: string): void {
    this.hourModel = new Hours();
    let regex: string = this.stringService.getRegexItem(cronExpressionPattern, RegexItemsIndex.Hour)
    
    let isCustom: boolean = regex !== "*";
    if (!isCustom) {
      this.hourModel.type = Type.Every;
      return;
    }
    this.hourModel.type = Type.Custom;
    
    let intervalData = this.stringService.getIntervalCronData(regex);
    let hasIntervalItems = intervalData !== undefined;
    if(hasIntervalItems){
      this.hourModel.custom.repeat.isRepeat = true;
      this.hourModel.custom.repeat.interval = intervalData?.interval as number;
      this.hourModel.custom.repeat.startAt = intervalData?.startAt as number;
    }

    let specificData = this.stringService.getSpecificCronData(regex);
    let hasSpecificItems = specificData !== undefined;
    if(hasSpecificItems){
      this.hourModel.custom.specific.isSpecific = true;
      this.hourModel.custom.specific.values = specificData as Array<DropDownItem>;
    }


    let rangeData = this.stringService.getRangeCronData(regex);
    let hasRangeItem = rangeData !== undefined;
    if(hasRangeItem){
      this.hourModel.custom.between.isBetween = true;
      this.hourModel.custom.between.from = rangeData?.from as number;
      this.hourModel.custom.between.to = rangeData?.to as number;
    }
  }

}
