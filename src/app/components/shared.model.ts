
export class Custom{
    repeat: Repeat = new Repeat();
    specific: Specific = new Specific();
    between: Between = new Between();
}

export class Repeat{
    isRepeat: boolean = false;
    repeatInterval: number = 1;
    repeatStartAt: string = "00";
}

export class Specific{
    isSpecific: boolean = false;
    specificValues: number[] = [];
}

export class Between{
    isBetween: boolean = false;
    betweenFrom: string = "00";
    betweenTo: string = "00";
}

export enum Type{
    Every="every",
    Custom="custom"
}