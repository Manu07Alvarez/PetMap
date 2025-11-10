import { $, createContextId, Signal, useContextProvider, useSignal, type QRL } from '@builder.io/qwik';
import { component$, useStyles$ } from '@builder.io/qwik';
import leafletStyles from "../../../node_modules/leaflet/dist/leaflet.css?inline";
import { LeafletMap } from '../leaflet-map';
import { LocationsProps } from '~/models/location';
type MapInputProps = {
  name: string;
  label?: string;
  placeholder?: string;
  class?: string;
  value: string[] | undefined;
  error: string;
  required?: boolean;
  ref: QRL<(element: HTMLTextAreaElement) => void>;
  onInput$: (event: Event, element: HTMLTextAreaElement) => void;
  onChange$: (event: Event, element: HTMLTextAreaElement) => void;
  onBlur$: (event: Event, element: HTMLTextAreaElement) => void;
};
export const POINT_CTX = createContextId<Signal<[number,number]>>("point"); 
export const MapInput = component$(
  ({ label, error, ...props }: MapInputProps) => {
    const currentLocation = useSignal<LocationsProps>({
    name: "Soraluze",
    point: [43.17478, -2.41172],
    /**
     * Define rectangle with: Southwest lat, South West Lng, North East lat,  North East lng points.
     * Very interesting when use to filter in OpenStreetMap API to take POIs
     * Example: https://qwik-osm-poc.netlify.app/
     */
    boundaryBox:
        "43.14658914559456,-2.4765586853027344,43.202923523094725,-2.3467826843261723",
    zoom: 9,
    marker: true,
    });
    // const open = useSignal(false)
    // const toggle = $(() =>
    //     open.value = !open.value
    // );
    useStyles$(leafletStyles);
    const { name, required } = props;
    const map_point = useSignal<[number, number]>([0, 0]);
    useContextProvider(POINT_CTX, map_point);
    return (
      <div>
        {label && (
        <label>
          <p class="text-[#121217] text-base font-medium leading-normal pb-2">{label} {!required && <span>(Opcional)</span>}</p>
            <button class="btn" type='button' onClick$={() =>
              document.getElementById('my_modal_1')!.showModal()
            }>
              Ubicacion
            </button>
            <dialog id="my_modal_1" class="modal">
              <div class="sin-reset modal-box h-1/2">
                <LeafletMap location={currentLocation}/>
                <div class="modal-action">
                  <button 
                    type='button' 
                    class="btn" 
                    onClick$={() => {
                    const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
                    modal?.close(); // cerrar modal manualmente
                  }}>
                    Guardar
                  <input 
                    type='hidden'
                    {...props}
                    value={JSON.stringify({x: map_point.value[0], y: map_point.value[1]})}
                  >
                  
                  </input>
                  </button>
                </div>
              </div>
            </dialog>
          {error && <div id={`${name}-error`}>{error}</div>}
        </label>
        )}
      </div>
    );
  }
);