using Microsoft.EntityFrameworkCore;
using PetMap.Context;
using PetMap.Models;

namespace PetMap.Repositories.Utils
{
    public static class PaginationRepository
    {
        public async static Task<List<PetPost>> GetPagedData(IQueryable<PetPost> pets, int? Cursor, bool? IsNextPage, int PageSize)
        {


            int takeAmount = PageSize + 1;

            if (Cursor is not null)
            {
                if (IsNextPage == true)
                {
                    // Fetch the next page
                    pets = pets.Where(p => p.Id > Cursor);
                }
                else
                {
                    // Fetch the previous page
                    pets = pets.Where(p => p.Id < Cursor)
                                    .OrderByDescending(p => p.Id);

                    // No extra record needed in this case
                    takeAmount = PageSize;
                }
            }



            var result =  await pets.Take(takeAmount).ToListAsync();

            // Reverse the list if it's a previous page             
            if (IsNextPage == false && Cursor is not null)
            {
                result.Reverse();
            }

            return result;
        }
    }
}