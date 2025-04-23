import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageVillageComponent } from './village-master/pages/manage-village/manage-village.component';
import { ManageAcquisitionComponent } from './acquisition-master/pages/manage-acquisition/manage-acquisition.component';
import { ManageFamerComponent } from './farmer-master/pages/manage-famer/manage-famer.component';
import { ManagePlotComponent } from './plot-master/pages/manage-plot/manage-plot.component';
import { KhasraPlotMapComponent } from '../map/plot-khasra-map/component/khasra-plot-map/khasra-plot-map.component';
import { ManageUserComponent } from './user-master/pages/manage-user/manage-user.component';
import { ManageKhataComponent } from './khata-master/pages/manage-khata/manage-khata.component';
import { ManageKhasraComponent } from './khasra-master/pages/manage-khasra/manage-khasra.component';
import { ManageDoucmentComponent } from './document-management/pages/manage-doucment/manage-doucment.component';
import { ManageSateliteComponent } from './satelite-master/pages/manage-satelite/manage-satelite.component';
import { ManageMenuComponent } from './menu-master/pages/manage-menu/manage-menu.component';

const routes: Routes = [
  {
    path : 'village-master', component : ManageVillageComponent
  },
  {
    path: 'acquisition-master', component: ManageAcquisitionComponent
  },
  {
    path: 'farmer-master', component: ManageFamerComponent
  },
  {
    path : "plot-master" , component : ManagePlotComponent
  },
  {
    path: 'khasra-master', component : ManageKhasraComponent
  },
  {
    path : 'user-master' , component : ManageUserComponent
  },
  {
    path:'khata-master', component : ManageKhataComponent
  },
  {
    path : 'document-management' , component : ManageDoucmentComponent
  }, 
  {
    path: 'satellite-master', component :ManageSateliteComponent
  },
  {
    path:'menu-master', component : ManageMenuComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
