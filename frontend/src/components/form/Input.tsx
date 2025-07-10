import { type QRL } from '@builder.io/qwik';
import { component$ } from '@builder.io/qwik';
import clsx from 'clsx';
type InputProps = {
  name: string;
  type: 'text' | 'email' | 'tel' | 'password' | 'url' | 'date' | 'time' | 'datetime-local' | 'number' | 'search' | 'color' | 'checkbox' | 'radio' | 'file' | 'select';
  label?: string;
  class?: string;
  placeholder?: string;
  value: string | undefined;
  error: string;
  required?: boolean;
  ref: QRL<(element: HTMLInputElement) => void>;
  onInput$: (event: Event, element: HTMLInputElement) => void;
  onChange$: (event: Event, element: HTMLInputElement) => void;
  onBlur$: (event: Event, element: HTMLInputElement) => void;
};

export const Input = component$(
  ({ label, error, ...props }: InputProps) => {
    const { name, required } = props;
    return (
      <div>
        {label && (
          <label for={name}>
            <p class="text-[#121217] text-base font-medium leading-normal pb-2">{label} {!required && <span class="text-gray-500">(Opcional)</span>}</p>
            <input
              {...props}
              id={name}
              aria-invalid={!!error}
              aria-errormessage={`${name}-error`}
              class={clsx(
                'block w-full text-sm text-gray-900',
                props.class,
                error && 'border-red-500'
              )}
            />
            {error && <div id={`${name}-error`}>{error}</div>}
          </label>
        )}
      </div>
    );
  }
);