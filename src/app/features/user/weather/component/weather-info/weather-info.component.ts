import { Component } from '@angular/core';
import { CommonModule, DatePipe, formatDate } from '@angular/common';
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
  isLoading: boolean = false;
  minYearDate = new Date(2010, 0, 1); 
  maxYearDate = new Date(2026, 11, 31);
  constructor(
    private weatherService: WeatherService,
    private datePipe: DatePipe
  ) { };


  ngOnInit() {
    this.selectedYear = new Date();
  }

  onYearChange(date: Date) {
  if (date) {
    const year = date.getFullYear();
    if (year >= 2010 && year <= 2026) {
      this.selectedYear = date;
      this.setInitialMonth();
    } else {
      this.selectedYear = new Date();
    }
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
    this.getWeatherWiseData()
  }


  getWeatherWiseData() {
    this.isLoading = true;
    let payload = {
      lat: 28.6807,
      lon: 77.5218,
      radius: 10,
      fromDate: formatDate(this.fromDate, 'yyyy-MM-dd HH:mm:ss', 'en-US'),
      toDate: formatDate(this.toDate, 'yyyy-MM-dd HH:mm:ss', 'en-US')
    }
    this.weatherService.getWeatherData(payload).subscribe((res: any) => {
      this.isLoading = false;
      this.weatherData = res?.body?.data;
    })
  }

  formatDate(date: Date | string): string {
    return this.datePipe.transform(date, 'd MMMM yyyy') || '';
  }

  currentExpandedRow: any = null;

  toggleDetails(day: any) {
    if (this.currentExpandedRow && this.currentExpandedRow !== day) {
      this.currentExpandedRow.showDetails = false;
    }

    day.showDetails = !day.showDetails;
    this.currentExpandedRow = day.showDetails ? day : null;

    if (day.showDetails) {
      this.fetchDetailsForDay(day?.forecastId);
    }
  }

  dayNigthData: any = {};
  fetchDetailsForDay(id: any) {
    this.weatherService.getWeatherDayNightData(id).subscribe((res: any) => {
      const data:any = res?.body?.data || [];
      const day = data?.find((d:any) => d.forecastType === 'Day');
      const night = data?.find((d:any) => d.forecastType === 'Night');

      this.dayNigthData = {
        forecastDay: day?.forecastDay || night?.forecastDay,
        day: { ...day },
        night: { ...night }
      };            
    })
  }

}
