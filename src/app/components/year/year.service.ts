import { Injectable } from "@angular/core";
import { Year } from "./year.model";

Injectable()
export class YearService{
    yearModel: Year;

    constructor() {
        this.yearModel = new Year();
    }
}