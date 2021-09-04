import { Component, OnInit } from '@angular/core';
import { CaremonitorService } from '../caremonitor.service';
import * as Highcharts from 'highcharts';
import { IageRangeApiResponse } from '../types/api.response.type';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-cases-by-age-group',
  templateUrl: './cases-by-age-group.component.html',
  styleUrls: ['./cases-by-age-group.component.css'],
})
export class CasesByAgeGroupComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;
  casesByageGroup: any;
  ageData = [];
  combinedData = [];
  constructor(private caremonitor: CaremonitorService) {}

  ngOnInit(): void {
    this.getDataByAgeGroup();
  }

  getDataByAgeGroup(): void {
    this.caremonitor.getCasesByAgeGroup().subscribe(
      (res: IageRangeApiResponse) => {
        this.ageData = [];
        this.combinedData = [];
        this.casesByageGroup = res;
        this.getCasesByAgeGroup(this.casesByageGroup);
      },
      (err) => {
        this.ageData = [];
        this.combinedData = [];
        this.casesByageGroup = {
          data: [
            { ageGroup: null, Males: 2, Females: 1 },
            { ageGroup: '0-9', Males: 1881, Females: 1828 },
            { ageGroup: '10-19', Males: 2404, Females: 2370 },
            { ageGroup: '20-29', Males: 3886, Females: 3346 },
            { ageGroup: '30-39', Males: 3092, Females: 2591 },
            { ageGroup: '40-49', Males: 2092, Females: 1811 },
            { ageGroup: '50-59', Males: 1720, Females: 1523 },
            { ageGroup: '60-69', Males: 1015, Females: 907 },
            { ageGroup: '70-79', Males: 533, Females: 449 },
            { ageGroup: '80-89', Males: 208, Females: 221 },
            { ageGroup: '90+', Males: 53, Females: 79 },
          ],
        };
        this.getCasesByAgeGroup(this.casesByageGroup);
      }
    );
  }

  getCasesByAgeGroup(casesByageGroup) {
    casesByageGroup?.data?.forEach((element) => {
      this.combinedData.push(element?.Females + element?.Males);
      this.ageData.push(element?.ageGroup);
    });
    this.getChartOptions();
  }

  getChartOptions() {
    this.chartOptions = {
      xAxis: {
        type: 'category',
        categories: this.ageData,
        title: {
          text: 'Age Group',
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Cases',
        },
      },
      legend: {
        enabled: false,
      },
      title: {
        text: null,
      },
      series: [
        {
          name: 'Total Cases',
          type: 'column',
          data: this.combinedData,
        },
      ],
    };
  }
}
