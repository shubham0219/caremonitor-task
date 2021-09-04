export interface IageRangeApiResponse {
  data: [
    {
      ageGroup: string;
      Males: number;
      Females: number;
    }
  ];
}

export interface IvaccineageRangeApiResponse {
  data: [
    {
      age_group: string;
      dose1_count: number;
      dose1_perc: string;
      dose2_count: number;
      dose2_perc: string;
      population: number;
    }
  ];
}

export interface Istatistics {
  data: [
    {
      CaseStatsReportingDate: string;
      CaseStatsReportingDateUnixTimestamp: number;
      Cases: number;
      Deaths: number;
      InterStateCases: number;
      InterStateCases_24hrs: number;
      LocalCases: number;
      LocalCasesWithKnownSource: number;
      LocalCasesWithKnownSource_24hrs: number;
      LocalCasesWithUnknownSource: number;
      LocalCasesWithUnknownSource_24hrs: number;
      LocalCases_24hrs: number;
      NewCases: number;
      OverseasCases: number;
      OverseasCases_24hrs: number;
      Recovered: number;
      TestStatsReportingDate: string;
      TestStatsReportingDateUnixTimestamp: number;
      Test_24hrs: number;
      Tested: number;
      concurrentHospitalisations: number;
      concurrentHospitalisationsIcu: number;
      concurrentHospitalisationsVentilated: number;
      hospitalisationsReportingDate: string;
      hospitalisationsReportingDateUnixTimestamp: number;
    }
  ];
}

export interface IStateVaccinationMetrics {
  allProvidersDosesCumulative: number;
  daysAvailableInLast3: number;
  gpNetworkDosesCumulative: number;
  gpNetworkUpdatedDate: string;
  nswHealthDosesCumulative: number;
  nswHealthDosesDaily: number;
  nswHealthDosesLast3Days: number;
  nswHealthUpdatedDate: string;
}
