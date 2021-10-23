import { Injectable } from "@angular/core";
import { IExpression } from "src/app/shared/iexpression";
import { DropDownItem, RegexItemsIndex } from "src/app/shared/shared.model";
import { StringService } from "src/app/shared/string.service";
import { BaseOnMonthType, BaseOnWeekType, Day, DayType } from "./day.model";

@Injectable()
export class DayService implements IExpression {
    dayModel: Day;
    daysList : Array<string> = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
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
            if (this.dayModel.baseOnMonth.type === BaseOnMonthType.Last) {
                boMonthExp = 'L';
            } else if (this.dayModel.baseOnMonth.type === BaseOnMonthType.Before) {
                var before = this.dayModel.baseOnMonth.before;

                boMonthExp = `L-${before}`;
            } else if (this.dayModel.baseOnMonth.type === BaseOnMonthType.Custom) {
                if (this.dayModel.baseOnMonth.custom.repeat.isRepeat) {
                    const interval = this.dayModel.baseOnMonth.custom.repeat.interval;
                    const startAt = this.dayModel.baseOnMonth.custom.repeat.startAt;
                    boMonthExp = `${startAt}/${interval}`;
                }
                if (this.dayModel.baseOnMonth.custom.specific.isSpecefic) {
                    var specificValues = this.dayModel.baseOnMonth.custom.specific.values.map((v) => {
                        return v.id
                    });

                    if (specificValues.length !== 0)
                        boMonthExp = this.stringService.addComma(boMonthExp);

                    boMonthExp = boMonthExp.concat(specificValues.join(','));
                }
                if (boMonthExp === '') boMonthExp = '*';
            }
        } else if (this.dayModel.type === DayType.BOWeek) {
            boMonthExp = '?';
            if (this.dayModel.baseOnWeek.type === BaseOnWeekType.Last) {
                var lastDay = this.dayModel.baseOnWeek.last.day;

                boWeekExp = `${lastDay}L`;
            } else if (this.dayModel.baseOnWeek.type === BaseOnWeekType.Custom) {
                if (this.dayModel.baseOnWeek.custom.repeat.isRepeat) {
                    const interval = this.dayModel.baseOnWeek.custom.repeat.interval;
                    const startAt = this.dayModel.baseOnWeek.custom.repeat.startAt;
                    boWeekExp = `${startAt}/${interval}`;
                }
                if (this.dayModel.baseOnWeek.custom.specific.isSpecefic) {
                    var specificValues = this.dayModel.baseOnWeek.custom.specific.values.map((v) => {
                        return v.id
                    });

                    if (specificValues.length !== 0)
                        boWeekExp = this.stringService.addComma(boWeekExp);

                    boWeekExp = boWeekExp.concat(specificValues.join(','));
                }
                if (this.dayModel.baseOnWeek.custom.dayOfMonth.isDayOfMonth) {
                    boWeekExp = this.stringService.addComma(boWeekExp);

                    var day = this.dayModel.baseOnWeek.custom.dayOfMonth.day;
                    var xst = this.dayModel.baseOnWeek.custom.dayOfMonth.xst;

                    boWeekExp = boWeekExp.concat(`${day}#${xst}`);
                }
                if (boWeekExp === '') boWeekExp = '*';
            }
        }

        return [boWeekExp, boMonthExp];
    }


    reversExpression(cronExpressionPattern: string): void {
        this.dayModel = new Day();
        let dayOfWeekRegex: string = this.stringService.getRegexItem(cronExpressionPattern, RegexItemsIndex.DayOfWeek)
        let dayOfMonthRegex: string = this.stringService.getRegexItem(cronExpressionPattern, RegexItemsIndex.DayOfMonth)

        let isBasedOnWeek = dayOfWeekRegex !== "*" && dayOfWeekRegex !== "?";
        let isBasedOnMonth = dayOfMonthRegex !== "?";
        let isEveryDay: boolean = !isBasedOnWeek && !isBasedOnMonth;
        if (isEveryDay) {
            this.dayModel.type = DayType.Every
            return;
        };

        if (isBasedOnWeek) {
            this.dayModel.type = DayType.BOWeek;
            this.reversExpressionBasedOnWeek(dayOfWeekRegex);
            return;
        }

        if(isBasedOnMonth){
            this.dayModel.type = DayType.BOMonth;
            this.reversExpressionBasedOnMonth(dayOfMonthRegex);
            return;
        }
    }

    reversExpressionBasedOnWeek(regex: string){
        // **Regex pattern to check id custom or not**
        const regexPattern: RegExp = new RegExp('^[0-9]L$');
        let isCustom: boolean = !regexPattern.test(regex);
        if (!isCustom) {
          this.dayModel.baseOnWeek.type = BaseOnWeekType.Last
          this.dayModel.baseOnWeek.last.day = parseInt(regex[0]);
          return;
        }

        this.dayModel.baseOnWeek.type = BaseOnWeekType.Custom;
        
        let intervalData = this.stringService.getIntervalCronData(regex);
        let hasIntervalItems = intervalData !== undefined;
        if(hasIntervalItems){
          this.dayModel.baseOnWeek.custom.repeat.isRepeat = true;
          this.dayModel.baseOnWeek.custom.repeat.interval = intervalData?.interval as number;
          this.dayModel.baseOnWeek.custom.repeat.startAt = intervalData?.startAt as number;
        }
    
        let specificData = this.stringService.getSpecificCronData(regex, this.daysList);
        let hasSpecificItems = specificData !== undefined;
        if(hasSpecificItems){
          this.dayModel.baseOnWeek.custom.specific.isSpecefic = true;
          this.dayModel.baseOnWeek.custom.specific.values = specificData as Array<DropDownItem>;
        }
    
        let dayOfMonthData = this.stringService.getDayOfMonthCronData(regex);
        let hasDayOfMonthDataItem = dayOfMonthData !== undefined;
        if(hasDayOfMonthDataItem){
          this.dayModel.baseOnWeek.custom.dayOfMonth.isDayOfMonth = true;
          this.dayModel.baseOnWeek.custom.dayOfMonth.day = dayOfMonthData?.day as number;
          this.dayModel.baseOnWeek.custom.dayOfMonth.xst = dayOfMonthData?.xst as number;
        }
    }

    reversExpressionBasedOnMonth(regex: string){
        let isLastDayOfMonth = regex == "L";
        if(isLastDayOfMonth) {
            this.dayModel.baseOnMonth.type = BaseOnMonthType.Last;
            return;
        }

        // **Regex pattern to check if id before or not**
        const regexPattern: RegExp = new RegExp('^L-[0-9]+$');
        let isCustom: boolean = !regexPattern.test(regex);
        if (!isCustom) {
          this.dayModel.baseOnMonth.type = BaseOnMonthType.Before
          this.dayModel.baseOnMonth.before = parseInt(regex.substr(2));
          return;
        }

        this.dayModel.baseOnMonth.type = BaseOnMonthType.Custom;

        let intervalData = this.stringService.getIntervalCronData(regex);
        let hasIntervalItems = intervalData !== undefined;
        if(hasIntervalItems){
          this.dayModel.baseOnMonth.custom.repeat.isRepeat = true;
          this.dayModel.baseOnMonth.custom.repeat.interval = intervalData?.interval as number;
          this.dayModel.baseOnMonth.custom.repeat.startAt = intervalData?.startAt as number;
        }

        let specificData = this.stringService.getSpecificCronData(regex, this.daysList);
        let hasSpecificItems = specificData !== undefined;
        if(hasSpecificItems){
          this.dayModel.baseOnMonth.custom.specific.isSpecefic = true;
          this.dayModel.baseOnMonth.custom.specific.values = specificData as Array<DropDownItem>;
        }
    }
}