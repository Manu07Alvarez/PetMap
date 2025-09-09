using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PetMap.Context;
using PetMap.Models;
using Z.EntityFramework.Plus;
using PetMap.Repositories.Utils;
using Amazon.S3;
using PetMap.Dtos;
namespace PetMap.Repositories
{
    public class PagedEntitiesResult<T>
    {
        public List<T> Items { get; set; } = [];

        public int Pages { get; set; }
        
    }
    public class PetRepository(PetMapDbContext context) : IPetRepository
    {

        private readonly PetMapDbContext context = context;

        public void Create(PetPost post)
        {
            Console.WriteLine(post.Id);
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
        public async Task<PagedEntitiesResult<PetPost>> GetAllPetsPage(DateTime? Cursor, int PageSize, GetFilters? Options)
        {
            var pages = context.Pets.DeferredCount().FutureValue<int>();
            var pets = context.Pets
                .AsNoTracking()
                .AsQueryable();

            var pagedPets = await PetPaginationRepository.GetPagedData(pets, Cursor, PageSize, Options);

            return new PagedEntitiesResult<PetPost>
            {
                Items = pagedPets,
                Pages = pages
            };
        }

    }
}