import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-show-file-of-khasra',
  standalone: false,
  templateUrl: './show-file-of-khasra.component.html',
  styleUrl: './show-file-of-khasra.component.scss'
})
export class ShowFileOfKhasraComponent {
  type: string = '';
  pdfData: string = '';
  pdfUrl!: SafeResourceUrl;
  constructor (
  private modalRef: BsModalService,
  private sanitizer: DomSanitizer
  ) {
    const pdfPath = `images/Vill_15_1224_Registry.pdf`;    
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdfPath);
  }

  cancel () {
    this.modalRef.hide();
  }
}
