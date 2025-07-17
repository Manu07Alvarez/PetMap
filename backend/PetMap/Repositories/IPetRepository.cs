
using NetTopologySuite.Geometries;
using PetMap.Models;
namespace PetMap.Repositories
{
    public interface IPetRepository
    {
        Task<PagedEntitiesResult<PetPost>> GetAllPetsPage(int? Cursor, bool? IsNextPage, int PageSize);
        Task<PetPost> GetPetPostPage(int postID);
        Task<List<PetPost>> GetNearbyPetsPage(Point location, double radiusMeters);
        void CreatePetPost(PetPost post);
        void DeletePetPost(int postID);
        void UpdatePetPost(PetPost post);
        void Save();
    }
}