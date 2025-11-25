import { $, QRL, component$, noSerialize, useSignal, useTask$ } from '@builder.io/qwik';
import clsx from 'clsx';
type InputProps = {
  name: string;
  label?: string;
  class?: string;
  placeholder?: string;
  error: string;
  multiple?: boolean;
  required: boolean;
  ref: QRL<(element: HTMLInputElement) => void>;
  onInput$: (event: Event, element: HTMLInputElement) => void;
  onChange$: (event: Event, element: HTMLInputElement) => void;
  onBlur$: (event: Event, element: HTMLInputElement) => void;
};

export const FileInput = component$(({ error, ...props }: InputProps) => {
  const { name } = props;

  const previewUrl = useSignal<string>();
  
  useTask$(({ cleanup}) => {
    cleanup(() => {
      if (previewUrl.value) {
        URL.revokeObjectURL(previewUrl.value);
      }
    })
  })
  
  

  const handleFileChange = $((file: File | undefined) => {
    if (!file) return;
    // Preview
    if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
    previewUrl.value = URL.createObjectURL(file);
    file = noSerialize(file);
    console.log("DEBUG: file", file);
  });

  return (
    <div class="group flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border-light dark:border-border-dark rounded-lg cursor-pointer bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700/80 transition-colors relative">
      <input
        {...props}
        id={name}
        name={name}
        type="file"
        aria-invalid={!!error}
        aria-errormessage={`${name}-error`}
        onChange$={(e,el) => { 
          handleFileChange(el.files?.[0])
          }
        }
          
        class={clsx(
          'absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10',
          props.class,
          error && 'border-red-500'
        )}
      />
      {previewUrl.value ? (
        <div class="relative w-full h-full p-2">
          <img
            src={previewUrl.value}
            alt="Vista previa"
            width={400}
            height={300}
            class="w-full h-full object-contain rounded-lg"
          />
          <div class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
            <span class="text-white font-bold bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
              Cambiar imagen
            </span>
          </div>
        </div>
      ) : (
        <div class="flex flex-col items-center justify-center pt-5 pb-6 pointer-events-none">
          <span class="material-icons-outlined text-primary text-4xl mb-3">cloud_upload</span>
          <p class="mb-2 text-sm text-subtext-light dark:text-subtext-dark">
            <span class="font-semibold">Drag &amp; Drop or Click to Upload Images</span>
          </p>
        </div>
      )}

      {error && (
        <div id={`${name}-error`} class="text-red-600 text-sm mt-1 absolute bottom-2">
          {error}
        </div>
      )}
    </div>
  );
});