import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-custom-map-view',
  standalone: false,
  templateUrl: './custom-map-view.component.html',
  styleUrl: './custom-map-view.component.scss'
})
export class CustomMapViewComponent {
  @ViewChild('customMapIframe') customMapIframe!: ElementRef;

  printMap() {
    const iframe = this.customMapIframe.nativeElement;
    const iframeWindow = iframe.contentWindow;

    try {
      iframeWindow.focus();
      iframeWindow.print();
    } catch (error) {
      console.error('Error printing map:', error);
    }
  }
} 
