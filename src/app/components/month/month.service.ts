import { Injectable } from '@angular/core';
import { IExpression } from 'src/app/shared/iexpression';
import { Type } from 'src/app/shared/shared.model';
import { StringService } from 'src/app/shared/string.service';
import { Month } from './month.model';

@Injectable()
export class MonthService implements IExpression {
  monthModel: Month;

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
        const interval = this.monthModel.custom.repeat.interval;
        const startAt = this.monthModel.custom.repeat.startAt;
        expression = `${interval}/${startAt}`;
      }
      //isSpecific
      if (this.monthModel.custom.specific.isSpecific) {
        expression = this.stringService.addComma(expression);

        var specificValues = this.monthModel.custom.specific.values.map((v) => {
          return v.id;
        });
        expression = expression.concat(specificValues.join(','));
      }
      //isBetween
      if (this.monthModel.custom.between.isBetween) {
        expression = this.stringService.addComma(expression);

        var from = this.monthModel.custom.between.from;
        var to = this.monthModel.custom.between.to;
        expression = expression.concat(`${from}-${to}`);
      }

      if (expression === '') expression = '*';
    }

    return expression;
  }
}
