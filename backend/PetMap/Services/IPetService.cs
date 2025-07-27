
using PetMap.Dtos;
using PetMap.Models;

namespace PetMap.Services
{
    public interface IPetService
    {
        Task<PetPagedResponse> GetAllPets(GetPetPagedRequest data);
        void AddPet(PetRequest post);
        //Task<PetResponse> GetPetById(int id);
        void UpdatePet(PetRequest pet);
        void DeletePet(PetRequest post);
        //Task<List<PetResponse>> GetPetsByUserId(int userId);
    }
}