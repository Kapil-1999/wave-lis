import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import * as L from 'leaflet';
import 'leaflet-draw';
import { isPlatformBrowser } from '@angular/common';
import { KhasraService } from '../../service/khasra.service';

@Component({
  selector: 'app-khasra-on-map',
  standalone: false,
  templateUrl: './khasra-on-map.component.html',
  styleUrl: './khasra-on-map.component.scss'
})
export class KhasraOnMapComponent {
  map: L.Map | any;
  sourceMarker: L.Marker | null = null;
  destinationMarker: L.Marker | null = null;
  circle: L.Circle | null = null;
  polyline: L.Polyline | null = null;
  polygon: L.Polygon | null = null;
  drawControl!: any;
  drawnFeatures = new L.FeatureGroup();
  editData: any;
  khasraBoundryData: any;
  isLoading: boolean = false;
  layerGroups: { [key: string]: L.LayerGroup } = {};
  layerGroupKeys: string[] = [];

  constructor(
    private bsmodalService: BsModalService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private KhasraService: KhasraService
  ) { };


  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeMap();
      this.getKhasraBoundryData()
    }
  }

  async initializeMap(): Promise<void> {
    const leafletModule = await import('leaflet');
    const L = leafletModule.default;

    this.map = L.map('khasra_map', {
      center: [28.6139, 77.2088],
      zoom: 6,
      zoomControl: false
    });

    L.control.zoom({
      position: 'bottomright',
    }).addTo(this.map)

    const mapElement = document.getElementById('khasra_map');
    if (mapElement) {
      mapElement.style.zIndex = '100';
    }

    const osmLayer = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 21,
      }
    );

    const satelliteLayer = L.tileLayer(
      'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}',
      {
        attribution: 'Imagery © <a href="http://maps.google.com">Google</a>',
        maxZoom: 21,
      }
    );

    const googleLayer = L.tileLayer(
      'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
      {
        maxZoom: 21,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: '&copy; Google Maps',
      }
    ).addTo(this.map);

    const baseMaps = {
      'Google Map': googleLayer,
      OpenStreetMap: osmLayer,
      Satellite: satelliteLayer,
    };

    L.control.layers(baseMaps).addTo(this.map);
  }

  getKhasraBoundryData() {
  this.isLoading = true;
  const data = { villageId: 0, khasraNo: null };

  this.KhasraService.khasraBoundaryData(data).subscribe((res: any) => {
    this.isLoading = false;
    this.khasraBoundryData = res?.body?.data || [];
    const allLatLngs: L.LatLngExpression[] = [];

    this.layerGroups = {};

    this.khasraBoundryData.forEach((item: any) => {
      const coords = item.coordinates
        .split("],[").map((pair: string) => {
          const cleaned = pair.replace("[", "").replace("]", "");
          const [lng, lat] = cleaned.split(",").map(Number);
          return [lat, lng] as [number, number];
        });

      const polygon = L.polygon(coords, {
        color: item.color_code,
        weight: 2,
        fillColor: item.color_code,
        fillOpacity: 0.4,
      }).bindPopup(`<strong>Khasra No:</strong> ${item.khasra_no} , ${item?.layer}`);

      const layerName = item.layer || 'Unknown';
      if (!this.layerGroups[layerName]) {
        this.layerGroups[layerName] = L.layerGroup().addTo(this.map);
      }
      this.layerGroups[layerName].addLayer(polygon);
      allLatLngs.push(...coords);
    });

    // Update keys for template loop
    this.layerGroupKeys = Object.keys(this.layerGroups);

    if (allLatLngs.length > 0) {
      this.map.fitBounds(allLatLngs as L.LatLngBoundsExpression, {
        padding: [20, 20],
      });
    }
  });
}

  toggleLayer(layerName: string, event: any) {
    const checked = event.target.checked;
    const group = this.layerGroups[layerName];
    if (group) {
      if (checked) {
        group.addTo(this.map);
      } else {
        this.map.removeLayer(group);
      }
    }
  }



  close() {
    this.bsmodalService.hide();
  }
}
