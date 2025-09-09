using Microsoft.EntityFrameworkCore;
using PetMap.Context;
using PetMap.Dtos;
using PetMap.Models;
using Z.EntityFramework.Plus;

namespace PetMap.Repositories.Utils
{
    public static class PetPaginationRepository
    {
        public async static Task<List<PetPost>> GetPagedData(IQueryable<PetPost> pets, DateTime? Cursor, int PageSize, GetFilters? Options)
        {

            //BUG: when IsNextPage is True and Cursor is higher than the last record it returns the same page.
            int takeAmount = PageSize + 1;
            if (Options != null)
            {
                pets = FiltersRepository.ApplyFilters(pets, Options);
            }
            else
            {
                pets = pets
                .Where(p => p.UpdatedAt < Cursor);
                    
            }
            return await pets.Take(takeAmount).ToListAsync();
        }
    }
}