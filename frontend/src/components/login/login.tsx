import { component$} from "@builder.io/qwik";
import { useForm, valiForm$ } from "@modular-forms/qwik";
import { Input } from "../form/Input";
import { LoginForm, LoginFormSchema, useLoginFormAction, useLoginFormLoader } from "./LoginFormLoader";
export {useLoggedInState} from "~/routes";

export default component$(() => {
	const [, {Form, Field}] = useForm<LoginForm>({
		loader: useLoginFormLoader(),
		action: useLoginFormAction(),
		validate: valiForm$(LoginFormSchema)
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
						<p>Prueba con usuario: test@test.com y contraseña: 123456</p>
						
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
								Iniciar Sesión
							</button>
						</div>
					</div>
				</Form>

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