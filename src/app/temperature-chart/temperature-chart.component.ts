import {Component, Inject, Input, NgModule} from '@angular/core';
import { LineChartModule } from "@swimlane/ngx-charts";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
@Component({
  selector: 'app-temperature-chart',
  template: `
      <ngx-charts-line-chart
              [view]="[700, 400]"
              [results]="chartData"
              [xAxis]="true"
              [yAxis]="true"
              [legend]="false"
              [showXAxisLabel]="true"
              [showYAxisLabel]="true"
              [yScaleMin]="yScaleMin"
              [yScaleMax]="yScaleMax"
              xAxisLabel="Dzień"
              yAxisLabel="Temperatura">
      </ngx-charts-line-chart>
  `,
  imports: [
    LineChartModule
  ],
  standalone: true
})
export class TemperatureChartComponent {
  temperatureData: number[];
  Data: number[];

  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.temperatureData = data.temperatureData;
    this.Data = data.Data;
  }
  get yScaleMin() {
    return Math.min(...this.temperatureData) - 2;
  }

  get yScaleMax() {
    return Math.max(...this.temperatureData) + 2;
  }

  get chartData() {
    return [{
      name: 'Temperature',
      series: this.temperatureData?.map((value, index) => {
        return {
          name: `${this.Data[index]}`,
          value
        }
      }) || []
    }];
  }
}
