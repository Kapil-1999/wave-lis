import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'statistics-map',
  standalone: false,
  templateUrl: './statistics-map.component.html',
  styleUrl: './statistics-map.component.scss'
})
export class StatisticsMapComponent {
  @ViewChild('mapIframe') mapIframe!: ElementRef;
  
  printMap() {
    const iframe = this.mapIframe.nativeElement;
    const iframeWindow = iframe.contentWindow;

    try {
      iframeWindow.focus();
      iframeWindow.print();
    } catch (error) {
      console.error('Error printing map:', error);
    }
  }
}
