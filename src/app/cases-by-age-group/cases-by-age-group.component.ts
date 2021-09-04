import { Component, OnInit } from '@angular/core';
import { CaremonitorService } from '../caremonitor.service';
import * as Highcharts from 'highcharts';
import { IageRangeApiResponse } from '../types/api.response.type';

@Component({
  selector: 'app-cases-by-age-group',
  templateUrl: './cases-by-age-group.component.html',
  styleUrls: ['./cases-by-age-group.component.css'],
})
export class CasesByAgeGroupComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;
  constructor(private caremonitor: CaremonitorService) {}

  ngOnInit(): void {
    this.getDataByAgeGroup();
  }

  getDataByAgeGroup(): void {
    const ageData = [];
    const combinedData = [];

    this.caremonitor
      .getCasesByAgeGroup()
      .subscribe((res: IageRangeApiResponse) => {
        res?.data?.forEach(
          (element) => {
            combinedData.push(element?.Females + element?.Males);
            ageData.push(element?.ageGroup);
          },
          (err) => {
            console.log('error', err);
            alert('Something went wrong please try again later!!');
          }
        );
        this.chartOptions = {
          xAxis: {
            type: 'category',
            categories: ageData,
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
              data: combinedData,
            },
          ],
        };
      });
  }
}
