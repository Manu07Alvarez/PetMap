import * as v from 'valibot';

export const LoginFormSchema = v.object({
    email: v.pipe(v.string(), v.email('Ingresa un email válido')),
    password: v.pipe(v.string(), v.minLength(1, 'La contraseña es requerida')),
});

export type LoginForm = {
    email: string;
    password: string;
}