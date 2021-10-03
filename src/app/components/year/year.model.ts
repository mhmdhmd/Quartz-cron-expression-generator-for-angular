import { Custom as sharedCustom, Type, Repeat as sharedRepeat, Between as sharedBetween } from "../shared.model";

export class Year{
    type: Type = Type.Every;
    custom: Custom = new Custom();
}

export class Repeat extends sharedRepeat{
    repeatStartAt: number = (new Date()).getFullYear();
}

export class Between extends sharedBetween{
    betweenFrom: number = (new Date()).getFullYear();
    betweenTo: number = (new Date()).getFullYear();
}

export class Custom extends sharedCustom{
    repeat: Repeat = new Repeat();
    between: Between = new Between();
}