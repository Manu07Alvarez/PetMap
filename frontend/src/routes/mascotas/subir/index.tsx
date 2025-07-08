import { component$ } from "@builder.io/qwik";
import Form from "~/components/Form";
export { useFormLoader } from "~/components/PetsFormLoader";

export default component$(() => {
  return (
		<main class="">		
			<Form />
		</main>
  );
});
