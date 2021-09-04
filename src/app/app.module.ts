import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HighchartsChartModule } from 'highcharts-angular';

import { HttpClientModule } from "@angular/common/http";
import { CaremonitorAgeGroupComponent } from './caremonitor-age-group/caremonitor-age-group.component';
import { CasesByAgeGroupComponent } from './cases-by-age-group/cases-by-age-group.component';

@NgModule({
  declarations: [
    AppComponent,
    CaremonitorAgeGroupComponent,
    CasesByAgeGroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HighchartsChartModule, HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports:[HighchartsChartModule]
})
export class AppModule { }
