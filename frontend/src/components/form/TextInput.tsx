import { type QRL } from '@builder.io/qwik';
import { component$ } from '@builder.io/qwik';
type TextInputProps = {
  name: string;
  label?: string;
  placeholder?: string;
  value: string | undefined;
  error: string;
  required?: boolean;
  class?: string;
  ref: QRL<(element: HTMLTextAreaElement) => void>;
  onInput$: (event: Event, element: HTMLTextAreaElement) => void;
  onChange$: (event: Event, element: HTMLTextAreaElement) => void;
  onBlur$: (event: Event, element: HTMLTextAreaElement) => void;
};

export const TextInput = component$(
  ({ label, error, ...props }: TextInputProps) => {
    const { name, required } = props;
    return (
      <div>
        {label && (
          <label>
            <p class="text-base-content text-base font-medium leading-normal pb-2">{label} {!required && <span>(Opcional)</span>}</p> 
            <textarea
              class="textarea flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-base-content focus:outline-0 focus:ring-0 border border-base-300 bg-base-100 focus:border-base-300 min-h-36 placeholder:text-base-content/60 p-[15px] text-base font-normal leading-normal"
              {...props}
              id={name}
              aria-invalid={!!error}
              aria-errormessage={`${name}-error`}
            />
            {error && <div id={`${name}-error`}>{error}</div>}
          </label>
        )}
      </div>
    );
  }
);