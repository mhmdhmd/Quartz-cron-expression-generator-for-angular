import { Injectable } from "@angular/core";

@Injectable()
export class StringService{
    public addComma(str: string): string{
        if(str!=="") // add , to end of string
            str = str.concat(",");
        
        return str;
    }
}