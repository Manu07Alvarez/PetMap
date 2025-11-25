import { type QRL, useContext, useSignal, useTask$ } from '@builder.io/qwik';
import { component$ } from '@builder.io/qwik';
import { AsYouType, getCountries, getCountryCallingCode } from 'libphonenumber-js'
import clsx from 'clsx';
import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import { PHONE_NUMBER_CTX } from './Form';
type PhoneInputProps = {
  name: string;
  label?: string;
  class?: string;
  placeholder?: string;
  error: string;
  required?: boolean;
  ref: QRL<(element: HTMLInputElement) => void>;
  onInput$: (event: Event, element: HTMLInputElement) => void;
  onChange$: (event: Event, element: HTMLInputElement) => void;
  onBlur$: (event: Event, element: HTMLInputElement) => void;
};


export const PhoneInput = component$(
  ({ label, error, ...props }: PhoneInputProps) => {
    const { name, required } = props;
    const selectedCountry = useSignal(getCountries().find(c => c === 'AR') || getCountries()[0]);
    const isOpen = useSignal(false);
    const searchQuery = useSignal('');
    const phone_number = useSignal<string>('');
    const phone_number_final = useContext(PHONE_NUMBER_CTX);
    useTask$(({ track }) => {
      track(() => phone_number.value);
      phone_number.value = new AsYouType(selectedCountry.value).input(phone_number.value!);
      phone_number_final.value = `+${getCountryCallingCode(selectedCountry.value)} ${phone_number.value}`;
    });

    const filteredCountries = getCountries().filter(country => {
      const search = searchQuery.value.toLowerCase();
      const code = getCountryCallingCode(country);
      return country.toLowerCase().includes(search) || 
        code.includes(search)
    });

    return (
      <div>
        {label && (
          <label for={name}>
            <p class="text-base-content text-base font-medium leading-normal pb-2">{label} {!required && <span class="text-base-content/60">(Opcional)</span>}</p>
            <div class="join flex flex-row w-full relative items-center">
                <div class={clsx("dropdown dropdown-bottom join-item", isOpen.value && "z-50")}>
                  <button 
                    type="button"
                    class="btn join-item input-bordered px-2 bg-base-100 hover:bg-blue-200 font-normal h-12 min-h-[3rem]"
                    onClick$={() => isOpen.value = !isOpen.value}
                  >
                    {`${getUnicodeFlagIcon(selectedCountry.value)} +${getCountryCallingCode(selectedCountry.value)}`}
                  </button>
                  {isOpen.value && (
                    <>
                    <div class="fixed inset-0 z-30" onClick$={() => isOpen.value = false}></div>
                    <div class="dropdown-content z-50 menu p-0 shadow bg-base-100 rounded-box w-80 flex flex-col flex-nowrap text-base-content overflow-hidden max-h-60">
                        <div class="p-2 sticky top-0 bg-base-100 z-10 border-b border-base-200">
                            <input
                                type="text"
                                class="input input-bordered w-full input-sm"
                                placeholder="Buscar país..."
                                autoFocus
                                value={searchQuery.value}
                                onInput$={(e) => searchQuery.value = (e.target as HTMLInputElement).value}
                                onClick$={(e) => e.stopPropagation()}
                            />
                        </div>
                        <div class="overflow-y-auto flex-1">
                            <ul class="menu menu-sm w-full p-2">
                                {filteredCountries.map((country) => (
                                    <li key={country}>
                                        <button 
                                            type="button"
                                            onClick$={() => {
                                                selectedCountry.value = country;
                                                isOpen.value = false;
                                                searchQuery.value = '';
                                            }}
                                            class={clsx(selectedCountry.value === country && 'active')}
                                        >
                                            <span class="text-lg">{getUnicodeFlagIcon(country)}</span>
                                            <span class="font-bold">{country}</span>
                                            <span class="opacity-70">+{getCountryCallingCode(country)}</span>
                                        </button>
                                    </li>
                                ))}
                                {filteredCountries.length === 0 && (
                                    <li class="disabled"><span>No se encontraron países</span></li>
                                )}
                            </ul>
                        </div>
                    </div>
                    </>
                  )}
                </div>
                <div class="indicator w-full join-item flex-1">
                    <span class="indicator-item badge badge-secondary hidden">Optional</span>
                    <input
                      {...props}
                      onInput$={(e) => phone_number.value = (e.target as HTMLInputElement).value}
                      value={phone_number.value}
											aria-invalid={!!error}
											aria-errormessage={`${name}-error`}
											class={clsx(
													'input input-bordered join-item w-full text-base-content placeholder:text-base-content/60 h-12',
													error && 'input-error'
											)}
											placeholder={`${props.placeholder}`}
											maxLength={16}
                    />
                </div>
            </div>
            {error && <div id={`${name}-error`} class="text-error text-sm mt-1">{error}</div>}
          </label>
        )}
      </div>
    );
  }
);