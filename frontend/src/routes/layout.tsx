import { component$, Slot } from "@builder.io/qwik";
import Image from '../../public/petmap.svg?jsx'
import type { DocumentHead } from "@builder.io/qwik-city";
import "../global.css";

export default component$(() => {
  return (
    <div class="font-inter bg-white text-base-content flex flex-col min-h-screen">
        <header class="bg-white shadow-sm sticky top-0 z-50 px-10 py-3">
            <nav class="navbar">
                <div class="navbar-start gap-4">
                    <Image  class="object-contain scale-100 hover:scale-110 transition-transform duration-300" viewBox="0 0 550 700" />
                    <span class="text-lg font-bold">PetMap</span>
                </div>
                <div class="navbar-center hidden lg:flex gap-4">
                    <a href="/" class="btn btn-ghost text-sm font-medium">Inicio</a>
                    <a href="/mascotas/buscar" class="btn btn-ghost text-sm font-medium">Buscar</a>
                    <a class="btn btn-ghost text-sm font-medium">Tips</a>
                    <a class="btn btn-ghost text-sm font-medium">Contactos</a>
                </div>
                <div class="navbar-end gap-4">
                    <a href="/mascotas/subir">
                      <button class="btn btn-success rounded-full h-10 px-4 min-w-[84px] text-sm font-bold">
                      Post a Pet
                      </button>
                    </a>
                    <div
                    class="avatar placeholder size-10 rounded-full bg-cover bg-center"
                    style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBD2xBrixE4lL8TDhCyamHyhKumihXgyZZz1uMgjDJRH_obimoMA_zj5MD0thcYrySPaqwM7N6O5XHTmR9JuF8hk4taNRh3WPZfK1aLdFFsq3SQuZHS5IB-PRs3j46tLIQ7npxiHmeL-9rEIkh0v2Z-Ju0bNftbsMzRZmg4rlyT-Suka4hjqCR7J0X5ZlIP0T7X8fX-lU1A57kYsUS2fb0g5BjuYMQHENxIwbXmYWha_omklY-CkAzxRBZIO_Zp9eBSWrwW4K-980Ko");'
                    ></div>
                </div>
            </nav>
        </header>
        <Slot />
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
