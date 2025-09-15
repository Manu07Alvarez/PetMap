using System;
using LinqToDB;
using LinqToDB.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PetMap.Context;
using PetMap.Dtos;
using PetMap.Models;
using Z.EntityFramework.Plus;

namespace PetMap.Repositories.Utils
{
    public static class PetPaginationRepository
    {
        public async static Task<List<PetPost>> GetPagedData(
            IQueryable<PetPost> pets,
            DateTime? Cursor,
            long? RowNumber,
            int PageSize,
            FilterRequest? Options
        )
        {

            int takeAmount = PageSize + 1;
            if (Options != null)
            {
                var rnPets = FiltersRepository.ApplyFilters(pets, Options);
                pets = rnPets.Where(p => p.Rows > RowNumber).Select(p => p.Posts);
            }
            else
            {
                pets = pets
                .Where(p => p.UpdatedAt < Cursor!.Value.ToUniversalTime());

            }
            try
            {
                return await pets.Take(takeAmount).ToLinqToDB().ToListAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            
                
        }
    }
}