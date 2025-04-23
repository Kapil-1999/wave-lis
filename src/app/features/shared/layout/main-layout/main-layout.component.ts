import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../../core/app.reducer';
import { selectShowLogin } from '../../../../core/app.selectors';

@Component({
  selector: 'app-main-layout',
  standalone: false,
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  showLogin$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.showLogin$ = this.store.select(selectShowLogin);
  }
}
