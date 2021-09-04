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

  constructor(private caremonitorService: CaremonitorService) {}

  ngOnInit(): void {
    this.getDataByAgeGroup();
  }

  getDataByAgeGroup(): void {
    const age = [];
    const firstDose = [];
    const secondDose = [];
    this.caremonitorService
      .getCasesByAgeGroupVaccines()
      .subscribe((res: IvaccineageRangeApiResponse) => {
        console.log('res', res);

        res.data.forEach(
          (element) => {
            firstDose.push(Number(element?.dose1_perc));
            secondDose.push(Number(element?.dose2_perc));
            age.push(element?.age_group);
          },
          (err) => {
            console.log('error', err);
            alert('Something went wrong please try again later!!');
          }
        );
        this.chartOptions = {
          xAxis: {
            type: 'category',
            categories: age,
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
              data: firstDose,
              name: '% Fully Vaccinated',
            },
            {
              type: 'column',
              data: secondDose,
              name: '% Recieved atleast one dose',
            },
          ],
        };
      });
  }
}
