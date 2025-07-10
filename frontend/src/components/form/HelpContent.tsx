import { component$ } from "@builder.io/qwik";
export { useFormLoader } from "~/components/PetsFormLoader";

export default component$(() => {
  return (
    <>
      {/* Explicación a la derecha (colapsable en mobile) */}
      <aside class="self-end   mt-11">
        {/* Mobile (colapsable) */}
        <div class="block md:hidden">
          <div class="collapse collapse-arrow bg-base-100 border border-base-300 rounded-box shadow-md">
            <input type="checkbox" />
            <div class="collapse-title font-medium">
              ¿Cómo completar el formulario?
            </div>
            <div class="collapse-content">
              <HelpContent />
            </div>
          </div>
        </div>

        {/* Desktop (siempre visible) */}
        <div class="hidden md:block bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg shadow-md">
          <h2 class="text-lg font-semibold mb-4">¿Cómo completar este formulario?</h2>
          <HelpContent />
        </div>
      </aside>
    </>
  );
});


const HelpContent = component$(() => (
  <ul class="list-disc list-inside space-y-2 text-gray-700 text-sm">
    <li><strong>Imagen:</strong> Agrega una foto clara si tenés una.</li>
    <li><strong>Nombre:</strong> Si la mascota tiene un nombre, incluilo.</li>
    <li><strong>Ubicación:</strong> Lugar donde fue vista o perdida.</li>
    <li><strong>Contacto:</strong> Número o red social donde puedan contactarte.</li>
    <li><strong>Descripción:</strong> Raza, color, tamaño, collar, etc.</li>
  </ul>
));