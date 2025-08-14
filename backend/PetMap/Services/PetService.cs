
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

            var pagedResponse = PetPaginationService.GetPagedData(
                pagedPets.Items,
                pagedPets.Pages,
                data.PageSize
            );
            
            Dictionary<string, Stream> files = [];
            foreach (var fileKey in pagedResponse.Item1.Select(s => s.FileKey))
            {
                files.Add(fileKey, await filesRepository.FileGet("pets", fileKey));
            }

            List<PetResponse> petResponse = pagedResponse.Item1.Select(p => p.MapToPetResponse(files[p.FileKey])).ToList();

            PetPagedResponse petsPaged = new(
                petResponse,
                pagedResponse.Item2,
                pagedResponse.Item3,
                pagedResponse.Item4
            ); // pagedResponse.

            return petsPaged;
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