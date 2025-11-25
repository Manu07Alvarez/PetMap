import { toCustom$, TransformOptions } from '@modular-forms/qwik';
import { AsYouType } from 'libphonenumber-js';
export function toPhoneNumber(options: TransformOptions) {
    return toCustom$<string>((value) => {
        return new AsYouType().input(value!);
    }, options);
}