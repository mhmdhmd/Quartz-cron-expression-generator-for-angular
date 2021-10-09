import { Injectable } from "@angular/core";
import { IExpression } from "src/app/shared/iexpression";
import { StringService } from "src/app/shared/string.service";
import { BaseOnMonthType, BaseOnWeekType, Day, DayType } from "./day.model";

@Injectable()
export class DayService implements IExpression{
    dayModel : Day;

    constructor(private stringService: StringService) {
        this.dayModel = new Day();        
    }

    getExpression(): any {
        let boMonthExp = '';
        let boWeekExp = '';
        if (this.dayModel.type === DayType.Every) {
          boMonthExp = '?';
          boWeekExp = '*';
        } else if (this.dayModel.type === DayType.BOMonth) {
            boWeekExp = '?';
            if(this.dayModel.baseOnMonth.type === BaseOnMonthType.Last){
                boMonthExp = 'L';
            } else if(this.dayModel.baseOnMonth.type === BaseOnMonthType.Before){
                var before = this.dayModel.baseOnMonth.before;

                boMonthExp = `L-${before}`;
            } else if(this.dayModel.baseOnMonth.type === BaseOnMonthType.Custom){
                if(this.dayModel.baseOnMonth.custom.repeat.isRepeat){
                    const interval = this.dayModel.baseOnMonth.custom.repeat.interval;
                    const startAt = this.dayModel.baseOnMonth.custom.repeat.startAt;
                    boMonthExp = `${startAt}/${interval}`;
                }
                if(this.dayModel.baseOnMonth.custom.specific.isSpecefic){
                    boMonthExp = this.stringService.addComma(boMonthExp);

                    var specificValues = this.dayModel.baseOnMonth.custom.specific.values.map((v) =>{
                        return v.id
                    });
                    boMonthExp = boMonthExp.concat(specificValues.join(','));
                }
                if(boMonthExp==='') boMonthExp='*';
            }
        } else if (this.dayModel.type === DayType.BOWeek){
            boMonthExp = '?';
            if(this.dayModel.baseOnWeek.type === BaseOnWeekType.Last){
                var lastDay = this.dayModel.baseOnWeek.last.day;

                boWeekExp = `${lastDay}L`;
            } else if(this.dayModel.baseOnWeek.type === BaseOnWeekType.Custom){
                if(this.dayModel.baseOnWeek.custom.repeat.isRepeat){
                    const interval = this.dayModel.baseOnWeek.custom.repeat.interval;
                    const startAt = this.dayModel.baseOnWeek.custom.repeat.startAt;
                    boWeekExp = `${startAt}/${interval}`;
                }
                if(this.dayModel.baseOnWeek.custom.specific.isSpecefic){
                    boWeekExp = this.stringService.addComma(boWeekExp);

                    var specificValues = this.dayModel.baseOnWeek.custom.specific.values.map((v) =>{
                        return v.id
                    });
                    boWeekExp = boWeekExp.concat(specificValues.join(','));
                }
                if(this.dayModel.baseOnWeek.custom.dayOfMonth.isDayOfMonth){
                    boWeekExp = this.stringService.addComma(boWeekExp);

                    var day = this.dayModel.baseOnWeek.custom.dayOfMonth.day;
                    var xst = this.dayModel.baseOnWeek.custom.dayOfMonth.xst;

                    boWeekExp = boWeekExp.concat(`${day}#${xst}`);
                }
                if(boWeekExp==='') boWeekExp='*';
            }
        }
    
        return [boWeekExp, boMonthExp];
      }
}