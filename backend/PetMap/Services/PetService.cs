
using System.Threading.Tasks;
using Mapster;
using MapsterMapper;
using PetMap.Dtos;
using PetMap.Models;
using PetMap.Repositories;
using PetMap.Services.Utils;

namespace PetMap.Services
{
    public class PetService(IPetRepository petRepository) : IPetService
    {
        private readonly IPetRepository petRepository = petRepository;


        public async Task<PetPagedResponse> GetAllPets(GetPetPagedRequest data)
        {
            var pagedPets = await petRepository.GetAllPetsPage(data.Cursor, data.IsNextPage, data.PageSize);
            var pagedResponse = PetPaginationService.GetPagedData(
                pagedPets.Items,
                data.Cursor,
                data.IsNextPage,
                data.PageSize,
                pagedPets.MinId
            );
            return pagedResponse;
        }

        public async Task AddPet(PetRequest petRequest)
        {
            PetPost petPost = petRequest.Adapt<PetPost>();
            petRepository.Create(petPost);
            await petRepository.Save();
        }

        public async Task UpdatePet(PetRequest petRequest)
        {
            PetPost petPost = petRequest.Adapt<PetPost>();
            petRepository.Update(petPost);
            await petRepository.Save();
        }

        public async Task DeletePet(PetRequest petRequest)
        {
            PetPost petPost = petRequest.Adapt<PetPost>();
            petRepository.Delete(petPost);
            await petRepository.Save();
        }
    }
}