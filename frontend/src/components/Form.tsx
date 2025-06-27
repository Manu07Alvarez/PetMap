import { component$, useSignal } from '@builder.io/qwik';

export const Form = component$(() => {
  const nombre = useSignal('');
  const email = useSignal('');

  return (
    <form preventdefault:submit onSubmit$={() => alert(`Hola ${nombre.value}`)}>
      <input
        type="text"
        placeholder="Nombre"
        bind:value={nombre}
      />
      <input
        type="email"
        placeholder="Email"
        bind:value={email}
      />
      <button type="submit">Enviar</button>
    </form>
  );
});