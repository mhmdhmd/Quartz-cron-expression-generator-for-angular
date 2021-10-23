import { Component } from '@angular/core';

import { DayService } from './components/day/day.service';
import { HoursService } from './components/hours/hours.service';
import { MinutesService } from './components/minutes/minutes.service';
import { MonthService } from './components/month/month.service';
import { SecondsService } from './components/seconds/seconds.service';
import { YearService } from './components/year/year.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  expResult: string = '* * * ? * * *';

  constructor(private secondsService: SecondsService,
              private minutesService: MinutesService,
              private hoursService: HoursService,
              private monthService: MonthService,
              private dayService: DayService,
              private yearService: YearService)
  {
  }

  onGetModel(){
    var secondsExp = this.secondsService.getExpression();
    var minutesExp = this.minutesService.getExpression();
    var hoursExp = this.hoursService.getExpression();
    var monthExp = this.monthService.getExpression();
    var dayExp = this.dayService.getExpression();
    var yearExp = this.yearService.getExpression();
    this.expResult = `${secondsExp} ${minutesExp} ${hoursExp} ${dayExp[1]} ${monthExp} ${dayExp[0]} ${yearExp}`;
  }

  reverseExpression(cronExpressionPattern: string) : void {
    this.secondsService.reversExpression(cronExpressionPattern);
    this.minutesService.reversExpression(cronExpressionPattern);
    this.hoursService.reversExpression(cronExpressionPattern);
    this.dayService.reversExpression(cronExpressionPattern);
    this.monthService.reversExpression(cronExpressionPattern);
    this.yearService.reversExpression(cronExpressionPattern);
  }
}
