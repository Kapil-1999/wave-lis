import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phase',
  standalone: false,
  templateUrl: './phase.component.html',
  styleUrl: './phase.component.scss'
})
export class PhaseComponent {
  @Input() categoriesData :any;
  @Input() masterData :any;
  @Input() cardData :any;

  constructor(
    private router : Router
  ) {};


  goToReports(item:any) {    
    if(item?.value == 'Village' || item?.value == 'Farmer') {
      let url = `user/overview/home/reports`;

      this.router.navigateByUrl(url, {state : {
        reportData : item
      }})
    }
    return    
  }
}
