export class Custom{
    specific: Specific = new Specific();
    repeat: Repeat = new Repeat();
    between: Between = new Between();
}

export class Repeat{
    isRepeat: boolean = false;
    interval: number = 1;
    startAt: number = 1;
}

export class Specific{
    isSpecific: boolean = false;
    values: DropDownItem[] = [];
}

export class Between{
    isBetween: boolean = false;
    from: number = 1;
    to: number = 1;
}

export enum Type{
    Every="every",
    Custom="custom"
}

export class DropDownItem{
    
    constructor(public id: number, public text:string) {}
}