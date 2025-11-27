import { component$ } from "@builder.io/qwik";
import Form from "~/components/form/Form";
export { useFormLoader } from "~/components/form/PetsFormLoader";

export default component$(() => {
  return (
    <main class="min-h-screen bg-base-200 py-8 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-extrabold text-base-content sm:text-4xl">
            Reportar Mascota
          </h1>
          <p class="mt-2 text-lg text-base-content/70">
            Ayúdanos a conectar mascotas perdidas con sus dueños.
          </p>
        </div>

        <div class="max-w-4xl mx-auto relative">
          <Form />
        </div>
      </div>
    </main>
  );
});

