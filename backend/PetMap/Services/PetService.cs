
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
        private readonly IFilesRepository filesRepository = filesRepository;
        public async Task<PetPagedResponse> getAllPets(GetPetPagedRequest data)
        {

            PagedEntitiesResult<PetPost> paged_pets = await petRepository.GetAllPetsPage(
                data.Cursor,
                data.RowNumber,
                data.PageSize,
                data.Options
            );
            List<Stream> pet_image = [];
            foreach (PetPost pet in paged_pets.Items)
            {   
                pet_image.Add(await filesRepository.FileGet("petmap", pet.FileKey));
            }

            PetPagedResponse pagedResponse = await PetPaginationService.GetPagedData(
                paged_pets.Items,
                paged_pets.Pages,
                data.PageSize,
                pet_image
            );

            return pagedResponse;
        } 

        public async Task addPet(PostPetRequest petRequest)
        {
            await filesRepository.FileInsert("petmap", petRequest.File!.FileName, petRequest.File.OpenReadStream());
            PetPost petPost = petRequest.MapToPetPost();
            petRepository.Create(petPost);
            await petRepository.Save();
        }

        public async Task updatePet(PostPetRequest petRequest)
        {
            PetPost petPost = petRequest.MapToPetPost();
            petRepository.Update(petPost);
            await petRepository.Save();
        }

        public async Task deletePet(PostPetRequest petRequest)
        {
            PetPost petPost = petRequest.MapToPetPost();
            petRepository.Delete(petPost);
            await petRepository.Save();
        }
    }
}