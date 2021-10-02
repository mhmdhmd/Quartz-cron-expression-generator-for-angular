import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DayComponent } from "./components/day/day.component";
import { HoursComponent } from "./components/hours/hours.component";
import { MinutesComponent } from "./components/minutes/minutes.component";
import { MonthComponent } from "./components/month/month.component";
import { SecondsComponent } from "./components/seconds/seconds.component";
import { YearComponent } from "./components/year/year.component";

const routes: Routes = [
    {path: 'seconds', component: SecondsComponent},
    {path: 'minutes', component: MinutesComponent},
    {path: 'hours', component: HoursComponent},
    {path: 'day', component: DayComponent},
    {path: 'month', component: MonthComponent},
    {path: 'year', component: YearComponent},
    {path: '', redirectTo: "/seconds", pathMatch: 'full'}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}