import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IageRangeApiResponse,
  IStateVaccinationMetrics,
  Istatistics,
  IvaccineageRangeApiResponse,
} from './types/api.response.type';

@Injectable({
  providedIn: 'root',
})
export class CaremonitorService {
  constructor(private http: HttpClient) {}

  apiURl =
    'https://nswdac-covid-19-postcode-heatmap.azurewebsites.net/datafiles/';
  getCaseLocationsData() {
    return this.http.get(`${this.apiURl}usecase2.json`);
  }

  getCasesByAgeGroup(): Observable<IageRangeApiResponse> {
    return this.http.get<IageRangeApiResponse>(`${this.apiURl}agedata.json`);
  }

  getCasesByAgeGroupVaccines(): Observable<IvaccineageRangeApiResponse> {
    return this.http.get<IvaccineageRangeApiResponse>(
      `${this.apiURl}agedata_vaccines.json`
    );
  }

  getStatistics(): Observable<Istatistics> {
    return this.http.get<Istatistics>(`${this.apiURl}stats.json`);
  }

  getVaccinationStats(): Observable<IStateVaccinationMetrics> {
    return this.http.get<IStateVaccinationMetrics>(`${this.apiURl}state_vaccination_metrics.json`);
  }
}
