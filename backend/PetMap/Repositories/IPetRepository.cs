
using NetTopologySuite.Geometries;
using PetMap.Models;
namespace PetMap.Repositories
{
    public interface IPetRepository
    {
        Task<PagedEntitiesResult<PetPost>> GetAllPetsPage(int? Cursor, bool? IsNextPage, int PageSize);
       // Task<List<PetPost>> GetNearbyPetsPage(Point location, double radiusMeters);
        void Create(PetPost post);
        void Delete(PetPost post);
        void Update(PetPost post);
        Task Save();
    }
}