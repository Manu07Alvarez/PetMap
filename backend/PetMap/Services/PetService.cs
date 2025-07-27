
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

        public void AddPet(PetRequest petRequest)
        {
            var petPost = petRequest.Adapt<PetPost>();
            petRepository.Create(petPost);
            petRepository.Save();
        }

        public void UpdatePet(PetRequest petRequest)
        {
            PetPost petPost = petRequest.Adapt<PetPost>();
            petRepository.Update(petPost);
            petRepository.Save();
        }

        public void DeletePet(PetRequest petRequest)
        {
            PetPost petPost = petRequest.Adapt<PetPost>();
            petRepository.Delete(petPost);
            petRepository.Save();
        }
    }
}