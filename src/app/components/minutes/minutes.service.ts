import { Injectable } from '@angular/core';
import { IExpression } from 'src/app/shared/iexpression';
import { Type } from 'src/app/shared/shared.model';
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
}
