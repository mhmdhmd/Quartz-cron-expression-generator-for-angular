import { Injectable } from "@angular/core";
import { DropDownItem, RegexItemsIndex } from "./shared.model";

@Injectable()
export class StringService {
    public addComma(str: string): string {
        if (str !== "") // add , to end of string
            str = str.concat(",");

        return str;
    }

    getRegexItem(cronExpressionPattern: string, itemIndex: RegexItemsIndex): string {
        let expressionItemsList = cronExpressionPattern.split(" ")
        return expressionItemsList[itemIndex] ? expressionItemsList[itemIndex] : "*";
    }

    getIntervalCronData(regex: string): {interval: number, startAt: number} | undefined {
        const regexDataList: Array<string> = regex.split(",");
        const rangePattern = "/";
        let item = regexDataList.find(item => item.includes(rangePattern));

        return item ? {interval: parseInt(item.split("/")[1]), startAt: parseInt(item.split("/")[0])}: undefined
    }

    getSpecificCronData(regex: string, dropDowndara?: Array<string>): Array<DropDownItem> | undefined {
        const regexDataList: Array<string> = regex.split(",");
        // **Regex pattern to find only digits in an array items.**
        const regexPattern: RegExp = new RegExp('^[0-9]+$');
        let items = regexDataList.filter(item => regexPattern.test(item));

        return items.length ? this.mapItemsToDropDownItem(items, dropDowndara) : undefined;
    }

    getRangeCronData(regex: string): {from: number, to: number} | undefined {
        const regexDataList: Array<string> = regex.split(",");
        const rangePattern = "-";
        let item = regexDataList.find(item => item.includes(rangePattern));
        return item ? {from: parseInt(item.split(rangePattern)[0]), to: parseInt(item.split(rangePattern)[1])}: undefined
    }

    getDayOfMonthCronData(regex: string): {day: number, xst: number} | undefined {
        const regexDataList: Array<string> = regex.split(",");
        const rangePattern = "#";
        let item = regexDataList.find(item => item.includes(rangePattern));
        return item ? {day: parseInt(item.split(rangePattern)[0]), xst: parseInt(item.split(rangePattern)[1])}: undefined
    }

    mapItemsToDropDownItem (items: Array<string>, dropDowndata?: Array<string>) : Array<DropDownItem> {
        return items.map(item => { 
            
            if(dropDowndata){
                let dropDownItem : string | undefined = dropDowndata[parseInt(item) - 1];
                return  dropDownItem ? {id: parseInt(item), text: dropDownItem} : {id: parseInt(item), text: item};
            }
            
            return {id: parseInt(item), text: item}
        
        });
    }
}