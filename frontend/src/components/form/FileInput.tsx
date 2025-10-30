import { $, QRL, component$, noSerialize, useSignal, useTask$ } from '@builder.io/qwik';
import clsx from 'clsx';
type InputProps = {
  name: string;
  label?: string;
  class?: string;
  placeholder?: string;
  error: string;
  multiple?: boolean;
  required?: boolean;
  ref: QRL<(element: HTMLInputElement) => void>;
  onInput$: (event: Event, element: HTMLInputElement) => void;
  onChange$: (event: Event, element: HTMLInputElement) => void;
  onBlur$: (event: Event, element: HTMLInputElement) => void;
};

export const FileInput = component$(({ label, error, ...props }: InputProps) => {
  const { name, required } = props;

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
    <div class="mb-4">
      {label && (
        <label for={name} class="block text-[#121217] text-base font-medium leading-normal pb-2">
          {label} {!required && <span class="text-gray-500">(Opcional)</span>}
        </label>
      )}
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
          'block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100',
          props.class,
          error && 'border-red-500'
        )}
      />
      {error && (
        <div id={`${name}-error`} class="text-red-600 text-sm mt-1">
          {error}
        </div>
      )}

      {previewUrl.value && (
        <div class="mt-3">
          <img
            src={previewUrl.value}
            alt="Vista previa"
            width={"200"}
            height={"200"}
            class="max-w-full max-h-64 rounded border border-gray-200"
          />
        </div>
      )}
    </div>
  );
});