import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  // Datos de ejemplo - en producción estos vendrían del backend
  const userPosts = [
    {
      id: 1,
      type: "lost",
      petName: "Max",
      petType: "Perro",
      breed: "Golden Retriever",
      date: "2025-11-25",
      location: "Palermo, Buenos Aires",
      image: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400&h=400&fit=crop",
      status: "Activo"
    },
    {
      id: 2,
      type: "found",
      petName: "Desconocido",
      petType: "Gato",
      breed: "Siamés",
      date: "2025-11-20",
      location: "Recoleta, Buenos Aires",
      image: "https://images.unsplash.com/photo-1573865526739-10c1d3a1f0cc?w=400&h=400&fit=crop",
      status: "Reunido"
    }
  ];

  const recentPets = [
    {
      id: 3,
      type: "lost",
      petName: "Luna",
      petType: "Gato",
      breed: "Persa",
      date: "2025-11-26",
      location: "Belgrano, Buenos Aires",
      image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop"
    },
    {
      id: 4,
      type: "found",
      petName: "Desconocido",
      petType: "Perro",
      breed: "Mestizo",
      date: "2025-11-26",
      location: "Caballito, Buenos Aires",
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop"
    },
    {
      id: 5,
      type: "lost",
      petName: "Rocky",
      petType: "Perro",
      breed: "Bulldog",
      date: "2025-11-25",
      location: "Villa Crespo, Buenos Aires",
      image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=400&fit=crop"
    },
    {
      id: 6,
      type: "found",
      petName: "Desconocido",
      petType: "Gato",
      breed: "Común",
      date: "2025-11-24",
      location: "San Telmo, Buenos Aires",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop"
    }
  ];

  return (
    <div class="min-h-screen bg-base-100 p-6">
      <div class="max-w-7xl mx-auto">
        {/* Header */}
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-base-content mb-2">
            Bienvenido de vuelta
          </h1>
          <p class="text-base-content/70 text-lg">
            Aquí puedes ver tus publicaciones y las mascotas reportadas recientemente
          </p>
        </div>

        {/* Mis Posts */}
        <section class="mb-12">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-3xl font-bold text-base-content flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Mis Publicaciones
            </h2>
            <Link href="/user/post" class="btn btn-primary btn-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Nueva Publicación
            </Link>
          </div>

          {userPosts.length > 0 ? (
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userPosts.map((post) => (
                <div 
                  key={post.id}
                  class="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-content/10 overflow-hidden group"
                >
                  <div class="flex flex-col md:flex-row">
                    {/* Imagen */}
                    <div class="md:w-1/3 relative overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.petName}
                        class="w-full h-48 md:h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div class={`absolute top-3 left-3 badge ${post.type === 'lost' ? 'badge-warning' : 'badge-success'} gap-2 font-semibold`}>
                        {post.type === 'lost' ? '🔍 Perdido' : '✓ Encontrado'}
                      </div>
                    </div>

                    {/* Contenido */}
                    <div class="card-body md:w-2/3">
                      <h3 class="card-title text-2xl text-base-content">
                        {post.petName}
                        <div class={`badge badge-sm ${post.status === 'Activo' ? 'badge-info' : 'badge-success'}`}>
                          {post.status}
                        </div>
                      </h3>
                      
                      <div class="space-y-2 text-base-content/80">
                        <p class="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                          <span class="font-medium">{post.petType}</span> - {post.breed}
                        </p>
                        <p class="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {post.location}
                        </p>
                        <p class="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {new Date(post.date).toLocaleDateString('es-AR', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>

                      <div class="card-actions justify-end mt-4">
                        <button class="btn btn-sm btn-ghost text-base-content">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Editar
                        </button>
                        <Link href={`/pets/${post.id}`} class="btn btn-sm btn-primary">
                          Ver Detalles
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div class="text-center py-12 bg-base-200 rounded-xl border border-base-content/10">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-base-content/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p class="text-base-content/60 text-lg">No tienes publicaciones aún</p>
              <a href="/mascotas/subir" class="btn btn-primary mt-4">
                Crear tu primera publicación
              </a>
            </div>
          )}
        </section>

        {/* Animales Recientes */}
        <section>
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-3xl font-bold text-base-content flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Reportes Recientes
            </h2>
            <Link href="/pets/search" class="btn btn-accent btn-sm">
              Ver Todos
            </Link>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentPets.map((pet) => (
              <Link 
                key={pet.id}
                href={`/pets/${pet.id}`}
                class="card bg-base-200 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-base-content/10 overflow-hidden group cursor-pointer"
              >
                <figure class="relative overflow-hidden h-48">
                  <img 
                    src={pet.image} 
                    alt={pet.petName}
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div class={`absolute top-3 right-3 badge ${pet.type === 'lost' ? 'badge-warning' : 'badge-success'} gap-1 font-semibold`}>
                    {pet.type === 'lost' ? '🔍' : '✓'}
                  </div>
                </figure>
                
                <div class="card-body p-4">
                  <h3 class="card-title text-lg text-base-content">
                    {pet.petName}
                  </h3>
                  <p class="text-sm text-base-content/70">
                    {pet.petType} - {pet.breed}
                  </p>
                  <div class="flex items-center gap-1 text-xs text-base-content/60 mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span class="truncate">{pet.location}</span>
                  </div>
                  <div class="flex items-center gap-1 text-xs text-base-content/60">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(pet.date).toLocaleDateString('es-AR', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
});
