import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import * as v from 'valibot';
import axios from 'axios';
import { Input } from "../form/Input";
import { LoginForm, LoginFormSchema } from "./LoginFormLoader";

export default component$(() => {
	const nav = useNavigate();
	
	// Estado del formulario
	const formData = useStore<LoginForm>({
		email: '',
		password: '',
	});

	// Estado de errores
	const errors = useStore<Partial<Record<keyof LoginForm, string>>>({});
	
	// Estado de carga y error general
	const isSubmitting = useSignal(false);
	const generalError = useSignal<string>('');

	// Validar un campo individual
	const validateField = $((fieldName: keyof LoginForm, value: string) => {
		try {
			const fieldSchema = LoginFormSchema.entries[fieldName];
			v.parse(fieldSchema, value);
			errors[fieldName] = '';
		} catch (error: any) {
			if (error.issues && error.issues.length > 0) {
				errors[fieldName] = error.issues[0].message;
			}
		}
	});

	// Manejar cambios en los inputs
	const handleInput = $((fieldName: keyof LoginForm, event: Event) => {
		const target = event.target as HTMLInputElement;
		formData[fieldName] = target.value;
	});

	// Manejar blur para validación
	const handleBlur = $((fieldName: keyof LoginForm) => {
		validateField(fieldName, formData[fieldName]);
	});

	// Manejar el submit del formulario
	const handleSubmit = $(async (event: Event) => {
		event.preventDefault();
		
		// Limpiar errores previos
		generalError.value = '';
		errors.email = '';
		errors.password = '';

		// Validar el formulario completo en el cliente
		const result = v.safeParse(LoginFormSchema, formData);
		
		if (!result.success) {
			for (const issue of result.issues) {
				if (issue.path) {
					const fieldName = issue.path[0]?.key as keyof LoginForm;
					if (fieldName) {
						errors[fieldName] = issue.message;
					}
				}
			}
			return;
		}

		// Enviar al servidor desde el cliente
		isSubmitting.value = true;
		try {
			// Hacer la petición HTTP directamente desde el cliente
			// para que las cookies se establezcan en el navegador
			await axios.post(
				'https://localhost:5001/api/auth/login?useCookies=true', 
				formData,
				{
					withCredentials: true,
				}
			);
			// Login exitoso, redirigir
			
			await nav('user/');
		} catch (error: any) {
			console.error('Error al iniciar sesión:', error);
			
			// Manejar errores de validación del servidor
			if (error.response?.data?.errors) {
				const serverErrors = error.response.data.errors;
				if (Array.isArray(serverErrors)) {
					// Mapear errores del servidor a campos
					for (const err of serverErrors) {
						if (err.field && err.message) {
							const fieldName = err.field.toLowerCase() as keyof LoginForm;
							if (fieldName in errors) {
								errors[fieldName] = err.message;
							}
						}
					}
				}
			}
			
			// Mostrar error general
			generalError.value = error.response?.data?.message || 
				error.response?.data?.title ||
				'Error al iniciar sesión. Por favor, verifica tus credenciales.';
		} finally {
			isSubmitting.value = false;
		}
	});

	return (
		<div class="card w-full max-w-md bg-base-100 shadow-2xl">
			<div class="card-body">
				{/* Header */}
				<div class="text-center mb-6">
					<h2 class="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
						Bienvenido
					</h2>
					<p class="text-base-content/70 mt-2">Inicia sesión en tu cuenta</p>
				</div>

				<form onSubmit$={handleSubmit} preventdefault:submit>
					<div class="space-y-4">
						{/* Error general */}
						{generalError.value && (
							<div class="alert alert-error">
								<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<span>{generalError.value}</span>
							</div>
						)}

						<div class="form-control">
							<Input
								type="text"
								name="email"
								class="input input-bordered w-full focus:input-primary"
								placeholder="Ingresa tu email"
								label="Email"
								value={formData.email}
								error={errors.email || ''}
								required
								onInput$={(e) => handleInput('email', e)}
								onBlur$={() => handleBlur('email')}
							/>
						</div>
						<p>Prueba con usuario: test@test.com y contraseña: 123456</p>
						
						<div class="form-control">
							<Input
								type="password"
								name="password"
								class="input input-bordered w-full focus:input-primary"
								placeholder="Ingresa tu contraseña"
								label="Contraseña"
								value={formData.password}
								error={errors.password || ''}
								required
								onInput$={(e) => handleInput('password', e)}
								onBlur$={() => handleBlur('password')}
							/>
						</div>

						<div class="form-control mt-6">
							<button 
								type="submit" 
								class="btn btn-primary w-full text-lg font-semibold hover:scale-[1.02] transition-transform"
								disabled={isSubmitting.value}
							>
								{isSubmitting.value ? (
									<>
										<span class="loading loading-spinner"></span>
										Iniciando sesión...
									</>
								) : (
									'Iniciar Sesión'
								)}
							</button>
						</div>
					</div>
				</form>

				{/* Footer */}
				<div class="divider">O</div>
				<div class="text-center">
					<p class="text-sm text-base-content/70">
						¿No tienes una cuenta?{" "}
						<a href="/register" class="link link-primary font-semibold">
							Regístrate aquí
						</a>
					</p>
				</div>
			</div>
		</div>
	);
});