import { $ } from "@builder.io/qwik";
import { routeLoader$, server$ } from "@builder.io/qwik-city";
import { formAction$, InitialValues, valiForm$ } from "@modular-forms/qwik";
import * as v from 'valibot';

export const LoginFormSchema = v.object({
    username: v.string(),
    password: v.string(),
});

export type LoginForm = {
    username: string;
    password: string;
}

export const useLoginFormLoader = routeLoader$<InitialValues<LoginForm>>(() => {
	return {
		username: '',
		password: '',
	};
});

const cookieStore = server$(function () {
	this.cookie.set('isLoggedIn', 'true', {
		path: '/',
		maxAge: 31536000,
	});
});


export const useLoginFormAction = formAction$<LoginForm>(
    async (values) => {
			cookieStore();
    },
{
    validate: $(async (values: Partial<LoginForm>) => {
        return valiForm$(LoginFormSchema)(values);
    }),
});