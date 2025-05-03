import { Component } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';

interface WeatherDay {
  date: string;
  temperature: number;
  type: 'Sunny' | 'Extremely Cold' | 'Extremely Hot' | 'Rain' | 'Other Days';
  humidity: number;
  windSpeed: number;
}

interface WeatherStats {
  sunnyDays: number;
  extremelyColdDays: number;
  extremelyHotDays: number;
  rainyDays: number;
}

@Component({
  selector: 'app-weather-info',
  standalone: false,
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.css']
})
export class WeatherInfoComponent {
  selectedMonth: string = '';
  years: number[] = [];
  currentDate = new Date();
  selectedYear: Date = this.currentDate;
  weatherData: any;
  fromDate: Date = new Date();
  toDate: Date = new Date();
  constructor(
    private weatherService: WeatherService,
  ) { };


  ngOnInit() {
    this.selectedYear = new Date();
  }

  onYearChange(date: Date) {
    if (date) {
      this.selectedYear = date;
      this.setInitialMonth();
    }
  }

  onMonthSelect(month: string) {
    this.selectedMonth = month;
    this.setDateRange();
  }

  setInitialMonth() {
    const currentYear = new Date().getFullYear();
    const selectedYear = this.selectedYear.getFullYear();

    if (selectedYear === currentYear) {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      this.selectedMonth = months[new Date().getMonth()];
      this.setDateRange();
    } else {
      this.selectedMonth = 'Jan';
      console.log("lksdj");

      this.setDateRange();
    }
  }

  setDateRange() {
    const monthMap: { [key: string]: number } = {
      'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
      'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };

    const currentDate = new Date();
    const selectedYear = this.selectedYear.getFullYear();
    const selectedMonthIndex = monthMap[this.selectedMonth];

    this.fromDate = new Date(selectedYear, selectedMonthIndex, 1);

    if (selectedYear === currentDate.getFullYear() && selectedMonthIndex === currentDate.getMonth()) {
      this.toDate = new Date();
    } else {
      this.toDate = new Date(selectedYear, selectedMonthIndex + 1, 0);
    }
    console.log();

    this.getWeatherWiseData()
  }

  getWeatherTypeClass(type: string): string {
    switch (type) {
      case 'Sunny':
        return 'bg-yellow-100 text-yellow-800';
      case 'Extremely Cold':
        return 'bg-blue-100 text-blue-800';
      case 'Extremely Hot':
        return 'bg-red-100 text-red-800';
      case 'Rain':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getWeatherWiseData() {
    let payload = {
      lat: 28.6807,
      lon: 77.5218,
      radius: 10,
      fromDate: formatDate(this.fromDate, 'yyyy-MM-dd HH:mm:ss', 'en-US'),
      toDate: formatDate(this.toDate, 'yyyy-MM-dd HH:mm:ss', 'en-US')
    }
    console.log('payload', payload);
    this.weatherService.getWeatherData(payload).subscribe((res: any) => {
      this.weatherData = res?.body?.data;
    })
  }
}
