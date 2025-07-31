using Microsoft.EntityFrameworkCore;
using PetMap.Context;
using PetMap.Models;
using Z.EntityFramework.Plus;

namespace PetMap.Repositories.Utils
{
    public static class PaginationRepository
    {
        public async static Task<List<PetPost>> GetPagedData(IQueryable<PetPost> pets, int? Cursor, int PageSize, Dictionary<string, string> Options)
        {

            //BUG: when IsNextPage is True and Cursor is higher than the last record it returns the same page.
            int takeAmount = PageSize + 1;
            pets = pets
                .Where(p => Options["Direction"] == "desc" ? p.Id < Cursor: p.Id > Cursor);
                    // Fetch the next page

            return await pets.Take(takeAmount).ToListAsync();
        }
    }
}