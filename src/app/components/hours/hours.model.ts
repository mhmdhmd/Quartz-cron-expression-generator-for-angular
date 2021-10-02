export class Hours{
    type: string = "every";
    repeat: boolean = false;
    repeatInterval: number = 1;
    repeatStartAt: string = "00";
    specific: boolean = false;
    specificHours: number[] = [];
    between: boolean = false;
    betweenFrom: string = "00";
    betweenTo: string = "00";
}