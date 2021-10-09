import { Injectable } from '@angular/core';
import { IExpression } from 'src/app/shared/iexpression';
import { Type } from 'src/app/shared/shared.model';
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
        expression = this.stringService.addComma(expression);

        var specificValues = this.hourModel.custom.specific.values.map((v) => {
          return v.id;
        });
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
}
