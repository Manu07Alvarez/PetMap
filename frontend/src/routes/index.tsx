import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import LoggedInHome from "../components/home/LoggedInHome";

export const useLoggedInState = routeLoader$(({ cookie }) => {
  const isLoggedInCookie = cookie.get('isLoggedIn');
  return isLoggedInCookie ? isLoggedInCookie.value === 'true' : false;
});

export default component$(() => {
  const isLoggedIn = useLoggedInState();

  // Si el usuario está logueado, mostrar el dashboard
  if (isLoggedIn.value) {
    return <LoggedInHome />;
  }

  // Si no está logueado, mostrar la landing page
  return (
    <div>
        <section class="text-center mb-16 pt-6">
        <h1 class="text-5xl font-bold text-base-content mb-6">Encuentra a tu mascota perdida</h1>
        <p class="text-xl text-base-content/70 mb-8 max-w-2xl mx-auto">
          PetMap te ayuda a conectar con personas que han encontrado mascotas o que están buscando las suyas. Publica un reporte o busca en nuestra base de datos.
        </p>
          <div class="flex justify-center space-x-4">
            <a href="mascotas/buscar">
              <button class="btn btn-primary btn-lg text-lg font-semibold flex items-center space-x-2">
                <span class="material-icons-outlined">search</span>
                <span>Buscar Mascotas</span>
              </button>
            </a>
          </div>
        </section>
        <section class="bg-base-200 py-12 px-8 rounded-xl mb-16 shadow-lg">
          <div class="max-w-4xl mx-auto text-center">
          <span class="material-icons-outlined text-10xl text-accent mb-4" style="font-size: 50px;">volunteer_activism</span>
          <h2 class="text-3xl font-bold text-base-content mb-4">Ayuda a una mascota a volver a casa</h2>
          <p class="text-lg text-base-content/70 mb-8">
            Si encontraste una mascota o perdiste la tuya, puedes publicarla aquí para ayudar a que se reencuentren. Cada pequeño gesto cuenta.
          </p>
          <div class="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div class="flex-1 text-center p-6 border border-base-300 bg-base-100 rounded-lg hover:shadow-xl transition-shadow">
          <span class="material-icons-outlined text-5xl text-success mb-3" style="font-size: 43px;">add_location_alt</span>
          <h3 class="text-xl font-semibold text-base-content mb-2">Encontré una Mascota</h3> 
          <p class="text-base-content/70 text-sm mb-4">Reporta una mascota que encontraste para ayudarla a regresar con su familia.</p>
          <Link href="login">
            <button class="btn btn-success text-sm text-black hover:text-white transition-colors btn-sm text-md font-semibold flex items-center space-x-2 mx-auto">
            <span class="material-icons-outlined text-base">add_circle_outline</span>
            <span>Reportar Encontrada</span>
            </button>
          </Link>
          </div>
          <div class="flex-1 text-center p-6 border border-base-300 bg-base-100 rounded-lg hover:shadow-xl transition-shadow">
          <span class="material-icons-outlined text-5xl text-warning mb-3" style="font-size: 43px;">pets</span>
          <h3 class="text-xl font-semibold text-base-content mb-2">Perdí mi Mascota</h3>
          <p class="text-base-content/70 text-sm mb-4">Publica un reporte de tu mascota perdida para que la comunidad pueda ayudarte.</p>
          <Link href="login">
            <button class="btn btn-warning text-sm text-black hover:text-white transition-colors btn-sm text-md font-semibold flex items-center space-x-2 mx-auto">
            <span class="material-icons-outlined text-base">error_outline</span>
            <span>Reportar Perdida</span>
            </button>
          </Link>
          </div>
          </div>
          </div>
        </section>
      <footer class="bg-neutral text-neutral-content py-12">
      <div class="container mx-auto px-6">
      <div class="grid md:grid-cols-3 gap-8 mb-8">
      <div>
        <h3 class="text-xl font-semibold text-neutral-content mb-3">PetMap</h3>
        <p class="text-sm text-neutral-content/70 mb-3">Ayudando a reunir mascotas con sus familias.</p>
        <div class="flex space-x-3">
        <a class="text-neutral-content/70 hover:text-primary" href="#"><span class="material-icons-outlined">facebook</span></a>
        <a class="text-neutral-content/70 hover:text-primary" href="#"><svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg></a>
        <a class="text-neutral-content/70 hover:text-primary" href="#"><span class="material-icons-outlined">photo_camera</span></a>
        </div>
        </div>
        <div>
        <h3 class="text-lg font-semibold text-neutral-content mb-3">Enlaces Rápidos</h3>
        <ul class="space-y-2">
        <li><a class="text-sm text-neutral-content hover:text-primary transition-colors" href="#">Reportar Perdido</a></li>
        <li><a class="text-sm text-neutral-content hover:text-primary transition-colors" href="#">Mascotas Encontradas</a></li>
        <li><a class="text-sm text-neutral-content hover:text-primary transition-colors" href="#">Consejos de Seguridad</a></li>
        <li><a class="text-sm text-neutral-content hover:text-primary transition-colors" href="#">Preguntas Frecuentes</a></li>
        </ul>
        </div>
        <div>
        <h3 class="text-lg font-semibold text-neutral-content mb-3">Contacto</h3>
        <p class="text-sm text-neutral-content/70 mb-1"><span class="material-icons-outlined text-sm align-middle mr-1 text-accent">email</span> info@petmap.com</p>
        <p class="text-sm text-neutral-content/70"><span class="material-icons-outlined text-sm align-middle mr-1 text-accent">phone</span> +52 55 1234 5678</p>
        </div>
      </div>
      <div class="border-t border-neutral-content/20 pt-8 text-center">
        <p class="text-sm text-neutral-content/50">© 2024 PetMap. Todos los derechos reservados.</p>
      </div>
      </div>
      </footer>
    </div>
  );
});
