import { component$, Slot, useSignal, $ } from "@builder.io/qwik";
import { routeLoader$, useLocation } from "@builder.io/qwik-city";
import Image from '../../public/petmap.svg?jsx'
import type { DocumentHead } from "@builder.io/qwik-city";
import "../global.css";

export const useSidebarState = routeLoader$(({ cookie }) => {
  const sidebarCookie = cookie.get('sidebarOpen');
  return sidebarCookie ? sidebarCookie.value === 'true' : true;
});


export const useLoggedInState = routeLoader$(({ cookie }) => {
  const isLoggedInCookie = cookie.get('isLoggedIn');
  return isLoggedInCookie ? isLoggedInCookie.value === 'true' : false;
});

export default component$(() => {
  const isLoggedIn = useLoggedInState();
  const location = useLocation();
  const serverSidebarState = useSidebarState();
  const sidebarOpen = useSignal(serverSidebarState.value);

  
  const toggleSidebar = $(() => {
    sidebarOpen.value = !sidebarOpen.value;
    document.cookie = `sidebarOpen=${sidebarOpen.value}; path=/; max-age=31536000`;
  });

  const isLoginPage = location.url.pathname === '/login/';
  const isRegisterPage = location.url.pathname === '/register/';
  const isAuthPage = isLoginPage || isRegisterPage;
  


  return (
    <div class={`font-inter min-h-screen ${isLoggedIn.value && !isAuthPage ? 'flex' : 'flex flex-col'}`}>
      {isAuthPage ? (
        // Logo flotante solo para las páginas de autenticación
        <a 
          href="/" 
          class="fixed top-6 left-6 z-50 flex items-center gap-3 bg-base-100 px-4 py-3 rounded-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-base-content/10"
          aria-label="Volver al inicio"
        >
          <Image class="w-12 h-12 object-contain" viewBox="0 0 550 700" />
          <span class="text-xl font-bold text-base-content">PetMap</span>
        </a>
      ) : isLoggedIn.value ? (
        // Sidebar para usuarios logueados
        <>
          <aside 
            class={`bg-base-200/95 backdrop-blur-md border-r border-base-content/10 transition-all duration-300 ease-in-out fixed lg:sticky top-0 h-screen z-50 flex flex-col ${
              sidebarOpen.value ? 'w-64' : 'w-20'
            }`}
          >
            {/* Sidebar Header */}
            <div class={`p-4 border-b border-base-content/10 flex items-center ${sidebarOpen.value ? 'gap-3' : 'justify-center'}`}>
              <Image class="w-15 h-15 object-contain hover:scale-110 transition-transform duration-300" viewBox="0 0 550 700" />
              <span class={`text-lg font-bold text-base-content whitespace-nowrap transition-opacity duration-300 ${sidebarOpen.value ? 'opacity-100' : 'opacity-0 w-0'}`}>PetMap</span>
            </div>

            {/* Navigation Links */}
            <nav class="flex-1 p-4 space-y-2">
              <a 
                href="/" 
                class={`flex items-center rounded-lg text-base-content hover:bg-base-content/10 transition-all duration-200 group ${
                  sidebarOpen.value ? 'gap-3 px-4 py-3' : 'flex-col gap-1 px-2 py-3'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span class={`font-medium whitespace-nowrap ${sidebarOpen.value ? '' : 'text-xs'}`}>
                  Inicio
                </span>
              </a>
              
              <a 
                href="/mascotas/buscar" 
                class={`flex items-center rounded-lg text-base-content hover:bg-base-content/10 transition-all duration-200 group ${
                  sidebarOpen.value ? 'gap-3 px-4 py-3' : 'flex-col gap-1 px-2 py-3'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span class={`font-medium whitespace-nowrap ${sidebarOpen.value ? '' : 'text-xs'}`}>
                  Buscar
                </span>
              </a>

              <a 
                href="/mascotas/subir" 
                class={`flex items-center rounded-lg text-base-content hover:bg-base-content/10 transition-all duration-200 group ${
                  sidebarOpen.value ? 'gap-3 px-4 py-3' : 'flex-col gap-1 px-2 py-3'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                <span class={`font-medium whitespace-nowrap ${sidebarOpen.value ? '' : 'text-xs'}`}>
                  Post a Pet
                </span>
              </a>
            </nav>

            {/* Bottom Actions */}
            <div class="p-4 border-t border-base-content/10 space-y-3">
              
              <div class={`flex items-center gap-3 ${sidebarOpen.value ? '' : 'justify-center'}`}>
                <div
                  class="avatar placeholder size-10 rounded-full bg-cover bg-center ring ring-primary ring-offset-base-100 ring-offset-2 flex-shrink-0"
                  style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBD2xBrixE4lL8TDhCyamHyhKumihXgyZZz1uMgjDJRH_obimoMA_zj5MD0thcYrySPaqwM7N6O5XHTmR9JuF8hk4taNRh3WPZfK1aLdFFsq3SQuZHS5IB-PRs3j46tLIQ7npxiHmeL-9rEIkh0v2Z-Ju0bNftbsMzRZmg4rlyT-Suka4hjqCR7J0X5ZlIP0T7X8fX-lU1A57kYsUS2fb0g5BjuYMQHENxIwbXmYWha_omklY-CkAzxRBZIO_Zp9eBSWrwW4K-980Ko");'
                ></div>
                {sidebarOpen.value && (
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-base-content truncate">Usuario</p>
                    <p class="text-xs text-base-content/60 truncate">Ver perfil</p>
                  </div>
                )}
              </div>

              <button 
                onClick$={$(() => {
                  // Limpiar cookies de sesión
                  document.cookie = 'isLoggedIn=false; path=/; max-age=0';
                  // Redirigir a login
                  window.location.href = '/login/';
                })}
                class="btn btn-error w-full btn-sm text-white hover:bg-error/80 transition-all duration-300"
                aria-label="Cerrar sesión"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                {sidebarOpen.value && <span class="text-xs">Cerrar Sesión</span>}
              </button>

              <button 
                onClick$={toggleSidebar}
                class="btn btn-ghost w-full btn-sm text-base-content hover:bg-base-content/10 transition-all duration-300"
                aria-label="Toggle sidebar"
              >
                {sidebarOpen.value ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    </svg>
                    <span class="text-xs">Colapsar</span>
                  </>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            </div>
          </aside>

          {/* Mobile Overlay */}
          {sidebarOpen.value && (
            <div 
              class="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick$={toggleSidebar}
            ></div>
          )}
        </>
      ) : (
        // Navbar horizontal para usuarios no logueados
        <nav class="bg-base-200/95 backdrop-blur-md border-b border-base-content/10 sticky top-0 z-50">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
              {/* Logo */}
              <a href="/" class="flex items-center gap-3 hover:scale-105 transition-transform duration-300">
                <Image class="w-10 h-10 object-contain" viewBox="0 0 550 700" />
                <span class="text-xl font-bold text-base-content">PetMap</span>
              </a>

              {/* Navigation Links */}
              <div class="hidden md:flex items-center gap-6">
                <a 
                  href="/" 
                  class="flex items-center gap-2 text-base-content hover:text-primary transition-colors duration-200 font-medium"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Inicio
                </a>
                
                <a 
                  href="/mascotas/buscar" 
                  class="flex items-center gap-2 text-base-content hover:text-primary transition-colors duration-200 font-medium"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Buscar
                </a>
              </div>

              {/* Auth Buttons */}
              <div class="flex items-center gap-3">
                <a 
                  href="/login" 
                  class="btn btn-ghost btn-sm text-base-content hover:bg-base-content/10"
                >
                  Iniciar Sesión
                </a>
                <a 
                  href="/register" 
                  class="btn btn-primary btn-sm"
                >
                  Registrarse
                </a>
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main class={`flex-1 ${isLoggedIn.value && !isAuthPage ? 'overflow-y-auto' : ''}`}>
        <Slot />
      </main>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
