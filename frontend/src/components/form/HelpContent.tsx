import { component$, useSignal } from "@builder.io/qwik";
export { useFormLoader } from "~/components/PetsFormLoader";

export default component$((props: { class?: string }) => {
  const dialogRef = useSignal<HTMLDialogElement>();

  return (
    <>
      <button
        class={props.class || "btn btn-circle btn-ghost"}
        onClick$={() => dialogRef.value?.showModal()}
        title="Ayuda para completar el formulario"
        type="button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      </button>

      <dialog ref={dialogRef} class="modal" id="help-modal">
        <div class="modal-box">
          <button type="button" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick$={() => dialogRef.value?.close()}>✕</button>
          <h3 class="font-bold text-lg mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Guía Rápida
          </h3>
          <HelpList />
        </div>
      </dialog>
    </>
  );
});

const HelpList = component$(() => (
  <ul class="space-y-4 text-base-content/80 text-sm">
    <li class="flex gap-3">
      <span class="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold text-xs">1</span>
      <span><strong>Imagen:</strong> Una foto clara ayuda mucho a identificar a la mascota.</span>
    </li>
    <li class="flex gap-3">
      <span class="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold text-xs">2</span>
      <span><strong>Nombre:</strong> Si lo conoces, inclúyelo. Si no, déjalo en blanco.</span>
    </li>
    <li class="flex gap-3">
      <span class="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold text-xs">3</span>
      <span><strong>Ubicación:</strong> Marca en el mapa dónde fue vista por última vez.</span>
    </li>
    <li class="flex gap-3">
      <span class="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold text-xs">4</span>
      <span><strong>Fecha:</strong> Fecha en la que encontraste a la mascota.</span>
    </li>
    <li class="flex gap-3">
      <span class="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold text-xs">4</span>
      <span><strong>Contacto:</strong> Deja un número o email para que te contacten.</span>
    </li>
    <li class="flex gap-3">
      <span class="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold text-xs">5</span>
      <span><strong>Descripción:</strong> Detalles como raza, color, tamaño o collar son clave.</span>
    </li>
  </ul>
));