import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {TemperatureChartComponent} from "./temperature-chart/temperature-chart.component";

interface FlowerData {
  temperature: string;
  Data: number[];
  temperatureData: number[];
  name: string;
  summer: string;
  winter: string;
  wateringDate: string;
  wateringFrequency: string;
  waterInTank: string;
  waterForWatering: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Flowers';
  lastDataFetchTime: Date | undefined;
  selectedFlower: string = '';
  constructor(private dialog: MatDialog) {}

  flowers: FlowerData[] = [
    {
      temperature: '20°C',
      temperatureData: [20, 21, 19, 20, 22, 20, 21],
      Data: [1, 2, 3, 4, 5, 6, 7],
      name: 'Storczyk',
      summer:'250 ml',
      winter:'200 ml',
      wateringDate: '01-01-2024',
      wateringFrequency: '3 dni',
      waterInTank: '100 ml',
      waterForWatering: '200 ml'
    },
    {
      temperature: '20°C',
      temperatureData: [20, 21, 19, 20, 22, 20, 21],
      Data: [1, 2, 3, 4, 5, 6, 7],
      name: 'Tulipan',
      summer:'300 ml',
      winter:'250 ml',
      wateringDate: '02-01-2024',
      wateringFrequency: '2 dni',
      waterInTank: '700 ml',
      waterForWatering: '250 ml'
    },
    {
      temperature: '20°C',
      temperatureData: [20, 21, 19, 20, 22, 20, 21],
      Data: [1, 2, 3, 4, 5, 6, 7],
      name: 'Lawenda',
      summer:'200 ml',
      winter:'180 ml',
      wateringDate: '03-01-2024',
      wateringFrequency: '4 dni',
      waterInTank: '400 ml',
      waterForWatering: '180 ml'
    }
  ];

  openTemperatureChart(flowerName: string) {
    const flowerData = this.getFlowerData(flowerName);
    if (flowerData) {
      console.log(flowerData.temperatureData)
      this.dialog.open(TemperatureChartComponent, {
        data: {
          temperatureData: flowerData.temperatureData,
          Data: flowerData.Data
        }
      });
    } else {
      console.log(`No data found for flower: ${flowerName}`);
    }
  }


  showFlowerData(flowerName: string) {
    this.selectedFlower = flowerName;
  }

  getFlowerData(flowerName: string): FlowerData | undefined {
    return this.flowers.find(flower => flower.name === flowerName);
  }

  calculateWaterPerWeek(waterForWatering: string | undefined): string {
    if (waterForWatering === undefined) {
      return '';
    }

    const waterForWateringNumeric = parseInt(waterForWatering, 10);
    const wateringFrequencyNumeric = parseInt(this.getWateringFrequency(), 10);

    const waterPerWeek = Math.ceil((waterForWateringNumeric / wateringFrequencyNumeric) * 7);
    return `${waterPerWeek} ml`;
  }

  calculateWaterPerYear(waterForWatering: string | undefined): string {
    if (waterForWatering === undefined) {
      return '';
    }

    const waterForWateringNumeric = parseInt(waterForWatering, 10);
    const wateringFrequencyNumeric = parseInt(this.getWateringFrequency(), 10);

    const waterPerYear = Math.ceil((waterForWateringNumeric / wateringFrequencyNumeric) * 365 / 1000);
    return `${waterPerYear} l`;
  }

  private getWateringFrequency(): string {
    if (this.selectedFlower) {
      const selectedFlowerData = this.getFlowerData(this.selectedFlower);
      if (selectedFlowerData) {
        return selectedFlowerData.wateringFrequency;
      }
    }
    return '3';
  }

  isWaterInsufficient(flowerName: string): boolean {
    const flowerData = this.getFlowerData(flowerName);

    if (flowerData) {
      const waterInTank = parseInt(flowerData.waterInTank, 10);
      const waterForWatering = parseInt(flowerData.waterForWatering, 10);
      return waterInTank < waterForWatering;
    }

    return false;
  }

  private simulateDataFetchAtMidnight() {
    this.lastDataFetchTime = new Date();
  }
  fetchDataFromDatabase() {
    this.simulateDataFetchAtMidnight();
  }
}
