import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AppComponent } from './app.component';
import { SecondsComponent } from './components/seconds/seconds.component';
import { MinutesComponent } from './components/minutes/minutes.component';
import { HoursComponent } from './components/hours/hours.component';
import { DayComponent } from './components/day/day.component';
import { MonthComponent } from './components/month/month.component';
import { YearComponent } from './components/year/year.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { SecondsService } from './components/seconds/seconds.service';
import { MinutesService } from './components/minutes/minutes.service';
import { HoursService } from './components/hours/hours.service';

@NgModule({
  declarations: [
    AppComponent,
    SecondsComponent,
    MinutesComponent,
    HoursComponent,
    DayComponent,
    MonthComponent,
    YearComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [SecondsService, MinutesService, HoursService],
  bootstrap: [AppComponent]
})
export class AppModule { }
