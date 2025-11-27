import { component$ } from "@builder.io/qwik";
import { useForm, valiForm$ } from "@modular-forms/qwik";
import { Input } from "../form/Input";
import { RegisterForm, RegisterFormSchema, useRegisterFormAction, useRegisterFormLoader } from "./RegisterFormLoader";


export default component$(() => {
	const [, {Form, Field}] = useForm<RegisterForm>({
		loader: useRegisterFormLoader(),
		action: useRegisterFormAction(),
		validate: valiForm$(RegisterFormSchema)
	});
	return (
		<div class="card w-full max-w-md bg-base-100 shadow-2xl">
			<div class="card-body">
				{/* Header */}
				<div class="text-center mb-6">
					<h2 class="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
						Crear Cuenta
					</h2>
					<p class="text-base-content/70 mt-2">Regístrate para comenzar</p>
				</div>

				<Form>
					<div class="space-y-4">
						<div class="form-control">
							<Field name="username">
								{(field, props) => (
									<Input
										{...props}
										type="text"
										name="username"
										class="input input-bordered w-full focus:input-primary"
										placeholder="Ingresa tu usuario"
										label="Usuario"
										value={field.value}
										error={field.error}
										required
									/>
								)}
							</Field>
						</div>

						<div class="form-control">
							<Field name="email">
								{(field, props) => (
									<Input
										{...props}
										type="email"
										name="email"
										class="input input-bordered w-full focus:input-primary"
										placeholder="tu@email.com"
										label="Email"
										value={field.value}
										error={field.error}
										required
									/>
								)}
							</Field>
						</div>
						
						<div class="form-control">
							<Field name="password">
								{(field, props) => (
									<Input
										{...props}
										type="password"
										name="password"
										class="input input-bordered w-full focus:input-primary"
										placeholder="Ingresa tu contraseña"
										label="Contraseña"
										value={field.value}
										error={field.error}
										required
									/>
								)}
							</Field>
						</div>

						<div class="form-control mt-6">
							<button 
								type="submit" 
								class="btn btn-primary w-full text-lg font-semibold hover:scale-[1.02] transition-transform"
							>
								Registrarse
							</button>
						</div>
					</div>
				</Form>

				{/* Footer */}
				<div class="divider">O</div>
				<div class="text-center">
					<p class="text-sm text-base-content/70">
						¿Ya tienes una cuenta?{" "}
						<a href="/login" class="link link-primary font-semibold">
							Inicia sesión aquí
						</a>
					</p>
				</div>
			</div>
		</div>
	);
});
