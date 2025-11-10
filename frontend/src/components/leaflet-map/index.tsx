import {
  component$,
  noSerialize,
  useContext,
  useSignal,
  useStyles$,
  useVisibleTask$,
} from "@builder.io/qwik";

import L, { Map } from "leaflet";
import type { MapProps } from "~/models/map";
import { POINT_CTX } from "../form/MapInput";

export const LeafletMap = component$<MapProps>(({ location }: MapProps) => {
  // Modify with your preferences. By default take all screen
  useStyles$(`
    #map {
      width: 100%;
      height: 100%;
    }
  `);

  

  const mapContainer$ = useSignal<Map>();

  const map_point = useContext(POINT_CTX)

  useVisibleTask$(async({ track }) => {
    track(location);

    const { tileLayer, marker } = await import("leaflet");

    const { getBoundaryBox } = await import("../../helpers/boundary-box");

    if (mapContainer$.value) {
      mapContainer$.value.remove();
    }

    const { value: locationData } = location;

    const centerPosition: [number, number] = locationData.point as [
      number,
      number,
    ];

    const map = new Map("map").setView(
      centerPosition,
      locationData.zoom || 14,
    );

    tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // Assign select boundary box to use in OSM API if you want
    locationData.boundaryBox = getBoundaryBox(map);
    
    const layer_group =  L.layerGroup()

    mapContainer$.value = noSerialize(map);
    
    map.on("click", (e: any) => {
      const { lat, lng } = e.latlng;
      layer_group.clearLayers();
      map_point.value = [lat, lng];
      layer_group.addTo(map).addLayer(marker(map_point.value));
    });
   
  });
  return <div 
    id="map"
  ></div>;
});
