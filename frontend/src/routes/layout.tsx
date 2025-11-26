import { component$, Slot, useSignal, $ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import Image from '../../public/petmap.svg?jsx'
import type { DocumentHead } from "@builder.io/qwik-city";
import "../global.css";

export const useSidebarState = routeLoader$(({ cookie }) => {
  const sidebarCookie = cookie.get('sidebarOpen');
  return sidebarCookie ? sidebarCookie.value === 'true' : true;
});

export default component$(() => {
  const serverSidebarState = useSidebarState();
  const sidebarOpen = useSignal(serverSidebarState.value);
  
  const toggleSidebar = $(() => {
    sidebarOpen.value = !sidebarOpen.value;
    document.cookie = `sidebarOpen=${sidebarOpen.value}; path=/; max-age=31536000`;
  });

  return (
    <div class="font-inter min-h-screen flex">
      {/* Sidebar */}
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

      {/* Main Content */}
      <main class={`flex-1 transition-all duration-300 ${sidebarOpen.value ? 'lg:ml-0' : 'lg:ml-0'}`}>
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
