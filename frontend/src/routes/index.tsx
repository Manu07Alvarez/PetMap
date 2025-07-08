import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div>
        <section class="text-center mb-16">
        <h1 class="text-5xl font-bold text-[#111827] mb-6">Encuentra a tu mascota perdida</h1>
        <p class="text-xl text-secondary mb-8 max-w-2xl mx-auto">
          PetMap te ayuda a conectar con personas que han encontrado mascotas o que están buscando las suyas. Publica un reporte o busca en nuestra base de datos.
        </p>
          <div class="flex justify-center space-x-4">
            <a href="/busqueda">
              <button class="bg-white border-2 border-[#4F46E5] text-[#4F46E5] py-3 px-8 rounded-lg text-lg font-semibold hover:bg-[#4F46E5] hover:text-white transition-colors duration-200 flex items-center space-x-2">
                <span class="material-icons-outlined">search</span>
                <span>Buscar Mascotas</span>
              </button>
            </a>
          </div>
        </section>
        <section class="bg-white py-12 px-8 rounded-xl mb-16">
          <div class="max-w-4xl mx-auto text-center">
          <span class="material-icons-outlined text-10xl text-[#10B981] mb-4" style="font-size: 50px;">volunteer_activism</span>
          <h2 class="text-3xl font-bold text-[#111827] mb-4">Ayuda a una mascota a volver a casa</h2>
          <p class="text-lg text-secondary mb-8">
            Si encontraste una mascota o perdiste la tuya, puedes publicarla aquí para ayudar a que se reencuentren. Cada pequeño gesto cuenta.
          </p>
          <div class="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div class="flex-1 text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
          <span class="material-icons-outlined text-5xl text-[#10B981] mb-3" style="font-size: 43px;">add_location_alt</span>
          <h3 class="text-xl font-semibold text-[#111827] mb-2">Encontré una Mascota</h3> 
          <p class="text-secondary text-sm mb-4">Reporta una mascota que encontraste para ayudarla a regresar con su familia.</p>
          <button class="bg-[#10B981] text-white py-2 px-6 rounded-lg text-md font-semibold hover:bg-[#0F966C] transition-colors duration-200 flex items-center space-x-2 mx-auto">
          <span class="material-icons-outlined text-base">add_circle_outline</span>
          <span>Reportar Encontrada</span>
          </button>
          </div>
          <div class="flex-1 text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
          <span class="material-icons-outlined text-5xl text-[#F59E0B] mb-3" style="font-size: 43px;">pets</span>
          <h3 class="text-xl font-semibold text-[#111827] mb-2">Perdí mi Mascota</h3>
          <p class="text-secondary text-sm mb-4">Publica un reporte de tu mascota perdida para que la comunidad pueda ayudarte.</p>
          <button class="bg-[#F59E0B] text-white py-2 px-6 rounded-lg text-md font-semibold hover:bg-[#D97706] transition-colors duration-200 flex items-center space-x-2 mx-auto">
          <span class="material-icons-outlined text-base">error_outline</span>
          <span>Reportar Perdida</span>
          </button>
          </div>
          </div>
          </div>
        </section>
      <footer class="bg-[#111827] text-gray-300 py-12">
      <div class="container mx-auto px-6">
      <div class="grid md:grid-cols-3 gap-8 mb-8">
      <div>
        <h3 class="text-xl font-semibold text-white mb-3">PetMap</h3>
        <p class="text-sm text-gray-400 mb-3">Ayudando a reunir mascotas con sus familias.</p>
        <div class="flex space-x-3">
        <a class="text-gray-400 hover:text-[#F59E0B]" href="#"><span class="material-icons-outlined">facebook</span></a>
        <a class="text-gray-400 hover:text-[#F59E0B]" href="#"><svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg></a>
        <a class="text-gray-400 hover:text-[#F59E0B]" href="#"><span class="material-icons-outlined">photo_camera</span></a>
        </div>
        </div>
        <div>
        <h3 class="text-lg font-semibold text-white mb-3">Enlaces Rápidos</h3>
        <ul class="space-y-2">
        <li><a class="text-sm text-gray-400 hover:text-[#F59E0B]" href="#">Reportar Perdido</a></li>
        <li><a class="text-sm text-gray-400 hover:text-[#F59E0B]" href="#">Mascotas Encontradas</a></li>
        <li><a class="text-sm text-gray-400 hover:text-[#F59E0B]" href="#">Consejos de Seguridad</a></li>
        <li><a class="text-sm text-gray-400 hover:text-[#F59E0B]" href="#">Preguntas Frecuentes</a></li>
        </ul>
        </div>
        <div>
        <h3 class="text-lg font-semibold text-white mb-3">Contacto</h3>
        <p class="text-sm text-gray-400 mb-1"><span class="material-icons-outlined text-sm align-middle mr-1 text-[#10B981]">email</span> info@petmap.com</p>
        <p class="text-sm text-gray-400"><span class="material-icons-outlined text-sm align-middle mr-1 text-[#10B981]">phone</span> +52 55 1234 5678</p>
      </div>
      </div>
      <div class="border-t border-gray-700 pt-8 text-center">
        <p class="text-sm text-gray-500">© 2024 PetMap. Todos los derechos reservados.</p>
      </div>
      </div>
      </footer>
    </div>
  );
});
