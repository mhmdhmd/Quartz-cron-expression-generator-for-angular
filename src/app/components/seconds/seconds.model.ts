import { Custom as sharedCustom, Type, Repeat as sharedRepeat, Between as sharedBetween } from "../shared.model";

export class Seconds{
    type: Type = Type.Every;
    custom: Custom = new Custom();
}

export class Repeat extends sharedRepeat{
    repeatStartAt: number = 0;
}

export class Between extends sharedBetween{
    betweenFrom: number = 0;
    betweenTo: number = 0;
}

export class Custom extends sharedCustom{
    repeat: Repeat = new Repeat();
    between: Between = new Between();
}