import { Injectable } from '@angular/core';
import { IExpression } from 'src/app/shared/iexpression';
import { Type } from 'src/app/shared/shared.model';
import { StringService } from 'src/app/shared/string.service';
import { Seconds } from './seconds.model';

@Injectable()
export class SecondsService implements IExpression {
  secondModel: Seconds;

  constructor(private stringService: StringService) {
    this.secondModel = new Seconds();
  }

  getExpression(): string {
    let expression = '';
    if (this.secondModel.type === Type.Every) {
      expression = '*';
    } else if (this.secondModel.type === Type.Custom) {
      //type is custom
      //isRepeat
      if (this.secondModel.custom.repeat.isRepeat) {
        const interval = this.secondModel.custom.repeat.interval;
        const startAt = this.secondModel.custom.repeat.startAt;
        expression = `${startAt}/${interval}`;
      }
      //isSpecific
      if (this.secondModel.custom.specific.isSpecific) {
        var specificValues = this.secondModel.custom.specific.values.map(
          (v) => {
            return v.id;
          }
        );

        if(specificValues.length !== 0)
          expression = this.stringService.addComma(expression);
          
        expression = expression.concat(specificValues.join(','));
      }
      //isBetween
      if (this.secondModel.custom.between.isBetween) {
        expression = this.stringService.addComma(expression);

        var from = this.secondModel.custom.between.from;
        var to = this.secondModel.custom.between.to;
        expression = expression.concat(`${from}-${to}`);
      }

      if (expression === '') expression = '*';
    }

    return expression;
  }
}
