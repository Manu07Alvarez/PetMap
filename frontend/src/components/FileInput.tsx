import { type QRL, type NoSerialize} from '@builder.io/qwik';
import { component$ } from '@builder.io/qwik';
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
  onChange$: (event: Event, element: HTMLInputElement) => void;
  onBlur$: (event: Event, element: HTMLInputElement) => void;
};

export const FileInput = component$(
  ({ label, error, ...props }: InputProps) => {
    const { name, required} = props;


    return (
      <div>
        {label && (
          <label 
            for={name}
          >
            <p class="text-[#121217] text-base font-medium leading-normal pb-2">{label} {!required && <span>(Opcional)</span>}</p>
            <input
                {...props}
                id={name}
                aria-invalid={!!error}
                type="file"
                aria-errormessage={`${name}-error`}
            />
            {error && <div id={`${name}-error`}>{error}</div>}
          </label>
        )}
      </div>
    );
  }
);