import { Injectable } from "@angular/core";
import { Month } from "./month.model";

Injectable()
export class MonthService{
    monthModel: Month;

    constructor() {
        this.monthModel = new Month();
    }
}