
using PetMap.Models;
using PetMap.Dtos;
using PetMap.Repositories;
using PetMap.Mappings;
using System.Threading.Tasks;

namespace PetMap.Services.Utils
{
    public static class PetPaginationService
    {

        public static async Task<PetPagedResponse> GetPagedData(List<PetPost> pets, int pages, int PageSize, List<Stream>? pet_images = null)
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


            List<GetPetResponse> petResponse = [.. await Task.WhenAll(pets.Select((p, i) => p.MapToPetResponse(pet_images![i])))];

            return new PetPagedResponse(petResponse, nextId, previousId, pages);


        }
    }
}