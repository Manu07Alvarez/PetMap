/* eslint-disable @typescript-eslint/no-unused-vars */
import * as v from 'valibot';
import { routeLoader$ } from '@builder.io/qwik-city';
import {
  type InitialValues,
  formAction$,
  valiForm$
} from '@modular-forms/qwik';
import { NoSerialize } from '@builder.io/qwik';

const isFile = (input: unknown) => input instanceof File;

export const FormSchema = v.object({
  file: v.pipe(
      v.file("La imagen es obligatoria"),
      v.mimeType(['image/jpeg', 'image/png'], 'Elegir solo jpeg o png'),       
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
  location: v.string(),
});

export type PetsForm = {
  file: NoSerialize<File>; // manual override
  name?: string;
  contact: string;
  description: string;
  tags?: string[];
  location: string;
}

export const useFormLoader = routeLoader$<InitialValues<PetsForm>>(() => {
  return {
    name: '',
    file: undefined,
    description: '',
    location: '',
    contact: '',
    tags: [],
  };
});

export const useFormAction = formAction$<PetsForm>(
  (values) => {
    console.log("DEBUG: values", values);
  },
  {  
    validate: valiForm$(FormSchema),
    files: ['file'],
  }
);