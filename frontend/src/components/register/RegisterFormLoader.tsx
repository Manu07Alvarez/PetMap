import { $ } from "@builder.io/qwik";
import { routeLoader$, server$ } from "@builder.io/qwik-city";
import { formAction$, InitialValues, valiForm$ } from "@modular-forms/qwik";
import got from "got";
import * as v from 'valibot';

export const RegisterFormSchema = v.object({
    firstName: v.pipe(v.string(), v.minLength(3, 'El nombre debe tener al menos 3 caracteres')),
    lastName: v.pipe(v.string(), v.minLength(3, 'El apellido debe tener al menos 3 caracteres')),
    email: v.pipe(v.string(), v.email('Ingresa un email válido')),
    password: v.pipe(v.string(), v.minLength(6, 'La contraseña debe tener al menos 6 caracteres')),
});

export type RegisterForm = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

// eslint-disable-next-line qwik/loader-location
export const useRegisterFormLoader = routeLoader$<InitialValues<RegisterForm>>(() => {
    return {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    };
});


const register = server$(async function (values: RegisterForm) {
    return await got.post(`${this.env.get('BACKEND_API')}/api/auth/register`, {
        json: {
            name: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
        },
    }).json();
});

export const useRegisterFormAction = formAction$<RegisterForm>(
	async (values) => {
		try {
			await register(values);
		} catch (error) {
			console.error('Error al registrar:', error);
		}
	},
	{
		validate: $(async (values: Partial<RegisterForm>) => {
			console.log('Values before validation:', values);
			return valiForm$(RegisterFormSchema)(values);
		}),
	}
);
