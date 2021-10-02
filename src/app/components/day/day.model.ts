export class Day{
    type: DayType = DayType.Every;
    baseOnWeek: BaseOnWeek = new BaseOnWeek();
    baseOnMonth: BaseOnMonth = new BaseOnMonth();
}

export class BaseOnMonth{
    type: BaseOnMonthType = BaseOnMonthType.Last;
    custom: BaseOnMonthCustom = new BaseOnMonthCustom();
    before: number = 1;
}

export class BaseOnWeek{
    type: BaseOnWeekType = BaseOnWeekType.Last;
    last: Last = new Last();
    custom: BaseOnWeekCustom = new BaseOnWeekCustom();
}

export class BaseOnWeekCustom{
    repeat: BaseOnWeekRepeat = new BaseOnWeekRepeat();
    specific: Specific = new Specific();
    dayOfMonth: DayOfMonth = new DayOfMonth();
}

export class BaseOnMonthCustom{
    repeat: BaseOnMonthRepeat = new BaseOnMonthRepeat();
    specific: Specific = new Specific();
}

export class Last{
    day: number = 1;
}

export class BaseRepeat{
    isRepeat: boolean = false;
    interval: number = 1;
}

export class BaseOnWeekRepeat extends BaseRepeat{
    startAt: number = 1;
}

export class BaseOnMonthRepeat extends BaseRepeat{
    startAt: number = 1;
}

export class Specific{
    isSpecefic: boolean = false;
    values: string[] = [];
}

export class DayOfMonth{
    isDayOfMonth: boolean = false;
    Xst: number = 1;
    day: number = 1;
}

export enum DayType{
    Every="every",
    BOWeek="boweek",
    BOMonth="bomonth"
}

export enum BaseOnWeekType{
    Last="last",
    Custom="custom"
}

export enum BaseOnMonthType{
    Last="last",
    Before="before",
    Custom="custom"
}