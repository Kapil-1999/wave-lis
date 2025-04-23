import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageMapViewComponent } from './map-view/pages/manage-map-view/manage-map-view.component';
import { ManageCustomMapComponent } from './custom-map/pages/manage-custom-map/manage-custom-map.component';
import { ManagePlotKhasraComponent } from './plot-khasra-map/pages/manage-plot-khasra/manage-plot-khasra.component';
import { VillageWiseDetailsComponent } from './plot-khasra-map/component/village-wise-details/village-wise-details.component';

const routes: Routes = [
  {
    path: '', children: [
      {
        path: 'map-view', component: ManageMapViewComponent,
      },
      { path: 'custom-map', component: ManageCustomMapComponent },
      { path: 'khasra-map', component: ManagePlotKhasraComponent },
      {path : 'villagewise-detail/:khasraId/:villageId',component: VillageWiseDetailsComponent},
      {
        path: 'user/map/villagewise-detail/:khasraId/:villageId',
        redirectTo: 'user/map/villagewise-detail/:khasraId/:villageId',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule { }
