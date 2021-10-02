export class Seconds{
    type: string = "every";
    repeat: boolean = false;
    repeatInterval: number = 1;
    repeatStartAt: string = "00";
    specific: boolean = false;
    specificSeconds: number[] = [];
    between: boolean = false;
    betweenFrom: string = "00";
    betweenTo: string = "00";
}