import { type QRL, type NoSerialize, component$, useSignal, $ } from '@builder.io/qwik';
import clsx from 'clsx';

type InputProps = {
  name: string;
  label?: string;
  class?: string;
  placeholder?: string;
  value: NoSerialize<File> | undefined;
  error: string;
  multiple?: boolean;
  required?: boolean;
  ref: QRL<(element: HTMLInputElement) => void>;
  onInput$: (event: Event, element: HTMLInputElement) => void;
  onChange$: QRL<(event: Event, element: HTMLInputElement) => void>;
  onBlur$: (event: Event, element: HTMLInputElement) => void;
};

export const FileInput = component$(({ label, onChange$, error, ...props }: InputProps) => {
  const { name, required } = props;

  const previewUrl = useSignal<string>();
  
  const handleFilePreview = $(( event: Event ) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file && file.type.startsWith('image/')) {
      if (previewUrl.value) {
        URL.revokeObjectURL(previewUrl.value);
      }
      previewUrl.value = URL.createObjectURL(file);
    }
  })

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
        type="file"
        aria-invalid={!!error}
        aria-errormessage={`${name}-error`}
        onChange$={(e, el) => {
          onChange$?.(e, el);
          handleFilePreview(e);
        }}
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