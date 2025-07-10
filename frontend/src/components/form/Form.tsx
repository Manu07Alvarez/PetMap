/* eslint-disable @typescript-eslint/no-unused-vars */
import { component$ } from '@builder.io/qwik';
import {
  valiForm$,
  useForm,
} from '@modular-forms/qwik';
import {PetsForm, useFormLoader, FormSchema, useFormAction} from '../PetsFormLoader'
import * as v from 'valibot';
import { Input } from './Input';
import { TextInput } from './TextInput';
import { FileInput } from './FileInput';

export default component$(() => {
  const [, {Form, Field}] = useForm<PetsForm>({
    loader: useFormLoader(),
    action: useFormAction(),
    validate: valiForm$(FormSchema)
    
  });

  return (
    <Form>
      <fieldset class="fieldset">
          <div class="flex flex-1 justify-center py-5">
            <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
              <div class="flex flex-wrap justify-between gap-3 p-4"><p class="text-[#121217] tracking-light text-[32px] font-bold leading-tight min-w-72">Informacion Mascota</p></div>
              <div class="p-4 @container">
                <div class="flex flex-col items-stretch justify-start rounded-xl @xl:flex-row @xl:items-start">
                  <div class="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-1 py-4 @xl:px-4">
                    <div class="flex items-end gap-3 justify-between">
                      <Field name="file" type='File'>
                        {(field, props) =>(
                          <FileInput
                            {...props}
                            name='image'
                            class='file-input'
                            label='Imagen'
                            value={field.value}
                            error={field.error}
                            required
                          />
                        )}
                      </Field>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label class="flex flex-col min-w-40 flex-1">
                  <Field name="name">
                    {(field, props) =>(
                      <Input
                        {...props}
                        name='name'
                        type='text'
                        label='Nombre'
                        class='flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121217] focus:outline-0 focus:ring-0 border border-[#dddde4] bg-white focus:border-[#dddde4] h-14 placeholder:text-[#676a83] p-[15px] text-base font-normal leading-normal'
                        value={field.value}
                        error={field.error}
                        placeholder="Ingresa el nombre de la mascota"
                      />
                    )}
                  </Field>
                </label>
              </div>
              <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label class="flex flex-col min-w-40 flex-1">
                  <Field name="location">
                    {(field, props) =>(
                      <Input
                        {...props}
                        name='location'
                        type='text'
                        class='flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121217] focus:outline-0 focus:ring-0 border border-[#dddde4] bg-white focus:border-[#dddde4] h-14 placeholder:text-[#676a83] p-[15px] text-base font-normal leading-normal'
                        label='Ubicación'
                        value={field.value}
                        error={field.error}
                        placeholder="Ingrese la ubicación donde se perdio/encontro la mascota"
                        required
                      />
                    )}
                  </Field>
                </label>
                <label class="flex flex-col min-w-40 flex-1">
                  <Field name="contact">
                    {(field, props) =>(
                      <Input
                        {...props}
                        name='contact'
                        type='text'
                        label='Contacto'
                        class='"flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121217] focus:outline-0 focus:ring-0 border border-[#dddde4] bg-white focus:border-[#dddde4] h-14 placeholder:text-[#676a83] p-[15px] text-base font-normal leading-normal"'
                        value={field.value}
                        error={field.error}
                        placeholder="Informacion de contacto"
                        required
                      />
                    )}
                  </Field>
                </label>
              </div>
              <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label class="flex flex-col min-w-40 flex-1">
                  <Field name="description">
                  {(field, props) =>(
                    <TextInput
                      {...props}
                      name='description'
                      label='Descripción'
                      value={field.value}
                      error={field.error}
                      placeholder="Describe a tu mascota"
                      required
                    />
                  )}
                  </Field>
                </label>
              </div>
              <div class="flex px-4 py-3">
                <button
                  class="btn btn-primary flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 text-[#121217] text-sm font-bold leading-normal tracking-[0.015em]"
                >
                  <span class="truncate">Submit</span>
                </button>
              </div>
            </div>
          </div>
      </fieldset>
    </Form>
  );
});
