import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { CaremonitorService } from '../caremonitor.service';
import { IvaccineageRangeApiResponse } from '../types/api.response.type';

@Component({
  selector: 'app-caremonitor-age-group',
  templateUrl: './caremonitor-age-group.component.html',
  styleUrls: ['./caremonitor-age-group.component.css'],
})
export class CaremonitorAgeGroupComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;
  getCasesByAgeGroup: any;
  age: any[] = [];
  firstDose: any[] = [];
  secondDose: any[] = [];
  constructor(private caremonitorService: CaremonitorService) {}

  ngOnInit(): void {
    this.getDataByAgeGroup();
  }


  getDataByAgeGroup(): void {
    this.caremonitorService.getCasesByAgeGroupVaccines().subscribe(
      (res: IvaccineageRangeApiResponse) => {
        this.age = [];
        this.firstDose = [];
        this.secondDose = [];
        this.getCasesByAgeGroup = res;
        this.getAgeGroupVaccines(this.getCasesByAgeGroup);
      },
      (err) => {
        this.age = [];
        this.firstDose = [];
        this.secondDose = [];
        this.getCasesByAgeGroup = {
          data: [
            {
              dose1_count: 577783,
              dose1_perc: '38',
              age_group: '15-29',
              dose2_count: 190883,
              dose2_perc: '12.6',
              population: 1520929,
            },
            {
              dose1_count: 593497,
              dose1_perc: '49.3',
              age_group: '30-39',
              dose2_count: 230866,
              dose2_perc: '19.2',
              population: 1203371,
            },
            {
              dose1_count: 662933,
              dose1_perc: '61.8',
              age_group: '40-49',
              dose2_count: 400348,
              dose2_perc: '37.3',
              population: 1072181,
            },
            {
              dose1_count: 695337,
              dose1_perc: '69.1',
              age_group: '50-59',
              dose2_count: 415342,
              dose2_perc: '41.3',
              population: 1006062,
            },
            {
              dose1_count: 697456,
              dose1_perc: '77.9',
              age_group: '60-69',
              dose2_count: 362186,
              dose2_perc: '40.5',
              population: 895154,
            },
            {
              dose1_count: 534953,
              dose1_perc: '83',
              age_group: '70-79',
              dose2_count: 358523,
              dose2_perc: '55.6',
              population: 644695,
            },
            {
              dose1_count: 304408,
              dose1_perc: '79.8',
              age_group: '80+',
              dose2_count: 216525,
              dose2_perc: '56.8',
              population: 381564,
            },
          ],
        };
        this.getAgeGroupVaccines(this.getCasesByAgeGroup);
      }
    );
  }

  getAgeGroupVaccines(getCasesByAgeGroup) {
    getCasesByAgeGroup.data.forEach((element) => {
      this.firstDose.push(Number(element?.dose1_perc));
      this.secondDose.push(Number(element?.dose2_perc));
      this.age.push(element?.age_group);
    });
    this.getChartOptions();
  }

  getChartOptions() {
    this.chartOptions = {
      xAxis: {
        type: 'category',
        categories: this.age,
      },
      yAxis: {
        min: 0,
        title: {
          text: '%Vaccinated',
        },
      },
      tooltip: {
        pointFormat: '{series.name} : {point.y}',
      },
      title: {
        text: null,
      },
      plotOptions: {
        column: {
          stacking: 'normal',
        },
      },
      series: [
        {
          type: 'column',
          data: this.firstDose,
          name: '% Fully Vaccinated',
        },
        {
          type: 'column',
          data: this.secondDose,
          name: '% Recieved atleast one dose',
        },
      ],
    };
  }
}
