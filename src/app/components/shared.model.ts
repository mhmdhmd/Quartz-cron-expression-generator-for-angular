
export class Custom{
    specific: Specific = new Specific();
}

export class Repeat{
    isRepeat: boolean = false;
    repeatInterval: number = 1;
}

export class Specific{
    isSpecific: boolean = false;
    specificValues: number[] = [];
}

export class Between{
    isBetween: boolean = false;
}

export enum Type{
    Every="every",
    Custom="custom"
}