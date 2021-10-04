import { Injectable } from '@angular/core';
import { Type } from 'src/app/shared/shared.model';
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
        const interval = this.yearModel.custom.repeat.interval;
        const startAt = this.yearModel.custom.repeat.startAt;
        expression = `${interval}/${startAt}`;
      }
      //isSpecific
      if (this.yearModel.custom.specific.isSpecific) {
        expression = this.stringService.addComma(expression);

        var specificValues = this.yearModel.custom.specific.values.map((v) => {
          return v.id;
        });
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
}
