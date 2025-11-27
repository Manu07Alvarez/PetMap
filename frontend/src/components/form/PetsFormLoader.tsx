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
import { NoSerialize, $ } from '@builder.io/qwik';
import got from 'got';
import { isValidPhoneNumber } from 'libphonenumber-js';

export enum Status {
  Lost = '0',
  Found = '1',
}

export const FormSchema = v.object({
  file: v.pipe(
      v.custom<File>((file) => file instanceof File, ("La imagen es obligatoria")),
      v.mimeType(['image/jpeg', 'image/png', 'image/webp'], 'Elegir solo jpeg, png o webp'),       
    ),
  status: v.enum(Status, 'El estado es obligatorio '),
  type: v.picklist(['dog', 'cat', 'other'], 'El tipo de mascota es obligatorio'),
  date: v.pipe(
    v.string(),
    v.nonEmpty('La fecha es obligatoria'),
  ),
  name: v.optional(
    v.pipe(
      v.string(),
    ),
  ),
  email: v.pipe(
    v.string(),
    v.email('El email no es válido'),
    v.nonEmpty('El email es obligatorio'),
  ),
  phone: v.pipe(
    v.string(),
    v.custom<string>((phone) => 
      isValidPhoneNumber(phone as string), 'El numero de telefono no es válido'),
    v.nonEmpty('El numero de telefono es obligatorio'),
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
  status: Status;
  type: 'dog' | 'cat' | 'other';
  date: string;
  name?: string;
  email: string;
  phone: string;
  description: string;
  tags?: string[];
  location: string[];
}

export const useFormLoader = routeLoader$<InitialValues<PetsForm>>(() => {
  return {
    status: Status.Lost,
    type: 'dog',
    date: new Date().toISOString().split('T')[0],
    name: '',
    file: undefined,
    description: '',
    location: [],
    email: '',
    phone: '',
    tags: [],
  };
});
const sendFormValues = server$(async function(values) {
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
    validate: $(async (values: Partial<PetsForm>) => {
      console.log('Values before validation:', values);
      return valiForm$(FormSchema)(values);
    }),
    files: ['file'],
    arrays: ['location']
  }
);