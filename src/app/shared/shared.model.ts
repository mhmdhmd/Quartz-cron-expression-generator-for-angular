export class Custom{
    specific: Specific = new Specific();
    repeat: Repeat = new Repeat();
    between: Between = new Between();
}

export class Repeat{
    isRepeat: boolean = false;
    interval: number = 0;
    startAt: number = 0;
}

export class Specific{
    isSpecific: boolean = false;
    values: DropDownItem[] = [];
}

export class Between{
    isBetween: boolean = false;
    from: number = 0;
    to: number = 0;
}

export enum Type{
    Every="every",
    Custom="custom"
}

export enum RegexItemsIndex{
    Second=0,
    Minute=1,
    Hour=2,
    DayOfMonth=3,
    Month=4,
    DayOfWeek=5,
    Year=6,
}
export class DropDownItem{
    
    constructor(public id: number, public text:string) {}
}
