import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data-service';
import { ExcelService } from 'src/app/services/excel.service';
import { timer } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.scss']
})
export class LeaderBoardComponent implements OnInit {
  dataService;
  excelService;
  results;
  aggregatedResults;
  positions;
  currencies;
  loading = true;
  constructor(dataService: DataService, excelService: ExcelService) {
    this.dataService = dataService;
    this.excelService = excelService;
  }
  ngOnInit() {
    const ticker = timer(0, 10000);
    ticker.subscribe(() => {
      this.dataService.getUnitsByPositions().subscribe(
        value => {
          this.loading = true;
          this.results = value;
          this.aggregatedResults = this.getAggregatedResults(this.results);
          setTimeout( () => this.loading = false , 2000);
        });
      this.dataService.getCurrencies().subscribe(
        value => {
          this.currencies = value.rates;
        });
    });
  }

  getAggregatedResults(data) {
    let result = _.groupBy(data, 'financial_unit');
    result = _.map(result, (objs, key) => ({
        financial_unit: key,
        calc: _.sumBy(objs, 'calc') }));

    return result;
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.results, 'fix-capitolis');
  }

}
