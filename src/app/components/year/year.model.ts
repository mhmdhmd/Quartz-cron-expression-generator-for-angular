import { Custom as sharedCustom, Type, Repeat as sharedRepeat, Between as sharedBetween } from "../../shared/shared.model";

export class Year{
    type: Type = Type.Every;
    custom: Custom = new Custom();
}

export class Repeat extends sharedRepeat{
    startAt = (new Date()).getFullYear();
}

export class Between extends sharedBetween{
    from = (new Date()).getFullYear();
    to = (new Date()).getFullYear();
}

export class Custom extends sharedCustom{
    repeat = new Repeat();
    between = new Between();
}