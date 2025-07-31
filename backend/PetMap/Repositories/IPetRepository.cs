
using NetTopologySuite.Geometries;
using PetMap.Models;
namespace PetMap.Repositories
{
    public interface IPetRepository
    {
        Task<PagedEntitiesResult<PetPost>> GetAllPetsPage(
            int? Cursor,
            int PageSize,
            Dictionary<string, string> Options
        );
       // Task<List<PetPost>> GetNearbyPetsPage(Point location, double radiusMeters);
        void Create(PetPost post);
        void Delete(PetPost post);
        void Update(PetPost post);
        Task Save();
    }
}