
import { component$, createContextId, Signal, useContextProvider, useSignal, useStore } from '@builder.io/qwik';
import {
  valiForm$,
  useForm,
} from '@modular-forms/qwik';
import {PetsForm, useFormLoader, FormSchema, useFormAction, Status} from './PetsFormLoader'
import { Input } from './Input';
import { TextInput } from './TextInput';
import { FileInput } from './FileInput';
import { MapInput } from './MapInput';
import HelpContent from "./HelpContent";
import { PhoneInput } from './PhoneInput';

export const POINT_CTX_FINAL = createContextId<{items: string[]}>("point"); 
export const PHONE_NUMBER_CTX = createContextId<Signal<string>>('phone_number');
export default component$(() => {
  const map_point = useStore<{items: string[]}>({items: []});
  const phone_number = useSignal<string>('');
  useContextProvider(POINT_CTX_FINAL, map_point);
  useContextProvider(PHONE_NUMBER_CTX, phone_number);
  const [, {Form, Field}] = useForm<PetsForm>({
    loader: useFormLoader(),
    action: useFormAction(),
    validate: valiForm$(FormSchema)
  });

  
  return (
      <div class="card bg-base-100 shadow-xl relative">
          <Form encType="multipart/form-data">
            <div class="card-body p-0">
              {/* Status Section - Hero Style */}
              <div class="p-6 border-b border-base-200 relative">
                <div class="absolute top-4 right-4">
                  <HelpContent class="btn btn-circle btn-ghost btn-sm text-base-content/70 hover:bg-base-200" />
                </div>
                <div class="form-control w-full max-w-md mx-auto">
                  <label class="flex items-center justify-center pb-4">
                    <span class="label-text font-bold text-lg">¿Cuál es la situación?</span>
                  </label>
                  <Field name="status" type="string">
                    {(field, props) => {
                      return (
                      <div class="flex justify-center gap-4">
                        <label class="cursor-pointer">
                          <input 
                            {...props} 
                            type="radio" 
                            name="status" 
                            value={Status.Lost}
                            class="peer sr-only radio" 
                            checked={field.value == Status.Lost}
                          />
                          <div class="px-6 py-3 rounded-full border-2 border-error text-error hover:bg-error/10 peer-checked:bg-error peer-checked:text-white transition-all font-bold flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                            </svg>
                            Perdida
                          </div>
                          {field.error && <span class="text-error text-sm">{field.error}</span>}
                        </label>
                        <label class="cursor-pointer">
                          <input 
                            {...props} 
                            type="radio" 
                            name="status" 
                            value={Status.Found}
                            class="peer sr-only radio"
                            checked={field.value == Status.Found}
                          />
                          <div class="px-6 py-3 rounded-full border-2 border-success text-success hover:bg-success/10 peer-checked:bg-success peer-checked:text-white transition-all font-bold flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                            Encontrada
                          </div>
                          {field.error && <span class="text-error text-sm">{field.error}</span>}
                        </label>
                      </div>
                    )}}
                  </Field>
                  {/* Error message for status if needed, though usually pre-selected */}
                </div>
              </div>

              <div class="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Left Column: Photo & Basic Info */}
                <div class="p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-base-200 space-y-6">
                  <h3 class="font-bold text-lg text-base-content/80 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                    </svg>
                    Foto y Detalles de la Mascota
                  </h3>

                  <div class="form-control">
                    <Field name="file" type="File">
                      {(field, props) => (
                        <FileInput
                          {...props}
                          name="file"
                          class="file-input w-full h-64 border-dashed border-2 border-base-300 bg-base-100 rounded-xl hover:bg-base-200 transition-colors"
                          error={field.error}
                          required
                        />
                      )}
                    </Field>
                  </div>

                  <div class="grid grid-cols-2 gap-4">
                    <div class="form-control">
                      <Field name="type">
                        {(field, props) => (
                          <div class="flex flex-col gap-2">
                            <label class="label py-0">
                              <span class="label-text font-medium">Tipo de Mascota</span>
                            </label>
                            <select 
                              {...props} 
                              class="select select-bordered w-full"
                              value={field.value}
                            >
                              <option value="dog">Perro</option>
                              <option value="cat">Gato</option>
                              <option value="other">Otro</option>
                            </select>
                            {field.error && <span class="text-error text-sm">{field.error}</span>}
                          </div>
                        )}
                      </Field>
                    </div>
                    <div class="form-control">
                      <Field name="date">
                        {(field, props) => (
                          <div class="flex flex-col gap-2">
                            <label class="label py-0">
                              <span class="label-text font-medium">Fecha</span>
                            </label>
                            <input 
                              {...props} 
                              type="date" 
                              class="input input-bordered w-full"
                              value={field.value}
                            />
                            {field.error && <span class="text-error text-sm">{field.error}</span>}
                          </div>
                        )}
                      </Field>
                    </div>
                  </div>

                  <div class="form-control">
                    <Field name="name">
                      {(field, props) => (
                        <Input
                          {...props}
                          name="name"
                          type="text"
                          label="Nombre (si se conoce)"
                          class="input input-bordered w-full"
                          value={field.value}
                          error={field.error}
                          placeholder="Ej: Bobby"
                        />
                      )}
                    </Field>
                  </div>

                  <div class="form-control">
                    <Field name="description">
                      {(field, props) => (
                        <TextInput
                          {...props}
                          name="description"
                          label="Descripción detallada"
                          class="textarea textarea-bordered h-32 w-full"
                          value={field.value}
                          error={field.error}
                          placeholder="Color, raza, collar, comportamiento..."
                          required
                        />
                      )}
                    </Field>
                  </div>
                </div>

                {/* Right Column: Location, Description & Contact */}
                <div class="p-6 lg:p-8 space-y-6">
                  <h3 class="font-bold text-lg text-base-content/80 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                    </svg>
                    Ubicación y Información de Contacto
                  </h3>
                  <div class="form-control">
                    <Field name="location" type="string[]">
                      {(field, props) => (
                        field.value = map_point.items,
                        <MapInput
                          {...props}
                          name="location"
                          class="w-full h-48 rounded-xl overflow-hidden border border-base-300 shadow-sm"
                          label="Ubicación del suceso"
                          error={field.error}
                          required
                        />
                      )}
                    </Field>
                  </div>

                  <div class="form-control">
                    <Field name="email">
                      {(field, props) => (
                        <Input
                          {...props}
                          name="email"
                          type="email"
                          label="Email"
                          class="input input-bordered w-full"
                          value={field.value}
                          error={field.error}
                          placeholder="ejemplo@correo.com"
                          required
                        />
                      )}
                    </Field>
                  </div>

                  <div class="form-control">
                    <Field name="phone" type='string' keepActive={true}>
                      {(field, props) => (
                        field.value = phone_number.value,
                        <PhoneInput
                          {...props}
                          name="phone"
                          label="Telefono"
                          class="input input-bordered w-full"
                          error={field.error}
                          placeholder="Teléfono"
                          required
                        />
                      )}
                    </Field>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div class="p-6 border-t border-base-200 flex justify-end gap-4">
                <button type="button" class="btn btn-ghost">Cancelar</button>
                <button
                  type="submit"
                  class="btn btn-primary px-8 rounded-full font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                >
                  Publicar Reporte
                </button>
              </div>
            </div>
          </Form>
      </div>
  );
});
