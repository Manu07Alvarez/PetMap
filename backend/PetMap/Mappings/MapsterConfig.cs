using Mapster;
using PetMap.Dtos;
using NetTopologySuite.Geometries;
using PetMap.Models;
using System.Reflection;
namespace PetMap.Mappings
{
    public static class MapsterConfig
    {
        public static void RegisterMapsterConfiguration(this IServiceCollection services)
        {

            TypeAdapterConfig<PetRequest, PetPost>
                .NewConfig()
                .Map(dest => dest.Location, src => new Point(src.Location.Adapt<Coordinate>()));
                
            TypeAdapterConfig.GlobalSettings.Default.MapToConstructor(true);
            TypeAdapterConfig.GlobalSettings.Scan(Assembly.GetExecutingAssembly());
        }
    }
}