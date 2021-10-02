import { Injectable } from "@angular/core";
import { Minutes } from "./minutes.model";

Injectable()
export class MinutesService{
    minuteModel: Minutes;

    constructor() {
        this.minuteModel = new Minutes();
    }
}