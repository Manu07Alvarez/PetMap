
using PetMap.Dtos;
using PetMap.Models;

namespace PetMap.Services
{
    public interface IPetService
    {
        Task<PetPagedResponse> GetAllPets(GetPetPagedRequest data);
        Task AddPet(PostPetRequest petRequest);
        //Task<PetResponse> GetPetById(int id);
        Task UpdatePet(PostPetRequest petRequest);
        Task DeletePet(PostPetRequest petRequest);
        //Task<List<PetResponse>> GetPetsByUserId(int userId);
    }
}