import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-khasra-plot-map',
  standalone: false,
  templateUrl: './khasra-plot-map.component.html',
  styleUrl: './khasra-plot-map.component.scss'
})
export class KhasraPlotMapComponent {
  @ViewChild('mapPlotIframe') mapPlotIframe!: ElementRef;
  
  printMap() {
    const iframe = this.mapPlotIframe.nativeElement;
    const iframeWindow = iframe.contentWindow;

    try {
      iframeWindow.focus();
      iframeWindow.print();
    } catch (error) {
      console.error('Error printing map:', error);
    }
  }
}
