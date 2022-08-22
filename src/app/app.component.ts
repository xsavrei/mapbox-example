import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import * as mapboxgl from "mapbox-gl";
import { environment } from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-app';
  map?: mapboxgl.Map

  lngLat?: mapboxgl.LngLat;

  geoJson?: any;
  features?: any[];

  constructor(private httpClient: HttpClient) {

  }

  onMapInit(map?: mapboxgl.Map) {
    this.map = map;
    // if (map) {
    //   map.on('load', () => {
    //     if (this.geoJson) {
    //       // map.addSource('buildings3d', (this.geoJson as AnySourceData));
    //       map.addLayer({
    //         id: 'buildings3dlayer',
    //         type: 'fill-extrusion',
    //         source: 'bratislava3d',
    //         minzoom: 14,
    //         paint: {
    //           'fill-extrusion-color': 'hsl(144, 59%, 53%)',
    //           'fill-extrusion-base': [
    //             'to-number',
    //             ['get', 'building:min_level']
    //           ],
    //           'fill-extrusion-height': [
    //             '*',
    //             ['to-number', ['get', 'building:levels']],
    //             3
    //           ]
    //         }
    //       })
    //     }
    //   })
    // }
  }

  onClickEvent(event: mapboxgl.MapMouseEvent) {
    console.warn('lat:', event.lngLat.lat);
    console.warn('lng:', event.lngLat.lng);
    this.httpClient.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${event.lngLat.lng},${event.lngLat.lat}.json?access_token=${environment.mapbox.accessToken}`).subscribe(res => {
      console.log('ADDRESS:', res);
    });
    if (this.map) {
      this.features = this.map.queryRenderedFeatures(event.point, {
        layers: ['buildings3d']
      });
    }
    // this.map?.jumpTo({center: {
    //   lng: event.lngLat.lng,
    //     lat: event.lngLat.lat
    //   }})
  }

  onMoveEvent(event: any) {
    this.lngLat = event.lngLat;
    // if (this.map) {
    //   const features = this.map.queryRenderedFeatures(event.point);
    //   console.warn(features)
    //   const displayProperties = [
    //     'type',
    //     'properties',
    //     'id',
    //     'layer',
    //     'source'
    //   ];
    //   const displayFeatures = features.map((feat: MapboxGeoJSONFeature) => {
    //     const displayFeat = {};
    //     displayProperties.forEach((prop) => {
    //       displayFeat[prop] = feat[prop];
    //     });
    //     return displayFeat;
    //   });
    // }
  }
}
