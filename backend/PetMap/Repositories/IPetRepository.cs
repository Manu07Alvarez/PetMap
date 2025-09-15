
using NetTopologySuite.Geometries;
using PetMap.Dtos;
using PetMap.Models;
namespace PetMap.Repositories
{
    public interface IPetRepository
    {
        Task<PagedEntitiesResult<PetPost>> GetAllPetsPage(
            DateTime? Cursor,
            long? RowNumber,
            int PageSize,
            FilterRequest? Options
        );
       // Task<List<PetPost>> GetNearbyPetsPage(Point location, double radiusMeters);
        void Create(PetPost post);
        void Delete(PetPost post);
        void Update(PetPost post);
        Task Save();
    }
}