
using PetMap.Models;
using PetMap.Dtos;
using PetMap.Repositories;
using PetMap.Mappings;

namespace PetMap.Services.Utils
{
    public class PetPaginationService()
    {

        public static PetPagedResponse GetPagedData(List<PetPost> pets, int pages, int PageSize)
        { 
            // There's a next page if:
            // 1. We got an extra record
            // 2. We're navigating to the previous page
            bool hasNextPage = pets.Count > PageSize;
            // Remove the extra record used for next page detection
            if (pets.Count > PageSize)
            {
                pets.RemoveAt(pets.Count - 1);
            }
    
            int? nextId = hasNextPage
                ? pets[^1].Id
                : null;

            int? previousId = pets.Count > 0
                ? pets[0].Id
                : null;


            List<PetResponse> petResponse = pets.Select(p => p.MapToPetResponse()).ToList();

            return new PetPagedResponse(petResponse, nextId, previousId, pages);


        }
    }
}