using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PetMap.Context;
using PetMap.Models;
using PetMap.Repositories.Utils;

namespace PetMap.Repositories
{
    public class PagedEntitiesResult<T>
    {
        public List<T> Items { get; set; } = [];
        public int MinId { get; set; }
    }
    public class PetRepository(PetMapDbContext context) : IPetRepository
    {

        private readonly PetMapDbContext context = context;

        public void Create(PetPost post)
        {
            context.Pets.Add(post);
        }

        public void Delete(PetPost post)
        {
            context.Pets.Remove(post);
        }

        public void Update(PetPost post)
        {
            context.Pets.Update(post);
        }

        public async Task Save()
        {
            await context.SaveChangesAsync();
        }
        public async Task<PagedEntitiesResult<PetPost>> GetAllPetsPage(int? Cursor, bool? IsNextPage, int PageSize)
        {
            var minId = await context.Pets.MinAsync(p => p.Id);

            var pets = context.Pets
                .AsNoTracking()
                .OrderByDescending(p => p.Id);
            var pagedPets = await PaginationRepository.GetPagedData(pets, Cursor, IsNextPage, PageSize);

            return new PagedEntitiesResult<PetPost>
            {
                Items = pagedPets,
                MinId = minId
            };
        }

    }
}