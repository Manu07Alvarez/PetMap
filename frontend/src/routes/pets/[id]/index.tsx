import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { Status } from "~/components/form/PetsFormLoader";

// Tipo para los datos de la mascota
export type PetDetail = {
  id: string;
  file: string; // URL de la imagen
  status: Status;
  type: 'dog' | 'cat' | 'other';
  date: string;
  name?: string;
  email: string;
  phone: string;
  description: string;
  tags?: string[];
  location: string[];
  createdAt?: string;
};

// Loader para obtener los datos de la mascota
// En producción, esto debería hacer una llamada al backend
export const usePetDetailLoader = routeLoader$<PetDetail>(({ params }) => {
  const petId = params.id;
  
  // Datos de ejemplo - en producción esto vendría del backend
  // Aquí deberías hacer una llamada a tu API: GET /api/pets/${petId}
  return {
    id: petId,
    file: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800&h=600&fit=crop",
    status: "0" as Status, // 0 = Lost, 1 = Found
    type: "dog",
    date: "2025-11-25",
    name: "Max",
    email: "contacto@ejemplo.com",
    phone: "+54 9 11 1234-5678",
    description: "Perro Golden Retriever de tamaño grande, muy amigable. Se perdió en el parque el día 25 de noviembre. Tiene un collar azul con una placa que dice 'Max'. Es muy importante para nuestra familia, por favor si lo ven contactarnos.",
    tags: ["Golden Retriever", "Grande", "Amigable", "Collar Azul"],
    location: ["-34.603722", "-58.381592"], // Coordenadas de ejemplo (Buenos Aires)
    createdAt: "2025-11-25T10:30:00Z"
  };
});

export default component$(() => {
  const pet = usePetDetailLoader();

  const getStatusBadge = () => {
    if (pet.value.status === "0") {
      return { text: "Perdido", class: "badge-warning", icon: "🔍" };
    }
    return { text: "Encontrado", class: "badge-success", icon: "✓" };
  };

  const getTypeLabel = () => {
    const types = {
      dog: "Perro",
      cat: "Gato",
      other: "Otro"
    };
    return types[pet.value.type] || "Desconocido";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const statusBadge = getStatusBadge();

  return (
    <div class="min-h-screen bg-base-100 p-6">
      <div class="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div class="text-sm breadcrumbs mb-6">
          <ul>
            <li>
              <a href="/" class="text-base-content/70 hover:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Inicio
              </a>
            </li>
            <li>
              <a href="/mascotas/buscar" class="text-base-content/70 hover:text-primary">
                Buscar Mascotas
              </a>
            </li>
            <li class="text-base-content font-medium">
              Detalle de Mascota
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Image and Status */}
          <div class="lg:col-span-2 space-y-6">
            {/* Image Card */}
            <div class="card bg-base-200 shadow-xl overflow-hidden">
              <figure class="relative">
                <img 
                  src={pet.value.file} 
                  alt={pet.value.name || "Mascota"}
                  width="800"
                  height="600"
                  class="w-full h-96 object-cover"
                />
                <div class={`absolute top-4 right-4 badge ${statusBadge.class} badge-lg gap-2 font-semibold`}>
                  <span>{statusBadge.icon}</span>
                  {statusBadge.text}
                </div>
              </figure>
            </div>

            {/* Description Card */}
            <div class="card bg-base-200 shadow-xl">
              <div class="card-body">
                <h2 class="card-title text-2xl text-base-content flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                  Descripción
                </h2>
                <p class="text-base-content/80 leading-relaxed whitespace-pre-wrap">
                  {pet.value.description}
                </p>
              </div>
            </div>

            {/* Tags */}
            {pet.value.tags && pet.value.tags.length > 0 && (
              <div class="card bg-base-200 shadow-xl">
                <div class="card-body">
                  <h2 class="card-title text-xl text-base-content flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    Características
                  </h2>
                  <div class="flex flex-wrap gap-2 mt-2">
                    {pet.value.tags.map((tag, index) => (
                      <div key={index} class="badge badge-primary badge-lg">
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Map Placeholder */}
            <div class="card bg-base-200 shadow-xl">
              <div class="card-body">
                <h2 class="card-title text-xl text-base-content flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Ubicación
                </h2>
                <div class="bg-base-300 rounded-lg h-64 flex items-center justify-center">
                  <div class="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-base-content/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <p class="text-base-content/60">
                      Coordenadas: {pet.value.location[0]}, {pet.value.location[1]}
                    </p>
                    <p class="text-sm text-base-content/40 mt-2">
                      El mapa se mostrará aquí en la versión completa
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div class="space-y-6">
            {/* Basic Info Card */}
            <div class="card bg-base-200 shadow-xl">
              <div class="card-body">
                <h2 class="card-title text-2xl text-base-content mb-4">
                  {pet.value.name || "Sin nombre"}
                </h2>
                
                <div class="space-y-4">
                  {/* Type */}
                  <div class="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <div>
                      <p class="text-sm text-base-content/60">Tipo de Mascota</p>
                      <p class="text-base-content font-medium">{getTypeLabel()}</p>
                    </div>
                  </div>

                  {/* Date */}
                  <div class="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p class="text-sm text-base-content/60">
                        Fecha {pet.value.status === "0" ? "de Pérdida" : "de Encuentro"}
                      </p>
                      <p class="text-base-content font-medium">{formatDate(pet.value.date)}</p>
                    </div>
                  </div>

                  {/* Created At */}
                  {pet.value.createdAt && (
                    <div class="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p class="text-sm text-base-content/60">Publicado</p>
                        <p class="text-base-content font-medium">{formatDate(pet.value.createdAt)}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div class="card bg-gradient-to-br from-primary/10 to-secondary/10 shadow-xl border border-primary/20">
              <div class="card-body">
                <h2 class="card-title text-xl text-base-content mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Información de Contacto
                </h2>
                
                <div class="space-y-4">
                  {/* Email */}
                  <div class="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm text-base-content/60 mb-1">Email</p>
                      <a 
                        href={`mailto:${pet.value.email}`}
                        class="text-primary hover:text-primary-focus font-medium break-all"
                      >
                        {pet.value.email}
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div class="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm text-base-content/60 mb-1">Teléfono</p>
                      <a 
                        href={`tel:${pet.value.phone}`}
                        class="text-primary hover:text-primary-focus font-medium"
                      >
                        {pet.value.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <div class="divider"></div>

                {/* Contact Buttons */}
                <div class="space-y-2">
                  <a 
                    href={`mailto:${pet.value.email}`}
                    class="btn btn-primary w-full"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Enviar Email
                  </a>
                  <a 
                    href={`tel:${pet.value.phone}`}
                    class="btn btn-secondary w-full"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Llamar
                  </a>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div class="card bg-base-200 shadow-xl">
              <div class="card-body">
                <h3 class="font-semibold text-base-content mb-3">Acciones</h3>
                <div class="space-y-2">
                  <button class="btn btn-outline btn-info w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Compartir
                  </button>
                  <button class="btn btn-outline btn-error w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Reportar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
