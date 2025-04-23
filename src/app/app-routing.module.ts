import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './features/shared/layout/main-layout/main-layout.component';
import { PageNotFoundComponent } from './features/shared/component/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/user/map/map-view', pathMatch: 'full' },
  {
    path: "user",
    component: MainLayoutComponent,
    loadChildren: () =>
      import("./features/user/user.module").then(
        (m) => m.UserModule
      ),
  },
  {
    path: '**', component : PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
