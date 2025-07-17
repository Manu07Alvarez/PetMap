using AutoMapper;
using PetMap.Dtos;
using PetMap.Models;
using PetMap.Repositories;
using PetMap.Services.Utils;

namespace PetMap.Services
{
    public class PetService(IPetRepository petRepository, IMapper mapper)
    {
        public async Task<PetPagedResponse> GetAllPets(GetPetPagedRequest data)
        {
            var pagedPets = await petRepository.GetAllPetsPage(data.Cursor, data.IsNextPage, data.PageSize);
            var pagedResponse = PetPaginationService.GetPagedData(
                mapper,
                pagedPets.Items,
                data.Cursor,
                data.IsNextPage,
                data.PageSize,
                pagedPets.MinId
            );
            return pagedResponse;
        }
    }
}