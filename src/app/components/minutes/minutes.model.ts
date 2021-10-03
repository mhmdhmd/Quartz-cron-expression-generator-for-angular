import { Custom as sharedCustom, Type, Repeat as sharedRepeat, Between as sharedBetween } from "../shared.model";

export class Minutes{
    type: Type = Type.Every;
    custom: Custom = new Custom();
}

export class Repeat extends sharedRepeat{
    repeatStartAt: string = "00";
}

export class Between extends sharedBetween{
    betweenFrom: string = "00";
    betweenTo: string = "00";
}

export class Custom extends sharedCustom{
    repeat: Repeat = new Repeat();
    between: Between = new Between();
}