import { Injectable } from "@angular/core";
import { Seconds } from "./seconds.model";

Injectable()
export class SecondsService{
    secondModel: Seconds;

    constructor() {
        this.secondModel = new Seconds();
    }
}