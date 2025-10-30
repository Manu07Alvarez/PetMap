import {
  $,
  component$,
  noSerialize,
  useSignal,
  useStyles$,
  useVisibleTask$,
} from "@builder.io/qwik";

import { Map, marker } from "leaflet";
import type { MapProps } from "~/models/map";

export const LeafletMap = component$<MapProps>(({ location }: MapProps) => {
  // Modify with your preferences. By default take all screen
  useStyles$(`
    #map {
      width: 100%;
      height: 100vh;
    }
  `);

  const mapContainer$ = useSignal<Map>();


  const point = useSignal<[number, number]>([0, 0]);

  useVisibleTask$(async ({ track }) => {
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

    const map: any = new Map("map").setView(
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

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    locationData.marker &&
      marker(centerPosition).bindPopup(`Soraluze (Gipuzkoa) :)`).addTo(map);

    mapContainer$.value = noSerialize(map);
    map.on("click", (e: any) => {
      const { lat, lng } = e.latlng;
      marker(point.value).removeFrom(map);
      point.value = [lat, lng];
      marker(point.value).addTo(map);
    });
   
  });
  return <div id="map"></div>;
});
