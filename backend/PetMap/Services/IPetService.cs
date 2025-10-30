
using PetMap.Dtos;
using PetMap.Models;

namespace PetMap.Services
{
    public interface IPetService
    {
        Task<PetPagedResponse> getAllPets(GetPetPagedRequest data);
        Task addPet(PostPetRequest petRequest);
        //Task<PetResponse> GetPetById(int id);
        Task updatePet(PostPetRequest petRequest);
        Task deletePet(PostPetRequest petRequest);
        //Task<List<PetResponse>> GetPetsByUserId(int userId);
    }
}