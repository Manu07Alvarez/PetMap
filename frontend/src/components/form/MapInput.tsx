import { $, useSignal, type QRL } from '@builder.io/qwik';
import { component$, useStyles$ } from '@builder.io/qwik';
import leafletStyles from "../../../node_modules/leaflet/dist/leaflet.css?inline";
import { LeafletMap } from '../leaflet-map';
import { LocationsProps } from '~/models/location';
import { Modal, } from '@qwik-ui/headless';
type MapInputProps = {
  name: string;
  label?: string;
  placeholder?: string;
  class?: string;
  value: string | undefined;
  error: string;
  required?: boolean;
  ref: QRL<(element: HTMLTextAreaElement) => void>;
  onInput$: (event: Event, element: HTMLTextAreaElement) => void;
  onChange$: (event: Event, element: HTMLTextAreaElement) => void;
  onBlur$: (event: Event, element: HTMLTextAreaElement) => void;
};

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
    return (
          <div>
            {label && (
            <label>
              <p class="text-[#121217] text-base font-medium leading-normal pb-2">{label} {!required && <span>(Opcional)</span>}</p>
              <Modal.Root>
                <Modal.Trigger type='button'>Ubicacion</Modal.Trigger>
                <Modal.Panel class="w-full">
                  <LeafletMap location={currentLocation}/>
                  <footer>
                    <Modal.Close>
                      Guardar
                    </Modal.Close>
                  </footer>
                  </Modal.Panel>
              </Modal.Root>
              {error && <div id={`${name}-error`}>{error}</div>}
            </label>
            )}
          </div>
    );
  }
);