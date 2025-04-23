import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { ManageVillageComponent } from './village-master/pages/manage-village/manage-village.component';
import { VillageListComponent } from './village-master/component/village-list/village-list.component';
import { SharedModule } from '../../shared/shared.module';
import { CreateVillageComponent } from './village-master/component/create-village/create-village.component';
import { ManageAcquisitionComponent } from './acquisition-master/pages/manage-acquisition/manage-acquisition.component';
import { AcquisitionListComponent } from './acquisition-master/component/acquisition-list/acquisition-list.component';
import { ManageFamerComponent } from './farmer-master/pages/manage-famer/manage-famer.component';
import { ManagePlotComponent } from './plot-master/pages/manage-plot/manage-plot.component';
import { ManageKhasraComponent } from './khasra-master/pages/manage-khasra/manage-khasra.component';
import { ManageUserComponent } from './user-master/pages/manage-user/manage-user.component';
import { ManageKhataComponent } from './khata-master/pages/manage-khata/manage-khata.component';
import { ManageDoucmentComponent } from './document-management/pages/manage-doucment/manage-doucment.component';
import { ManageSateliteComponent } from './satelite-master/pages/manage-satelite/manage-satelite.component';
import { CreateAcquisitionComponent } from './acquisition-master/component/create-acquisition/create-acquisition.component';
import { FarmerListComponent } from './farmer-master/component/farmer-list/farmer-list.component';
import { CreateFarmerComponent } from './farmer-master/component/create-farmer/create-farmer.component';
import { PlotListComponent } from './plot-master/component/plot-list/plot-list.component';
import { CreatePlotComponent } from './plot-master/component/create-plot/create-plot.component';
import { KhasraListComponent } from './khasra-master/component/khasra-list/khasra-list.component';
import { CreateKhasraComponent } from './khasra-master/component/create-khasra/create-khasra.component';
import { UploadSateliteImageComponent } from './satelite-master/component/upload-satelite-image/upload-satelite-image.component';
import { UploadDocumentComponent } from './document-management/component/upload-document/upload-document.component';
import { ManageMenuComponent } from './menu-master/pages/manage-menu/manage-menu.component';
import { MenuListComponent } from './menu-master/component/menu-list/menu-list.component';
import { CreateMenuComponent } from './menu-master/component/create-menu/create-menu.component';


@NgModule({
  declarations: [
    ManageVillageComponent,
    VillageListComponent,
    CreateVillageComponent,
    ManageAcquisitionComponent,
    AcquisitionListComponent,
    ManageFamerComponent,
    ManagePlotComponent,
    ManageKhasraComponent,
    ManageUserComponent,
    ManageKhataComponent,
    ManageDoucmentComponent,
    ManageSateliteComponent,
    CreateAcquisitionComponent,
    FarmerListComponent,
    CreateFarmerComponent,
    PlotListComponent,
    CreatePlotComponent,
    KhasraListComponent,
    CreateKhasraComponent,
    UploadSateliteImageComponent,
    UploadDocumentComponent,
    ManageMenuComponent,
    MenuListComponent,
    CreateMenuComponent,
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    SharedModule
  ]
})
export class MasterModule { }
