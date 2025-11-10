/* eslint-disable @typescript-eslint/no-unused-vars */
import * as v from 'valibot';
import { 
  routeLoader$, 
  server$,
} from '@builder.io/qwik-city';
import {
  type InitialValues,
  formAction$,
  valiForm$
} from '@modular-forms/qwik';
import { NoSerialize } from '@builder.io/qwik';
import got from 'got';

export const FormSchema = v.object({
  file: v.pipe(
      v.custom<File>((file) => file instanceof File, ("La imagen es obligatoria")),
      v.mimeType(['image/jpeg', 'image/png', 'image/webp'], 'Elegir solo jpeg, png o webp'),       
    ),

  name: v.optional(
    v.pipe(
      v.string(),
    ),
  ),
  contact: v.pipe(
    v.string(),
    v.nonEmpty('El contacto es obligatorio'),
  ),
  description: v.pipe(
    v.string(),
    v.nonEmpty('La descripción es obligatoria'),
  ),
  tags: v.optional(
    v.array(v.string())
  ),
  location: v.array(
    v.string()
  ),
});

export type PetsForm = {
  file: NoSerialize<File> | undefined; // manual override
  name?: string;
  contact: string;
  description: string;
  tags?: string[];
  location: string[];
}

export const useFormLoader = routeLoader$<InitialValues<PetsForm>>(() => {
  return {
    name: '',
    file: undefined,
    description: '',
    location: [],
    contact: '',
    tags: [],
  };
});
const  sendFormValues = server$(async function(values) {
    console.log(this.env.get('API_URL'));
    await got.post(`${this.env.get('API_URL')}/api/pets/AddPet`, {
      json: {
        values,
      },
    });
})

export const useFormAction = formAction$<PetsForm>(
  async (values) => {
    await sendFormValues(values);
  },
  {  
    validate: valiForm$(FormSchema),
    files: ['file'],
    arrays: ['location']
  }
);