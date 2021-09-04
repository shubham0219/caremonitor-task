import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { CaremonitorService } from './caremonitor.service';
import { IStateVaccinationMetrics, Istatistics } from './types/api.response.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'caremonitor';
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;
  statsData: any;

  newCases: number;
  InterStateCases: number;
  hospitalCases: number;
  icuCases: number;
  ventilatorCases: number;

  Test_24hrs: number;
  NewCases: number;
  Tested: number;
  LocalCases: number;
  Deaths: number;
  Cases: number;

  nswHealthDosesDaily: number;
  nswHealthDosesCumulative: number;
  gpNetworkDosesCumulative: number;
  allProvidersDosesCumulative: number;

  constructor(private caremonitorService: CaremonitorService) {}

  ngOnInit(): void {
    this.getColumnData();
    this.getStats();
    this.getVaccinationStats();
  }

  getColumnData(): void {
    const data = [];
    this.caremonitorService.getCaseLocationsData().subscribe((res: any) => {
      res.data.forEach(
        (element) => {
          let finalData = [];
          finalData.push(element?.notification_date, element?.Cases);
          data.push(finalData);
        },
        (err) => {
          console.log('error', err);
        }
      );

      //Started the chart creation
      this.chartOptions = {
        xAxis: {
          type: 'category',
          labels: {
            rotation: -45,
            style: {
              fontSize: '13px',
              fontFamily: 'Verdana, sans-serif',
            },
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
        tooltip: {
          pointFormat: 'Cases: <b>{point.x}</b>',
          style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif',
          },
        },
        series: [
          {
            type: 'column',
            data: data,
          },
        ],
      };
    });
  }

  getStats(): void {
    this.caremonitorService.getStatistics().subscribe(
      (res: Istatistics) => {
        this.newCases = res?.data[0]?.LocalCases_24hrs;
        this.InterStateCases = res?.data[0]?.InterStateCases_24hrs;
        this.hospitalCases = res?.data[0]?.concurrentHospitalisations;
        this.icuCases = res?.data[0]?.concurrentHospitalisationsIcu;
        this.ventilatorCases = res?.data[0]?.concurrentHospitalisationsVentilated;
        this.Test_24hrs = res?.data[0]?.Test_24hrs;
        this.NewCases = res?.data[0]?.NewCases;
        this.Tested = res?.data[0]?.Tested;
        this.LocalCases = res?.data[0]?.LocalCases;
        this.Deaths = res?.data[0]?.Deaths;
        this.Cases = res?.data[0]?.Cases;
      },
      (err) => {
        alert('Something went wrong please try again later!!');
        console.log(err);
      }
    );
  }

  getVaccinationStats(): void {
    this.caremonitorService.getVaccinationStats().subscribe(
      (res: IStateVaccinationMetrics) => {
        this.nswHealthDosesDaily = res['nswHealthDosesDaily'];
        this.nswHealthDosesCumulative = res['nswHealthDosesCumulative'];
        this.gpNetworkDosesCumulative = res['gpNetworkDosesCumulative'];
        this.allProvidersDosesCumulative = res['allProvidersDosesCumulative'];
      },
      (err) => {
        alert('Something went wrong please try again later!!');
        console.log('err', err);
      }
    );
  }

  scrollto(dest: string) {
    const el: HTMLElement | null = document.getElementById(dest);
    if (el) {
      interval(0)
        .pipe(take(1))
        .subscribe(() =>
          el.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest',
          })
        );
    }
  }
}
