using Mapster;
using PetMap.Dtos;
using PetMap.Models;
using PetMap.Repositories;
using System.Reflection;
namespace PetMap.Mappings
{
    public static class MapsterConfig
    {
        public static void RegisterMapsterConfiguration(this IServiceCollection services)
        {

            TypeAdapterConfig<PetRequest, PetPost>
                .NewConfig()
                .Map(dest => dest.Location, src => src.Location);

            TypeAdapterConfig.GlobalSettings.Default.MapToConstructor(true);
            TypeAdapterConfig.GlobalSettings.Scan(Assembly.GetExecutingAssembly());
        }
    }
}