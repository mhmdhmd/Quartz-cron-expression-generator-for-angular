import { Injectable } from "@angular/core";
import { Hours } from "./hours.model";

Injectable()
export class HoursService{
    hourModel: Hours;

    constructor() {
        this.hourModel = new Hours();
    }
}