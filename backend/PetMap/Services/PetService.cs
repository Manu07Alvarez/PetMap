
using PetMap.Dtos;
using PetMap.Mappings;
using PetMap.Models;
using PetMap.Repositories;
using PetMap.Services.Utils;

namespace PetMap.Services
{
    public class PetService(IPetRepository petRepository, IFilesRepository filesRepository) : IPetService
    {
        private readonly IPetRepository petRepository = petRepository;
        public async Task<PetPagedResponse> GetAllPets(GetPetPagedRequest data)
        {
            
            PagedEntitiesResult<PetPost> pagedPets = await petRepository.GetAllPetsPage(
                data.Cursor,
                data.PageSize,
                data.Options
            );

            PetPagedResponse pagedResponse = PetPaginationService.GetPagedData(
                pagedPets.Items,
                pagedPets.Pages,
                data.PageSize
            );

            return pagedResponse;
        } 

        public async Task AddPet(PetRequest petRequest)
        {
            PetPost petPost = petRequest.MapToPetPost();
            petRepository.Create(petPost);
            await petRepository.Save();
        }

        public async Task UpdatePet(PetRequest petRequest)
        {
            PetPost petPost = petRequest.MapToPetPost();
            petRepository.Update(petPost);
            await petRepository.Save();
        }

        public async Task DeletePet(PetRequest petRequest)
        {
            PetPost petPost = petRequest.MapToPetPost();
            petRepository.Delete(petPost);
            await petRepository.Save();
        }
    }
}