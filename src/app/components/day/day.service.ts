import { Injectable } from "@angular/core";
import { Day } from "./day.model";

Injectable()
export class DayService{
    dayModel : Day;

    constructor() {
        this.dayModel = new Day();        
    }
}