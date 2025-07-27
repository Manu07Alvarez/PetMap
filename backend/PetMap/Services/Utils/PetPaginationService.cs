
using PetMap.Models;
using PetMap.Dtos;
using Mapster;

namespace PetMap.Services.Utils
{
    public static class PetPaginationService
    {

        public static PetPagedResponse GetPagedData(List<PetPost> pets, int? Cursor, bool? IsNextPage, int PageSize, int minId)
        {

            var petsOnPage = pets.AsQueryable().ProjectToType<PetResponse>().ToList();

            
            // Reverse the list if it's a previous page             
            if (IsNextPage == false && Cursor is not null)
            {
                petsOnPage.Reverse();
            }

            bool isFirstPage = Cursor is null || (petsOnPage.Count > 0 && petsOnPage[0].Id == minId);

            // There's a next page if:
            // 1. We got an extra record
            // 2. We're navigating to the previous page
            bool hasNextPage = petsOnPage.Count > PageSize ||
                (Cursor is not null && IsNextPage == false);

            // Remove the extra record used for next page detection
            if (petsOnPage.Count > PageSize)
            {
                petsOnPage.RemoveAt(petsOnPage.Count - 1);
            }

            int? nextId = hasNextPage
                ? petsOnPage[^1].Id
                : null;

            int? previousId = petsOnPage.Count > 0 && !isFirstPage
                ? petsOnPage[0].Id
                : null;


            return new PetPagedResponse(petsOnPage, nextId, previousId, isFirstPage);


        }
    }
}