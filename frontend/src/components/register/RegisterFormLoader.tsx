import { $ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { formAction$, InitialValues, valiForm$ } from "@modular-forms/qwik";
import * as v from 'valibot';

export const RegisterFormSchema = v.object({
    username: v.pipe(v.string(), v.minLength(3, 'El usuario debe tener al menos 3 caracteres')),
    email: v.pipe(v.string(), v.email('Ingresa un email válido')),
    password: v.pipe(v.string(), v.minLength(6, 'La contraseña debe tener al menos 6 caracteres')),
});

export type RegisterForm = {
    username: string;
    email: string;
    password: string;
}

// eslint-disable-next-line qwik/loader-location
export const useRegisterFormLoader = routeLoader$<InitialValues<RegisterForm>>(() => {
    return {
        username: '',
        email: '',
        password: '',
    };
});

export const useRegisterFormAction = formAction$<RegisterForm>(
    async (values) => {
    console.log('Register values:', values);
    // Aquí irá la lógica de registro
},
{
    validate: $(async (values: Partial<RegisterForm>) => {
        console.log('Values before validation:', values);
        return valiForm$(RegisterFormSchema)(values);
    }),
});
