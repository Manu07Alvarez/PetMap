
using PetMap.Dtos;
using PetMap.Models;

namespace PetMap.Services
{
    public interface IPetService
    {
        Task<PetPagedResponse> GetAllPets(GetPetPagedRequest data);
        Task AddPet(PetRequest petRequest);
        //Task<PetResponse> GetPetById(int id);
        Task UpdatePet(PetRequest petRequest);
        Task DeletePet(PetRequest petRequest);
        //Task<List<PetResponse>> GetPetsByUserId(int userId);
    }
}