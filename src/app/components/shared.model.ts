
export class Custom{
    specific: Specific = new Specific();
    repeat: Repeat = new Repeat();
    between: Between = new Between();
}

export class Repeat{
    isRepeat: boolean = false;
    repeatInterval: number = 1;
    repeatStartAt: number = 0;
}

export class Specific{
    isSpecific: boolean = false;
    specificValues: number[] = [];
}

export class Between{
    isBetween: boolean = false;
    betweenFrom: number = 0;
    betweenTo: number = 0;
}

export enum Type{
    Every="every",
    Custom="custom"
}