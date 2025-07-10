import { component$ } from "@builder.io/qwik";
import Form from "~/components/form/Form";
import HelpContent from "~/components/form/HelpContent";
export { useFormLoader } from "~/components/PetsFormLoader";

export default component$(() => {
  return (
<main class="min-h-screen p-8 flex items-center justify-center">
  <div class="w-fit flex flex-wrap-reverse">
    <Form />
    <HelpContent />
  </div>
</main>
  );
});

