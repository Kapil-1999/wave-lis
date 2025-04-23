import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapRoutingModule } from './map-routing.module';
import { ManageMapViewComponent } from './map-view/pages/manage-map-view/manage-map-view.component';
import { ManageCustomMapComponent } from './custom-map/pages/manage-custom-map/manage-custom-map.component';
import { ManagePlotKhasraComponent } from './plot-khasra-map/pages/manage-plot-khasra/manage-plot-khasra.component';
import { StatisticsMapComponent } from './map-view/component/statistics-map/statistics-map.component';
import { MapViewFilterComponent } from './map-view/component/map-view-filter/map-view-filter.component';
import { SharedModule } from "../../shared/shared.module";
import { CustomMapViewComponent } from './custom-map/component/custom-map-view/custom-map-view.component';
import { KhasraPlotMapComponent } from './plot-khasra-map/component/khasra-plot-map/khasra-plot-map.component';
import { VillageWiseDetailsComponent } from './plot-khasra-map/component/village-wise-details/village-wise-details.component';
import { ShowFileOfKhasraComponent } from './plot-khasra-map/component/show-file-of-khasra/show-file-of-khasra.component';


@NgModule({
  declarations: [
    ManageMapViewComponent,
    ManageCustomMapComponent,
    ManagePlotKhasraComponent,
    StatisticsMapComponent,
    MapViewFilterComponent,
    CustomMapViewComponent,
    KhasraPlotMapComponent,
    VillageWiseDetailsComponent,
    ShowFileOfKhasraComponent

  ],
  imports: [
    CommonModule,
    MapRoutingModule,
    SharedModule
]
})
export class MapModule { }
